Ext.define('App.view.admin.log.GridLogC', {
    extend: 'Ext.app.ViewController',
    requires: [
    ],
    alias: 'controller.gridlog',

    control: {
        '#refreshGridLogS': {
            click: function (button) {
                console.log('click refreshGridLogS');

                var gridLog = button.up('grid'),
                    dateFindFrom = gridLog.down('#dateFindFrom'),
                    dateFindTo = gridLog.down('#dateFindTo'),
                    comboLogtype = gridLog.down('#comboLogtype');
                gridLog.store.load({
                    params: {
                        dateFindFrom: dateFindFrom.getValue(),
                        dateFindTo: dateFindTo.getValue(),
                        comboLogtype:comboLogtype.getValue()
                    }
                });
            }
        },
        'gridLog #dateFindFrom': {
            specialkey: function (field, e) {
                /*if (e.getKey() == e.DELETE) {
                 field.reset();
                 }*/
                if (e.getKey() == e.ENTER) {
                    if(field.isValid()){
                        var grid = field.up('grid'),
                            dateFindTo = grid.down('#dateFindTo'),
                            comboLogtype = grid.down('#comboLogtype');
                        grid.store.load({
                            params: {
                                dateFindFrom: field.getValue(),
                                dateFindTo: dateFindTo.getValue(),
                                comboLogtype:comboLogtype.getValue()
                            }
                        });
                    }
                }
            }
        },
        'gridLog #dateFindTo': {
            specialkey: function (field, e) {
                if (e.getKey() == e.DELETE) {
                    field.reset();
                }
                if (e.getKey() == e.ENTER) {
                    var grid = field.up('grid'),
                        dateFindFrom = grid.down('#dateFindFrom'),
                        comboLogtype = grid.down('#comboLogtype');
                    grid.store.load({
                        params: {
                            dateFindFrom: dateFindFrom.getValue(),
                            dateFindTo: field.getValue(),
                            comboLogtype:comboLogtype.getValue()
                        }
                    });
                }
            }
        },
        'gridLog #comboLogtype': {
            specialkey: function (field, e) {
                if (e.getKey() == e.DELETE) {
                    field.reset();
                }
                if (e.getKey() == e.ENTER) {
                    var grid = field.up('grid'),
                        dateFindFrom = grid.down('#dateFindFrom'),
                        dateFindTo = grid.down('#dateFindTo');
                    grid.store.load({
                        params: {
                            dateFindFrom: dateFindFrom.getValue(),
                            dateFindTo: dateFindTo.getValue(),
                            comboLogtype:field.getValue()
                        }
                    });
                }
            }
        }

    }
});
