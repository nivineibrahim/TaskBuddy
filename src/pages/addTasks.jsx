import React from "react";
import TaskForm from "../component/task-form/taskForm";
import Task from "../component/task-form/task";
import { Link } from "react-router-dom";
import { useState, useEffect,useContext } from "react";
import { collection, onSnapshot,doc } from "firebase/firestore";
import { database, auth } from "../utils/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { MainContext } from "../utils/context";
//import { getTasksForUser } from "../utils/firebaseFunctions";
function AddTasks(){
    const {username}=useContext(MainContext)
    const [tasks, setTasks] = useState([]);
      const [user] = useAuthState(auth);
      

  useEffect(() =>{
        if(!user) return;
        const userDocRef=doc(database,"users",user.uid);
        const unsubscribe=onSnapshot(userDocRef,
    (docSnap)=>{
        if(docSnap.exists()){
            const data=docSnap.data();
            setTasks(data.tasks || []);
        }
    })
    return ()=>unsubscribe();
      }, [user]);

      
    
      return (
        <div className="tasks-container">
           <TaskForm />
    
          <h2 className="tasks-container__text">Here are all your Tasks {username}</h2>
          
          {tasks.map((task, index) => {
            
            return <Task key={index} text={task} />;
          })}
         
        </div>
        
      );
}
export default AddTasks;