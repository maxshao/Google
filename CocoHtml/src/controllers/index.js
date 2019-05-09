'use strict';

var sysConfig = this.prototype = {
    address: "http://localhost:9600/",
    comAddress: function (shortUrl) { return this.address + shortUrl; },
    customerjsAddress: function () { return this.address.concat("src/lib/custom.js") }
};


// define page init parameters
var config = this.prototype = {
    individualPages: [
        "auth/login",
    ],
    viewsPath: "/src/views/", // default view folder
    contentId: '#content',   // default load element ID
    menuId: '#sidebar-menu',
    bodyId: '.body',
    requestnochache: { t: Math.random() },
    customerjsId: 'customerjs' // refresh body js ID
};

// body load
define(function (require, exports, module) {
    let router = require('router');
    var loadBody = function () {
        let url_body = config.viewsPath + 'shared/body.html';
        router.loadContent(url_body, config.requestnochache, config.bodyId, function () {
            loadMenu();
        });
    };
    var loadMenu = function () {
        let url_menu = config.viewsPath + "shared/menu.html";
        router.loadContent(url_menu, config.requestnochache, config.menuId, function () {
            router.loadjs(sysConfig.customerjsAddress(), config.customerjsId, router.globalcustomInit());
        })
    };
    exports.init = loadBody;
});


