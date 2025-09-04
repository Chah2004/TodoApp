import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
export default function Todo(){
    let [todos , settodos] = useState([{task:"", id: uuidv4(), status:false }]);
    let [newtodo, setnewtodo] = useState("");
    let todochange=(event)=>{
        setnewtodo(event.target.value);
    }
    let addtodo=()=>{
        settodos((prevtodo)=>{
            return [...todos,{task: newtodo , id: uuidv4(), status:false}]
        });
        setnewtodo("");
    }
    let deletetodo = (id)=>{
        settodos((prevtodos)=>todos.filter((prevtodos)=>prevtodos.id!=id));
    };
    
    let donetodo = (id)=>{
        settodos((prevtodos)=>
           prevtodos.map((todo)=>{
            if(todo.id==id){
                return{
                    ...todo, 
                    status:true,
                };
            }
            else{
                return todo;
            }
           })
        );
    };

    let alldone = (id)=>{
        settodos((prevtodos)=>
           prevtodos.map((todo)=>{
                return{
                    ...todo, 
                    status:true,
                };
           })
        );
    };
    return(
        <>
        <input placeholder="Add task" onChange={todochange} value={newtodo}></input>
        <button onClick={addtodo}>Add</button>
        <hr></hr>
        <h4>Todo List</h4>
        <ul>
            {
                todos.map((todo) =>(
                     todo.task !== "" ? (
                    <li key = {todo.id}>
                        <span style={todo.status? {textDecoration:"line-through"} : {} }>{todo.task}</span>
                        <button onClick={() =>deletetodo(todo.id)}>Delete</button>
                        <button onClick={()=>donetodo(todo.id)}>Done</button>

                    </li>
                    ): null
                ))
            }
        </ul>
        <br/>
        <button onClick={alldone}>All Done</button>
        </>
    )
}