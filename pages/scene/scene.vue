<template>
	<view>
		<!-- 头部导航 -->
		<view class='navigation' :style="{height:height}">
			<navigator class="left" open-type="navigateBack" hover-class="none">
				<image src="../../static/Merchan_registration/back.png" mode=""></image>
			</navigator>
			<view class="title">店铺实景</view>
			<view class="right" @tap="preserve">上传</view>
		</view>
		<view class="content" :style="{paddingTop:height}">
			<view class="banner">
				<view class="ban_video" v-if="state">
					<video :src="video"></video>
				</view>
				<swiper class="ban_img" scroll-x="true" v-else>
					<swiper-item v-for="(image,index) in imagelist" :key="index">
						<image :src="image" mode="aspectFit"></image>
					</swiper-item>
				</swiper>
			</view>
			<view class="ban_btn">
				<view @tap="state=true" :class="state?'video_btn_c':'video_btn'">视频</view>
				<view @tap="state=false" :class="state?'img_btn':'img_btn_c'">图片</view>
			</view>
			<view class="imgbox">
				<view class="video" @tap="sub_video()">
					<video :src="video" v-if="video!=''"></video>
					<image src="../../static/scene/del_img.png" class="del_img" @tap="del_vieo" :key="index"></image>
					<image src="../../static/scene/upimg.png" class="upimg" v-if="video==''"></image>
				</view>
				<view v-for="(image,index) in imagelist" :key="index">
					<view class="img_view">
						<image src="../../static/scene/del_img.png" class="del_img" @tap="del_img(index)" :key="index" mode="aspectFit"></image>
						<image :src="image" class="upimg"></image>
					</view>
				</view>
				<view @tap="chooseImage" class="img_view">
					<image src="../../static/scene/upimg.png" class="upimg"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				state: true,
				imagelist: [],
				imgid: [],
				upid: '',
				id: '',
				windowHeight: '',
				imgshow: '',
				video: '',
				video_id: '',
				new_img: [],
				old_id: [],
				height: '',
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
			sub_video: function() {
				let that = this;
				// #ifdef APP-PLUS
				plus.gallery.pick(
					function(path) {
						that.video = path;
						uni.showLoading({
							title: "视频上传中"
						});
						uni.uploadFile({
							url: that.serveipd + '/ajax/upfile', //仅为示例，非真实的接口地址
							filePath: path,
							name: 'upfile',
							formData: {},
							success: (res) => {
								uni.hideLoading()
								that.video_id = JSON.parse(res.data).id;
							}
						});
					},
					function(e) {

					}, {
						filter: "video",
						multiple: false,
					}
				);
				// #endif
			},
			getinfo: function() {
				var that = this;
				uni.request({
					url: that.serveipd + '/api/merchant/auth/info/' + that.id,
					method: 'GET',
					data: {
						id: that.id,
					},
					success: res => {
						that.video = res.data.data.otherProvePicUrls[0];
						if (that.video != undefined) {
							that.video_id = that.video.slice(-4);
						}
						var picurl = res.data.data.inPicUrls;
						for (var i = 0; i < picurl.length; i++) {
							that.imagelist.push(picurl[i]);
						}
						that.old_id = that.imagelist;
					},
				});
			},
			video_fuc: function() {
				this.state = true;
			},
			img_fuc: function() {
				this.state = false;
			},
			chooseImage: function(e) {
				var that = this;
				let img = [];
				uni.chooseImage({
					sourceType: ['album', 'camera'],
					sizeType: ['original'],
					success: (res) => {
						that.new_img = that.new_img.concat(res.tempFilePaths);
						img = img.concat(res.tempFilePaths);
						that.imagelist = that.imagelist.concat(img);
					}
				})
			},
			del_img: function(e) {
				var that = this;
				that.imagelist.splice(e, 1);
				that.old_id.splice(e, 1);
			},
			del_vieo: function() {
				this.video = '';
				console.log(1);
				this.video_id = '';
				console.log(this.video);
			},
			back: function() {
				uni.navigateBack({
					delta: 1
				});
			},
			// 上传
			preserve: function(e) {
				var that = this;
				uni.showLoading({})
				let arr = [];
				for (let i = 0; i < that.old_id.length; i++) {
					let id = '';
					id = that.old_id[i].slice(-4);
					arr.push(id);
				};
				console.log(1);
				if (that.new_img.length == 0) {
					uni.request({
						url: this.serveipd + '/api/merchant/photo/add',
						method: 'POST',
						header: {
							'content-type': 'application/x-www-form-urlencoded',
						},
						data: {
							image: arr,
							merchantId: parseInt(that.id),
							type: parseInt(1),
							videos: that.video_id,
						},
						success: res => {
							uni.hideLoading()
							uni.redirectTo({
								url: "../user/index"
							});
						},
					});
				} else {
					for (var i = 0; i < that.new_img.length; i++) {
						uni.uploadFile({
							url: that.serveipd + '/ajax/upfile', //仅为示例，非真实的接口地址
							filePath: that.new_img[i],
							name: 'upfile',
							formData: {},
							success: (uploadFileRes) => {
								that.imgid.push(JSON.parse(uploadFileRes.data).id);
								if (that.imgid.length == that.new_img.length) {
									that.upid = that.imgid.concat(arr).toString();
									uni.request({
										url: this.serveipd + '/api/merchant/photo/add',
										method: 'POST',
										header: {
											'content-type': 'application/x-www-form-urlencoded',
										},
										data: {
											image: that.upid,
											merchantId: parseInt(that.id),
											type: parseInt(1),
											videos: that.video_id,
										},
										success: res => {
											uni.hideLoading()
											uni.redirectTo({
												url: "../user/index"
											});
										},
									});
								}
							}
						});

					}
				}

			}
		}
	}
</script>

<style>
	@import '../../common/scene/scene.css';

	.box {
		width: 100%;
	}

	.video {
		width: 5.95rem;
		height: 5.97rem;
		margin-top: 0.5rem;
		position: relative;
	}

	video {
		width: 100%;
		height: 100%;
	}
</style>
