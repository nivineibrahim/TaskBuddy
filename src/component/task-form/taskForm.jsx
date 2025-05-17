import React from "react";
import {useState,useContext} from 'react';
import {MainContext} from "../../utils/context";
import {setDoc,doc,collection} from "firebase/firestore";
import {auth,database} from "../../utils/firebaseConfig";
import { updateTasksArray } from "../../utils/firebaseFunctions";
function TaskForm(){
    const  [task,setTask]=useState("");
    const {user}=useContext(MainContext);
    const handleSubmit = async (e) => {
      if(user){
        e.preventDefault();
      }
        try{
            
            await updateTasksArray(task);
           // setTask("");
          }
           catch (error) {
          setError(getErrorMessage(error));
          }
        } 
      
return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-group">
        <label htmlFor="task-text">Task Text:</label>
        <textarea
          id="task-text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter your task!"
          required></textarea>
      </div>
      
      <button type="submit">Add your Task</button>
    </form>
  );
}
export default TaskForm;