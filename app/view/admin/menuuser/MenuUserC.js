Ext.define('App.view.admin.menuuser.MenuUserC', {
    extend: 'Ext.app.ViewController',
    requires: [

    ],
    alias: 'controller.menuuser',

    control: {
        '#menuResetPassword': {
            click: function (button) {
                console.log('click menuResetPassword');

                var grid = Ext.ComponentQuery.query('gridUser')[0],
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

                var grid = Ext.ComponentQuery.query('gridUser')[0],
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

                var grid = Ext.ComponentQuery.query('gridUser')[0],
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
        }
    }
});
