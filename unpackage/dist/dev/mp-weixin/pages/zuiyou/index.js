"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_helpers_storage = require("../../utils/helpers/storage.js");
if (!Array) {
  const _component_van_dialog = common_vendor.resolveComponent("van-dialog");
  _component_van_dialog();
}
if (!Math) {
  actionBar();
}
const actionBar = () => "../components/actionBar.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const navIndex = common_vendor.ref(0);
    const show = common_vendor.ref(false);
    const arr = ["关注", "推荐", "视频", "图文"];
    const postList = common_vendor.ref([]);
    const selectNav = (item, index) => {
      console.log("选择了", item);
      navIndex.value = index;
    };
    const toTalk = () => {
      common_vendor.index.navigateTo({
        url: "./talkingPoint"
      });
    };
    const toDeatail = (obj) => {
      console.log("跳转不了");
      common_vendor.index.navigateTo({
        url: `./detail?id=${obj.id}`
      });
    };
    const toHomePage = () => {
      common_vendor.index.navigateTo({
        url: "./personalHomepage"
      });
    };
    const open = () => {
      show.value = true;
    };
    const formatData = (post) => {
      console.log(";重新请求页面111");
      return {
        ...post,
        isLike: post.like.includes(userInfo.value.id)
      };
    };
    const getListData = () => {
      console.log("111111");
      common_vendor.index.request({
        method: "GET",
        url: "http://localhost:3000/posts",
        //仅为示例，并非真实接口地址。
        header: {
          "Content-Type": "application/json"
        },
        data: {},
        success: (res2) => {
          postList.value = res2.data.map((item, index) => formatData(item));
          console.log(postList.value);
        },
        fail(err) {
          console.log(res.data);
        }
      });
    };
    const addLike = (obj) => {
      console.log("点击了点赞", obj);
      const likeIndex = obj.like.indexOf(userInfo.value.id);
      let newLike = obj.like;
      if (likeIndex !== -1) {
        newLike.splice(likeIndex, 1);
      } else {
        newLike.push(userInfo.value.id);
      }
      console.log(newLike);
      common_vendor.index.request({
        method: "PATCH",
        url: `http://localhost:3000/posts/${obj.id}`,
        header: {
          "Content-Type": "application/json"
        },
        data: {
          like: newLike
        },
        success: (res2) => {
          console.log(res2.data);
          postList.value[obj.index] = formatData(res2.data);
        },
        fail: (err) => {
          console.log(res.data);
        }
      });
    };
    const userInfo = common_vendor.ref(utils_helpers_storage.getStorage("userInfo"));
    common_vendor.onShow(() => {
      userInfo.value = utils_helpers_storage.getStorage("userInfo");
      getListData();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(toTalk),
        b: common_vendor.f(arr, (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: index,
            c: common_vendor.n(navIndex.value === index ? "nav-active" : ""),
            d: common_vendor.o(($event) => selectNav(item, index), index)
          };
        }),
        c: common_vendor.f(postList.value, (item, index, i0) => {
          return {
            a: item.avatarUrl,
            b: common_vendor.t(item.userName),
            c: common_vendor.t(item.title),
            d: item.imgData[0],
            e: common_vendor.t(item.label),
            f: item.id,
            g: "45796d0e-0-" + i0,
            h: common_vendor.p({
              likeNum: item.like.length,
              isLike: item.isLike,
              like: item.like,
              id: item.id,
              index
            })
          };
        }),
        d: common_vendor.o(toHomePage),
        e: common_vendor.o(open),
        f: common_vendor.o(addLike),
        g: common_vendor.o(toDeatail),
        h: common_vendor.o(($event) => show.value = $event),
        i: common_vendor.p({
          title: "标题",
          showCancelButton: true,
          show: show.value
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/uniapp/vue3uniapp/pages/zuiyou/index.vue"]]);
wx.createPage(MiniProgramPage);
