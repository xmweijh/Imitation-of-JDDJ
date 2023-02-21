/**
 * @description 地址数据测试
 * @author xmweijh
 */

const Address = require('../../models/Address')

!(async () => {
    // await Address.create({
    //     username: 'zhangsan',  // 与用户关联
    //     city: '重庆',
    //     department: '江南水岸小区',
    //     houseNumber: '123',
    //     name: '张三',
    //     phone: '18677778888'
    // })
    // const address = await Address.find({ username: 'zhangsan'}).sort({updatedAt: -1})
    const address = await Address.findOneAndUpdate({_id: '63f4a24a644a628f45496635', username:'zhangsan'},{
        department: '天赋小区',
        houseNumber: '1243',
        name: '李四',
    }, {
        new:true  // 返回更新后的数据，默认返回更新前的数据
    })
    console.log(address)
})()
