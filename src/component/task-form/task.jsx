import React from "react";
import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { removeTask } from "../../utils/firebaseFunctions";
function Task({text}){
    const [checked,setChecked]=useState(false);
    const handleChange=(e)=>{
        setChecked(e.target.checked);
    }
    const handleDelete=async ()=>{
     removeTask(text);
    };

    return(
        <div className="task-container">
            <div className="task-container__task">
            <input type="checkbox" id="checkbox" value={checked} onChange={handleChange} className="task-container__checkbox"/>
            <label htmlFor="checkbox" className={`task-container__text ${checked ? "task-container__text--checked" :" " }`}>{text}</label></div>
            <AiFillDelete className="task-container__icon" onClick={handleDelete}/>
            
            
        </div>
    )
}
export default Task;