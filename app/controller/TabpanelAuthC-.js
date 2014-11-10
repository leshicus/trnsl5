Ext.define('App.controller.TabpanelAuthC', {
    extend: 'Ext.app.Controller',
    views: [
        'TabpanelAuthV',
        'TabAuthV',
        'TabRegV'
    ],
    models: [
    ],
    stores: [
    ],
    refs: [
    ],

    onLaunch: function () {
        var me = this;
    },
    init: function () {
        console.log('TabpanelAuthC init');

        this.control({
// * tabReg
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
                        comboSpec = tabReg.down('#comboSpeciality'),
                        storeSpec = comboSpec.getViewModel().getStore('spec');
                    storeSpec.clearFilter();
                    comboSpec.reset();
                    console.info(storeSpec);
                    storeSpec.filterBy(function(item){
                        console.info(arguments);
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
            },
// * tabAuth
            'tabAuth button[action=enter]': {
                click: function (button) {
                    console.log('action=enter');
                    var form = button.up('form').getForm();
                    if (form.isValid() ) {
                        form.submit({
                            waitMsg: 'Авторизация...',
                            success: function (response, action) {
                                // * открыть нужную подсистему
                                var formValues = form.getValues(),
                                    subsystem = formValues['comboSystem'],
                                    viewport = button.up('viewport'),
                                    layout = viewport.getLayout(),
                                    storeSpec = Ext.data.StoreManager.lookup('manage.GridSpecS');
                                storeSpec.clearFilter();
                                if(subsystem){
                                    switch (subsystem){
                                        case 1: // * Тестирование
                                            var toolbarUser = viewport.down('toolbarUser'),
                                                mainMI = toolbarUser.down('#mainMI'),
                                                buttonSelf = toolbarUser.down('#selfMI');
                                            buttonSelf.enable();
                                            mainMI.toggle(false);
                                            break;
                                        case 2:  // * Администрирование
                                            var treeUser = Ext.StoreManager.lookup('admin.TreeUserS'),
                                                storeRole = Ext.StoreManager.lookup('admin.ComboRoleS'),
                                                storeUser = Ext.StoreManager.lookup('admin.GridUserS'),
                                                storeExam = Ext.StoreManager.lookup('admin.GridExamS'),
                                                storeSigngroup = Ext.StoreManager.lookup('admin.GridSigngroupS'),
                                                storePerson = Ext.StoreManager.lookup('admin.GridPersonS'),
                                                toolbarAdmin = viewport.down('toolbarAdmin'),
                                                mainMI = toolbarAdmin.down('#mainMI');
                                            mainMI.toggle(false);
                                            treeUser.load();
                                            storeUser.load();
                                            storeRole.load();
                                            storeExam.load();
                                            storeSigngroup.load();
                                            storePerson.load();
                                            break;
                                        case 3:  // * Ведение
                                            var storeTreeQuestion = Ext.StoreManager.lookup('manage.TreeQuestionS'),
                                                storeTreeSpec = Ext.StoreManager.lookup('manage.TreeSpecS'),
                                                storeGridAct = Ext.StoreManager.lookup('manage.GridActS'),
                                                storeGridKnow = Ext.StoreManager.lookup('manage.GridKnowS'),
                                                storeGridOrg = Ext.StoreManager.lookup('manage.GridOrgS'),
                                                //storeGridAnswer = Ext.StoreManager.lookup('manage.GridAnswerS'),
                                                storeGridGroup = Ext.StoreManager.lookup('manage.GridGroupS'),
                                                toolbarManage = viewport.down('toolbarManage'),
                                                mainMI = toolbarManage.down('#mainMI');
                                            mainMI.toggle(false);
                                                //storeGridQuestion = Ext.StoreManager.lookup('manage.GridQuestionS');
                                            storeTreeQuestion.load();
                                            storeTreeSpec.load();
                                            storeGridAct.load();
                                            storeGridKnow.load();
                                            storeGridOrg.load();
                                            //storeGridAnswer.load();
                                            storeGridGroup.load();
                                            //storeGridQuestion.load();
                                            break;
                                        default:
                                            break;
                                    }
                                    layout.activeItem.query('.panel, .toolbar').forEach(App.util.Utilities.cascadeRemoveGrid);
                                    layout.setActiveItem(subsystem);
                                    var html = layout.activeItem.query('.box')[2];
                                    html.update('<img src="resources/image/App-user-icon.png">' + ' ' + action.result.fio);
                                }
                            },
                            failure: function (form, action) {
                                Ext.Msg.alert('Ошибка', action.result ? action.result.message : 'No response');
                            }
                        });
                    }
                }
            },
            'tabAuth button[action=refresh]': {
                click: function (button) {
                    console.log('action=refresh');

                    var form = button.up('form');
                    form.getForm().reset();
                }
            },
            'tabAuth button[action=changepassword]': {
                click: function (button) {
                    console.log('action=changepassword');

                    var form = button.up('form'),
                        values = form.getValues();
                    Ext.Ajax.request({
                        url:'resources/php/changePassword.php',
                        params: {
                            textLogin: values['textLogin'],
                            textOldPassword: values['textOldPassword'],
                            textNewPassword: values['textNewPassword']
                        },
                        success:function (response, options) {
                            var response = Ext.decode(response.responseText),
                                message = response.message;
                            Ext.Msg.alert('Пароль', message);
                        },
                        failure: function (response, options) {
                            var response = Ext.decode(response.responseText),
                                message = response.message;
                            Ext.Msg.alert('Ошибка', message);
                        }
                    });
                }
            }
        });
        console.log('TabpanelAuthC end');
    }
});