<template>
	<view style="background-color: white;height: 100vh;">
		<view style="padding: 10px;background-color: white;">
			<view style="position: relative;background-color: white;height: 20px;">
				<view
					style="font-size: 13px;color: white;background-color: #169cfb;padding: 5px 15px;border-radius: 15px;position: absolute;right: 10px;"
					@click="publish">
					发布
				</view>

			</view>
		</view>
		<view style="background-color: #f9f9f9;padding: 15px;margin-top: 10px;">
			<view
				style="display: flex;justify-content: space-between;align-items: center;padding-bottom: 15px;border-bottom: gainsboro 1px solid;">
				<view style="display: flex;align-items: center;">
					<view
						style="border-radius: 50%;background-color:#209ce5;width: 20px;height: 20px;display:flex;align-items: center;justify-content: center; color: white;">
						#
					</view>
					<view
						style="color: #338ed0;margin-left: 6px;font-size: 15px;font-weight: bolds;height: 20px;line-height: 20px;">
						<input placeholder="请输入标签" v-model="contentData.label" />
					</view>
				</view>
				<!-- <view>
					<image src="../../static/rightarrow.png" style="width: 20px;height: 20px;"></image>
				</view> -->
			</view>
			<view style="display: flex;align-items: center;color: #9a99a2;margin-top: 15px;">
				<view>
					选择版区：
				</view>
				<view v-for="item in labelData"
					style="padding: 3px 10px;margin-left: 5px;border:#cccccd 1px solid ;border-radius: 20px;">
					{{item}}
				</view>
			</view>
		</view>
		<view style="padding: 10px;">
			<input placeholder="请输入内容" v-model="contentData.title" />
		</view>
		<view style="margin-top: 50px;padding: 10px;display: flex;">
			<view v-for="(item,index) in contentData.imgData" style="height: 100px;width: 100px;margin-right: 10px;">
				<image :src="item" style="width: 100%;height: 100%;" mode="aspectFill"></image>
			</view>
			<view @click="uploadImg"
				style="font-size: 80px;height: 100px;width: 100px;background-color: #f6f6f8;color: #d5d5d7;text-align: center;line-height: 100px;">
				+</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive
	} from 'vue'

	import {
		getStorage
	} from '../../utils/helpers/storage.js'


	// const Bucket = 'storageimg-1308280114';
	// // 存储桶Region可以在COS控制台指定存储桶的概览页查看 https://console.cloud.tencent.com/cos5/bucket/ 
	// // 关于地域的详情见 https://cloud.tencent.com/document/product/436/6224
	// const Region = 'ap-hongkong';

	// // 初始化实例
	// const COS = require("/utils/cos-wx-sdk-v5")
	// const cos = new COS({
	// 	getAuthorization: function(options, callback) {
	// 		// 异步获取签名
	// 		uni.request({
	// 			url: 'https://storageimg-1308280114.cos.ap-hongkong.myqcloud.com', // 步骤二提供的签名接口
	// 			data: {
	// 				Method: options.Method,
	// 				Key: options.Key
	// 			},
	// 			dataType: 'text',
	// 			success: function(result) {
	// 				const data = result.data;
	// 				callback({
	// 					TmpSecretId: data.credentials && data.credentials.tmpSecretId,
	// 					TmpSecretKey: data.credentials && data.credentials.tmpSecretKey,
	// 					XCosSecurityToken: data.credentials && data.credentials
	// 						.sessionToken,
	// 					ExpiredTime: data.expiredTime,
	// 				});
	// 			}
	// 		});
	// 	}
	// });

	// 选择文件
	// uni.chooseImage({
	// 	count: 1, // 默认9
	// 	sizeType: ['original'], // 可以指定是原图还是压缩图，默认用原图
	// 	sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
	// 	success: function(res) {
	// 		const filePath = res.tempFiles[0].path;
	// 		const filename = filePath.substr(filePath.lastIndexOf('/') + 1);
	// 		cos.postObject({
	// 			Bucket: Bucket,
	// 			Region: Region,
	// 			Key: filename,
	// 			FilePath: filePath,
	// 			onProgress: function(info) {
	// 				console.log(JSON.stringify(info));
	// 			}
	// 		}, function(err, data) {
	// 			console.log(err || data);
	// 		});
	// 	}
	// });
	const label = ref('最右传话筒')
	// const imgData = ref([])
	const labelData = ['故事分享', '生活趣事']
	const contentData = reactive({
		title: '',
		imgData: '',
		label: ''
	})
	const userInfo = getStorage('userInfo')
	console.log(userInfo)
	const uploadImg = () => {
		uni.chooseImage({
			count: 1, //默认9
			sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			sourceType: ['album'], //从相册选择
			success: function(res) {
				console.log(JSON.stringify(res.tempFilePaths), '上传了图片');
				contentData.imgData = res.tempFilePaths

			}
		});
	}

	const publish = () => {
		uni.showLoading({
			title: '发布中'
		});
		uni.request({
			method: 'POST',
			url: 'http://localhost:3000/posts', //仅为示例，并非真实接口地址。
			header: {
				'Content-Type': 'application/json'
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
			success: (res) => {
				console.log(res.data);
				contentData.title = '';
				contentData.imgData;
				contentData.label;
				uni.hideLoading();
				uni.switchTab({
					url: '/pages/zuiyou/index'
				})
			},
			fail(err) {
				console.log(res.data);
			}
		});
	}
</script>

<style>
</style>
