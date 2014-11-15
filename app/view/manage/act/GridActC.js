Ext.define('App.view.manage.act.GridActC', {
    extend: 'Ext.app.ViewController',
    requires: [
        'App.view.main.MainM',
    ],
    alias: 'controller.gridAct',

    control: {
        '#':{
            /*validateedit: function (editor, e) {
                console.log('edit');

                //var storeTool = Ext.data.StoreManager.lookup('admin.FormToolS'),
                var main = Ext.ComponentQuery.query('main')[0],
                    mainVM = main.getViewModel(),
                    storeTool = mainVM.getStore('tool'),
                    maxquestion = storeTool.getAt(0).get('maxquestion'),
                    examtimermin = e.value;
                if(e.field == 'timelimit'){
                    if ((examtimermin % maxquestion) == 0) {
                        if (!examtimermin || examtimermin == 0) {
                            Ext.Msg.alert('Лимит времени -ошибка', 'Значение должно быть не 0');
                            return false;
                        } else
                            return true;
                    } else {
                        Ext.Msg.alert('Лимит времени -ошибка', 'Количество времени на экзамен (' + examtimermin + ') должно быть кратно числу вопросов в билете (' + maxquestion + ')');
                        return false;
                    }
                }
            }*/
            edit: function (editor, context) {
                console.log('edit');

                context.grid.getViewModel().getStore('act').sync({
                     failure: function () {
                        Ext.MessageBox.alert('Ошибка', 'Не сохранено');
                    },
                    scope: this
                });
            },
            /*validateedit: function (editor, context) {
                console.log('edit');
                var main = Ext.ComponentQuery.query('main')[0],
                    mainVM = main.getViewModel(),
                    storeTool = mainVM.getStore('tool'),
                    maxquestion = storeTool.getAt(0).get('maxquestion'),
                    examtimermin = context.value,
                    storeAct = mainVM.getStore('act');
                if(context.field == 'timelimit'){
                    if ((examtimermin % maxquestion) == 0) {
                        if (!examtimermin || examtimermin == 0) {
                            Ext.Msg.alert('Лимит времени -ошибка', 'Значение должно быть не 0');
                            return false;
                        } else {
                            context.grid.getViewModel().getStore('act').sync({
                                *//*success: function () {
                                    console.info('success');
                                    context.grid.getViewModel().getStore('act').reload();
                                    //storeAct.load();
                                },*//*
                                failure: function () {
                                    Ext.MessageBox.alert('Ошибка', 'Не сохранено');
                                },
                                scope: this
                            });
                        }
                    } else {
                        Ext.Msg.alert('Лимит времени -ошибка', 'Количество времени на экзамен (' + examtimermin + ') должно быть кратно числу вопросов в билете (' + maxquestion + ')');
                        return false;
                    }
                }else{
                    context.grid.getViewModel().getStore('act').sync({
                        *//*success: function () {
                         console.info('success');
                         context.grid.getViewModel().getStore('act').reload();
                         //storeAct.load();
                         },*//*
                        failure: function () {
                            Ext.MessageBox.alert('Ошибка', 'Не сохранено');
                        },
                        scope: this
                    });
                }
            }*/
        },
        '#instruction': {
            click: function (button) {
                window.open('resources/php/instruction.php?taskname=activity&subsystem=manage'/*, '_blank', 'directories=0,titlebar=0,toolbar=0,location=0,statusbar=0,menubar=0'*/);
            }
        },
        '#refreshGridActS': {
            click: function (button) {
                console.log('click refreshGridActS');

                var gridAct = this.getView();
                gridAct.getViewModel().getStore('act').load();
            }
        },
        'button[action=add]': {
            click: function (button) {
                console.log('action=add');

                var grid = button.up('grid'),
                    store = grid.getViewModel().getStore('act'),
                    newRecord = store.add({})[0];
                grid.getViewModel().getStore('act').insert(0, newRecord);

                grid.getViewModel().getStore('act').sync({
                    success: function () {
                        newRecord.commit();
                    },
                    failure: function () {
                        Ext.MessageBox.alert('Ошибка', 'Не сохранено');
                    },
                    scope: this
                });
            }
        },
        'button[action=delete]': {
            click: function (button) {
                console.log('action=delete');

                var grid = button.up('grid'),
                    selection = grid.getSelected();
                /*controllerQuestion = App.app.getController('manage.PanelQuestionC'),
                 tree = controllerQuestion.getTreeQuestion()*/
                if (selection) {
                    var actid = selection.get('actid'),
                        main = button.up('main'),
                        storeGroup = main.getViewModel().getStore('group');

                    storeGroup.load({
                        callback: function (records, operation, success) {
                            var recGroup = storeGroup.findRecord('actid', actid, 0,false,true,true);
                            // * проверка, что нет видов деятельности в группах
                            if (!recGroup) {
                                var storeAct = grid.getViewModel().getStore('act');
                                storeAct.remove(selection);
                                storeAct.sync({
                                    failure: function () {
                                        Ext.MessageBox.alert('Ошибка', 'Не сохранено');
                                    },
                                    scope: this
                                });
                            } else {
                                Ext.Msg.alert('Не удалено', 'Есть привязка в группах к данному виду деятельности');
                            }
                        }
                    });


                }
            }
        }

    }
});
