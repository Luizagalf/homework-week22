const moment = require("moment");
// const chart = require("chart");

let date = moment("20111031", "YYYYMMDD").format('dddd');
console.log(date);

let errors = [];
let checkValidity = (textarea) => {
    let validity = textarea.validity;
    if (validity.valueMissing) {
        errors.push("Вы не ввели текст");
    }
}

let activTasks = document.getElementById("activTasks");
let doneTasks = document.getElementById("doneTasks");
let allTasks = [];

let displayTasks = (allTasks) => {
    activTasks.innerHTML = "";
    doneTasks.innerHTML = "";
    for (let i = 0; i < allTasks.length; i++) {
        if (allTasks[i].active == false) {
            activTasks.innerHTML += `<br><input type="checkbox" name="task" id="task"/> <label for="task">(${allTasks[i].date}) ${allTasks[i].text}</label><br/>`;
        } else {
            doneTasks.innerHTML += `<br><input type="checkbox" name="task" id="task"/> <label for="task">(${allTasks[i].date}) ${allTasks[i].text}</label><br/>`;
        }
    }
    for (let i = 0; i < allTasks.length; i++) {
        if (task[i].date > moment(task[i].date).subtract(7, 'days')) {
            // document.getElementById(weekTasks).innerHTML += task[i];
            // let date = moment("task[i].date", "DDMMYYYY").format('dddd');
            console.log(task);
        }
    }
}

let saveTasks = () => {
    localStorage.setItem("allTasks", JSON.stringify(allTasks));
}

document.addEventListener("DOMContentLoaded", function (event) {
    let loadedAllTasks = localStorage.getItem("allTasks");

    if (loadedAllTasks != null) {
        console.log({
            loadedAllTasks
        });
        allTasks = JSON.parse(loadedAllTasks);
        displayTasks(allTasks);
    }
});

let saveTask = () => {
    errors = [];
    let options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    };
    let textareas = document.querySelectorAll("textarea");
    for (let textarea of textareas) {
        checkValidity(textarea);
    }
    document.getElementById("error").innerHTML = errors.join("<br>");

    let newTask = document.getElementById("newTask").value;

    if (newTask != "") {
        newTaskJson = {
            text: newTask,
            date: new Date().toLocaleString("ru", options),
            active: false
        }
        allTasks.push(newTaskJson);

        displayTasks(allTasks);
        document.getElementById("newTask").value = "";
        saveTasks();
    }
}

let done = () => {
    let task = document.getElementsByName("task");
    for (let i = 0; i < allTasks.length; i++) {
        if (task[i].checked) {
            allTasks[i].active = true;
            displayTasks(allTasks);
        }
    }
    saveTasks();
}