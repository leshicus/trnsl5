Ext.define('App.view.manage.org.GridOrgC', {
    extend: 'Ext.app.ViewController',
    requires: [
        'App.view.main.MainM',
    ],
    alias: 'controller.gridOrg',

    control: {
        '#':{

        },
        '#refreshGridOrgS': {
            click: function (button) {
                console.log('click refreshGridOrgS');

                var gridOrg = this.getView();
                gridOrg.getViewModel().getStore('org').load();
            }
        },
        'button[action=add]': {
            click: function (button) {
                console.log('action=add');

                var grid = button.up('grid'),
                    newRecord = Ext.create('App.model.manage.GridOrgM');
                grid.getViewModel().getStore('org').insert(0, newRecord);
            }
        },
        'button[action=delete]': {
            click: function (button) {
                console.log('action=delete');

                var grid = button.up('grid'),
                    selection = grid.getSelected();
                grid.getViewModel().getStore('org').remove(selection);
            }
        }

    }
});