
var viewConfig = {
    popupParms: { type: 1, title: '工作视窗', area: [990, 560], shadeClose: true, content: '', }

};


jQuery.extend({
    // 设置 apDiv
    buttons: function (btnEvents) {
        $(document).find('[dn-button]').each(function (idx, vl) {
            let btnArr = $(vl).attr('dn-button');
            let jsonbtn = JSON.parse(btnArr);
            let btn_html = '';
            for (let t in jsonbtn) {
                console.log(jsonbtn[t]);
                let area = typeof (jsonbtn[t].Area) == "undefined" ? null : '[' + jsonbtn[t].Area + ']';
                btn_html += '<li><button type="button" class="btn btn-primary btn-xs" id=' + jsonbtn[t].Id + ' onclick="$.popupbefore(\'' + jsonbtn[t].Url + '\',\'' + jsonbtn[t].Id + '\')"  dn-area="' + area + '"   >' + jsonbtn[t].Name + '</button></li>';
            }
            btn_html += '</li>';
            $(vl).html(btn_html);
        });
    },
    btnEvents: function (btn_html) {
        $(btn_html).find('button').each(function (e) {
            let urlshort = $(this).attr('target-url');
            console.log($(this));
            $(this).on('click', function () {
                $.popupbefore(urlshort);
            });
        });
    },
    popup: function (url, parms) {
        if (typeof (url) == 'undefined') throw DOMException('input url');
        if (typeof (parms) != 'object' || typeof (parms) == 'undefined') { parms = viewConfig.popupParms };
        let area = $.popupbuttonId.attr('dn-area') == 'null' ? parms.area : $.popupbuttonId.attr('dn-area');
        if (typeof (area) == "string") {
            area = area.replace('[', '').replace(']', '');
            area = area.split(',');
        }
        area = Array.from(area, x => x + 'px');
        $.get(url, function (result) {
            layer.open({
                type: parms.type,
                title: parms.title,
                area: area,
                shadeClose: true, //点击遮罩关闭
                content: result,
                scrollbar: false,
                end: function () {
                    console.log($.popupbuttonId);
                    $.popupbuttonId = null;
                    console.log($.popupbuttonId);
                }
            });
        });
    },
    popupbuttonId: null,
    popupbefore: function (urlshort, id) {
        if (typeof (id) != 'undefined') {
            $.popupbuttonId = $('#' + id);
        }
        let url_js = sysConfig.address + "/src/controllers" + urlshort + '.js?t=' + Math.random();
        let url_html = sysConfig.address + "/src/views" + urlshort + '.html?t=' + Math.random();
        console.log(url_js);
        console.log(url_html);
        console.log($.router);
        $.router.loadPopupContent(url_html, url_js);
    },

    create_select: function (id, dt, key, value, default_key, default_value) {

        // var objSelectNow = document.getElementById("select1");
        // var inner = "<option value='1'>1</option>";
        // objSelectNow.innerHTML = inner;
        // var objOption = document.createElement("OPTION");
        // objOption.text = 2;
        // objOption.value = 2;
        // objSelectNow.options.add(objOption);
        if (document.getElementById(id) != null) {
            let opt = null;
            if (default_value != null) {
                opt = document.createElement("OPTION");
                opt.text = '--请选择--';
                opt.value = -1;
                document.getElementById(id).options.add(opt);
            };
            if(typeof(dt) =='undefined') return;
            dt.forEach((v, i) => {
                let opt = document.createElement("OPTION");
                opt.text = v[value];
                opt.value = v[key];
                document.getElementById(id).options.add(opt);
            });
            if (default_key != null) {
                document.getElementById(id)[default_key].selected=true;
            }
        }
    },
    create_photo: function () {

    },


});





