import {createAppTitle, createTodoItem, createTodoItemForm, createTodoList} from "./visualPart.js"
import {sSHandler} from "./helpers.js";


// array that include objects(or tasks) that contain(NAME, ID, DONE-status)
let todoTasksArray = []

// export let storageTypeServer = false

export default async function createTodoAppWithServerStorage(container, title = 'TODO-LIST', keyWord = 'SS') {
    console.log('S.S.')

    // her we assign functions into variables
    let $todoAppTitle = createAppTitle(title)
    let $todoItemForm = createTodoItemForm()
    // let $switchStorageTypeBtn = createAppSwitchStorageTypeBtn()
    let $todoList = createTodoList()

    container.append($todoAppTitle)
    container.append($todoItemForm.$form)
    // container.append($switchStorageTypeBtn)
    container.append($todoList)

    todoTasksArray = await sSHandler.getDataFromServer(keyWord)

    if (!todoTasksArray) return

    // add every object of main ARRAY to 'createTodoItem' func for doing DOM structure & add them to TODO List
    for (let listObj of todoTasksArray) {
        let $todoItem = createTodoItem(listObj, todoTasksArray, 'SS');
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
        const newTask = await sSHandler.addDataToServer(todoNewTask)

        let $todoItem = createTodoItem(newTask, todoTasksArray, 'SS')

        // here we add new TASK into Array of tasks
        todoTasksArray.push(newTask)

        // here we add new TASK into DOM element
        $todoList.append($todoItem)

        // here we delete input value(new task that user has enter) after adding new task
        $todoItemForm.$input.value = ''
    })
}

