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
                    storeSpec = gridSpec.store,
                    selection = treeSpec.getSelected();
                if(selection.raw){
                    var groupid = selection.raw.groupid;
                    storeSpec.clearFilter();
                    storeSpec.filter(function (rec) {
                        if (rec.get('groupid') == groupid)
                            return true;
                    });
                }
            },
            render: function () {
                var gridSpec = this.getView(),
                    storeSpec = gridSpec.store;
                storeSpec.filter(function () {
                    return false
                });
            }
        },

        'dataview':{
            // чтобы не добавлялась запись в tree при драгндропе:
            // сохраняем перемещаемую запись в переменную droppedRecords, очищаем список перемещаемых записей
            beforedrop:function (node, gridRec, overModel, dropPos, opts) {
                this.droppedRecords = gridRec.records;
                gridRec.records = [];
            },
            nodedragover: function(targetNode, position, dragData){ // * добавляьб только в ОЗ
                var groupid = targetNode.raw.groupid;
                return groupid ? true : false;
            },
            drop:function (node, data, treeRec, dropPosition) {
                var gridSpec = this.getView();

                Ext.iterate(this.droppedRecords, function(record) {
                    var specid = record.get('specid'),
                        oldRec = gridSpec.store.findRecord('specid',specid, 0,false,true,true);
                    if(treeRec.raw){
                        var groupid = treeRec.raw.groupid;
                        oldRec.set('groupid',groupid);
                        gridSpec.store.clearFilter();
                        gridSpec.store.filter(function (rec) {
                            if (rec.get('groupid') == groupid)
                                return true;
                        });
                    }
                });
                this.droppedRecords = undefined;
                gridSpec.store.sync();
            }
        },
        '#refreshTreeSpec': {
            click: function (button) {
                var treeSpec = this.getView(),
                    gridSpec = button.up('#content').down('gridSpec'),
                    storeSpec = gridSpec.store;
                storeSpec.filter(function () {
                    return false
                });
                treeSpec.store.load();
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
