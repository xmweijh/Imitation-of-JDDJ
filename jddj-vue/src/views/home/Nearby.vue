<template>
  <div class="nearby">
    <h3 class="nearby__title">附近店铺</h3>
    <router-link v-for="item in nearbyList" :key="item._id" :to="`/shop/${item._id}`">
      <ShopInfo :item="item" />
    </router-link>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { get } from '../../utils/request'
import ShopInfo from '../../components/ShopInfo.vue'

const nearbyList = ref([])
const getNearbyList = async () => {
  const result = await get('/api/shop/hot-list')
  if (result?.errno === 0 && result?.data?.length) {
    nearbyList.value = result.data
  }
}
getNearbyList()

</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';

.nearby {
  &__title {
    margin: .16rem 0 .02rem 0;
    font-size: .18rem;
    font-weight: normal;
    color: $content-fontColor;
  }

  a {
    text-decoration: none;
  }
}
</style>
