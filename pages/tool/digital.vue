<template>
	<view>
		<view class="ttl_view">
			<view class="ttl_status_bar">
			</view>
			<view class="ttl_head">
				<view class="ttl_left">
					<view class="ttl_left_iconfont" @click="back">&#xe60a;</view>
				</view>
				<view class="ttl_head_title">数字验证</view>
				<view class="ttl_right">
				</view>
			</view>
		</view>
		<!-- 设备状态栏+顶部导航栏的高度 -->
		<view :style="{ height: windowHeight + 'px' }"></view>
		<view class="chunck"></view>
		<view class="title">
			请输入购券码
		</view>
		<div class="pw">
			<view class="input_box">
				<view type="text"  maxlength="1">{{pone}}</view>
				<view type="text"  maxlength="1">{{ptwo}}</view>
				<view type="text"  maxlength="1">{{pthree}}</view>
				<view type="text"  maxlength="1">{{pfour}}</view>
				<view type="text"  maxlength="1">{{pfive}}</view>
				<view type="text"  maxlength="1">{{psix}}</view>
			</view>
			<view class="v_input">
				<input type="text" maxlength="6" @input="pwinput">
			</view>
		</div>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				pone:'',
				ptwo:'',
				pthree:'',
				pfour:'',
				pfive:'',
				psix:'',
				pnum:'',
				id:'',
				windowHeight: '',
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
				
			},
			back: function() {
				uni.navigateBack({
					delta: 1
				});
			},
			pwinput:function(e){
				var that=this;
				that.pnum=e.target.value;
				that.pone=that.pnum.slice(0,1);
				that.ptwo=that.pnum.slice(1,2);
				that.pthree=that.pnum.slice(2,3);
				that.pfour=that.pnum.slice(3,4);
				that.pfive=that.pnum.slice(4,5);
				that.psix=that.pnum.slice(5,6);
				if(that.pnum.length==6){
					uni.request({
						url: that.serveipd+'/api/merchant/money/checkTicket',
						method: 'POST',
						header: {
						'content-type': 'application/x-www-form-urlencoded',
						},
						data: {
							merchantId:that.id,
							ticketNo:that.pnum,
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
			}
		}
	}
</script>
	
<style>
	@import "../../common/tool/digital.css";
	
</style>
