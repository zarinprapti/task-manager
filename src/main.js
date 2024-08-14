let tasks;

const retrieveTask = JSON.parse(localStorage.getItem('taskList'));

if (Array.isArray(retrieveTask)) {
    tasks = retrieveTask;
} else {
    tasks = [];
}
renderTasks();

function saveInBrowser() {
    localStorage.setItem('taskList', JSON.stringify(tasks));
}
//----------Model start------------
//Create a task
function createTask(newTask, datePicked) {
    const id = new Date().getTime().toString();
    if (newTask !== '') {
        tasks.push({
            title: newTask,
            dueDate: datePicked,
            id: id
        })
    } else {
        console.log("Type your task");
    };
    saveInBrowser();
}

function removeTask(idToBeDeleted) {
    tasks = tasks.filter(function(task) {
        if (task.id === idToBeDeleted) {
            return false;
        } else {
            return true;
        }
    });
    saveInBrowser();
};
//-------------------Model ends-----------------
//----------------controllers start--------
function addTask() {

    let inputTask = document.querySelector('.input__task');
    let newTask = inputTask.value;
    inputTask.value = '';
    //for adding date
    let datePicker = document.querySelector('.date__picker');
    let datePicked = datePicker.value;
    datePicker.value = '';

    createTask(newTask, datePicked);
    renderTasks();

}

function deleteTask(event) {
    //delete task from dom
    //delete task from array
    //re-render the tasks
    const deleteButton = event.target;

    const idToBeDeleted = deleteButton.id;

    removeTask(idToBeDeleted);
    renderTasks();
}
//---------------controller ends-------------

//--------------View starts-----------------
function renderTasks() {
    document.querySelector('.task__container').innerHTML = '';
    tasks.forEach(function(task) {
        let element = document.createElement('div');
        element.innerText = task.title + ' ' + task.dueDate;
        let taskList = document.querySelector('.task__container')

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'DELETE';
        deleteButton.style = 'margin-left:20px; padding: 5px 10px; background: red; border: 1px solid grey; border-radius: 10px';
        element.appendChild(deleteButton);

        taskList.appendChild(element);

        deleteButton.onclick = deleteTask;
        deleteButton.id = task.id;
    })

}

//------------controller ends------------------