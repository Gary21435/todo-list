import { Project } from "./project.js";
import { Todo } from "./todo.js";

let projects = [];
let current_project; // select a project by clicking anywhere on it, which would highlight it with a border?

function defaultProject() {
    const project = new Project('Make Todo App');
    projects.push(project);
    current_project = project;
    return project; // ??
}

function newProject(name) {
    const new_project = new Project(name);
    projects.push(new_project);
    current_project = new_project;

    return new_project;
}

function setCurrentProject(id) {
    const project = projects.find(proj => proj.id === id);
    if(project) current_project = project;
}

function projectCheck(id) {
    const proj = projects.find(obj => obj.id === id);
    proj.toggle();
    console.log("project checked: ", proj);
}

function addTodo(todo_data) { 
    const new_todo = new Todo(...Object.values(todo_data));
    current_project.addTodo(new_todo);
}

// function saveTodo()

function removeTodo(todo_data) {
    current_project.removeTodo(todo_data.title);
}

function getProjects() {
    return [...projects];
}

function getProject(id) {
    return projects.find(obj => obj.id === id);
}

function getTodosOfCurrent() {
    return current_project.giveTodos();
}

function deleteProject(id) {
    projects = projects.filter(obj => obj.id !== id);
    console.log("projects: ", projects);
}

// function editProject

export {
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
};

// What would todomanager do?
// 1. create default starting project
// 2. add and remove todo's from project
// 3. add amd remove projects
// 4. toggle complete/incomplete todo's and projects
// 5. set current project
// 6. OPTIONAL: change order of projects and todo's
// 7. OPTIONAL: change due date, description, and rename todo's (projects will just have names)