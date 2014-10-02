Ext.define('App.view.admin.clas.GridPersonC', {
    extend: 'Ext.app.ViewController',
    requires: [
    ],
    alias: 'controller.gridperson',

    control: {
        '#': {
            // * чтобы контекстное меню показывалось
            itemcontextmenu: function (view, rec, node, index, e) {
                e.stopEvent();
                view.ownerCt.contextMenu.showAt(e.getXY());
                return false;
            }
        },
        'button[action=delete]': {
            click: function (button) {
                var grid = button.up('grid'),
                    selection = grid.getSelected();

                // * удаляем несколько пемеченных записей
                Ext.each(selection, function (item) {
                    var result = item.get('result');
                    if (result == -1) {
                        grid.store.remove(item);
                    } else {
                        Ext.Msg.alert('Не удалено', 'Сотрудник проходил тест');
                    }
                });


                /*grid.store.sync({
                 failure: function () {
                 Ext.MessageBox.alert('Ошибка', 'Пользователь не удален');
                 },
                 scope: this
                 });*/
            }
        },
        '#menuReg': {
            click: function (button) {
                console.log('click menuReg');

                var grid = button.up('grid'),
                    selection = grid.getSelected();
                Ext.each(selection, function (item) {
                    item.set('reg', 1);
                });

            }
        },
        '#menuUnreg': {
            click: function (button) {
                console.log('click menuUnreg');

                var grid = button.up('grid'),
                    selection = grid.getSelected();
                Ext.each(selection, function (item) {
                    item.set('reg', 0);
                });
                grid.store.load();
            }
        },
        '#menuPrintOne': {
            click: function (button) {
                console.log('click menuPrintOne');

                var grid = button.up('grid'),
                    selection = grid.getSelected();
                // * печатает только одну ведомость
                Ext.each(selection, function (item) {
                    var userid = item.get('userid'),
                        examid = item.get('examid');
                    //window.open('../../resources/pdftable/example/bkhdvaora.pdf.php');
                    window.open('resources/php/admin/pdfOne.php?examid=' + examid
                    + '&userid=' + userid, '_blank','directories=0,titlebar=0,toolbar=0,location=0,statusbar=0,menubar=0');
                });
            }
        },
        '#refreshGridPerson': {
            click: function (button) {
                var grid = button.up('grid');
                grid.store.load();
            }
        }

    }
});
