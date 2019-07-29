import Mock from'mockjs';
// 开发环境 start 设置 mock js
// 使用 Mock
// Mock.mock( rurl, rtype, template )
// eslint-disable-next-line no-useless-escape
let tokenInfo =   {
    'statusCode': '20000',
    'statusMessage': '请求成功',
    'responseContent': {
        'token|+1':'123'
    }
}

const url = '/auth/login';
Mock.mock(RegExp(url + ".*"),'post',{...tokenInfo})

// 输出结果
// console.log(JSON.stringify(data, null, 4))