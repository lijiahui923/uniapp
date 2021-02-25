export default {
    title: '用户登录一系列相关接口',
    objName: 'Role',
    base: 'role',
    interfaces: [
        {
            name: '所有角色',
            id: 'all',
            url: '/all/{rowId}'
        },
		{
		    name: '所有角色',
		    id: 'all',
		    url: '/id'
		}
    ]
}