import {storageTypeServer} from '../todo-app.js'
import {deleteDataFromServer, doneDataAtServerFalse, doneDataAtServerTrue} from './serverApi.js'

export function createAppTitle(title) {
    let $appTitle = document.createElement('h2');
    $appTitle.innerHTML = title;
    return $appTitle;
}

export function createAppSwitchStorageTypeBtn() {
    let $btnWrapper = document.createElement('div')
    $btnWrapper.style.display = 'flex'
    $btnWrapper.style.justifyContent = 'center'
    $btnWrapper.style.padding = '10px'

    let $switchStorageTypeBtn = document.createElement('button')
    $switchStorageTypeBtn.classList.add('btn', 'btn-warning')
    storageTypeServer
        ? $switchStorageTypeBtn.innerHTML = 'switch to:  *LOCAL_DATA_STORAGE*'
        : $switchStorageTypeBtn.innerHTML = 'switch to:  *SERVER_DATA_STORAGE*'

    $switchStorageTypeBtn.addEventListener('click', function () {
        storageTypeServer = !storageTypeServer
        storageTypeServer
            ? $switchStorageTypeBtn.innerHTML = 'switch to:  *LOCAL_DATA_STORAGE*'
            : $switchStorageTypeBtn.innerHTML = 'switch to:  *SERVER_DATA_STORAGE*'
    })

    $btnWrapper.append($switchStorageTypeBtn)

    return $btnWrapper
}

export function createTodoItemForm() {
    let $form = document.createElement('form');
    let $input = document.createElement('input');
    let $buttonWrapper = document.createElement('div');
    let $button = document.createElement('button');

    $form.classList.add('input-group', 'mb-3');
    $input.classList.add('form-control');
    $input.placeholder = 'type name of new task';
    $buttonWrapper.classList.add('input-group-append');
    $button.classList.add('btn', 'btn-primary');
    $button.textContent = 'ADD TASK';
    // set DISABLED to form btn when page has been loaded
    $button.disabled = true;

    // check if FORM input has text and save the btn DISABLED or diferent
    $input.addEventListener('input', function () {
        if ($input.value !== "") {
            $button.disabled = false;
        } else {
            $button.disabled = true;
        }
    });

    $buttonWrapper.append($button);
    $form.append($input);
    $form.append($buttonWrapper);

    return {
        $form,
        $input,
        $button,
    }
}

export function createTodoList() {
    let $list = document.createElement('ul');
    $list.classList.add('list-group');
    return $list;
}

export function createTodoItem(obj,todoTasksArr) {
    let $item = document.createElement('li');

    let $buttonGroup = document.createElement('div');
    let $doneButton = document.createElement('button');
    let $deleteButton = document.createElement('button');

    $item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    $item.textContent = obj.name;

    $buttonGroup.classList.add('btn-group', 'btn-group-sm');
    $doneButton.classList.add('btn', 'btn-success');
    $doneButton.textContent = 'DONE';
    $deleteButton.classList.add('btn', 'btn-danger');
    $deleteButton.textContent = 'DELETE';

    $buttonGroup.append($doneButton);
    $buttonGroup.append($deleteButton);
    $item.append($buttonGroup);
    console.log(obj)
    if (obj.done === true) {
        $item.classList.add('list-group-item-success')
    }

    $doneButton.addEventListener('click', function () {
        $item.classList.toggle('list-group-item-success')
        for (let element of todoTasksArr) {
            if (obj.id === element.id) {

                obj.done = !obj.done

                // change done status at server
                obj.done ? doneDataAtServerTrue(obj.id) : doneDataAtServerFalse(obj.id)
            }
        }
        // for localstorage
        // saveTodoData(keyName, todoTasksArray)
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
            deleteDataFromServer(obj.id)
            // for localstorage
            // saveTodoData(keyName, todoTasksArray)
        }
    })

    return $item
}

