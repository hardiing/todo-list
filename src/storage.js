import Project from "./project";
import Task from "./task";
import TodoList from "./todoList";

export default class Storage {
    saveTodoList(data) {
        localStorage.setItem("todoList", JSON.stringify(data));
    }

    getTodoList() {
        const todoList = Object.assign(
            new TodoList(), 
            JSON.parse(localStorage.getitem("todoList"))
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

    addProject(project) {
        const todoList = Storage.getTodoList();
        todoList.addProject(project);
        Storage.saveTodoList(todoList);
    }

    deleteProject(project) {
        const todoList = Storage.getTodoList();
        todoList.deleteProject(project);
        Storage.saveTodoList(todoList);
    }

    addTask(project, task) {
        const todoList = Storage.getTodoList();
        todoList.getProject(project).addTask(task);
        Storage.saveTodoList(todoList);
    }

    deleteTask(project, task) {
        const todoList = Storage.getTodoList();
        todoList.getProject(project).deleteTask(task);
        Storage.saveTodoList(todoList);
    }

    renameTask(project, task, newTask) {
        const todoList = Storage.getTodoList();
        todoList.getProject(project).getTask(task).setName(newTask);
        Storage.saveTodoList(todoList);
    }

    setTaskDate(project, task, date) {
        const todoList = Storage.getTodoList();
        todoList.getProject(project).getTask(task).setDate(date);
        Storage.saveTodoList(todoList);
    }

    updateToday() {
        const todoList = Storage.getTodoList();
        todoList.updateTodayProjects();
        Storage.saveTodoList(todoList);
    }

    updateWeek() {
        const todoList = Storage.getTodoList();
        todoList.updateWeekProjects();
        Storage.saveTodoList(todoList);
    }
}