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
	</view>
</template>

<script>
	export default{
		data(){
			return{
				id:'',
				qr:'',
				windowHeight:'',
			}
		},
		onLoad() {
			var that=this;
			that.windowHeight = this.statusBarHeight + 44;
			uni.getStorage({
				key:'userinfo',
				success:function(res) {
					that.id=res.data.id;
					that.getinfo();
				}
			})
		},
		methods:{
			getinfo:function(){
			var that = this;
			// 只允许通过相机扫码
			uni.scanCode({
				
				onlyFromCamera: true,
				success: function (scan) {
					console.log('条码类型：' + scan.scanType);
					console.log('条码内容：' + scan.result);
					that.qr=scan.result;
					
					uni.request({
						url: that.serveipd+'/api/merchant/money/checkTicket',
						method: 'POST',
						header: {
						'content-type': 'application/x-www-form-urlencoded',
						},
						data: {
							merchantId:that.id,
							ticketNo:that.qr,
						},
						success: res => {
							console.log(res.data);
							uni.showToast({
								title: res.data.msg,
								icon: 'none',
								mask: false,
								duration: 1500
							});
							if(res.data.code == 0){
								uni.navigateTo({
									url: '/pages/tool/success',
									success: res => {},
									fail: () => {},
									complete: () => {}
								});
							}else{
								uni.navigateTo({
									url: '/pages/tool/fail?mes='+res.data.msg,
									success: res => {},
									fail: () => {},
									complete: () => {}
								});
							}
								
							
						},
						fail: () => {},
						complete: () => {}
					});
				}
				});
			},
			back: function() {
				uni.navigateBack({
					delta: 1
				});
			},
		}
	}
</script>

<style>
</style>
