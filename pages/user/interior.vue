<template>
	<view>
		<view class="uni-uploader__file">
			<image class="uni-uploader__img" :src="image"></image>
		</view>
		<view class="uni-uploader__input-box">
			<view class="uni-uploader__input" @tap="chooseImage">上传图片</view>
		</view>
		<view @tap="sc">点击上传</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				image: '',
				imageinfo:'',
			}
		},
		onUnload() {

		},
		methods: {
			chooseImage: async function() {
				uni.chooseImage({
					sourceType: ['album', 'camera'],
					sizeType: ['original'],
					count: 1,
					success: (chooseImageRes) => {
						console.log(JSON.stringify(chooseImageRes.tempFilePaths));
						this.image = chooseImageRes.tempFilePaths;
						this.imageinfo= chooseImageRes.tempFilePaths;
						const tempFilePaths = chooseImageRes.tempFilePaths;
						
					}
				})
			},
			sc: function() {
				uni.uploadFile({
					url: this.serveipd + '/ajax/upfile', //仅为示例，非真实的接口地址
					filePath: this.imageinfo[0],
					name: 'upfile',
					formData: {
					     
					},
					success: (uploadFileRes) => {
						console.log(uploadFileRes.data.id);
					}
				});
				
			},
			
		}
	}
</script>

<style>
</style>
