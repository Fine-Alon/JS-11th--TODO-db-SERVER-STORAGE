import { createSwitchStorageTypeBtn} from "./js_modules/switchStorageTypeBtn.js";
import {addDataToServer, getDataFromServer} from './js_modules/serverApi.js'
import {createAppTitle, createTodoItem, createTodoItemForm, createTodoList} from './js_modules/visualPart.js'
import {getNewId, isStorageTypeServer, saveTodoData} from "./js_modules/helpers.js"

// array that include objects(or tasks) that contain(NAME, ID, DONE-status)
let todoTasksArray = [],
    keyName = ''

// export let storageTypeServer = false

export async function createTodoApp(container, title = 'TODO-LIST', keyWord) {

    // her we assign functions into variables
    let $todoAppTitle = createAppTitle(title)
    let $todoItemForm = createTodoItemForm()
    let $switchStorageTypeBtn = createSwitchStorageTypeBtn()
    let $todoList = createTodoList()

    container.append($todoAppTitle)
    container.append($todoItemForm.$form)
    container.append($switchStorageTypeBtn)
    container.append($todoList)

    // if (!isStorageTypeServer()) {
    //     console.log('serv')
    //     const savedData = await getDataFromServer(keyWord)
    //     savedData.forEach(todoObj => {
    //
    //         todoTasksArray.push(todoObj)
    //     })
    // } else {
    //     console.log('ls')
    //     // check if we have any stored string(ARRAY data) & parse it back to readable ARRAY
    //     // for local storage
    //     const savedData = localStorage.getItem(keyName)
    //     if (savedData !== null && savedData !== '') {
    //         todoTasksArray = JSON.parse(savedData)
    //     }
    // }

    // add every object of main ARRAY to 'createTodoItem' func for doing DOM structure & add them to TODO List
    for (let listObj of todoTasksArray) {
        let $todoItem = createTodoItem(listObj, todoTasksArray);
        $todoList.append($todoItem)
    }

    $todoItemForm.$form.addEventListener('submit', async function (e) {
        e.preventDefault()
        // check if we have value of input field
        if (!$todoItemForm.$input.value) {
            return
        }

        let todoNewTask = {}

        if (!isStorageTypeServer()) {
            todoNewTask = {
                name: $todoItemForm.$input.value,
                done: false,
                key: keyWord,
            }
            const newTask = await addDataToServer(todoNewTask)

            let $todoItem = createTodoItem(newTask, todoTasksArray)

            // here we add new TASK into Array of tasks
            todoTasksArray.push(newTask)

            // here we add new TASK into DOM element
            $todoList.append($todoItem)
        } else {
            todoNewTask = {
                name: $todoItemForm.$input.value,
                done: false,
                userid: getNewId(todoTasksArray),
                key: keyWord,
            }
            let $todoItem = createTodoItem(todoNewTask, todoTasksArray)

            // here we add new TASK into Array of tasks
            todoTasksArray.push(todoNewTask)

            // here we add new TASK into DOM element
            $todoList.append($todoItem)


            // for local storage
            saveTodoData(keyName, todoTasksArray)
        }

        // here we delete input value(new task that user has enter) after adding new task
        $todoItemForm.$input.value = ''
    })
}

// window.createTodoApp = createTodoApp
