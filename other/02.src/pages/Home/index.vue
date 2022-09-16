<template>
  <div>
    <!-- 三级联动组件 -->
    <TypeNav></TypeNav>
    <!-- 列表 -->
    <ListContainer></ListContainer>
    <!-- 今日推荐 -->
    <Recommed></Recommed>
    <!-- 商品排行 -->
    <Rank></Rank>
    <!-- 猜你喜欢 -->
    <Like></Like>
    <!-- 楼层 -->
    <Floor></Floor>
    <Floor></Floor>
    <!-- 商标 -->
    <Brand></Brand>
  </div>
</template>

<script>
import ListContainer from '@/pages/Home/ListContainer/index.vue';
import Recommed from "@/pages/Home/Recommed/index.vue"
import Rank from "@/pages/Home/Rank/index.vue"
import Like from '@/pages/Home/Like/index.vue';
import Floor from '@/pages/Home/Floor/index.vue';
import Brand from '@/pages/Home/Brand/index.vue';


export default {
    name: "homeIndex",
    components: {
    ListContainer,
    Recommed,
    Rank,
    Like,
    Floor,
    Brand
}
}
</script>

<style>

</style>