(function () {
    const selectLanguageBR = document.querySelector(`#selectLanguageBR`)
    const selectLanguageEN = document.querySelector(`#selectLanguageEN`)

    selectLanguageEN.addEventListener('click', () => {
        document.querySelector('#lfileSize').innerHTML = 'File size'
        document.querySelector('#lconnectionSpeed').innerHTML = 'Connection Speed'
        document.querySelector('#ldownTime').innerHTML = 'Download time'
        document.querySelector('#calcForm button').innerHTML = 'Calculate'
        document.querySelector('#minutes').innerHTML = 'Minutes'
        document.querySelector('#hours').innerHTML = 'Hours'
        document.querySelector('#days').innerHTML = 'Days'
    })

    selectLanguageBR.addEventListener('click', () => {
        document.querySelector('#lfileSize').innerHTML = 'Tamanho do arquivo'
        document.querySelector('#lconnectionSpeed').innerHTML = 'Velocidade de conexão'
        document.querySelector('#ldownTime').innerHTML = 'Tempo para Download'
        document.querySelector('#calcForm button').innerHTML = 'Calcular'
        document.querySelector('#minutes').innerHTML = 'Minutos'
        document.querySelector('#hours').innerHTML = 'Horas'
        document.querySelector('#days').innerHTML = 'Dias'
    })
})();

(function () {
    const btnCalculate = document.querySelector('button')
    const stringDownTime = document.querySelector('#downTime')
    stringDownTime.disabled = true

    btnCalculate.addEventListener('click', (e) => {
        e.preventDefault()
        const stringFileSize = document.querySelector('#fileSize').value.replace(',','.')
        const stringConnectionSpeed = document.querySelector('#connectionSpeed').value.replace(',','.')

        const selectFileSize = document.querySelector('#selectFZ').value
        const selectConnectionSpeed = document.querySelector('#selectCS').value
        const selectDownTime = document.querySelector('#selectDT').value

        try {
            validateStrings(stringFileSize, stringConnectionSpeed)
            const arrayOfNum = transformStrings(stringFileSize, stringConnectionSpeed)
            const arrayOfSelect = [selectFileSize, selectConnectionSpeed, selectDownTime]

            const sizeInMB = transformFZinMB(arrayOfNum[0], arrayOfSelect[0])
            const speedInMbps = transformCSinMbps(arrayOfNum[1], arrayOfSelect[1])

            const calc = doCalculation(sizeInMB, speedInMbps, selectDownTime)
            stringDownTime.value = calc
            
        } catch (e) {
            window.alert(e)
        }
    })

    function validateStrings(stringFileSize, stringConnectionSpeed) {
        if (stringFileSize.length === 0 || stringConnectionSpeed.length === 0) { 
            if (document.querySelector('#lfileSize').innerHTML === 'File size') {
                throw('Please enter values in 2 fields!')
            } else {
                throw('Por favor, digite valores em 2 campos!')
            }
        }
    }

    function transformStrings(stringFileSize, stringConnectionSpeed) {
        const numFileSize = Number(stringFileSize)
        const numConnectionSpeed = Number(stringConnectionSpeed)

        if (Number.isNaN(numFileSize) || Number.isNaN(numConnectionSpeed) || numFileSize === 0 || numConnectionSpeed === 0) {
            if (document.querySelector('#lfileSize').innerHTML === 'File size') {
                throw('Some invalid value! Please type again!')
            } else {
                throw('Algum valor inválido! Por favor, digite novamente!')
            }
        } else {
            return [numFileSize, numConnectionSpeed]
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

    function doCalculation(sizeInMB, speedInMbps, selectDownTime) {

        const calcSeconds = sizeInMB / (speedInMbps/8)

        if (selectDownTime === 'minutes') {
            const m = Math.trunc((calcSeconds / 60))
            const s = Math.trunc(calcSeconds % 60)

            if (m === 0 && s === 0) {
                if (document.querySelector('#lfileSize').innerHTML === 'File size') {
                    return `less than 1 second`
                } else {
                    return `menos de 1 segundo`
                }
            }
            
            if (document.querySelector('#lfileSize').innerHTML === 'File size') {
                return `${m} minute(s) e ${s} second(s)`
            } else {
                return `${m} minuto(s) e ${s} segundo(s)`
            }
        }

        if (selectDownTime === 'hours') {      
            const h = Math.trunc(calcSeconds/3600)
            const m = Math.trunc((calcSeconds -(h * 3600)) / 60)
            const s = Math.trunc(calcSeconds % 60)

            if (h === 0 && m === 0 && s === 0) {
                if (document.querySelector('#lfileSize').innerHTML === 'File size') {
                    return `less than 1 second`
                } else {
                    return `menos de 1 segundo`
                }
            }

            if (document.querySelector('#lfileSize').innerHTML === 'File size') {
                return `${h} hour(s), ${m} minute(s) e ${s} second(s)`
            } else {
                return `${h} hora(s), ${m} minuto(s) e ${s} segundo(s)`
            }
        }

        if (selectDownTime === 'days') {
            const d = Math.trunc(calcSeconds/86400)
            const h = Math.trunc((calcSeconds - (d * 86400)) /3600)
            const m = Math.trunc((calcSeconds -((d * 86400) + (h * 3600))) / 60) 
            const s = Math.trunc(calcSeconds % 60)

            if (d === 0 && h === 0 && m === 0 && s === 0) {
                if (document.querySelector('#lfileSize').innerHTML === 'File size') {
                    return `less than 1 second`
                } else {
                    return `menos de 1 segundo`
                }
            }

            if (document.querySelector('#lfileSize').innerHTML === 'File size') {
                return `${d} day(s), ${h} hour(s), ${m} minute(s) e ${s} second(s)`
            } else {
                return `${d} dia(s), ${h} hora(s), ${m} minuto(s) e ${s} segundo(s)`
            }
        }
    }
})();