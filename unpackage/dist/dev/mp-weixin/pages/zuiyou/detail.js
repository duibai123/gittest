"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_helpers_storage = require("../../utils/helpers/storage.js");
if (!Math) {
  actionBar();
}
const actionBar = () => "../components/actionBar.js";
const _sfc_main = {
  __name: "detail",
  setup(__props) {
    common_vendor.reactive({
      user: {
        avatar: "../../static/me-active.png",
        name: "用户名"
      },
      title: "想知道有没有知道什么公司，离大谱",
      classify: "贞子日记",
      sharedNum: 1,
      commentNum: 1,
      upNum: 1,
      img: "https://img0.baidu.com/it/u=3007048469,3759326707&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500"
    });
    const postList = common_vendor.ref([]);
    const comment = common_vendor.ref("");
    const postId = common_vendor.ref("");
    const replyUser = common_vendor.reactive({
      id: "",
      name: "",
      index: ""
    });
    const formatData = (post) => {
      return {
        ...post,
        isLike: post.like.includes(userInfo.id)
      };
    };
    const commentList = common_vendor.ref([]);
    const userInfo = utils_helpers_storage.getStorage("userInfo");
    const getListData = (id) => {
      common_vendor.index.request({
        method: "GET",
        url: `http://localhost:3000/posts/${id}`,
        //仅为示例，并非真实接口地址。
        header: {
          "Content-Type": "application/json"
        },
        data: {},
        success: (res2) => {
          console.log(res2.data);
          postList.value = {
            ...res2.data,
            isLike: res2.data.like.includes(userInfo.id)
          };
        },
        fail(err) {
          console.log(res.data);
        }
      });
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
          commentList.value = res2.data.map((item, index) => formatData(item));
        },
        fail(err) {
          console.log(res.data);
        }
      });
    };
    const reply = (obj) => {
      replyUser.id = obj.id;
      replyUser.name = `回复${obj.userName}`;
      replyUser.index = obj.index;
    };
    const addComments = () => {
      if (!comment.value) {
        console.log("aa");
        common_vendor.index.showToast({
          icon: "none",
          title: "请输入内容",
          duration: 2e3
        });
        return;
      } else {
        if (replyUser.name) {
          addReply();
        } else {
          addComment();
        }
      }
    };
    const addReply = () => {
      const newReply = [...commentList.value[replyUser.index].reply, {
        userName: userInfo.userName,
        content: comment.value,
        userId: userInfo.id
      }];
      common_vendor.index.request({
        method: "PATCH",
        url: `http://localhost:3000/comments/${replyUser.id}`,
        //仅为示例，并非真实接口地址。
        header: {
          "Content-Type": "application/json"
        },
        data: {
          reply: newReply
        },
        success: (res2) => {
          console.log(res2.data);
          getComment();
          replyUser.name = "";
          comment.value = "";
        },
        fail(err) {
          console.log(res.data);
        }
      });
    };
    const addComment = () => {
      common_vendor.index.request({
        method: "POST",
        url: `http://localhost:3000/comments`,
        //仅为示例，并非真实接口地址。
        header: {
          "Content-Type": "application/json"
        },
        data: {
          content: comment.value,
          user: {
            name: userInfo.userName,
            avatarUrl: userInfo.avatarUrl,
            id: userInfo.id
          },
          like: [],
          reply: []
        },
        success: (res2) => {
          console.log(res2.data);
          getComment();
          replyUser.name = "";
          comment.value = "";
        },
        fail(err) {
          console.log(res.data);
        }
      });
    };
    const addLike = () => {
      const likeIndex = postList.value.like.indexOf(userInfo.id);
      let newLike = postList.value.like;
      if (likeIndex !== -1) {
        newLike.splice(likeIndex, 1);
      } else {
        newLike.push(userInfo.id);
      }
      console.log(newLike);
      common_vendor.index.request({
        method: "PATCH",
        url: `http://localhost:3000/posts/${postId.value}`,
        //仅为示例，并非真实接口地址。
        header: {
          "Content-Type": "application/json"
        },
        data: {
          like: newLike
        },
        success: (res2) => {
          postList.value = formatData(res2.data);
        },
        fail: (err) => {
          console.log(res.data);
        }
      });
    };
    const addReplyLike = (obj) => {
      const likeIndex = obj.like.indexOf(userInfo.id);
      let newLike = obj.like;
      if (likeIndex !== -1) {
        newLike.splice(likeIndex, 1);
      } else {
        newLike.push(userInfo.id);
      }
      console.log(newLike);
      common_vendor.index.request({
        method: "PATCH",
        url: `http://localhost:3000/comments/${obj.id}`,
        header: {
          "Content-Type": "application/json"
        },
        data: {
          like: newLike
        },
        success: (res2) => {
          console.log(res2.data);
          commentList.value[obj.index] = formatData(res2.data);
        },
        fail: (err) => {
          console.log(res.data);
        }
      });
    };
    common_vendor.onLoad((option) => {
      getListData(option.id);
      getComment();
      postId.value = option.id;
      console.log("option.id", option);
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(postList.value.userName),
        b: common_vendor.t(postList.value.title),
        c: postList.value.imgData[0],
        d: postList.value.id,
        e: common_vendor.o(addLike),
        f: common_vendor.p({
          likeNum: postList.value.like.length,
          isLike: postList.value.isLike,
          like: postList.value.like,
          id: postList.value.id,
          index: _ctx.index
        }),
        g: common_vendor.f(commentList.value, (item, index, i0) => {
          return {
            a: item.user.avatarUrl,
            b: common_vendor.t(item.user.name),
            c: common_vendor.t(item.content),
            d: item.id,
            e: "02074445-1-" + i0,
            f: common_vendor.p({
              likeNum: item.like.length,
              isLike: item.isLike,
              like: item.like,
              id: item.id,
              index,
              userName: item.user.name,
              commentNum: item.reply.length
            }),
            g: common_vendor.f(item.reply, (items, k1, i1) => {
              return {
                a: common_vendor.t(items.userName),
                b: common_vendor.t(items.content)
              };
            })
          };
        }),
        h: common_vendor.o(addReplyLike),
        i: common_vendor.o(reply),
        j: replyUser.name ? replyUser.name : "评论",
        k: comment.value,
        l: common_vendor.o(($event) => comment.value = $event.detail.value),
        m: common_vendor.o(addComments)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/uniapp/vue3uniapp/pages/zuiyou/detail.vue"]]);
wx.createPage(MiniProgramPage);
