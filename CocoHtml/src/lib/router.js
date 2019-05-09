
define(function (require, exports, module) {
    'use strict';
    return {
        loadContent: function (url, p, targetId, callback, popup) {
            $.get(url, p, function (result) {
                if (popup)
                    $.popup(url);
                else {
                    if (typeof (targetId) != 'undefined')
                        $(targetId).html(result);
                }
                if ('undefined' != typeof (callback) && 'function' == typeof (callback)) callback(result);
            }).fail(function () {
                throw new Error("访问路径不存在");
            });
        },
        // load body content
        loadCusContent: function (url_html, url_js) {
            let self = this;
            this.loadContent(url_html, config.requestnochache, config.contentId, function () {
                seajs.use(url_js, function (ds) {
                    ds.init();
                    self.reloadCustomerJs();
                });
            })
        },
        // load popup content
        loadPopupContent: function (url_html, url_js) {
            let self = this;
            this.loadContent(url_html, config.requestnochache, config.contentId, function () {
                seajs.use(url_js, function (ds) {
                    ds.init();
                    self.reloadCustomerJs();
                });
            }, true);
        },
        // reload customer body js
        reloadCustomerJs: function () {
            $('[src="' + sysConfig.customerjsAddress() + '"]').remove();
            this.loadjs(sysConfig.customerjsAddress(), config.customerjsId)
        },
        // load individual page
        loadIndividualPage: function (url_html) {
            // 1. 隐藏body的class，添加新的class到body
            $(document.body).removeClass('nav-md').addClass('login');
            // 2. 加载individual page 到body
            this.loadContent(url_html, null, ".container", function (html) {
            });
        },
        // whether is individual page
        isIndividualPage: function (currentHash) {
            if (typeof (config.individualPages.find(n => n == currentHash)) == "undefined") return false;
            return true;
        },
        // 全局配置，只加载一次
        globalcustomInit: function () {
            this.loadjs(sysConfig.comAddress("src/lib/globalcustom.js"));
        },
        // 加载js
        loadjs: function (url, appendId, callback) {
            let script = document.createElement('script');
            script.type = "text/javascript";
            script.src = url;
            if (script.addEventListener) {
                script.addEventListener('load', function () {
                    if ('undefined' == typeof (callback)) return;
                    callback();
                }, false);
            } else if (script.attachEvent) {
                script.attachEvent('onreadystatechange', function () {
                    var target = window.event.srcElement;
                    if (target.readyState == 'loaded') {
                        if ('undefined' == typeof (callback)) return;
                        callback();
                    }
                });
            }
            if (typeof (appendId) != 'undefined') {
                document.getElementById(appendId).appendChild(script);
            } else {
                document.getElementsByTagName('head')[0].appendChild(script);
            }
        },
        // 监听路由变化
        routeinit: function () {
            let self = this;
            window.addEventListener('load', function () {
                self.urlChange();
            });
            //路由切换
            window.addEventListener('hashchange', function () {
                self.urlChange()
            });
        },
        // 加载内容
        urlChange: function () {
            let currentHash = this.getCurrentHash();
            // TODO 判断是否登陆，若没有登陆，则强制返回登陆页面
            // 这里可以设置默认登陆界面，也可以做权限判断
            if (typeof (currentHash) == 'undefined') return;

            let url = config.viewsPath + currentHash;
            // js路由地址
            let url_js = url.replace(/views/, "controllers") + '.js?t=' + Math.random();
            url_js = sysConfig.address + url_js;
            console.log(url_js);
            // html地址
            let url_html = url + '.html';
            console.log('currentHash', currentHash);
            // 单独页面加载
            if (this.isIndividualPage(currentHash))
                this.loadIndividualPage(url_html);
            else { // 管理页面加载
                // 需要检查是否存在标签
                if (!$(document.body).hasClass("nav-md")) {
                    $(document.body).removeClass('login').addClass('nav-md');
                    seajs.use(['index'], function (index) {
                        index.init();
                    });
                }
                this.loadCusContent(url_html, url_js);
            }
        },
        getCurrentHash: function () {
            let hashDetails = location.hash.split("#");
            return hashDetails[1];
        }
    };
});



