import {localStorageHandler, servStorageHandler} from "./helpers.js";

export function createAppTitle(title) {
    let $appTitle = document.createElement('h2')
    $appTitle.innerHTML = title
    return $appTitle
}

export function createTodoList() {
    let $list = document.createElement('ul')
    $list.classList.add('list-group')
    return $list
}

export function createTodoItemForm() {
    let $form = document.createElement('form')
    let $input = document.createElement('input')
    let $buttonWrapper = document.createElement('div')
    let $button = document.createElement('button')

    $form.classList.add('input-group', 'mb-3')
    $input.classList.add('form-control')
    $input.placeholder = 'type name of new task'
    $buttonWrapper.classList.add('input-group-append')
    $button.classList.add('btn', 'btn-primary')
    $button.textContent = 'ADD TASK'
    // set DISABLED to form btn when page has been loaded
    $button.disabled = true

    // check if FORM input has text and save the btn DISABLED or diferent
    $input.addEventListener('input', function () {
        $button.disabled = !$input.value.trim()
    })

    $buttonWrapper.append($button)
    $form.append($input)
    $form.append($buttonWrapper)

    return {
        $form,
        $input,
        $button,
    }
}

export function createTodoItem(obj, todoTasksArr, storageType = 'LS') {
    let $item = document.createElement('li')

    let $buttonGroup = document.createElement('div')
    let $doneButton = document.createElement('button')
    let $deleteButton = document.createElement('button')

    $item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center')
    $item.textContent = obj.name

    $buttonGroup.classList.add('btn-group', 'btn-group-sm')
    $doneButton.classList.add('btn', 'btn-success')
    $doneButton.textContent = 'DONE'
    $deleteButton.classList.add('btn', 'btn-danger')
    $deleteButton.textContent = 'DELETE'

    $buttonGroup.append($doneButton)
    $buttonGroup.append($deleteButton)
    $item.append($buttonGroup)
    if (obj.done === true) {
        $item.classList.add('list-group-item-success')
    }

    // change done status
    $doneButton.addEventListener('click', async function () {
        $item.classList.toggle('list-group-item-success')
        for (let element of todoTasksArr) {
            if (obj.id === element.id) {

                obj.done = !obj.done
                storageType === 'LS'
                    ? localStorageHandler.saveTodoData(obj.key, todoTasksArr) // for localstorage

                    : await servStorageHandler.isTaskDone(obj.id, obj.done) // for server storage
            }
        }
    })

    $deleteButton.addEventListener('click', function () {
        if (confirm('are you sure?')) {
            $item.remove()

            // delete from array
            for (let element = 0; element < todoTasksArr.length; element++) {
                if (todoTasksArr[element].id === obj.id) {
                    todoTasksArr.splice(element, 1)
                }
            }
            storageType === 'LS'
                ? localStorageHandler.saveTodoData(obj.key, todoTasksArr)   // for localstorage
                : servStorageHandler.deleteDataFromServer(obj.id)          // for server storage
        }
    })

    return $item
}

