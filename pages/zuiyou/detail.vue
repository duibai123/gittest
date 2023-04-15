<template>
	<view style="background: white;padding: 10px;">
		<!-- 顶部个人头像 -->
		<view style="display: flex;margin-top: 10px;justify-content: space-between;">
			<view style="display: flex; margin-left: 10px;">
				<view style="width: 70rpx;height: 70rpx;">
					<image
						src="https://img0.baidu.com/it/u=3007048469,3759326707&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500"
						style="width: 100%;height: 100%;border-radius: 50%;"></image>
				</view>
				<view style="margin-left: 10px;">
					<view style="font-size: 13px;font-weight: 500;">{{postList.userName}}</view>
					<view style="font-size: 10px;">昨天12:31 浙江</view>
				</view>
			</view>
			<view
				style="border-radius: 18px;background-color: #149dfe;font-size: 13px;width: 60px;align-items: center;display: flex;justify-content: center;color: white;margin-right: 10px;height: 30px;margin-top: 5px;">
				+关注
			</view>
		</view>
		<!-- 标题 -->
		<view style="margin:5px 0 0 10px;font-size: 15px;">{{postList.title}}</view>
		<!-- 推文内容 -->
		<view style="width: 300rpx;height: 400rpx; margin:8px 0 0 10px;">
			<image :src="postList.imgData[0]" style="width: 100%;height: 100%;"></image>
		</view>
		<!-- 功能交互区 -->
		<view style="margin-top: 10px;">
			<!-- <view style="display: flex;justify-content: center;"> -->
			<!-- <view style="display: flex;justify-content: space-between;
		margin-top: 10px;width: 90%;margin-bottom: 20px;">
				<view style="align-items: center;display: flex;">
					<image src="../../static/share.png" style="width: 30rpx;height: 30rpx;"></image>
					<text class="text">{{info.sharedNum}}</text>
				</view>
				<view style="align-items: center;display: flex;" @click="toDeatail">
					<image src="../../static/comment.png" style="width: 30rpx;height: 30rpx;"></image>
					<text class="text">{{info.commentNum}}</text>
				</view>
				<view v-if="postList.isLike" style="align-items: center;display: flex;" @click="addLike(item,index)">
					<image src="../../static/like.png" style="width: 30rpx;height: 30rpx;">
					</image>
					<text style="color: #209ce5;margin-left: 15px;
		font-size: 14px;">{{postList.like.length}}</text>
				</view>
				<view v-else style="align-items: center;display: flex;" @click="addLike(item,index)">
					<image src="../../static/uparrow.png" style="width: 30rpx;height: 30rpx;"></image>
					<text class="text">{{postList.like.length}}</text>
				</view>
				<view style="margin-right: 10px;align-items: center;display: flex;">
					<image src="../../static/down.png" style="width: 30rpx;height: 30rpx;"></image>
				</view>
			</view> -->
			<action-bar :likeNum="postList.like.length" :isLike="postList.isLike" :like="postList.like"
				:id="postList.id" :index="index" @addLike="addLike">
			</action-bar>
		</view>
	</view>
	<view style="display: flex;margin-top: 8px;justify-content: space-between;background: white;height: 130rpx;">
		<view style="display: flex; margin-left: 10px;align-items: center;">
			<view style="width: 80rpx;height: 80rpx;border-radius: 30px;">
				<image
					src="https://img0.baidu.com/it/u=3007048469,3759326707&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500"
					style="width: 100%;height: 100%;border-radius: 10px;"></image>
			</view>
			<view style="margin-left: 10px;">
				<view style="font-size: 13px;">#吐槽面试</view>
				<view style="font-size: 10px;color: gray;">4546 右友</view>
			</view>
		</view>
		<view
			style="border-radius: 18px;font-size: 13px;width: 60px;align-items: center;display: flex;justify-content: center;color: #2c8ecd;margin-right: 10px;height: 30px;margin-top: 15px;border: #2c8ecd 1.5px solid;">
			进入
		</view>
	</view>
	<view style="display: flex;background-color: white;margin-top: 5px;height: 50px;justify-content: space-between;">
		<view style="display: flex;align-items: center;margin-left: 10px;">
			<image src="../../static/hot.png" style="width: 20px;height: 20px;"></image>
			<text style="margin: 0 5px;">最热评论</text>
			<image src="../../static/downArrow.png" style="width: 20px;height: 20px;"></image>
		</view>
		<view
			style="border: darkgray 1px solid;border-radius: 18px;font-size: 13px;width: 70px;align-items: center;display: flex;justify-content: center;height: 30px;color: gray;margin-top: 10px;margin-right: 10px;">
			<text>插眼</text>
			<image src="../../static/hot.png" style="width: 20px;height: 20px;"></image>
		</view>
	</view>
	<view v-for="(item,index) in commentList" style="background-color: white;padding: 10px;">
		<view style="background-color: white;display: flex;">
			<view style="width: 80rpx;height: 80rpx;border-radius: 30px;">
				<image :src="item.user.avatarUrl" style="width: 100%;height: 100%;border-radius: 50%;"></image>
			</view>
			<view style="margin-left: 5px;flex:1">
				<!-- 用户名称 -->
				<view style="color: #838383;font-size: 12px;margin-top: 5px;">{{item.user.name}}</view>
				<!-- 评论内容 -->
				<view style="font-size: 13px;margin-top: 5px;">{{item.content}}</view>
				<view style="justify-content: space-between;display: flex;margin-top: 10px;">
					<view style="color: #bcbcbc;font-size: 12px">6小时前 深圳</view>
					<!-- 评论点赞交互区 -->
					<!-- <view style="display: flex;width: 50%;justify-content: space-between;font-size: 12px;">
						<view>
							<image src="../../static/share.png" style="width: 15px;height: 15px;"></image>
						</view>
						<view @click="reply(item,index)">
							<image src="../../static/message.png" style="width: 15px;height: 15px;"></image>
						</view>
						<view v-if="item.isLike" style="align-items: center;display: flex;"
							@click="addReplyLike(item,index)">
							<image src="../../static/like.png" style="width: 30rpx;height: 30rpx;">
							</image>
							<text style="color: #209ce5;margin-left: 15px;
						font-size: 14px;">{{item.like.length}}</text>
						</view>
						<view v-else style="align-items: center;display: flex;" @click="addReplyLike(item,index)">
							<image src="../../static/uparrow.png" style="width: 30rpx;height: 30rpx;"></image>
							<text class="text">{{item.like.length}}</text>
						</view>
						<view>
							<image src="../../static/down.png" style="width: 15px;height: 15px;"></image>
						</view>
					</view> -->
					<view style="width: 60%">
						<action-bar :likeNum="item.like.length" :isLike="item.isLike" :like="item.like" :id="item.id"
							:index="index" :userName="item.user.name" :commentNum="item.reply.length"
							@addLike="addReplyLike" @toDeatail="reply">
						</action-bar>
					</view>
				</view>
				<view style="margin-top: 10px;background-color: #f6f5fa;
				padding: 7px;">
					<view v-for="items in item.reply" style="margin-top: 5px;">
						<text style="color: #4c8ab1;">{{items.userName}}:</text>
						<text style="margin-left: 3px;">{{items.content}}</text>
					</view>
				</view>
			</view>
		</view>

	</view>
	<view
		style="display: flex;align-items: center;margin: 10px 0;position: sticky;bottom: 0px;background-color: white;height: 60px;">
		<view style="width: 70%;margin-left: 20px;">
			<input v-model="comment" style="border: dimgray 1px solid;border-radius: 20px;padding: 5px 10px;"
				:placeholder="replyUser.name ? replyUser.name:'评论'" />
		</view>
		<view
			style="border-radius: 18px;background-color: #149dfe;font-size: 13px;width: 60px;align-items: center;display: flex;justify-content: center;color: white;margin-right: 10px;height: 30px;margin-left: 20px;"
			@click="addComments">
			发送</view>
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
	import {
		getStorage
	} from '../../utils/helpers/storage.js'
	// 引入组件
	import actionBar from '../components/actionBar.vue'
	const info = reactive({
		user: {
			avatar: '../../static/me-active.png',
			name: '用户名',
		},
		title: '想知道有没有知道什么公司，离大谱',
		classify: '贞子日记',
		sharedNum: 1,
		commentNum: 1,
		upNum: 1,
		img: 'https://img0.baidu.com/it/u=3007048469,3759326707&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500'
	})
	const postList = ref([])
	const comment = ref('')
	const postId = ref('')
	// 当前待回复的用户信息
	const replyUser = reactive({
		id: "",
		name: "",
		index: ""
	})
	const formatData = (post) => {
		return {
			...post,
			isLike: post.like.includes(userInfo.id)
		}
	}
	const commentList = ref([])
	const userInfo = getStorage('userInfo')
	// 当前回复的索引值
	const getListData = (id) => {
		uni.request({
			method: 'GET',
			url: `http://localhost:3000/posts/${id}`, //仅为示例，并非真实接口地址。
			header: {
				'Content-Type': 'application/json'
			},
			data: {},
			success: (res) => {
				console.log(res.data);
				//res.data.map((item, index) => formatData(item))
				postList.value = {
					...res.data,
					isLike: res.data.like.includes(userInfo.id),
				}
			},
			fail(err) {
				console.log(res.data);
			}
		});
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
				commentList.value = res.data.map((item, index) => formatData(item))
			},
			fail(err) {
				console.log(res.data);
			}
		});
	}
	const reply = (obj) => {
		replyUser.id = obj.id
		replyUser.name = `回复${obj.userName}`
		replyUser.index = obj.index
	}
	const addComments = () => {
		if (!comment.value) {
			console.log('aa')
			uni.showToast({
				icon: "none",
				title: '请输入内容',
				duration: 2000
			});
			return
		} else {
			if (replyUser.name) {
				addReply()
			} else {
				addComment()
			}
		}
	}
	const addReply = () => {
		const newReply = [...commentList.value[replyUser.index].reply, {
			userName: userInfo.userName,
			content: comment.value,
			userId: userInfo.id
		}]
		uni.request({
			method: 'PATCH',
			url: `http://localhost:3000/comments/${replyUser.id}`, //仅为示例，并非真实接口地址。
			header: {
				'Content-Type': 'application/json'
			},
			data: {
				reply: newReply
			},
			success: (res) => {
				console.log(res.data);
				getComment()
				replyUser.name = ''
				comment.value = ''
			},
			fail(err) {
				console.log(res.data);
			}
		});
	}
	const addComment = () => {
		uni.request({
			method: 'POST',
			url: `http://localhost:3000/comments`, //仅为示例，并非真实接口地址。
			header: {
				'Content-Type': 'application/json'
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
			success: (res) => {
				console.log(res.data);
				getComment()
				replyUser.name = ''
				comment.value = ''
			},
			fail(err) {
				console.log(res.data);
			}
		});
	}
	const addLike = () => {
		const likeIndex = postList.value.like.indexOf(userInfo.id)
		let newLike = postList.value.like
		if (likeIndex !== -1) {
			newLike.splice(likeIndex, 1)
		} else {
			newLike.push(userInfo.id)
		}
		console.log(newLike)
		uni.request({
			method: 'PATCH',
			url: `http://localhost:3000/posts/${postId.value}`, //仅为示例，并非真实接口地址。
			header: {
				'Content-Type': 'application/json'
			},
			data: {
				like: newLike
			},
			success: (res) => {
				postList.value = formatData(res.data)
			},
			fail: (err) => {
				console.log(res.data);
			}
		});
	}
	const addReplyLike = (obj) => {
		const likeIndex = obj.like.indexOf(userInfo.id)
		let newLike = obj.like
		if (likeIndex !== -1) {
			newLike.splice(likeIndex, 1)
		} else {
			newLike.push(userInfo.id)
		}
		console.log(newLike)
		uni.request({
			method: 'PATCH',
			url: `http://localhost:3000/comments/${obj.id}`,
			header: {
				'Content-Type': 'application/json'
			},
			data: {
				like: newLike
			},
			success: (res) => {
				console.log(res.data)
				commentList.value[obj.index] = formatData(res.data)
			},
			fail: (err) => {
				console.log(res.data);
			}
		});
	}
	onLoad((option) => {
		getListData(option.id)
		getComment()
		postId.value = option.id
		console.log('option.id', option)
	})
</script>

<style>
	.text {
		margin-left: 15px;
		font-size: 14px;
	}
</style>
