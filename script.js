const a = document.getElementById("a")
const b = document.getElementById("b")
const op = document.getElementById("op")

const run = document.getElementById("run")

const log = document.getElementById("log")
const msg = document.getElementById("msg")

let history = []

function check(x, input) {
    let v = x.trim()

    if (v === "") {
        input.classList.add("bad")
        return null
    }

    let n = Number(v)

    if (isNaN(n)) {
        input.classList.add("bad")
        return null
    }

    input.classList.remove("bad")

    return n
}

function calc() {
    msg.textContent = ""

    let x = check(a.value, a)
    let y = check(b.value, b)

    if (x === null || y === null) {
        msg.textContent = "Введите корректные числа"
        return
    }

    if (op.value === "/" && y === 0) {
        msg.textContent = "деление на ноль"
        b.classList.add("bad")
        return
    }

    let r

    if (op.value === "+") r = x + y
    if (op.value === "-") r = x - y
    if (op.value === "*") r = x * y
    if (op.value === "/") r = x / y

    let text = `${x} ${op.value} ${y} = ${r}`

    history.push(text)

    if (history.length > 4)
        history.shift()

    draw()
}

function draw() {
    log.innerHTML = ""

    const lastTwo = history.slice(-2)
    
    lastTwo.forEach((e, i) => {
        let div = document.createElement("div")
        div.textContent = e
        div.className = "line"

        if (i < lastTwo.length - 1)
            div.classList.add("old")

        log.appendChild(div)
    })
}

run.onclick = calc

document.addEventListener("keydown", e => {
    if (e.key === "Enter") calc()
})