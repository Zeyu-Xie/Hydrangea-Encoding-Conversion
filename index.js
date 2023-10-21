const _fromContent = document.getElementById("fromContent")
const _toContent = document.getElementById("toContent")

_fromContent.addEventListener("change", () => {
    conversion(_fromContent.value)
})
_toContent.addEventListener("change", () => {
    conversion(_fromContent.value)
})

const test1 = bytes => {
    const list = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
    let rtt = ""
    let output = ""
    for (let i = 0; i < bytes.length; i++) {
        output = output + bytes[i].toString(2).padStart(8, "0")
    }
    const num = output.length
    let ending = ""
    if(num%3 == 1) {
        ending = "=="
        output = output + "0000"
    }
    else if(num%3==2) {
        ending = "="
        output = output + "00"
    }
    let pos = 0
    while(pos<num) {
        let t=1
        let code = 0
        for(let i=0;i<6;i++) {
            code = code + t*(output[pos+5-i]=="1" ? 1 : 0)
            t=t*2
        }
        rtt = rtt + list[code]
        pos+=6
    }
    return rtt+ending
}

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

    output += "\n"

    output += test1(bytes)

    _toContent.innerText = output
}