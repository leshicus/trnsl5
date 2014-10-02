/*
Ext.define('App.view.admin.PanelUserV', {
    extend: 'Ext.panel.Panel',
    requires: [
        'App.view.admin.TreeUserV',
        'App.view.admin.GridUserV'
    ],
    alias: 'widget.panelUser',
    itemId: 'panelUser',
    border: false,
    //frame: true,
    flex:1,
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    constructor: function () {
        console.log('PanelUserV init');

        var treeUser = Ext.create('App.view.admin.TreeUserV', {
                    cls: 'my_shadowborder',
                    margin:5,
                    width: 250
                }
            ),
            gridUser = Ext.create('App.view.admin.GridUserV', {
                    cls: 'my_shadowborder',
                    margin:5,
                    flex: 2
                }
            );
        this.items = [
            treeUser,
            gridUser
        ];
        this.callParent(arguments);
        console.log('PanelUserV end');
    }
});*/
