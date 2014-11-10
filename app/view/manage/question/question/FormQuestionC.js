Ext.define('App.view.manage.question.question.FormQuestionC', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.formquestion',

    control: {
        'button[action=save]': {
            click: function (button) {
                console.log('save button');

                var form = button.up('form'),
                    win = form.up('window'),
                    values = form.getValues(),
                    record = form.getForm().getRecord(),
                    grid = Ext.ComponentQuery.query('gridQuestion')[0];
                if (values.questiontext) { // * такая вот валидация, allowBlank=false не работает
                    if (!record) { // * создание
                        var newRecord = Ext.create('App.model.manage.GridQuestionM'),
                            treeQuestion = Ext.ComponentQuery.query('treeQuestion')[0],
                            selectedTree = treeQuestion.getSelected(),
                            gridAnswer = Ext.ComponentQuery.query('gridAnswer')[0],
                            storeAnswer = gridAnswer.store;
                        storeAnswer.filter(function () {
                            return false
                        });
                        newRecord.set(values);
                        if (selectedTree.raw) {
                            var knowid = selectedTree.raw.knowid,
                                groupid = selectedTree.raw.groupid;
                            newRecord.set('groupid', groupid);
                            newRecord.set('knowid', knowid);
                        }
                        grid.store.insert(0, newRecord);
                    } else { // * исправление
                        record.set(values);
                    }
                    grid.store.sync({
                        success: function () {
                        },
                        failure: function () {
                            errorMessage('Ошибка подключения к базе', 'Не обновлено');
                        },
                        scope: this
                    });

                    win.close();
                } else {
                    Ext.Msg.alert('Внимание', 'Значение не может быть пустым');
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
