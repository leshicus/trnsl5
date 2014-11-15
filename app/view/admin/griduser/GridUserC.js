Ext.define('App.view.admin.griduser.GridUserC', {
    extend: 'Ext.app.ViewController',
    requires: [
        'App.view.admin.formuser.FormUserV',
        'App.view.admin.menuuser.MenuUserV'
    ],
    alias: 'controller.griduser',

    control: {
        '#refreshGridUserS': {
            click: function (button) {
                console.log('click refreshGridUserS');

                var gridUser = button.up('grid');
                gridUser.getViewModel().getStore('user').reload();
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
                var menu = Ext.create('App.view.admin.menuuser.MenuUserV');
                menu.showAt(e.getXY());
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
                        grid.getViewModel().getStore('user').remove(item);
                    });
                    grid.getViewModel().getStore('user').sync({
                        failure: function () {
                            Ext.MessageBox.alert('Ошибка', 'Не сохранено');
                        },
                        scope: this
                    });
                }else {
                    Ext.Msg.alert('Ошибка', 'Не выбран ни один пользователь');
                }
            }
        },
       /* '#menuResetPassword': {
            click: function (button) {
                console.log('click menuResetPassword');

                var grid = button.up('grid'),
                    selection = grid.getSelected();
                Ext.Msg.confirm('Сброс пароля', 'Сбросить пароль на начальный?', function (button) {
                    if (button == 'yes') {
                        Ext.each(selection, function (item) {
                            item.set('password', null);
                        });
                        grid.getViewModel().getStore('user').sync({
                            failure: function () {
                                Ext.MessageBox.alert('Ошибка', 'Не сохранено');
                            },
                            scope: this
                        });
                    }
                }, this);

            }
        },
        '#menuBlock': {
            click: function (button) {
                console.log('click menuBlock');

                var grid = button.up('grid'),
                    selection = grid.getSelected();
                Ext.Msg.confirm('Блокировка пользователя', 'Заблокировать учетную запись пользователя?', function (button) {
                    if (button == 'yes') {
                        var now = new Date(),
                            date = [App.util.Utilities.reverseDate(now.getDate()), App.util.Utilities.reverseDate(now.getMonth() + 1), now.getFullYear()].join('.')
                                + ' ' + now.getHours() + ':' + now.getMinutes();
                        Ext.each(selection, function (item) {
                            item.set('enddate', date);
                        });
                        grid.getViewModel().getStore('user').sync({
                            failure: function () {
                                Ext.MessageBox.alert('Ошибка', 'Не сохранено');
                            },
                            scope: this
                        });
                    }
                }, this);
            }
        },
        '#menuUnblock': {
            click: function (button) {
                console.log('click menuUnblock');

                var grid = button.up('grid'),
                    selection = grid.getSelected();
                Ext.Msg.confirm('Разблокировка пользователя', 'Разблокировать учетную запись пользователя?', function (button) {
                    if (button == 'yes') {
                        Ext.each(selection, function (item) {
                            item.set('enddate', App.util.Utilities.nullDate);
                        });
                        grid.getViewModel().getStore('user').sync({
                            failure: function () {
                                Ext.MessageBox.alert('Ошибка', 'Не сохранено');
                            },
                            scope: this
                        });
                    }
                }, this);

            }
        }, *//*,
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

    }
});
