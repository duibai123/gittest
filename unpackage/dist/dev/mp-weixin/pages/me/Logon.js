"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "Logon",
  setup(__props) {
    const userData = common_vendor.reactive({
      account: "",
      password: "",
      passwords: ""
    });
    const signUp = async () => {
      if (userData.password != userData.passwords) {
        common_vendor.index.showToast({
          title: "两次输入密码不相同",
          duration: 2e3
        });
        return;
      }
      const infoRes = await common_vendor.index.getUserProfile({
        desc: "weixin"
      });
      console.log("数据", userData.account);
      common_vendor.index.request({
        method: "POST",
        url: "http://localhost:3000/users",
        //仅为示例，并非真实接口地址。
        header: {
          "Content-Type": "application/json"
        },
        data: {
          account: userData.account,
          password: userData.password,
          userName: infoRes.userInfo.nickName,
          avatarUrl: infoRes.userInfo.avatarUrl
        },
        success: (res2) => {
          console.log(res2.data);
          common_vendor.index.navigateBack({
            delta: 1
          });
        },
        fail(err) {
          console.log(res.data);
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: userData.account,
        b: common_vendor.o(($event) => userData.account = $event.detail.value),
        c: userData.password,
        d: common_vendor.o(($event) => userData.password = $event.detail.value),
        e: userData.passwords,
        f: common_vendor.o(($event) => userData.passwords = $event.detail.value),
        g: common_vendor.o(signUp)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/uniapp/vue3uniapp/pages/me/Logon.vue"]]);
wx.createPage(MiniProgramPage);
