Ext.define('App.view.manage.question.question.FormQuestionC', {
    extend: 'Ext.app.ViewController',
    requires: [
        'App.model.manage.GridQuestionM'
    ],
    alias: 'controller.formquestion',

    control: {
        'button[action=save]': {
            click: function (button) {
                console.log('save button');

                var form = button.up('form'),
                    win = form.up('window'),
                    values = form.getValues(),
                    record = form.getForm().getRecord(),
                    grid = Ext.ComponentQuery.query('gridQuestion')[0],
                    storeQuest = grid.getViewModel().getStore('question');
                if (values.questiontext) { // * такая вот валидация, allowBlank=false не работает
                    if (!record) { // * создание
                        var newRecord = Ext.create('App.model.manage.GridQuestionM'),
                            treeQuestion = Ext.ComponentQuery.query('treeQuestion')[0],
                            selectedTree = treeQuestion.getSelected(),
                            gridAnswer = Ext.ComponentQuery.query('gridAnswer')[0],
                            storeAnswer = gridAnswer.getViewModel().getStore('answer');
                        /*storeAnswer.filterBy(function () {
                            return false
                        });*/
                        newRecord.set(values);
                        if (selectedTree.raw) {
                            var knowid = selectedTree.raw.knowid,
                                groupid = selectedTree.raw.groupid;
                            newRecord.set('groupid', groupid);
                            newRecord.set('knowid', knowid);
                        }
                        storeQuest.insert(0, newRecord);
                    } else { // * исправление
                        record.set(values);
                    }
                    storeQuest.sync({
                        success: function () {
                        },
                        failure: function () {
                            Utilities.errorMessage('Ошибка подключения к базе', 'Не обновлено');
                        },
                        scope: this
                    });
                    storeQuest.reload();
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
