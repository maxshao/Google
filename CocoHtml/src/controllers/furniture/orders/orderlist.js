



define(function (require, exports, module) {
    var init = function () {
        require('/assets/datatables.net/js/jquery.dataTables.min.js');
        require('/assets/datatables.net-bs/js/dataTables.bootstrap.min.js');
        require('/assets/fastclick/lib/fastclick.js');
        require('/assets/nprogress/nprogress.js');
        require('/assets/iCheck/icheck.min.js');
        //require('/assets/datatables.net-buttons//js/dataTables.buttons.min.js');
        //require('/assets/datatables.net-buttons/js/buttons.flash.min.js');
        //require('/assets/datatables.net-buttons/js/buttons.html5.min.js');
        //require('/assets/datatables.net-buttons/js/buttons.print.min.js');
        //require('/assets/datatables.net-fixedheader/js/dataTables.fixedHeader.min.js');
        //require('/assets/datatables.net-keytable/js/dataTables.keyTable.min.js');
        //require('/assets/datatables.net-responsive/js/dataTables.responsive.min.js');
        //require('/assets/datatables.net-responsive-bs/js/responsive.bootstrap.js');
        //require('/assets/datatables.net-scroller/js/dataTables.scroller.min.js');


        var ext_dt = require('extension.datatables');
        console.log(ext_dt);
        var x = {
            id: '#datatable-checkbox', 
            columns: [
                { "data": "name", 'title': 'name' },
                { "data": "id", 'title': 'id' },
                { "data": "password", 'title': 'password' },
                { "data": "player", 'title': 'player' },
                { "data": "createAt", 'title': 'createAt' }
            ],
            url: 'api/Accounts/gets',
            pageSize: 5,
            ajaxData: {
                "name": "string" 
            }
        };
        var dt = ext_dt.datatableWithCheckbox(x);



        require('extension.view');

        $.buttons(true)


    };

    module.exports = {
        init: init
    };
});












