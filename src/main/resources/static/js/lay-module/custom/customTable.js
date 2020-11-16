/**
 *  描述：
 *      自定义表格渲染方式
 *  @author 小谷
 *  @Date  2020/11/10 18:30
 */
layui.define(['jquery'], function (exports) {
    var $ = layui.jquery;

    var obj = {
        /**
         * 处理表头
         * @param tableId 表的id,赋值创建操作都依赖它
         * @param thead 表头显示的列,传入一个一维数组
         * */
        tableHeadApply: function (tableId, thead) {
            // 处理表头
            var createThread = $("<thead></thead>");
            var createThreadTr = $("<tr></tr>");
            $.each(thead, function (index) {
                var createThreadTh = $("<th style=\"text-align: center;\">" + thead[index] + "</th>");
                createThreadTr.append(createThreadTh);
            });
            createThread.append(createThreadTr);
            $(tableId).append(createThread);
        }
    };

    // 输出接口
    exports('customTable', obj);
});