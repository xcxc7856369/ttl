<template>
	<view class="box">
		<view class="ttl_view">
			<view class="ttl_status_bar">
			</view>
			<view class="ttl_head">
				<view class="ttl_left">
					<view class="ttl_left_iconfont" @click="back">&#xe60a;</view>
				</view>
				<view class="ttl_head_title">评价管理</view>
				<view class="ttl_right">
				</view>
			</view>
		</view>
		<!-- 设备状态栏+顶部导航栏的高度 -->
		<view :style="{ height: windowHeight + 'px' }"></view>
		<view class="evaluate" v-for="(item,index) in infor" :key="index">
			<view class="eval" >
				<view class="e_left">
					<image :src="item.headpicUrl" mode=""></image>
				</view>
				<view class="e_right">
					<view class="e_name">
						<view>{{ item.customerName }}</view>
						<text>{{ item.createTime }}</text>
					</view>
					<uni-rate :size="16" :value="item.star"  @change="onChange" disabled="true"></uni-rate>
					<view class="con">{{ item.content }}</view>
					<view  class="imglist">
						<image :src="img" v-for="(img,i) in item.imageUrls" :key="i"></image>
					</view>
					<view class="e_ope">
						<view class="agree">
							<image src="../../static/user/evaluate/heart.png" ></image>
							<view>{{ item.praiseNum }}</view>
						</view>
						<view class="reply" @tap="answer(item.id)">
							回复评价
						</view>
					</view>
					<view class="busreply" v-if="item.reply">
						<text>我的回复：</text><text>{{ item.reply}}</text>
					</view>
				</view>
			</view>	
		</view>
		<view class="replyContent" v-show="tg"><input type="text" placeholder="此处回复" :focus="focusing" confirm-type="回复" @confirm="complete()"  v-model="reply"></view>
	</view>
</template>

<script>
	import uniRate from '../../components/uni-rate/uni-rate.vue'
	export default{
		components: {
			uniRate
		},
		data(){
			return{
				windowHeight: '',
				infor:'',
				id:'',
				tg:false,
				focusing:false,
				order_id:'',
				reply:'',
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
				let that=this;
				uni.request({
					url: this.serveipd+'/api/merchant/comment/comments',
					method: 'GET',
					data: {
						merchantId:that.id
					},
					success: res => {
						that.infor=res.data.data.datas;
						console.log(that.infor);
					},
					fail: () => {},
					complete: () => {}
				});
			},
			onChange(e) {
				console.log('rate发生改变:' + JSON.stringify(e));
			},
			answer:function(id){
				let that=this;
				that.tg=true;
				that.focusing=true;
				that.order_id=id;
			},
			complete:function(){
				let that=this;
				uni.request({
					url:that.serveipd+"/api/merchant/comment/comment/"+that.order_id+"/reply",
					header: {
						'Content-type': 'application/x-www-form-urlencoded'
					},
					method:"POST",
					data:{
						reply:that.reply
					},
					success(res) {
						that.tg=false;
						that.getinfo();
					}
				})
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
	@import "../../common/user/evaluate.css";
</style>
