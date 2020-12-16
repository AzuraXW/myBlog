function getCookies(cookieStr, key) {
    const cookie = {}
    cookieStr.split(';').forEach((item, index) => {
        if(!item) {
            return
        }
        const arr = item.split('=')
        cookie[arr[0]] = arr[1]
    })

    return cookie[key]
}

module.exports = {
    getCookies
}