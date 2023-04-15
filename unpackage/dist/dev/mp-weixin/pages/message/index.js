"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const topTab = ["提醒", "私信"];
    const topTabIndex = common_vendor.ref(0);
    common_vendor.ref("@是索隆男友");
    const secondTab = [
      {
        img: "../../static/002.png",
        name: "小右通知"
      },
      {
        img: "../../static/003.png",
        name: "收到的@"
      },
      {
        img: "../../static/004.png",
        name: "粉丝/好友"
      }
    ];
    const commentList = common_vendor.ref([]);
    const selectTopTab = (item, index) => {
      topTabIndex.value = index;
    };
    const getComment = (id) => {
      common_vendor.index.request({
        method: "GET",
        url: "http://localhost:3000/comments",
        //仅为示例，并非真实接口地址。
        header: {
          "Content-Type": "application/json"
        },
        data: {},
        success: (res2) => {
          console.log(res2.data);
          commentList.value = res2.data;
        },
        fail(err) {
          console.log(res.data);
        }
      });
    };
    common_vendor.onLoad((option) => {
      getComment();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(topTab, (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: common_vendor.n(topTabIndex.value === index ? "toptab-active" : ""),
            c: common_vendor.n(topTabIndex.value === index ? "topbackgrund-active" : ""),
            d: index,
            e: common_vendor.o(($event) => selectTopTab(item, index), index)
          };
        }),
        b: common_vendor.f(secondTab, (item, index, i0) => {
          return {
            a: item.img,
            b: common_vendor.t(item.name)
          };
        }),
        c: common_vendor.f(commentList.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.user.name),
            b: common_vendor.t(item.like.length),
            c: common_vendor.t(item.content)
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/uniapp/vue3uniapp/pages/message/index.vue"]]);
wx.createPage(MiniProgramPage);
