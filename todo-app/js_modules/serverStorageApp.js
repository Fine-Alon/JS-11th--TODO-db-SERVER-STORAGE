import {createAppTitle, createTodoItem, createTodoItemForm, createTodoList} from "./visualPart.js"
import {servStorageHandler} from "./helpers.js";
import {createSwitchStorageTypeBtn} from "./switchBtn/switchStorageTypeBtn.js";

// array that include objects(or tasks) that contain(NAME, ID, DONE-status)
let todoTasksArray = []

export default async function createTodoApp(container, title = 'TODO-LIST', keyWord = 'my') {
    const STORAGE_TYPE = 'SS'
    console.log('STORAGE_TYPE:', STORAGE_TYPE)

    // her we assign functions into variables
    let $todoAppTitle = createAppTitle(title)
    let $todoItemForm = createTodoItemForm()
    let $switchStorageTypeBtn = createSwitchStorageTypeBtn(STORAGE_TYPE)
    let $todoList = createTodoList()

    container.append($todoAppTitle)
    container.append($todoItemForm.$form)
    container.append($switchStorageTypeBtn)
    container.append($todoList)

    todoTasksArray = await servStorageHandler.getDataFromServer(keyWord)

    if (!todoTasksArray) return

    // add every object of main ARRAY to 'createTodoItem' func for doing DOM structure & add them to TODO List
    for (let listObj of todoTasksArray) {
        let $todoItem = createTodoItem(listObj, todoTasksArray, STORAGE_TYPE);
        $todoList.append($todoItem)
    }

    $todoItemForm.$form.addEventListener('submit', async function (e) {
        e.preventDefault()
        // check if we have value of input field
        if (!$todoItemForm.$input.value) {
            return
        }

        const todoNewTask = {
            name: $todoItemForm.$input.value,
            done: false,
            key: keyWord,
        }
        const newTask = await servStorageHandler.addDataToServer(todoNewTask)

        let $todoItem = createTodoItem(newTask, todoTasksArray, STORAGE_TYPE)

        // here we add new TASK into Array of tasks
        todoTasksArray.push(newTask)

        // here we add new TASK into DOM element
        $todoList.append($todoItem)

        // here we delete input value(new task that user has enter) after adding new task
        $todoItemForm.$input.value = ''
    })
}

