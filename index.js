const _fromContent = document.getElementById("fromContent")
const _toContent = document.getElementById("toContent")

_fromContent.addEventListener("change", () => {
    conversion(_fromContent.value)
})

const bytesToBinary = fromBytesContent => {
    const fromBytesContentLength = fromBytesContent.length
    let toBinaryContent = ""
    for (let i = 0; i < fromBytesContentLength; i++) {
        toBinaryContent = toBinaryContent + (fromBytesContent[i].toString(2).padStart(8, "0") + " ")
    }
    return toBinaryContent
}

const bytesToDemical = fromBytesContent => {
    const fromBytesContentLength = fromBytesContent.length
    let toDemicalContent = ""
    for (let i = 0; i < fromBytesContentLength; i++) {
        toDemicalContent = toDemicalContent + (fromBytesContent[i].toString(10).padStart(3, "0") + " ")
    }
    return toDemicalContent
}

const bytesToHexademical = fromBytesContent => {
    const fromBytesContentLength = fromBytesContent.length
    let toHexademicalContent = ""
    for (let i = 0; i < fromBytesContentLength; i++) {
        toHexademicalContent = toHexademicalContent + (fromBytesContent[i].toString(16).padStart(2, "0") + " ")
    }
    return toHexademicalContent
}

const bytesToBase64 = fromBytesContent => {
    const tempList = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
    const fromBytesContentLength = fromBytesContent.length
    let toCodeContent = ""
    let toBase64Content = ""
    for (let i = 0; i < fromBytesContentLength; i++) {
        toCodeContent = toCodeContent + fromBytesContent[i].toString(2).padStart(8, "0")
    }
    const toCodeContentLength = toCodeContent.length
    let ending = ""
    if (toCodeContentLength % 3 == 1) {
        ending = "=="
        toCodeContent = toCodeContent + "0000"
    }
    else if (toCodeContentLength % 3 == 2) {
        ending = "="
        toCodeContent = toCodeContent + "00"
    }
    let tot = 0
    while (tot < toCodeContentLength) {
        let t = 1
        let tempCode = 0
        for (let i = 0; i < 6; i++) {
            tempCode = tempCode + t * (toCodeContent[tot + 5 - i] == "1" ? 1 : 0)
            t = t * 2
        }
        toBase64Content = toBase64Content + tempList[tempCode]
        tot = tot + 6
    }
    toBase64Content = toBase64Content + ending
    return toBase64Content
}

const conversion = str => {

    const labelList = ["Binary", "Demical", "Hexademical", "Base64"]
    const funcList = [bytesToBinary, bytesToDemical, bytesToHexademical, bytesToBase64]
    const funcLength = funcList.length
    const bytes = new TextEncoder("utf-8").encode(str);

    let output = ""
    for(let i=0;i<funcLength;i++) {
        output+="- "
        output+=labelList[i]
        output+="\n"
        output+=funcList[i](bytes)
        output+="\n\n"
    }
    _toContent.innerText = output
}