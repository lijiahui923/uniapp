<template>
	<view class="page">
		<swiper
			class="swiper"
			:indicator-dots="true"
			:autoplay="true">
			<swiper-item v-for="item in swiperList">
				<image :src="item" class="swiper"></image>
			</swiper-item>
		</swiper>
		<!-- 热门超英 -->
		<view class="page-block super-hot">
			<view class="hot-title-wapper">
				<image src="../../static/icons/hot.png" class="icon-tip"></image>
				<view class="hot-title">热门超英</view>
			</view>
			<scroll-view class="hot-scroll" scroll-x="true" scroll-left="120">
				<view class="single-poster" v-for="item in newMovie">
					<view class="poster-wapper">
						<image :src="item.images.small" class="poster"/>
						<view class="movie-name">
							{{item.title}}
						</view>
						<trailerStars :innerScore="item.rating.average"></trailerStars>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperList: [
					'../../static/swiper/swiper_1.jpg',
					'../../static/swiper/swiper_2.jpg',
					'../../static/swiper/swiper_3.jpg',
					'../../static/swiper/swiper_4.jpg'
				],
				newMovie: []
			}
		},
		onLoad() {
			this.getNewMovie();
		},
		methods: {
			getNewMovie () {
				this.$SuperHero.newMovie().then(({data}) => {
					this.newMovie = data.subjects;
				});
			}
		}
	}
</script>

<style>
	.swiper {
		width: 100%;
		height: 440rpx;
	}
	.icon-tip {
		height: 30rpx;
		width: 30rpx;
		padding-top: 10rpx;
	}
	.super-hot {
		margin-top: 20rpx;
		padding: 20rpx;
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
	.hot-scroll {
		width: 100%;
		white-space: nowrap;
	}
	.single-poster {
		display: inline-block;
		margin-left: 20rpx;
	}
	.poster-wapper {
		display: flex;
		flex-direction: column;
	}
	.poster {
		width: 200rpx;
		height: 270rpx;
	}
	.movie-name {
		width: 200rpx;
		margin-top: 10rpx;
		font-size: 14px;
		font-weight: bold;
		/* 超出隐藏 */
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
