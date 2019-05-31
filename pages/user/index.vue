<template>
	<view class="box">
		<view class="ttl_status_bar">
		</view>
		<view class="user_info">
			<view class="user_email">
				<image src="../../static/user/index/xx.png" @click="email_fuc"></image>
			</view>
			<view class="user_info_box">
				<view class="user_face">
					<image :src="user_img"></image>
				</view>
				<view class="user_view">
					<view class="user_view_one">
						{{user_name}}
					</view>
				</view>
			</view>
			<view class="user_info_bottom">
			</view>
		</view>
		<view class="title title_two">
			我的收益
		</view>
		<view class="profit">
			<view class="profit_info">
				<view class="profit_info_one">{{gross_income}}</view>
				<view class="profit_info_two">累计收入</view>
			</view>
			<view class="profit_info">
				<view class="profit_info_one">{{ today_income }}</view>
				<view class="profit_info_two">今日收入</view>
			</view>
			<view class="profit_info">
				<view class="profit_info_one">{{ today_order }}</view>
				<view class="profit_info_two">今日订单</view>
			</view>
		</view>
		<view class="chunck"></view>
		<view class="title">
			基本应用
		</view>
		<view class="store">
			<view class="store_info">
				<navigator url="/pages/user/store"  hover-class="none">
					<view class="store_img">
						<image src="../../static/user/index/dpsz.png" mode=""></image>
					</view>
					<view class="store_title">
						店铺设置
					</view>
				</navigator>
			</view>
			<navigator class="store_info" url="./withdrawMoney" hover-class="none">
				<view class="store_img">
					<image src="../../static/user/index/tx.png" mode=""></image>
				</view>
				<view class="store_title">提现</view>
			</navigator>
			<view class="store_info">
				<navigator url="/pages/user/evaluate" hover-class="none">
					<view class="store_img">
						<image src="../../static/user/index/pjgl.png" mode=""></image>
					</view>
					<view class="store_title">评价管理</view>
				</navigator>
			</view>
			<navigator class="store_info" url="./marketing" hover-class="none">
				<view class="store_img">
					<image src="../../static/user/index/yxgl.png" mode=""></image>
				</view>
				<view class="store_title">营销管理</view>
			</navigator>
		</view>
		<view class="chunck"></view>
		<view class="title">
			我的工具
		</view>
		<view class="tool">
			<view class="tool_info">
				<navigator url="../tool/paycode">
					<view class="tool_img">
						<image src="../../static/user/index/skm.png" mode=""></image>
					</view>
					<view class="tool_title">收款码</view>
				</navigator>
			</view>
			<view class="tool_info">
				<navigator url="../tool/voucher">
					<view class="tool_img">
						<image src="../../static/user/index/yq.png" mode=""></image>
					</view>
					<view class="tool_title">验券</view>
				</navigator>
			</view>
			<view class="tool_info">
				<navigator url="../wares/add_wares">
					<view class="tool_img">
						<image src="../../static/user/index/sptj.png" mode=""></image>
					</view>
					<view class="tool_title">商品添加</view>
				</navigator>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				merchantId: '',
				user_name:'',
				user_img:'',
				gross_income:'',
				today_income:'',
				today_order:'',
				
			}
		},
		onLoad() {
			let that = this;
			uni.getStorage({
				key: 'userinfo',
				success(e) {
					that.merchantId = e.data.id;
					that.getinfo();
					that.getbalance();
					that.getToday_income();
				}
			});
		},
		methods: {
			getinfo: function() {
				var that = this;
				uni.request({
					url: that.serveipd+"/api/merchant/auth/info/"+that.merchantId,
					method: 'GET',
					success: res => {
					let infor=res.data.data;
					that.user_name=infor.name;
					that.user_img=infor.shopTrademarkUrl;
					},
				});
			},
			getbalance: function() {
				var that = this;
				uni.request({ 
					url: that.serveipd + "/api/merchant/money/balance",
					method: 'GET',
					data: {
						merchantId: that.merchantId
					},
					success: res => {
					that.gross_income=res.data.data;
					
					},
					fail: () => {},
					complete: () => {}
				});
			},
			getToday_income:function(){
				let that=this;
				uni.request({
					url:this.serveipd+"/api/merchant/money/day",
					method: 'GET',
					data: {
						merchantId:that.merchantId
					},
					success: res => {
						console.log(res);
							that.today_income=res.data.data.amount.toString();
							that.today_order=res.data.data.nums.toString();
					},
				});
			},
			gostore: function() {
				uni.navigateTo({
					url: '/pages/user/store',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			email_fuc: function() {
				uni.navigateTo({
					url: '/pages/user/msgcenter',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
		},
	}
</script>

<style>
	page {
		width: 100%;
		background: #FFF;
		padding-top: var(--status-bar-height);
	}

	.ttl_status_bar {
		position: fixed;
		top: 0;
		left: 0;
		background: linear-gradient(to right, #F26B06, #EE6008);
	}

	.box {
		width: 100%;
		overflow: hidden;
	}

	/*************自定义标题栏**************/
	.ttl_nav {
		height: 69px;
		background: linear-gradient(to right, #F26B06, #EE5F08);
		width: 100%;
		position: fixed;
		left: 0;
		top: 0;
	}

	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}

	/*************用户信息**************/
	.user_info {
		width: 100%;
		background: linear-gradient(90deg, rgba(245, 115, 5, 1) 0%, rgba(235, 86, 9, 1) 100%);
		padding-top: 2rem;
		box-sizing: border-box;
		overflow: hidden;
	}

	.user_info_box {
		width: 100%;
		display: flex;
		flex-direction: row;
	}

	.user_face {
		width: 6rem;
		display: flex;
		justify-content: center;
	}

	.user_face image {
		width: 3.74rem;
		height: 3.74rem;
		border-radius: 100%;
	}

	.user_view {
		width: 8rem;
	}

	.user_view_one {
		width: 100%;
		height: 1.8rem;
		line-height: 2rem;
		color: #fff;
		font-size: 40upx;
		font-weight: bold;
		font-weight: 600;
	}

	.user_view_two {
		width: 100%;
		height: 1.8rem;
		line-height: 1.6rem;
		color: #fff;
		font-size: 24upx;
	}

	.title {
		width: 100%;
		height: 2.5rem;
		line-height: 2.5rem;
		font-weight: bold;
		color: rgba(51, 51, 51, 1);
		font-size: 30upx;
		padding-left: 1rem;
		border-bottom: 1px solid rgba(238, 238, 238, 1);
	}

	.title_two {
		height: 1.5rem;
		line-height: 0.8rem;
	}

	.user_email {
		width: 100%;
		display: flex;
		justify-content: flex-end;
	}

	.user_email image {
		width: 1.5rem;
		height: 1rem;
		margin-right: 1rem;
	}

	.user_info_bottom {
		width: 100%;
		margin-top: 1rem;
		height: 1rem;
		background-color: #fff;
		border-top-left-radius: 0.5rem;
		border-top-right-radius: 0.5rem;
	}

	/**************灰块****************/
	.chunck {
		width: 100%;
		height: 0.5rem;
		background: rgba(238, 238, 238, 1);
	}

	/***************我的收益*******************/
	.profit {
		width: 100%;
		display: flex;
		justify-content: flex-start;
	}

	.profit_info {
		width: 33.3%;
		overflow: hidden;
		box-shadow: border-box;
	}

	.profit_info_one {
		height: 2rem;
		line-height: 2.5rem;
		color: #333333;
		font-weight: bold;
		font-size: 36upx;
		margin-top: 0.5rem;
	}

	.profit_info_two {
		height: 2rem;
		line-height: 1.5rem;
		color: #333333;
		font-size: 26upx;
		margin-bottom: 0.5rem;
	}

	.profit_info view {
		text-align: center;
	}

	.store {
		width: 100%;
		display: flex;
		justify-content: flex-start;
	}

	.store_info {
		width: 25%;
	}

	.store_img {
		width: 2rem;
		height: 2rem;
		border-radius: 100%;
		margin: 1rem auto 0;

	}

	.store_img image {
		width: 100%;
		height: 100%;
	}

	.store_title {
		width: 100%;
		text-align: center;
		height: 1rem;
		font-size: 26upx;
		font-weight: 400;
		color: rgba(51, 51, 51, 1);
		line-height: 1rem;
		margin-top: 0.3rem;
		margin-bottom: 1rem;
	}

	.tool {
		width: 100%;
		display: flex;
		justify-content: flex-start;
		padding-top: 1rem;
		margin-bottom: 4rem;
	}

	.tool_info {
		width: 4rem;
		margin-left: 2rem;
	}

	.tool_img {
		width: 100%;
		height: 2rem;
		display: flex;
		justify-content: center;
	}

	.tool_img image {
		width: 2rem;
		height: 2rem;
	}

	.tool_title {
		width: 100%;
		height: 1rem;
		font-size: 26upx;
		font-weight: 400;
		color: rgba(51, 51, 51, 1);
		line-height: 1rem;
		text-align: center;
		margin-top: 0.5rem;
	}
</style>
