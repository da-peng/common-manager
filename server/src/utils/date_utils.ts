
export class DateUtil{

    static diff(tagetTime:Date, currentTime:Date){
        let currTime = currentTime.getTime()
        let tagTime = tagetTime.getTime()
        let cTime:number
        if (currTime>tagTime){
            cTime = currTime- tagTime
        }else{
            cTime = tagTime-currTime
        }

        var min=cTime/1000;
		var second=min/60;
		var hour=second/60;
		var day=hour/24;
        return day
    }
}