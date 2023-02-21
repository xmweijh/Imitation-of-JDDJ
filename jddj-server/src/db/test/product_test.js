/**
 * @description 商品数据测试
 * @author xmweijh
 */

const Product = require('../../models/Product')

!(async () => {
    const friutList = await Product.find({shopId:'63f4a622322469d92345a724', tabs:{ $in:"seckill"}})
    console.log(friutList)
}
)()
