const { app, BrowserWindow } = require('electron')

/**
 * update or remove keys from object, ignore case
 *
 * note: kvs is a object with keys to updated
 *       kvs key must be lower case
 *       kvs value is null to remove
 *       kvs value is undefined to ignore
 **/
function updateKeys(obj = {}, kvs) {
    for (const k of Object.keys(obj)) {
        const v = kvs[k.toLowerCase()]
        if (v === null) delete obj[k]
        else if (v !== undefined) obj[k] = v
    }
}

function createWindow() {
    const win = new BrowserWindow({
        webPreferences: {
            webviewTag: true,
        },
    })

    win.webContents.session.webRequest.onBeforeSendHeaders(
        { urls: ['*://*/*'] },
        (details, callback) => {
            const { url, requestHeaders } = details

            updateKeys(requestHeaders, {
                'sec-fetch-site': 'none',
                'sec-fetch-mode': 'navigate',
                'sec-fetch-dest': 'document',
                'sec-fetch-user': '?1',
                host: url,
                referer: url,
            })

            callback({ requestHeaders })
        }
    )

    win.webContents.session.webRequest.onHeadersReceived(
        { urls: ['*://*/*'] },
        (details, callback) => {
            const { responseHeaders } = details

            updateKeys(responseHeaders, {
                'x-frame-options': null,
                'content-security-policy': null,
            })

            callback({ cancel: false, responseHeaders })
        }
    )

    win.loadURL('http://127.0.0.1:3001/')
}

app.whenReady().then(() => {
    app.on(
        'activate',
        () => BrowserWindow.getAllWindows().length > 0 || createWindow()
    )

    // app.on('web-contents-created', (event, contents) => {
    //     console.log(5555, { event, contents })
    //     contents.on('will-navigate', (event, navigationUrl) => {
    //         console.log(333, { navigationUrl })
    //         // const parsedUrl = new URL(navigationUrl)

    //         // if (parsedUrl.origin !== 'https://example.com') {
    //         event.preventDefault()
    //         // }
    //     })
    // })

    createWindow()
})

app.on('window-all-closed', () => process.platform === 'darwin' || app.quit())
