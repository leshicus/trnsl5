Ext.define('App.controller.manage.PanelQuestionC', {
    extend: 'Ext.app.Controller',
    views: [
        'manage.GridQuestionV',
        'manage.GridAnswerV',
        'manage.TreeQuestionV',
        'manage.PanelQuestionV',
        'manage.FormQuestionV',
        'manage.FormAnswerV'
    ],
    models: [
        'manage.GridAnswerM',
        'manage.GridQuestionM'
    ],
    stores: [
        'manage.GridAnswerS',
        'manage.GridQuestionS',
        'manage.TreeQuestionS'
    ],
    refs: [
        {
            ref: 'gridQuestion',
            selector: 'gridQuestion'
        },
        {
            ref: 'gridAnswer',
            selector: 'gridAnswer'
        },
        {
            ref: 'treeQuestion',
            selector: 'treeQuestion'
        }
    ],

    onLaunch: function () {
        var me = this;
        //me.getStore('manage.GridAnswerS').on('filterchange', me.onFilterChange, me);
        // me.getStore('manage.GridQuestionS').on('write', me.onSyncQuestion, me);

    },
    init: function () {
        console.log('PanelQuestionC init');

        this.control({
            'treeQuestion': {
                cellclick: function (gridview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
                    console.log('treeQuestion cellclick');

                    var treeQuestion = this.getTreeQuestion(),
                        gridQuestion = this.getGridQuestion(),
                        storeQuestion = gridQuestion.store,
                        selection = treeQuestion.getSelected(),
                        gridAnswer = this.getGridAnswer(),
                        storeAnswer = gridAnswer.store;

                    storeAnswer.filter(function () {
                        return false
                    });

                    if (selection) { // * без этого ругается, когда на + нажимаешь
                        if (selection.raw) { // * что-то выбрали
                            var knowid = selection.raw.knowid,
                                groupid = selection.raw.groupid,
                                orgid = selection.raw.orgid,
                                actid = selection.raw.actid,
                                id = selection.raw.id;
                            storeQuestion.clearFilter();
                            storeQuestion.load({
                                params: {
                                    id: id,
                                    orgid:orgid,
                                    actid: actid,
                                    knowid: knowid,
                                    groupid: groupid
                                }
                            });
                            // * фильтрация вопросов в зависимости от того какой уровень в структуре выбрали
                            /*storeQuestion.filter(function (rec) {
                             if ((rec.get('knowid') == knowid
                             && rec.get('groupid') == groupid) // * ОЗ
                             ||
                             (id == 'root') // * root
                             ||
                             (rec.get('actid') == actid
                             && groupid == undefined
                             && knowid == undefined) // * Вид деятельности
                             ||
                             (rec.get('groupid') == groupid
                             && knowid == undefined)) // * Группа
                             return true;
                             });*/
                        }
                    }
                }/*,
                 render: function () {
                 var gridAnswer = this.getGridAnswer(),
                 storeAnswer = gridAnswer.store,
                 gridQuestion = this.getGridQuestion(),
                 storeQuestion = gridQuestion.store;
                 storeAnswer.filter(function () {
                 return false
                 });
                 storeQuestion.filter(function () {
                 return false
                 });
                 }*/
            },
            'treeQuestion dataview': {
                // чтобы не добавлялась запись в tree при драгндропе:
                // сохраняем перемещаемую запись в переменную droppedRecords, очищаем список перемещаемых записей
                beforedrop: function (node, gridRec, overModel, dropPos, opts) {
                    /*var layout = this.getTreeQuestion().up('#card-3-manage');
                     layout.body.mask('Идет обработка...');*/
                    this.droppedRecords = gridRec.records;
                    gridRec.records = [];
                },
                nodedragover: function (targetNode, position, dragData) { // * добавляьб только в ОЗ
                    var knowid;
                    if (targetNode.raw) {
                        knowid = targetNode.raw.knowid;
                    }
                    return knowid ? true : false;
                },
                drop: function (node, data, treeRec, dropPosition) {
                    Ext.getBody().mask('Идет перемещение...');
                    // * отложенный вызов функции, чтобы маска успевала поставиться
                    Ext.defer(function () {
                        var treeQuestion = this.getTreeQuestion(),
                            sel = treeQuestion.getSelected(),
                            gridQuestion = this.getGridQuestion(),
                            gridAnswer = this.getGridAnswer(),
                            storeAnswer = gridAnswer.store,
                            knowid,
                            groupid;
                        storeAnswer.filter(function () {
                            return false
                        });
                        Ext.iterate(this.droppedRecords, function (record) {
                            var questionid = record.get('questionid'),
                                oldRec = gridQuestion.store.findRecord('questionid', questionid, 0, false, true, true);
                            gridQuestion.store.clearFilter();
                            if (treeRec.raw) {
                                knowid = treeRec.raw.knowid;
                                groupid = treeRec.raw.groupid;
                                oldRec.set('knowid', knowid);
                                oldRec.set('groupid', groupid);
                            }
                        });
                        this.droppedRecords = undefined;
                        gridQuestion.store.sync({
                            success: function () {
                                gridQuestion.store.load({
                                    params: {
                                        knowid: knowid,
                                        groupid: groupid
                                    }
                                });
                                Ext.getBody().unmask();
                            },
                            failure: function () {
                                Ext.getBody().unmask();
                                App.util.Utilities.errorMessage('Ошибка перемещения', 'Во время перемещения вопросов возникла ошибка');
                            },
                            scope: this
                        });
                        gridQuestion.getSelectionModel().deselectAll();
                        treeQuestion.getSelectionModel().select(treeRec);
                    }, 10, this);
                }
            },
            '#refreshTreeQuestionS': {
                click: function (button) {
                    console.log('click refreshTreeQuestionS');

                    var treeQuestion = this.getTreeQuestion(),
                        gridAnswer = this.getGridAnswer(),
                        storeAnswer = gridAnswer.store,
                        gridQuestion = this.getGridQuestion(),
                        storeQuestion = gridQuestion.store;
                    storeAnswer.filter(function () {
                        return false
                    });
                    storeQuestion.filter(function () {
                        return false
                    });
                    treeQuestion.store.load();
                }
            },
            '#expandTreeQuestionS': {
                click: function (button) {
                    console.log('click expandTreeQuestionS');

                    var treeQuestion = this.getTreeQuestion();
                    treeQuestion.expandAll();
                }
            },
            '#collapseTreeQuestionS': {
                click: function (button) {
                    console.log('click collapseTreeQuestionS');

                    var treeQuestion = this.getTreeQuestion();
                    treeQuestion.collapseAll();
                }
            },
// * gridQuestion
            'gridQuestion': {
                cellclick: function (gridview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
                    console.log('gridQuestion cellclick');

                    var gridAnswer = this.getGridAnswer(),
                        storeAnswer = gridAnswer.store,
                        gridQuestion = this.getGridQuestion(),
                        selection = gridQuestion.getSelected(),
                        questionid = selection[0].get('questionid');
                    storeAnswer.clearFilter();
                    storeAnswer.load({
                        params: {
                            questionid: questionid
                        }
                    });
                },
                celldblclick: function (row, td, cellIndex, record, tr, rowIndex, e, eOpts) {
                    console.log('celldblclick');

                    var form = Ext.create('App.view.manage.FormQuestionV');
                    form.loadRecord(record);
                    var window = Ext.create('Ext.Window', {
                        frame: true,
                        title: 'Редактирование вопроса',
                        width: 500,
                        height: 400,
                        closable: false,
                        modal: true,
                        layout: 'fit'
                    });
                    window.add(form);
                    window.show();
                }
            },
            'gridQuestion button[action=add]': {
                click: function (button) {
                    console.log('action=add');
                    var treeQuestion = this.getTreeQuestion(),
                        selectedTree = treeQuestion.getSelected();
                    if (selectedTree != null) {
                        if (selectedTree.raw.leaf) {
                            var form = Ext.create('App.view.manage.FormQuestionV');
                            var window = Ext.create('Ext.Window', {
                                frame: true,
                                title: 'Редактирование вопроса',
                                width: 500,
                                height: 400,
                                closable: false,
                                modal: true,
                                layout: 'fit'
                            });
                            window.add(form);
                            window.show();
                        } else {
                            Ext.Msg.alert('Ошибка', 'Не выделена область знания');
                        }
                    } else {
                        Ext.Msg.alert('Ошибка', 'Не выделена область знания');
                    }
                }
            },
            'gridQuestion button[action=delete]': {
                click: function (button) {
                    console.log('action=delete');

                    var grid = button.up('grid'),
                        selection = grid.getSelected();

                    if (selection != '') {
                        Ext.getBody().mask('Идет удаление...');
                        // * отложенный вызов функции, чтобы маска успевала поставиться
                        Ext.defer(function () {
                            Ext.each(selection, function (item) {
                                grid.store.remove(item);
                            });
                            grid.store.sync({
                                success: function (response, options) {
                                    Ext.getBody().unmask();
                                },
                                failure: function () {
                                    Ext.MessageBox.alert('Ошибка', 'Вопрос не удален');
                                    Ext.getBody().unmask();
                                },
                                scope: this
                            });
                        }, 10, this);
                    } else {
                        Ext.Msg.alert('Ошибка', 'Не выбран ни один вопрос');
                    }
                }
            },
            'gridQuestion button[action=export]': {
                click: function (button) {
                    console.log('action=export');

                    var gridQuestion = this.getGridQuestion(),
                        selection = gridQuestion.getSelected(),
                        arr = Array();
                    if (selection.length) {
                        Ext.each(selection, function (item) {
                            arr.push(item.get('questionid'));
                        });
                        window.open('resources/php/manage/exportQuestion.php?str=' + arr/*, '_blank','location=0'*/);
                    } else {
                        Ext.Msg.alert('Внимание', 'Отметьте вопросы для экспорта');
                    }
                }
            },
            'gridQuestion filefield': {
                change: function (field, value, eOpts) {
                    console.log('filefield');

                    // * загрузка файла в базу
                    var time = new Date().getTime();
                    var formId = 'fileupload-form-' + time;
                    var formEl = Ext.DomHelper.append(Ext.getBody(), '<form id="' + formId + '" method="POST" enctype="multipart/form-data" class="x-hide-display"></form>');
                    formEl.appendChild(field.extractFileInput());

                    var gridQuestion = this.getGridQuestion(),
                        gridAnswer = this.getGridAnswer(),
                        treeQuestion = this.getTreeQuestion(),
                        selectedTree = treeQuestion.getSelected(),
                        knowid,
                        groupid;
                    if (field.regex.test(value)) {
                        if (selectedTree) {
                            if (selectedTree.raw) {
                                knowid = selectedTree.raw.knowid;
                                groupid = selectedTree.raw.groupid;
                            }
                            //Ext.getBody().mask('Идет загрузка...');
                            // * отложенный вызов функции, чтобы маска успевала поставиться
                            Ext.defer(function () {
                                Ext.Ajax.request({
                                    url: 'resources/php/manage/importQuestion.php',
                                    isUpload: true,
                                    params: {
                                        knowid: knowid,
                                        groupid: groupid
                                    },
                                    timeout: 600000,  // * 5 минут
                                    method: 'POST',
                                    form: formId,
                                    success: function (response, options) {
                                        var resp = Ext.decode(response.responseText),
                                            message = resp.message,
                                            success = resp.success;
                                        if (success) {
                                            Ext.Msg.alert('Успех', message);
                                        } else {
                                            App.util.Utilities.errorMessage('Ошибка файла', message);
                                        }
                                        gridQuestion.store.load({
                                            params: {
                                                knowid: knowid,
                                                groupid: groupid
                                            }
                                        });
                                        Ext.getBody().unmask();
                                    },
                                    failure: function (response, options) {
                                        var resp = Ext.decode(response.responseText),
                                            message = resp.message;
                                        App.util.Utilities.errorMessage('Ошибка подключения к базе', message);
                                        Ext.getBody().unmask();
                                    },
                                    scope: this
                                });
                            }, 10, this);
                        } else {
                            App.util.Utilities.errorMessage('Ошибка импорта', 'Не выбран каталог для импорта');
                        }
                    } else {
                        App.util.Utilities.errorMessage('Ошибка импорта', field.regexText);
                    }
                }
            },
            /*'gridQuestion button[action=import]': {
             click: function (button) {
             console.log('action=import');


             }
             },*/
            '#refreshGridQuestionS': {
                click: function (button) {
                    console.log('click refreshGridQuestionS');

                    var gridQuestion = this.getGridQuestion(),
                        treeQuestion = this.getTreeQuestion(),
                        selectedTree = treeQuestion.getSelected(),
                        gridAnswer = this.getGridAnswer(),
                        storeAnswer = gridAnswer.store;
                    storeAnswer.filter(function () {
                        return false
                    });
                    if (selectedTree.raw) {
                        var knowid = selectedTree.raw.knowid,
                            groupid = selectedTree.raw.groupid;
                        gridQuestion.store.load({
                            params: {
                                knowid: knowid,
                                groupid: groupid
                            }
                        });
                    }
                    ;

                    /*gridAnswer.store.load();
                     gridAnswer.store.filter(function () {
                     return false
                     });*/
                }
            },
            'gridQuestion #instruction': {
                click: function (button) {
                    window.open('resources/php/instruction.php?taskname=question&subsystem=manage'/*, '_blank', 'directories=0,titlebar=0,toolbar=0,location=0,statusbar=0,menubar=0'*/);
                }
            },
// * gridAnswer
            'gridAnswer': {
                celldblclick: function (row, td, cellIndex, record, tr, rowIndex, e, eOpts) {
                    console.log('celldblclick');

                    var form = Ext.create('App.view.manage.FormAnswerV');
                    form.loadRecord(record);
                    var window = Ext.create('Ext.Window', {
                        frame: true,
                        title: 'Редактирование ответа',
                        width: 500,
                        height: 400,
                        closable: false,
                        modal: true,
                        layout: 'fit'
                    });
                    window.add(form);
                    window.show();
                }
            },
            'gridAnswer button[action=add]': {
                click: function (button) {
                    console.log('action=add');

                    var gridQuestion = this.getGridQuestion(),
                        selectedQuestion = gridQuestion.getSelected();
                    if (selectedQuestion != '') {
                        var form = Ext.create('App.view.manage.FormAnswerV');
                        var window = Ext.create('Ext.Window', {
                            frame: true,
                            title: 'Редактирование ответа',
                            width: 500,
                            height: 400,
                            closable: false,
                            modal: true,
                            layout: 'fit'
                        });
                        window.add(form);
                        window.show();
                    } else {
                        Ext.Msg.alert('Ошибка', 'Не выделен вопрос');
                    }
                }
            },
            'gridAnswer button[action=delete]': {
                click: function (button) {
                    console.log('action=delete');

                    var grid = button.up('grid'),
                        selection = grid.getSelected();
                    // * удаляем несколько пемеченных записей
                    if (selection != '') {
                        Ext.each(selection, function (item) {
                            grid.store.remove(item);
                        });
                    }else {
                        Ext.Msg.alert('Ошибка', 'Не выбран ни один ответ');
                    }
                }
            },
            /*'gridAnswer button[action=save]': {
             render: function (button) {
             console.log('button render');

             var controller = App.app.getController('manage.PanelQuestionC');
             controller.buttonSaveDisable();
             },
             click: function (button) {
             console.log('action=save');

             var grid = button.up('grid');
             grid.store.sync({
             failure: function () {
             Ext.MessageBox.alert('Ошибка', 'Не сохранено');
             },
             scope: this
             });
             //grid.body.mask('Saving Record Please Wait...');
             }
             },*/
            /*'gridAnswer checkcolumn': {
             checkchange: function (me, rowIndex, checked, eOpts) {
             var controller = App.app.getController('manage.PanelQuestionC');
             controller.buttonSaveDisable();
             }
             },*/
// * formQuestion
            'formQuestion button[action=save]': {
                click: function (button) {
                    console.log('save button');

                    var form = button.up('form'),
                        win = form.up('window'),
                        values = form.getValues(),
                        record = form.getForm().getRecord(),
                        grid = this.getGridQuestion();
                    if (values.questiontext) { // * такая вот валидация, allowBlank=false не работает
                        if (!record) { // * создание
                            var newRecord = Ext.create('App.model.manage.GridQuestionM'),
                                treeQuestion = this.getTreeQuestion(),
                                selectedTree = treeQuestion.getSelected(),
                                gridAnswer = this.getGridAnswer(),
                                storeAnswer = gridAnswer.store;
                            storeAnswer.filter(function () {
                                return false
                            });
                            newRecord.set(values);
                            if (selectedTree.raw) {
                                var knowid = selectedTree.raw.knowid,
                                    groupid = selectedTree.raw.groupid;
                                newRecord.set('groupid', groupid);
                                newRecord.set('knowid', knowid);
                            }
                            grid.store.insert(0, newRecord);
                        } else { // * исправление
                            record.set(values);
                        }
                        grid.store.sync({
                            success: function () {
                            },
                            failure: function () {
                                errorMessage('Ошибка подключения к базе', 'Не обновлено');
                            },
                            scope: this
                        });

                        win.close();
                    } else {
                        Ext.Msg.alert('Внимание', 'Значение не может быть пустым');
                    }
                }
            },
            'formQuestion button[action=cancel]': {
                click: function (button) {
                    console.log('cancel button');

                    button.up('form').getForm().reset();
                    button.up('window').close();
                }
            },
// * formAnswer
            'formAnswer button[action=save]': {
                click: function (button) {
                    console.log('save button');
                    // * первый ответ должен быть всегда верным
                    // * признак верности ставится в зависимости от заполненности поля Нормативный документ
                    var form = button.up('form'),
                        win = form.up('window'),
                        values = form.getValues(),
                        record = form.getForm().getRecord(),
                        gridQuestion = this.getGridQuestion(),
                        selectedQuestion = gridQuestion.getSelected(),
                        gridAnswer = this.getGridAnswer(),
                        storeAnswer = gridAnswer.store,
                        countAnswer = storeAnswer.getCount(),
                        normdoc = values['normdoc'];
                    if (selectedQuestion != '') {
                        var questionid = selectedQuestion[0].get('questionid');
                        if (values.answertext) { // * такая вот валидация, allowBlank=false не работает
                            if (!record) { // * создание
                                var newRecord = Ext.create('App.model.manage.GridAnswerM');
                                newRecord.set('questionid', questionid);
                                newRecord.set(values);
                                if (countAnswer == 0) {
                                    if (normdoc) { // * ставим галочку верный
                                        newRecord.set('correct', 1);
                                        gridAnswer.store.insert(0, newRecord);
                                        win.close();
                                    } else {
                                        Ext.Msg.alert('Нормативный документ', 'Нормативный документ должен быть указан для первого ответа');
                                    }
                                } else {
                                    if (normdoc) { // * ставим галочку верный
                                        Ext.Msg.alert('Нормативный документ', 'Нормативный документ должен быть пустым для не первого ответа');
                                    } else {
                                        newRecord.set('correct', 0);
                                        gridAnswer.store.insert(0, newRecord);
                                        win.close();
                                    }
                                }
                            } else { // * исправление
                                var correct = record.get('correct');
                                if (correct) { // * ставим галочку верный
                                    if (normdoc) { // * ставим галочку верный
                                        record.set(values);
                                        win.close();
                                    } else {
                                        Ext.Msg.alert('Нормативный документ', 'Нормативный документ должен быть указан для первого ответа');
                                    }
                                } else {
                                    if (normdoc) { // * ставим галочку верный
                                        Ext.Msg.alert('Нормативный документ', 'Нормативный документ должен быть пустым для не первого ответа');
                                    } else {
                                        record.set(values);
                                        win.close();
                                    }
                                }
                            }

                        } else {
                            Ext.Msg.alert('Ответ', 'Ответ не может быть пустым');
                        }
                    } else {
                        Ext.Msg.alert('Ошибка', 'Не выделен вопрос');
                        win.close();
                    }
                }
            },
            'formAnswer button[action=cancel]': {
                click: function (button) {
                    console.log('cancel button');

                    button.up('form').getForm().reset();
                    button.up('window').close();
                }
            }
        });
        console.log('PanelQuestionC end');
    }
    // * изменение фильтра в Ответах
    /*onFilterChange: function (store) {
     this.buttonSaveDisable();
     },*/
    // * сработала синхронизация
    /*onSyncQuestion: function (store, aOperation) {
     // * такой непростой способ достать id добавленной записи
     var action = aOperation.action;
     if (action == 'create') {
     var questionid = aOperation.batch.operations[0].request.scope.reader.jsonData["questionid"],
     rec = store.getAt(0);
     rec.data['questionid'] = questionid;
     }

     },*/
    // * изменение видимости кнопки Сохранить в Ответах
    /*buttonSaveDisable: function () {
     var grid = this.getGridAnswer(),
     store = grid.store,
     flag = false,
     gridQuestion = this.getGridQuestion(),
     selectedQuestion = gridQuestion.getSelected();
     if (selectedQuestion != '') {
     var questionid = selectedQuestion[0].get('questionid');
     if (questionid)
     store.filter(function (rec) {
     if (rec.get('questionid') == questionid)
     return true;
     });
     store.data.each(function (rec) {
     if (rec.get('correct') == 1 && rec.get('normdoc') != '')
     console.log(rec.get('correct'), rec.get('normdoc'), flag);
     if (flag == true) {
     flag = false;
     } else
     flag = true;
     });
     grid.down('#buttonSave').setDisabled(!flag);
     }

     }*/
});