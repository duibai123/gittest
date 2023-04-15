"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_helpers_storage = require("../../utils/helpers/storage.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    common_vendor.ref("最右传话筒");
    const labelData = ["故事分享", "生活趣事"];
    const contentData = common_vendor.reactive({
      title: "",
      imgData: "",
      label: ""
    });
    const userInfo = utils_helpers_storage.getStorage("userInfo");
    console.log(userInfo);
    const uploadImg = () => {
      common_vendor.index.chooseImage({
        count: 1,
        //默认9
        sizeType: ["original", "compressed"],
        //可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album"],
        //从相册选择
        success: function(res2) {
          console.log(JSON.stringify(res2.tempFilePaths), "上传了图片");
          contentData.imgData = res2.tempFilePaths;
        }
      });
    };
    const publish = () => {
      common_vendor.index.showLoading({
        title: "发布中"
      });
      common_vendor.index.request({
        method: "POST",
        url: "http://localhost:3000/posts",
        //仅为示例，并非真实接口地址。
        header: {
          "Content-Type": "application/json"
        },
        data: {
          title: contentData.title,
          imgData: contentData.imgData,
          label: contentData.label,
          userId: userInfo.id,
          like: [],
          avatarUrl: userInfo.avatarUrl,
          userName: userInfo.userName
        },
        success: (res2) => {
          console.log(res2.data);
          contentData.title = "";
          contentData.imgData;
          contentData.label;
          common_vendor.index.hideLoading();
          common_vendor.index.switchTab({
            url: "/pages/zuiyou/index"
          });
        },
        fail(err) {
          console.log(res.data);
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(publish),
        b: contentData.label,
        c: common_vendor.o(($event) => contentData.label = $event.detail.value),
        d: common_vendor.f(labelData, (item, k0, i0) => {
          return {
            a: common_vendor.t(item)
          };
        }),
        e: contentData.title,
        f: common_vendor.o(($event) => contentData.title = $event.detail.value),
        g: common_vendor.f(contentData.imgData, (item, index, i0) => {
          return {
            a: item
          };
        }),
        h: common_vendor.o(uploadImg)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/uniapp/vue3uniapp/pages/post/index.vue"]]);
wx.createPage(MiniProgramPage);
