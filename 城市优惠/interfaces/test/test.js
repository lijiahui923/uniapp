export default {
    title: '模拟相关接口',
    objName: 'SuperHero',
    base: 'superhero',
    interfaces: [
        {
            name: '轮播图',
            id:'swiperList',
            url: '/swiperList'
        },
        {
            name: '新电影',
            id: 'newMovie',
            url: '/new_movie'
        },
		{
		    name: '所有电影',
		    id: 'movieList',
		    url: '/movieList',
			// pagination: true
		},
		{
		    name: '预告片',
		    id: 'hotTrailerList',
		    url: '/hotTrailerList'
		},
    ]
}