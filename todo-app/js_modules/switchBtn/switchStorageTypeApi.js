export function getCurrentStorageType() {
    return localStorage.getItem('storageType') || 'LS';
}

export function switchStorageType() {
    const currentStorageType = getCurrentStorageType()
    const newStorageType = currentStorageType === 'LS' ? 'SS' : 'LS'
    localStorage.setItem('storageType', newStorageType)
    return newStorageType
}

export function saveStorageType(storageType) {
    localStorage.setItem('storageType', storageType);
}

export async function loadLocalSModule() {
    const lSModule = await import('../localStorageApp.js')
    return lSModule
}

export async function loadServerSModule() {
    const sSModule = await import('../serverStorageApp.js')
    return sSModule
}

export function getCurrentStorage() {
    let currentStorage = null

    if (getCurrentStorageType() === 'LS') {
        currentStorage = loadLocalSModule()
    } else {
        currentStorage = loadServerSModule()
    }
    return currentStorage
}