import { IResponseListBase, IReuqestBase } from '../bases/HttpModel'
import { request } from '../bases/HttpInterceptors'
import {IAnchorInfo} from '../models/Anchor'



export class AnchorService{

    static anchorList=(data: IReuqestBase)=>{
        return request.post<IResponseListBase<IAnchorInfo>>('/anchorList', data)
    }



    static updateAnchorInfo=(data: IReuqestBase)=>{
        return request.post<IResponseListBase<IAnchorInfo>>('/updateAnchorInfo', data)
    }

    static getAnchorFansStatistics=(data: IReuqestBase)=>{
        return request.post<IResponseListBase<IAnchorInfo>>('/anchorFansStatistics', data)
    }


    

}