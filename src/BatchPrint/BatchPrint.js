import React, { Component } from 'react';
const ipc = window.require('electron').ipcRenderer
class BatchPrint extends Component {
    constructor(props) {
        super(props)
        console.log("组件batchPrint初始化")
        ipc.send('getPrinters', 'ping');
        ipc.on('getPrinters-reply',(event, msg) => {
            console.log(msg)
        })
    }
    
    render() {
        return (
            <div>
                123
            </div>
        );
    }
}

export default BatchPrint;