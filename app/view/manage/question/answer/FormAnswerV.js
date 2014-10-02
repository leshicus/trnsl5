Ext.define('App.view.manage.FormAnswerV', {
    extend: 'Ext.form.Panel',
    alias: 'widget.formAnswer',
    itemId: 'formAnswer',
    bodyPadding: 5,
    defaults: {
        labelWidth: 100,
        labelAlign:'left'
    },
    border: false,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    constructor: function () {
        console.log('formAnswer init');
        var self = this;

        this.items = [
            {
                xtype: 'htmleditor',
                itemId: 'textAnswer',
                name: 'answertext',
                enableColors: false,
                enableFont: false,
                defaultFont: 'Arial',
                enableLinks: false,
                enableSourceEdit: false,
                fieldLabel:'Ответ'
            },
            {
                xtype:'textarea',
                itemId:'textNormdoc',
                name:'normdoc',
                fieldLabel:'Нормативный документ'
            }/*,
            {
                xtype:'checkboxfield',
                fieldLabel:'Верный',
                itemId:'correct',
                name:'correct',
                labelWidth: 100,
                //hideLabel:true,
                //fieldStyle : 'float:left;',
                boxLabelAlign:'before',
                inputValue:'1'
            }*/
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