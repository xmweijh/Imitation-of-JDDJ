<template>
  <div class="content">
    <div class="category">
      <div :class="{ 'category__item': true, 'category__item--active': currentTab === item.tab }"
        v-for="item in categories" :key="item.name" @click="() => handleTabClick(item.tab)">
        {{ item.name }}
      </div>
    </div>
    <div class="product">
      <div class="product__item" v-for="item in content.list" :key="item._id">
        <img class="product__item__img" :src="'http://localhost:3000' + item.imgUrl" />
        <div class="product__item__detail">
          <h4 class="product__item__title">{{ item.name }}</h4>
          <p class="product__item__sales">月售 {{ item.sales }} 件</p>
          <p class="product__item__price">
            <span class="product__item__yen">&yen;</span>{{ item.price }}
            <span class="product__item__origin">&yen;{{ item.oldPrice }}</span>
          </p>
        </div>
        <div class="product__number">
          <span class="product__number__minus iconfont icon-jianhao"
            @click="() => { changeCartItem(shopId, item._id, item, -1, shopName) }"></span>
          {{ getProductCartCount(shopId, item._id) }}
          <span class="product__number__plus iconfont icon-jiahao"
            @click="() => { changeCartItem(shopId, item._id, item, 1, shopName) }"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { get } from '../../utils/request'
import { useCommonCartEffect } from '../../effects/cartEffects'

defineProps(['shopName'])
const route = useRoute()
const currentTab = ref('all')
const shopId = route.params.id

const categories = [
  { name: '全部商品', tab: 'all' },
  { name: '秒杀', tab: 'seckill' },
  { name: '新鲜水果', tab: 'fruit' }
]

// Tab 切换相关的逻辑
const handleTabClick = (tab) => {
  currentTab.value = tab
}
// 列表内容相关的逻辑
const content = reactive({ list: [] })
const getContentData = async () => {
  const result = await get(`/api/shop/${shopId}/products`, {
    tab: currentTab.value
  })
  if (result?.errno === 0 && result?.data?.length) {
    content.list = result.data
  }
}
// 立即运行一个函数，同时响应式地追踪其依赖，并在依赖更改时重新执行。
watchEffect(() => { getContentData() })

// 购物车相关逻辑
const store = useStore()
const { cartList, changeCartItemInfo } = useCommonCartEffect()
const changeShopName = (shopId, shopName) => {
  store.commit('changeShopName', { shopId, shopName })
}
const changeCartItem = (shopId, productId, item, num, shopName) => {
  changeCartItemInfo(shopId, productId, item, num)
  changeShopName(shopId, shopName)
}
const getProductCartCount = (shopId, productId) => {
  return cartList?.[shopId]?.productList?.[productId]?.count || 0
}

</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';

.content {
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  top: 1.5rem;
  bottom: .5rem;
}

.category {
  overflow-y: scroll;
  height: 100%;
  width: .76rem;
  background: $search-bgColor;

  &__item {
    line-height: .4rem;
    text-align: center;
    font-size: .14rem;
    color: #333;

    &--active {
      background: $bgColor;
    }
  }
}

.product {
  overflow-y: scroll;
  flex: 1;

  &__item {
    position: relative;
    display: flex;
    padding: .12rem 0;
    margin: 0 .16rem;
    border-bottom: .01rem solid $content-bgColor;

    &__detail {
      overflow: hidden;
    }

    &__img {
      width: .68rem;
      height: .68rem;
      margin-right: .16rem;
    }

    &__title {
      margin: 0;
      line-height: .2rem;
      font-size: .14rem;
      color: $content-fontColor;
      @include ellipsis;
    }

    &__sales {
      margin: .06rem 0;
      font-size: .12rem;
      color: $content-fontColor;
    }

    &__price {
      margin: 0;
      line-height: .2rem;
      font-size: .14rem;
      color: $hightlight-fontColor;
    }

    &__yen {
      font-size: .12rem;
    }

    &__origin {
      margin-left: .06rem;
      line-height: .2rem;
      font-size: .12rem;
      color: $light-fontColor;
      text-decoration: line-through;
    }

    .product__number {
      position: absolute;
      right: 0;
      bottom: .12rem;
      line-height: .18rem;

      &__minus {
        position: relative;
        top: .02rem;
        color: $medium-fontColor;
        margin-right: .05rem;
      }

      &__plus {
        position: relative;
        top: .02rem;
        color: $btn-bgColor;
        margin-left: .05rem;
      }
    }
  }

}
</style>
