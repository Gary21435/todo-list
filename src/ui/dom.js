const projects_container = document.querySelector(".projects-container");

export function displayProject(project) {
    let container = document.createElement("div");

    let projectHeader = document.createElement("p");
    container.className = "project";
    projectHeader.textContent = project.name;

    let checkbox = document.createElement("input");
    checkbox.type = 'checkbox';
    checkbox.className = 'project-check';
    container.appendChild(checkbox);
    container.appendChild(projectHeader);

    projects_container.append(container);
}