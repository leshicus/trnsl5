Ext.define('App.view.manage.know.GridKnowC', {
    extend: 'Ext.app.ViewController',
    requires: [
        'App.view.main.MainM',
    ],
    alias: 'controller.gridKnow',

    control: {
        '#':{
            
        },
        '#refreshGridKnowS': {
            click: function (button) {
                console.log('click refreshGridKnowS');

                var gridKnow = this.getView();
                gridKnow.store.load();
            }
        },
        'button[action=add]': {
            click: function (button) {
                console.log('action=add');

                var grid = button.up('grid'),
                    newRecord = Ext.create('App.model.manage.know.GridKnowM'),
                    rowEditing = grid.plugins[0];
                rowEditing.cancelEdit();
                grid.store.insert(0, newRecord);
                rowEditing.startEdit(0, 0);
            }
        },
        'button[action=delete]': {
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

    }
});
