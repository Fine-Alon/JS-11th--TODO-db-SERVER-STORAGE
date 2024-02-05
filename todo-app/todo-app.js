import {
    addDataToServer,
    deleteDataFromServer,
    doneDataAtServerFalse,
    doneDataAtServerTrue,
    getDataFromServer
} from './js_modules/serverApi.js'
import {
    createAppSwitchStorageTypeBtn,
    createAppTitle,
    createTodoItem,
    createTodoItemForm,
    createTodoList
} from './js_modules/visualPart.js'

// array that include objects(or tasks) that contain(NAME, ID, DONE-status)
let todoTasksArray = [],
    keyName = ''

export let storageTypeServer = false

export async function createTodoApp(container, title = 'TODO-LIST', keyWord) {
    // her we assign functions into variables
    let $todoAppTitle = createAppTitle(title)
    let $todoItemForm = createTodoItemForm()
    let $switchStorageTypeBtn = createAppSwitchStorageTypeBtn()
    let $todoList = createTodoList()

    container.append($todoAppTitle);
    container.append($todoItemForm.$form)
    container.append($switchStorageTypeBtn)
    container.append($todoList);

    // keyName = keyWord;

    // check if we have any stored string(ARRAY data) & parse it back to readeble ARRAY
    // for local storage

    // let saveData = localStorage.getItem(keyName);
    // if (saveData !== null && saveData !== '') {
    //     todoTasksArray = JSON.parse(saveData);
    // };

    let serverObjs = await getDataFromServer(keyWord)
    serverObjs.forEach(todoObj => {

        todoTasksArray.push(todoObj)
    });

    // add every object of main ARRAY to 'createTodoItem' func for doing DOM structur & add them to TODO List
    for (let listObj of todoTasksArray) {
        let $todoItem = createTodoItem(listObj, todoTasksArray);
        $todoList.append($todoItem);
    }

    $todoItemForm.$form.addEventListener('submit', async function (e) {
        e.preventDefault();
        // check if we have value of input field
        if (!$todoItemForm.$input.value) {
            return
        }

        const todoNewTask = {
            name: $todoItemForm.$input.value,
            done: false,
            // userid: gettNewId(todoTasksArray),
            key: keyWord,
        }

        const newTask = await addDataToServer(todoNewTask)

        let $todoItem = createTodoItem(newTask, todoTasksArray);

        // here we add new TASK into Array of tasks
        todoTasksArray.push(newTask)

        // here we add new TASK into DOM element
        $todoList.append($todoItem)

        // for local storage
        // saveTodoData(keyName, todoTasksArray);

        // here we delete input value(new task that user has enter) after adding new task
        $todoItemForm.$input.value = ''
    })
}

// window.createTodoApp = createTodoApp;
