const projects_container = document.querySelector(".projects-container");

export function displayProject(project) {
    let container = document.createElement("div");
    let projectDiv = document.createElement("div"); 
    projectDiv.appendChild(container);
    projectDiv.className = "project";
    container.className = "project-stuff";

    let projectHeader = document.createElement("p");
    projectHeader.textContent = project.name;
    let form = document.createElement("form");
    form.action = "#";
    form.className = "project-form";
    form.appendChild(projectHeader);

    let checkbox = document.createElement("input");
    checkbox.type = 'checkbox';
    checkbox.className = 'project-check';

    const icons = iconContainer();
    container.append(checkbox, form, icons);

    projects_container.append(projectDiv);

    return container;
}

function makeIcon(path) {
    let icon_a = document.createElement("button");
    icon_a.className = "icon-btn";
    let icon_i = document.createElement("img");
    icon_a.appendChild(icon_i);
    icon_i.src = path;

    return icon_i;
}

export function addNodeNextTo(node, type) {
    let newNode = document.createElement(type);
    node.after(newNode);

    return newNode;
}

function iconContainer(ifTodo) {
    let edit = makeIcon("./icons/edit.svg");
    edit.className = "edit";

    let del = makeIcon("./icons/delete.svg");
    del.className = "del";

    const icons_cont = document.createElement("div");
    icons_cont.className = "icon-container";
    icons_cont.append(edit, del);

    if(!ifTodo) {
        let expand = makeIcon("./icons/expand.svg");
        expand.className = "expand";
        let add = makeIcon("./icons/add.svg");
        add.className = "add";

        icons_cont.append(add, expand);
    }

    return icons_cont;
}

export function newProjectForm() {
    let container = document.createElement("div");
    let project = document.createElement("div")
    project.appendChild(container);
    project.className = "project";

    let projectHeader = document.createElement("input");
    projectHeader.className = "input-field";
    let form = document.createElement("form");
    form.action = "#";
    form.appendChild(projectHeader);
    projectHeader.placeholder = "Enter project name";
    container.className = "project-stuff";

    let checkbox = document.createElement("input");
    checkbox.type = 'checkbox';
    checkbox.className = 'project-check';

    let submit = document.createElement("button");
    submit.className = "submit-btn";
    submit.textContent = "Done";
    submit.type = "submit";
    form.appendChild(submit);
    form.className = "project-form";

    const icons = iconContainer();
    container.append(checkbox, form, icons);
    container.id = crypto.randomUUID();

    projects_container.appendChild(project);
}

function todoContainer(project) {
    const todoCont = document.createElement("div");
    todoCont.className = "todo-container";
    project.appendChild(todoCont);
    
    return todoCont;
}

export function newTodoForm(p, p2, p3, p4) {
    //Todo parameters: title, dueDate, description, priority
    let form = document.createElement("form");
    form.className = "todo-form";

    let name = document.createElement("input");
    name.type = "text";
    name.placeholder = "Title";
    name.className = "input-field";
    name.name = "name";
    name.value = p ? p.textContent.trimEnd() : "";

    let description = document.createElement("input");
    description.placeholder = "Description";
    description.className = "todo-description";
    description.name = "description";
    description.value = p2 ? p2.textContent : "";

    let due = document.createElement("input");
    due.type = "date";
    due.className = "todo-due-date";
    due.name = "due";
    due.value = p3 ? p3.textContent : "";

    let priority = document.createElement("select");
    priority.className = "todo-priority";
    let options = ['red', 'green', 'yellow'];
    for (let i = 1; i <= 3; i++) {
        let option = document.createElement("option");
        option.value = i;
        option.style.backgroundColor = options[i-1];
        option.textContent = `${i}`;
        priority.appendChild(option);
    }
    priority.name = "priority";
    priority.value = p4 ? Number(p4.textContent) : null;

    let submit = document.createElement("button");
    submit.type = "submit";
    submit.textContent = "Add Todo";
    submit.className = "todo-submit";

    form.append(name, description, due, priority, submit);

    return form; 
}

// add new todo form
export function addTodoDOM(project) {
    let lastChild = project.lastChild; //project stuff if there is no todo container
    let container;

    let checkbox = document.createElement("input");
    checkbox.type = 'checkbox';
    checkbox.className = 'todo-check';

    const newTodo = document.createElement("div");
    newTodo.className = "todo";
    const todoForm = newTodoForm();
    const icons = iconContainer(true);
    newTodo.append(checkbox, todoForm, icons);
    newTodo.id = crypto.randomUUID();

    if(lastChild.className === "project-stuff") { // if there already is a todo
        container = todoContainer(project);
        container.appendChild(newTodo);
        project.appendChild(container);
    }
    else {
        container = project.lastChild;
        container.appendChild(newTodo);
    }
}

// export function saveTodo(todoForm, p) {
//     const project = todoForm.parentNode;
//     const icons = todoForm.nextSibling;
//     todoForm.remove();

//     let newForm = document.createElement("form");
//     newForm.className = "todo-form";
//     newForm.appendChild(p);

//     project.insertBefore(newForm, icons);
// }   

export function saveTodo(form, { input, description, due, priority }) {
    const project = form.parentNode;
    const icons = form.nextSibling;
    form.remove();

    let newForm = document.createElement("form");
    newForm.className = "todo-form";

    let space = "\xa0\xa0\xa0\xa0";
    let inputP = document.createElement("p");
    inputP.textContent = `Name: ${input+space}`;
    let descriptionP = document.createElement("p");
    descriptionP.textContent = `Description: ${description+space}`;
    let dueP = document.createElement("p");
    dueP.textContent = `Due: ${due+space}`;
    let priorityP = document.createElement("p");
    priorityP.textContent = `Priority: ${priority}`;

    newForm.append(inputP, descriptionP, dueP, priorityP);

    project.insertBefore(newForm, icons);
}