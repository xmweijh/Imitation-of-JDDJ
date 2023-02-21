/**
 * @description 订单数据测试
 * @author xmweijh
 */

const Order = require('../../models/Order')
const Product = require('../../models/Product')
const Address = require('../../models/Address')

!(async () => {
    // 模拟一个订单的创建过程

    const username = 'zhangsan'

    // 根据 addressId 获取地址信息
    const address = await Address.findById('63f4a2805e372842d843b537')

    // 商店信息
    const shopId = '63f4a622322469d92345a724'
    const shopName = '沃尔玛'

    // 订单的商品 id 和数量
    const products = [
        {
            id: '63f4a9302f0eaaef6f428f57',
            num: 6
        },
        {
            id: '63f4a952e75803ee259ce16a',
            num: 3
        }
    ]

    // 获取商品列表
    const pIds = products.map(p => p.id)
    const productList = await Product.find({
        // 条件1：商品 id
        _id: {
            $in: pIds
        },
        // 条件2：商店 id  其实id已经能确定 以防万一
        shopId,
    })

    // 给商品列表增加数量
    const productListWithSales = productList.map(p => {
        // 商品 id
        const id = p._id.toString()

        // 找到商品销量
        const filterProducts = products.filter(item => item.id === id)
        if (filterProducts.length === 0) {
            // 没有找到匹配的数量，报错
            throw new Error('未找到匹配的销量数据')
        }

        return {
            orderSales: filterProducts[0].num, // 销量
            product: p
        }
    })

    // 创建订单
    await Order.create({
        username,
        address,
        shopId,
        shopName,
        isCanceled: false, // 是否被取消，依赖于前端的传入
        products: productListWithSales
    })

    // 获取订单列表
    const orderList = await Order.find().sort({ _id: -1 }) // 逆序
    console.log('order list', orderList)
    console.log('order product 0', orderList[0].products[0])

})()
