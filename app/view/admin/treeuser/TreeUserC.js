Ext.define('App.view.admin.treeuser.TreeUserC', {
    extend: 'Ext.app.ViewController',
    requires: [
    ],
    alias: 'controller.treeuser',

    control: {
        'treeUser': {
            cellclick: function (tree, td, cellIndex, record, tr, rowIndex, e, eOpts) {
                console.log('treeUser cellclick');
                var treeUser = tree.up('#content').down('treepanel'),
                    gridUser = tree.up('#content').down('grid'),
                    storeUser = gridUser.store,
                    selection = treeUser.getSelected();
                if (selection) {
                    var groupid = selection.raw.groupid,
                        actid = selection.raw.actid,
                        orgid = selection.raw.orgid;
                    storeUser.clearFilter();
                    storeUser.filter(function (rec) {
                        if(groupid)
                            if (rec.get('groupid') == groupid)
                                return true;
                        if(actid)
                            if (rec.get('actid') == actid)
                                return true;
                        if(orgid)
                            if (rec.get('orgid') == orgid)
                                return true;
                    });
                }
            },
            render: function (tree) {
                var gridUser = tree.up('#content').down('grid'),
                    storeUser = gridUser.store;
                storeUser.filter(function () {
                    return false
                });
            }
        },

        '#refreshTreeUser': {
            click: function (button) {
                var treeUser = button.up('treepanel'),
                    gridUser = treeUser.up('#content').down('grid'),
                    storeUser = gridUser.store;
                storeUser.filter(function () {
                    return false
                });
                treeUser.store.load();
            }
        },
        '#expandTreeUser': {
            click: function (button) {
                var treeUser = button.up('treepanel');
                treeUser.expandAll();
            }
        },
        '#collapseTreeUser': {
            click: function (button) {
                var treeUser = button.up('treepanel');
                treeUser.collapseAll();
            }
        }
    }
});
