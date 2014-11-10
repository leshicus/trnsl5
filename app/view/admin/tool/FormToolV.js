Ext.define('App.view.admin.tool.FormToolV', {
    extend: 'Ext.form.Panel',
    requires: [
        //'App.view.admin.clas.GridExamM',
        'App.view.admin.tool.FormToolC',
        'App.view.main.MainM'
    ],
    alias: 'widget.formTool',
    viewModel: {type: 'main'},
    controller:'formtool',
    frame: true,
    flex: 1,
    title: 'Глобальные настройки системы',
    layout: {
        type: 'vbox'/*,
         align: 'stretch'*/
    },
    //buttonAlign: 'left',
    defaults: {
        xtype: 'textfield',
        labelWidth: 250,
        margin: '5 5 5 5',
        labelAlign: 'left',
        allowBlank:false,
        width: '30%'
    },
    initComponent: function () {
        console.log('FormToolV init');
        /*var store = Ext.data.StoreManager.lookup('admin.FormToolS'),
         rec = store.getAt(0);
         content.down('formTool').getForm().loadRecord(rec);*/



        this.items = [
            {
                itemId: 'maxquestion',
                name: 'maxquestion',
                bind:'{tool.maxquestion}',
                fieldLabel: 'Число вопросов в билете'
            },
            {
                itemId: 'minquestion',
                name: 'minquestion',
                fieldLabel: 'Число правильных ответов для успешного прохождения экзамена'
            },
            {
                itemId: 'regstatint',
                name: 'regstatint',
                fieldLabel: 'Интервал опроса базы по регистрации в классе (сек)'
            },
            {
                itemId: 'regstatdur',
                name: 'regstatdur',
                fieldLabel: 'Продолжительность опроса базы по регистрации в классе (мин)'
            },
            {
                itemId: 'examtimermin',
                name: 'examtimermin',
                fieldLabel: 'Количество времени на экзамен для всех видов деятельности (мин)'
            }/*,
            {
                xtype: 'textfield',
                itemId: 'questiontime',
                name: 'questiontime',
                fieldLabel: 'Количество времени на один вопрос (мин)'
            }*/
        ];

        this.buttons=[
            {
                text: 'Сохранить',
                scale:'medium',
                action: 'save'
            }
        ]

        this.callParent(arguments);
        console.log('FormToolV end');
    }
});