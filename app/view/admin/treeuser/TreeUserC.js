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
                    storeUser = gridUser.getViewModel().getStore('user'),
                    selection = treeUser.getSelected();
                if (selection) {
                    var groupid = selection.raw.groupid,
                        actid = selection.raw.actid,
                        orgid = selection.raw.orgid;
                    storeUser.clearFilter();
                    storeUser.filterBy(function (rec) {
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
                    storeUser = gridUser.getViewModel().getStore('user');
                storeUser.filterBy(function () {
                    return false
                });
            }
        },

        '#refreshTreeUser': {
            click: function (button) {
                var treeUser = button.up('treepanel'),
                    gridUser = treeUser.up('#content').down('grid'),
                    storeUser = gridUser.getViewModel().getStore('user');
                storeUser.filterBy(function () {
                    return false
                });
                treeUser.getViewModel().getStore('treeuser').load();
            }
        },
        'tool[type=maximize]': {
            click: function (button, e, tree) {
                Utilities.treeCollapse(button, e, tree);
            }
        }
        /*'#expandTreeUser': {
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
        }*/
    }
});
