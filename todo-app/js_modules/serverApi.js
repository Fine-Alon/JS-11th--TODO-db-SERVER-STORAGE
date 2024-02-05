// 5 server functions...GET, DELETE, doneTrue, doneFalse, ADD
export async function getDataFromServer(owner) {
    const response = await fetch(`http://localhost:3003/api/todos?owner=${owner}`)
    const data = await response.json()
    console.log(data);
    return data
}

export async function deleteDataFromServer(id) {
    const response = await fetch(`http://localhost:3003/api/todos/${id}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    })
    if (response.status === 404) {
        console.log('so sorry');
    }
    const data = await response.json()
    return data
}

export async function doneDataAtServerTrue(id) {

    const response = await fetch(`http://localhost:3003/api/todos/${id}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        // { name?: string, owner?: string, done?: boolean }
        body: JSON.stringify({
            done: true
        })
    })

    const data = await response.json()
    return data
}

export async function doneDataAtServerFalse(id) {

    const response = await fetch(`http://localhost:3003/api/todos/${id}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        // { name?: string, owner?: string, done?: boolean }
        body: JSON.stringify({
            done: false
        })
    })

    const data = await response.json()
    return data
}

export async function addDataToServer(obj) {

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
    return data
}

