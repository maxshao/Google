



define(function (require, exports, module) {
    var init = function () {

        console.log('/src/views/user/list.htm');
        $.ajax({
            url: '/src/views/user/list.html',
            cache: false,
            async: true,
            dataType: 'html',
            success: function (html) {
                html = '<div>' + html + '<div>';
                $(config.contentId).html(null);
                console.log('12');
                $(config.contentId).append(html);
            }
        }).done(function () {

            //seajs.use(['jquery', 'config', 'bootstrap', 'datatable', 'dataTables.bootstrap.min.js', 'dataTables.buttons.min.js',
            //    'buttons.flash.min.js',
            //    'buttons.html5.min.js',
            //    'buttons.print.min.js',
            //    'dataTables.fixedHeader.min.js',
            //    'dataTables.keyTable.min.js',
            //    'dataTables.responsive.min.js',
            //    'responsive.bootstrap.js',
            //    'dataTables.scroller.min.js',

            //    'config'

            //], function () {


            var checkState = '';
            $('.bulk_action input').on('ifChecked', function () {
                console.log('ck');
                checkState = '';
                $(this).parent().parent().parent().addClass('selected');
                countChecked();
            });
            $('.bulk_action input').on('ifUnchecked', function () {
                console.log('unchk');
                checkState = '';
                $(this).parent().parent().parent().removeClass('selected');
                countChecked();
            });
            $('.bulk_action input#check-all').on('ifChecked', function () {
                checkState = 'all';
                countChecked();
            });
            $('.bulk_action input#check-all').on('ifUnchecked', function () {
                checkState = 'none';
                countChecked();
            });

            function countChecked() {
                if (checkState === 'all') {
                    $(".bulk_action input[name='table_records']").iCheck('check');
                }
                if (checkState === 'none') {
                    $(".bulk_action input[name='table_records']").iCheck('uncheck');
                }

                var checkCount = $(".bulk_action input[name='table_records']:checked").length;

                if (checkCount) {
                    $('.column-title').hide();
                    $('.bulk-actions').show();
                    $('.action-cnt').html(checkCount + ' Records Selected');
                } else {
                    $('.column-title').show();
                    $('.bulk-actions').hide();
                }
            }
            //});


        }).fail(function () { }).always(function () {
            console.log('aaaaaaaaaaa')
            console.log($('#datatable-checkbox').html());
        });
    };

    module.exports = {
        init: init
    };
});












