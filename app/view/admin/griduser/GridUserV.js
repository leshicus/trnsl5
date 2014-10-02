Ext.define('App.view.admin.griduser.GridUserV', {
    extend: 'Ext.grid.Panel',
    requires: [
        'App.view.admin.griduser.GridUserM',
        'App.view.admin.griduser.GridUserC',
        'Ext.grid.column.RowNumberer',
        'Ext.toolbar.Paging'
        //'App.view.main.MainM'
    ],
    alias: 'widget.gridUser',
    viewModel: {type: 'griduser'},
    controller:'griduser',
    itemId: 'gridUser',
    frame: true,
    flex: 1,
    forceFit: true,  // * ячейки распределяются по ширине всей таблицы
    bind: '{user}',
    title: 'Пользователи',
    //selType: 'checkboxmodel',
    columnLines: true,
    viewConfig: {
        enableTextSelection:true // * allow to select text in grid. Actually it's a gridview property
    },
    initComponent: function () {
        console.log('GridUser init');

        var self = this;

        /*this.plugins = [ Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToEdit: 2
        })
        ];*/

        this.tools = [
            {
                type: 'refresh',
                itemId: 'refreshGridUserS',
                tooltip: 'Обновить'
            }
        ];

        this.tbar = [
            {
                text: 'Удалить',
                action: 'delete',
                scale:'medium',
                iconCls: 'icon_delete'
            }
        ];

        this.selModel = Ext.create('Ext.selection.CheckboxModel', {
            injectCheckbox:0,
            mode:'MULTI'
        });

        var comboSpec = Ext.create('Ext.form.ComboBox', {
            //store: 'manage.GridSpecS',
            bind: {store:'{spec}'},
            viewModel: {type: 'main'},
            valueField: 'specid',
            name: 'specid',
            editable:false,
            displayField: 'specname'/*,
            listeners: {  // * чтобы при нажатии ENTER не нажималась кнопка Сохранить, а переходило на другую строку
                afterrender: function () {
                    var me = this;
                    me.el.swallowEvent(['keypress', 'keydown' ]);
                }
            }*/
        });
        var comboRole = Ext.create('Ext.form.ComboBox', {
            //store: 'admin.ComboRoleS',
            valueField: 'id',
            name: 'roleid',
            editable:false,
            displayField: 'name'/*,
            listeners: {  // * чтобы при нажатии ENTER не нажималась кнопка Сохранить, а переходило на другую строку
                afterrender: function () {
                    var me = this;
                    me.el.swallowEvent(['keypress', 'keydown' ]);
                }
            }*/
        });


        this.columns = [
            {
                text: '№',
                xtype: 'rownumberer',
                width: 30
            },
            {
                text: 'Фамилия',
                itemId: 'columnFamilyname',
                dataIndex: 'familyname'/*,
                editor: {
                    xtype: 'textfield',
                    errorSummary: false,
                    allowBlank: false,
                    listeners: {  // * чтобы при нажатии ENTER не нажималась кнопка Сохранить, а переходило на другую строку
                        afterrender: function () {
                            var me = this;
                            me.el.swallowEvent(['keypress', 'keydown' ]);
                        }
                    }
                }*/
            },
            {
                text: 'Имя',
                itemId: 'columnFirstname',
                dataIndex: 'firstname'/*,
                editor: {
                    xtype: 'textfield',
                    errorSummary: false,
                    allowBlank: false,
                    listeners: {  // * чтобы при нажатии ENTER не нажималась кнопка Сохранить, а переходило на другую строку
                        afterrender: function () {
                            var me = this;
                            me.el.swallowEvent(['keypress', 'keydown' ]);
                        }
                    }
                }*/
            },
            {
                text: 'Отчество',
                itemId: 'columnLastname',
                dataIndex: 'lastname'/*,
                editor: {
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
                text: 'Специальность',
                itemId: 'columnSpecid',
                dataIndex: 'specname',
                //editor: comboSpec,
                tdCls: 'wrapText',
                //renderer: App.util.Utilities.comboRendererVM(comboSpec,'spec')
            },
            {
                text: 'Роль',
                itemId: 'columnRoleid',
                dataIndex: 'roleid',
                //editor: comboRole,
                renderer: App.util.Utilities.comboRenderer(comboRole)
            },
            {
                text: 'Логин',
                itemId: 'columnLogin',
                dataIndex: 'login'
            },
            {
                text: 'Блокирован',
                itemId: 'columnStatus',
                width: 80,
                format:'d.m.Y H:i',
                dataIndex: 'enddate',
                /*editor: {
                    xtype: 'datefield',
                    readOnly:true,
                    errorSummary: false,
                    listeners: {  // * чтобы при нажатии ENTER не нажималась кнопка Сохранить, а переходило на другую строку
                        afterrender: function () {
                            var me = this;
                            me.el.swallowEvent(['keypress', 'keydown' ]);
                        }
                    }
                },*/
                renderer: App.util.Utilities.columnStatus
            }
        ];

        this.contextMenu = Ext.create('Ext.menu.Menu', {
            plain:true,
            border:false,
            items:[
                {
                    text:'Сбросить пароль',
                    itemId:'menuResetPassword',
                    iconCls: 'icon_password'
                },
                '-',
                {
                    text:'Блокировать',
                    itemId:'menuBlock',
                    iconCls: 'icon_block'
                },
                {
                    text:'Разблокировать',
                    itemId:'menuUnblock',
                    iconCls: 'icon_unblock'
                }
            ]
        });

        /*this.getSelectionModel().on({
            selectionchange:function (sm, records) {
                if(records.length){
                    var block = records[0].get('enddate');
                    //console.log(block);
                    if(block != '00.00.0000 00:00' && block){
                        self.getMenuBlock().disable();
                        self.getMenuUnblock().enable();
                    }else{
                        self.getMenuBlock().enable();
                        self.getMenuUnblock().disable();
                    }
                    self.getMenuResetPassword().enable();

                }
            }
        });*/

        this.callParent(arguments);
        console.log('GridUser end');
    },

    // отмеченная ячейка
    getSelected: function () {
        var sm = this.getSelectionModel();
        var rs = sm.getSelection();
        return rs;
    }
});