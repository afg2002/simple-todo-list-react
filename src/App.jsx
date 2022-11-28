import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
const [activity, setActivity] = useState('')
const [todos,setTodos] = useState([])
const [editId, setEditId] = useState('')
const [message,setMessage]= useState('')


const inputHandler = (e)=>{
setActivity(e.target.value)
}

const saveHandler = (e)=>{
e.preventDefault()
const newValue = {
id : Date.now(),
activity,
done: false
}
if (editId){

const editedIndex = todos.findIndex((todo)=> editId === todo.id)
const newArrayVal = [...todos]

newArrayVal[editedIndex] = newValue
setTodos(newArrayVal)

return clearHandler()
}
if (!activity){
setMessage('Nama aktivitas tidak boleh kosong!')
return
}

setTodos([...todos,newValue])
setActivity('')
setMessage('')
}

const editHandler = (todo)=>{
setActivity(todo.activity)
setEditId(todo.id)
}

const deleteHandler = (todo)=>{
const deletedItemArray = todos.filter((el)=>{
return todo !== el.id
})

setTodos(deletedItemArray)
clearHandler()
}

const clearHandler = ()=>{
setActivity('')
setEditId('')
setMessage('')
}

const doneHandler = (todo)=>{
  const newValue = {
    ...todo,
    done : todo.done ? false : true,
  }
  const doneIndex = todos.findIndex((current)=> current.id === todo.id)
  const newArrayVal = [...todos]

  newArrayVal[doneIndex] = newValue
  setTodos(newArrayVal)
}
return (
<div className="App center">
  <h1>Simple TodoList App</h1>

  {message && <p style={{color:'white',fontSize:'20px',fontWeight:'bold'}}>{message}</p>}
  <div className='box'>

    <div className="item-box">
      <form onSubmit={saveHandler}>
        <input type="text" id='todoInput' onChange={inputHandler} value={activity} autoComplete='off' />

        <button type="submit" className='btn' style={{width:'60px'}}>
          {
          editId ? 'Update' : 'Add'
          }
        </button>
      </form>
    </div>
    <div className="list">
      {todos.length > 0 ?
      todos.map((todo)=>{
        return (
      <div className="item-list" key={todo.id}>
        <div className="checkbox">
          <input type="checkbox" onChange={doneHandler.bind(this,todo)}/>
        </div>
        <div className="isi">
          {
            todo.done ? <s>{todo.activity}</s> : todo.activity
          }
          </div>
        <div className='itemBtn'>
          <button className='btn' onClick={editHandler.bind(this,todo)}>Edit</button>
          <button className='btn' onClick={deleteHandler.bind(this,todo.id)}>Delete</button>
        </div>
      </div>
      )})
      :'Data Tidak Ada'
      }

    </div>
  </div>

</div>
)
}

export default App