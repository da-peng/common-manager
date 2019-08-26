//重试方法
export const  retry = (fn:Function, times:number, delay:number)=> {
    let err = null;
    return new Promise((resolve, reject)=> {
      let attempt = ()=> {
        fn().then(resolve).catch(function(err) {
          console.log(`Attempt #${times} failed`);
          if (0 == times) {
            reject(err);
          } else {
            times--;
            setTimeout(function(){
              attempt()
            }, delay);
          }
        });
      };
      attempt();
})
}
