import {
    defaultProject,
    newProject,
    setCurrentProject,
    addTodo,
    removeTodo,
    getProjects,
    getTodosOfCurrent
} from "./logic/todoManager.js";
import { displayProject } from "./ui/dom.js";

// Make default project to start things off
const defProject = defaultProject();
displayProject(defProject);

