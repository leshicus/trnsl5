Ext.define('App.view.admin.clas.GridSigngroupC', {
    extend: 'Ext.app.ViewController',
    requires: [
    ],
    alias: 'controller.gridsigngroup',

    control: {
        'gridSigngroup button[action=add]': {
            click: function (button) {
                console.log('action=add');

                var grid = button.up('grid'),
                    newRecord = Ext.create('App.view.admin.clas.GridSigngroupM'),
                    selectionExam = button.up('grid').getSelected();

                if (selectionExam) {
                    var examid = selectionExam.get('examid');
                    newRecord.set('examid', examid);
                    grid.store.insert(0, newRecord);
                    /*grid.store.sync({
                     failure: function () {
                     Ext.MessageBox.alert('Ошибка', 'Подписант не добавлен');
                     },
                     scope: this
                     });*/
                }

            }
        },
        'gridSigngroup button[action=delete]': {
            click: function (button) {
                console.log('action=delete');

                var grid = button.up('grid'),
                    selection = grid.getSelected();
                grid.store.remove(selection);
                /*grid.store.sync({
                 failure: function () {
                 Ext.MessageBox.alert('Ошибка', 'Пользователь не удален');
                 },
                 scope: this
                 });*/
            }
        }
    }
});
