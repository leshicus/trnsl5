Ext.define('App.view.manage.question.question.GridQuestionM', {
    extend: 'Ext.app.ViewModel',
    requires: [],
    alias: 'viewmodel.gridQuestion',
    stores: {
        question: {
            fields: [],
            //autoSync: true,
            autoLoad: false,
            //idProperty:'userid',
            proxy: {
                type: 'ajax',
                api: {
                    create: 'resources/php/manage/syncGridQuestion.php?act=create',
                    read: 'resources/php/manage/syncGridQuestion.php?act=read',
                    update: 'resources/php/manage/syncGridQuestion.php?act=update',
                    destroy: 'resources/php/manage/syncGridQuestion.php?act=destroy'
                },
                reader: {
                    type: 'json'
                },
                writer: {
                    type: 'json',
                    allowSingle: false,
                    writeAllFields: true,
                    /*writeValue:function (data, field) {
                     if('specname' !== field.name)   {
                     Ext.data.writer.Json.prototype.writeValue.apply(this,arguments);
                     }
                     }*/
                },
                appendId: false,
                actionMethods: {
                    create: 'POST',
                    read: 'POST',
                    update: 'POST',
                    destroy: 'POST'
                }
            }
        }
    }
});
