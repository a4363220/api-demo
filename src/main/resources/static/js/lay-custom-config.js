/**
 *  描述：
 *    自定义的配置,原框架的配置加载的东西实在太多了,如果只用到自定义组件,那么就引入这个类
 *  @author 小谷
 *  @Date  2020/11/12 2:03
 */
window.rootPath = (function (src) {
    src = document.scripts[document.scripts.length - 1].src;
    return src.substring(0, src.lastIndexOf("/") + 1);
})();

layui.config({
    base: rootPath + "lay-module/",
    version: false,

}).extend({
    customAjax: 'custom/customAjax',// 自定义ajax
    customTable: 'custom/customTable',// 自定义简单表格
    customAlert: 'custom/customAlert',// 自定义弹窗
    customCommon: 'custom/customCommon'// 自定义常用判断类
});