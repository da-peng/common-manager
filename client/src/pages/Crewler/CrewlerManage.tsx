import *  as React from 'react'
import { IAbstractPageState, IAbstractPageProps, AbstractPage } from '../../bases/AbstractPage';
import { RouteComponentProps } from 'react-router-dom';
import { FormComponentProps } from 'antd/lib/form';
import { CrewlerList } from '../../components/CrewlerList/CrewlerList';

interface IProps extends IAbstractPageProps,FormComponentProps, RouteComponentProps<any> {}


interface IState extends IAbstractPageState {

}


class CrewlerManagePage extends AbstractPage<IProps,IState>{

    displayName = 'CrewlerManagePage'
    state:IState = {}
    /**
     * 表格切页
     */


    getRenderContent(){
        return (
            
            <CrewlerList {...this.props}/>
        
        )
    }


}

export default CrewlerManagePage