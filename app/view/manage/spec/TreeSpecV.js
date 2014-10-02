Ext.define('App.view.manage.TreeSpecV', {
    extend: 'Ext.tree.TreePanel',
    requires: [
        'Ext.tree.*',
        'Ext.data.*',
        'Ext.util.Point',
        'Ext.layout.container.HBox'
    ],
    frame:true,
    border: 5,
    title: 'Структура',
    alias:'widget.treeSpec',
    itemId:'treeSpec',
    store: 'manage.TreeSpecS',
    margin: '0 5 0 0',
    resizable:true,
    rootVisible : false,
    viewConfig: {
        plugins: {
            ptype: 'treeviewdragdrop',
            dropGroup: 'ddspec',
            sortOnDrop: true, // * чтобы deselect происходил
            enableDrag: false,
            containerScroll: true
        }
    },
    initComponent: function(){
        this.tools = [
            {
                type:'expand',
                itemId:'expandTreeSpec',
                tooltip: 'Раскрыть все'
            },
            {
                type:'collapse',
                itemId:'collapseTreeSpec',
                tooltip: 'Скрыть все'
            },
            {
                type:'refresh',
                itemId:'refreshTreeSpec',
                tooltip: 'Обновить'
            }
        ]
        this.callParent(arguments);
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
