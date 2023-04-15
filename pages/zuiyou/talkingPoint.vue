<template>
	<view style="background-color: white;">
		<view style="background-color: white;display: flex;justify-content: center;">
			<view class="search-btn">
				<image src="../../static/search1.png" style="width: 20px;height: 20px;"></image>
				<text style="margin-left: 10px;"> 搜索话题</text>
			</view>
		</view>
		<view style="display: flex;">
			<!-- 左侧菜单栏 -->
			<view>
				<view v-for="(item,index) in tab" :key="index" class="tab-style"
					:class="[tabIndex===index ?'nav-active':'',(index + 1 >= 0 && tabIndex===index + 1)?'pre-active':'',(index + 1 >= 0 && tabIndex===index - 1)?'next-active':'']"
					@click="selectTab(item,index)">
					{{item}}
				</view>
			</view>
			<!-- 右边内容 -->
			<view style="flex: 1;">
				<view style="padding: 10px;">
					<image src="../../static/1.jpg" style="width: 100%;height:80px;border-radius: 10px;"></image>
				</view>

				<view style="padding: 10px;">
					<view
						style="display: flex;justify-content: space-between;align-items: center;padding-bottom: 10px;">
						<view style="display: flex;align-items: center;">
							<view style="width: 60px;height: 60px;">
								<image src="../../static/1.jpg" style="width: 100%;
							height: 100%;border-radius: 10px"></image>
							</view>
							<view style="margin-left: 10px;">
								<view>耳钉耳钉</view>
								<view style="font-size: 10px;color: darkgray;margin-top: 5px;">6219耳钉咔</view>
							</view>
						</view>
						<view
							style="background-color: #edf8fe; display: flex;align-items: center;justify-content: center;padding: 6px 15px;border-radius: 15px;color: #3b8eba;">
							加入
						</view>
					</view>
					<view
						style="display: flex;background-color: #f6f6f8;padding: 10px;border-radius: 5px;justify-content: space-between;align-items: center;">
						<view
							style="width: 70%;overflow-x: hidden; text-overflow: ellipsis;font-size: 12px;color: gray;">
							拿变蓝</view>
						<view style="display: flex;">
							<view style="width: 12px;height: 12px;">
								<image src="../../static/comment.png" style="width: 100%;
									height: 100%;border-radius: 10px"></image>
							</view>
							<view style="font-size: 12px;color: gray;margin-left: 5px;margin-right: 10px;">
								15
							</view>
						</view>

					</view>

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
	const tab = ['推荐', '生活情感', '校园', '时尚', '兴趣']
	const tabIndex = ref(0)
	const selectTab = (item, index) => {
		tabIndex.value = index
	}
</script>

<style>
	.search-btn {
		width: 90%;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 10px;
		height: 40px;
		background-color: #f6f5fa;
	}

	.tab-style {
		font-size: 12px;
		height: 20px;
		padding: 10px;
		text-align: center;
		display: flex;
		justify-content: center;
		background-color: #f6f6f8;
		/* border-radius: 0 10px 10px 0; */
	}

	.pre-active {
		/* color: red; */
		border-radius: 0 0 10px 0;
	}

	.next-active {
		border-radius: 0 10px 0 0;
	}

	.nav-active {
		background-color: white;
		color: #2986c5;
	}
</style>
