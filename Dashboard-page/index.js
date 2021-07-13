const moment = require("moment");
const uniqid = require("uniqid");
const chartJs = require("chartjs-plugin-datalabels");
const getId = require("./utils.js");
const isValid = require('./validation.js')
// const chart = require("chart");

let activeTasks = getId("activeTasks");
let doneTasks = getId("doneTasks");
let weekTasks = getId("weekTasks");
let allTasks = [];

console.log(moment().subtract(7, 'days').format("DD.MM.YYYY"));

//функция, которая показывает все таски
let displayTasks = (allTasks) => {
    activeTasks.innerHTML = "";
    doneTasks.innerHTML = "";
    for (let i = 0; i < allTasks.length; i++) {
        if (allTasks[i].done == false) {
            activeTasks.innerHTML += `<br><input class="form-check-input" type="checkbox" name="task" id="task"/> <label class="form-check-label" for="task">(${allTasks[i].date}) ${allTasks[i].text} </label> <svg class="delete" id="${allTasks[i].id}" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
            <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"/></svg></br>`;
        } else {
            doneTasks.innerHTML += `<br><input class="form-check-input" type="checkbox" name="task" id="task"/> <label class="form-check-label" for="task">(${allTasks[i].date}) ${allTasks[i].text}</label> <svg class="delete" id="${allTasks[i].id}" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
            <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"/></svg></br>`;
        }
    }

    weekTasks.innerHTML = "";
    for (let i = 0; i < allTasks.length; i++) {
        if (allTasks[i].date > moment().subtract(7, 'days').format("DD.MM.YYYY") && allTasks[i].done == false) {
            weekTasks.innerHTML += `<br><input class="form-check-input" type="checkbox" name="task" id="task"/> <label class="form-check-label" for="task">(${moment(allTasks[i].date).format('dddd')}) ${allTasks[i].text}</label> <svg class="delete" id="${allTasks[i].id}" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
            <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"/></svg></br>`;
            console.log(weekTasks);
        }
    }

    const deleteBtns = document.getElementsByClassName("delete");
    for (let deleteBtn of deleteBtns) {
        deleteBtn.addEventListener('click', () => {
            deleteTask(deleteBtn.id);
        })
    }

    // const ctx = document.getElementById('myChart').getContext('2d');
    // const myChart = new Chart(ctx, {
    //     type: 'pie',
    //     data: {
    //         labels: ['Активные задачи', 'Выполненные задачи'],
    //         datasets: [{
    //             data: [allTasks.filter(task => task.done === false).length, allTasks.filter(task => task.done === true).length],
    //             backgroundColor: ['#e91e63', '#1e88e5'],
    //             borderWidth: 0.5,
    //             borderColor: '#ddd'
    //         }]
    //     },
    //     options: {
    //         title: {
    //             display: true,
    //             text: 'Recommended Daily Diet',
    //             position: 'top',
    //             fontSize: 16,
    //             fontColor: '#111',
    //             padding: 20
    //         },
    //         legend: {
    //             display: true,
    //             position: 'bottom',
    //             labels: {
    //                 boxWidth: 20,
    //                 fontColor: '#111',
    //                 padding: 15
    //             }
    //         },
    //         tooltips: {
    //             enabled: false
    //         },
    //         plugins: {
    //             datalabels: {
    //                 color: '#111',
    //                 textAlign: 'center',
    //                 font: {
    //                     lineHeight: 1.6
    //                 },
    //                 formatter: function (value, ctx) {
    //                     return ctx.chart.data.labels[ctx.dataIndex] + '\n' + value + '%';
    //                 }
    //             }
    //         }
    //     }
    // });
}

// функция для сохранения задачи в localStorage
let saveTasks = (tasks) => {
    localStorage.setItem("allTasks", JSON.stringify(tasks));
    allTasks = tasks;
}

document.addEventListener("DOMContentLoaded", () => {
    // валидация поля ввода на пустоту
    const save = getId("saveTask");
    const textarea = getId("newTask");

    textarea.addEventListener("input", () => {
        save.disabled = !isValid(textarea.value)
    })

    let loadedAllTasks = localStorage.getItem("allTasks");

    if (loadedAllTasks != null) {
        allTasks = JSON.parse(loadedAllTasks);
        displayTasks(allTasks);
    }
});

saveTask.addEventListener('click', () => {
    let newTask = getId("newTask").value;

    if (newTask != "") {
        newTaskJson = {
            text: newTask,
            date: moment().format('DD.MM.YYYY'),
            id: uniqid(),
            done: false
        }
        allTasks.push({
            text: "Стирка",
            date: "12.07.2021",
            id: uniqid(),
            done: false
        }, {
            text: "Поездка в горы",
            date: "08.07.2021",
            id: uniqid(),
            done: false
        }, {
            text: "Свадьба друзей",
            date: "09.07.2021",
            id: uniqid(),
            done: false
        });
        allTasks.push(newTaskJson);
        console.log(allTasks);

        displayTasks(allTasks);
        getId("newTask").value = "";
        saveTasks(allTasks);
    }
})

doneTask.addEventListener('click', () => {
    let task = document.getElementsByName("task");
    for (let i = 0; i < allTasks.length; i++) {
        if (task[i].checked) {
            allTasks[i].done = true;
        }
    }
    displayTasks(allTasks);
    saveTasks(allTasks);
})

const deleteTask = (id) => {
    const filtredAllTasks = allTasks.filter(task => task.id !== id)
    saveTasks(filtredAllTasks);
    displayTasks(allTasks);
}