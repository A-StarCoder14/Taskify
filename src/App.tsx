import React, {FC, useState, ChangeEvent} from 'react';
import InputField from './Components/InputField';
import {Todo} from "./model"
import './App.css';
import TodoList from './Components/TodoList';
import { DragDropContext, DropResult } from "react-beautiful-dnd"
import { idText } from 'typescript';

const App: FC = () => {

const [todo, setTodo] = useState<string>("")

const [todos, setTodos] = useState<Todo[]>([])

const [completed, setCompleted] = useState<Todo[]>([])

const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
e.preventDefault()

if(todo !== ""){
  setTodos([...todos, {id: Date.now(), todo, isCompleted:false}])
  setTodo("")
}else{
  console.log("please enter a task")
}
}

  const onDragEnd = (result: DropResult) => {
    const {source, destination} = result;

    if(!destination ) return

    if(destination.droppableId === source.droppableId && destination.index === source.index) return

    let add,
        active = todos,
        complete = completed

    if(source.droppableId === "TodosList"){
      add = active[source.index]
      active.splice(source.index, 1)
    }else {
      add = complete[source.index]
      complete.splice(source.index, 1)
    }

    if(destination.droppableId === "TodosList"){
      active.splice(destination.index, 0, add)
    }else {
      complete.splice(destination.index, 0, add)
    }

    setTodos(active)
    setCompleted(complete)
  }



  return (

    <DragDropContext onDragEnd={onDragEnd}>
    
    <div className='App'>
      <span className='heading'>Taskify</span>
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd}/>
      <TodoList todos={todos} setTodos={setTodos} completed={completed} setCompleted={setCompleted}/>
   </div>
   
    </DragDropContext >

  );
}

export default App;
