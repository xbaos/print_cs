
// const ipc = window.require('electron').ipcRenderer
// const ipc = require('electron').ipcRenderer

// const electron = window.require('electron');
// const {ipc} = electron;
const electron = window.require('electron');
const fs = electron.remote.require('fs');
const ipc  = electron.ipcRenderer;

class ElecUtil {
    /**
     * 与electron通讯
     * @param {*} type  "getPrinters"
     */
    static ipcGet(type, data='123') {
        ipc.send(type, data);
        return new Promise((res,rej) => {
            ipc.on(type+'-reply', (event, msg) => {
                res(msg)
            })
        })
    }
}

export default ElecUtil