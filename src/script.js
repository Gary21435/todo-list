import { Project } from "./logic/project.js";
import {
    projectCheck,
    getProject,
    deleteProject,
    defaultProject,
    newProject,
    setCurrentProject,
    addTodo,
    removeTodo,
    getProjects,
    getTodosOfCurrent
} from "./logic/todoManager.js";
import { displayProject, newProjectForm, addNodeNextTo, addTodoDOM } from "./ui/dom.js";

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
    if(e.target.className === "expand") {
        e.target.style.transition = "transform 0.2s ease-in-out";
        e.target.style.transform === "rotate(-180deg)" ? e.target.style.transform = "rotate(0deg)" : e.target.style.transform = "rotate(-180deg)";
    }
});

// Name/rename project
document.addEventListener("submit", (e) => {
    e.preventDefault(); // don't submit to #
    const input = document.querySelector(".input-field");
    const p = document.createElement("p");
    p.textContent = input.value;
    p.style.width = "310px";
    input.replaceWith(p);
    p.nextElementSibling.remove();
    
    let projArr = getProjects();
    //let lastProj = projArr.at(-1); // THIS IS WRONG; it's not always the last project
                                   // Also, this is a SHALLOW COPY!
                                   // in todoManager, the last one gets changed no matter which you edit
    
    let thisProj = p.parentElement.parentElement;
    let editProj = getProject(thisProj.id);
    console.log("thisProj: ", thisProj);
    if (thisProj.id) {
        editProj.name = p.textContent;
    }
    else {
        // Create the object w/ todoManager's function IF it's a new project: 
        let newProj = newProject();
        projArr = getProjects();
        thisProj.id = newProj.id;
        newProj.name = p.textContent;
    }
    console.log(projArr);
});

// Open edit form for existing project
document.addEventListener("click", (e) => {
    if(e.target.className === "edit") {

        const p = e.target.parentNode.previousElementSibling.firstChild;
        const input = document.createElement("input");
        input.type = "text";
        input.value = p.textContent;
        input.className = "input-field";
        p.replaceWith(input);

        // Add a done button
        let done_btn = addNodeNextTo(input, "button");
        done_btn.textContent = "Done";
        done_btn.className = "submit-btn";
        done_btn.type = "submit"
    }
});

// Mark project complete/incomplete
document.addEventListener("click", (e) => {
    if(e.target.className === "project-check") {
        projectCheck(e.target.parentElement.id);
    }
});

// Delete a project
document.addEventListener("click", (e) => {
    if(e.target.className === "del") {
        const project = e.target.parentNode.parentNode; // project is icon-container's parent

        // delete project object from projects array of todoManager
        deleteProject(project.id);
        project.remove();
    }
});

// Add a todo
document.addEventListener("click", (e) => {
    if(e.target.className === "add") {
        // set current project
        // call dom.js addtodo to create new todo form
        // set todo properties
        const thisProj = e.target.parentNode.parentNode.parentNode;
        console.log("thisProj: ", thisProj);
        setCurrentProject(thisProj.id);
        addTodoDOM(thisProj);
    }
});