Ext.define('App.view.manage.question.question.FormUploadC', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.formupload',

    control: {
        'button[action=import]': {
            click: function (button) {
                console.log('import');


                var form = button.up('formUpload'),
                    field = form.down('#import'),
                    gridQuestion = Ext.ComponentQuery.query('gridQuestion')[0],
                    gridAnswer = gridQuestion.up('#content').down('gridAnswer'),
                    treeQuestion = gridQuestion.up('#content').down('treeQuestion'),
                    selectedTree = treeQuestion.getSelected(),
                    knowid,
                    groupid;
                if (form.isValid()) {
                    if (selectedTree) {
                        if (selectedTree.raw) {
                            knowid = selectedTree.raw.knowid;
                            groupid = selectedTree.raw.groupid;
                        }
                        form.submit({
                            waitMsg: 'Идет загрузка...',
                            params: {
                                knowid: knowid,
                                groupid: groupid
                            },
                            success: function (response, options) {
                                var message = options.result.message,
                                    success = options.result.success;
                                if (success) {
                                    Ext.Msg.alert('Успех', message);
                                } else {
                                    App.util.Utilities.errorMessage('Ошибка файла', message);
                                }
                                gridQuestion.getViewModel().getStore('question').load({
                                    params: {
                                        knowid: knowid,
                                        groupid: groupid
                                    }
                                });
                                form.getForm().reset();
                                form.up('window').close();
                            },
                            failure: function (response, options) {
                                var message = options.result.message;
                                App.util.Utilities.errorMessage('Ошибка подключения к базе', message);
                            },
                            scope: this
                        });

                        /*Ext.Ajax.request({
                         url: 'resources/php/manage/importQuestion.php',
                         isUpload: true,
                         params: {
                         knowid: knowid,
                         groupid: groupid
                         },
                         timeout: 600000,  // * 5 минут
                         method: 'POST',
                         form: formId,
                         success: function (response, options) {

                         },
                         failure: function (response, options) {
                         var resp = Ext.decode(response.responseText),
                         message = resp.message;
                         App.util.Utilities.errorMessage('Ошибка подключения к базе', message);
                         Ext.getBody().unmask();
                         },
                         scope: this
                         });*/

                    } else {
                        App.util.Utilities.errorMessage('Ошибка импорта', 'Не выбран каталог для импорта');
                    }
                } else {
                    App.util.Utilities.errorMessage('Ошибка', 'Форма заполнена с ошибками');
                }
            }
        },
        'button[action=reset]': {
            click: function (button) {
                console.log('cancel button');

                button.up('form').getForm().reset();
                button.up('window').close();
            }
        }

    }
});