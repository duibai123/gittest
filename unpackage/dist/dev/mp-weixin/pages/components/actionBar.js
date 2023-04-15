"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "actionBar",
  props: {
    likeNum: {
      type: Number,
      default: 0
    },
    isLike: {
      type: Boolean,
      default: ""
    },
    like: {
      type: Array,
      default: []
    },
    id: {
      type: String,
      default: ""
    },
    index: {
      type: Number,
      default: 0
    },
    userName: {
      type: String,
      default: ""
    },
    commentNum: {
      type: Number,
      default: 0
    }
  },
  emits: ["addLike", "toDeatail"],
  setup(__props, { emit }) {
    const props = __props;
    const addLike = () => {
      emit("addLike", {
        like: props.like,
        id: props.id,
        index: props.index
      });
    };
    const toDeatail = () => {
      emit("toDeatail", {
        id: props.id,
        index: props.index,
        userName: props.userName
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(props.commentNum),
        b: common_vendor.o(toDeatail),
        c: props.isLike
      }, props.isLike ? {
        d: common_vendor.t(props.likeNum),
        e: common_vendor.o(($event) => addLike(props.like))
      } : {
        f: common_vendor.t(props.likeNum),
        g: common_vendor.o(($event) => addLike(props.like))
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/uniapp/vue3uniapp/pages/components/actionBar.vue"]]);
wx.createComponent(Component);
