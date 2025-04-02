from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime, timedelta
import jwt
from werkzeug.security import generate_password_hash, check_password_hash
import os

app = Flask(__name__)
CORS(app)

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///expense_tracker.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'your-secret-key-here')
db = SQLAlchemy(app)

# User model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    transactions = db.relationship('Transaction', backref='user', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email
        }

# Transaction model
class Transaction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(200), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    type = db.Column(db.String(50), nullable=False)
    date = db.Column(db.DateTime, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'text': self.text,
            'amount': self.amount,
            'type': self.type,
            'date': self.date.strftime('%Y-%m-%d')
        }

# Create database tables
with app.app_context():
    # Drop all tables first to ensure clean slate
    db.drop_all()
    # Create all tables
    db.create_all()
    print("Database tables created successfully")  # Debug log

def generate_token(user_id):
    return jwt.encode(
        {'user_id': user_id, 'exp': datetime.utcnow() + timedelta(days=1)},
        app.config['SECRET_KEY'],
        algorithm='HS256'
    )

def verify_token(token):
    try:
        data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
        return data['user_id']
    except:
        return None

@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    print("Received registration data:", data)  # Debug log
    
    if not data or not all(key in data for key in ['name', 'email', 'password']):
        return jsonify({'message': 'Missing required fields'}), 400
    
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'message': 'Email already registered'}), 400
    
    try:
        new_user = User(
            name=data['name'],
            email=data['email'],
            password=generate_password_hash(data['password'])
        )
        db.session.add(new_user)
        db.session.commit()
        
        token = generate_token(new_user.id)
        return jsonify({
            'message': 'User registered successfully',
            'token': token,
            'user': new_user.to_dict()
        }), 201
    except Exception as e:
        db.session.rollback()
        print("Registration error:", str(e))  # Debug log
        return jsonify({'message': str(e)}), 400

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    
    if user and check_password_hash(user.password, data['password']):
        token = generate_token(user.id)
        return jsonify({
            'message': 'Login successful',
            'token': token,
            'user': user.to_dict()
        })
    
    return jsonify({'message': 'Invalid email or password'}), 401

@app.route('/api/transactions', methods=['GET'])
def get_transactions():
    token = request.headers.get('Authorization')
    print("Received token:", token)  # Debug log
    
    if not token:
        return jsonify({'message': 'No token provided'}), 401
    
    user_id = verify_token(token)
    print("Verified user_id:", user_id)  # Debug log
    
    if not user_id:
        return jsonify({'message': 'Invalid token'}), 401
    
    try:
        transactions = Transaction.query.filter_by(user_id=user_id).all()
        print("Found transactions:", len(transactions))  # Debug log
        return jsonify([transaction.to_dict() for transaction in transactions])
    except Exception as e:
        print("Error fetching transactions:", str(e))  # Debug log
        return jsonify([]), 200  # Return empty array instead of error

@app.route('/api/transactions', methods=['POST'])
def add_transaction():
    token = request.headers.get('Authorization')
    print("Received token:", token)  # Debug log
    
    if not token:
        return jsonify({'message': 'No token provided'}), 401
    
    user_id = verify_token(token)
    print("Verified user_id:", user_id)  # Debug log
    
    if not user_id:
        return jsonify({'message': 'Invalid token'}), 401
    
    data = request.get_json()
    print("Received transaction data:", data)  # Debug log
    
    # Validate required fields
    required_fields = ['text', 'amount', 'type', 'date']
    if not data or not all(field in data for field in required_fields):
        missing_fields = [field for field in required_fields if field not in data]
        print("Missing fields:", missing_fields)  # Debug log
        return jsonify({'message': f'Missing required fields: {", ".join(missing_fields)}'}), 400
    
    try:
        # Validate amount is a number
        try:
            amount = float(data['amount'])
            print("Parsed amount:", amount)  # Debug log
        except ValueError:
            print("Invalid amount format:", data['amount'])  # Debug log
            return jsonify({'message': 'Amount must be a valid number'}), 400
        
        if not isinstance(amount, (int, float)):
            print("Amount is not a number:", type(amount))  # Debug log
            return jsonify({'message': 'Amount must be a number'}), 400
        
        # Validate date format
        try:
            date = datetime.strptime(data['date'], '%Y-%m-%d')
            print("Parsed date:", date)  # Debug log
        except ValueError:
            print("Invalid date format:", data['date'])  # Debug log
            return jsonify({'message': 'Invalid date format. Use YYYY-MM-DD'}), 400
        
        # Validate transaction type
        if data['type'] not in ['Income', 'Expense']:
            print("Invalid transaction type:", data['type'])  # Debug log
            return jsonify({'message': 'Transaction type must be either Income or Expense'}), 400
        
        print("Creating new transaction with data:", {  # Debug log
            'text': data['text'],
            'amount': amount,
            'type': data['type'],
            'date': date,
            'user_id': user_id
        })
        
        new_transaction = Transaction(
            text=data['text'],
            amount=amount,
            type=data['type'],
            date=date,
            user_id=user_id
        )
        
        db.session.add(new_transaction)
        db.session.commit()
        
        print("Transaction added successfully")  # Debug log
        return jsonify({
            'message': 'Transaction added successfully',
            'transaction': new_transaction.to_dict()
        }), 201
    except ValueError as e:
        db.session.rollback()
        print("ValueError while adding transaction:", str(e))  # Debug log
        return jsonify({'message': f'Invalid data format: {str(e)}'}), 400
    except Exception as e:
        db.session.rollback()
        print("Unexpected error while adding transaction:", str(e))  # Debug log
        print("Error type:", type(e))  # Debug log
        import traceback
        print("Traceback:", traceback.format_exc())  # Debug log
        return jsonify({'message': f'An error occurred while adding the transaction: {str(e)}'}), 500

@app.route('/api/transactions/<int:transaction_id>', methods=['DELETE'])
def delete_transaction(transaction_id):
    token = request.headers.get('Authorization')
    print("Received token:", token)  # Debug log
    
    if not token:
        return jsonify({'message': 'No token provided'}), 401
    
    user_id = verify_token(token)
    print("Verified user_id:", user_id)  # Debug log
    
    if not user_id:
        return jsonify({'message': 'Invalid token'}), 401
    
    try:
        transaction = Transaction.query.filter_by(id=transaction_id, user_id=user_id).first()
        if not transaction:
            return jsonify({'message': 'Transaction not found'}), 404
        
        db.session.delete(transaction)
        db.session.commit()
        print("Transaction deleted successfully")  # Debug log
        return jsonify({'message': 'Transaction deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        print("Error deleting transaction:", str(e))  # Debug log
        return jsonify({'message': 'An error occurred while deleting the transaction'}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5002) 