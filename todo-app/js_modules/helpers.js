export function saveStorageTypeServer(isServerStorage) {
    localStorage.setItem('storageTypeServer', JSON.stringify(isServerStorage))
}

export function isStorageTypeServer() {
    return localStorage.getItem('storageTypeServer')
}

export function saveTodoData(keyName, arr) {
    localStorage.setItem(keyName, JSON.stringify(arr));
}