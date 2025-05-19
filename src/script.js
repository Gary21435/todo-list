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

const newProjButton = document.querySelector("#new-project");

// Make default project to start things off
const defProject = defaultProject();
displayProject(defProject);

document.addEventListener("click", (e) => {
    if(e.target.classList.contains("project-check")) {
        const p = e.target.nextElementSibling;
        p.classList.toggle('line-through');
    }
});

newProjButton.addEventListener("click", (e) => {
    const defProject = defaultProject();
    displayProject(defProject);
});
