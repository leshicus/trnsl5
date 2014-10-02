Ext.define('App.controller.manage.PanelOrgC', {
    extend: 'Ext.app.Controller',
    views: [
        'manage.GridOrgV'
    ],
    models: [
        'manage.GridOrgM'
    ],
    stores: [
        'manage.GridOrgS'
    ],
    refs: [
        {
            ref: 'gridOrg',
            selector: 'gridOrg'
        }
    ],

    onLaunch: function () {
        var me = this;
    },
    init: function () {
        console.log('PanelOrgC init');

        this.control({
            '#refreshGridOrgS': {
                click: function (button) {
                    console.log('click refreshGridOrgS');

                    var gridOrg = this.getGridOrg();
                    gridOrg.store.load();
                }
            },
            'gridOrg button[action=add]': {
                click: function (button) {
                    console.log('action=add');

                    var grid = button.up('grid'),
                        newRecord = Ext.create('App.model.manage.GridOrgM');
                    grid.store.insert(0, newRecord);
                }
            },
            'gridOrg button[action=delete]': {
                click: function (button) {
                    console.log('action=delete');

                    var grid = button.up('grid'),
                        selection = grid.getSelected();
                    grid.store.remove(selection);
                }
            }
        });
        console.log('PanelOrgC end');
    }
});