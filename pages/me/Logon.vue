<template>
	<view style="padding: 10%;">
		<view style="width: ;">
			<view
				style="background-color: #ffffff;padding: 15px;border-radius: 20px;box-shadow:2px 2px 5px 1px rgba(0, 0, 0, 0.1) ;">
				<view style="font-size: 16px;font-weight: bold;">账号:</view>
				<view style="margin-top: 7px;"><input placeholder="请输入账号" v-model="userData.account" /></view>
			</view>
			<view
				style="background-color: #ffffff;padding: 15px;border-radius: 20px;margin-top: 30px;box-shadow:2px 2px 5px 1px rgba(0, 0, 0, 0.1) ;">
				<view style="font-size: 16px;font-weight: bold;">密码:</view>
				<view style="margin-top: 7px;"><input placeholder="请输入密码" v-model="userData.password" type="password" />
				</view>
			</view>
			<view
				style="background-color: #ffffff;padding: 15px;border-radius: 20px;margin-top: 30px;box-shadow:2px 2px 5px 1px rgba(0, 0, 0, 0.1) ;">
				<view style="font-size: 16px;font-weight: bold;">确认密码:</view>
				<view style="margin-top: 7px;"><input placeholder="请输入密码" v-model="userData.passwords"
						type="password" />
				</view>
			</view>
			<view
				style="background-color: #159efe;text-align: center;font-size: 20px;color: white;padding: 10px;border-radius: 20px;margin-top: 30px;"
				@click="signUp">
				注册
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive
	} from 'vue'
	const labelData = [{
		img: '../../static/me-active.png',
		name: ''
	}]
	const userData = reactive({
		account: '',
		password: '',
		passwords: ''
	})
	const signUp = async () => {
		if (userData.password != userData.passwords) {
			uni.showToast({
				title: '两次输入密码不相同',
				duration: 2000
			});
			return
		}
		const infoRes = await uni.getUserProfile({
			desc: 'weixin'
		});
		console.log('数据', userData.account)
		uni.request({
			method: 'POST',
			url: 'http://localhost:3000/users', //仅为示例，并非真实接口地址。
			header: {
				'Content-Type': 'application/json'
			},
			data: {
				account: userData.account,
				password: userData.password,
				userName: infoRes.userInfo.nickName,
				avatarUrl: infoRes.userInfo.avatarUrl
			},
			success: (res) => {
				console.log(res.data);
				uni.navigateBack({
					delta: 1
				});
			},
			fail(err) {
				console.log(res.data);
			}
		});
	}
</script>

<style>
</style>
