Ext.define('App.view.admin.formuser.FormUserV', {
    extend: 'Ext.form.Panel',
    requires: [
        'App.view.admin.formuser.FormUserC',
        'App.view.main.MainM'
    ],
    alias: 'widget.formUser',
    viewModel: {type: 'main'},
    controller: 'formuser',
    itemId: 'formUser',
    bodyPadding: 5,
    defaults: {
        labelWidth: 100
    },
    autoScroll:true,
    border: false,
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    constructor: function () {
        console.log('formUser init');

        this.items = [
            {
                xtype: 'textfield',
                itemId: 'textFamilyname',
                name: 'familyname',
                allowBlank: false,
                fieldLabel: 'Фамилия'
            },
            {
                xtype: 'textfield',
                itemId: 'textFirstname',
                name: 'firstname',
                allowBlank: false,
                fieldLabel: 'Имя'
            },
            {
                xtype: 'textfield',
                itemId: 'textLastname',
                name: 'lastname',
                fieldLabel: 'Отчество'
            },
            {
                xtype: 'combobox',
                //store: 'manage.GridSpecS',
                bind:{
                    store:'{spec}'
                },
                itemId: 'comboSpec',
                queryMode: 'local',
                valueField: 'specid',
                name: 'specid',
                editable: false,
                allowBlank: false,
                displayField: 'specname',
                fieldLabel: 'Специальность'
            },
            {
                xtype: 'combobox',
                //store: 'admin.ComboRoleS',
                bind:{
                    store:'{role}'
                },
                itemId: 'comboRole',
                queryMode: 'local',
                valueField: 'id',
                name: 'roleid',
                editable: false,
                allowBlank: false,
                displayField: 'name',
                fieldLabel: 'Роль'
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