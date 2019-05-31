<template>
	<view>
		<!-- 头部导航 -->
		<view class='navigation' :style="{height:height}">
			<navigator class="left" open-type="navigateBack" hover-class="none">
				<image src="../../static/Merchan_registration/back.png" mode=""></image>
			</navigator>
			<view class="title">上传店铺商标</view>
			<view class="right"></view>
		</view>
		<view class="content" :style="{paddingTop:height}">
			<image @tap="add_logo" :src="logo_src" mode="aspectFit"></image>
			<button class="bt" type="primary" @tap="upload">上传</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				height: '',
				logo_src: '../../static/user/sczt.png',
				logo_id: '',
				merchantId:'',
			}
		},
		onLoad() {
			let that = this;
			uni.getStorage({
				key: 'userinfo',
				success(e) {
					that.merchantId = e.data.id;
					that.getInfor();
				}
			});
		},
		onReady() {
			this.getTopheight();
		},
		methods: {
			getTopheight: function() {
				let that = this;
				uni.getSystemInfo({
					success(res) {
						that.height = res.statusBarHeight + 44 + "px";
					}
				})
			},
			add_logo: function() {
				uni.chooseImage({
					count: 1, //默认9
					sizeconfirmtype: ['original', 'compressed'],
					success: (res) => {
						this.logo_src = res.tempFilePaths[0];
					}
				})
			},
			upload: function() {
				let that = this;
				if (that.logo_src != "../../static/user/sczt.png") {
					uni.showLoading({
						title: '',
						mask: false
					});
					uni.uploadFile({
						url: that.serveipd + "/ajax/upfile",
						filePath: that.logo_src,
						name: 'upfile',
						formData: {},
						success: (uploadFileRes) => {
							that.logo_id = parseInt((JSON.parse(uploadFileRes.data).id));
							uni.hideLoading();
							uni.showToast({
								title: '上传成功',
								icon: "none",
								mask: false,
								duration: 1500,
								success() {
									setTimeout(function() {
										uni.redirectTo({
											url: "./basicinfo?logo_id=" + that.logo_id
										})
									}, 1500);
								}
							});
						},
					});
				} else {
					uni.showToast({
						title: '请选择商户商标',
						icon: "none"
					});
				}
			},
			getInfor: function() {
				let that=this;
				uni.request({
					url: this.serveipd + "/api/merchant/auth/info/" +that.merchantId,
					method:"GET",
					success(res) {
						console.log(res.data.shopTrademark);
						if(res.data.shopTrademark!=''){
							that.logo_src=res.data.shopTrademark;
						};
						
					}
				})
			}
		}
	}
</script>

<style>
	.content image {
		display: block;
		margin: 100upx auto;
		width: 50vw;
		height: 50vw;
	}

	.bt {
		width: 90vw;
		background: rgb(237, 114, 31) !important;
	}
</style>
