import React, { FC , useRef} from 'react'
import { Droppable } from 'react-beautiful-dnd';
import { Todo } from '../model'
import SingleTodo from './SingleTodo';
import "./Styles.css"

interface Props {
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    completed: Todo[]
    setCompleted: React.Dispatch<React.SetStateAction<Todo[]>>
    
}


 const TodoList:FC<Props> = ({todos, setTodos, completed, setCompleted}) => {
  return (
    <div className='container'>
        <Droppable droppableId='TodosList'>

    {
        (provided)=> (
            <div className={`todos`} 
            ref={provided.innerRef} 
            {...provided.droppableProps}>

            <span className="todos_heading">
                Active tasks
            </span>
            {
                todos.map((todo, index)=> (
                    <SingleTodo index={index} setTodos={setTodos} todos={todos} todo={todo} key={todo.id}/>
                ))
            }
            {provided.placeholder}
        </div>
        )
    }
              </ Droppable >
            <Droppable droppableId='TodosRemove'>

            {
                (provided) => (
                    <div className={'todos remove'} ref={provided.innerRef} {...provided.droppableProps}>

                    <span className='todos_heading'>Completed Tasks</span>
                   {
                    completed.map((todo, index) => (
                        <SingleTodo index={index} todo={todo} setTodos={setCompleted} todos={completed} key={todo.id} />
                    ))
                   }
                   {provided.placeholder}
                </div>
                )
            }


          
            </Droppable>
    </div>
  )
}

export default TodoList