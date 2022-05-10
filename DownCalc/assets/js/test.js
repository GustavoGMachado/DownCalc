function Horas() {

    let segundos = 23400
    

    var h = Math.trunc(segundos/3600)
    var m = Math.trunc((segundos -(h * 3600)) / 60)
    var s = segundos % 60

    console.log(h)
    console.log(m)
    console.log(s)
}

Horas()