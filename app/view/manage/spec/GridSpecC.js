Ext.define('App.view.manage.spec.GridSpecC', {
    extend: 'Ext.app.ViewController',
    requires: [
        'App.view.manage.spec.GridSpecM',
    ],
    alias: 'controller.gridSpec',

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
                window.open('resources/php/instruction.php?taskname=speciality&subsystem=manage'/*, '_blank', 'directories=0,titlebar=0,toolbar=0,location=0,statusbar=0,menubar=0'*/);
            }
        },
        '#refreshGridSpecS': {
            click: function (button) {
                console.log('click refreshGridSpecS');

                var gridSpec = this.getView();
                gridSpec.store.load();
            }
        },
        'button[action=add]': {
            click: function (button) {
                console.log('action=add');

                var grid = button.up('grid'),
                    newRecord = Ext.create('App.view.manage.spec.GridSpecM'),
                    treeSpec = button.up('#content').down('treeSpec'),
                    selectedTree = treeSpec.getSelected();
                if (selectedTree) {
                    if (selectedTree.raw.leaf) {
                        var groupid = selectedTree.raw.groupid;
                        newRecord.set('groupid', groupid);
                        grid.store.insert(0, newRecord);
                        grid.store.sync();
                    }else {
                        Ext.Msg.alert('Ошибка', 'Не выбрана группа');
                    }
                }else {
                    Ext.Msg.alert('Ошибка', 'Не выбрана группа');
                }
            }
        },
        'button[action=delete]': {
            click: function (button) {
                console.log('action=delete');

                var grid = button.up('grid'),
                    selection = grid.getSelected();
                if (selection) {
                    grid.store.remove(selection);
                    grid.store.sync({
                        failure: function () {
                            Ext.MessageBox.alert('Ошибка', 'Специальность не удалена');
                        },
                        scope: this
                    });
                }else {
                    Ext.Msg.alert('Ошибка', 'Не выбрана специальность');
                }
            }
        }

    }
});
