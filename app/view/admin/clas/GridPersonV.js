Ext.define('App.view.admin.clas.GridPersonV', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.grid.plugin.CellEditing',
        'App.view.admin.clas.GridPersonC',
        'App.view.admin.clas.GridPersonM'
    ],
    alias: 'widget.gridPerson',
    viewModel: {type: 'gridperson'},
    controller:'gridperson',
    itemId: 'gridPerson',
    frame: true,
    //margin: '0 0 0 5',
    bind: '{person}',
    title: 'Сотрудники',
    columnLines: true,
    selType: 'checkboxmodel',
    //plugins: 'bufferedrenderer',
    viewConfig: {
        enableTextSelection:true // * allow to select text in grid. Actually it's a gridview property
    },
    initComponent: function () {
        console.log('GridPerson init');

        var self = this;

        this.selModel = Ext.create('Ext.selection.CheckboxModel', {
            injectCheckbox:0,
            mode:'MULTI'
        });

        this.tbar = [
            {
                text: 'Удалить',
                action: 'delete',
                scale:'medium',
                iconCls: 'icon_delete'
            }
        ];

        this.tools = [
            {
                type: 'refresh',
                itemId: 'refreshGridPerson',
                tooltip: 'Обновить'
            }
        ];

        this.columns = [
            {
                text: '№',
                xtype: 'rownumberer',
                width: 30
            },
            {
                text: 'ФИО',
                itemId: 'columnFio',
                dataIndex: 'fio',
                flex:1
            },
            {
                text: 'Время',
                itemId: 'columnTime',
                dataIndex: 'timelimit',
                width: 60
            },
            {
                text: 'Баллы',
                itemId: 'columnBalls',
                dataIndex: 'balls',
                width: 60
            },
            {
                text: 'Результат',
                itemId: 'columnResult',
                dataIndex: 'result',
                width: 130,
                renderer:App.util.Utilities.renderResult
            },
            {
                text: 'Регистрация',
                itemId: 'columnReg',
                dataIndex: 'reg',
                width: 150,
                renderer:function (value, metaData) {
                    if (value == 1) {
                        metaData.style += 'color:green; font-weight: bold;';
                        return App.util.Utilities.regString;
                    } else if (value == 0 || value == null){
                        metaData.style += 'color:red; font-weight: bold;';
                        return App.util.Utilities.unregString;
                    }
                }
            }
        ];
//  TODO переделать меню
        this.contextMenu = Ext.create('Ext.menu.Menu', {
            plain:true,
            border:false,
            items:[
                {
                    text:'Зарегистрировать',
                    itemId:'menuReg',
                    iconCls: 'icon_reg'
                },
                {
                    text:'Снять регистрацию',
                    itemId:'menuUnreg',
                    iconCls: 'icon_unreg'
                },
                '-',
                {
                    text:'Печать: одиночная ведомость',
                    itemId:'menuPrintOne',
                    iconCls: 'icon_pdf'
                }
            ]
        });

        this.getSelectionModel().on({
            selectionchange:function (sm, records) {
                if(records.length){
                    var reg = records[0].get('reg');
                    if(!reg || reg == 0){
                        self.getMenuReg().enable();
                        self.getMenuUnreg().disable();
                    }else{
                        self.getMenuReg().disable();
                        self.getMenuUnreg().enable();
                    }
                }
            }
        });

        this.callParent(arguments);
        console.log('GridPerson end');
    },

    // отмеченная ячейка
    getSelected: function () {
        var sm = this.getSelectionModel();
        var rs = sm.getSelection();
        return rs;
    },
    getMenuReg:function () {
        return this.contextMenu.query('#menuReg')[0];
    },
    getMenuUnreg:function () {
        return this.contextMenu.query('#menuUnreg')[0];
    }
});