Ext.define('App.view.manage.spec.TreeSpecC', {
    extend: 'Ext.app.ViewController',
    requires: [],
    alias: 'controller.treeSpec',

    control: {
        '#': {
            cellclick: function (gridview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
                console.log('treeSpec cellclick');

                var treeSpec = this.getView(),
                    gridSpec = this.getView().up('#content').down('gridSpec'),
                    storeSpec = gridSpec.getViewModel().getStore('spec'),
                    selection = treeSpec.getSelected();
                if (selection) {
                    if (selection.raw) {
                        var groupid = selection.raw.groupid,
                            orgid = selection.raw.orgid,
                            actid = selection.raw.actid,
                            id = selection.raw.id;
                        storeSpec.clearFilter();
                        /*storeSpec.filterBy(function (rec) {
                         if (rec.get('groupid') == groupid)
                         return true;
                         });*/
                        storeSpec.load({
                            params: {
                                id: id,
                                orgid: orgid,
                                actid: actid,
                                groupid: groupid
                            }
                        });
                    }
                }
            },
            /*render: function () {
             var gridSpec = this.getView().up('#content').down('gridSpec'),
             storeSpec = gridSpec.getViewModel().getStore('spec');
             storeSpec.filterBy(function () {
             return false
             });
             }*/
        },

        'dataview': {
            // чтобы не добавлялась запись в tree при драгндропе:
            // сохраняем перемещаемую запись в переменную droppedRecords, очищаем список перемещаемых записей
            beforedrop: function (node, gridRec, overModel, dropPos, opts) {
                this.droppedRecords = gridRec.records;
                gridRec.records = [];
            },
            nodedragover: function (targetNode, position, dragData) { // * добавляьб только в ОЗ
                var groupid = targetNode.raw.groupid;
                return groupid ? true : false;
            },
            drop: function (node, data, treeRec, dropPosition) {
                var gridSpec = this.getView(),
                    main = gridSpec.up('main'),
                    storeSpec = main.getViewModel().getStore('spec');

                Ext.iterate(this.droppedRecords, function (record) {
                    var specid = record.get('specid'),
                        oldRec = storeSpec.findRecord('specid', specid, 0, false, true, true);
                    if (treeRec.raw) {
                        var groupid = treeRec.raw.groupid;
                        oldRec.set('groupid', groupid);
                        storeSpec.clearFilter();
                        storeSpec.filterBy(function (rec) {
                            if (rec.get('groupid') == groupid)
                                return true;
                        });
                    }
                });
                this.droppedRecords = undefined;
                storeSpec.sync();
            }
        },
        '#refreshTreeSpec': {
            click: function (button) {
                var treeSpec = this.getView(),
                    gridSpec = button.up('#content').down('gridSpec'),
                    storeSpec = gridSpec.getViewModel().getStore('spec');
                storeSpec.filterBy(function () {
                    return false
                });
                treeSpec.getViewModel().getStore('treespec').load();
            }
        },
        'tool[type=maximize]': {
            click: function (button, e, tree) {
                Utilities.treeCollapse(button, e, tree);
            }
        }
        /*'#expandTreeSpec': {
         click: function (button) {
         var treeSpec = this.getView();
         treeSpec.expandAll();
         }
         },
         '#collapseTreeSpec': {
         click: function (button) {
         var treeSpec = this.getView();
         treeSpec.collapseAll();
         }
         }*/
    }
});