<template>
	<view>
		<view class="nav">
			<view @click="toTalk" style="margin-left: 10px;">话题</view>
			<view style="display: flex;width: 70%;justify-content: space-between;">
				<view v-for="(item,index) in arr" :key="index" class="navs" :class="navIndex===index ?'nav-active':''"
					@click="selectNav(item,index)">{{item}}</view>
			</view>
			<view style="margin-right: 10px;margin-top: 4px;">
				<image src="../../static/search.png" style="width: 50rpx;height: 50rpx;"></image>
			</view>
		</view>
		<view>
			<view v-for="(item,index) in postList" class="card">
				<!-- 用户信息 -->
				<view style="display: flex;justify-content: space-between;">
					<view style="display: flex;align-items: center; margin-left: 10px;margin-left: 10px;"
						@click="toHomePage">
						<view style="width: 50rpx;height: 50rpx;">
							<image :src="item.avatarUrl" style="width: 100%;height: 100%;border-radius: 50%;"></image>
						</view>
						<view><text style="margin-left: 5px;font-size: 12px;">{{item.userName}}</text></view>
					</view>

					<!-- 更多选项 -->
					<view style="margin-right: 10rpx;" @click="open">
						<image src="../../static/downArrow.png" style="width: 30rpx;height: 30rpx;"></image>
					</view>
				</view>

				<view style="margin-left: 10px;margin-top: 10px;font-size: 14px;">
					<text>{{item.title}}</text>
				</view>

				<!-- 推文内容 -->
				<view class="content">
					<image :src="item.imgData[0]" style="width: 100%;height: 100%;"></image>
				</view>

				<!-- 标签 -->
				<view
					style="display: flex;margin-top: 10px;margin-bottom: 10px;background-color: #f2f9ff;width: max-content;padding: 5px 8px;border-radius: 20px;align-items: center;font-size: 12px;">
					<view
						style="border-radius: 50%;background-color:#209ce5;width: 16px;height: 16px;display:flex;align-items: center;justify-content: center; color: white;">
						#
					</view>
					<view style="margin-left: 5px;font-weight: bold;">{{item.label}}</view>
				</view>

				<!-- 交互区 -->
				<!-- <view class="action-bar" style="display: flex;justify-content: space-between;">
					<view style="margin-left: 10px;align-items: center;display: flex;">
						<image src="../../static/share.png" style="width: 30rpx;height: 30rpx;"></image>
						<text class="text">99</text>
					</view>
					<view style="align-items: center;display: flex;" @click="toDeatail(item)">
						<image src="../../static/comment.png" style="width: 30rpx;height: 30rpx;"></image>
						<text class="text">99</text>
					</view>
					<view v-if="item.isLike" style="align-items: center;display: flex;" @click="addLike(item,index)">
						<image src="../../static/like.png" style="width: 30rpx;height: 30rpx;">
						</image>
						<text style="color: #209ce5;margin-left: 15px;
		font-size: 14px;">{{item.like.length}}</text>
					</view>
					<view v-else style="align-items: center;display: flex;" @click="addLike(item,index)">
						<image src="../../static/uparrow.png" style="width: 30rpx;height: 30rpx;"></image>
						<text class="text">{{item.like.length}}</text>
					</view>
					<view style="margin-right: 10px;align-items: center;display: flex;">
						<image src="../../static/down.png" style="width: 30rpx;height: 30rpx;"></image>
					</view>
				</view> -->
				<action-bar :likeNum="item.like.length" :isLike="item.isLike" :like="item.like" :id="item.id"
					:index="index" @addLike="addLike" @toDeatail="toDeatail">
				</action-bar>
			</view>
		</view>
		<van-dialog v-model:show="show" title="标题" show-cancel-button>
			<img src="https://fastly.jsdelivr.net/npm/@vant/assets/apple-3.jpeg" />
		</van-dialog>
	</view>

</template>

<script setup>
	import {
		ref,
		reactive,
		onMounted,
		computed,
		defineComponent
	} from 'vue'
	import {
		onShow,
		onLoad
	}
	from "@dcloudio/uni-app";
	import {
		getStorage
	} from '../../utils/helpers/storage.js'
	// 引入组件
	import actionBar from '../components/actionBar.vue'
	const navIndex = ref(0)
	const show = ref(false)
	const arr = ['关注', '推荐', '视频', '图文']
	const postList = ref([])
	// 选择顶部导航栏
	const selectNav = (item, index) => {
		console.log('选择了', item)
		navIndex.value = index
	}
	const toTalk = () => {
		uni.navigateTo({
			url: './talkingPoint'
		})
	}
	const toDeatail = (obj) => {
		console.log("跳转不了")
		uni.navigateTo({
			url: `./detail?id=${obj.id}`
		})
	}
	const toHomePage = () => {
		uni.navigateTo({
			url: './personalHomepage'
		})
	}
	const open = () => {
		show.value = true
	}

	const formatData = (post) => {
		console.log(';重新请求页面111')
		return {
			...post,
			isLike: post.like.includes(userInfo.value.id)
		}
	}

	const getListData = () => {
		console.log('111111')
		uni.request({
			method: 'GET',
			url: 'http://localhost:3000/posts', //仅为示例，并非真实接口地址。
			header: {
				'Content-Type': 'application/json'
			},
			data: {},
			success: (res) => {
				postList.value = res.data.map((item, index) => formatData(item))
				console.log(postList.value)
			},
			fail(err) {
				console.log(res.data);
			}
		});
	}
	const addLike = (obj) => {
		console.log("点击了点赞", obj)
		const likeIndex = obj.like.indexOf(userInfo.value.id)
		let newLike = obj.like
		if (likeIndex !== -1) {
			newLike.splice(likeIndex, 1)
		} else {
			newLike.push(userInfo.value.id)
		}
		console.log(newLike)
		uni.request({
			method: 'PATCH',
			url: `http://localhost:3000/posts/${obj.id}`,
			header: {
				'Content-Type': 'application/json'
			},
			data: {

				like: newLike
			},
			success: (res) => {
				console.log(res.data)
				postList.value[obj.index] = formatData(res.data)
			},
			fail: (err) => {
				console.log(res.data);
			}
		});
	}
	const userInfo = ref(getStorage('userInfo'))

	onShow(() => {
		userInfo.value = getStorage('userInfo')
		getListData('userInfo', userInfo)
	})
</script>

<style>
	.nav {
		width: 100%;
		height: 80rpx;
		background: white;
		line-height: 80rpx;
		display: flex;
		justify-content: space-between;
		position: sticky;
		top: 0;
	}

	.test {
		height: 700rpx;
		background: blue;
	}

	.test1 {
		height: 700rpx;
		background: yellow;
	}

	.navs {
		margin: 0 10px;
		text-align: center;
	}

	.nav-active {
		color: blue;
	}

	.content {
		width: 300rpx;
		height: 400rpx;
		border: 1px solid;
		margin-left: 10upx;
		margin-top: 10px
	}

	.card {
		margin-top: 10px;
		padding: 10px;
		background-color: white;
	}

	.text {
		margin-left: 15px;
		font-size: 14px;
	}
</style>
