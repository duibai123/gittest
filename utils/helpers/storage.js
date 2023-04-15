const getStorage = (name) => {
	const userDetailInfo = JSON.parse(uni.getStorageSync(name));
	return userDetailInfo
}

const setStorage = (name, data) => {
	const datas = JSON.stringify(data)
	uni.setStorageSync(name, datas);
}

export {
	getStorage,
	setStorage
}
