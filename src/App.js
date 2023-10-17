import {Component} from 'react'
import {BsTrash} from 'react-icons/bs'

import './App.css'

// Replace your code here
class App extends Component {
  state = {
    todoItemsList: [],
    newTodoItem: '',
    errorMsg: false,
  }

  componentDidMount() {
    this.getTask()
  }

  getTask = async () => {
    const url = 'https://jsonplaceholder.typicode.com/users/1/todos'
    const options = {
      method: 'GET',
    }

    const response = await fetch(url, options)
    const data = await response.json()

    const newData = data.map(item => ({
      userId: item.userId,
      id: item.id,
      title: item.title,
      completed: item.completed,
    }))
    this.setState({todoItemsList: [...newData]})
  }

  onChangeinputElement = event => {
    this.setState({newTodoItem: event.target.value})
  }

  onclickAddButton = event => {
    event.preventDefault()
    const {todoItemsList, newTodoItem} = this.state
    if (newTodoItem !== '') {
      const newId = todoItemsList[todoItemsList.length - 1].id
      const newTodo = {
        completed: false,
        id: newId + 1,
        title: newTodoItem,
        userId: 1,
      }

      this.setState({todoItemsList: [...todoItemsList, newTodo]})
      this.setState({errorMsg: false})
      this.setState({newTodoItem: ''})
    } else {
      this.setState(prevState => ({errorMsg: !prevState.errorMsg}))
    }
  }

  deleteTodoItem = id => {
    const {todoItemsList} = this.state
    const filteredTodoItem = todoItemsList.filter(item => item.id !== id)

    this.setState({todoItemsList: [...filteredTodoItem]})
  }

  onChangeboxElement = Id => {
    const {todoItemsList} = this.state
    console.log(Id)
    const updatedCheckboxList = todoItemsList.filter(item => item.id === Id)

    // console.log(updatedCheckboxList)

    const {userId, id, title, completed} = updatedCheckboxList[0]

    const updatedTodo = {
      userId,
      id,
      title,
      completed: !completed,
    }

    // console.log(updatedTodo)

    todoItemsList[Id - 1] = updatedTodo

    this.setState({
      todoItemsList: [...todoItemsList],
    })
  }

  render() {
    const {todoItemsList, newTodoItem, errorMsg} = this.state

    return (
      <div className="todo-bg-container">
        <h1 className="heading">Todo Application</h1>
        <form onSubmit={this.onclickAddButton}>
          <label htmlFor="newTodoItem" className="new-heading">
            New Todo
          </label>
          <br />
          <input
            type="text"
            className="input-element"
            id="newTodoItem"
            placeholder="Create your task"
            onChange={this.onChangeinputElement}
            value={newTodoItem}
          />
          {errorMsg && <p className="error-msg">Please enter task title</p>}
          <button type="submit" className="add-button">
            Add
          </button>
        </form>
        <h1 className="todo-heading">Todos List : </h1>
        <ul className="ul-todo-items-container">
          {todoItemsList.map(item => (
            <li className="list-todo-item" key={item.id}>
              <div>
                <input
                  type="checkbox"
                  id="checkbox"
                  defaultChecked={item.completed}
                  onClick={() => {
                    this.onChangeboxElement(item.id)
                  }}
                />
                <label
                  htmlFor="checkbox"
                  className={`${
                    item.completed ? 'completed-label-element' : 'label-element'
                  } `}
                >
                  {item.title}
                </label>
              </div>

              <button
                type="button"
                className="delete-icon"
                onClick={() => {
                  this.deleteTodoItem(item.id)
                }}
              >
                <BsTrash />
              </button>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default App
