<template>
  <div class="position">
    <span class="iconfont position__icon icon-wxbdingwei"></span>
    重庆邮电大学二组团七栋
    <span class="iconfont position_notice icon-xiaoxi"></span>
  </div>
  <div class="search">
    <span class="iconfont icon-sousuo"></span>
    <input type="text" class="search__input" placeholder="搜索附近的商家、商店">
  </div>
  <div class="banner">
    <img
      class="banner__img"
      src="http://www.dell-lee.com/imgs/vue3/banner.jpg"
    />
  </div>
  <div class="icons">
    <div
      class="icons__item"
      v-for="item in iconsList"
      :key="item.desc"
    >
      <img
        class="icons__item__img"
        :src="`http://www.dell-lee.com/imgs/vue3/${item.imgName}.png`"
      />
      <p class="icons__item__desc">{{item.desc}}</p>
    </div>
  </div>
  <div class="gap"></div>
</template>

<script setup>
const iconsList = [
  { imgName: '超市', desc: '超市便利' },
  { imgName: '菜市场', desc: '菜市场' },
  { imgName: '水果店', desc: '水果店' },
  { imgName: '鲜花', desc: '鲜花绿植' },
  { imgName: '医药健康', desc: '医药健康' },
  { imgName: '家居', desc: '家居时尚' },
  { imgName: '蛋糕', desc: '烘培蛋糕' },
  { imgName: '签到', desc: '签到' },
  { imgName: '大牌免运', desc: '大牌免运' },
  { imgName: '红包', desc: '红包套餐' }
]
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';
.position {
  position: relative;
  padding: .16rem .24rem .16rem 0;
  line-height: .22rem;
  font-size: .16rem;
  @include ellipsis;
  .position__icon {
    position: relative;
    top: .01rem;
    font-size: .2rem;
  }
  .position_notice {
    position: absolute;
    right: 0;
    top: .17rem;
    font-size: .2rem;
  }
  color: $content-fontColor;
}
.search {
  margin-bottom: .12rem;
  line-height: .32rem;
  background: $search-bgColor;
  color: $search-fontColor;
  border-radius: .16rem;
  .iconfont {
    display: inline-block;
    padding: 0 .08rem 0 .16rem;
    font-size: .16rem;
  }
  &__input {
    border:none;
    width: 80%;
    outline: none;
    background-color: transparent;
    font-size: .14rem;
  }
}

.banner {
  height: 0;
  overflow: hidden;
  padding-bottom: 25.4%;  // 防止抖动 预留给图片
  &__img {
    width: 100%;
  }
}
.icons {
  display: flex;
  flex-wrap: wrap;
  margin-top: .16rem;
  &__item {
    width: 20%;
    &__img {
      display:block;
      width: .4rem;
      height: .4rem;
      margin: 0 auto;
    }
    &__desc {
      margin: .06rem 0 .16rem 0;
      text-align: center;
      color: $content-fontColor;
    }
  }
}
.gap {
  margin: 0 -.18rem;
  height: .1rem;
  background: $content-bgColor;
}
</style>
