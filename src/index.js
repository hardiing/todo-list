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

    return header;
}

/* function createHome() {
    const home = document.createElement("div");
    home.classList.add("home");

    return home;
}

function loadHome() {
    const main = document.getElementById("main");
    main.textContent = "";
    main.appendChild(createHome());
} */

function createMain() {
    const main = document.createElement("main");
    main.classList.add("main");
    main.setAttribute("id", "main");
    return main;
}

function loadPage() {
    const page = document.getElementById("content");
    page.appendChild(createHeader());
    //page.appendChild(createMain());

    //loadHome();
}

loadPage();