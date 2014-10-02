Ext.define('App.view.user.ToolbarUserV', {
    extend: 'Ext.toolbar.Toolbar',
    requires: [

    ],
    alias: 'widget.toolbarUser',
    itemId: 'toolbarUser',
    defaults    : {
        toggleGroup    : "user",
        allowDepress    : false
    },
    initComponent: function () {
        console.log('ToolbarUserV init');

        this.items = [
            {
                text: 'Главная',
                itemId: 'mainMI',
                scale:'medium',
                iconCls: 'icon_back'
            },
            '-',
            {
                text: 'Тестирование',
                itemId: 'testMI',
                scale:'medium',
                iconCls: 'icon_test'
            },
            {
                text: 'Самоподготовка',
                itemId: 'selfMI',
                scale:'medium',
                iconCls: 'icon_self'
            }
        ];
        this.callParent(arguments);
        console.log('ToolbarUserV end');
    }
});