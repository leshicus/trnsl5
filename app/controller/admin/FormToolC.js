Ext.define('App.controller.admin.FormToolC', {
    extend: 'Ext.app.Controller',
    views: [
        //'admin.FormToolV'
    ],
    models: [
        //'admin.FormToolM'
    ],
    stores: [
        //'admin.FormToolS'
    ],
   /* refs: [
        {
            ref: 'formTool',
            selector: 'formTool'
        }
    ],*/

    onLaunch: function () {

    },
    init: function () {
        console.log('FormToolC init');

        this.control({
            'formTool #maxquestion': {
                change: function (field, newValue, oldValue, eOpts) {
                    var storeTool = Ext.data.StoreManager.lookup('admin.FormToolS'),
                        rec = storeTool.getAt(0);
                        rec.set('maxquestion', field.getValue());
                }
            },
            'formTool #minquestion': {
                change: function (field, newValue, oldValue, eOpts) {
                    var storeTool = Ext.data.StoreManager.lookup('admin.FormToolS'),
                        rec = storeTool.getAt(0);
                    rec.set('minquestion', field.getValue());
                }
            },
            'formTool #regstatint': {
                change: function (field, newValue, oldValue, eOpts) {
                    var storeTool = Ext.data.StoreManager.lookup('admin.FormToolS'),
                        rec = storeTool.getAt(0);
                    rec.set('regstatint', field.getValue());
                }
            },
            'formTool #regstatdur': {
                change: function (field, newValue, oldValue, eOpts) {
                    var storeTool = Ext.data.StoreManager.lookup('admin.FormToolS'),
                        rec = storeTool.getAt(0);
                    rec.set('regstatdur', field.getValue());
                }
            },
            'formTool #examtimermin': {
                change: function (field, newValue, oldValue, eOpts) {
                    var storeTool = Ext.data.StoreManager.lookup('admin.FormToolS'),
                        rec = storeTool.getAt(0);
                    rec.set('examtimermin', field.getValue());
                }
            },
            /*'formTool #questiontime': {
             change:function (field, newValue, oldValue, eOpts) {
             var storeTool = Ext.data.StoreManager.lookup('admin.FormToolS'),
             rec = storeTool.getAt(0),
             maxquestion = this.getFormTool().down('#maxquestion').getValue();
             if(!(field.getValue() % maxquestion) && maxquestion && field.getValue())
             rec.set('questiontime',field.getValue());
             else
             Ext.Msg.alert('Количество времени на экзамен должно быть кратно числу вопросов в билете');
             }
             },*/
            'formTool button[action=save]': {
                click: function (button) {
                    console.log('action=save');

                    var storeTool = Ext.data.StoreManager.lookup('admin.FormToolS'),
                        form = this.getFormTool().getForm(),
                        examtimermin = this.getFormTool().down('#examtimermin').getValue(),
                        minquestion = this.getFormTool().down('#minquestion').getValue(),
                        regstatint = this.getFormTool().down('#regstatint').getValue(),
                        regstatdur = this.getFormTool().down('#regstatdur').getValue(),
                        maxquestion = this.getFormTool().down('#maxquestion').getValue();
                    if(form.isValid()){
                        if(maxquestion && minquestion && regstatint && regstatdur && examtimermin){
                            if (((examtimermin % maxquestion) == 0 && examtimermin != 0)
                                || examtimermin == 0){
                                storeTool.sync({
                                    success: function () {
                                        Ext.Msg.alert('Успех', 'Сохранено');
                                    },
                                    failure: function () {
                                        Ext.Msg.alert('Ошибка', 'Не сохранено');
                                    },
                                    scope: this
                                });
                            } else
                                Ext.Msg.alert('Ошибка значения', 'Количество времени на экзамен (' + examtimermin + ') должно быть кратно числу вопросов в билете (' + maxquestion + ')');
                        }else
                            Ext.Msg.alert('Ошибка значения', 'Значение 0 допустимо только для поля Количество времени на экзамен');
                    }else
                        Ext.Msg.alert('Ошибка значения', 'Форма заполнена с ошибками');
                }
            }
        });
        console.log('FormToolC end');
    }

});