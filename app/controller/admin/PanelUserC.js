Ext.define('App.controller.admin.PanelUserC', {
    extend: 'Ext.app.Controller',
    views: [
        'admin.GridUserV',
        'admin.TreeUserV',
        'admin.PanelUserV',
        'admin.FormUserV'
    ],
    models: [
        'admin.GridUserM'
    ],
    stores: [
        'admin.GridUserS',
        'admin.TreeUserS',
        'admin.ComboRoleS'
    ],
    refs: [
        {
            ref: 'gridUser',
            selector: 'gridUser'
        },
        {
            ref: 'treeUser',
            selector: 'treeUser'
        }
    ],

    onLaunch: function () {
        //var me = this;
    },
    init: function () {
        console.log('PanelUserC init');
        this.control({
            'treeUser': {
                cellclick: function (gridview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
                    console.log('treeUser cellclick');

                    var treeUser = this.getTreeUser(),
                        gridUser = this.getGridUser(),
                        storeUser = gridUser.store,
                        selection = treeUser.getSelected();
                    if (selection) {
                        var groupid = selection.raw.groupid,
                            actid = selection.raw.actid,
                            orgid = selection.raw.orgid;
                        storeUser.clearFilter();
                        storeUser.filter(function (rec) {
                            if(groupid)
                                if (rec.get('groupid') == groupid)
                                    return true;
                            if(actid)
                                if (rec.get('actid') == actid)
                                    return true;
                            if(orgid)
                                if (rec.get('orgid') == orgid)
                                    return true;
                        });
                    }
                },
                render: function () {
                    var gridUser = this.getGridUser(),
                        storeUser = gridUser.store;
                    storeUser.filter(function () {
                        return false
                    });
                }
            },

            '#refreshTreeUser': {
                click: function (button) {
                    var treeUser = this.getTreeUser(),
                        gridUser = this.getGridUser(),
                        storeUser = gridUser.store;
                    storeUser.filter(function () {
                        return false
                    });
                    treeUser.store.load();
                }
            },
            '#expandTreeUser': {
                click: function (button) {
                    var treeUser = this.getTreeUser();
                    treeUser.expandAll();
                }
            },
            '#collapseTreeUser': {
                click: function (button) {
                    var treeUser = this.getTreeUser();
                    treeUser.collapseAll();
                }
            },
// *  gridUser
            '#refreshGridUserS': {
                click: function (button) {
                    console.log('click refreshGridUserS');

                    var gridUser = this.getGridUser();
                    gridUser.store.load();
                }
            },
            'gridUser': {
                celldblclick: function (row, td, cellIndex, record, tr, rowIndex, e, eOpts) {
                    console.log('celldblclick');

                    var form = Ext.create('App.view.admin.formuser.FormUserV');
                    form.loadRecord(record);
                    var window = Ext.create('Ext.Window', {
                        frame: true,
                        title: 'Редактирование данных сотрудника',
                        width: 500,
                        height: 250,
                        closable: false,
                        modal: true,
                        layout: 'fit'
                    });
                    window.add(form);
                    window.show();
                },
                // * чтобы контекстное меню показывалось
                itemcontextmenu: function (view, rec, node, index, e) {
                    e.stopEvent();
                    view.ownerCt.contextMenu.showAt(e.getXY());
                    return false;
                }
            },
            'gridUser button[action=delete]': {
                click: function (button) {
                    console.log('action=delete');

                    var grid = button.up('grid'),
                        selection = grid.getSelected();
                    // * удаляем несколько пемеченных записей
                    if(selection != ''){
                        Ext.each(selection, function (item) {
                            grid.store.remove(item);
                        });
                        grid.store.load();
                    }else {
                        Ext.Msg.alert('Ошибка', 'Не выбран ни один пользователь');
                    }
                }
            },
            '#menuResetPassword': {
                click: function (button) {
                    console.log('click menuResetPassword');

                    var grid = this.getGridUser(),
                        selection = grid.getSelected();
                    Ext.Msg.confirm('Сброс пароля', 'Сбросить пароль на начальный?', function (button) {
                        if (button == 'yes') {
                            Ext.each(selection, function (item) {
                                item.set('password', null);
                            });
                            //grid.store.sync();
                        }
                    }, this);

                }
            },
            '#menuBlock': {
                click: function (button) {
                    console.log('click menuBlock');

                    var grid = this.getGridUser(),
                        selection = grid.getSelected();
                    Ext.Msg.confirm('Блокировка пользователя', 'Заблокировать учетную запись пользователя?', function (button) {
                        if (button == 'yes') {
                            var now = new Date(),
                                date = [App.util.Utilities.reverseDate(now.getDate()), App.util.Utilities.reverseDate(now.getMonth() + 1), now.getFullYear()].join('.')
                                    + ' ' + now.getHours() + ':' + now.getMinutes();
                            Ext.each(selection, function (item) {
                                item.set('enddate', date);
                            });
                            //grid.store.sync();
                        }
                    }, this);
                }
            },
            '#menuUnblock': {
                click: function (button) {
                    console.log('click menuUnblock');

                    var grid = this.getGridUser(),
                        selection = grid.getSelected();
                    Ext.Msg.confirm('Разблокировка пользователя', 'Разблокировать учетную запись пользователя?', function (button) {
                        if (button == 'yes') {
                            Ext.each(selection, function (item) {
                                item.set('enddate', App.util.Utilities.nullDate);
                            });
                            //grid.store.sync();
                        }
                    }, this);

                }
            }, /*,
             'gridUser actioncolumn': {
             click: function (grid, view, recordIndex, cellIndex, item, e) {
             console.log('actioncolumn');

             Ext.Msg.confirm('Сброс пароля', 'Сбросить пароль на начальный?', function (button) {
             if (button == 'yes') {
             grid.store.getAt(recordIndex).set("password", null);
             grid.store.sync();
             }
             }, this);
             }
             }*/
            'formUser button[action=save]': {
                click: function (button) {
                    console.log('save button');

                    var form = button.up('form'),
                        win = form.up('window'),
                        values = form.getValues(),
                        grid = this.getGridUser(),
                        record = form.getForm().getRecord();
                    if (form.isValid()) {
                        record.set(values);
                        win.close();
                        grid.store.load();
                    } else {
                        Ext.Msg.alert('Форма', 'Форма заполнена не правильно');
                    }
                }
            },
            'formUser button[action=cancel]': {
                click: function (button) {
                    console.log('cancel button');

                    button.up('form').getForm().reset();
                    button.up('window').close();
                }
            }

        });
        console.log('PanelUserC end');
    }
});