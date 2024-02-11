import {getCurrentStorage} from "./js_modules/switchBtn/switchStorageTypeApi.js";

export async function createTodoApp(container, title = 'TODO-LIST', keyWord) {

    const storageModule = await getCurrentStorage()

    storageModule.initializeTodoApp(container, title, keyWord)

}

