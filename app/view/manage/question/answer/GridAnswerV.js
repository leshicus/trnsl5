Ext.define('App.view.manage.question.answer.GridAnswerV', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.gridAnswer',
    itemId: 'gridAnswer',
    frame: true,
    //height: gridHeight,
    flex:1,
    forceFit: true,  // * ячейки распределяются по ширине всей таблицы
    store:'manage.GridAnswerS',
    title: 'Ответы',
    columnLines: true,
    selType: 'checkboxmodel',
    plugins: 'bufferedrenderer',
    viewConfig: {
        enableTextSelection:true // * allow to select text in grid. Actually it's a gridview property
    },
    initComponent: function () {
        console.log('GridAnswers init');
        var me = this;
        /*this.plugins = [ Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToEdit: 2
        }) ];*/

        this.selModel = Ext.create('Ext.selection.CheckboxModel', {
            injectCheckbox:0,
            mode:'MULTI'/*,
            listeners: {
                selectionchange: function(sm, selections) {
                    // * кнопка Сохранить доступна если отмечена одна запись
                    me.down('#buttonSave').setDisabled(selections.length != 1);
                }
            }*/
        });

        this.tbar = [
            {
                text: 'Добавить',
                action: 'add',
                scale:'medium',
                iconCls: 'icon_add'
            },
            '-',
            {
                text: 'Удалить',
                action: 'delete',
                scale:'medium',
                iconCls: 'icon_delete'
            }/*,
            '-',
            {
                text: 'Сохранить',
                action: 'save',
                scale:'medium',
                itemId:'buttonSave',
                iconCls: 'icon_save'
            }*/
        ];

        this.columns = [
            {
                text: '№',
                xtype: 'rownumberer',
                width: 30
            },
            {
                text: 'Текст ответа',
                itemId: 'columnAnswertext',
                dataIndex: 'answertext',
                tdCls: 'wrapText',
                flex:1/*,
                editor: {
                    xtype:'textfield',
                    errorSummary:false,
                    //allowBlank: false,
                    listeners: {  // * чтобы при нажатии ENTER не нажималась кнопка Сохранить, а переходило на другую строку
                        afterrender: function(){
                            var me = this;
                            me.el.swallowEvent(['keypress','keydown' ]);
                        }
                    }
                }*/
            },
            {
                xtype: 'checkcolumn',
                header: 'Верный',
                itemId: 'columnCorrect',
                dataIndex: 'correct',
                width: 65,
                processEvent: function () { return false; }
            },
            {
                text: 'Нормативный документ',
                itemId: 'columnNormdoc',
                dataIndex: 'normdoc',
                width:170,
                tdCls: 'wrapText'/*,
                editor: {
                    xtype:'textfield',
                    listeners: {  // * чтобы при нажатии ENTER не нажималась кнопка Сохранить, а переходило на другую строку
                        afterrender: function(){
                            var me = this;
                            me.el.swallowEvent(['keypress','keydown' ]);
                        }
                    }
                }*/
            }
        ];
        this.callParent(arguments);
        console.log('GridAnswers end');
    },

    // отмеченные ячейки (массив)
    getSelected: function () {
        var sm = this.getSelectionModel();
        var rs = sm.getSelection();
        return rs;
    }
});