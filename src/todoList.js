import Project from "./project";
import Task from "./task";
import {compareAsc, toDate} from "date-fns";

export default class TodoList {
    constructor() {
        this.projects = [];
        this.projects.push(new Project("Inbox"));
        this.projects.push(new Project("Today"));
        this.projects.push(new Project("This week"));
    }

    setProjects(projects) {
        this.projects = projects;
    }

    getProjects() {
        return this.projects;
    }

    getProject(projectName) {
        return this.projects.find((project) => project.getName() === projectName);
    }

    contains(projectName) {
        return this.projects.some((project) => project.getName() === projectName);
    }

    addProject(newProject) {
        if (this.projects.find((project) => project.name === newProject.name)) return;
        this.projects.push(newProject);
    }

    deleteProject(projectName) {
        const deletedProject = this.projects.find((project) => project.getName() === projectName);
        this.projects.splice(this.projects.indexOf(deletedProject), 1);
    }

    updateTodayProjects() {
        this.getProject("Today").tasks = [];

        this.projects.forEach((project) => {
            if (project.getName() === "Today" || project.getName === "This week") return;

            const todayTasks = project.getTodayTasks();
            todayTasks.forEach((task) => {
                const taskName = `${task.getName()} (${project.getName()})`;
                this.getProject("Today").addTask(new Task(taskName, task.getDate()));
            });
        });
    }

    updateWeekProjects() {
        this.getProject("This week").tasks = [];

        this.projects.forEach((project) => {
            if(project.getName() === "Today" || project.getName() === "This week") return;

            const weekTasks = project.getWeekTasks();
            weekTasks.forEach((task) => {
                const taskName = `${task.getName()} (${project.getName()})`;
                this.getProject("This week").addTask(new Task(taskName, task.getDate()));
            });
        });

        this.getProject("This week").setTasks(this.getProject("This week").getTasks().sort((taskA, taskB) => compareAsc(toDate(new Date(taskA.getDateFormatted())), toDate(new Date(taskB.getDateFormatted())))));
    }
}