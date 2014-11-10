Ext.define('App.view.admin.treeuser.TreeUserV', {
    extend: 'Ext.tree.Panel',
    requires: [
        /*'Ext.tree.View',
        'Ext.tree.Panel',*/
        'App.view.admin.treeuser.TreeUserM',
        'App.view.admin.treeuser.TreeUserC'
    ],
    viewModel: {type: 'treeuser'},
    controller:'treeuser',
    frame: true,
    title: 'Структура',
    alias: 'widget.treeUser',
    itemId: 'treeUser',
    bind: '{treeuser}',
    resizable: true,
    margin: '0 5 0 0',
    rootVisible: false,
    _collapsed: true,
    viewConfig: {
        stripeRows: true
    },
    initComponent: function () {
        console.log('TreeUserV init');
        this.tools = [
            /*{
                type: 'expand',
                itemId: 'expandTreeUser',
                tooltip: 'Раскрыть все'
            },
            {
                type: 'collapse',
                itemId: 'collapseTreeUser',
                tooltip: 'Скрыть все'
            },*/
            {
                type: 'maximize',
                tooltip: 'Скрыть/Раскрыть'
            },
            {
                type: 'refresh',
                itemId: 'refreshTreeUser',
                tooltip: 'Обновить'
            }
        ]
        this.callParent(arguments);
        console.log('TreeUserV init end');
    },

    // отмеченная ячейка
    getSelected: function () {
        var sm = this.getSelectionModel();
        var rs = sm.getSelection();
        if (rs.length) {
            return rs[0];
        }
        return null;
    }
});
