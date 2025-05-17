import React from "react";
const homePath = "/";
const addTasksPath = "/addTasks";

export const ishomeSelected = (currentPath) => currentPath === homePath;
export const isaddTasksSelected= (currentPath) => currentPath === addTasksPath;