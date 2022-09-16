<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveCurrent" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <transition name="sort">
          <div class="sort" v-if="show">
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item"
                v-for="(c1, index) in categroyList"
                :key="c1.categoryId"
                :class="{ cur: currentIndex == index }"
              >
                <h3 @mouseenter="changeIndex(index)">
                  <a
                    :data-categoryname="c1.categoryName"
                    :data-category1id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <div
                  class="item-list clearfix"
                  :style="{ display: currentIndex == index ? 'block' : 'none' }"
                >
                  <div
                    class="subitem"
                    v-for="c2 in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryname="c2.categoryName"
                          :data-category2id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a
                            :data-categoryname="c3.categoryName"
                            :data-category3id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// 完整引入lodash
// import _ from "lodash"
// 按需引入lodash
import throttle from "lodash/throttle";

export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: -1,
      // 控制三级联动展示
      show: true,
    };
  },
  methods: {
    // 正常函数
    // changeIndex(index) {
    //   this.currentIndex = index;
    // },
    // 对函数进行节流
    changeIndex: throttle(function (index) {
      this.currentIndex = index;
    }, 50),

    leaveCurrent() {
      this.currentIndex = -1;
      if (this.$route.name == "search"||this.$route.name =="detail") {
        this.show = false;
      }
    },
    // 控制鼠标移入展示
    enterShow() {
      this.show = true;
    },
    // 编程式路由导航跳转
    goSearch(e) {
      // 获取触发此函数的对象(节点)
      let el = e.target;
      // 该节点存在dataset属性,可以获取该节点的自定义属性与属性值
      let { categoryname, category1id, category2id, category3id } = el.dataset;
      // 如果存在categoryname属性及为a标签
      if (categoryname) {
        // 创建跳转对象
        let location = { name: "search" };
        // 创建query对象
        let query = { categoryName: categoryname };
        // 确定在一级
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }
        // 完善对象
        location.query = query;
        // 编程式路由
        if (Object.entries(this.$route.params).length !== 0) {
          location.params = this.$route.params;
          this.$router.push(location);
        } else {
          this.$router.push(location);
        }
      }
    },
  },
  mounted() {
    if (this.$route.name != "home") {
      this.show = false;
    }
  },
  computed: {
    // 获取三级联动数据
    ...mapState({
      categroyList: (state) => state.Home.categroyList,
    }),
  },
};
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 27px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 800px;
              // height: 50px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 20px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  // width: 415px;
                  width: 550px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //   .item-list {
          //     display: block;
          //     // opacity: 1;
          //   }
          // }
        }
        .cur {
          background: skyblue;
        }
      }
    }
    .sort-enter,
    .sort-leave-to {
      opacity: 0;
    }
    .sort-enter-to,
    .sort-leave {
      opacity: 1;
    }
    .sort-enter-active,
    .sort-leave-active {
      transition: all 0.5s linear;
    }
  }
}
</style>