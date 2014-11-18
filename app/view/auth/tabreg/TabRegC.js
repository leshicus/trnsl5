Ext.define('App.view.auth.tabreg.TabRegC', {
    extend: 'Ext.app.ViewController',
    requires: [
        'App.view.main.MainM'
    ],
    alias: 'controller.tabReg',

    listen: {
        controller: {}
    },

    control: {
        'tabReg': {
            activate: function (tab, eOpts) {
                console.log('activate');

                var form = tab.getForm();
                form.reset();
            }
        },
        'button[action=register]': {
            click: function (button) {
                console.log('action=register');

                var form = button.up('form').getForm();
                if (form.isValid()) {
                    form.submit({
                        waitMsg: 'Регистрация...',
                        success: function (form, action) {
                            Ext.Msg.alert('Регистрация', action.result.message);
                        },
                        failure: function (form, action) {
                            Ext.Msg.alert('Ошибка', action.result ? action.result.message : 'No response');
                        }
                    });
                }
            }
        },
        'button[action=refresh]': {
            click: function (button) {
                console.log('action=refresh');

                var form = button.up('form');
                form.getForm().reset();
            }
        },
        '#comboOrg': {
            change: function (field, newValue, oldValue, eOpts) {
                console.log('comboOrg change');
                var tabReg = field.up('#tabReg'),
                    comboSpec = tabReg.down('#comboSpeciality'),
                    main = field.up('main'),
                    storeSpec = this.getView().getViewModel().getStore('spec');
                //storeSpec.clearFilter();
                comboSpec.disable();
                //comboSpec.reset();
                /*storeSpec.filterBy(function(item){
                 if(item.get('orgid') == newValue){
                 comboSpec.enable();
                 return true;
                 }
                 });*/
                storeSpec.load({
                    params: {
                        orgid: newValue
                    },
                    callback: function (records, operation, success) {
                        if (success == true) {
                            comboSpec.enable();
                        } else {
                            App.util.Utilities.errorMessage('Ошибка подключения к базе', 'Должности не получены');
                        }
                    },
                    scope: this
                });
            }
        }

    }

});
