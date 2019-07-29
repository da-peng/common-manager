import *  as React from 'react'
import { AbstractPage, IAbstractPageProps, IAbstractPageState } from '../../bases/AbstractPage';
import { RouteComponentProps } from 'react-router';

interface IProps extends IAbstractPageProps, RouteComponentProps<any> { }

interface IState extends IAbstractPageState {
}

class DashboardPageContent extends AbstractPage<IProps, IState>{
    state: IState= {};


    displayName = 'DashboardPageContent'


    getRenderContent() {

        return (<div>
            404
        </div>)
    }

}

export default DashboardPageContent