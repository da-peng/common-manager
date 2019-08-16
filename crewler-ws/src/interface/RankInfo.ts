export interface RankItemInfo {
    nickname:string
    num:number
    authorLink:string
    detail:VideoDetail
}

export interface VideoDetail {
    like?:number/**点赞 */
    coin?:number/**金币数 */
    collect?:number/**收藏数 */
    danmu?:number/**弹幕数 */
    title:string/**视频名称 */
    videoLink:string/**视频链接 */
    play:number/** 播放数*/
    view:number/** 观看数 */
    tags?:string/**UP打的视频标签 */
    pts?:number /**上排行榜的综合评分 */
    videoCreateTime?:Date /**视频创建时间 */
}