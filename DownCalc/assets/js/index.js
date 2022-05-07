const btnCalculate = document.querySelector('button')

btnCalculate.addEventListener('click', function() {
    const stringFileSize = document.querySelector('#fileSize').value
    const stringConnectionSpeed = document.querySelector('#connectionSpeed').value
    const stringDownTime = document.querySelector('#downTime').value

    validateStrings(stringFileSize, stringConnectionSpeed,stringDownTime)
})

function validateStrings(stringFileSize, stringConnectionSpeed, stringDownTime) {
    // if (stringFileSize.length && stringConnectionSpeed.length && stringDownTime.length !== 0) return window.alert('Por favor, digite valores em apenas 2 campos!')
    let count = 0
    let i = [stringFileSize, stringConnectionSpeed, stringDownTime]
    for(let stringField of i) {
        if (stringField.length === 0) {
            count++
        }
    }
    if (count === 3 || count === 2 || count === 0) return window.alert('Por favor, digite valores em 2 campos!')
    if (stringFileSize.includes(',') || stringConnectionSpeed.includes(',') || stringDownTime.includes(',')) {
        
    }

    try {
        
    } catch (e) {
        
    }
    // transformar virgulas em pontos
    // usar try catch para outros erros (mais de um ponto por exemplo)
    
}
