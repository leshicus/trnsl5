Ext.define('App.view.admin.menuuser.MenuUserV', {
    extend: 'Ext.menu.Menu',
    requires: [
        'App.view.admin.menuuser.MenuUserC'
    ],
    alias: 'widget.menuuser',
    controller: 'menuuser',
    itemId: 'menuuser',
    plain: true,
    border: false,
    initComponent: function () {
        console.log('MenuUserV init');

        this.items = [
            {
                text: 'Сбросить пароль',
                itemId: 'menuResetPassword',
                iconCls: 'icon_password'
            },
            '-',
            {
                text: 'Блокировать',
                itemId: 'menuBlock',
                iconCls: 'icon_block'
            },
            {
                text: 'Разблокировать',
                itemId: 'menuUnblock',
                iconCls: 'icon_unblock'
            }
        ]


        /*this.getSelectionModel().on({
            selectionchange: function (sm, records) {
                if (records.length) {
                    var block = records[0].get('enddate');
                    //console.log(block);
                    if (block != '00.00.0000 00:00' && block) {
                        self.getMenuBlock().disable();
                        self.getMenuUnblock().enable();
                    } else {
                        self.getMenuBlock().enable();
                        self.getMenuUnblock().disable();
                    }
                    self.getMenuResetPassword().enable();

                }
            }
        });
*/
        this.callParent(arguments);
        console.log('MenuUserV end');
    }

    // отмеченная ячейка
    /*getSelected: function () {
        var sm = this.getSelectionModel();
        var rs = sm.getSelection();
        return rs;
    },
    getMenuResetPassword: function () {
        return this.contextMenu.query('#menuResetPassword')[0];
    },
    getMenuBlock: function () {
        return this.contextMenu.query('#menuBlock')[0];
    },
    getMenuUnblock: function () {
        return this.contextMenu.query('#menuUnblock')[0];
    }*/
});