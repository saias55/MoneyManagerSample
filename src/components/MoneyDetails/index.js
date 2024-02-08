// Write your code here
const MoneyDetails = props => {
  const {eachItem, modifyingList} = props
  const {title, amount, initial, id} = eachItem
  const incomeType = initial === 'INCOME' ? 'Income' : 'Expense'
  const onDeletingParticularTransaction = () => modifyingList(id)
  return (
    <li>
      <h1>{title}</h1>
      <p>{amount}</p>
      <p>{incomeType}</p>
      <button type="button" onClick={onDeletingParticularTransaction}>
        Delete
      </button>
    </li>
  )
}

export default MoneyDetails
