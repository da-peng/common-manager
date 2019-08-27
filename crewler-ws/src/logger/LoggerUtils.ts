import { getLogger } from 'log4js';
const logger = getLogger('app');

export class LoggerUtils{

    crewlerTransform:any
    constructor(crewlerTransform:any){
        this.crewlerTransform = crewlerTransform
    }

    info(dataOrMsg:any){
        logger.info(dataOrMsg)

        this.crewlerTransform.write(`${new Date()}:\n${JSON.stringify(dataOrMsg)}`)
    }
}