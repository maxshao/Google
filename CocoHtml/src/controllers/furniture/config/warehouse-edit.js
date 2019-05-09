



define(function (require, exports, module) {
    module.exports.init = function () {

        console.log('warehouse->edit');
        $.ajax({
            url: '/api/Players/getplayers',
            type: 'GET',
            success: function (d) {
                // $.create_select('player',d.list,'id','name',null,null)
                //$.create_select('player',d.list,'id','name',null,'please selected')
                $.create_select('player', d.list, 'id', 'name', '2', 'please selected');
            }
        });

        $.ajaxFrom("#form-new-warehouse", function (d) {
            console.log(d);
        });

        // $("#form-account").submit(function (e) {
        //     console.log('form submit');
        //     console.log($('#form-account').serializeArray());

        //     setTimeout(null,5000);

        //     return false;
        // });


    };

    // module.exports = {
    //     init: init
    // };
});












