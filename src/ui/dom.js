const projects_container = document.querySelector(".projects-container");

export function displayProject(project) {
    let container = document.createElement("div");
    container.className = "project";

    let projectHeader = document.createElement("p");
    projectHeader.textContent = project.name;

    let checkbox = document.createElement("input");
    checkbox.type = 'checkbox';
    checkbox.className = 'project-check';

    const icons = iconContainer();
    container.append(checkbox, projectHeader, icons);

    projects_container.append(container);
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

function iconContainer() {
    let edit = makeIcon("./icons/edit.svg");
    edit.className = "edit";

    let del = makeIcon("./icons/delete.svg");
    del.className = "del";

    let expand = makeIcon("./icons/expand.svg");
    expand.className = "expand-icon";

    const icons_cont = document.createElement("div");
    icons_cont.className = "icon-container";
    icons_cont.append(edit, del, expand);

    return icons_cont;
}

export function newProjectForm() {
    let container = document.createElement("div");

    let projectHeader = document.createElement("input");
    projectHeader.placeholder = "Enter project name";
    container.className = "project";

    let checkbox = document.createElement("input");
    checkbox.type = 'checkbox';
    checkbox.className = 'project-check';

    let submit = document.createElement("button");
    submit.className = "submit-btn";
    submit.textContent = "Done";

    const icons = iconContainer();
    container.append(checkbox, projectHeader, submit, icons);

    projects_container.appendChild(container);
}