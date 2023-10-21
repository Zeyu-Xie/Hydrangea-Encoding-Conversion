const _fromContent = document.getElementById("fromContent")
const _toContent = document.getElementById("toContent")

_fromContent.addEventListener("change", () => {
    conversion(_fromContent.value)
})
_toContent.addEventListener("change", () => {
    conversion(_fromContent.value)
})

const conversion = str => {
    const bytes = new TextEncoder("utf-8").encode(str);
    
    let output = ""

    for (let i = 0; i < bytes.length; i++) {
        output = output + bytes[i].toString(2).padStart(8, "0") + " "
    }

    output += "\n"

    for (let i = 0; i < bytes.length; i++) {
        output = output + bytes[i].toString(16).padStart(2, "0") + " "
    }

    _toContent.innerText = output
}