// LS handler
import {getNewId, localStorageHandler} from "./helpers.js"
import {createAppTitle, createTodoItem, createTodoItemForm, createTodoList} from "./visualPart.js"

// array that include objects(or tasks) that contain(NAME, ID, DONE-status)
let todoTasksArray = []

export default async function createTodoApp(container, title = 'TODO-LIST', keyWord) {
    console.log('L.S.')
    // her we assign functions into variables
    let $todoAppTitle = createAppTitle(title)
    let $todoItemForm = createTodoItemForm()
    // let $switchStorageTypeBtn = createAppSwitchStorageTypeBtn()
    let $todoList = createTodoList()

    container.append($todoAppTitle)
    container.append($todoItemForm.$form)
    // container.append($switchStorageTypeBtn)
    container.append($todoList)

    // check if we have any stored string(ARRAY data) & parse it back to readable ARRAY
    todoTasksArray = localStorageHandler.getDataArrFromLS(keyWord)
    if (!todoTasksArray) return

    // add every object of main ARRAY to 'createTodoItem' func for doing DOM structure & add them to TODO List
    if (todoTasksArray) {
        for (let listObj of todoTasksArray) {
            let $todoItem = createTodoItem(listObj, todoTasksArray, keyWord);
            $todoList.append($todoItem)
        }
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
            id: getNewId(todoTasksArray),
            key: keyWord,
        }
        const $todoItem = createTodoItem(todoNewTask, todoTasksArray, 'LS')

        // here we add new TASK into Array of tasks
        todoTasksArray.push(todoNewTask)


        // for local storage
        localStorageHandler.saveTodoData(keyWord, todoTasksArray)

        // here we add new TASK into DOM element
        $todoList.append($todoItem)

        // here we delete input value(new task that user has enter) after adding new task
        $todoItemForm.$input.value = ''
    })
}

