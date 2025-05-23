import { useState } from 'react'
import './index.css'

const TransactionItem = props => {
  const { transactionDetails, onDeleteTransaction } = props
  const { id, title, amount, type, description } = transactionDetails
  const onDelete = () => {
    onDeleteTransaction(id)
  }
  const [onShow, setOnShow] = useState(false)
  const onShowDescription = () => {
    setOnShow(prev => !prev)
  }
  return (
      <li className="list-item" onClick={onShowDescription}>
      <div className="list-element-container">
        <p className="list-element">{title}</p>
        <p className="list-element">Rs {amount}</p>
        <p className="list-element">{type}</p>
        <button
          className="delete-button"
          onClick={onDelete}
          type="button"
          data-testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
            alt="delete"
            className="delete-icon"
          />
        </button>

      </div>
      {onShow && <p className="list-element-description"><span style={{fontWeight: 'bold'}}>Description: </span>{description}</p>}
      </li>
  )
}
export default TransactionItem