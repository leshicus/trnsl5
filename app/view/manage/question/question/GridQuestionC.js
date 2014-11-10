Ext.define('App.view.manage.question.question.GridQuestionC', {
    extend: 'Ext.app.ViewController',
    requires: [
        'App.view.manage.question.question.FormQuestionV',
        'App.view.manage.question.question.FormUploadV',
        'Ext.dom.Helper'
    ],
    alias: 'controller.gridQuestion',

    control: {
        '#':{
            cellclick: function (grid, td, cellIndex, record, tr, rowIndex, e, eOpts) {
                console.log('gridQuestion cellclick');

                var gridAnswer = grid.up('#content').down('gridAnswer'),
                    storeAnswer = gridAnswer.getViewModel().getStore('answer'),
                    gridQuestion = this.getView(),
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

                var form = Ext.create('App.view.manage.question.question.FormQuestionV');
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
//todo добавляет 2 записи сразу
        'gridQuestion button[action=add]': {
            click: function (button) {
                console.log('action=add');
                var treeQuestion = button.up('#content').down('treeQuestion'),
                    selectedTree = treeQuestion.getSelected();
                if (selectedTree != null) {
                    if (selectedTree.raw.leaf) {
                        var form = Ext.create('App.view.manage.question.question.FormQuestionV');
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

                var grid = button.up('gridQuestion'),
                    selection = grid.getSelected();

                if (selection != '') {
                    Ext.getBody().mask('Идет удаление...');
                    // * отложенный вызов функции, чтобы маска успевала поставиться
                    Ext.defer(function () {
                        Ext.each(selection, function (item) {
                            grid.getViewModel().getStore('question').remove(item);
                        });
                        grid.getViewModel().getStore('question').sync({
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

                var gridQuestion = button.up('gridQuestion'),
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
        'button[action=import]': {
            click: function (button) {
                console.log('filefield');

                var form = Ext.create('App.view.manage.question.question.FormUploadV'),
                    window = Ext.create('Ext.Window', {
                        frame: true,
                        title: 'Загрузка вопросов',
                        closable: false,
                        modal: true,
                        layout: 'fit'
                    });
                window.add(form);
                window.show();
            }
        },
        'gridQuestion filefield': {
            change: function (field, value, eOpts) {
                console.log('filefield');

                // * загрузка файла в базу
               /* var time = new Date().getTime();
                var formId = 'fileupload-form-' + time;
                var formEl = Ext.DomHelper.append(Ext.getBody(), '<form id="' + formId + '" method="POST" enctype="multipart/form-data" class="x-hide-display"></form>');
                formEl.appendChild(field.extractFileInput());*/

                 /*var gridQuestion = this.getView(),
                    gridAnswer = gridQuestion.up('#content').down('gridAnswer'),
                    treeQuestion = gridQuestion.up('#content').down('treeQuestion'),
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
                }*/
            }
        },
        /*'gridQuestion button[action=import]': {
         click: function (button) {
         console.log('action=import');


         }
         },*/
        '#refreshGridQuestionS': {
            //todo не учитывает выделенный каталог
            click: function (button) {
                console.log('click refreshGridQuestionS');

                var gridQuestion = this.getView(),
                    treeQuestion = gridQuestion.up('#content').down('treeQuestion'),
                    selectedTree = treeQuestion.getSelected(),
                    gridAnswer = gridQuestion.up('#content').down('gridAnswer'),
                    storeAnswer = gridAnswer.getViewModel().getStore('answer');
                storeAnswer.filterBy(function () {
                    return false
                });
                if(selectedTree){
                    if (selectedTree.raw) {
                        var knowid = selectedTree.raw.knowid,
                            groupid = selectedTree.raw.groupid;
                        gridQuestion.getViewModel().getStore('question').load({
                            params: {
                                knowid: knowid,
                                groupid: groupid
                            }
                        });
                    }
                }else{
                    App.util.Utilities.errorMessage('Ошибка', 'Не выбран каталог');
                }


                /*gridAnswer.store.load();
                 gridAnswer.store.filterBy(function () {
                 return false
                 });*/
            }
        },
        'gridQuestion #instruction': {
            click: function (button) {
                window.open('resources/php/instruction.php?taskname=question&subsystem=manage'/*, '_blank', 'directories=0,titlebar=0,toolbar=0,location=0,statusbar=0,menubar=0'*/);
            }
        }

    }
});
