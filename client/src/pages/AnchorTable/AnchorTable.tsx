import * as Style from './AnchorTable.less'
import *  as Rect from 'react'
import { IAnchorInfo } from '../../models/Anchor';
import { IAbstractPageState, IAbstractPageProps, AbstractPage } from '../../bases/AbstractPage';
import { RouteComponentProps } from 'react-router-dom';
import { FormComponentProps } from 'antd/lib/form';
import { IReuqestBase } from '../../bases/HttpModel';

interface IProps extends IAbstractPageProps,FormComponentProps, RouteComponentProps<any> {}


interface IState extends IAbstractPageState {
    orderList: Array<IAnchorInfo>
}


class AnchorTablePage extends AbstractPage<IProps,IState>{

    displayName = 'AnchorTablePage'
    state:IState = {
        orderList: [],
        pageNum: 1,
        total: 0
    }

    componentDidMount() {
        // this.setFormValue()
    }
    /**
     * 回填表单
     */
    // setFormValue() {
    //     const { setFieldsValue } = this.props.form
    //     const data:

    // }

    async getAnchorTableListData(){
        const { pageSize = 1, pageNum = 1 } = this.state
        this.showLoading()
        let params :IReuqestBase= {
            pageSize,
            page:pageNum,
            componentUUID: this.getUUID()
        }

    }


    getRenderContent(){
        return (
            <div>a</div>
        )
    }


}