import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import MoneyDetails from '../MoneyDetails'
import './index.css'

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

class MoneyManager extends Component {
  state = {
    balance: 0,
    income: 0,
    expenses: 0,
    initial: 'INCOME',
    transactionList: [],
    title: '',
    amount: '',
  }

  modifyingList = id => {
    const {transactionList} = this.state
    const gettingParticularTranscation = transactionList.filter(
      each => each.id === id,
    )

    const filtering = transactionList.filter(each => each.id !== id)

    const {amount, initial} = gettingParticularTranscation[0]
    if (initial === 'INCOME') {
      this.setState(prevState => ({
        income: prevState.income - parseInt(amount),
      }))
      this.setState(prevState => ({
        balance: prevState.balance - parseInt(amount),
      }))
    } else {
      this.setState(prevState => ({
        balance: prevState.balance + parseInt(amount),
      }))
      this.setState(prevState => ({
        expenses: prevState.expenses - parseInt(amount),
      }))
    }

    this.setState({transactionList: filtering})
  }

  onChangingDropDown = event => this.setState({initial: event.target.value})

  onChangingTitle = event => this.setState({title: event.target.value})

  onChangingAmount = event => this.setState({amount: event.target.value})

  onSubmittingForm = event => {
    event.preventDefault()
    const {title, amount, initial} = this.state
    if (initial === 'INCOME') {
      this.setState(prevState => ({
        income: prevState.income + parseInt(amount),
      }))
      this.setState(prevState => ({
        balance: prevState.balance + parseInt(amount),
      }))
    } else {
      this.setState(prevState => ({
        expenses: prevState.expenses + parseInt(amount),
      }))
      this.setState(prevState => ({
        balance: prevState.balance - parseInt(amount),
      }))
    }

    const userTranscationDetails = {
      id: uuidv4(),
      title,
      amount,
      initial,
    }

    this.setState(prevState => ({
      transactionList: [...prevState.transactionList, userTranscationDetails],
      title: '',
      amount: '',
      initial: 'INCOME',
    }))
  }

  render() {
    const {
      balance,
      income,
      expenses,
      title,
      amount,
      initial,
      transactionList,
    } = this.state
    return (
      <div className="main-container">
        <div className="items-in-row">
          <div>
            <h1>BALANCE</h1>
            <h1>{balance}</h1>
          </div>
          <div className="margion-left">
            <h1>INCOME</h1>
            <h1>{income}</h1>
          </div>
          <div className="margion-left">
            <h1>EXPENSES</h1>
            <h1>{expenses}</h1>
          </div>
        </div>
        <div>
          <form onSubmit={this.onSubmittingForm}>
            <input
              type="text"
              value={title}
              placeholder="enter title"
              onChange={this.onChangingTitle}
            />
            <br />
            <br />
            <input
              type="number"
              value={amount}
              placeholder="enter amount"
              onChange={this.onChangingAmount}
            />
            <br />
            <br />
            <select value={initial} onChange={this.onChangingDropDown}>
              {transactionTypeOptions.map(each => (
                <option value={each.optionId}>{each.displayText}</option>
              ))}
            </select>
            <br />
            <br />
            <button type="submit">add</button>
          </form>
        </div>
        <br />
        <br />
        <h1>Transcation History</h1>
        <br />
        <ul>
          {transactionList.map(eachItem => (
            <MoneyDetails
              eachItem={eachItem}
              key={eachItem.id}
              modifyingList={this.modifyingList}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default MoneyManager
