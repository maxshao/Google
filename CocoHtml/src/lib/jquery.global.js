


(function ($) {
    $.profile = null;
    //首先备份下jquery的ajax方法
    var _ajax = $.ajax;
    //重写jquery的ajax方法
    $.ajax = function (opt) {
        //扩展增强处理
        let _opt = $.extend(opt, {
            beforeSend: function (XHR) {
                console.log($.profile == null);
                if ($.profile != null) XHR.setRequestHeader("Authorization:'Bearer " + $.profile.access + "'");
            }
        });
        return _ajax(_opt);
    };
    $.fn.serializeJson = function () {
        var serializeObj = {};
        var array = this.serializeArray();
        var str = this.serialize();
        $(array).each(function () {
            if (serializeObj[this.name]) {
                if ($.isArray(serializeObj[this.name])) {
                    serializeObj[this.name].push(this.value);
                } else {
                    serializeObj[this.name] = [serializeObj[this.name], this.value];
                }
            } else {
                serializeObj[this.name] = this.value;
            }
        });
        return serializeObj;
    }

    $.dtmodel = function (opt) {
        let dt_model = {
            "draw": 1,
            "recordsTotal": 57,
            "recordsFiltered": 0,
            "data": []
        };
        dt_model.draw = opt.pageIndex;
        dt_model.recordsTotal = opt.pageCount;
        dt_model.data = opt.list;
        return dt_model;
    }


    $.ajaxFrom = function (id, callback) {
        $(id).bind("submit", function (e) {
            let url = $(id).attr('action');
            let submit_data = $(id).serializeJson();
            console.log(submit_data);
            console.log(JSON.stringify(submit_data));
            // console.log($(id).serializeJson());
            // console.log(url);
            $.ajax({
                url: url,
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(submit_data),
                success: function (rtn_d) {
                    console.log(rtn_d);
                    //if(rtn_d.status)
                    callback(rtn_d);
                }
            });
            return false;
        });
    }


})(jQuery);












