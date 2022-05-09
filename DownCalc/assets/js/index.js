const btnCalculate = document.querySelector('button')

btnCalculate.addEventListener('click', (e) => {
    e.preventDefault()
    const stringFileSize = document.querySelector('#fileSize').value.replace(',','.')
    const stringConnectionSpeed = document.querySelector('#connectionSpeed').value.replace(',','.')
    const stringDownTime = document.querySelector('#downTime').value.replace(',','.')
    
    try {
        validateStrings(stringFileSize, stringConnectionSpeed, stringDownTime)
        const arrayOfNum = transformStrings(stringFileSize, stringConnectionSpeed, stringDownTime)
    } catch (e) {
        window.alert(e)
    }

})

function validateStrings(stringFileSize, stringConnectionSpeed, stringDownTime) {
    let count = 0
    let i = [stringFileSize, stringConnectionSpeed, stringDownTime]
    for(let stringField of i) {
        if (stringField.length === 0) {
            count++
        }
    }
    if (count === 3 || count === 2 || count === 0) { 
        throw('Por favor, digite valores em 2 campos!')
    }
}

function transformStrings(stringFileSize, stringConnectionSpeed, stringDownTime) {
    const numFileSize = Number(stringFileSize)
    const numConnectionSpeed = Number(stringConnectionSpeed)
    const numDownTime = Number(stringDownTime)

    if (Number.isNaN(numFileSize) || Number.isNaN(numConnectionSpeed) || Number.isNaN(numDownTime)) {
        throw('Algum valor inválido! Por favor, digite novamente!')
    } else {
        return [numFileSize, numConnectionSpeed, numDownTime]
    }
}
