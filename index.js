const _fromContent = document.getElementById("fromContent")
const _toContent = document.getElementById("toContent")

const _binaryStr = document.getElementById("binaryStr")
const _demicalStr = document.getElementById("demicalStr")
const _hexademicalStr = document.getElementById("hexademicalStr")
const _base64Str = document.getElementById("base64Str")
const _md5Str = document.getElementById("md5Str")
const _sha1Str = document.getElementById("sha1Str")

_fromContent.addEventListener("change", () => {
    conversion(_fromContent.value)
})

const bytesToBinary = fromBytesContent => {
    if (fromBytesContent.length == 0) return ""
    const fromBytesContentLength = fromBytesContent.length
    let toBinaryContent = ""
    for (let i = 0; i < fromBytesContentLength; i++) {
        toBinaryContent = toBinaryContent + (fromBytesContent[i].toString(2).padStart(8, "0") + " ")
    }
    return toBinaryContent
}

const bytesToDemical = fromBytesContent => {
    if (fromBytesContent.length == 0) return ""
    const fromBytesContentLength = fromBytesContent.length
    let toDemicalContent = ""
    for (let i = 0; i < fromBytesContentLength; i++) {
        toDemicalContent = toDemicalContent + (fromBytesContent[i].toString(10).padStart(3, "0") + " ")
    }
    return toDemicalContent
}

const bytesToHexademical = fromBytesContent => {
    if (fromBytesContent.length == 0) return ""
    const fromBytesContentLength = fromBytesContent.length
    let toHexademicalContent = ""
    for (let i = 0; i < fromBytesContentLength; i++) {
        toHexademicalContent = toHexademicalContent + (fromBytesContent[i].toString(16).padStart(2, "0") + " ")
    }
    return toHexademicalContent
}

const bytesToBase64 = fromBytesContent => {
    if (fromBytesContent.length == 0) return ""
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

const bytesToMd5 = bytes => {
    if (bytes.length == 0) return ""
    function uint8ArrayToWordArray(uint8Array) {
        var words = []
        for (var i = 0; i < uint8Array.length; i += 4) {
            words.push(
                (uint8Array[i] << 24) |
                (uint8Array[i + 1] << 16) |
                (uint8Array[i + 2] << 8) |
                (uint8Array[i + 3])
            )
        }
        return CryptoJS.lib.WordArray.create(words, uint8Array.length)
    }
    var wordArray = uint8ArrayToWordArray(bytes)
    var md5Hash = CryptoJS.MD5(wordArray)
    return md5Hash.toString(CryptoJS.enc.Hex)
}

const bytesToSha1 = bytes => {
    if (bytes.length == 0) return ""
    function uint8ArrayToWordArray(uint8Array) {
        var words = []
        for (var i = 0; i < uint8Array.length; i += 4) {
            words.push(
                (uint8Array[i] << 24) |
                (uint8Array[i + 1] << 16) |
                (uint8Array[i + 2] << 8) |
                (uint8Array[i + 3])
            )
        }
        return CryptoJS.lib.WordArray.create(words, uint8Array.length)
    }
    var wordArray = uint8ArrayToWordArray(bytes)
    var sha1Hash = CryptoJS.SHA1(wordArray)
    return sha1Hash.toString(CryptoJS.enc.Hex)
}

const eleList = [_binaryStr, _demicalStr, _hexademicalStr, _base64Str, _md5Str, _sha1Str]
const labelList = ["Binary", "Demical", "Hexademical", "Base64", "Md5", "Sha1Str"]
const funcList = [bytesToBinary, bytesToDemical, bytesToHexademical, bytesToBase64, bytesToMd5, bytesToSha1]
const funcLength = funcList.length

const conversion = str => {

    const bytes = new TextEncoder("utf-8").encode(str)

    let output = ""
    for (let i = 0; i < funcLength; i++) {
        eleList[i].innerText = funcList[i](bytes)
    }
}
