export function getNewId(arr) {
    let maxId = 0
    for (let todoObj of arr) {
        if (todoObj.id >= maxId) {
            maxId = todoObj.id + 1
        }
    }
    return maxId
}

// 5 server functions...GET, DELETE, doneTrue, doneFalse, ADD
export const servStorageHandler = {

    getDataFromServer: async function (owner) {
        const response = await fetch(`http://localhost:3003/api/todos?owner=${owner}`)
        return await response.json()
    },

    deleteDataFromServer: async function (id) {
        const response = await fetch(`http://localhost:3003/api/todos/${id}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'}
        })
        if (response.status === 404) {
            console.log('so sorry but data Not found!');
        }

        return await response.json()
    },

    isTaskDone: async function (id, isDone = false) {
        const response = await fetch(`http://localhost:3003/api/todos/${id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            // { name?: string, owner?: string, done?: boolean }
            body: JSON.stringify({
                done: isDone
            })
        })

        return await response.json()
    },

    addDataToServer: async function (obj) {

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

        return await response.json()
    }
}

export const localStorageHandler = {

    getDataArrFromLS: function (keyName) {
        console.log('LS:', keyName)

        // check if we have any stored string(ARRAY data) & parse it back to readable ARRAY
        const savedData = localStorage.getItem(keyName)
        if (savedData !== null && savedData !== '') {
            return JSON.parse(savedData)
        }
        return []
    },

    saveTodoData: function (keyName, todoTasksArray) {
        return localStorage.setItem(keyName, JSON.stringify(todoTasksArray));
    }
}
