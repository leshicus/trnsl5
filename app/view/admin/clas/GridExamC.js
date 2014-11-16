Ext.define('App.view.admin.clas.GridExamC', {
    extend: 'Ext.app.ViewController',
    requires: [
        'App.view.admin.clas.MenuExamV'
    ],
    alias: 'controller.gridexam',

    control: {
        '#': {
            cellclick: function (grid, td, cellIndex, record, tr, rowIndex, e, eOpts) {
                console.log('gridExam cellclick');

                var gridSigngroup = grid.up('#content').down('gridSigngroup'),
                    gridPerson = grid.up('#content').down('gridPerson'),
                    gridExam = grid.up('gridExam'),
                    selection = gridExam.getSelected()[0],
                    examid = selection.get('examid'),
                    storePerson = gridPerson.getViewModel().getStore('person'),
                    storeSigngroup = gridSigngroup.getViewModel().getStore('signgroup');
                /*gridSigngroup.getViewModel().getStore('signgroup').clearFilter();
                 gridPerson.getViewModel().getStore('person').clearFilter();*/
                /*gridSigngroup.getViewModel().getStore('signgroup').filterBy(function (rec) {
                 if (rec.get('examid') == examid)
                 return true;
                 });
                 gridPerson.getViewModel().getStore('person').filterBy(function (rec) {
                 if (rec.get('examid') == examid)
                 return true;
                 });*/

                if (selection) {
                    storeSigngroup.load({
                        params: {
                            examid: examid
                        }
                    });
                    storePerson.load({
                        params: {
                            examid: examid
                        }
                    });
                }


                // * опрос подавших заявку на тест в классе
                var taskClassCheck = {
                    run: function () {
                        /*var gridPerson = Ext.ComponentQuery.query('#gridPerson')[0];
                         gridPerson.getViewModel().getStore('person').load();*/
                        storePerson.reload();
                    },
                    interval: 1000 * Utilities.getTool('regstatint'), // в секундах
                    duration: 1000 * 60 * Utilities.getTool('regstatdur')
                };

                // * старт опроса подавших заявки сотрудников в классе
                Ext.TaskManager.start(taskClassCheck);
            },
            // * чтобы контекстное меню показывалось
            itemcontextmenu: function (view, rec, node, index, e) {
                e.stopEvent();
                var menu = Ext.create('App.view.admin.clas.MenuExamV');
                menu.showAt(e.getXY());
                return false;
            }
        },
        'button[action=add]': {
            click: function (button) {
                console.log('action=add');

                var grid = button.up('grid'),
                    vm = grid.getViewModel(),
                    store = vm.getStore('exam'),
                    newRecord = store.insert(0, {})[0];
                //vm.set('exam', newRecord);
                //TODO не дает редактировать запись
                /*grid.store.sync({
                 failure: function () {
                 Ext.MessageBox.alert('Ошибка', 'Экзамен не добавлен');
                 },
                 scope: this
                 });*/
            }
        },
        'button[action=delete]': {
            click: function (button) {
                console.log('action=delete');

                var grid = button.up('gridExam'),
                    content = grid.up('#content'),
                    selection = grid.getSelectionModel().getSelection()[0],
                    examid = selection.get('examid'),
                    gridPerson = content.down('gridPerson'),
                    storePerson = gridPerson.getViewModel().getStore('person'),
                    recordUser = storePerson.findRecord('examid', examid, 0, false, true, true);
                if (examid && !recordUser) {
                    grid.store.remove(selection);
                } else {
                    Ext.Msg.alert('Не удалено', 'В классе находятся сотрудники');
                }
                /*grid.store.sync({
                 failure: function () {
                 Ext.MessageBox.alert('Ошибка', 'Пользователь не удален');
                 },
                 scope: this
                 });*/
            }
        },
        '#dateFindFrom': {
            specialkey: function (field, e) {
                if (e.getKey() == e.DELETE) {
                    field.reset();
                }
                if (e.getKey() == e.ENTER) {
                    if (field.isValid()) {
                        var grid = field.up('grid'),
                            dateFindTo = grid.down('#dateFindTo');
                        if (dateFindTo.isValid()) {
                            grid.getViewModel().getStore('exam').load({
                                params: {
                                    dateFindFrom: field.getValue(),
                                    dateFindTo: dateFindTo.getValue()
                                }
                            });
                        }
                    }
                }
            },
            select: function (field, records) {
                if (field.isValid()) {
                    var grid = field.up('grid'),
                        dateFindTo = grid.down('#dateFindTo');
                    if (dateFindTo.isValid()) {
                        grid.getViewModel().getStore('exam').load({
                            params: {
                                dateFindFrom: field.getValue(),
                                dateFindTo: dateFindTo.getValue()
                            }
                        });
                    }
                }
            }
        },
        '#dateFindTo': {
            specialkey: function (field, e) {
                if (e.getKey() == e.DELETE) {
                    field.reset();
                }
                if (e.getKey() == e.ENTER) {
                    if (field.isValid()) {
                        var grid = field.up('grid'),
                            dateFindFrom = grid.down('#dateFindFrom');
                        if (dateFindFrom.isValid()) {
                            grid.getViewModel().getStore('exam').load({
                                params: {
                                    dateFindFrom: dateFindFrom.getValue(),
                                    dateFindTo: field.getValue()
                                }
                            });
                        }

                    }
                }
            },
            select: function (field, records) {
                if (field.isValid()) {
                    var grid = field.up('grid'),
                        dateFindFrom = grid.down('#dateFindFrom');
                    if (dateFindFrom.isValid()) {
                        grid.getViewModel().getStore('exam').load({
                            params: {
                                dateFindFrom: dateFindFrom.getValue(),
                                dateFindTo: field.getValue()
                            }
                        });
                    }

                }
            }
        },
        '#refreshGridExamS': {
            click: function (button) {
                console.log('click refreshGridExamS');

                var gridExam = button.up('grid');
                gridExam.getViewModel().getStore('exam').reload();
            }
        },
        /*'#menuPrintConsolidated': {
            click: function (button) {
                console.log('click menuPrintConsolidated');

                var grid = button.up('grid'),
                    selection = grid.getSelected(),
                    examArr = Array(),
                    dateFindFrom = grid.down('#dateFindFrom'),
                    dateFindTo = grid.down('#dateFindTo');
                // * печатает только одну ведомость
                *//*Ext.Ajax.request({
                 url: 'resources/php/admin/excelOneConsolidated.php'
                 });*//*

                Ext.each(selection, function (item) {
                    var examid = item.get('examid');
                    examArr.push(examid);
                });
                window.open('resources/php/admin/excelOneConsolidated.php?examarr=' + examArr
                    + '&dateFindFrom=' + Ext.Date.format(dateFindFrom.getValue(), 'd.m.Y')
                    + '&dateFindTo=' + Ext.Date.format(dateFindTo.getValue(), 'd.m.Y')
                );

                //console.log(Ext.Date.format(dateFindFrom.getValue(),'d.m.Y'));
                *//*Ext.Ajax.request({
                 url: 'resources/php/admin/excelOneConsolidated.php?examarr=' + examArr
                 + '&dateFindFrom=' + Ext.Date.format(dateFindFrom.getValue(),'d.m.Y')
                 + '&dateFindTo=' + Ext.Date.format(dateFindTo.getValue(),'d.m.Y')
                 });*//*
            }
        }*/
    },
    // * возвращает значение константы из Tool
   /* getTool: function (field) {
        var storeTool = this.getViewModel().getStore('tool'),
            recTool = storeTool.getAt(0),
            value = recTool.get(field);
        return value;
    }*/
});
