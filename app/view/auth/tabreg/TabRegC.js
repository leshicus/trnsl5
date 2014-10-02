Ext.define('App.view.auth.tabreg.TabRegC', {
    extend: 'Ext.app.ViewController',
    requires: [
       // 'Office.view.card.FormCardV'
    ],
    alias: 'controller.tabReg',

    listen: {
        controller: {

        }
    },

    control: {
        'tabReg': {
            activate: function ( tab, eOpts ) {
                console.log('activate');

                var form = tab.getForm();
                form.reset();
            }
        },
        'tabReg button[action=register]': {
            click: function (button) {
                console.log('action=register');

                var form = button.up('form').getForm();
                if (form.isValid() ) {
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
        'tabReg button[action=refresh]': {
            click: function (button) {
                console.log('action=refresh');

                var form = button.up('form');
                form.getForm().reset();
            }
        },
        'tabReg #comboOrg': {
            change: function (field, newValue, oldValue, eOpts) {
                console.log('comboOrg change');

                var tabReg = field.up('#tabReg'),
                    comboSpec = tabReg.down('#comboSpeciality');
                comboSpec.store.clearFilter();
                comboSpec.store.filter(function(item){
                    if(item.get('orgid') == newValue){
                        comboSpec.enable();
                        return true;
                    }
                });
                /*comboSpec.store.load({
                 params:{
                 orgid:newValue
                 },
                 callback: function (records, operation, success) {
                 if (success == true) {
                 comboSpec.enable();
                 } else {
                 App.util.Utilities.errorMessage('Ошибка подключения к базе', 'Должности не получены');
                 }
                 },
                 scope: this
                 });*/
            }
        }

    }

});
