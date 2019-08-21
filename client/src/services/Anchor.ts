import { IResponseListBase, IReuqestBase } from '../bases/HttpModel'
import { request } from '../bases/HttpInterceptors'
import {IAnchorInfo} from '../models/Anchor'



export class AnchorService{

    static anchorList=(params: IReuqestBase)=>{
        return request.post<IResponseListBase<IAnchorInfo>>('/login', params)
    }
}