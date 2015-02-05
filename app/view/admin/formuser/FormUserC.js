Ext.define('App.view.admin.formuser.FormUserC', {
    extend: 'Ext.app.ViewController',
    requires: [

    ],
    alias: 'controller.formuser',

    control: {
        'button[action=save]': {
            click: function (button) {
                console.log('save button');

                var form = button.up('form'),
                    win = form.up('window'),
                    values = form.getValues(),
                    grid = Ext.ComponentQuery.query('gridUser')[0],
                    record = form.getForm().getRecord();
                if (form.isValid()) {
                    record.set(values);
                    grid.getViewModel().getStore('user').sync({
                        success: function () {
                            grid.getViewModel().getStore('user').reload();
                        },
                        failure: function () {
                            //Ext.Msg.alert('Ошибка', 'Не сохранено');
                            Utilities.errorMessage('Ошибка', 'Не сохранено');
                        },
                        scope: this
                    });
                    win.close();

                } else {
                    Ext.Msg.alert('Форма', 'Форма заполнена с ошибками');
                }
            }
        },
        'button[action=cancel]': {
            click: function (button) {
                console.log('cancel button');

                button.up('form').getForm().reset();
                button.up('window').close();
            }
        }

    }
});
