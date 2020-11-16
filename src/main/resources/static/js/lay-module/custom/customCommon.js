/**
 *  描述：
 *     常用的判断
 *  @author 小谷
 *  @Date  2020/11/14 23:27
 */
layui.define(['jquery'], function (exports) {
    var $ = layui.jquery;

    var obj = {
        // 判断用户类型,返回文本值
        judgeAdminUserTypeReturnTextValue: function (adminUserType) {
            switch (adminUserType) {
                case 1:
                    return "超管";
                case 2:
                    return "机构";
                case 3:
                    return "代理";
                case 4:
                    return "商户";
                case 5:
                    return "财务主管";
                case 6:
                    return "财务专员";
                case 7:
                    return "业务主管";
                case 8:
                    return "业务专员";
                case 9:
                    return "运营主管";
                case 10:
                    return "运营专员";
                case 11:
                    return "客服主管";
                case 12:
                    return "客服专员";
                case 13:
                    return "技术主管";
                case 14:
                    return "技术-后台开发";
                case 15:
                    return "技术-app开发";
                case 16:
                    return "技术-web开发";
                case 17:
                    return "产品经理";
                case 18:
                    return "产品专员";
                default:
                    return "未知身份";
            }
            // 判断用户文本值,返回类型
        }, judgeAdminUserTypeReturnTypeValue: function (adminUserTypeText) {
            switch (adminUserTypeText) {
                case "超管":
                    return 1;
                case "机构":
                    return 2;
                case "代理":
                    return 3;
                case "商户":
                    return 4;
                case "财务主管":
                    return 5;
                case "财务专员":
                    return 6;
                case "业务主管":
                    return 7;
                case "业务专员":
                    return 8;
                case "运营主管":
                    return 9;
                case "运营专员":
                    return 10;
                case "客服主管":
                    return 11;
                case "客服专员":
                    return 12;
                case "技术主管":
                    return 13;
                case "技术-后台开发":
                    return 14;
                case "技术-app开发":
                    return 15;
                case "技术-web开发":
                    return 16;
                case "产品经理":
                    return 17;
                case "产品专员":
                    return 18;
                default:
                    return "未知身份";
            }
            // 判断用户状态,返回文本值
        }, judgeAdminUserStateReturnText: function (adminUserState) {
            switch (adminUserState) {
                case 1:
                    return "正常";
                case 2:
                    return "超登锁定";
                case 3:
                    return "禁止登录";
                case 4:
                    return "离职";
                default:
                    return "未知状态";
            }
            // 判断用户状态文本值,返回状态
        }, judgeAdminUserStateReturnValue: function (adminUserState) {
            switch (adminUserState) {
                case "正常":
                    return 1;
                case "超登锁定":
                    return 2;
                case "禁止登录":
                    return 3;
                case "离职":
                    return 4;
                default:
                    return "未知状态";
            }
            // 传入当前用户类型,判断可以添加的用户选项,返回的是一个数组
        }, getCreateAdminUserOption: function (adminUserType) {
            switch (adminUserType) {
                case "1":
                    return ["5:财务主管", "6:财务专员", "7:业务主管", "8:业务专员",
                        "9:运营主管", "10:运营专员", "11:客服主管", "12:客服专员", "13:技术主管",
                        "14:技术-后台开发", "15:技术-app开发", "16:技术-web开发", "17:产品经理", "18:产品专员"];
                case "5":
                    return ["6:财务专员"];
                case "7":
                    return ["8:业务专员"];
                case "9":
                    return ["5:财务主管", "6:财务专员", "7:业务主管", "8:业务专员",
                        "10:运营专员", "11:客服主管", "12:客服专员", "13:技术主管",
                        "14:技术-后台开发", "15:技术-app开发", "16:技术-web开发", "17:产品经理", "18:产品专员"];
                case "10":
                    return ["6:财务专员", "8:业务专员", "12:客服专员",
                        "14:技术-后台开发", "15:技术-app开发", "16:技术-web开发", "18:产品专员"];
                case "11":
                    return ["12:客服专员"];
                case "13":
                    return ["5:财务主管", "6:财务专员", "7:业务主管", "8:业务专员",
                        "9:运营主管", "10:运营专员", "11:客服主管", "12:客服专员",
                        "14:技术-后台开发", "15:技术-app开发", "16:技术-web开发", "17:产品经理", "18:产品专员"];
                case "17":
                    return ["18:产品专员"];
                default:
                    return [];
            }
            // 重组后台格式的菜单,返回前端需要的数据模式
        }, regroupAdminMenu: function (respData) {
            var moduleMenuList = respData.moduleMenuList;
            var moduleJson = [];
            if (moduleMenuList.length > 0) {
                // 循环模块
                $.each(moduleMenuList, function (index, item) {
                    // 定义一个父child
                    var fatherMenuChild = [];
                    // 循环父菜单
                    $.each(item.fatherMenuList, function (indexTwo, itemTwo) {
                        // 定义一个子child
                        var sonMenuChild = [];
                        // 循环子菜单
                        $.each(itemTwo.sonMenuList, function (indexThree, itemThree) {
                            // 将对应父菜单的子菜单添加到子child
                            sonMenuChild.push({
                                "icon": itemThree.menuIcon, "href": itemThree.menuUrl,
                                "title": itemThree.menuName, "target": itemThree.menuOpenWay
                            });
                        });
                        // 将子child添加到父child
                        fatherMenuChild.push({
                            "icon": itemTwo.menuIcon, "href": "",
                            "title": itemTwo.menuName, "target": itemTwo.menuOpenWay,
                            "child": sonMenuChild
                        });
                    });
                    /*
                    * 从里到外的方式组装模块
                    * */
                    moduleJson.push({
                        "icon": item.moduleIcon, "href": "", "title": item.moduleName,
                        "target": "_self", "child": fatherMenuChild
                    });
                });
            }
            //return JSON.stringify(moduleJson);
              return moduleJson;
        }
    };
    // 输出接口
    exports('customCommon', obj);
});