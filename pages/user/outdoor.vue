<template>
	<view>
		<view>
			<block v-for="(image,index) in imagelist" :key="index">
				<view>
					<image :src="image" mode=""></image>
				</view>
			</block>
		</view>
		<view class="uni-uploader__input" @tap="chooseImage">选择图片</view>
		<view class="uni-uploader__input" @tap="upload">上传图片</view>
		<view class="example">
			<button type="button" @click="togglePopup('middle')">居中弹出 popup</button>
			<uni-popup :show="type === 'middle'" position="middle" mode="fixed" :msg="msg" @hidePopup="togglePopup('')"></uni-popup>
		</view>
	</view>
</template>

<script>
	import {uniPopup} from "@/components/uni-popup/uni-popup.vue"
	export default{
		components: {uniPopup},
		data(){
			return{
				imagelist:[],
				imginfo:'',
				imgid:[],
				type: '',
				msg:'上传中，等稍等',
			}
		},
		onLoad() {
			
		},
		methods: {
// 			import { pathToBase64, base64ToPath } from '../../js/image-tools/index.js',
// 			pathToBase64(path)
// 			.then(base64 => {
// 				console.log(base64)
// 			})
// 			.catch(error => {
// 				console.error(error)
// 			})
			chooseImage:function(){
				var that=this;
				uni.chooseImage({
					sourceType: ['album', 'camera'],
					sizeType: ['original'],
					success:(res) => {
						that.imagelist = that.imagelist.concat(res.tempFilePaths);
					}
				})
			},
			upload:function(){
				var that=this;
			
				for(var i=0;i<that.imagelist.length;i++){
					uni.uploadFile({
						url: that.serveipd + '/ajax/upfile', //仅为示例，非真实的接口地址
						filePath: that.imagelist[i],
						name: 'upfile',
						formData: {  
						},
						success: (uploadFileRes) => {
							that.imgid.push(JSON.parse(uploadFileRes.data).id);
							console.log(that.imgid);
							that.togglePopup('middle');
							if(that.imgid.length == that.imagelist.length){
								that.msg='上传完成';
							}
						}
					});
				
				 }
			}
		},
	}
</script>

<style>
</style>
