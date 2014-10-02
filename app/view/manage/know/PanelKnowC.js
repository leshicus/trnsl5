Ext.define('App.controller.manage.PanelKnowC', {
    extend: 'Ext.app.Controller',
    views: [
        'manage.GridKnowV'
    ],
    models: [
        'manage.GridKnowM'
    ],
    stores: [
        'manage.GridKnowS'
    ],
    refs: [
        {
            ref: 'gridKnow',
            selector: 'gridKnow'
        }
    ],

    onLaunch: function () {
        var me = this;
    },
    init: function () {
        console.log('PanelKnowC init');

        this.control({
            '#refreshGridKnowS': {
                click: function (button) {
                    console.log('click refreshGridKnowS');

                    var gridKnow = this.getGridKnow();
                    gridKnow.store.load();
                }
            },
            'gridKnow button[action=add]': {
                click: function (button) {
                    console.log('action=add');

                    var grid = button.up('grid'),
                        newRecord = Ext.create('App.model.manage.GridKnowM'),
                        rowEditing = grid.plugins[0];
                    rowEditing.cancelEdit();
                    grid.store.insert(0, newRecord);
                    rowEditing.startEdit(0, 0);
                }
            },
            'gridKnow button[action=delete]': {
                click: function (button) {
                    console.log('action=delete');

                    var grid = button.up('grid'),
                        selection = grid.getSelected();
                    grid.store.remove(selection);
                    /*controllerQuestion = App.app.getController('manage.PanelQuestionC'),
                    tree = controllerQuestion.getTreeQuestion();*/
                    /*if (selection) {
                        var actid = selection.get('actid'),
                            storeGroup = Ext.StoreManager.lookup('manage.GridGroupS'),
                            recGroup = storeGroup.findRecord('actid', actid, 0,false,true,true);
                        // * проверка, что нет видов деятельности в группах
                        if (!recGroup) {
                            grid.store.remove(selection);
                        } else {
                            Ext.Msg.alert('Не удалено', 'Есть привязка в группах к данному виду деятельности');
                        }
                    }*/
                }
            }
        });
        console.log('PanelKnowC end');
    }
});