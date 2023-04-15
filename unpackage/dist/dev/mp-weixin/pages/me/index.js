"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_helpers_storage = require("../../utils/helpers/storage.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const userData = common_vendor.reactive({
      account: "",
      password: "",
      passwords: ""
    });
    const userInfo = common_vendor.reactive({
      data: utils_helpers_storage.getStorage("userInfo")
    });
    const logon = () => {
      common_vendor.index.navigateTo({
        url: "./Logon"
      });
    };
    const getUserinfo = async () => {
      const infoRes = await common_vendor.index.getUserProfile({
        desc: "weixin"
      });
      console.log("infoRes", infoRes);
      signIn();
    };
    const signIn = (infoRes) => {
      console.log("调用了登录方法");
      common_vendor.index.request({
        method: "GET",
        url: "http://localhost:3000/users",
        //仅为示例，并非真实接口地址。
        header: {
          "Content-Type": "application/json"
        },
        data: {
          account: userData.account,
          password: userData.password
        },
        success: (res2) => {
          console.log(res2.data);
          if (res2.data.length) {
            utils_helpers_storage.setStorage("userInfo", {
              ...res2.data[0]
              // ...userInfo
            });
            console.log(res2.data);
            setTimeout(() => {
              userInfo.data = utils_helpers_storage.getStorage("userInfo");
              userData.account = "";
              userData.password = "";
            }, 100);
          } else {
            common_vendor.index.showToast({
              icon: "none",
              title: "账号密码不正确",
              duration: 2e3
            });
          }
        },
        fail: (err) => {
          console.log(res.data);
        }
      });
    };
    const signOut = () => {
      utils_helpers_storage.setStorage("userInfo", "");
      setTimeout(() => {
        userInfo.data = utils_helpers_storage.getStorage("userInfo");
      }, 200);
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: userInfo.data
      }, userInfo.data ? {
        b: userInfo.data.avatarUrl,
        c: common_vendor.t(userInfo.data.userName),
        d: common_vendor.o(signOut)
      } : {
        e: userData.account,
        f: common_vendor.o(($event) => userData.account = $event.detail.value),
        g: userData.password,
        h: common_vendor.o(($event) => userData.password = $event.detail.value),
        i: common_vendor.o(getUserinfo),
        j: common_vendor.o(logon)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/uniapp/vue3uniapp/pages/me/index.vue"]]);
wx.createPage(MiniProgramPage);
