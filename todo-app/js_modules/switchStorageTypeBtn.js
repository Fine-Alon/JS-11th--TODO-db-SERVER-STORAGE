import {switchStorageType} from "./helpers.js";

export function createSwitchStorageTypeBtn(initialStorageType,storeType) {
    let storageType = initialStorageType
    console.log(storageType)

    let $btnWrapper = document.createElement('div')
    $btnWrapper.style.display = 'flex'
    $btnWrapper.style.justifyContent = 'center'
    $btnWrapper.style.padding = '10px'

    let $switchStorageTypeBtn = document.createElement('button')
    $switchStorageTypeBtn.classList.add('btn', 'btn-warning')
    updateBtnText()

    $switchStorageTypeBtn.addEventListener('click', function () {

        if (storeType === 'local') {
            // Load localStorageApi.js dynamically
            import('./localStorageApi').then((localStorageModule) => {
                // Use the module as needed
                // For example, you can call a function from one.js
                oneModule.createTodoApp();
            })

            storageType = switchStorageType()
            updateBtnText()
            location.reload() // Reload the page

        } else {
            // Load serverStorageApi.js dynamically
            import('./serverStorageApi').then((serverStorageModule) => {
                // Use the module as needed
                // For example, you can call a function from one.js
                oneModule.createTodoApp();
            })

            storageType = switchStorageType()
            updateBtnText()
            location.reload() // Reload the page
        }
    })

    $btnWrapper.append($switchStorageTypeBtn)

    return $btnWrapper

    function updateBtnText() {
        $switchStorageTypeBtn.textContent = `switch to: *${storageType ? 'LOCAL' : 'SERVER'}_DATA_STORAGE*`;
    }
}
