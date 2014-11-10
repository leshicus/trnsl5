Ext.define('App.view.manage.question.answer.GridAnswerC', {
    extend: 'Ext.app.ViewController',
    requires: [
        'App.view.manage.question.answer.FormAnswerV'
    ],
    alias: 'controller.gridanswer',

    control: {
        '#':{
            celldblclick: function (row, td, cellIndex, record, tr, rowIndex, e, eOpts) {
                console.log('celldblclick');

                var form = Ext.create('App.view.manage.question.answer.FormAnswerV');
                form.loadRecord(record);
                var window = Ext.create('Ext.Window', {
                    frame: true,
                    title: 'Редактирование ответа',
                    width: 500,
                    height: 400,
                    closable: false,
                    modal: true,
                    layout: 'fit'
                });
                window.add(form);
                window.show();
            }
        },

        'button[action=add]': {
            click: function (button) {
                console.log('action=add');

                var gridQuestion = button.up('#content').down('gridQuestion'),
                    selectedQuestion = gridQuestion.getSelected();
                if (selectedQuestion != '') {
                    var form = Ext.create('App.view.manage.question.answer.FormAnswerV');
                    var window = Ext.create('Ext.Window', {
                        frame: true,
                        title: 'Редактирование ответа',
                        width: 500,
                        height: 400,
                        closable: false,
                        modal: true,
                        layout: 'fit'
                    });
                    window.add(form);
                    window.show();
                } else {
                    Ext.Msg.alert('Ошибка', 'Не выделен вопрос');
                }
            }
        },
        'button[action=delete]': {
            click: function (button) {
                console.log('action=delete');

                var grid = button.up('#content').down('gridAnswer'),
                    selection = grid.getSelected();
                // * удаляем несколько пемеченных записей
                if (selection != '') {
                    Ext.each(selection, function (item) {
                        grid.getViewModel().getStore('answer').remove(item);
                    });
                }else {
                    Ext.Msg.alert('Ошибка', 'Не выбран ни один ответ');
                }
            }
        },
        /*'button[action=save]': {
         render: function (button) {
         console.log('button render');

         var controller = App.app.getController('manage.PanelQuestionC');
         controller.buttonSaveDisable();
         },
         click: function (button) {
         console.log('action=save');

         var grid = button.up('grid');
         grid.store.sync({
         failure: function () {
         Ext.MessageBox.alert('Ошибка', 'Не сохранено');
         },
         scope: this
         });
         //grid.body.mask('Saving Record Please Wait...');
         }
         },*/
        /*'gridAnswer checkcolumn': {
         checkchange: function (me, rowIndex, checked, eOpts) {
         var controller = App.app.getController('manage.PanelQuestionC');
         controller.buttonSaveDisable();
         }
         },*/

    }
});
