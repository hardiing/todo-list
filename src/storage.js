import Project from "./project";
import Task from "./task";
import TodoList from "./todoList";

export default class Storage {
    static saveTodoList(data) {
        localStorage.setItem("todoList", JSON.stringify(data));
    }

    static getTodoList() {
        const todoList = Object.assign(
            new TodoList(), 
            JSON.parse(localStorage.getItem("todoList"))
        );

        todoList.setProjects(
            todoList.getProjects()
            .map((project) => Object.assign(new Project(), project))
        );

        todoList.getProjects().forEach((project) =>
            project.setTasks(
                project.getTasks().map((task =>
                    Object.assign(new Task(), task)))
            )
        )

        return todoList;
    }

    static addProject(project) {
        const todoList = Storage.getTodoList();
        todoList.addProject(project);
        Storage.saveTodoList(todoList);
    }

    static deleteProject(project) {
        const todoList = Storage.getTodoList();
        todoList.deleteProject(project);
        Storage.saveTodoList(todoList);
    }

    static addTask(project, task) {
        const todoList = Storage.getTodoList();
        todoList.getProject(project).addTask(task);
        Storage.saveTodoList(todoList);
    }

    static deleteTask(project, task) {
        const todoList = Storage.getTodoList();
        todoList.getProject(project).deleteTask(task);
        Storage.saveTodoList(todoList);
    }

    static renameTask(project, task, newTask) {
        const todoList = Storage.getTodoList();
        todoList.getProject(project).getTask(task).setName(newTask);
        Storage.saveTodoList(todoList);
    }

    static setTaskDate(project, task, date) {
        const todoList = Storage.getTodoList();
        todoList.getProject(project).getTask(task).setDate(date);
        Storage.saveTodoList(todoList);
    }

    static updateToday() {
        const todoList = Storage.getTodoList();
        todoList.updateTodayProjects();
        Storage.saveTodoList(todoList);
    }

    static updateWeek() {
        const todoList = Storage.getTodoList();
        todoList.updateWeekProjects();
        Storage.saveTodoList(todoList);
    }
}