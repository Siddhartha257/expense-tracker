import React, { useState, useEffect, useCallback } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useNavigate } from 'react-router-dom';

export default function ExpenseTracker(props) {
  const [transactions, setTransactions] = useState([]);
  const [inputText, setInputText] = useState('');
  const [amount, setAmount] = useState('');
  const [transactionType, setTransactionType] = useState('');
  const [date, setDate] = useState('');
  const [data, setData] = useState([
    { month: 'Jan', income: 0, expense: 0 },
    { month: 'Feb', income: 0, expense: 0 },
    { month: 'Mar', income: 0, expense: 0 },
    { month: 'Apr', income: 0, expense: 0 },
    { month: 'May', income: 0, expense: 0 },
    { month: 'Jun', income: 0, expense: 0 }
  ]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [chartData, setChartData] = useState([]);
  const navigate = useNavigate();

  const fetchTransactions = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/log');
        return;
      }

      const response = await fetch('http://localhost:5002/api/transactions', {
        headers: {
          'Authorization': token
        }
      });

      if (response.status === 401) {
        localStorage.removeItem('token');
        navigate('/log');
        return;
      }

      const transactionsData = await response.json();
      
      if (Array.isArray(transactionsData)) {
        setTransactions(transactionsData);
        
        // Process data for chart
        const chartData = processChartData(transactionsData);
        setData(chartData);
        
        // Calculate totals
        const { income, expense } = calculateTotals(transactionsData);
        setTotalIncome(income);
        setTotalExpense(expense);
      } else {
        console.error('Invalid transactions data format:', transactionsData);
        setTransactions([]);
        setData([]);
        setTotalIncome(0);
        setTotalExpense(0);
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
      setTransactions([]);
      setData([]);
      setTotalIncome(0);
      setTotalExpense(0);
    }
  }, [navigate]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  useEffect(() => {
    if (transactions.length > 0) {
      // Transform transactions into monthly data
      const monthlyData = {};
      transactions.forEach(transaction => {
        const date = new Date(transaction.date);
        const month = date.toLocaleString('default', { month: 'short' });
        if (!monthlyData[month]) {
          monthlyData[month] = { income: 0, expense: 0 };
        }
        if (transaction.type === 'income') {
          monthlyData[month].income += Number(transaction.amount);
    } else {
          monthlyData[month].expense += Number(transaction.amount);
        }
      });

      // Update the data state
      const newData = data.map(item => ({
        ...item,
        income: monthlyData[item.month]?.income || 0,
        expense: monthlyData[item.month]?.expense || 0
      }));
      setData(newData);
    }
  }, [transactions]);

  const processChartData = (transactions) => {
    const monthlyData = {};
    transactions.forEach(transaction => {
      const date = new Date(transaction.date);
      const month = date.toLocaleString('default', { month: 'long', year: 'numeric' });
      if (!monthlyData[month]) {
        monthlyData[month] = { month, income: 0, expense: 0 };
      }
      if (transaction.type === 'Income') {
        monthlyData[month].income += transaction.amount;
      } else {
        monthlyData[month].expense += transaction.amount;
      }
    });
    return Object.values(monthlyData).sort((a, b) => {
      const dateA = new Date(a.month);
      const dateB = new Date(b.month);
      return dateA - dateB;
    });
  };

  const calculateTotals = (transactions) => {
    return transactions.reduce((acc, transaction) => {
      if (transaction.type === 'Income') {
        acc.income += transaction.amount;
      } else {
        acc.expense += transaction.amount;
      }
      return acc;
    }, { income: 0, expense: 0 });
  };

  const handleAddTransaction = async () => {
    if (amount.trim() === '' || transactionType === '' || date.trim() === '') {
      alert('Please fill in all fields');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/log');
        return;
      }

      // Validate amount
      const parsedAmount = parseFloat(amount);
      if (isNaN(parsedAmount) || parsedAmount <= 0) {
        alert('Please enter a valid amount greater than 0');
        return;
      }

      // Validate date
      const selectedDate = new Date(date);
      if (isNaN(selectedDate.getTime())) {
        alert('Please select a valid date');
        return;
      }

      console.log('Sending transaction data:', {  // Debug log
        text: inputText,
        amount: parsedAmount,
        type: transactionType,
        date: date
      });

      const response = await fetch('http://localhost:5002/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify({
          text: inputText,
          amount: parsedAmount,
          type: transactionType,
          date: date
        }),
      });

      if (response.status === 401) {
        localStorage.removeItem('token');
        navigate('/log');
        return;
      }

      const data = await response.json();
      console.log('Server response:', data);  // Debug log

      if (response.ok) {
        fetchTransactions();
    setInputText('');
    setAmount('');
    setTransactionType('');
    setDate('');
      } else {
        alert(data.message || 'Error adding transaction');
      }
    } catch (error) {
      console.error('Error adding transaction:', error);
      alert('Error adding transaction. Please try again.');
    }
  };

  const handleDeleteTransaction = async (id) => {
    if (!window.confirm('Are you sure you want to delete this transaction?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/log');
        return;
      }

      const response = await fetch(`http://localhost:5002/api/transactions/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': token
        }
      });

      if (response.status === 401) {
        localStorage.removeItem('token');
        navigate('/log');
        return;
      }

      if (response.ok) {
        fetchTransactions();
      } else {
        const data = await response.json();
        alert(data.message || 'Error deleting transaction');
      }
    } catch (error) {
      console.error('Error deleting transaction:', error);
      alert('Error deleting transaction. Please try again.');
    }
  };

  const balance = totalIncome - totalExpense;

  document.body.style.backgroundColor = props.mode === 'dark' ? '#121212' : '#f7f9fc';
  document.body.style.color = props.mode === 'dark' ? 'white' : 'black';

  const isDark = props.mode === 'dark';
  
  // Theme colors
  const colors = {
    background: isDark ? '#121212' : '#f7f9fc',
    cardBg: isDark ? '#1e1e1e' : '#ffffff',
    cardHeaderBg: isDark ? '#2a2a2a' : '#f8fafc',
    border: isDark ? '#333333' : '#e2e8f0',
    text: isDark ? '#e0e0e0' : '#334155',
    textMuted: isDark ? '#a0a0a0' : '#64748b',
    input: {
      bg: isDark ? '#2a2a2a' : '#ffffff',
      border: isDark ? '#444444' : '#e2e8f0',
      focus: isDark ? '#505050' : '#cbd5e1',
      text: isDark ? '#e0e0e0' : '#334155',
    },
    income: '#10b981', // More modern green
    expense: '#ef4444', // More modern red
    button: {
      primary: '#3b82f6',
      hover: '#2563eb',
      danger: '#f43f5e',
      dangerHover: '#e11d48',
    }
  };

  const commonCardStyle = {
    backgroundColor: colors.cardBg,
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
    overflow: 'hidden',
    border: `1px solid ${colors.border}`,
  };

  const commonInputStyle = {
    padding: '12px 16px',
    borderRadius: '8px',
    border: `1px solid ${colors.input.border}`,
    backgroundColor: colors.input.bg,
    color: colors.input.text,
    fontSize: '15px',
    width: '100%',
    outline: 'none',
    transition: 'all 0.2s ease',
  };

  return (
    <div style={{ 
      padding: '24px',
      maxWidth: '1400px',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px'
    }}>
      <div style={{ 
        display: 'flex',
        gap: '24px',
        flexWrap: 'wrap'
      }}>
        {/* Left Panel */}
        <div style={{
          flex: '1 1 400px',
          background: props.mode === 'light' ? '#ffffff' : '#1a1a1a',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px'
        }}>
          {/* Card Header */}
          <div style={{
            padding: '20px 24px',
            borderBottom: `1px solid ${colors.border}`,
            backgroundColor: colors.cardHeaderBg,
          }}>
            <h2 style={{ 
              margin: 0,
              color: props.mode === 'light' ? '#333' : '#fff',
              fontSize: '20px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1H0V4zm0 3v5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7H0zm3 2h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1z"/>
              </svg>
              Transactions History
            </h2>
          </div>

          {/* Transactions List */}
          <div style={{ 
            overflowY: 'auto', 
            flex: 1, 
            padding: '0 16px',
          }}>
            {transactions.length === 0 ? (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '40px 20px',
                color: colors.textMuted,
                textAlign: 'center',
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 16 16" style={{ marginBottom: '16px', opacity: 0.6 }}>
                  <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z"/>
                </svg>
                <p style={{ margin: '0 0 8px 0', fontWeight: '500' }}>No transactions yet</p>
                <p style={{ margin: 0, fontSize: '14px' }}>Add your first transaction using the form</p>
              </div>
            ) : (
              transactions.map((transaction) => (
                <div key={transaction.id} style={{ 
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '16px',
                  borderBottom: `1px solid ${colors.border}`,
                  transition: 'background-color 0.2s ease',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: transaction.type === 'Income' 
                        ? `${colors.income}20` 
                        : `${colors.expense}20`,
                      color: transaction.type === 'Income' ? colors.income : colors.expense,
                    }}>
                      {transaction.type === 'Income' ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                          <path fillRule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/>
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                          <path fillRule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
                        </svg>
                      )}
                    </div>
                    <div>
                      <div style={{ fontWeight: '500', color: props.mode === 'light' ? '#333' : '#fff' }}>
                        {transaction.text}
                      </div>
                      <div style={{ fontSize: '13px', color: colors.textMuted, marginTop: '2px' }}>
                        {new Date(transaction.date).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ 
                      fontWeight: '600',
                      color: transaction.type === 'Income' ? colors.income : colors.expense,
                    }}>
                      {transaction.type === 'Income' ? '+' : '-'}₹{transaction.amount.toFixed(2)}
                    </div>
                    <button 
                      onClick={() => handleDeleteTransaction(transaction.id)} 
                      style={{ 
                        border: 'none', 
                        borderRadius: '6px', 
                        padding: '6px',
                        cursor: 'pointer',
                        backgroundColor: 'transparent',
                        color: colors.textMuted,
                        transition: 'color 0.2s, background-color 0.2s',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onMouseOver={e => {
                        e.currentTarget.style.backgroundColor = colors.button.danger + '20';
                        e.currentTarget.style.color = colors.button.danger;
                      }}
                      onMouseOut={e => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = colors.textMuted;
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                        <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Summary Section */}
          <div style={{ 
            padding: '24px',
            borderTop: `1px solid ${colors.border}`,
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '16px',
              backgroundColor: props.mode === 'light' ? '#f8fafc' : '#2a2a2a',
              borderRadius: '12px',
              marginBottom: '16px',
            }}>
              <div>
                <div style={{ fontSize: '14px', color: colors.textMuted, marginBottom: '4px' }}>
                  Current Balance
                </div>
                <div style={{ 
                  fontSize: '26px', 
                  fontWeight: '700',
                  color: balance >= 0 ? colors.income : colors.expense,
                }}>
                  ₹{Math.abs(balance).toFixed(2)}
                </div>
              </div>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: balance >= 0 ? `${colors.income}20` : `${colors.expense}20`,
                color: balance >= 0 ? colors.income : colors.expense,
              }}>
                {balance >= 0 ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                  </svg>
                )}
              </div>
            </div>

            <div style={{ 
              display: 'flex',
              justifyContent: 'space-between',
              gap: '10px',
            }}>
              <div style={{ 
                flex: 1,
                padding: '12px',
                borderRadius: '8px',
                backgroundColor: `${colors.income}15`,
              }}>
                <div style={{ fontSize: '13px', color: colors.textMuted, marginBottom: '4px' }}>
                  Total Income
                </div>
                <div style={{ color: colors.income, fontWeight: '600', fontSize: '16px' }}>
                  ₹{totalIncome.toFixed(2)}
                </div>
              </div>
              <div style={{ 
                flex: 1,
                padding: '12px',
                borderRadius: '8px',
                backgroundColor: `${colors.expense}15`,
              }}>
                <div style={{ fontSize: '13px', color: colors.textMuted, marginBottom: '4px' }}>
                  Total Expense
                </div>
                <div style={{ color: colors.expense, fontWeight: '600', fontSize: '16px' }}>
                  ₹{totalExpense.toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chart Section */}
        <div className="chart-section" style={{
          background: props.mode === 'light' ? '#ffffff' : '#1a1a1a',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          height: '400px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <h2 style={{ 
            margin: '0',
            fontSize: '1.5rem',
            color: props.mode === 'light' ? '#333' : '#fff',
            fontWeight: '600'
          }}>Monthly Overview</h2>
          <div style={{ 
            flex: 1,
            width: '100%',
            minHeight: '300px',
            position: 'relative'
          }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke={props.mode === 'light' ? '#e0e0e0' : '#333'} />
                <XAxis 
                  dataKey="month" 
                  stroke={props.mode === 'light' ? '#333' : '#fff'}
                  tick={{ fill: props.mode === 'light' ? '#333' : '#fff' }}
                  axisLine={{ stroke: props.mode === 'light' ? '#333' : '#fff' }}
                  tickLine={{ stroke: props.mode === 'light' ? '#333' : '#fff' }}
                />
                <YAxis 
                  stroke={props.mode === 'light' ? '#333' : '#fff'}
                  tick={{ fill: props.mode === 'light' ? '#333' : '#fff' }}
                  axisLine={{ stroke: props.mode === 'light' ? '#333' : '#fff' }}
                  tickLine={{ stroke: props.mode === 'light' ? '#333' : '#fff' }}
                />
                <Tooltip
                  contentStyle={{
                    background: props.mode === 'light' ? '#ffffff' : '#1a1a1a',
                    border: `1px solid ${props.mode === 'light' ? '#e0e0e0' : '#333'}`,
                    borderRadius: '8px',
                    color: props.mode === 'light' ? '#333' : '#fff'
                  }}
                  formatter={(value) => `₹${Number(value).toLocaleString('en-IN')}`}
                  labelStyle={{ color: props.mode === 'light' ? '#333' : '#fff' }}
                />
                <Legend 
                  wrapperStyle={{ 
                    color: props.mode === 'light' ? '#333' : '#fff',
                    paddingTop: '20px'
                  }}
                />
                <Bar 
                  dataKey="income" 
                  fill="#28a745" 
                  name="Income" 
                  barSize={20}
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey="expense" 
                  fill="#dc3545" 
                  name="Expense" 
                  barSize={20}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div style={{
        background: props.mode === 'light' ? '#ffffff' : '#1a1a1a',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        {/* Add Transaction Form */}
        <div style={{ ...commonCardStyle }}>
          {/* Card Header */}
          <div style={{
            padding: '20px 24px',
            borderBottom: `1px solid ${colors.border}`,
            backgroundColor: colors.cardHeaderBg,
          }}>
            <h2 style={{ 
              margin: 0,
              color: props.mode === 'light' ? '#333' : '#fff',
              fontSize: '20px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
              </svg>
              Add New Transaction
            </h2>
          </div>
          
          {/* Form Content */}
          <div style={{ padding: '24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px', 
                  fontSize: '14px',
                  fontWeight: '500',
                  color: colors.text,
                }}>
                  Description
                </label>
                <input
                  type="text"
                  placeholder="What was this transaction for?"
                  value={inputText}
                  onChange={e => setInputText(e.target.value)}
                  style={{
                    ...commonInputStyle,
                    ':focus': {
                      borderColor: colors.input.focus,
                    }
                  }}
                />
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '8px', 
                    fontSize: '14px',
                    fontWeight: '500',
                    color: colors.text,
                  }}>
                    Amount
                  </label>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    style={commonInputStyle}
                  />
                </div>
                
                <div>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: colors.text,
                  }}>
                    Date
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    style={commonInputStyle}
                  />
                </div>
              </div>
              
              <div>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: colors.text,
                }}>
                  Transaction Type
                </label>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <label style={{
                    flex: 1,
                    padding: '12px',
                    border: `2px solid ${transactionType === 'Income' ? colors.income : colors.border}`,
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    color: transactionType === 'Income' ? colors.income : colors.text,
                    fontWeight: transactionType === 'Income' ? '600' : '400',
                    backgroundColor: transactionType === 'Income' ? `${colors.income}10` : 'transparent',
                    transition: 'all 0.2s ease',
                  }}>
                    <input 
                      type="radio" 
                      name="transactionType" 
                      value="Income"
                      checked={transactionType === 'Income'}
                      onChange={e => setTransactionType(e.target.value)}
                      style={{ display: 'none' }}
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/>
                    </svg>
                    Income
                  </label>
                  
                  <label style={{
                    flex: 1,
                    padding: '12px',
                    border: `2px solid ${transactionType === 'Expense' ? colors.expense : colors.border}`,
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    color: transactionType === 'Expense' ? colors.expense : colors.text,
                    fontWeight: transactionType === 'Expense' ? '600' : '400',
                    backgroundColor: transactionType === 'Expense' ? `${colors.expense}10` : 'transparent',
                    transition: 'all 0.2s ease',
                  }}>
                    <input 
                      type="radio" 
                      name="transactionType" 
                      value="Expense"
                      checked={transactionType === 'Expense'}
                      onChange={e => setTransactionType(e.target.value)}
                      style={{ display: 'none' }}
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
                    </svg>
                    Expense
                  </label>
                </div>
              </div>
              
              <button
                onClick={handleAddTransaction}
                style={{
                  padding: '14px',
                  backgroundColor: colors.button.primary,
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: '600',
                  transition: 'background-color 0.2s',
                  marginTop: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
                onMouseOver={e => e.currentTarget.style.backgroundColor = colors.button.hover}
                onMouseOut={e => e.currentTarget.style.backgroundColor = colors.button.primary}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                </svg>
                Add Transaction
              </button>
            </div>
        </div>
        </div>
      </div>
    </div>
  );
}