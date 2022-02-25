console.log("hi");

import format from "date-fns";
import Storage from "./storage";
import Task from "./task";
import Project from "./project";

function createHeader() {
    const header = document.createElement("header");
    header.classList.add("header");

    const pageName = document.createElement("h1");
    pageName.classList.add("page-name");
    pageName.textContent = "Todo List";

    header.appendChild(pageName);
    header.appendChild(createNav());

    return header;
}

function createNav() {
    const nav = document.createElement("nav");

    const allButton = document.createElement("button");
    allButton.classList.add("button-nav");
    allButton.textContent = "All Tasks";
    allButton.addEventListener("click", (e) => {
        if (e.target.classList.contains("active")) return;
        setActiveButton(allButton);
    });

    const todayButton = document.createElement("button");
    todayButton.classList.add("button-nav");
    todayButton.textContent = "Today's Tasks";
    todayButton.addEventListener("click", (e) => {
        if (e.target.classList.contains("active")) return;
        setActiveButton(todayButton);
        loadToday();
    });

    const weekButton = document.createElement("button");
    weekButton.classList.add("button-nav");
    weekButton.textContent = "This Week's Tasks";
    weekButton.addEventListener("click", (e) => {
        if (e.target.classList.contains("active")) return;
        setActiveButton(weekButton);
    });

    nav.appendChild(allButton);
    nav.appendChild(todayButton);
    nav.appendChild(weekButton);
    nav.innerHTML += `<br>`

    const createProjectButton = document.createElement("button");
    createProjectButton.classList.add("button-main");
    createProjectButton.textContent = "Create Project";
    createProjectButton.addEventListener("click", (e) => {
        const projectName = prompt("Please enter a project name");
        if (projectName === "") {
            alert("Project name can not be empty");
            return;
        } else {
            Storage.addProject(new Project(projectName));
        }
        if (Storage.getTodoList().contains(projectName)) {
            alert("You can not have a duplicate project name");
            return;
        } else {
            Storage.addProject(new Project(projectName));
        }

        loadProjects();
    });

    const createTaskButton = document.createElement("button");
    createTaskButton.classList.add("button-main");
    createTaskButton.textContent = "Create Task";
    createTaskButton.addEventListener("click", (e) => {
        const taskName = prompt("Please enter a task name");
        const taskDescription = prompt("Please enter a task description");
        const taskDate = prompt("Please enter a due date");
        const taskPriority = prompt("Please enter a task priority");

        const newTask = new Task(taskName, taskDescription, taskDate, taskPriority);
    });

    nav.appendChild(createProjectButton);
    nav.appendChild(createTaskButton);

    return nav;
}

function setActiveButton(button) {
    const buttons = document.querySelectorAll(".button-nav");

    buttons.forEach((button) => {
        if (button !== this) {
            button.classList.remove("active");
        }
    });

    button.classList.add("active");
}

function createToday() {
    const today = document.createElement("div");
    today.classList.add("today-tasks");

    return today;
}

function loadToday() {
    const main = document.getElementById("main");
    main.appendChild(createToday());
}

function createMain() {
    const main = document.createElement("main");
    main.classList.add("main");
    main.setAttribute("id", "main");

    return main;
}

function loadProjects() {
    const mainArea = document.getElementById("main");
    mainArea.textContent = "";
    Storage.getTodoList()
        .getProjects()
        .forEach((project) => {
            if (
                project.name !== "Inbox" &&
                project.name !== "Today" &&
                project.name !== "This week"
            ) {
                createProject(project.name);
                console.log("loadProjects if");
            }
        });

    const addTaskButton = document.getElementById("add-task");
    addTaskButton.addEventListener("click", (e) => {
        const taskName = prompt("Please enter a task name");
        const taskDescription = prompt("Please enter a task description");
        const taskDate = prompt("Please enter a due date");
        const taskPriority = prompt("Please enter a task priority");

        const newTask = new Task(taskName, taskDescription, taskDate, taskPriority);
    });

}

function createProject(name) {
    const main = document.getElementById("main")
    const savedProjects = document.createElement("div");
    savedProjects.classList.add("projects-list");
    savedProjects.innerHTML += `
        <h2 id="current-project">${name}&emsp;
        <button class="project-button" id="open-project">Open Project</button>
        <button id="add-task">Add Task</button>
        <button class="project-button" id="delete-project">Delete Project</button>
        </h2><br>
        <div class="task-list></div>`
    main.appendChild(savedProjects);
}

function openProject(projectName, projectButton) {
    const projectButtons = document.querySelectorAll("project-button");
    projectButtons.forEach((button) => button.classList.remove("active"));
    projectButton.classList.add("active");
    projectContent(projectName);
}

function projectContent(projectName) {
    const contents = document.getElementById("task-list");
    loadTasks();
}
function loadTasks(projectName) {
    console.log(projectName.textContent);
    Storage.getTodoList()
        .getProject(projectName)
        .getTasks()
        .forEach((task) => createTask(task.name, task.dueDate));
}

function createTask(name, dueDate) {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML += `
        <p>${name}${dueDate}</p>`
}

function projectButtons() {
    const projectButtons = document.querySelectorAll(".project-button");
    console.log(projectButtons);
    projectButtons.forEach((projectButton) => {
        projectButton.addEventListener("click", handleProjectButton
    )});
}

function handleProjectButton(e) {
    console.log(this);
    console.log(this.parentNode.textContent);
    const currentProject = this.parentNode.textContent;
    openProject(currentProject, this);
}

function loadPage() {
    const page = document.getElementById("content");
    page.appendChild(createHeader());
    page.appendChild(createMain());

    setActiveButton(document.querySelector(".button-nav"));

    loadProjects();
    projectButtons();
}

loadPage();
