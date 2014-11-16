Ext.define('App.view.admin.clas.MenuPersonC', {
    extend: 'Ext.app.ViewController',
    requires: [],
    alias: 'controller.menuperson',

    control: {
        '#': {
            show: function (menu) {
                var gridPerson = Ext.ComponentQuery.query('gridPerson')[0],
                    selection = gridPerson.getSelected(),
                    reg = selection[0].get('reg'),
                    menuReg = menu.down('#menuReg'),
                    menuUnreg = menu.down('#menuUnreg');
                if (!reg || reg == 0) {
                    menuReg.enable();
                    menuUnreg.disable();
                } else {
                    menuReg.disable();
                    menuUnreg.enable();
                }
            }
        },
        '#menuReg': {
            click: function (button) {
                console.log('click menuReg');

                var grid = Ext.ComponentQuery.query('gridPerson')[0],
                    selection = grid.getSelected();
                Ext.each(selection, function (item) {
                    item.set('reg', 1);
                });

            }
        },
        '#menuUnreg': {
            click: function (button) {
                console.log('click menuUnreg');

                var grid = Ext.ComponentQuery.query('gridPerson')[0],
                    selection = grid.getSelected();
                Ext.each(selection, function (item) {
                    if (item.get('result') != -1) {
                        Ext.Msg.alert('Ошибка', 'Нельзя снимать регистрацию после прохождения экзамена');
                    } else {
                        item.set('reg', 0);
                    }
                });
                grid.getViewModel().getStore('person').reload();
            }
        },
        '#menuPrintOne': {
            click: function (button) {
                console.log('click menuPrintOne');

                var grid = Ext.ComponentQuery.query('gridPerson')[0],
                    selection = grid.getSelected();
                // * печатает только одну ведомость
                Ext.each(selection, function (item) {
                    var userid = item.get('userid'),
                        examid = item.get('examid');
                    //window.open('../../resources/pdftable/example/bkhdvaora.pdf.php');
                    window.open('resources/php/admin/pdfOne.php?examid=' + examid
                    + '&userid=' + userid, '_blank', 'directories=0,titlebar=0,toolbar=0,location=0,statusbar=0,menubar=0');
                });
            }
        }
    }
});
