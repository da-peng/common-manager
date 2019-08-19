执行顺序
1. RankWeekCrewler （每周1，3，7） 分类排行榜Top100名的Up主播及视频信息
2. SpaceChannelAndTagsCrewler (每月) Up主，空间的频道和标签及 对应的视频数量
3. SpaceVideoWeekCrewler (每周) Up主 空间下的视频
4. AnchorFansWeekCrewler (每周1,3,7) up主播的 粉丝数， 关注数，播放数

WS服务
数据传输格式
1. RankWeekCrewler
{
task:'RankWeekCrewler',
		ops:{
			isheadless:true,
			type:'global'
		}
}

2. SpaceVideoWeekCrewler
```
{
task:'SpaceVideoWeekCrewler',
		ops:{
			isheadless:true,
		}
}
```
3. SpaceChannelAndTagsMouthCrewler 
```
{
task:'SpaceChannelAndTagsMouthCrewler',
		ops:{
			isheadless:true,
		}
}
```
4. AnchorFansWeekCrewler

```
{
task:'AnchorFansWeekCrewler',
		ops:{
			isheadless:true,
			type:'global'
		}
}
```
