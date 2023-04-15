<template>
	<view style="background-color: white;">
		<!-- 顶部导航栏 -->
		<view style="display: flex;justify-content: center;">
			<view style="display: flex;width: 40%;justify-content: space-between;">
				<view v-for="(item,index) in topTab" :key="index" @click="selectTopTab(item,index)"
					style="display: flex;flex-direction: column;align-items: center;font-size: 16px;">
					<view :class="topTabIndex===index?'toptab-active':''">{{item}}</view>
					<view :class="topTabIndex===index?'topbackgrund-active':''"></view>
				</view>
			</view>
		</view>
		<!-- 二级导航栏 -->
		<view style="display: flex;justify-content: center;margin-top: 15px;padding-bottom: 20px;">
			<view style="display: flex;width: 70%;justify-content: space-between;">
				<view v-for="(item,index) in secondTab"
					style="display: flex;flex-direction: column;align-items: center;font-size: 16px;">
					<view>
						<image :src="item.img" style="width: 40px;height: 40px;"></image>
					</view>
					<view style="font-size: 14px;">{{item.name}}</view>
				</view>
			</view>
		</view>
	</view>
	<view style="margin-top: 8px;background-color: white;">
		<view style="display: flex;align-items: center;padding: 15px 20px;">
			<image src="../../static/news.png" style="width: 20px;height: 20px;"></image>
			<text style="font-weight: 700;margin: 0 5px;font-size: 14px;">全部消息</text>
			<!-- <image src="../../static/downArrow.png" style="width: 20px;height: 20px;"></image> -->
		</view>
	</view>
	<view style="background-color: white;padding:0 15px;">
		<!-- 点赞数量 -->
		<view v-for="item in commentList">
			<view style="display: flex;padding: 15px 0;border-top: gainsboro 1px solid;justify-content: space-between;">
				<view style="display: flex;">
					<view style="width: 60px;height: 60px;">
						<image src="../../static/001.png" style="width: 100%;height: 100%;border-radius: 50%;"></image>
					</view>
					<view style="margin-left: 10px;">
						<view>
							<text>{{item.user.name}}</text>
							<text style="font-size: 13px;color: gray;"> 赞了你的评论</text>
						</view>
						<view style="display: flex;align-items: center;margin: 7px;">
							<image src="../../static/up.png" style="width: 20px;;height: 20px;"></image>
							<text style="color: #529cfa;">{{item.like.length}}</text>
						</view>
						<view style="color: gray;font-size: 12px;">3分钟前</view>
					</view>
				</view>
				<view class="overflow-text">
					{{item.content}}
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive
	} from 'vue'
	import {
		onShow,
		onLoad
	}
	from "@dcloudio/uni-app";
	const topTab = ['提醒', '私信']
	const topTabIndex = ref(0)
	const userName = ref('@是索隆男友')
	const secondTab = [{
			img: '../../static/002.png',
			name: '小右通知'
		},
		{
			img: '../../static/003.png',
			name: '收到的@'
		},
		{
			img: '../../static/004.png',
			name: '粉丝/好友'
		},
	]
	const commentList = ref([])
	const selectTopTab = (item, index) => {
		topTabIndex.value = index
	}
	const getComment = (id) => {
		uni.request({
			method: 'GET',
			url: 'http://localhost:3000/comments', //仅为示例，并非真实接口地址。
			header: {
				'Content-Type': 'application/json'
			},
			data: {},
			success: (res) => {
				console.log(res.data);
				commentList.value = res.data
			},
			fail(err) {
				console.log(res.data);
			}
		});
	}
	onLoad((option) => {
		getComment()
	})
</script>

<style>
	.toptab-active {
		color: #1d98fd;
	}

	.topbackgrund-active {
		width: 10px;
		height: 3px;
		margin-top: 3px;
		background-color: #1d98fd;
	}

	.overflow-text {
		width: 75px;
		height: 75px;
		background-color: #f6f4fa;
		padding: 0 10px;
		color: gray;
		font-size: 13px;
		line-height: 25px;
		text-align: center;
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		line-clamp: 3;
		-webkit-box-orient: vertical;
	}
</style>
