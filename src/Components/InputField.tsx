import React,{useRef} from 'react'
import "./Styles.css"

interface Props {
    todo: string;
    setTodo: React.Dispatch<React.SetStateAction<string>>
    handleAdd: (e: React.FormEvent<HTMLFormElement>) => void
}


const InputField: React.FC<Props> = ({todo, setTodo, handleAdd}) => {

    const refUno = useRef<HTMLInputElement>(null)

  return (
   <form className='input' onSubmit={(e)=>{handleAdd(e); refUno.current?.blur()}}>
    <input type="input" 
    value={todo}
    ref={refUno}
    onChange={
        (event:React.ChangeEvent<HTMLInputElement>)=> {
            setTodo(event.target.value)
        }
    }
    placeholder='Enter a Task' className='input_box' />
    <button className='input_submit' type='submit'>Go</button>
   </form>
  )
}

export default InputField
