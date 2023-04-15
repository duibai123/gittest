<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "/wxcomponents/dist/common/index.wxss";

	page {
		background-color: #f4f4f4;
		font-size: 14px;

	}

	view {
		box-sizing: border-box;
	}
</style>
