<template>
  <div class="wrapper">
    <div class="title">我的订单</div>
    <div class="orders">
      <div class="order" v-for="(item, index) in data.list" :key="index">
        <div class="order__title">
          {{ item.shopName }}
          <span class="order__status">
            {{ item.isCanceled ? '已取消' : '已下单' }}
          </span>
        </div>
        <div class="order__content">
          <div class="order__content__imgs">
            <template v-for="(innerItem, innerIndex) in item.products" :key="innerIndex">
              <img v-if="innerIndex <= 3" class="order__content__img" :src="'http://localhost:3000'+innerItem.product.imgUrl" />
            </template>
          </div>
          <div class="order__content__info">
            <div class="order__content__price">¥ {{ item.totalPrice }}</div>
            <div class="order__content__count">共 {{ item.totalNum }} 件</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Docker :currentIndex="2" />
</template>

<script setup>
import { reactive } from 'vue'
import { get } from '../../utils/request'
import Docker from '../../components/Docker'
import { useRouter } from 'vue-router'

const router = useRouter()
// 处理订单列表逻辑
const data = reactive({ list: [] })
const getOrderList = async () => {
  const result = await get('/api/order')
  if (result?.errno === 0 && result?.data?.length) {
    const orderList = result.data || []
    orderList.forEach((order) => {
      order.totalPrice = 0
      order.totalNum = 0
      ;(order.products || []).forEach((item) => {
        order.totalPrice += (item?.product?.price || 0) * (item?.orderSales || 0)
        order.totalNum += (item?.orderSales || 0)
      })
    })
    data.list = orderList
  } else if (result?.errno === -1) {
    localStorage.removeItem('isLogin')
    router.replace({ name: 'Login' })
  }
}
getOrderList()

</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';

.wrapper {
  overflow-y: auto;
  position: absolute;
  left: 0;
  top: 0;
  bottom: .5rem;
  right: 0;
  background: rgb(248, 248, 248);
}

.title {
  line-height: .44rem;
  background: $bgColor;
  font-size: .16rem;
  color: $content-fontColor;
  text-align: center;
}

.order {
  margin: .16rem .18rem;
  padding: .16rem;
  background: $bgColor;

  &__title {
    margin-bottom: .16rem;
    line-height: .22rem;
    font-size: .16rem;
    color: $content-fontColor;
  }

  &__status {
    float: right;
    font-size: .14rem;
    color: $light-fontColor;
  }

  &__content {
    display: flex;

    &__imgs {
      flex: 1;
    }

    &__img {
      width: .4rem;
      height: .4rem;
      margin-right: .12rem;
    }

    &__info {
      width: .7rem;
    }

    &__price {
      margin-bottom: .04rem;
      line-height: .2rem;
      font-size: .14rem;
      color: $hightlight-fontColor;
      text-align: right;
    }

    &__count {
      line-height: .14rem;
      font-size: .12rem;
      color: $content-fontColor;
      text-align: right;
    }
  }
}
</style>
