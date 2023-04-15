<template>
	<view style="background-color: white;padding: 10px;">
		<!-- 头部背景图 -->
		<view class="background-img">
			<image src="../../static/1.jpg" style="width: 100%;height: 100%;"></image>
		</view>
		<!-- 头像和私信等按钮 -->
		<view style="display: flex;justify-content: space-between;position: relative;height: 50px;">
			<view style="position: absolute;top: -20px;">
				<image src="../../static/avator.png" style="width: 60px;height: 60px;"></image>
				<!-- <image :src="getInfo.avatarUrl" style="width: 60px;height: 60px;"></image> -->
			</view>
			<view style="display: flex;margin-top: 10px;position: absolute;right: 5px;">
				<view
					style="border: #2084c2 1px solid;color: #2084c2 ;height: 25px;border-radius: 20px;display: flex;align-items: center;justify-content: center;padding: 1px 15px;font-size: 13px;">
					私信</view>
				<view
					style="color: #2084c2 ;background-color: #159efe;color: white;height: 25px;border-radius: 20px;margin: 0 10px;display: flex;align-items: center;justify-content: center;padding: 1px 15px;font-size: 13px;">
					关注
				</view>
			</view>
		</view>
		<!-- 名字性别 -->
		<view style="display: flex;margin-top: 10px;align-items: center;">
			<view style="font-size: 18px;font-weight: 700;">{{infoData.userName}}</view>
			<view style="margin: 5px 10px 0 10px;" v-if="infoData.gender==='women'">
				<image src="../../static/sex.png" style="width: 20px;height: 20px;"></image>
			</view>
			<view
				style="font-size: 12px;color: gray;background-color: #e7f6ff;padding: 0px 5px;border-radius: 20px;align-items: center;display: flex;height: 20px;">
				右龄{{infoData.day}}天</view>
		</view>
		<view style="margin-top: 8px;display: flex;align-items: center;">
			<image src="../../static/yo.png" style="width: 15px;height: 15px;"></image>
			<text style="font-size: 12px;color: gray;margin-left: 5px;">正能量yo主</text>
		</view>
		<view style="font-size: 12px;color: gray;margin-top: 5px;">{{infoData.describe}}</view>
		<view style="display: flex; align-items: center;margin-top: 8px;">
			<view
				style="width: 12px;height: 12px;border-radius: 50%;border: gray 1px solid;color: gray;font-size: 10px;display: flex;align-items: center;justify-content: center;">
				IP</view>
			<view style="font-size: 12px;color: gray;margin-left: 5px;">属地:&nbsp;{{infoData.province}}</view>
		</view>
		<view style="display: flex; margin-top: 8px;">
			<view v-for="item in infoData.label"
				style="background-color: #f6f6f6;font-size: 10px;padding: 2px 5px;color: #626262;border-radius: 10px;margin-right: 6px;">
				{{item}}
			</view>
			<view
				style="background-color: #f6f6f6;font-size: 10px;padding: 2px 5px;color: #626262;border-radius: 10px;margin-right: 6px;">
				></view>
		</view>
		<view
			style="display: flex;align-items: center;justify-content: space-between;align-items: center;margin-bottom: 5px;">
			<view style="display: flex; margin-top: 8px;">
				<view>
					<text style="font-size: 15px;">{{infoData.praise}}</text>
					<text style="font-size: 12px;color: gray;margin-left: 2px;">获赞</text>
				</view>
				<view style="margin-left: 10px;">
					<text style="font-size: 15px;">{{infoData.interest}}</text>
					<text style="font-size: 12px;color: gray;margin-left: 2px;">关注</text>
				</view>
				<view style="margin-left: 10px;">
					<text style="font-size: 15px;">{{infoData.fans}}</text>
					<text style="font-size: 12px;color: gray;margin-left: 2px;">粉丝</text>
				</view>
			</view>
			<view style="margin-top: 8px;margin-right: 20px;">
				<image src="../../static/downArrow.png" style="width: 15px;height: 15px;"></image>
			</view>
		</view>
	</view>
	<view
		style="margin-top: 5px;background-color: white;padding: 10px 20px;display: flex;justify-content: space-between;border-bottom: gainsboro 1px solid;">
		<view v-for="(item,index) in tabData" :key="index" style="display: flex;align-items: center;"
			@click="selectTab(item,index)">
			<view style="font-size: 15px;display: flex;flex-direction: column;align-items: center;">
				<view :class="tabIndex===index?'tab-active':''">{{item.name}}</view>
				<view :class="tabIndex===index?'background-active':''"></view>
			</view>
			<view style="font-size: 12px;color: gray;margin-left: 3px;">{{item.num}}</view>
		</view>
	</view>
	<view style="background-color: white;padding: 10px;">
		<view
			style="background-color: #f3f2f9;color: #6e6d73;font-size: 12px;border-radius: 5px;padding: 5px 10px;display: flex;align-items: center;justify-content: center;width: 120px;">
			{{infoData.labels}}
		</view>
		<view style="display: flex;margin-top: 10px;">
			<view v-for="(item,index) in tabsData"
				:class="['tabs',tabsIndex==index?'tabs-active':'',index===1?'next':'']" @click="selectTabs(item,index)">
				{{item}}
			</view>
		</view>
		<!-- 卡片式内容 -->
		<view>
			<view style="display: flex;margin-top: 10px;align-items: center;">
				<view>
					<image src="../../static/avator.png" style="width: 40px;height: 50px;"></image>
				</view>
				<view style="margin-left: 5px;">
					<view>{{infoData.userName}}</view>
					<view style="font-size: 10px;color: gray;margin-top: 3px;">02/27</view>
				</view>
			</view>
		</view>
		<view style="margin-top: 10px;">{{infoData.content}}</view>
		<view class="content">
			<image :src="infoData.img" style="width: 100%;height: 100%;"></image>
		</view>
		<!-- 标签 -->
		<view
			style="display: flex;margin-top: 10px;margin-bottom: 10px;background-color: #f2f9ff;width: max-content;padding: 5px 8px;border-radius: 20px;align-items: center;font-size: 12px;">
			<view
				style="border-radius: 50%;background-color:#209ce5;width: 16px;height: 16px;display:flex;align-items: center;justify-content: center; color: white;">
				#
			</view>
			<view style="margin-left: 5px;font-weight: bold;">{{infoData.labels}}</view>
		</view>
		<!-- 底部交互区 -->
		<view style="margin-top: 10px;">
			<view class="action-bar" style="display: flex;justify-content: space-between;">
				<view style="margin-left: 10px;align-items: center;display: flex;">
					<image src="../../static/share.png" style="width: 30rpx;height: 30rpx;"></image>
					<text class="text">1</text>
				</view>
				<view style="align-items: center;display: flex;" @click="toDeatail">
					<image src="../../static/comment.png" style="width: 30rpx;height: 30rpx;"></image>
					<text class="text">1</text>
				</view>
				<view style="align-items: center;display: flex;">
					<image src="../../static/uparrow.png" style="width: 30rpx;height: 30rpx;"></image><text
						class="text">222</text>

				</view>
				<view style="margin-right: 10px;align-items: center;display: flex;">
					<image src="../../static/down.png" style="width: 30rpx;height: 30rpx;"></image>
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
		getStorage
	} from '../../utils/helpers/storage.js'
	const tabIndex = ref(1)
	const tabsIndex = ref(0)
	const infoData = reactive({
		userName: '诸葛思慧',
		gender: 'women',
		day: '1544',
		describe: '视频均源自网络，只为传播更多开心 | 暖心正能量！',
		province: '福建',
		label: ['美食家', '熬夜刷帖老抽子', '不出门不洗头', '盆友圈健身狂'],
		praise: '2370.9w',
		interest: '4',
		fans: '63606',
		invitationNum: '99+',
		commentNum: '99+',
		trendsNum: '2',
		labels: '诸葛思慧.正能量 >',
		content: '视频均源自网络，只为传播更多',
		img: 'https://img0.baidu.com/it/u=3007048469,3759326707&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500'
	})
	// const tabData=['主页','帖子','评论','动态']
	const tabData = [{
			name: '主页',
			num: ''
		},
		{
			name: '帖子',
			num: '99+'
		},
		{
			name: '评论',
			num: '99+'
		},
		{
			name: '动态',
			num: '5'
		},
	]
	const tabsData = ['全部帖子', '原创帖子']
	const selectTab = (item, index) => {
		console.log('点击tab栏')
		tabIndex.value = index
	}
	const selectTabs = (item, index) => {
		tabsIndex.value = index
	}
	const getInfo = getStorage('userInfo')
	console.log('getInfo', getInfo)
</script>

<style>
	.tab-active {
		color: #1d96da;
	}

	.background-active {
		width: 8px;
		height: 2px;
		background-color: #1d96da;
		margin-top: 2px;
	}

	.tabs-active {
		color: black;
		border: gray 1px solid;

		border-radius: 10px;
	}

	.next {
		margin-left: 20px;
	}

	.tabs {
		padding: 2px 5px;
	}

	.content {
		width: 400rpx;
		height: 400rpx;
		border: 1px solid;
		margin-left: 10upx;
		margin-top: 10px
	}

	.text {
		margin-left: 15px;
		font-size: 14px;
	}
</style>
