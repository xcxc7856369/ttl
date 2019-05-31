<template>
	<view>
		<view class="ttl_view">
			<view class="ttl_status_bar">
			</view>
			<view class="ttl_head">
				<view class="ttl_left">
					<view class="ttl_left_iconfont" @click="back">&#xe60a;</view>
				</view>
				<view class="ttl_head_title">二维码验证</view>
				<view class="ttl_right">
				</view>
			</view>
		</view>
		<!-- 设备状态栏+顶部导航栏的高度 -->
		<view :style="{ height: windowHeight + 'px' }"></view>
		<view class="chunck"></view>
		<view class="info">
			<navigator url="/pages/tool/digital" class="info_url">
				<text>数字验证</text>
				<uni-icon size="20" type="arrowright" color="#999999"></uni-icon>
			</navigator>
		</view>
		<view class="info">
			<navigator url="/pages/tool/qrcode" class="info_url">
				<text>二维码验证</text>
				<uni-icon size="20" type="arrowright" color="#999999"></uni-icon>
			</navigator>
		</view>
		<view class="info">
			<navigator url="/pages/tool/coupon" class="info_url">
				<text>验券记录</text>
				<uni-icon size="20" type="arrowright" color="#999999"></uni-icon>
			</navigator>
		</view>
	</view>
</template>

<script>
	import uniIcon from '@/components/uni-icon/uni-icon.vue'
	export default{
		components: {
			uniIcon
		},
		data(){
			return{
				windowHeight: '',
			}
		},
		onLoad() {
			var that = this;
			that.windowHeight = this.statusBarHeight + 44;
		},
		methods:{
			back: function() {
				uni.navigateBack({
					delta: 1
				});
			},
		}
	}
</script>

<style>
	.chunck{
		width:100%;
		height:0.5rem;
		background:rgba(238,238,238,1);
	}
	.info{
		width:100%;
		display: flex;
		justify-content:space-between;
		border-bottom: 1px solid #EEEEEE;
	}
	.info_url{
		width: 100%;
		display:flex;
		justify-content:space-between;
		height: 2.5rem;
		line-height: 2.5rem;
	}
	.info_url text{
		margin-left: 1rem;
		font-size:27upx;
		color: #333333;
	}
	.info_url .uni-icon{
		margin-right: 1rem;
		margin-top:0.7rem;
	}
</style>
