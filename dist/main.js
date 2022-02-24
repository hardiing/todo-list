(()=>{"use strict";function t(t,e){if(e.length<t)throw new TypeError(t+" argument"+(t>1?"s":"")+" required, but only "+e.length+" present")}function e(e){t(1,arguments);var s=Object.prototype.toString.call(e);return e instanceof Date||"object"==typeof e&&"[object Date]"===s?new Date(e.getTime()):"number"==typeof e||"[object Number]"===s?new Date(e):("string"!=typeof e&&"[object String]"!==s||"undefined"==typeof console||(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"),console.warn((new Error).stack)),new Date(NaN))}function s(s){t(1,arguments);var a=e(s);return a.setHours(0,0,0,0),a}function a(e,a){t(2,arguments);var n=s(e),o=s(a);return n.getTime()===o.getTime()}function n(t){if(null===t||!0===t||!1===t)return NaN;var e=Number(t);return isNaN(e)?e:e<0?Math.ceil(e):Math.floor(e)}function o(s,a){t(1,arguments);var o=a||{},r=o.locale,i=r&&r.options&&r.options.weekStartsOn,c=null==i?0:n(i),d=null==o.weekStartsOn?c:n(o.weekStartsOn);if(!(d>=0&&d<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");var u=e(s),g=u.getDay(),h=(g<d?7:0)+g-d;return u.setDate(u.getDate()-h),u.setHours(0,0,0,0),u}function r(e,s,a){t(2,arguments);var n=o(e,a),r=o(s,a);return n.getTime()===r.getTime()}function i(s,a){t(2,arguments);var o=e(s),r=n(a);return isNaN(r)?new Date(NaN):r?(o.setDate(o.getDate()+r),o):o}class c{constructor(t){this.name=t,this.tasks=[]}setName(t){this.name=t}getName(){return this.name}setTasks(t){this.tasks=t}getTasks(){return this.tasks}getTask(t){return this.tasks.find((e=>e.getName()===t))}contains(t){return this.tasks.some((e=>e.getName()===t))}addTask(t){this.tasks.find((e=>e.getName()===t.name))||this.tasks.push(t)}deleteTask(t){this.tasks=this.tasks.filter((e=>e.name!==t))}getTodayTasks(){return this.tasks.filter((s=>function(e){return t(1,arguments),a(e,Date.now())}(e(new Date(s.getDateFormatted())))))}getWeekTasks(){return this.tasks.filter((s=>function(e,s){return t(1,arguments),r(e,Date.now(),s)}(function(e,s){t(2,arguments);var a=n(s);return i(e,-a)}(e(new Date(s.getDateFormatted())),1))))}}class d{constructor(t,e="Add a description",s="No date",a){this.name=t,this.description=e,this.dueDate=s,this.priority=a}setName(t){this.name=t}getName(){return this.name}setDescription(t){this.description=t}getDescription(){return this.description}setDate(t){this.dueDate=t}getDate(){return this.dueDate}getDateFormatted(){const t=this.dueDate.split("/")[0];return`${this.dueDate.split("/")[1]}/${t}/${this.dueDate.split("/")[2]}`}setPriority(t){this.priority=t}getPriority(){return this.priority}}class u{constructor(){this.projects=[],this.projects.push(new c("Inbox")),this.projects.push(new c("Today")),this.projects.push(new c("This week"))}setProjects(t){this.projects=t}getProjects(){return this.projects}getProject(t){return this.projects.find((e=>e.getName()===t))}contains(t){return this.projects.some((e=>e.getName()===t))}addProject(t){this.projects.find((e=>e.name===t.name))||this.projects.push(t)}deleteProject(t){const e=this.projects.find((e=>e.getName()===t));this.projects.splice(this.projects.indexOf(e),1)}updateTodayProjects(){this.getProject("Today").tasks=[],this.projects.forEach((t=>{"Today"!==t.getName()&&"This week"!==t.getName&&t.getTodayTasks().forEach((e=>{const s=`${e.getName()} (${t.getName()})`;this.getProject("Today").addTask(new d(s,e.getDate()))}))}))}updateWeekProjects(){this.getProject("This week").tasks=[],this.projects.forEach((t=>{"Today"!==t.getName()&&"This week"!==t.getName()&&t.getWeekTasks().forEach((e=>{const s=`${e.getName()} (${t.getName()})`;this.getProject("This week").addTask(new d(s,e.getDate()))}))})),this.getProject("This week").setTasks(this.getProject("This week").getTasks().sort(((s,a)=>function(s,a){t(2,arguments);var n=e(s),o=e(a),r=n.getTime()-o.getTime();return r<0?-1:r>0?1:r}(e(new Date(s.getDateFormatted())),e(new Date(a.getDateFormatted()))))))}}class g{saveTodoList(t){localStorage.setItem("todoList",JSON.stringify(t))}getTodoList(){const t=Object.assign(new u,JSON.parse(localStorage.getitem("todoList")));return t.setProjects(t.getProjects().map((t=>Object.assign(new c,t)))),t.getProjects().forEach((t=>t.setTasks(t.getTasks().map((t=>Object.assign(new d,t)))))),t}addProject(t){const e=g.getTodoList();e.addProject(t),g.saveTodoList(e)}deleteProject(t){const e=g.getTodoList();e.deleteProject(t),g.saveTodoList(e)}addTask(t,e){const s=g.getTodoList();s.getProject(t).addTask(e),g.saveTodoList(s)}deleteTask(t,e){const s=g.getTodoList();s.getProject(t).deleteTask(e),g.saveTodoList(s)}renameTask(t,e,s){const a=g.getTodoList();a.getProject(t).getTask(e).setName(s),g.saveTodoList(a)}setTaskDate(t,e,s){const a=g.getTodoList();a.getProject(t).getTask(e).setDate(s),g.saveTodoList(a)}updateToday(){const t=g.getTodoList();t.updateTodayProjects(),g.saveTodoList(t)}updateWeek(){const t=g.getTodoList();t.updateWeekProjects(),g.saveTodoList(t)}}function h(t){document.querySelectorAll(".button-nav").forEach((t=>{t!==this&&t.classList.remove("active")})),t.classList.add("active")}console.log("hi"),function(){const t=document.getElementById("content");t.appendChild(function(){const t=document.createElement("header");t.classList.add("header");const e=document.createElement("h1");return e.classList.add("page-name"),e.textContent="Todo List",t.appendChild(e),t.appendChild(function(){const t=document.createElement("nav"),e=document.createElement("button");e.classList.add("button-nav"),e.textContent="All Tasks",e.addEventListener("click",(t=>{t.target.classList.contains("active")||h(e)}));const s=document.createElement("button");s.classList.add("button-nav"),s.textContent="Today's Tasks",s.addEventListener("click",(t=>{t.target.classList.contains("active")||(h(s),function(){const t=document.getElementById("main");t.textContent="",t.appendChild(function(){const t=document.createElement("div");return t.classList.add("today-tasks"),g.getTodoList().getProjects().forEach((t=>{"Inbox"!==t.name&&"Today"!==t.name&&"This week"!==t.name&&createProject(t.name)})),t}())}())}));const a=document.createElement("button");return a.classList.add("button-nav"),a.textContent="This Week's Tasks",a.addEventListener("click",(t=>{t.target.classList.contains("active")||h(a)})),t.appendChild(e),t.appendChild(s),t.appendChild(a),t}()),t}()),t.appendChild(function(){const t=document.createElement("main");t.classList.add("main"),t.setAttribute("id","main");const e=document.createElement("button");e.classList.add("button-main"),e.textContent="Create Project",e.addEventListener("click",(t=>{createProject()}));const s=document.createElement("button");return s.classList.add("button-main"),s.textContent="Create Task",s.addEventListener("click",(t=>{createTask()})),t.appendChild(e),t.appendChild(s),t}()),h(document.querySelector(".button-nav"))}()})();