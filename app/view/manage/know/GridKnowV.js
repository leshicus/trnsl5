Ext.define('App.view.manage.GridKnowV', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.gridKnow',
    itemId: 'gridKnow',
    frame: true,
    flex:1,
    store: 'manage.GridKnowS',
    title: 'Области знания',
    columnLines: true,
    viewConfig: {
        enableTextSelection:true // * allow to select text in grid. Actually it's a gridview property
    },
    initComponent: function () {
        console.log('GridKnow init');

        this.plugins = [
            Ext.create('Ext.grid.plugin.CellEditing', {
                clicksToEdit: 1
            })
        ];

        this.tbar = App.util.Utilities.buttonSaveDelete;

        this.tools = [
            {
                type: 'refresh',
                itemId: 'refreshGridKnowS',
                tooltip: 'Обновить'
            }
        ]

        this.columns = [
            {
                text: 'Номер',
                itemId: 'columnKnownum',
                dataIndex: 'knownum',
                width:100,
                editor: {
                    xtype: 'textfield'
                }
            },
            {
                text: 'Краткое наименование',
                itemId: 'columnKnowname',
                dataIndex: 'knowname',
                width:160,
                editor: {
                    xtype: 'textfield'
                }
            },
            {
                text: 'Полное наименование',
                itemId: 'columnKnowfullname',
                dataIndex: 'knowfullname',
                tdCls: 'wrapText',
                flex:1,
                editor: {
                    xtype: 'textfield'
                }
            }
        ];
        this.callParent(arguments);
        console.log('GridKnow end');
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