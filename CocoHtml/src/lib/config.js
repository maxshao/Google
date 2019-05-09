

seajs.config({
    alias: {
        'jquery': '/assets/jquery/dist/jquery.min.js',
        'extension.view': '/src/lib/extension.view.js',
        'router': '/src/lib/router.js',
        'index': '/src/controllers/index.js',

        'datatable': '/assets/datatables.net/js/jquery.dataTables.min.js',

        'bootstrap': '/assets/bootstrap/dist/js/bootstrap.min.js',
        'fastclick': '/assets/fastclick/lib/fastclick.js',
        'nprogress': '/assets/nprogress/nprogress.js',
        'bootstrap-progressbar': '/assets/bootstrap-progressbar/bootstrap-progressbar.min.js',
        'iCheck': '/assets/bootstrap/dist/js/bootstrap.min.js',
        'moment': '/assets/moment/min/moment.min.js',
        //< !--bootstrap - daterangepicker-- >
        'bootstrap-daterangepicker': '/assets/bootstrap-daterangepicker/daterangepicker.js',
        // <!-- bootstrap-wysiwyg -->
        'bootstrap-wysiwyg': '/assets/bootstrap-wysiwyg/js/bootstrap-wysiwyg.min.js',
        'jquery.hotkeys': '/assets/jquery.hotkeys/jquery.hotkeys.js',
        'google-code-prettify': '/assets/google-code-prettify/src/prettify.js',
        //  <!-- jQuery Tags Input -->
        'jquery.tagsinput': '/assets/jquery.tagsinput/src/jquery.tagsinput.js',
        // <!-- Switchery -->
        'switchery': '/assets/switchery/dist/switchery.min.js',
        //        <!-- Select2 -->
        'select2': '/assets/select2/dist/js/select2.full.min.js',
        //        <!-- Parsley -->
        'parsley': '/assets/parsleyjs/dist/parsley.min.js',
        //<!-- Autosize -->
        'autosize': '/assets/autosize/dist/autosize.min.js',
        //    <!-- jQuery autocomplete -->
        'jquery.autocomplete': '/assets/devbridge-autocomplete/dist/jquery.autocomplete.min.js',
        //<!-- starrr -->
        'starrr': '/assets/starrr/dist/starrr.js',

        'account-edit': '/src/controllers/account/edit.js',

        'extension.datatables': '/src/lib/extension.datatables.js',
    },

});

// document ready then initial the system
$(document).ready(function () {
    function indexPage() {
        seajs.use(['router','index'], function (router,index) {
            router.routeinit();
            let curentHash = router.getCurrentHash();
            let isIndivijualPage = router.isIndividualPage(curentHash);
            console.log(router)
            $.router = router;
            // 判断是否是单页面
            if (isIndivijualPage) {

            }
            else {
                index.init();
            }
        });
    }
    indexPage();
});





        //'dataTables.bootstrap.min.js': '/assets/datatables.net-bs/js/dataTables.bootstrap.min.js',
        //'dataTables.buttons.min.js': '/assets/datatables.net-buttons//js/dataTables.buttons.min.js',
        //'buttons.flash.min.js': '/assets/datatables.net-buttons/js/buttons.flash.min.js',
        //'buttons.html5.min.js': '/assets/datatables.net-buttons/js/buttons.html5.min.js',
        //'buttons.print.min.js': '/assets/datatables.net-buttons/js/buttons.print.min.js',
        //'dataTables.fixedHeader.min.js': '/assets/datatables.net-fixedheader/js/dataTables.fixedHeader.min.js',
        //'dataTables.keyTable.min.js': '/assets/datatables.net-keytable/js/dataTables.keyTable.min.js',
        //'dataTables.responsive.min.js': '/assets/datatables.net-responsive/js/dataTables.responsive.min.js',
        //'responsive.bootstrap.js': '/assets/datatables.net-responsive-bs/js/responsive.bootstrap.js',
        //'dataTables.scroller.min.js': '/assets/datatables.net-scroller/js/dataTables.scroller.min.js', 
//seajs.use(['index', 'bootstrap', 'fastclick', 'nprogress', 'bootstrap-progressbar',
//    'iCheck', 'bootstrap-progressbar', 'moment', 'bootstrap-daterangepicker', 'bootstrap-wysiwyg',
//    'jquery.hotkeys', 'google-code-prettify', 'jquery.tagsinput', 'switchery', 'select2', 'parsley', 'autosize', 'jquery.autocomplete', 'starrr'], function (index) {
//        console.log(index);
//    });










