import {getCurrentStorage} from "./js_modules/switchBtn/switchStorageTypeApi.js";

export async function createTodoApp(container, title = 'TODO-LIST', keyWord) {

    console.log(  await getCurrentStorage())



    // getCurrentStorageType() === 'LS'
    //     ? await import('/js_modules/localStorageApp.js')
    //     : await import('/js_modules/serverStorageApp.js')
}

// window.createTodoApp = createTodoApp
