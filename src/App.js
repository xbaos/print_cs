import React, { Component } from 'react';
import './App.less';
import {  Tabs } from 'antd';
import BatchPrint from './BatchPrint/BatchPrint'
const TabPane = Tabs.TabPane;
const electron = window.require('electron');
const ipc = electron.ipcRenderer
console.log(ipc)

class App extends Component {
  state = { size: 'large' };
  constructor(props) {
    super(props)
    ipc.on('asynchronous-reply', function (event, arg) {
      const message = `异步消息回复: ${arg}`
      alert(message)
    })
  }

  callback() {
    ipc.send('asynchronous-message', 'ping')
  }

  render() {
    return (
      <Tabs defaultActiveKey="1" size='large' >
        <TabPane tab="批量打印" key="1"><BatchPrint /> </TabPane>
        <TabPane tab="批量烧写" key="2">Content of Tab Pane 2</TabPane>
        <TabPane tab="局域网内打印" key="3">Content of Tab Pane 3</TabPane>
      </Tabs>
    );
  }
}

export default App;
