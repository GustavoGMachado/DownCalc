const btnCalculate = document.querySelector('button')

btnCalculate.addEventListener('click', (e) => {
    e.preventDefault()
    const stringFileSize = document.querySelector('#fileSize').value.replace(',','.')
    const stringConnectionSpeed = document.querySelector('#connectionSpeed').value.replace(',','.')
    const stringDownTime = document.querySelector('#downTime').value.replace(',','.')
    
    const selectFileSize = document.querySelector('#selectFZ').value
    const selectConnectionSpeed = document.querySelector('#selectCS').value
    const selectDownTime = document.querySelector('#selectDT').value

    try {
        validateStrings(stringFileSize, stringConnectionSpeed, stringDownTime)
        const arrayOfNum = transformStrings(stringFileSize, stringConnectionSpeed, stringDownTime)
        const arrayOfSelect = [selectFileSize, selectConnectionSpeed, selectDownTime]

        const sizeInMB = transformFZinMB(arrayOfNum[0], arrayOfSelect[0])
        const speedInMbps = transformCSinMbps(arrayOfNum[1], arrayOfSelect[1])
        const timeInSeconds = transformDTinSeconds(arrayOfNum[2], arrayOfSelect[2])




        const calc = doCalculation(sizeInMB, speedInMbps, timeInSeconds)
        console.log(calc)

        
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

function transformFZinMB(arrayOfNum0, selectFileSize) {
    if (selectFileSize === 'kB') {
        const sizeInMB = arrayOfNum0 / 1024
        return sizeInMB
    }
    if (selectFileSize === 'MB') {
        return arrayOfNum0
    }
    if (selectFileSize === 'GB') {
        const sizeInMB = arrayOfNum0 * 1024
        return sizeInMB
    } 
}

function transformCSinMbps(arrayOfNum1, selectConnectionSpeed) {
    if (selectConnectionSpeed === 'KB/s') {
        const speedInMbps = arrayOfNum1 / 125
        return speedInMbps
    }
    if (selectConnectionSpeed === 'Mb/s') {
        return arrayOfNum1
    } 
    if (selectConnectionSpeed === 'MB/s') {
        const speedInMbps = arrayOfNum1 * 8
        return speedInMbps
    }
}

function transformDTinSeconds(arrayOfNum2, selectDownTime) {
    if (selectDownTime === 'Seconds') {
        return arrayOfNum2
    }
    if (selectDownTime === 'Minutes') {
        const timeInSeconds = arrayOfNum2 * 60
        return timeInSeconds
    }
    if (selectDownTime === 'Hours') {
        const timeInSeconds = arrayOfNum2 * 3600
        return timeInSeconds
    }
}

function doCalculation(sizeInMB, speedInMbps, timeInSeconds) {

    if (sizeInMB === 0) {
        const calc = (speedInMbps/8) * timeInSeconds
        return calc
    }

    if (speedInMbps === 0) {
        console.log('calcular speed')
    }

    if (timeInSeconds === 0) {
        const calc = sizeInMB / (speedInMbps/8)
        return calc
    }
}