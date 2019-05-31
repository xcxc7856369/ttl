<template>
	<view>
		<view>
			<image></image>
		</view>
		<view>
			<navigator url="/pages/user/outdoor">外景</navigator>
		</view>
		<view>
			<image></image>
		</view>
		<view>
			<navigator>内景</navigator>
		</view>
		<view>
			<image></image>
		</view>
		<view>
			<navigator>其他</navigator>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				uinfo:{
					id:'',
				}
			}
		},
		onLoad() {
			var that=this;
			uni.getStorage({
				key:'userinfo',
				success:function(res){
					that.uinfo.id=res.data.id;
					that.getalbum();
				}
			});
		},
		methods:{
			getalbum:function(){
				var that=this;
				uni.request({
					url: that.serveipd+"/api/merchant/photo/photos",
					method: 'GET',
					data: {
						merchantId:that.uinfo.id,
					},
					success: res => {
						console.log(res.data);
					},
					fail: () => {},
					complete: () => {}
				});
			}
		},
	}
</script>

<style>
</style>
