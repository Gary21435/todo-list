const projects_container = document.querySelector(".projects-container");

export function displayProject(project) {
    let projectHeader = document.createElement("div");
    projectHeader.className = "project";
    projectHeader.textContent = project.name;

    projects_container.appendChild(projectHeader);
}