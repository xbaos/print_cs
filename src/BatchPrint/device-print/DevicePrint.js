import React, { Component } from 'react';
import { Input, Button, Select, message, Modal } from 'antd'
import LabelDesign from '../../labelDesign/LabelDesign'
import ElecUtil from '../../util/electron'
import stl from './DevicePrint.less'
const Option = Select.Option


class DevicePrint extends Component {
    constructor(props) {
        super(props)
        this.state = {
            template: {},
            templates: [],
            name: '',
            saveAsName: '',
            saveAsVisible: false
        }
    }

    componentWillMount() {
        console.log("xxx")
        this.init()
    }

    init() {
        ElecUtil.ipcGet("getAllPrintTemplate").then(res => {
            res.map(temp => temp.elements = JSON.parse(temp.elements))
            this.setState({ templates: res.filter(item => item.type === 'device') })
            let a = this.state.templates[this.state.templates.length-1]
            if (a) {
                this.setState({ template: a })
                this.setState({ name: a.name })
            }
        })
    }

    save(e) {
        // console.log(this.refs.childComponent.elements)
        let temp = this.state.template;
        temp.name = this.state.name
        this.saveOrUpdate(temp)
    }

    saveOrUpdate(temp) {
        if (!temp.name) {
            return message.error("模板名字不能为空")
        }
        temp.elements = this.refs.childComponent.elements
        temp.dpi = this.refs.childComponent.dpi
        temp.height = this.refs.childComponent.height
        temp.width = this.refs.childComponent.width
        temp.url = this.refs.childComponent.canvas.toDataURL()
        temp.type='device'
        ElecUtil.ipcGet("updatePrintTemplate", temp).then(res => {
            if (res.success) {
                message.success("保存成功")
                this.init()
            }
        })
    }


    saveAsOk = (e) => {
        let temp = this.state.template;
        temp.name = this.state.saveAsName
        delete temp.iid
        this.saveOrUpdate(temp)
        this.saveAsCancel(e)
    }

    saveAsCancel = (e) => {
        this.setState({
            saveAsVisible: false,
            saveAsName: ''
        })
    }

    selectChange = (e) => {
        console.log(e)
        let temp = this.state.templates.find(a => a.iid === e)
        this.setState({
            template: temp,
            name: temp.name
        })
        
    }
    render() {
        let { template, name } = this.state
        return (
            <div className={stl.content}>
                <div className={stl.header}>
                    <label htmlFor="temList">模板列表</label>
                    <Select id='temList' value={template && template.iid} onChange={this.selectChange}>
                        {
                            this.state.templates.map(item =>
                                <Option key={item.iid} value={item.iid}>{item.name}</Option>
                            )
                        }
                    </Select>
                    <label htmlFor="name">模板名称</label>
                    <Input
                        value={name} id='name'
                        style={{ width: '100px', marginRight: "20px" }}
                        onChange={e => { this.setState({ name: e.target.value }) }}
                    ></Input>
                    <Button type='primary' style={{ marginRight: "20px" }} onClick={this.save.bind(this)}> 保存</Button>
                    <Button type='primary' onClick={(e) => this.setState({ saveAsVisible: true })}> 另存为</Button>
                    <Modal
                        title="模板另存为"
                        visible={this.state.saveAsVisible}
                        onOk={this.saveAsOk}
                        onCancel={this.saveAsCancel}
                    >
                        <Input value={this.state.saveAsName} onChange={e => this.setState({ saveAsName: e.target.value })}></Input>
                    </Modal>
                </div>
                <LabelDesign template={this.state.template} type="device" ref="childComponent" />
            </div>
        );
    }
}

export default DevicePrint;