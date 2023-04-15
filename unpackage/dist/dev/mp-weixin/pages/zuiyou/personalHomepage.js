"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_helpers_storage = require("../../utils/helpers/storage.js");
const _sfc_main = {
  __name: "personalHomepage",
  setup(__props) {
    const tabIndex = common_vendor.ref(1);
    const tabsIndex = common_vendor.ref(0);
    const infoData = common_vendor.reactive({
      userName: "诸葛思慧",
      gender: "women",
      day: "1544",
      describe: "视频均源自网络，只为传播更多开心 | 暖心正能量！",
      province: "福建",
      label: ["美食家", "熬夜刷帖老抽子", "不出门不洗头", "盆友圈健身狂"],
      praise: "2370.9w",
      interest: "4",
      fans: "63606",
      invitationNum: "99+",
      commentNum: "99+",
      trendsNum: "2",
      labels: "诸葛思慧.正能量 >",
      content: "视频均源自网络，只为传播更多",
      img: "https://img0.baidu.com/it/u=3007048469,3759326707&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500"
    });
    const tabData = [
      {
        name: "主页",
        num: ""
      },
      {
        name: "帖子",
        num: "99+"
      },
      {
        name: "评论",
        num: "99+"
      },
      {
        name: "动态",
        num: "5"
      }
    ];
    const tabsData = ["全部帖子", "原创帖子"];
    const selectTab = (item, index) => {
      console.log("点击tab栏");
      tabIndex.value = index;
    };
    const selectTabs = (item, index) => {
      tabsIndex.value = index;
    };
    const getInfo = utils_helpers_storage.getStorage("userInfo");
    console.log("getInfo", getInfo);
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(infoData.userName),
        b: infoData.gender === "women"
      }, infoData.gender === "women" ? {} : {}, {
        c: common_vendor.t(infoData.day),
        d: common_vendor.t(infoData.describe),
        e: common_vendor.t(infoData.province),
        f: common_vendor.f(infoData.label, (item, k0, i0) => {
          return {
            a: common_vendor.t(item)
          };
        }),
        g: common_vendor.t(infoData.praise),
        h: common_vendor.t(infoData.interest),
        i: common_vendor.t(infoData.fans),
        j: common_vendor.f(tabData, (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.n(tabIndex.value === index ? "tab-active" : ""),
            c: common_vendor.n(tabIndex.value === index ? "background-active" : ""),
            d: common_vendor.t(item.num),
            e: index,
            f: common_vendor.o(($event) => selectTab(item, index), index)
          };
        }),
        k: common_vendor.t(infoData.labels),
        l: common_vendor.f(tabsData, (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: common_vendor.n(tabsIndex.value == index ? "tabs-active" : ""),
            c: common_vendor.n(index === 1 ? "next" : ""),
            d: common_vendor.o(($event) => selectTabs(item, index))
          };
        }),
        m: common_vendor.t(infoData.userName),
        n: common_vendor.t(infoData.content),
        o: infoData.img,
        p: common_vendor.t(infoData.labels),
        q: common_vendor.o((...args) => _ctx.toDeatail && _ctx.toDeatail(...args))
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/uniapp/vue3uniapp/pages/zuiyou/personalHomepage.vue"]]);
wx.createPage(MiniProgramPage);
