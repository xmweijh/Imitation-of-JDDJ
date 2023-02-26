/**
 * @description 商品数据测试
 * @author xmweijh
 */

const { Product } = require('../../models/index')

!(async () => {
    // // 创建
    const p1 = new Product({
        shopId: '63f4a622322469d92345a724', // 沃尔玛
        name: '西瓜',
        imgUrl: '/images/product/watermelon.jpg',
        sales: 100, // 月售多少
        price: 1.99, // 当前价格
        oldPrice: 2.5, // 原价
        tabs: ['all', 'fruit']
    })
    p1.save()

    // 获取商品列表，根据 shopId
    // const pList = await Product.find({ shopId: '63f4a622322469d92345a724' })
    // const pList = await Product.find({
    //     shopId: '63f4a622322469d92345a724',
    //     tabs: {
    //         $in: 'all' // 匹配 tabs
    //     }
    // })
    // console.log('product list', pList)
})()
