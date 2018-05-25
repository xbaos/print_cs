const printer = require("printer");
const { ipcMain } = require('electron')
const dbTool = require("../db/db_tool")

const PrinterAPI = {
    /**
     * 获取所有打印机
     */
    getPrinters:  () => {
        let printers = printer.getPrinters();
        printers = printers.map(item => item.name);
        return printers
    },

    /**
     * 获取所有打印模板
     */
    getAllPrintTemplate: async () => {
        let result = await dbTool.allSQL("select * from c_printtemp");
        return result
    },

    updatePrintTemplate : async (temp) => {
        try {
            temp.elements = JSON.stringify(temp.elements);
            let sql
            if (temp.iid) {
                sql = `UPDATE c_printtemp
                SET name = '${temp.name}', width = '${temp.width}', height = '${temp.height}', dpi = '${temp.dpi}', elements = '${temp.elements}', url = '${temp.url}'
                WHERE iid = ${temp.iid}`;
            } else {
                sql = `insert into c_printtemp (name, width, height, dpi, url, elements, type)
                VALUES ("${temp.name}", "${temp.width}", "${temp.height}", "${temp.dpi}", "${temp.url}", '${temp.elements}', '${temp.type}');`;
            }
            await dbTool.runSQL(sql)
            return {
                success: true,
            }
        } catch (error) {
            return {
                success: false,
                msg: error
            }
        }
    }
}



/**
 * 为所有的方法注册通讯事件
 */
for (let key in PrinterAPI) {
    console.log(key);
    ipcMain.on(key, async (event, args) => {
        let result = await PrinterAPI[key](args)
        event.sender.send(key+'-reply', result )
    })
}