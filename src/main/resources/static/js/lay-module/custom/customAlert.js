/**
 *  描述：
 *      自定义弹出层
 *  @author 小谷
 *  @Date  2020/11/10 23:42
 */
layui.define(['jquery', 'layer'], function (exports) {
    var $ = layui.jquery,
        layer = layui.layer;

    var obj = {
        /**
         * 成功
         * @param title
         * @returns {*}
         */
        success: function (title) {
            return layer.msg(title, {icon: 1, shade: this.shade, scrollbar: false, time: 2000, shadeClose: true});
        },

        /**
         * 失败
         * @param title
         * @returns {*}
         */
        error: function (title) {
            return layer.msg(title, {icon: 2, shade: this.shade, scrollbar: false, time: 3000, shadeClose: true});
        },
        /**
         * 打开一个新的页面
         * */
        windows: function (title, url, data) {
            var index = layer.open({
                title: title,
                type: 2,
                shade: 0.2,
                maxmin: true,
                shadeClose: true,
                area: ['100%', '100%'],
                content: url,
                success: function (layero, index) {
                    // 成功回调当前层dom，和当前层索引
                    var body = layer.getChildFrame('body', index);
                    //得到iframe页的窗口对象，执行iframe页的方法：iframeWin.method();
                    //var iframeWin = window[layero.find('iframe')[0]['name']];
                    body.find('span').text(data);
                }, end: function () {
                    // 刷新整个文档的代价太大了window.location.reload();
                }
            });
            $(window).on("resize", function () {
                layer.full(index);
            });
            return false;
        }
    }

    exports('customAlert', obj);
});