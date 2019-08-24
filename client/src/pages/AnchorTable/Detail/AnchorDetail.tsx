import { IAbstractPageState, IAbstractPageProps, AbstractPage } from "../../../bases/AbstractPage";
import { RouteComponentProps } from "react-router";
import *  as React from 'react'
import { AnchorService } from "../../../services/Anchor";
import { Message } from "../../../utils/Message";
import { Row, Col } from "antd";
import { AnchorFansStatistics } from "../../../components/AnchorTable/Detail/AnchorFansStatistics";

interface IProps extends IAbstractPageProps, RouteComponentProps<any> {

}


interface IState extends IAbstractPageState {
    // anchorList: Array<IAnchorInfo>
}



class AnchorDetailPage extends  AbstractPage<IProps,IState>{
    
    displayName = 'AnchorDetail'
    state: IState={}

    getRenderContent(){
        return (
            // <Row gutter={24}>
            <Row >
                <Col >
                    <AnchorFansStatistics {...this.props}/>
                </Col>
                {/* <Col span ={4}>

                </Col> */}
            </Row>
        )
    }


}



export default AnchorDetailPage