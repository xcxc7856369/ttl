<template>
	<view>
		<view class="ttl_view">
			<view class="ttl_status_bar">
			</view>
			<view class="ttl_head">
				<view class="ttl_left">
					<view class="ttl_left_iconfont" @click="back">&#xe60a;</view>
				</view>
				<view class="ttl_head_title">团购券验证记录</view>
				<view class="ttl_right">
					<i class="iconfont">&#xe612;</i>
					<view class="ttl_right_btn" @tap="preserve">完成</view>
				</view>
			</view>
		</view>
		<!-- 设备状态栏+顶部导航栏的高度 -->
		<view :style="{ height: windowHeight + 'px' }"></view>
		<view class="couview">
			<view class="fast" @tap="fastdel">
				<i class="iconfont lightning">&#xe62f;</i>
				<view>快速清理</view>
			</view>
			<view class="cou_del" @tap="del">
				删除
			</view>
		</view>
		<view class="uni-list">
			<checkbox-group @change="checkboxChange">
				<label class="labe_list" v-for="cou in coupon" :key="cou.value">
					<view class="info">
						<view>团购券码：{{cou.name}} </view>
						<view>验证时间：{{cou.usedTime}}</view>
					</view>
					<view class="checkview">
						<checkbox :value="cou.name"  :checked="cou.checked"/>
					</view>
				</label>
			</checkbox-group>
		</view>
	</view>
</template>
<script>
	export default{
		data(){
			return{
				windowHeight: '',
				id:'',
				coupon:[],
				del_id:[],
			}
		},
		onLoad() {
			var that = this;
			that.windowHeight = this.statusBarHeight + 44;
			uni.getStorage({
				key: 'userinfo',
				success: function(res) {
					that.id = res.data.id;
					that.getinfo();
				}
			})
		},
		methods:{
			getinfo:function(){
				var that=this;
				uni.request({
					url: this.serveipd + "/api/merchant/money/groupTickets",
					method: 'GET',
					data: {
						merchantId:that.id,
					},
					success: res => {
						that.coupon = res.data.data.datas;
					},
					fail: () => {},
					complete: () => {}
				});
			},
			checkboxChange: function (e) {
				var items = this.coupon,
					values = e.detail.value;
					console.log(items);
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					const item = items[i]
					if(values.includes(item.name)){
						this.$set(item,'checked',true)
					}else{
						this.$set(item,'checked',false)
					}
				}
			},
			fastdel:function(){
				console.log(this.coupon);
				var that=this;
				var items = this.coupon;
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					const item = items[i]
					this.$set(item,'checked',true);
				}
				
			},
			del:function(){
				var that=this;
				that.del_id=[];
				var items = this.coupon;
				console.log(items);
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					const item = items[i]
					if(item.checked == true){
						that.del_id=that.del_id.concat(item.id);
					}
				}
				if(that.del_id.length==0){
					uni.showToast({
						title: '请选择要删除的记录',
						icon:'none',
						mask: false,
						duration: 1500
					});
				}else{
					uni.request({
						url: this.serveipd+"/api/merchant/money/groupTicket/delete",
						method: 'GET',
						header: {
							'content-type': 'application/x-www-form-urlencoded',
						},
						data: {
							arrs:that.del_id.toString(),
						},
						success: res => {
							uni.showToast({
								title: res.data.msg,
								icon:'none',
								mask: false,
								duration: 1500
							});
							that.getinfo();
						},
						fail: () => {},
						complete: () => {}
					});
				}

			},
			back: function() {
				uni.navigateBack({
					delta: 1
				});
			},
			preserve:function(){
				uni.navigateBack({
					delta: 1
				});
			}
		}
	}
</script>

<style>
	@import "../../common/tool/couponrecord";
</style>
