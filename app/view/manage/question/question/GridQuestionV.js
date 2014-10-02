Ext.define('App.view.manage.question.question.GridQuestionV', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.gridQuestion',
    itemId: 'gridQuestion',
    frame: true,
    flex: 1,
    forceFit: true,  // * ячейки распределяются по ширине всей таблицы
    store: 'manage.GridQuestionS',
    title: 'Вопросы',
    viewConfig: {
        plugins: {
            ptype: 'gridviewdragdrop',
            ddGroup: 'ddgroup'
        },
        enableTextSelection:true
    },
    selModel: {
        mode: 'MULTI',
        ignoreRightMouseSelection: true
        //checkOnly:true
    },
    selType: 'checkboxmodel',
    columnLines: true,
    plugins: 'bufferedrenderer',
    initComponent: function () {
        console.log('GridQuestion init');

        /*this.plugins = [ Ext.create('Ext.grid.plugin.RowEditing', {
         clicksToEdit: 2
         })
         ];*/

        this.tools = [
            {
                type: 'help',
                itemId: 'instruction',
                tooltip: 'Word-инструкция'
            },
            {
                type: 'refresh',
                itemId: 'refreshGridQuestionS',
                tooltip: 'Обновить'
            }
        ]

        this.tbar = [
            {
                text: 'Добавить',
                action: 'add',
                scale: 'medium',
                iconCls: 'icon_add'
            },
            '-',
            {
                text: 'Удалить',
                action: 'delete',
                scale: 'medium',
                iconCls: 'icon_delete'
            },
            '->',
            {
                xtype: 'filefield',
                name: 'import',
                itemId: 'import',
                buttonOnly: true,
                msgTarget: 'side',
                regex: /^.*\.(xml|XML)$/,
                regexText: 'Допустимы только файлы c расширением *.XML',
                anchor: '100%',
                buttonConfig: {
                    text: 'Загрузка',
                    scale: 'medium',
                    iconCls: 'icon_import'
                }
            },

            {
                text: 'Выгрузка',
                action: 'export',
                scale: 'medium',
                iconCls: 'icon_export'
            }
        ];

        this.columns = [
            {
                text: '№',
                xtype: 'rownumberer',
                width: 50
            },
            {
                text: 'Текст вопроса',
                itemId: 'columnQuestiontext',
                dataIndex: 'questiontext',
                tdCls: 'wrapText'
                //renderer:App.util.Utilities.questionGridColumnRenderer
            }
        ];
        this.callParent(arguments);
        console.log('GridQuestion end');
    },

    // отмеченная ячейка
    getSelected: function () {
        var sm = this.getSelectionModel();
        var rs = sm.getSelection();
        return rs;
    }
});