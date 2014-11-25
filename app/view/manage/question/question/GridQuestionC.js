Ext.define('App.view.manage.question.question.GridQuestionC', {
    extend: 'Ext.app.ViewController',
    requires: [
        'App.view.manage.question.question.FormQuestionV',
        'App.view.manage.question.question.FormUploadV',
        'Ext.dom.Helper',
        'Ext.ux.IFrame'
    ],
    alias: 'controller.gridQuestion',

    control: {
        '#': {
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
        'button[action=add]': {
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
        'button[action=delete]': {
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
        'button[action=export]': {
            click: function (button) {
                console.log('action=export');

                var gridQuestion = button.up('gridQuestion'),
                    selection = gridQuestion.getSelected(),
                    arr = Array();
                if (selection.length) {

                    Ext.each(selection, function (item) {
                        arr.push(item.get('questionid'));
                    });
                    var str = arr.join(',');

             /*       var comp = Ext.create('Ext.Component',{
                        //renderTo:Ext.getBody(),
                        autoEl:{
                            tag:'a',
                            id:'atag',
                            href : "data:application/octet-stream,field1%2Cfield2%0Afoo%2Cbar%0Agoo%2Cgai%0A",
                            download : 'test.csv'
                        }
                    });*/

                    var pom = document.createElement('a');
                    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent('123'));
                    pom.setAttribute('download', '1.txt');
                    pom.click();


                    /*document.getElementById("atag").click();*/

/*работает, но только в браузере*/
                    var body = Ext.getBody(),
                        iframe = body.appendChild({
                            tag: 'iframe',
                            id: 'iframe-helper',
                            cls: 'x-hidden',
                            name: 'iframe'
                        }),
                        form = body.appendChild({
                            tag: 'form',
                            method: 'POST',
                            target: 'iframe-helper',
                            action: 'resources/php/manage/exportQuestion.php',
                            cls: 'x-hidden'
                        }),
                        input = form.appendChild({
                            tag: 'input',
                            type: 'hidden',
                            name: 'str',
                            id:'hidden-input',
                            value: str,
                            cls: 'x-hidden'
                        });
                    form.dom.submit();
                    //iframe.destroy();
                    form.destroy();
                    input.destroy();

// window.open('resources/php/manage/exportQuestion.php?str=' + arr, '_blank','location=0');

/*работает, но только в браузере*/
                   /* var a = window.document.createElement('a');
                    a.href = window.URL.createObjectURL(new Blob([str], {type: 'text/csv'}));
                    a.download = 'test.csv';
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);*/

            /*        var a = window.document.createElement('a');
                    a.href = "data:application/octet-stream,field1%2Cfield2%0Afoo%2Cbar%0Agoo%2Cgai%0A";
                    a.download = 'test.csv';
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);*/



                 /*       form = Ext.create('Ext.form.Panel',{
                            url:'resources/php/manage/exportQuestion.php'
                        });
                    form.getForm().submit({
                        params:{str:str}
                    });*/


     /*                var iframe = Ext.create('Ext.ux.IFrame', {
                     id: 'iframe-helper'
                     }),
                     form = Ext.create('Ext.form.Panel', {
                     url: 'resources/php/manage/exportQuestion.php',
                     items: [{
                     xtype: 'textfield',
                     name: 'str'
                     }]
                     }),
                     //iframe = document.getElementById('iframe-helper'),
                     form = body.appendChild({
                     tag: 'form',
                     method: 'post',
                     target: 'iframe-helper',
                     action: 'resources/php/manage/exportQuestion.php',
                     cls: 'x-hidden'
                     }),
                     input = form.appendChild({
                     tag: 'input',
                     type: 'hidden',
                     name: 'str',
                     value: str,
                     cls: 'x-hidden'
                     });*/




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
            }
        },
        '#refreshGridQuestionS': {
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
                if (selectedTree) {
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
                } else {
                    App.util.Utilities.errorMessage('Ошибка', 'Не выбран каталог');
                }
            }
        },
        'gridQuestion #instruction': {
            click: function (button) {
                window.open('resources/php/instruction.php?taskname=question&subsystem=manage'/*, '_blank', 'directories=0,titlebar=0,toolbar=0,location=0,statusbar=0,menubar=0'*/);
            }
        }

    }
});
