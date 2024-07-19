import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function ExpenseTracker(props) {
  const [transactions, setTransactions] = useState([]);
  const [inputText, setInputText] = useState('');
  const [amount, setAmount] = useState('');
  const [transactionType, setTransactionType] = useState('');
  const [date, setDate] = useState('');
  const [data, setData] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  const handleAddTransaction = () => {
    if (amount.trim() === '' || transactionType === '' || date.trim() === '') return;

    const newTransaction = {
      id: Math.random().toString(36).substring(7),
      text: inputText,
      amount: +amount,
      type: transactionType,
      date: date
    };


    setTransactions([...transactions, newTransaction]);

    const newData = [...data];
    const month = new Date(date).toLocaleString('default', { month: 'long' }); 

    const existingData = newData.find(item => item.month === month);

    if (existingData) {
      if (transactionType === 'Income') {
        existingData.income += +amount;
      } else {
        existingData.expense += +amount;
      }
    } else {
      newData.push({
        month: month,
        income: transactionType === 'Income' ? +amount : 0,
        expense: transactionType === 'Expense' ? +amount : 0,
      });
    }

    setData(newData);
    setInputText('');
    setAmount('');
    setTransactionType('');
    setDate('');

    const newTotalIncome = newData.reduce((acc, curr) => acc + curr.income, 0);
    const newTotalExpense = newData.reduce((acc, curr) => acc + curr.expense, 0);
    setTotalIncome(newTotalIncome);
    setTotalExpense(newTotalExpense);
  };

  const handleDeleteTransaction = (id) => {
    const updatedTransactions = transactions.filter(transaction => transaction.id !== id);
    setTransactions(updatedTransactions);
  
    // Recalculate data and totals
    const newData = [];
    let newTotalIncome = 0;
    let newTotalExpense = 0;
  
    updatedTransactions.forEach(transaction => {
      const month = new Date(transaction.date).toLocaleString('default', { month: 'long' });
      const existingDataIndex = newData.findIndex(item => item.month === month);
  
      if (existingDataIndex !== -1) {
        if (transaction.type === 'Income') {
          newData[existingDataIndex].income += transaction.amount;
        } else {
          newData[existingDataIndex].expense += transaction.amount;
        }
      } else {
        newData.push({
          month: month,
          income: transaction.type === 'Income' ? transaction.amount : 0,
          expense: transaction.type === 'Expense' ? transaction.amount : 0,
        });
      }
  
      newTotalIncome = newData.reduce((acc, curr) => acc + curr.income, 0);
      newTotalExpense = newData.reduce((acc, curr) => acc + curr.expense, 0);
    });
  
    setData(newData);
    setTotalIncome(newTotalIncome);
    setTotalExpense(newTotalExpense);
  };
  

  const balance = totalIncome - totalExpense;

  document.body.style.backgroundColor='white'

  if(props.mode==='dark'){
    document.body.style.backgroundColor='#134074'
    document.body.style.color='white'
  }
  else{
    document.body.style.color='black'

  }
  

  return (
    <div style={{ display: 'flex', height: '93vh',  }}>
      <div style={{  backgroundColor: props.mode==='dark'?'#023e8a': '#f2f2f2', padding: '20px', borderRadius: '8px', margin: '10px',display:'flex' ,justifyContent:'space-between',flexDirection:'column',width:'450px' }}>
        <div style={{ overflowY: 'scroll', height:'60vh'}}>
        <h2>Transactions</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Description</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Amount</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Date</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index}>
                <td style={{ border: '1px solid #ddd', padding: '8px', color: transaction.type === 'Income' ? 'green' : 'red' }}>{transaction.text}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px', color: transaction.type === 'Income' ? 'green' : 'red' }}>${transaction.amount}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px', color: transaction.type === 'Income' ? 'green' : 'red' }}>{transaction.date}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  <button onClick={() => handleDeleteTransaction(transaction.id)} style={{ border: 'none', borderRadius: '4px', padding: '5px 10px', cursor: 'pointer' }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                </svg></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        <div >
          <p style={{ color: props.mode === 'dark' ? 'white' : 'black' }}>Balance: ${balance}</p>
          <p style={{ color: props.mode === 'dark' ? 'white' : 'black' }}>Total Income: ${totalIncome}</p>
          <p style={{ color: props.mode === 'dark' ? 'white' : 'black' }}>Total Expense: ${totalExpense}</p>
        </div>

      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '10px', height:'300px'}}>
          <h2>Add Transaction</h2>
          <input type="text" placeholder="Description" value={inputText} onChange={e => setInputText(e.target.value)} style={{ marginBottom: '15px', marginRight:'5px', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }} />
          <input type="number" placeholder="Enter amount" value={amount} onChange={e => setAmount(e.target.value)} style={{ marginBottom: '15px', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }} />
          <input type="date" placeholder="Date" value={date} onChange={e => setDate(e.target.value)} style={{ marginBottom: '10px', padding: '8px',marginRight:'5px', borderRadius: '4px', border: '1px solid #ddd' }} />
          <select value={transactionType} onChange={e => setTransactionType(e.target.value)} style={{ marginBottom: '15px', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}>
            <option value="">Select Transaction Type</option>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
          <br/>
          <button onClick={handleAddTransaction} className='btn btn-success'>Add Transaction</button>
        </div>
        <div style={{ padding: '10px', borderRadius: '8px', margin: '5px' }}>
          <h2>Transactions Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="income" fill="#82ca9d" name="Income" barSize={20} />
              <Bar dataKey="expense" fill="#8884d8" name="Expense" barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}