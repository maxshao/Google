
define(function (require, exports, module) {
    'use strict';

    //var dt_config = { id: '', columns: [], url: '', pageSize: '', ajaxData: [] };
    exports.datatableWithCheckbox = function initDataTablesWithCheckbox(dt_config) {
        console.log(dt_config);
        dt_config.columns.splice(0, 0, { title: '<input type="checkbox" id="check-all" class="flat">' });
        return $(dt_config.id).dataTable({
            "ordering": false,
            "dom": '<"top"i>rt<"bottom"p><"clear">',
            "pagingType": "full_numbers",
            //"scrollY": "500px",
            //"scrollCollapse": true,
            //"paging": false,
            "scrollX": false,
            "pageLength": dt_config.pageSize,
            "language": {
                "decimal": ",",
                "thousands": ".",
                "lengthMenu": "Display _MENU_ records per page",
                "zeroRecords": "Nothing found - sorry",
                "info": "Showing page _PAGE_ of _PAGES_",
                "infoEmpty": "No records available",
                "infoFiltered": "(filtered from _MAX_ total records)"
            },
            columns: dt_config.columns,
            // "processing": true,
            "serverSide": true,
            // "aDataSort":true,
            ajax: function (data, callback, settings) {

                let page = (data.start / data.length) + 1;
                dt_config.ajaxData.pageSize = dt_config.pageSize;
                dt_config.ajaxData.pageIndex = page;
                console.log(dt_config.ajaxData);
                $.ajax({
                    url: dt_config.url,
                    type: 'POST',
                    contentType: "application/json",
                    data: JSON.stringify(dt_config.ajaxData),
                    success: function (d) {
                        console.log(d);
                        var returnDt = {};
                        returnDt.draw = data.draw;
                        returnDt.recordsFiltered = d.pageCount;
                        returnDt.recordsTotal = d.pageCount;
                        returnDt.data = d.list;
                        console.log(returnDt);
                        callback(returnDt);
                    }
                });
            },
            "columnDefs": [
                {
                    "targets": [0],
                    "searchable": false,
                    "render": function (data, type, row) {
                        return '<input type="checkbox" class="flat" name="table_records">';
                    }
                }
            ]
        });
    }

});





        // $('#datatable-checkbox').dataTable({
        //     "ordering": false,
        //     "dom": '<"top"i>rt<"bottom"p><"clear">',
        //     "pagingType": "full_numbers",
        //     //"scrollY": "500px",
        //     //"scrollCollapse": true,
        //     //"paging": false,
        //     "scrollX": false,
        //     "pageLength": 5,
        //     "language": {
        //         "decimal": ",",
        //         "thousands": ".",
        //         "lengthMenu": "Display _MENU_ records per page",
        //         "zeroRecords": "Nothing found - sorry",
        //         "info": "Showing page _PAGE_ of _PAGES_",
        //         "infoEmpty": "No records available",
        //         "infoFiltered": "(filtered from _MAX_ total records)"
        //     },
        //     columns: [
        //         {
        //             title: '<input type="checkbox" id="check-all" class="flat">',
        //         },
        //         { "data": "name", 'title': 'name' },
        //         { "data": "id", 'title': 'id' },
        //         { "data": "password", 'title': 'password' },
        //         { "data": "player", 'title': 'player' },
        //         { "data": "createAt", 'title': 'createAt' }
        //     ],
        //     // "processing": true,
        //     "serverSide": true,
        //     // "aDataSort":true,
        //     ajax: function (data, callback, settings) {
        //         // let limit = data.length;// 页面显示记录条数
        //         // let start = data.start; // 开始的记录序号
        //         let page = (data.start / data.length) + 1;
        //         console.log(data)
        //         console.log(page + 'page')
        //         $.ajax({
        //             url: 'api/Accounts/gets',
        //             type: 'POST',
        //             contentType: "application/json",
        //             data: JSON.stringify({
        //                 "name": "string",
        //                 "pageIndex": page,
        //                 "pageSize": 5
        //             }),
        //             success: function (d) {
        //                 var returnDt = {};
        //                 // returnDt.draw = data.draw;
        //                 returnDt.recordsFiltered = d.recordsTotal;
        //                 returnDt.recordsTotal = d.recordsTotal;
        //                 returnDt.data = d.data;
        //                 callback(returnDt);
        //             }
        //         });
        //     },
        //     "columnDefs": [
        //         {
        //             "targets": [0],
        //             "searchable": false,
        //             "render": function (data, type, row) {
        //                 return '<input type="checkbox" class="flat" name="table_records">';
        //             }
        //         },
        //         //    {
        //         //        "targets": [3],
        //         //        "visible": false
        //         //    }
        //     ]
        // });




