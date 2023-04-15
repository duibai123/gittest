<template>
	<!-- 登录成功显示页面 -->
	<view v-if="userInfo.data">
		<view class="top-background">
			<view>
				<view style="width: 50px;height: 50px;">
					<image :src="userInfo.data.avatarUrl" style="width: 100%;height: 100%;border-radius: 50%;"></image>
				</view>
				<view>{{userInfo.data.userName}}</view>
				<view @click="signOut"
					style="border-radius: 18px;background-color: #149dfe;font-size: 13px;align-items: center;display: flex;justify-content: center;color: white;padding: 3px 10px;margin: 10px 0 0 -10px;">
					退出登录</view>
			</view>
		</view>
	</view>
	<view v-else style="padding: 10%;">
		<view style="width: ;">
			<view
				style="background-color: #ffffff;padding: 15px;border-radius: 20px;box-shadow:0px 0px 10px 1px rgba(0, 0, 0, 0.1) ;">
				<view style="font-size: 16px;font-weight: bold;">账号:</view>
				<view style="margin-top: 7px;"><input placeholder="请输入账号" v-model="userData.account" /></view>
			</view>
			<view
				style="background-color: #ffffff;padding: 15px;border-radius: 20px;margin-top: 30px;box-shadow:0px 0px 10px 1px rgba(0, 0, 0, 0.1) ;">
				<view style="font-size: 16px;font-weight: bold;">密码:</view>
				<view style="margin-top: 7px;"><input placeholder="请输入密码" v-model="userData.password" type="password" />
				</view>
			</view>
			<button
				style="background-color: #159efe;text-align: center;font-size: 20px;color: white;padding: 10px;border-radius: 20px;margin-top: 30px;"
				@tap="getUserinfo">
				登录
			</button>
			<view style="display: flex;justify-content: space-between;margin-top: 30px;">
				<view style="font-size: 16px;color: dimgray;" @click="logon">注册</view>
				<view style="font-size: 16px;color: dimgray;">忘记密码？</view>
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
		setStorage,
		getStorage
	} from '../../utils/helpers/storage.js'
	const labelData = [{
		img: '../../static/me-active.png',
		name: ''
	}]
	const userData = reactive({
		account: '',
		password: '',
		passwords: ''
	})
	const userInfo = reactive({
		data: getStorage('userInfo')
	})
	const onInput = () => {
		consol.log('输入了值')
	}
	const logon = () => {
		uni.navigateTo({
			url: './Logon'
		})
	}
	const getUserinfo = async () => {
		const infoRes = await uni.getUserProfile({
			desc: 'weixin'
		});
		console.log('infoRes', infoRes)
		signIn(infoRes)
	}

	const signIn = (infoRes) => {
		console.log('调用了登录方法')
		uni.request({
			method: 'GET',
			url: 'http://localhost:3000/users', //仅为示例，并非真实接口地址。
			header: {
				'Content-Type': 'application/json'
			},
			data: {
				account: userData.account,
				password: userData.password
			},
			success: (res) => {
				console.log(res.data);
				if (res.data.length) {
					setStorage('userInfo', {
						...res.data[0]
						// ...userInfo
					})
					console.log(res.data)
					setTimeout(() => {
						userInfo.data = getStorage('userInfo')
						userData.account = '';
						userData.password = ''
					}, 100)
				} else {
					uni.showToast({
						icon: "none",
						title: '账号密码不正确',
						duration: 2000
					});
				}
			},
			fail: (err) => {
				console.log(res.data);
			}
		});
	}
	const signOut = () => {
		setStorage('userInfo', '')
		setTimeout(() => {
			userInfo.data = getStorage('userInfo')
		}, 200)
	}
</script>

<style>
	.top-background {
		width: 100%;
		height: 230px;
		background: url('../../static/backgroundImg.jpg') no-repeat;
		background-position: center;
		background-size: cover;
		background-repeat: no-repeat;
		display: flex;
		align-items: center;
		justify-content: center;

	}
</style>
