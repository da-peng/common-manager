import {notification} from 'antd'
import { ArgsProps } from 'antd/lib/notification';


interface IProps extends ArgsProps {
    noticeType: string

}

export const  notice = (P:IProps)=>{
    
    if(P.noticeType === 'error'){
        delete P['noticeType']
        notification.error({
            ...P,
        })
    }else if(P.noticeType === 'success'){
        delete P['noticeType']
        notification.success({
            ...P,
        })
    }else if(P.noticeType === 'info'){
        delete P['noticeType']
        notification.info({
            ...P,
        })
    }else if(P.noticeType === 'warn'){
        delete P['noticeType']
        notification.warn({
            ...P,
        })
    }
   
}
