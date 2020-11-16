/**
 *  描述：
 *     使用自定义封装ajax
 *  @author 小谷
 *  @Date  2020/11/9 21:19
 */
layui.define(['jquery', 'customAlert'], function (exports) {
    var $ = layui.jquery,
        customAlert = layui.customAlert;
    var apiUser = "http://127.0.0.1:10100/user";// 用户系统公共头部
    // 查询所有模块 get
    var queryAdminModuleUrl = apiUser + "/admin/menumodule/queryAdminModule.do";
    // 增加模块 post
    var addAdminModuleUrl = apiUser + "/admin/menumodule/addAdminModule.do";
    // 变更模块 put
    var updateAdminModuleUrl = apiUser + "/admin/menumodule/updateAdminModule.do";
    // 查询模块菜单父或子 get
    var queryAdminModuleMenuUrl = apiUser + "/admin/menumodule/queryAdminModuleMenu.do";
    // 增加菜单 post
    var addAdminMenuUrl = apiUser + "/admin/menumodule/addAdminMenu.do";
    // 变更菜单 put
    var updateAdminMenuUrl = apiUser + "/admin/menumodule/updateAdminMenu.do";
    // 删除菜单 delete
    var deleteAdminMenuUrl = apiUser + "/admin/menumodule/deleteAdminMenu.do";
    // 变更菜单排序 put
    var updateMenuSortUrl = apiUser + "/admin/menumodule/updateMenuSort.do";
    // 查询用户分页 get
    var queryAdminUserByPageUrl = apiUser + "/admin/user/queryAdminUserByPage.do";
    // 新增用户 post
    var addAdminUserUrl = apiUser + "/admin/user/addAdminUser.do";
    // 根据用户类型查询菜单
    var queryAdminMenuByAdminUserTypeUrl = apiUser + "/admin/menumodule/queryAdminMenuByAdminUserType.do";
    // 授权用户菜单
    var autoAdminUserTypeMenuUrl = apiUser + "/admin/menumodule/autoAdminUserTypeMenu.do";

    var apiPay = "http://127.0.0.1:10200/pay";// 交易系统公共头部
    var success = "0000";// 响应码
    var fail = "1000";// 常规失败码
    var past = "2000";// 过期码
    var busy = "3000";// 无处理码
    var err = "7000";// 异常码

    var obj = {
        /**
         * @param url 路径
         * @param type 请求方式
         * @param data 请求数据
         * @param successCallback 成功回调
         * @param errorCallback 失败回调
         * */
        ajax: function (url, type, data, successCallback, errorCallback) {
            var yixing = layui.data("yixing");
            $.ajax({
                type: type,
                headers: {'admin_access_token': yixing.admin_access_token},
                url: url,
                data: data,
                success: successCallback,
                error: errorCallback,
                complete: function (XMLHttpRequest, status) {
                    // 自动设置每次请求返回的token,响应成功才可
                    if (status == "success") {
                        var admin_access_token = XMLHttpRequest.getResponseHeader("admin_access_token");
                        if (admin_access_token != null) {
                            // 重新设置token值
                            layui.data("yixing", {key: 'admin_access_token', value: admin_access_token})
                        }
                    }
                }
            });
        }, verifyRespCode: function (respCode, respMsg) {
            // 失败码处理
            if (respCode == fail) {
                customAlert.error(respMsg);
                return;
            }
            // 过期码处理
            if (respCode == past) {
                customAlert.error(respMsg);
                setTimeout(function () {
                    // 清空所有登录带来的信息
                    layui.data('yixing', {key: 'admin_access_token', remove: true});
                    layui.data('yixing', {key: 'adminUserId', remove: true});
                    layui.data('yixing', {key: 'adminUserCode', remove: true});
                    layui.data('yixing', {key: 'adminUserName', remove: true});
                    layui.data('yixing', {key: 'adminUserEmail', remove: true});
                    layui.data('yixing', {key: 'adminUserType', remove: true});
                    window.location = 'login.html';// 跳出到登入页
                }, 2000);
                return;
            }
            // 无处理码
            if (respCode == busy) {
                customAlert.error(respMsg);
                return;
            }
            // 异常码
            if (respCode == err) {
                customAlert.error(respMsg);
                return;
            }
        }, queryAdminModuleUrl: queryAdminModuleUrl,
        addAdminModuleUrl: addAdminModuleUrl, updateAdminModuleUrl: updateAdminModuleUrl,
        queryAdminModuleMenuUrl: queryAdminModuleMenuUrl, addAdminMenuUrl: addAdminMenuUrl,
        updateAdminMenuUrl: updateAdminMenuUrl, deleteAdminMenuUrl: deleteAdminMenuUrl,
        updateMenuSortUrl: updateMenuSortUrl,
        queryAdminUserByPageUrl: queryAdminUserByPageUrl, addAdminUserUrl: addAdminUserUrl,
        queryAdminMenuByAdminUserTypeUrl: queryAdminMenuByAdminUserTypeUrl,
        autoAdminUserTypeMenuUrl: autoAdminUserTypeMenuUrl
    };
    // 输出接口
    exports('customAjax', obj);
});