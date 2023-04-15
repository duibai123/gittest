"use strict";
const common_vendor = require("../../common/vendor.js");
const getStorage = (name) => {
  const userDetailInfo = JSON.parse(common_vendor.index.getStorageSync(name));
  return userDetailInfo;
};
const setStorage = (name, data) => {
  const datas = JSON.stringify(data);
  common_vendor.index.setStorageSync(name, datas);
};
exports.getStorage = getStorage;
exports.setStorage = setStorage;
