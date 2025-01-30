import React, { useEffect } from 'react'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";
import bg from '../assets/bg.jpg';
import '../App.css'

export default function todo() {
  const[todo,setTodo]=useState("");
  const[todos,setTodos]=useState([]);
  const[show,setShow]=useState(false);

  useEffect(()=>{
    let todosString=localStorage.getItem("todos")
    if(todosString){
      let xtodos=JSON.parse(localStorage.getItem("todos"))
      setTodos(xtodos)
    }
  },[])

  const saveLS = ()=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  }

  const toggleShow=(e)=>{
    setShow(!show)
  }

  const handleAdd=()=>{
    setTodos([...todos,{id:uuidv4(),todo,isCompleted:false}])
    setTodo("")
    saveLS()
  }
     
  const handleChange=(x)=>{
    setTodo(x.target.value)
  }

  const handleCheckbox=(x)=>{
    let id=x.target.name; 
    let index=todos.findIndex(item=>{
      return item.id===id
    })
    let newTodos=[...todos]; 
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveLS()
  }

  const handleEdit=(x,id)=>{
    let y=todos.filter(i=>i.id===id)
    setTodo(y[0].todo)
    let newTodos=todos.filter(item=>{
      return item.id !==id;
    }
   )
   setTodos(newTodos)  
   saveLS()
  }

  const handleDelete=(x,id)=>{
      let newTodos=todos.filter(item=>{
        return item.id !==id;
      }
     )
     setTodos(newTodos)
     saveLS()
  }
  return (
    <div className=" mx-auto sm:w-3/4 w-11/12 font-[Roboto]">
        <div className="head bg-green-300 p-3 mt-3 border rounded-md h-full">

        <h1 className='text-green-900 font-bold text-2xl text-center '>ADD YOUR PRIORITY TASKS</h1>

            <div className="flex sm:flex-row flex-col sm:justify-center items-center gap-2 my-2">
        <input type="text" className='form-control rounded-lg h-9 sm:w-3/5 w-4/5' onChange={handleChange} value={todo} name={todo.id} id="" />
        <button type="button" onClick={handleAdd} disabled={todo.length<=3} className="btn h-9 sm:ms-2 max-w-10 font-bold bg-green-600 hover:bg-green-900 disabled:bg-green-600 hover:text-white border-0"><IoMdAddCircle /></button>
            </div> 

        <h2 className='text-green-900 font-[Oswald] font-bold text-xl text-center'>List of To-Do</h2>

        <div className="flex gap-2 justify-center my-2">
        <input type="checkbox" checked={show} onChange={toggleShow}/> 
        <h2 className='text-green-900 font-bold'>Show finished tasks</h2>
        </div>

        <div className="todos mt-5 font-[Oswald]">
          {todos.length===0 && <div className='text-green-900  text-center font-bold'>No remaining tasks</div>}
          {todos.map (item=>{
            // If show=true then it will show all tasks. If show=false then it will only show incompleted taks.
          return (show || !item.isCompleted) && <div key={item.id} className="todo flex justify-between lg:w-3/5 mx-auto items-center gap-2 my-2">

            <div className="text flex items-baseline text-xl">
            <input type="checkbox" className='me-2' onChange={handleCheckbox} checked={item.isCompleted} name={item.id}  id="" />
            <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
            </div>

            <div className="buttons flex sm:gap-1">
            <button type="button" onClick={(x)=>{handleEdit(x,item.id)}} className="btn w-10 font-bold bg-green-600 hover:bg-green-900 hover:text-white border-0"><FaRegEdit /></button>
            <button type="button" onClick={(x)=>{handleDelete(x,item.id)}} className="btn ms-1 text-center w-10 font-bold bg-green-600 hover:bg-green-900 hover:text-white border-0"><MdDelete /></button>
            </div>
          </div>
          })}
        </div>
      </div>
    </div>
  )
}
