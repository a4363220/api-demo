/**
 *  描述：
 *     自定义退出的方式,因为多个地方用到
 *  @author 小谷
 *  @Date  2020/11/10 14:58
 */
layui.define(['jquery'], function (exports) {
    var layer = layui.layer,
        $ = layui.jquery;

    var obj = {
        logout: function (respMsg) {
            layer.msg(respMsg, function () {
                layui.data('yixing', {key: 'admin_access_token', remove: true});
                layui.data('yixing', {key: 'adminUserId', remove: true});
                layui.data('yixing', {key: 'adminUserCode', remove: true});
                layui.data('yixing', {key: 'adminUserName', remove: true});
                layui.data('yixing', {key: 'adminUserEmail', remove: true});
                layui.data('yixing', {key: 'adminUserType', remove: true});
                window.location = 'login.html';
            });
        },
    }
    // 输出接口
    exports('customLogOut', obj);
});