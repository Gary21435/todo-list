import {
    defaultProject,
    newProject,
    setCurrentProject,
    addTodo,
    removeTodo,
    getProjects,
    getTodosOfCurrent
} from "./logic/todoManager.js";
import { displayProject, newProjectForm } from "./ui/dom.js";

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
    newProjectForm();
});

document.addEventListener("click", (e) => {
    if(e.target.className === "expand-icon") {
        e.target.style.transition = "transform 0.2s ease-in-out";
        e.target.style.transform === "rotate(-180deg)" ? e.target.style.transform = "rotate(0deg)" : e.target.style.transform = "rotate(-180deg)";
    }
});