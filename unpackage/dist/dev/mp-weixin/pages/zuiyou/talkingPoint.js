"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "talkingPoint",
  setup(__props) {
    const tab = ["推荐", "生活情感", "校园", "时尚", "兴趣"];
    const tabIndex = common_vendor.ref(0);
    const selectTab = (item, index) => {
      tabIndex.value = index;
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(tab, (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: index,
            c: common_vendor.n(tabIndex.value === index ? "nav-active" : ""),
            d: common_vendor.n(index + 1 >= 0 && tabIndex.value === index + 1 ? "pre-active" : ""),
            e: common_vendor.n(index + 1 >= 0 && tabIndex.value === index - 1 ? "next-active" : ""),
            f: common_vendor.o(($event) => selectTab(item, index), index)
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/uniapp/vue3uniapp/pages/zuiyou/talkingPoint.vue"]]);
wx.createPage(MiniProgramPage);
