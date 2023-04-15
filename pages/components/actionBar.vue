<template>
	<view class="action-bar" style="display: flex;justify-content: space-between;">
		<!-- 分享按钮 -->
		<view style="margin-left: 10px;align-items: center;display: flex;">
			<image src="../../static/share.png" style="width: 30rpx;height: 30rpx;"></image>
			<text class="text"></text>
		</view>
		<!-- 评论 -->
		<view style="align-items: center;display: flex;" @click="toDeatail">
			<image src="../../static/comment.png" style="width: 30rpx;height: 30rpx;"></image>
			<text class="text">{{props.commentNum}}</text>
		</view>
		<!-- 点赞 -->
		<view v-if="props.isLike" style="align-items: center;display: flex;" @click="addLike(props.like)">
			<image src="../../static/like.png" style="width: 30rpx;height: 30rpx;">
			</image>
			<text style="color: #209ce5;margin-left: 15px;
	font-size: 14px;">{{props.likeNum}}</text>
		</view>
		<view v-else style="align-items: center;display: flex;" @click="addLike(props.like)">
			<image src="../../static/uparrow.png" style="width: 30rpx;height: 30rpx;"></image>
			<text class="text">{{props.likeNum}}</text>
		</view>
		<view style="margin-right: 10px;align-items: center;display: flex;">
			<image src="../../static/down.png" style="width: 30rpx;height: 30rpx;"></image>
		</view>
	</view>
</template>

<script setup>
	import {
		defineProps,
		defineEmits
	} from 'vue'
	const props = defineProps({
		likeNum: {
			type: Number,
			default: 0
		},
		isLike: {
			type: Boolean,
			default: ''
		},
		like: {
			type: Array,
			default: []
		},
		id: {
			type: String,
			default: ''
		},
		index: {
			type: Number,
			default: 0
		},
		userName: {
			type: String,
			default: ''
		},
		commentNum: {
			type: Number,
			default: 0
		}
	})
	const emit = defineEmits(['addLike', 'toDeatail'])

	const addLike = () => {
		emit('addLike', {
			like: props.like,
			id: props.id,
			index: props.index
		})
	}
	const toDeatail = () => {
		emit('toDeatail', {
			id: props.id,
			index: props.index,
			userName: props.userName
		})
	}
</script>

<style>
	.text {
		margin-left: 15px;
		font-size: 14px;
	}
</style>
