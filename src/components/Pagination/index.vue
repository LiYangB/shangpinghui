<template>
  <div class="pagination">
    <button :disabled="pageNo==1" @click="$emit('getPageNo',pageNo-1)">上一页</button>
    <button v-if="startAndEnd.start > 1" @click="$emit('getPageNo',1)" :class="{active:pageNo==1}">1</button>
    <button v-if="startAndEnd.start > 2">···</button>

    <button
      v-for="(page, index) in startAndEnd.end"
      :key="index"
      v-show="page >= startAndEnd.start"
      @click="$emit('getPageNo',page)"
      :class="{active:pageNo==page}"
    >
      {{ page }}
    </button>

    <button v-if="startAndEnd.end < totalPage - 1" >···</button>
    <button v-if="startAndEnd.end < totalPage" @click="$emit('getPageNo',totalPage)" :class="{active:pageNo==totalPage}">{{ totalPage }}</button>
    <button :disabled="pageNo==totalPage" @click="$emit('getPageNo',pageNo+1)">下一页</button>

    <button style="margin-left: 30px">共{{ total }}条</button>
  </div>
</template>




<script>
export default {
  name: "PaginationName",
  // 1:分页器组件需要知道我一共展示多少条数据 ----total【100条数据】
  // 2:每一个需要展示几条数据------pageSize【每一页3条数据】
  // 3:需要知道当前在第几页-------pageNo[当前在第几页]
  // 4:需要知道连续页码数------continues
  props: ["total", "pageSize", "pageNo", "continues"],
  computed: {
    // 计算总共多少页
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    // 计算连续的页码起始原结束
    startAndEnd() {
      let start = 0;
      let end = 0;
      // 总页数不够连续页码
      if (this.continues > this.totalPage) {
        start = 1;
        end = this.totalPage;
      } else {
        // 正常现象
        start = this.pageNo - Math.floor(this.continues / 2);
        end = this.pageNo + Math.floor(this.continues / 2);
        // start小于1
        if (start < 1) {
          start = 1;
          end = this.continues;
        }
        // end大于总页数
        if (end > this.totalPage) {
          end = this.totalPage;
          start = this.totalPage - this.continues + 1;
        }
      }
      return { start, end };
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>