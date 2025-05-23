import { useState, useEffect } from 'react'
import './index.css'
import MoneyDetails from '../MoneyDetails'
import TrasactionItem from '../TransactionItem'
import { useDispatch } from 'react-redux';
import { getAuth, signOut } from 'firebase/auth';
import { logout } from '../../features/authSlice';
import { useNavigate } from 'react-router-dom';
import { getFirestore, collection, addDoc, deleteDoc, doc, getDocs, query } from "firebase/firestore";



const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
  
]

const Dashboard = () => {
  const [titleInput, setTitleInput] = useState('')
  const [amountInput, setAmountInput] = useState('')
  const [typeInput, setTypeInput] = useState('INCOME')
  const [descriptionInput, setDescriptionInput] = useState('')
  const [historyList, setHistoryList] = useState([])

  const db = getFirestore();
  const auth = getAuth();

  const onChangeTitle = event => {
    setTitleInput(event.target.value)
  }

  const onChangeAmount = event => {
    setAmountInput(event.target.value)
  }

  const onChangeType = event => {
    setTypeInput(event.target.value); // keep raw value, 'INCOME' or 'EXPENSES'
  };

  const onChangeDescription = event => {
    setDescriptionInput(event.target.value)
  }
  

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!auth.currentUser) return;
      const q = query(collection(db, "users", auth.currentUser.uid, "transactions"));
      const querySnapshot = await getDocs(q);
      const transactions = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setHistoryList(transactions);
    };

    fetchTransactions();
  }, [auth.currentUser,db]);



  const onAddTransaction = async event => {
    event.preventDefault();
    if (!auth.currentUser) return;

    const newTransaction = {
      title: titleInput,
      amount: amountInput,
      type: typeInput,
      description: descriptionInput,
      createdAt: new Date(),
    };

    try {
      const docRef = await addDoc(collection(db, "users", auth.currentUser.uid, "transactions"), newTransaction);
      setHistoryList(prev => [...prev, { id: docRef.id, ...newTransaction }]);
      setTitleInput('');
      setAmountInput('');
      setTypeInput('Income');
      setDescriptionInput('');
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };


  const onDeleteTransaction = async id => {
    if (!auth.currentUser) return;

    try {
      await deleteDoc(doc(db, "users", auth.currentUser.uid, "transactions", id));
      setHistoryList(prev => prev.filter(txn => txn.id !== id));
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onLogout = async () => {
    console.log("Logout")
    try {
      await signOut(getAuth());
      dispatch(logout());
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  let totalIncome = 0
  let totalExpenses = 0
  historyList.map(eachItem => {
    if (eachItem.type === 'INCOME') {
      totalIncome += parseInt(eachItem.amount)
    } else if (eachItem.type === 'EXPENSES') {
      totalExpenses += parseInt(eachItem.amount)
    }
    return ''
  })

  return (
    <div className="main-container">
      <button className='btn btn-primary logout-button' onClick={onLogout}>Logout</button>
      <div className="welcome-container">
        <h1 className="name-heading">HI, Richard</h1>
        <p className="message">
          Welcome back to your{' '}
          <span className="color-blue">Money Manager</span>
        </p>
      </div>
      <MoneyDetails income={totalIncome} expenses={totalExpenses} />
      <div className="lower-section">
        <form className="form-container" onSubmit={onAddTransaction}>
          <h1 className="heading">Add transaction</h1>
          <label className="label-item" htmlFor="title">
            TITLE
          </label>
          <input
            className="input"
            placeholder="Title"
            type="text"
            id="title"
            value={titleInput}
            onChange={onChangeTitle}
          />
          <label className="label-item" htmlFor="amount">
            AMOUNT
          </label>
          <input
            className="input"
            placeholder="Amount"
            type="text"
            id="amount"
            value={amountInput}
            onChange={onChangeAmount}
          />
          <label className="label-item" htmlFor="description">
            DESCRIPTION
          </label>
          <input
            className="input"
            placeholder="Description"
            type="text"
            id="description"
            value={descriptionInput}
            onChange={onChangeDescription}
          />
          <label className="label-item" htmlFor="type">
            TYPE
          </label>
          <select className="input" onChange={onChangeType} value={typeInput}>
            {transactionTypeOptions.map(({ optionId, displayText }) => (
              <option value={optionId} key={optionId}>
                {displayText}
              </option>
            ))}
          </select>
          <button type="submit" className="add-button">
            Add
          </button>
        </form>
        <div className="history-container">
          <h1 className="heading">History</h1>
          <div className="list-first-row">
            <p className="list-heading">Title</p>
            <p className="list-heading">Amount</p>
            <p className="list-heading">Type</p>
          </div>
          <ul className="list-container">
            {historyList.map(eachItem => (
              <TrasactionItem
                transactionDetails={eachItem}
                key={eachItem.id}
                onDeleteTransaction={onDeleteTransaction}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
