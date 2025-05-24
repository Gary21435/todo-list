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
    getTodosOfCurrent,
    getTodo,
    editTodo
} from "./logic/todoManager.js";
import { displayProject, newProjectForm, addNodeNextTo, addTodoDOM, saveTodo, newTodoForm } from "./ui/dom.js";

const newProjButton = document.querySelector("#new-project");

// Make default project to start things off
const defProject = defaultProject();
const defProjectDOM = displayProject(defProject);
defProjectDOM.id = defProject.id;

// Check/uncheck a project/todo
document.addEventListener("click", (e) => {
    if(e.target.className === "todo-check" || e.target.className === "project-check") {
        const form = e.target.nextElementSibling;
        form.classList.toggle('line-through');
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
    if(e.target.className !== "project-form") return;
    const input = e.target.querySelector(".input-field");
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
    console.log("thisProj.id: ", thisProj.id);
    let editProj = getProject(thisProj.id);
    console.log("thisProj: ", thisProj);
    if (thisProj.id && editProj) {
        editProj.name = p.textContent;
    }
    else {
        // Create the object w/ todoManager's function IF it's a new project: 
        let newProj = newProject();
        projArr = getProjects();
        newProj.id = thisProj.id;
        newProj.name = p.textContent;
    }
    console.log(projArr);
});

// Open edit form for existing project
document.addEventListener("click", (e) => {
    if(e.target.className === "edit") {
        const p = e.target.parentNode.previousElementSibling.firstChild;
        console.log("p1: ",p);
        const input = document.createElement("input");
        input.type = "text";
        input.value = p.textContent;
        input.className = "input-field";

        const thisProj = e.target.parentElement.parentElement;
        const icons = thisProj.lastChild;
        const thisForm = icons.previousElementSibling;
        console.log(icons);

        // Add a done button
        let done_btn = document.createElement("button");
        done_btn.textContent = "Done";
        done_btn.className = "submit-btn";
        done_btn.type = "submit"

        

        console.log("why didn't run: ", e.target.parentElement);
        let form;
        if(thisForm.classList.contains("todo-form")) {
            //get the todo from todoManager
            let thisTodo = getTodo(thisForm.parentElement.id);
            console.log("thisTodo: ", thisTodo);
            let p2 = thisTodo.description;
            let p1 = thisTodo.title;
            console.log("p1111: ", p1);
            let p3 = thisTodo.dueDate;
            let p4 = thisTodo.priority;

            p.parentNode.remove();
            form = newTodoForm(p1, p2, p3, p4);
            thisProj.insertBefore(form, icons);
        }
        else {
            p.replaceWith(input);
            thisForm.appendChild(done_btn);
        }
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
        const parentProj = project.parentNode;
        project.remove();
        parentProj.remove();
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

// Save a todo
document.addEventListener("submit", (e) => {
    if(e.target.className !== "todo-form") return;

    const formData = new FormData(e.target);

    const input = formData.get('name');
    const description = formData.get('description');
    const dueDate = formData.get('due');
    const priority = formData.get('priority');

    // const name = document.createElement("p");
    // name.textContent = input.value;
    // name.style.width = "310px";
    // save todo with dom function
    let todo = e.target.parentElement;
    saveTodo(e.target, { input, description, dueDate, priority });

    // save todo in logic
    console.log(todo.id);
    let todoID = todo.id;

    const todos = getTodosOfCurrent();
    if(todos.find(obj => obj.id = todoID)) {
        editTodo(todoID, { input, description, dueDate, priority });
    }
    else
        addTodo({ input, description, dueDate, priority, todoID });
});


// test localStorage
function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    // storage.setItem(x, x);
    console.log(storage.getItem(x));
    // storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      e.name === "QuotaExceededError" &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

if (storageAvailable("localStorage")) {
  // Yippee! We can use localStorage awesomeness
  console.log("available");
} else {
  // Too bad, no localStorage for us
  console.log("unavailable");
}
