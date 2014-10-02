Ext.define('App.view.manage.FormQuestionV', {
    extend: 'Ext.form.Panel',
    alias: 'widget.formQuestion',
    itemId: 'formQuestion',
    bodyPadding: 5,
    defaults: {
        labelWidth: 100
    },
    border: false,
    layout: 'fit',
    constructor: function () {
        console.log('formQuestion init');
        var self = this;

        this.items = [
            {
                xtype: 'htmleditor',
                itemId: 'textQuestion',
                name: 'questiontext',
                enableColors: false,
                enableFont: false,
                defaultFont: 'Arial',
                enableLinks: false,
                enableSourceEdit: false
                //fieldLabel:'Вопрос'
            }
        ];

        this.buttons = [
            {
                text: 'Сохранить',
                action: 'save',
                scale: 'medium'
            },
            '->',
            {
                text: 'Отмена',
                action: 'cancel',
                scale: 'medium'
            }
        ];

        this.callParent(arguments);
        console.log('formUser end');
    }
});