import {
    defaultProject,
    newProject,
    setCurrentProject,
    addTodo,
    removeTodo,
    getProjects,
    getTodosOfCurrent
} from "./logic/todoManager.js";
import { displayProject, newProjectForm, addNodeNextTo } from "./ui/dom.js";

const newProjButton = document.querySelector("#new-project");

// Make default project to start things off
const defProject = defaultProject();
displayProject(defProject);

// Check/uncheck a project
document.addEventListener("click", (e) => {
    if(e.target.classList.contains("project-check")) {
        const p = e.target.nextElementSibling;
        p.classList.toggle('line-through');
    }
});

newProjButton.addEventListener("click", (e) => {
    newProjectForm();
});

// Animation for expand icon
document.addEventListener("click", (e) => {
    if(e.target.className === "expand-icon") {
        e.target.style.transition = "transform 0.2s ease-in-out";
        e.target.style.transform === "rotate(-180deg)" ? e.target.style.transform = "rotate(0deg)" : e.target.style.transform = "rotate(-180deg)";
    }
});

// Name new project
document.addEventListener("click", (e) => {
    if(e.target.className === "submit-btn") {
        const input = e.target.previousElementSibling;
        const p = document.createElement("p");
        p.textContent = input.value;
        input.replaceWith(p);
        e.target.remove();
    }
});

// Edit existing project name 
document.addEventListener("click", (e) => {
    if(e.target.className === "edit") {
        console.log(e.target);
        const p = e.target.parentNode.previousElementSibling;
        console.log(p);
        const input = document.createElement("input");
        input.type = "text";
        input.value = p.textContent;
        p.replaceWith(input);

        let done_btn = addNodeNextTo(input, "button");
        done_btn.textContent = "done";
        done_btn.className = "submit-btn";
    }
});