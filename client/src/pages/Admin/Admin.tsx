import *  as React from 'react'
import { AbstractPage, IAbstractPageProps, IAbstractPageState } from '../../bases/AbstractPage';
import { RouteComponentProps} from 'react-router';
import { Layout } from 'antd';
import { MenuNavigation } from '../../components/Admin/Navigation/MenuNavigation';
import { CrumbsNavigation } from '../../components/Admin/Navigation/CrumbsNavigation';
import PageContentRouteCompent from '../../routes/PageContentRouteCompent';
import { DropdownClass } from '../../components/User/UserDropdown';
import  styles  from './Admin.less'
const { Sider, Header, Content } = Layout

interface IProps extends IAbstractPageProps, RouteComponentProps<any> { }

interface IState extends IAbstractPageState {
    collapsed?: boolean,
    value?:number
}

class AdminPageClass extends AbstractPage<IProps, IState>{


    displayName = 'AdminPageClass'

    state: IState = {
        collapsed: false,
    }


    getRenderContent() {

        return (
            <Layout >
                <Sider className="global-layout-sider">
                    <div className="global-layout-sider-menu">
                        <MenuNavigation {...this.props} />
                    </div>
                </Sider>
                <Layout className="global-layout-main">
                    <Header className={`${styles.AdminPageHeader} global-layout-main-header `}>
                        <CrumbsNavigation  {...this.props}/>
                        <DropdownClass   {...this.props}/>
                    </Header>
                    
                    <Content className="global-layout-main-content">
                        <PageContentRouteCompent {...this.props}/>
                    </Content>
                </Layout>
            </Layout>
        )
    }

}

export default AdminPageClass