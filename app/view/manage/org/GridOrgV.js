Ext.define('App.view.manage.GridOrgV', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.gridOrg',
    itemId: 'gridOrg',
    frame: true,
    flex:1,
    store: 'manage.GridOrgS',
    title: 'Организации',
    columnLines: true,
    viewConfig: {
        enableTextSelection:true // * allow to select text in grid. Actually it's a gridview property
    },
    initComponent: function () {
        console.log('GridOrg init');

        this.plugins = [
            Ext.create('Ext.grid.plugin.CellEditing', {
                clicksToEdit: 1
            })
        ];

        this.tbar = App.util.Utilities.buttonSaveDelete;

        this.tools = [
            {
                type: 'refresh',
                itemId: 'refreshGridOrgS',
                tooltip: 'Обновить'
            }
        ]

        this.columns = [
            {
                text: 'Краткое наименование',
                itemId: 'columnOrgabbr',
                dataIndex: 'orgabbr',
                width:200,
                editor: {
                    xtype: 'textfield'
                }
            },
            {
                text: 'Полное наименование',
                itemId: 'columnOrgname',
                dataIndex: 'orgname',
                tdCls: 'wrapText',
                flex:1,
                editor: {
                    xtype: 'textfield'
                }
            }
        ];
        this.callParent(arguments);
        console.log('GridOrg end');
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