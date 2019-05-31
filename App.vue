<script>
	export default {
		data() {
			return {}
		},
		onLaunch: function() {

		},
		onReady: function() {},
		onShow: function() {

		},
		onHide: function() {},
	}
</script>

<style>
	/*每个页面公共css */

	page {
		font-family: 'PingFang-SC-Regular';
	}

	.navigation {
		width: 100%;
		color:#fff;
		background: #ED721F;
		position: fixed;
		z-index: 999999;
		display: flex;
		line-height: 80px;
		justify-content: space-between;
		text-align: center;
	}
	.navigation .left{
		width: 20%;
		height: 100%;
	}
	.navigation .title{
		width: 60%;
	}
	.navigation .right{
		width: 20%;
	}
	.navigation image {
		width: 16upx;
		height: 30upx;
		vertical-align: middle;
	}

	.navigation{
		color: #fff;
	/* 	display: block; */
		font-size: 30.55upx;
	}

	@font-face {
		font-family: 'iconfont';
		src: url('common/iconfont.ttf') format('truetype');
	}

	/*每个页面公共css */
	.ttl_left_iconfont {
		font-family: 'iconfont';
		color: #FFFFFF;
		font-size: 27px;
		min-width: 1em;
		margin-left: 5px;
		display: inline-block;
	}

	.iconfont {
		font-family: 'iconfont';
		color: #FFFFFF;
		font-size: 27px;
		min-width: 1em;
		margin-left: 5px;
		display: inline-block;
	}

	.ttl_view {
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 9999999;
	}

	.ttl_status_bar {
		width: 100%;
		height: var(--status-bar-height);
		background-color: #ED721F;
	}

	.ttl_head {
		width: 100%;
		height: 44px;
		background-color: #ED721F;
		line-height: 44px;
		display: flex;
		justify-content: space-between;
	}

	.ttl_left {
		width: 20%;
	}

	.ttl_head_title {
		width: 60%;
		font-weight: 700;
		text-align: center;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		color: #FFFFFF;
		font-size: 16px;
	}

	.ttl_right {
		width: 20%;
	}

	.ttl_right_btn {
		color: #fff;
		min-width: 1em;
		text-align: center;
		font-size: 16px;
	}
</style>
