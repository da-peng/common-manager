import * as Style from './AnchorTable.less'
import *  as React from 'react'
import { IAbstractPageState, IAbstractPageProps, AbstractPage } from '../../bases/AbstractPage';
import { RouteComponentProps } from 'react-router-dom';
import { FormComponentProps } from 'antd/lib/form';
import { AnchorTable } from '../../components/AnchorTable/AnchorTableComponents';

interface IProps extends IAbstractPageProps,FormComponentProps, RouteComponentProps<any> {}


interface IState extends IAbstractPageState {
    // anchorList: Array<IAnchorInfo>
}


class AnchorTablePage extends AbstractPage<IProps,IState>{

    displayName = 'AnchorTablePage'
    state:IState = {}
    /**
     * 表格切页
     */


    getRenderContent(){
        return (
            <div>
                <AnchorTable {...this.props}/>
            </div>
        )
    }


}

export default AnchorTablePage