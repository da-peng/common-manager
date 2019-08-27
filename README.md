# 技术栈

TypeScript （Ant Design）
Node React Redux Koa

# 目录说明

```
- client # 基于ant design 前端应用
- crewler-ws # 基于Koa 的WebSocket 服务
- server # 基于Koa 的API服务
```

# 前端截图

## 爬虫RoadMap
![mInY8S.png](https://s2.ax1x.com/2019/08/27/mInY8S.png)
![mInauj.png](https://s2.ax1x.com/2019/08/27/mInauj.png)
![mInBEq.png](https://s2.ax1x.com/2019/08/27/mInBEq.png)
## 热门主播信息
![mInNvQ.png](https://s2.ax1x.com/2019/08/27/mInNvQ.png)
![mIndDs.png](https://s2.ax1x.com/2019/08/27/mIndDs.png)
## 时序图标
![mIntgg.png](https://s2.ax1x.com/2019/08/27/mIntgg.png)


# 爬虫定时任务

```
[
  {
    task: 'RankWeekCrewler',
    type: [
      'global',
      'dance',
      'game',
      'etc',
      'live',
      'fashion'
    ],
    time: [
      '0 0 10 * * *',
      '0 30 10 * * *',
      '0 0 11 * * *',
      '0 30 11 * * *',
      '0 0 12 * * *',
      '0 30 12 * * *'
    ]
  },
  {
    task: 'SpaceVideoWeekCrewler',
    time: '0 0 13 * * *'
  },
  {
    task: 'SpaceChannelAndTagsMouthCrewler',
    time: '0 30 14 * * *'
  },
  {
    task: 'AnchorFansWeekCrewler',
    time: '0 0 15 * * *'
  }
]

```
