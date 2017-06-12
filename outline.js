Lesson 0:
  SWBAT identify what makes Redux a great tool for state management
    - What is Redux/Why does it exist?
        Headshot (A)
          State management. (Bugs come from state mismanagement)
          Shared/Cached state in React. Move to "store"
    - How Redux improves predictability
        Headshot (B)
          How Redux leads to more predictable state changes
    - Redux Store vs Component State
        Headshot (C)
          Pros and cons of "store"
          Which state where
Lesson 1:
  SWBAT create and add data to a Redux store (/users)
    - Reducers (Create Redcuers)
        Headshot (D)
          Create the shape of your store
          Specificy how store will change based off events
        Screencast
          Create users Reducer
    - Actions (Create actions)
        Headshot (E)
          Actions
    - createStore (Create a redux store)
        Headshot (F)
          createStore
          Show properties on store.
        Screencast
          Use createStore to create a store.
          log properties
    - react-redux (Use the react-redux bindings)
        Headshot (G) ()
          So far, "vanilla Redux". Nothing React specific. Tie Redux to React
          react-redux
            Two main purposes of react-redux, provider and connect
        Headshot (H) (Use react-redux's connect method)
          connect
            dispatch
            mapStateToProps
        Headshot (I) (Use react-redux's connect method)
          Provider
        Screencast
          Wrap App with a Provider
          connect() App and grab users's state and log it
        Screencast
          DevTools
        Screencast
          talk about action creators
          RECEIVE_USERS action and action creator
        ScreenCast
          getUsers -> dispatch receiveUsers
Lessons 2:
  SWBAT use Reducer composition to architect Redux stores
    - combineReducers
        Headshot
        Screencast
          Implement authedUser
    - Normalization
        Headshot
        Finish building the rest of the app

(D) Reducers code

{
  todos: [
    {
      text: 'Learn Redux',
      completed: true,
    },
    {
      text: 'Beat Richard at Ping Pong',
      completed: false
    }
  ]
}

function todoApp(state, action) {
  if (action.type === 'ADD_TODO') {
    return {
      todos: state.todos.concat(action.todo)
    }
  }

  return state
}

{
  visibilityFilter: 'All' // 'Completed', 'Incomplete'
  todos: [
    {
      text: 'Learn Redux',
      completed: true,
    },
    {
      text: 'Beat Richard at Ping Pong',
      completed: false
    }
  ]
}

function todoApp(state, action) {
  if (action.type === 'ADD_TODO') {
    return {
      todos: state.todos.concat(action.todo)
    }
  }

  return state
}

function todoApp(state, action) {
  if (action.type === 'ADD_TODO') {
    return {
      visibilityFilter: state.visibilityFilter,
      todos: state.todos.concat(action.todo)
    }
  }

  return state
}

function todoApp(state, action) {
  if (action.type === 'ADD_TODO') {
    return {
      ...state,
      todos: state.todos.concat(action.todo)
    }
  }

  return state
}

const initialState = {
  visibilityFilter: 'All',
  todos: []
}

function todoApp(state = initialState, action) {
  if (action.type === 'ADD_TODO') {
    return {
      ...state,
      todos: state.todos.concat(action.todo)
    }
  }

  return state
}

(E)
{
  type: 'ADD_TODO,
  todo: 'Walk the dog'
}

const initialState = {
  visibilityFilter: 'All',
  todos: []
}

function todoApp(state = initialState, action) {
  if (action.type === 'ADD_TODO') {
    return {
      ...state,
      todos: state.todos.concat(action.todo)
    }
  }

  return state
}

(F) Code
import { createStore } from 'redux'

const initialState = {
  visibilityFilter: 'All',
  todos: []
}

function todoApp(state = initialState, action) {
  if (action.type === 'ADD_TODO') {
    return {
      ...state,
      todos: state.todos.concat(action.todo)
    }
  }

  return state
}

const store = createStore(todoApp)

console.log(store.getState()) // {
  //visibilityFilter: 'All',
  //todos: []
//}

(H) connect()
function addTodo (todo) {
  return {
    type: 'ADD_TODO,
    todo
  }
}

import React, { Component } from 'react'
import { addTodo } from './actions'

class TodoList extends Component {
  addItem(todo) {
    ???
  }
  render() {

  }
}

export default TodoList

becomes

import React, { Component } from 'react'
import { addTodo } from './actions'
import { connect } from 'react-redux'

class TodoList extends Component {
  addItem(todo) {
    this.props.dispatch(addTodo(todo))
  }
  render() {

  }
}

export default connect()(TodoList)

function todoApp(state = initialState, action) {
  if (action.type === 'ADD_TODO') {
    return {
      ...state,
      todos: state.todos.concat(action.todo)
    }
  }

  return state
}

class TodoList extends Component {
  addItem(todo) {
    this.props.dispatch(addTodo(todo))
  }
  render() {
    const { visibilityFilter, todos } = this.props

    return (
      ...
    )
  }
}



function mapStateToProps (state) {
  return {
    visibilityFilter: state.visibilityFilter,
    todos: state.todos,
  }
}

export default connect(mapStateToProps)(TodoList)

(I) Provider
  ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
