Ext.define('App.view.manage.group.GridGroupV', {
    extend: 'Ext.grid.Panel',
    requires: [
        'App.view.main.MainM',
        'App.view.manage.group.GridGroupC'
    ],
    viewModel: {type: 'main'},
    controller:'gridGroup',
    bind: '{group}',
    alias: 'widget.gridGroup',
    itemId: 'gridGroup',
    frame: false,
    flex: 1,
    forceFit: true,
    //store: 'manage.GridGroupS',
    title: 'Группы',
    columnLines: true,
    viewConfig: {
        stripeRows: true
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

        var main = Ext.ComponentQuery.query('main')[0],
            mainVM = main.getViewModel(),
            storeAct = mainVM.getStore('act'),
            storeKnow = mainVM.getStore('know'),
            comboAct = Ext.create('Ext.form.ComboBox', {
                //store: storeAct,
                bind:{store:'{act}'},
                viewModel: {type: 'main'},
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
                //store: storeKnow,
                bind:{store:'{know}'},
                viewModel: {type: 'main'},
                valueField: 'knowid',
                name: 'knowid',
                multiSelect: true,
                editable: false,
                displayField: 'knowname'
            });
        this.columns = [
            {
                text: 'id',
                itemId: 'columnGroupid',
                dataIndex: 'groupid',
                width: 50
            },
            {
                text: 'Вид<br>деятельности',
                itemId: 'columnActid',
                dataIndex: 'actid',
                width: 130,
                editor: comboAct,
                renderer: Utilities.renderGridGroup(comboAct)
                //renderer: App.util.Utilities.comboRendererVM(comboAct,'act')
            },//todo после добавления Вида деятельности, здесь не отображается до перезагрузки
            {
                text: 'Номер<br>группы',
                itemId: 'columnGroupnum',
                dataIndex: 'groupnum',
                width: 70,
                editor: {
                    xtype: 'textfield'
                }
            },
            {
                text: 'Наименование',
                itemId: 'columnGroupname',
                dataIndex: 'groupname',
                //flex: 1,
                //width: 300,
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
                //flex: 1,
                width: 300,
                editor: comboKnow,
                renderer: App.util.Utilities.renderGroupknow
                //renderer: App.util.Utilities.comboRendererVM(comboKnow,'know')
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