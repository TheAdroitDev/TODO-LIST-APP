import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true)

  useEffect(() => {
    let todoString = JSON.parse(localStorage.getItem("todos"));
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos)
    }
  }, [])


  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = (e) => {
    setShowFinished(!showFinished)
  }
  

  const handleDelete = (e, id) => {
    if (confirm("Are you sure want to delete it!!")) {
      let newTodos = todos.filter(item => {
        return item.id !== id
      });
      setTodos(newTodos);
    }
    saveToLS()
  };
  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    saveToLS()
  }
  const handleChange = (e) => {
    setTodo(e.target.value);
  }
  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo);
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos);
    saveToLS()
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS()
  }

  return (
    <>
      <Navbar />
      <div className="md:container mx-3 md:mx-auto my-5 rounded-xl bg-violet-100 p-5 min-h-[80vh] md:w-[45%]">
        <h1 className='font-bold text-center text-xl'>iTask - Manage Your todo at one place </h1>
        <div className="addTodo my-5">
          <h2 className='text-lg font-bold'>Add a Todo</h2>
          <input onChange={handleChange} value={todo} type="text" className='w-[60%] focus:w-[80%] rounded-md transition-all duration-[400ms] focus:py-1 focus:p-1 focus:rounded-xl' />
          <button onClick={handleAdd} disabled={todo.length<=3} className='bg-violet-800 hover:bg-violet-950 py-1 p-3 text-white rounded-md mx-6 font-bold disabled:bg-violet-700'>Save</button>
        </div>
        <input onChange={toggleFinished} type="checkbox" checked={showFinished} />Show Finished
        <div className='h-[1px] opacity-50 bg-[#555555] w-[90%] mx-auto my-2'></div>
        <h2 className='text-xl font-bold my-4'>Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className='m-5'>No Todos to display</div>}
          {todos.map(item => {
            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex justify-between my-3">
              <div className='flex gap-5'>
                <input onChange={handleCheckbox} type="checkbox" name={item.id} checked={item.isCompleted} id="" />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e) => { handleEdit(e, item.id) }} className='bg-violet-800 hover:bg-violet-950 py-1 p-3 text-white rounded-md mx-1 font-bold' ><FaEdit /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-violet-800 hover:bg-violet-950 py-1 p-3 text-white rounded-md mx-1 font-bold' ><AiFillDelete /> </button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App  