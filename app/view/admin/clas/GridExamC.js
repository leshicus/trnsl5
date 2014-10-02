Ext.define('App.view.admin.clas.GridExamC', {
    extend: 'Ext.app.ViewController',
    requires: [
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
                    examid = selection.get('examid');
                gridSigngroup.store.clearFilter();
                gridPerson.store.clearFilter();
                gridSigngroup.store.filter(function (rec) {
                    if (rec.get('examid') == examid)
                        return true;
                });
                gridPerson.store.filter(function (rec) {
                    if (rec.get('examid') == examid)
                        return true;
                });
                // * опрос подавших заявку на тест в классе
                var taskClassCheck = {
                    run: function () {
                        var gridPerson = Ext.ComponentQuery.query('#gridPerson')[0];
                        gridPerson.store.load();
                    },
                    interval: 1000 * this.getTool('regstatint'), // в секундах
                    duration: 1000 * 60 * this.getTool('regstatdur')
                };

                // * старт опроса подавших заявки сотрудников в классе
                Ext.TaskManager.start(taskClassCheck);
            },
            itemcontextmenu: function (view, rec, node, index, e) {
                e.stopEvent();
                view.ownerCt.contextMenu.showAt(e.getXY());
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
                vm.set('exam', newRecord);
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

                var grid = button.up('grid'),
                    selection = grid.getSelected(),
                    examid = selection.get('examid'),
                    gridPerson = this.getGridPerson(),
                    storePerson = gridPerson.store,
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
                /*if (e.getKey() == e.DELETE) {
                 field.reset();
                 }*/
                if (e.getKey() == e.ENTER) {
                    var grid = field.up('grid'),
                        dateFindTo = grid.down('#dateFindTo');
                    grid.store.load({
                        params: {
                            dateFindFrom: field.getValue(),
                            dateFindTo: dateFindTo.getValue()
                        }
                    });
                }
            }
        },
        '#dateFindTo': {
            specialkey: function (field, e) {
                /*if (e.getKey() == e.DELETE) {
                 field.reset();
                 }*/
                if (e.getKey() == e.ENTER) {
                    var grid = field.up('grid'),
                        dateFindFrom = grid.down('#dateFindFrom');
                    grid.store.load({
                        params: {
                            dateFindFrom: dateFindFrom.getValue(),
                            dateFindTo: field.getValue()
                        }
                    });
                }
            }
        },
        '#refreshGridExamS': {
            click: function (button) {
                console.log('click refreshGridExamS');

                var gridExam = button.up('grid');
                gridExam.store.load();
            }
        },
        '#menuPrintConsolidated': {
            click: function (button) {
                console.log('click menuPrintConsolidated');

                var grid = button.up('grid'),
                    selection = grid.getSelected(),
                    examArr = Array(),
                    dateFindFrom = grid.down('#dateFindFrom'),
                    dateFindTo = grid.down('#dateFindTo');
                // * печатает только одну ведомость
                /*Ext.Ajax.request({
                 url: 'resources/php/admin/excelOneConsolidated.php'
                 });*/

//TODO сделать меню по-другому
                Ext.each(selection, function (item) {
                    var examid = item.get('examid');
                    examArr.push(examid);
                });
                window.open('resources/php/admin/excelOneConsolidated.php?examarr=' + examArr
                    + '&dateFindFrom=' + Ext.Date.format(dateFindFrom.getValue(), 'd.m.Y')
                    + '&dateFindTo=' + Ext.Date.format(dateFindTo.getValue(), 'd.m.Y')
                );

                //console.log(Ext.Date.format(dateFindFrom.getValue(),'d.m.Y'));
                /*Ext.Ajax.request({
                 url: 'resources/php/admin/excelOneConsolidated.php?examarr=' + examArr
                 + '&dateFindFrom=' + Ext.Date.format(dateFindFrom.getValue(),'d.m.Y')
                 + '&dateFindTo=' + Ext.Date.format(dateFindTo.getValue(),'d.m.Y')
                 });*/
            }
        }
    },
    // * возвращает значение константы из Tool
    getTool : function (field) {
        var storeTool = this.getViewModel().getStore('tool'),
            recTool = storeTool.getAt(0),
            value = recTool.get(field);
        return value;
    }
});
