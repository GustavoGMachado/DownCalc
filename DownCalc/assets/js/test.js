const calcSeconds = 643753

const d = Math.trunc(calcSeconds/86400)
const h = Math.trunc((calcSeconds - (d * 86400)) /3600) // descontar segundos do dia dos segundos totais
const m = Math.trunc((calcSeconds -((d * 86400) + (h * 3600))) / 60) // somar segundos descontados nos dias e nas horas do total
const s = Math.trunc(calcSeconds % 60)

console.log(d)
console.log(h)
console.log(m)
console.log(s)