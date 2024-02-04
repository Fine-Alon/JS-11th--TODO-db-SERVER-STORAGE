(function () {
    // global objects for using from every contains in thise APP func's
    // array that include objects(tasks) that contain(NAME, ID, DONE-status) 
    let todoTasksArray = [],
        keyName = '',
        storageTypeServer = false

    // 5 server functions...GET, DELETE, doneTrue, doneFalse, ADD 
    async function getDataFromServer(owner) {
        const response = await fetch(`http://localhost:3003/api/todos?owner=${owner}`)
        const data = await response.json()
        console.log(data);
        return data
    }

    async function deleteDataFromServer(id) {
        const response = await fetch(`http://localhost:3003/api/todos/${id}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'aplication/json'}
        })
        if (response.status == 404) {
            console.log('so sory');
        }
        const data = await response.json()
        return data
    }

    async function doneDataAtServerTrue(id) {

        const response = await fetch(`http://localhost:3003/api/todos/${id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            // { name?: string, owner?: string, done?: boolean }
            body: JSON.stringify({
                done: true
            })
        })

        const data = await response.json()
        console.log(data);
    }

    async function doneDataAtServerFalse(id) {

        const response = await fetch(`http://localhost:3003/api/todos/${id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            // { name?: string, owner?: string, done?: boolean }
            body: JSON.stringify({
                done: false
            })
        })

        const data = await response.json()
        console.log(data);
    }

    async function addDataToServer(obj) {

        const response = await fetch('http://localhost:3003/api/todos', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            // { name: string, owner: string, done?: boolean }
            body: JSON.stringify({
                name: obj.name,
                owner: obj.key,
                done: obj.done
            })
        })
        const data = await response.json()
        console.log(data);

        return data
    }

    function createAppTitle(title) {
        let $appTitle = document.createElement('h2');
        $appTitle.innerHTML = title;
        return $appTitle;
    }

    function createAppSwitchStorageTypeBtn() {
        let $btnWrapper = document.createElement('div')
        $btnWrapper.style.display = 'flex'
        $btnWrapper.style.justifyContent = 'center'
        $btnWrapper.style.padding = '10px'

        let $switchStorageTypeBtn = document.createElement('button')
        $switchStorageTypeBtn.classList.add('btn', 'btn-warning')
        storageTypeServer
            ? $switchStorageTypeBtn.innerHTML = 'switch to:  *LOCAL_DATA_STORAGE*'
            : $switchStorageTypeBtn.innerHTML = 'switch to:  *SERVER_DATA_STORAGE*'

        $switchStorageTypeBtn.addEventListener('click',function (){
            storageTypeServer = !storageTypeServer
            storageTypeServer
                ? $switchStorageTypeBtn.innerHTML = 'switch to:  *LOCAL_DATA_STORAGE*'
                : $switchStorageTypeBtn.innerHTML = 'switch to:  *SERVER_DATA_STORAGE*'
        })

        $btnWrapper.append($switchStorageTypeBtn)

        return $btnWrapper
    }

    function createTodoItemForm() {
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

    function createTodoList() {
        let $list = document.createElement('ul');
        $list.classList.add('list-group');
        return $list;
    };
    // function gettNewId(arr) {
    //     let maxId = 0;
    //     for (let todoObj of arr) {
    //         if (todoObj.userid >= maxId) {
    //             maxId = todoObj.userid;
    //         }
    //     }
    //     return maxId += 1;
    // };
    function createTodoItem(obj) {
        let $item = document.createElement('li');

        let $buttonGroup = document.createElement('div');
        let $doneButton = document.createElement('button');
        let $deliteButton = document.createElement('button');

        $item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        $item.textContent = obj.name;

        $buttonGroup.classList.add('btn-group', 'btn-group-sm');
        $doneButton.classList.add('btn', 'btn-success');
        $doneButton.textContent = 'DONE';
        $deliteButton.classList.add('btn', 'btn-danger');
        $deliteButton.textContent = 'DELITE';

        $buttonGroup.append($doneButton);
        $buttonGroup.append($deliteButton);
        $item.append($buttonGroup);

        if (obj.done == true) {
            $item.classList.add('list-group-item-success')
        }
        ;

        $doneButton.addEventListener('click', function () {
            $item.classList.toggle('list-group-item-success')
            for (let element of todoTasksArray) {
                if (obj.id == element.id) {

                    obj.done = !obj.done

                    // change done status at server
                    obj.done ? doneDataAtServerTrue(obj.id) : doneDataAtServerFalse(obj.id)
                }
                ;
            }
            ;
            // for localstorage
            // saveTodoData(keyName, todoTasksArray);
        });

        $deliteButton.addEventListener('click', function () {
            if (confirm('are you sure?')) {
                $item.remove();
                // delete from array
                for (let element = 0; element < todoTasksArray.length; element++) {
                    if (todoTasksArray[element].id == obj.id) {
                        todoTasksArray.splice(element, 1);
                    }
                    ;
                }
                ;
                deleteDataFromServer(obj.id)
                // for localstorage
                // saveTodoData(keyName, todoTasksArray);
            }
            ;
        });

        return $item
    };

    // function saveTodoData(keyName, arr) {
    //     localStorage.setItem(keyName, JSON.stringify(arr));
    // };
    async function createTodoApp(container, title = 'TODO-LIST', keyWord) {
        // her we assign functions into variables
        let $todoAppTitle = createAppTitle(title)
        let $todoItemForm = createTodoItemForm()
        let $switchStorageTypeBtn = createAppSwitchStorageTypeBtn()
        let $todoList = createTodoList()

        container.append($todoAppTitle);
        container.append($todoItemForm.$form)
        container.append($switchStorageTypeBtn)
        // =============================================== ////
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
            let $todoItem = createTodoItem(listObj);
            $todoList.append($todoItem);
        }
        ;

        $todoItemForm.$form.addEventListener('submit', function (e) {
            e.preventDefault();
            // check if we have value of input field
            if (!$todoItemForm.$input.value) {
                return;
            }
            ;

            todoNewTask = {
                name: $todoItemForm.$input.value,
                done: false,
                // userid: gettNewId(todoTasksArray),
                key: keyWord,
            };

            addDataToServer(todoNewTask)

            let $todoItem = createTodoItem(todoNewTask);

            // here we add new TASK into Array of tasks
            todoTasksArray.push(todoNewTask);

            // here we add new TASK into DOM element
            $todoList.append($todoItem);

            // for local storage
            // saveTodoData(keyName, todoTasksArray);

            // here we delite input value(new task that user has enter) after adding new task
            $todoItemForm.$input.value = '';

        });
    };

    window.createTodoApp = createTodoApp;
})();
