<template>
	<view class="movie-score-wapper">
		<image v-for="yellow in yellowScore" src="../../static/icons/star-yellow.png" class="star-ico"></image>
		<image v-for="gray in grayScore" src="../../static/icons/star-gray.png" class="star-ico"></image>
		<view class="movie-score">
			{{innerScore}}
		</view>
	</view>
</template>

<script>
	export default {
		name: 'trailerStars',
		props: {
			innerScore: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				yellowScore: 0,
				grayScore: 0
			};
		},
		watch: {
			innerScore: {
				immediate: true,
				handler (val) {
					if (val !== null && val !== undefined && val !== '') {
						this.yellowScore = parseInt(val / 2);
						this.grayScore = 5 - this.yellowScore;
					}
				}
			}
		}
	}
</script>

<style>
	.movie-score-wapper {
		display: flex;
	}
	.star-ico {
		width: 20rpx;
		height: 20rpx;
		margin-top: 6rpx;
	}
	.movie-score {
		font-size: 12px;
		color: #999999;
		margin-left: 8rpx;
	}
</style>
