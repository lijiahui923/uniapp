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
		<titleTag title="热门超英">
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
		</titleTag>
		<!-- 预告片 -->
		<titleTag title="热门预告片" icon="../../static/icons/interest.png">
			<scroll-view class="hot-scroll" scroll-x="true">
				<view class="video-list" v-for="item in hotTrailerList">
					<video
						class="video-item"
						id="myVideo"
						:src="hotTrailerList.src">
					</video>
				</view>
			</scroll-view>
		</titleTag>
		<!-- 猜你喜欢 -->
		<titleTag title="猜你喜欢" icon="../../static/icons/guess-u-like.png">
			<view class="guess-like-list" v-for="(likeItem, index) in newMovie">
				<view class="guess-like">
					<image class="like-img" :src="likeItem.images.small"></image>
					<view class="like-desc">
						<view class="desc-title">{{likeItem.title}}</view>
						<trailerStars :innerScore="likeItem.rating.average"></trailerStars>
						<view class="desc-other">{{likeItem.desc}}</view>
						<view class="desc-other">上映时间：{{likeItem.pubdates[0]}}</view>
					</view>
					<view class="like-Kudos" @click="praiseMe(index)">
						<image src="../../static/icons/praise.png" style="width: 20px;height: 20px;"></image>
						<view class="praise-me">赞一下</view>
						<view :animation="animationDataArr[index]" class="praise-me animation-opacity">+1</view>
					</view>
				</view>
			</view>
		</titleTag>
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
				newMovie: [],
				hotTrailerList: [],
				animationData: {},
				animationDataArr: []
			}
		},
		onPullDownRefresh() {
			this.getNewMovieList();
			uni.stopPullDownRefresh();
		},
		onLoad() {
			this.getNewMovie();
			this.getHotTrailerList();
			// 创建一个临时动画对象
			this.animation = uni.createAnimation();
		},
		// 页面卸载的时候，清除动画数据
		onUnload () { 
			this.animationData = {};
		},
		onReady() {},
		methods: {
			praiseMe (index) {
				this.animation.translateY(-60).opacity(1).step({
					duration: 400
				});
				// 3 通过动画实例的export方法导出动画数据传递给组件的animation属性
				this.animationData = this.animation;
				this.animationDataArr[index] = this.animationData.export();
				// 4 还原动画
				setTimeout(()=> {
					this.animation.translateY(0).opacity(0).step({
						duration: 0
					});
					this.animationData = this.animation;
					this.animationDataArr[index] = this.animationData.export();
				}, 600)
			},
			getNewMovie () {
				this.$SuperHero.newMovie().then(({data}) => {
					data.subjects.forEach(item => {
						item.desc = `${item.year}/${item.genres.join('/')}`;
					})
					this.newMovie = data.subjects;
					// this.animationDataArr =new Array(this.newMovie.length).fill({});
				});
			},
			getNewMovieList () {
				this.$SuperHero.movieList().then(({data}) => {
					data.subjects.forEach(item => {
						item.desc = `${item.year}/${item.genres.join('/')}`;
					})
					this.newMovie = data.subjects;
					// this.animationDataArr =new Array(this.newMovie.length).fill({});
				});
			},
			getHotTrailerList () {
				this.$SuperHero.hotTrailerList().then(({data}) => {
					this.hotTrailerList = data;
				});
			}
		}
	}
</script>

<style scoped>
	/* 轮播图 */
	.swiper {
		width: 100%;
		height: 440rpx;
	}
	.super-hot {
		margin-top: 20rpx;
		padding: 20rpx;
	}
	/* 热门超英 */
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
	/* 预告片 */
	.video-list {
		display: -webkit-box;
	}
	.video-item {
		width: 350rpx;
		height: 220rpx;
		margin-right: 10rpx;
	}
	.video-item:last-child {
		margin-right: 0;
	}
	/* 猜你喜欢 */
	.guess-like-list {
		display: flex;
		flex-direction: column;
	}
	.guess-like {
		display: flex;
		margin-bottom: 20rpx;
	}
	.like-img {
		width: 180rpx;
		height: 240rpx;
		border-radius: 5rpx;
		margin-right: 8rpx;
		flex: 1;
	}
	.like-desc {
		flex: 2;
		border-right: 2px dashed #999999;
	}
	.desc-title {
		font-size: 18px;
		font-weight: 600;
		color: #1d2a3b;
	}
	.desc-other {
		color: #999999;
	}
	.like-Kudos {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.praise-me {
		font-size: 14px;
		color: #feab2a;
	}
	.animation-opacity {
		opacity: 0;
	}
</style>
