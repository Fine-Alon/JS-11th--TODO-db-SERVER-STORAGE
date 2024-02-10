import {saveStorageType, switchStorageType} from "./switchStorageTypeApi";

export function createSwitchStorageTypeBtn(initialStorageType = 'LS') {
    function updateBtnText() {
        $switchStorageTypeBtn.innerHTML = `switch to: *${storageType === 'SS' ? 'LOCAL' : 'SERVER'}_DATA_STORAGE*`
    }

    let storageType = initialStorageType
    console.log('initialStorageType:',storageType)

    let $btnWrapper = document.createElement('div')
    $btnWrapper.style.display = 'flex'
    $btnWrapper.style.justifyContent = 'center'
    $btnWrapper.style.padding = '10px'

    let $switchStorageTypeBtn = document.createElement('button')
    $switchStorageTypeBtn.classList.add('btn', 'btn-warning')
    updateBtnText()

    $switchStorageTypeBtn.addEventListener('click', function () {

        if (storageType === 'LS') {
            storageType = switchStorageType()
            updateBtnText()
            console.log('switched to:',storageType)
            saveStorageType(storageType)
            // location.reload() // Reload the page

        } else {
            storageType = switchStorageType()
            updateBtnText()
            console.log('switched to:',storageType)
            saveStorageType(storageType)
            // location.reload() // Reload the page
        }
    })

    $btnWrapper.append($switchStorageTypeBtn)

    return $btnWrapper
}
