Ext.define('App.controller.manage.PanelGroupC', {
    extend: 'Ext.app.Controller',
    views: [
        'manage.GridGroupV'
    ],
    models: [
        'manage.GridGroupM'
    ],
    stores: [
        'manage.GridGroupS'
    ],
    refs: [
        {
            ref: 'gridGroup',
            selector: 'gridGroup'
        }
    ],

    onLaunch: function () {
        var me = this;
    },
    init: function () {
        console.log('PanelGroupC init');

        this.control({
            'gridGroup': {
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
            'gridGroup #instruction': {
                click: function (button) {
                    window.open('resources/php/instruction.php?taskname=group&subsystem=manage'/*, '_blank', 'directories=0,titlebar=0,toolbar=0,location=0,statusbar=0,menubar=0'*/);
                }
            },
            '#refreshGridGroupS': {
                click: function (button) {
                    console.log('click refreshGridGroupS');

                    var gridGroup = this.getGridGroup();
                    gridGroup.store.load();
                }
            },
            'gridGroup button[action=add]': {
                click: function (button) {
                    console.log('action=add');

                    var grid = button.up('grid'),
                        newRecord = Ext.create('App.model.manage.GridGroupM'),
                        rowEditing = grid.plugins[0];
                    rowEditing.cancelEdit();
                    grid.store.insert(0, newRecord);
                    rowEditing.startEdit(0, 0);
                }
            },
            'gridGroup button[action=delete]': {
                click: function (button) {
                    console.log('action=delete');

                    var grid = button.up('grid'),
                        selection = grid.getSelected(),
                        storeSpec = Ext.StoreManager.lookup('manage.GridSpecS'),
                        storeQuest = Ext.StoreManager.lookup('manage.GridQuestionS');
                    // * проверка, что нет групп в специальностях и вопросах
                    storeSpec.clearFilter();
                    storeQuest.clearFilter();
                    if (selection) {
                        var groupid = selection.get('groupid'),
                            recSpec = storeSpec.findRecord('groupid', groupid, 0,false,true,true),
                            recQuest = storeQuest.findRecord('groupid', groupid, 0,false,true,true);
                        if (!recSpec) {
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
        });
        console.log('PanelGroupC end');
    }
});