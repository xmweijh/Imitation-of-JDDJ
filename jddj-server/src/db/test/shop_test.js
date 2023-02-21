/**
 * @description 商店数据测试
 * @author xmweijh
 */

const Shop = require('../../models/Shop')

!(async () => {
    // await Shop.create({
    //     name: '好又多超市',
    //     imgUrl: '/images/shop/wmt.jpeg',
    //     sales: 666, // 月售
    //     expressLimit: 100, // 起送价格
    //     expressPrice: 5, // 配送费
    //     slogan: 'VIP满80免运费'
    // })
    const shopList = await Shop.find().sort({sales: -1}).limit(2)
    console.log(shopList)
}
)()
