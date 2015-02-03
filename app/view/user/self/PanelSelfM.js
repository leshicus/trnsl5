Ext.define('App.view.user.self.PanelSelfM', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.panelSelf',
    stores: {
        card: {
            fields: [
            ],
            storeId: 'card',
            proxy: {
                type: 'ajax',
                url: 'resources/php/user/getCard.php',
                reader: {
                    type: 'json'
                }
            },
            listeners: {
                load: 'onStoreCardLoad'
            }
        }
    }
});
