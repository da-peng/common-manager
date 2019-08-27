import * as React from 'react'
import { AbstractComponent, IAbstractComponentProps, IAbstractComponentState } from '../../bases/AbstractComponent';
import {  Input, Select } from 'antd';
import Form, { FormComponentProps } from 'antd/lib/form';
import { ColumnProps } from 'antd/lib/table';
import { IAnchorInfo } from '../../models/Anchor';
import { EditableContext } from './AnchorTableComponents'
import { WrappedFormUtils } from 'antd/lib/form/Form';


interface Iprops extends IAbstractComponentProps, FormComponentProps, ColumnProps<IAnchorInfo> {
  inputType?: string
  editing?: string
  record?: IAnchorInfo
  index?: number
}


interface IState extends IAbstractComponentState {


}


export class EditableCell extends AbstractComponent<Iprops, IState>{

  state: IState = {};

  displayName = 'EditableCell'

  getInput = (dataIndex: string) => {
    const { inputType } = this.props
    if (inputType === 'sex') {
      return (<Select size='small'>
        <Select.Option value="male">男</Select.Option>
        <Select.Option value="female">女</Select.Option>
      </Select>);
    } else if (inputType === 'ageGroup') {
      return (
        <Select size='small'>
          <Select.Option value="70后">70后</Select.Option>
          <Select.Option value="80后">80后</Select.Option>
          <Select.Option value="90后">90后</Select.Option>
          <Select.Option value="00后">00后</Select.Option>
        </Select>
      )
    }
    return <Input />;

  };
  //这里可以用来定义是不是select

  renderCell = (form: WrappedFormUtils<any>) => {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      children,
      ...restProps
    } = this.props;
    //   console.log(this.props)
    // console.log(prop)
    // console.log(children)
    const { getFieldDecorator } = form


    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item style={{ margin: 0 }}>
            {getFieldDecorator(dataIndex as string, {
              rules: [
                {
                  required: true,
                  message: `Please Input ${title}!`,
                },
              ],
              initialValue: (record as any)[dataIndex as any],
            })(this.getInput(dataIndex as string))}
          </Form.Item>
        ) : (children)
        }
      </td>
    )
  }

  getRenderContent() {

    return ( //Value消费端 从Table 那把form对象传过来 this.props.form  table=》form 同级组件  InputCell ActionCell按钮
      <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
    )

  }
}