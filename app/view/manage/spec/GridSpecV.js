Ext.define('App.view.manage.GridSpecV', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.gridSpec',
    itemId: 'gridSpec',
    frame: true,
    flex: 1,
    forceFit: true,  // * ячейки распределяются по ширине всей таблицы
    store: 'manage.GridSpecS',
    title: 'Специальности',
    viewConfig: {
        plugins: {
            ptype: 'gridviewdragdrop',
            ddGroup: 'ddspec'
        },
        enableTextSelection:true
    },
    columnLines: true,
    plugins: 'bufferedrenderer',
    initComponent: function () {
        console.log('GridSpec init');

        this.plugins = [
            Ext.create('Ext.grid.plugin.CellEditing', {
                clicksToEdit: 1
            })
        ];

        this.tbar = App.util.Utilities.buttonSaveDelete;

        this.tools = [
            {
                type: 'help',
                itemId: 'instruction',
                tooltip: 'Word-инструкция'
            },
            {
                type: 'refresh',
                itemId: 'refreshGridSpecS',
                tooltip: 'Обновить'
            }
        ]

        this.columns = [
            {
                text: '№',
                xtype: 'rownumberer',
                width: 30
            },
            {
                text: 'Специальность',
                itemId: 'columnSpecname',
                dataIndex: 'specname',
                tdCls: 'wrapText',
                editor: {
                    xtype: 'textfield'
                }
                /*editor: {
                    xtype: 'textfield',
                    errorSummary: false,
                    //allowBlank: false,
                    listeners: {  // * чтобы при нажатии ENTER не нажималась кнопка Сохранить, а переходило на другую строку
                        afterrender: function () {
                            var me = this;
                            me.el.swallowEvent(['keypress', 'keydown' ]);
                        }
                    }
                }*/
            }
        ];
        this.callParent(arguments);
        console.log('GridSpec end');
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