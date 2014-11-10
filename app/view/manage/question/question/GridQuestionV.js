Ext.define('App.view.manage.question.question.GridQuestionV', {
    extend: 'Ext.grid.Panel',
    requires: [
        'App.view.manage.question.question.GridQuestionM',
        'App.view.manage.question.question.GridQuestionC',
        //'Ext.form.field.File',
        'Ext.form.field.FileButton',
        'Ext.form.trigger.Component'
    ],
    viewModel: {type: 'gridQuestion'},
    controller:'gridQuestion',
    bind: '{question}',
    alias: 'widget.gridQuestion',
    itemId: 'gridQuestion',
    frame: false,
    flex: 1,
    forceFit: true,  // * ячейки распределяются по ширине всей таблицы
    //store: 'manage.GridQuestionS',
    title: 'Вопросы',
    viewConfig: {
        plugins: {
            ptype: 'gridviewdragdrop',
            ddGroup: 'ddgroup'
        },
        enableTextSelection:true,
        stripeRows: true
    },
    selModel: {
        mode: 'MULTI',
        ignoreRightMouseSelection: true
        //checkOnly:true
    },
    rowLines: true,
    selType: 'checkboxmodel',
    columnLines: true,
   // plugins: 'bufferedrenderer',
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
            /*{//todo что тут с загрузкой файла
                xtype: 'filefield',
                name: 'import',
                itemId: 'import',
                buttonOnly: true,
                allowBlank: false,
                msgTarget: 'side',
                regex: /^.*\.(xml|XML)$/,
                regexText: 'Допустимы только файлы c расширением *.XML',
                //anchor: '100%',
                width:100,
                buttonConfig: {
                    text: 'Загрузка',
                    scale: 'medium',
                    iconCls: 'icon_import'
                }
            },*/
            {
                text: 'Загрузка',
                action: 'import',
                scale: 'medium',
                iconCls: 'icon_import'
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
                tdCls: 'wrapText',
                //width:500
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