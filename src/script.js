import { Project } from "./logic/project.js";
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
const defProjectDOM = displayProject(defProject);
defProjectDOM.id = defProject.id;

// Check/uncheck a project
document.addEventListener("click", (e) => {
    if(e.target.classList.contains("project-check")) {
        const p = e.target.nextElementSibling;
        p.classList.toggle('line-through');
    }
});

// Make new project
newProjButton.addEventListener("click", (e) => {
    // call the dom.js function

    newProjectForm();
});

// Animation for expand icon
document.addEventListener("click", (e) => {
    if(e.target.className === "expand-icon") {
        e.target.style.transition = "transform 0.2s ease-in-out";
        e.target.style.transform === "rotate(-180deg)" ? e.target.style.transform = "rotate(0deg)" : e.target.style.transform = "rotate(-180deg)";
    }
});

// Name/rename project
document.addEventListener("submit", () => {
    const input = document.querySelector(".input-field");
    const p = document.createElement("p");
    p.textContent = input.value;
    p.style.width = "310px";
    input.replaceWith(p);
    p.nextElementSibling.remove();

    // Create the object w/ todoManager's function IF it's a new project: 
    let projArr = getProjects();
    let lastProj = projArr.at(-1);
    let thisProj = p.parentElement.parentElement;
    console.log("thisProj: ", thisProj);
    if (thisProj.id) {
        lastProj.name = p.textContent;
    }
    else {
        newProject();
        projArr = getProjects();
        lastProj = projArr.at(-1);
        thisProj.id = lastProj.id;
        lastProj.name = p.textContent;
    }
    console.log(projArr);
});

// Edit existing project name 
document.addEventListener("click", (e) => {
    if(e.target.className === "edit") {
        console.log(e.target);
        const p = e.target.parentNode.previousElementSibling.firstChild;
        console.log(p);
        const input = document.createElement("input");
        input.type = "text";
        input.value = p.textContent;
        input.className = "input-field";
        p.replaceWith(input);

        // Add a done button
        let done_btn = addNodeNextTo(input, "button");
        done_btn.textContent = "done";
        done_btn.className = "submit-btn";
        done_btn.type = "submit"
    }
});