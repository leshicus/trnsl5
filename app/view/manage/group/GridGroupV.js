Ext.define('App.view.manage.GridGroupV', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.gridGroup',
    itemId: 'gridGroup',
    frame: true,
    flex: 1,
    //forceFit: true,
    store: 'manage.GridGroupS',
    title: 'Группы',
    columnLines: true,
    viewConfig: {
        enableTextSelection:true // * allow to select text in grid. Actually it's a gridview property
    },
    initComponent: function () {
        console.log('GridGroup init');

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
                itemId: 'refreshGridGroupS',
                tooltip: 'Обновить'
            }
        ]

        var storeAct = Ext.data.StoreManager.lookup('manage.GridActS'),
            storeKnow = Ext.data.StoreManager.lookup('manage.GridKnowS'),
            comboAct = Ext.create('Ext.form.ComboBox', {
                store: storeAct,
                valueField: 'actid',
                name: 'actid',
                editable: false,
                displayField: 'actabbr'/*,
                 listeners: {  // * чтобы при нажатии ENTER не нажималась кнопка Сохранить, а переходило на другую строку
                 afterrender: function () {
                 var me = this;
                 me.el.swallowEvent(['keypress', 'keydown' ]);
                 }
                 }*/
            }),
            comboKnow = Ext.create('Ext.form.ComboBox', {
                store: storeKnow,
                valueField: 'knowid',
                name: 'knowid',
                multiSelect: true,
                editable: false,
                displayField: 'knowname'
            });

        this.columns = [
            {
                text: 'Номер',
                itemId: 'columnGroupnum',
                dataIndex: 'groupnum',
                width: 100,
                editor: {
                    xtype: 'textfield'
                }
            },
            {
                text: 'Вид деятельности',
                itemId: 'columnActid',
                dataIndex: 'actid',
                width: 200,
                editor: comboAct,
                renderer: App.util.Utilities.renderGridGroup(comboAct)
            },
            {
                text: 'Наименование',
                itemId: 'columnGroupname',
                dataIndex: 'groupname',
                flex: 1,
                editor: {
                    xtype: 'textfield'
                }
                /*editor: {
                 xtype: 'textfield',
                 errorSummary: false,
                 listeners: {  // * чтобы при нажатии ENTER не нажималась кнопка Сохранить, а переходило на другую строку
                 afterrender: function () {
                 var me = this;
                 me.el.swallowEvent(['keypress', 'keydown' ]);
                 }
                 }
                 }*/
            },
            {
                text: 'Области знания',
                itemId: 'columnGroupknow',
                dataIndex: 'knowids',
                tdCls: 'wrapText',
                flex: 1,
                editor: comboKnow,
                renderer: App.util.Utilities.renderGroupknow
            }
        ];
        this.callParent(arguments);
        console.log('GridGroup end');
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