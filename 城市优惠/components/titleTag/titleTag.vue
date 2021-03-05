<template>
	<view class="page-block super-hot">
		<view class="hot-title-wapper">
			<image :src="icon" class="icon-tip"></image>
			<view class="hot-title">{{title}}</view>
		</view>
		<slot></slot>
	</view>
</template>

<script>
	export default {
		name:'titleTag',
		props:{
			title: {
				type: String,
				default: ''
			},
			icon:{
				type: String,
				default: '../../static/icons/hot.png'
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style>
	.super-hot {
		margin-top: 20rpx;
		padding: 20rpx;
		box-sizing: border-box;
	}
	.hot-title-wapper {
		display: flex;
		flex-direction: row;
		margin-bottom: 20rpx;
	}
	.hot-title {
		font-size: 20px;
		margin-left: 20rpx;
		font-weight: 600;
	}
	.icon-tip {
		height: 30rpx;
		width: 30rpx;
		padding-top: 10rpx;
	}
</style>
