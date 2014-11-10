Ext.define('App.view.manage.group.GridGroupC', {
    extend: 'Ext.app.ViewController',
    requires: [
        'App.view.manage.group.GridGroupM',
    ],
    alias: 'controller.gridGroup',

    control: {
        '#':{
            edit: function (editor, context) {
                console.log('edit');

                context.grid.store.sync({
                    failure: function () {
                        Ext.MessageBox.alert('Ошибка', 'Не сохранено');
                    },
                    scope: this
                });
            }
        },
        '#instruction': {
            click: function (button) {
                window.open('resources/php/instruction.php?taskname=group&subsystem=manage'/*, '_blank', 'directories=0,titlebar=0,toolbar=0,location=0,statusbar=0,menubar=0'*/);
            }
        },
        '#refreshGridGroupS': {
            click: function (button) {
                console.log('click refreshGridGroupS');

                var gridGroup = this.getView();
                gridGroup.store.load();
            }
        },
        'button[action=add]': {
            click: function (button) {
                console.log('action=add');

                var grid = button.up('grid'),
                    newRecord = Ext.create('App.view.manage.group.GridGroupM'),
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
                    selection = grid.getSelected(),
                    storeGroup = Ext.StoreManager.lookup('manage.GridGroupS'),
                    storeQuest = Ext.StoreManager.lookup('manage.GridQuestionS');
                // * проверка, что нет групп в специальностях и вопросах
                storeGroup.clearFilter();
                storeQuest.clearFilter();
                if (selection) {
                    var groupid = selection.get('groupid'),
                        recGroup = storeGroup.findRecord('groupid', groupid, 0,false,true,true),
                        recQuest = storeQuest.findRecord('groupid', groupid, 0,false,true,true);
                    if (!recGroup) {
                        if (!recQuest) {
                            grid.store.remove(selection);
                            grid.store.sync();
                        }else {
                            Ext.Msg.alert('Не удалено', 'Существуют вопросы привязанные к данной группе');
                        }
                    } else {
                        Ext.Msg.alert('Не удалено', 'Существуют специальности привязанные к данной группе');
                    }
                }
            }
        }

    }
});
