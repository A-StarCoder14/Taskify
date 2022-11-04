import React, { FC, useState, useRef, useEffect } from 'react'
import { Todo } from '../model';
import {AiFillDelete, AiFillEdit} from "react-icons/ai"
import { MdDone} from "react-icons/md"
import "./Styles.css"
import { Draggable } from 'react-beautiful-dnd';
 
interface Props {
    index: number;
    todo: Todo;
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}



const SingleTodo: FC<Props> = ({index, todo, todos, setTodos}) => {

   const [update, setUpdate] = useState<boolean>(false)
   const [edit, setEdit] = useState<string>(todo.todo)


    const singleRef = useRef<HTMLInputElement>(null)

    useEffect(()=> {
        singleRef.current?.focus()
    },[update])
    
    
    const handleDone = (id: number) => {
      setTodos(todos.map(todo => todo.id === id ? {...todo, isCompleted: !todo.isCompleted}: todo )
    )}

    const handleDelete = (id: number) => {
        setTodos(todos.filter(todo=> todo.id !== id ))
    }

    const handleEdit = (e: React.FormEvent, id: number) => {
        e.preventDefault()

        setTodos(todos.map(todo => todo.id === id ? {...todo, todo: edit}: todo))

        setUpdate(false)
    }



  return (

    <Draggable draggableId={todo.id.toString()} index={index}>

        {
            (provided)=> (

            <form className='todos_single' 
            onSubmit={(e)=> handleEdit(e, todo.id)} 
            {...provided.draggableProps} 
            {...provided.dragHandleProps}
            ref={provided.innerRef}>

            {
                update === true ? (
                    <input className='input_box' value={edit} ref={singleRef} onChange={(e)=> setEdit(e.target.value)} type="text" />
                ) : (
                    
                    
                        todo.isCompleted ? ( 
                            <s className='todos_single_text'>{todo.todo}</s>
    
                        ) : (
                            <span className='todos_single_text'>{todo.todo}</span>
                        )
                    
                )
            }    
    
    
            <div>
                <span className='icon'typeof='submit' onClick={()=>{
                    if(!update && !todo.isCompleted){
                        setUpdate(!update)
                    }else if (update) {
                        setUpdate(!update)
                    }}
                }>
                    <AiFillEdit />
                </span>
                <span className='icon' onClick={()=> handleDelete(todo.id)}>
                    <AiFillDelete />
                </span>
                <span className='icon' onClick={()=> handleDone(todo.id)}>
                    <MdDone />
                </span>
            </div>
    
    
            </form>
    
            )
        }

    </Draggable>

   
  )
}

export default SingleTodo