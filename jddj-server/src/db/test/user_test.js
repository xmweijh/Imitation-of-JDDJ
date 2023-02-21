/**
 * @description 用户数据测试
 * @author xmweijh
 */

const User = require('../../models/User')

!(async() => {
    // // 创建一个用户
    // await User.create({
    //     username: '13511111111',
    //     password: '123456'
    // })

    const zhangsan = await User.findOne({
        username:'zhangsan',
        password: '123456'
    })
    console.log(zhangsan)
    // // 创建一个用户
    // const u2 = new User({
    //     username: 'lisi',
    //     password: '123'
    // })
    // u2.save() // 保存到数据库

    // 获取用户列表
    // const userList = await User.find()
    // console.log('userList', userList)

    // 获取单个用户
    // const zhangsan = await User.findOne({ username: 'zhangsan', password: '123' })
    // console.log('zhangsan', zhangsan)
})()
