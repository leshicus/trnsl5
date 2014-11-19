Ext.define('App.view.admin.clas.GridExamV', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.grid.plugin.CellEditing',
        'App.view.admin.clas.GridExamM',
        'App.view.admin.clas.GridExamC',
        'App.view.common.AddDeleteV',
        'App.view.common.DateFromToV'
    ],
    alias: 'widget.gridExam',
    viewModel: {type: 'gridexam'},
    controller: 'gridexam',
    itemId: 'gridExam',
    flex: 1,
    //margin: '0 0 5 0',
    forceFit: true,
    bind: '{exam}',
    title: 'Экзамены',
    columnLines: true,
    selType: 'checkboxmodel',
    //bufferedRenderer : false,
    viewConfig: {
        stripeRows: true
        //enableTextSelection:true // * allow to select text in grid. Actually it's a gridview property
    },
    plugins: [
        {
            ptype: 'cellediting',
            pluginId: 'cellediting',
            clicksToEdit: 1,
            listeners: {
                scope: 'this',
                edit: 'onEdit'
            }
        }
    ],
    initComponent: function () {
        console.log('GridExam init');

        this.selModel = Ext.create('Ext.selection.CheckboxModel', {
            injectCheckbox: 0,
            mode: 'MULTI'
        });

        /*   this.plugins = [
         Ext.create('Ext.grid.plugin.CellEditing', {
         clicksToEdit: 1,
         listeners: {
         scope: 'this',
         edit: 'onEdit'
         }
         })
         ];*/

        this.tools = [
            {
                type: 'refresh',
                itemId: 'refreshGridExamS',
                tooltip: 'Обновить'
            }
        ]

        this.tbar = Ext.create('Ext.toolbar.Toolbar');

        var now = new Date(),
            year = now.getFullYear(),
            month = App.util.Utilities.reverseDate(now.getMonth() + 1),
            day = App.util.Utilities.reverseDate(now.getDate()),
            dateBegin = [[day, month, year].join('.'), '00:00'].join(' ');

        this.tbar.add(App.util.Utilities.buttonSaveDelete);
        this.tbar.add(
            {
                xtype: 'datefromto',
                _dateFrom: dateBegin,
                _allowBlankFrom: false
            });


    /*    var comboOrg = Ext.create('Ext.form.ComboBox', {
            bind: {store: '{org1}'},
            itemId: 'comboOrg',
            valueField: 'orgid',
            name: 'orgid',
            editable: false,
            queryMode: 'local',
            displayField: 'orgabbr'
        });*/

        this.columns = [
            {
                text: 'Номер',
                itemId: 'columnExamid',
                dataIndex: 'examid',
                menuDisabled: true,
                width: 40
            },
            {
                text: 'Дата',
                itemId: 'columnExamdate',
                dataIndex: 'examdate',
                format: 'd.m.Y H:i',
                menuDisabled: true,
                width: 80
            },
            {
                text: 'ФИО наблюдателя',
                itemId: 'columnFio',
                dataIndex: 'fio',
                tdCls: 'wrapText'
                //width: 140
            },
            {
                text: 'Организация',
                itemId: 'columnOrg',
                dataIndex: 'orgabbr',
                tdCls: 'wrapText',
                name: 'orgid',
                //editor: comboOrg,
                menuDisabled: true,
                width: 110,
                //renderer: App.util.Utilities.comboRenderer(comboOrg)
                editor: {
                    xtype: 'combobox',
                    bind: {store: '{org}'},
                    editable: false,
                    queryMode: 'local',
                    valueField: 'orgid',
                    displayField: 'orgabbr',
                    /* listeners: {
                     select: function (combo, record) {

                     var grid = combo.up('grid'),
                     vm = grid.getViewModel(),
                     store = vm.getStore('exam');
                     //selected = grid.getSelectionModel().getSelection()[0],
                     //rec = store.findRecord('examid',selected.get('examid'));
                     console.info(record, store.getProxy().getWriter());
                     store.getProxy().getWriter().config.writeValue(record.get('orgabbr'), record);
                     }
                     }*/
                },
                /*renderer: function(value,metaData ,record ,rowIndex ,colIndex ,store ,view ,retrn ) {
                 var result = '',
                 storeOrg = this.up('main').getViewModel().getStore('org');
                 storeOrg.findBy(function(record) {
                 if (record.get('orgid') == value) {
                 result = record.get('orgabbr');
                 }
                 });
                 return result;
                 }*/
            }
        ];

    /*    this.contextMenu = Ext.create('Ext.menu.Menu', {
            plain: true,
            border: false,
            items: [
                {
                    text: 'Печать: Сводная экзаменационная ведомость',
                    itemId: 'menuPrintConsolidated',
                    iconCls: 'icon_excel'
                }
            ]
        });*/

        this.callParent(arguments);
        console.log('GridExam end');
    },

    // отмеченная ячейка
    getSelected: function () {
        var sm = this.getSelectionModel();
        var rs = sm.getSelection();
        return rs;
    },
    onEdit: function (b, a) {
        var c = this, d;
        if ("orgabbr" === a.field) {
            d = a.column.field;
            a.record.set({orgid: d.getValue(), orgabbr: d.getRawValue()});
        }
    }
});