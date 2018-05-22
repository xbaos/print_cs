const printer = require("printer");
const { ipcMain } = require('electron')

const getPrinters = () => {
    let printers = printer.getPrinters();
    printers = printers.map(item => item.name);
    return printers
}
console.log(printer)

ipcMain.on("getPrinters",(event,args) => {
    event.sender.send('getPrinters-reply', getPrinters())
})