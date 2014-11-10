Ext.define('App.view.user.self.PanelSelfV', {
    extend: 'Ext.container.Container',
    requires: [
        'App.view.main.MainM',
        'App.view.user.self.PanelSelfC'
    ],
    viewModel: {type: 'main'},
    controller:'panelSelf',
    alias: 'widget.panelSelf',
    itemId: 'content',
    flex: 1,
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    border:false,
    frame:false,
    questionMaxInCardSelf : 0, // * число вопросов в билете
   /* myTooltip: Ext.create('Ext.tip.ToolTip', {
        renderTo: Ext.getBody()
    }),*/

    constructor: function () {
        console.log('PanelSelfV init');

        //var storeKnow = Ext.create('App.store.user.KnowS');
        this.items = [
// * левая половина: Информация
            {
                xtype: 'panel',
                cls: 'my_shadowborder',
                margin: 5,
                frame: true,
                border: false,
                width: 300,
                itemId: 'panelProgress',
                title: 'Прогресс',
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                defaults: {
                    margin: '5 5 5 5',
                    labelWidth: 130
                },
                items: [
                    {
                        xtype: 'combobox',
                        //store: 'user.KnowS',
                        bind: {store: '{know}'},
                        itemId: 'comboKnow',
                        queryMode: 'local',
                        editable: false,
                        valueField: 'knowid',
                        fieldLabel: 'Область знаний',
                        tpl: Ext.create('Ext.XTemplate',
                            '<tpl for=".">',
                            '<div class="x-boundlist-item">{knownum}  {knowname}</div>',
                            '</tpl>'
                        ),
                        displayTpl: Ext.create('Ext.XTemplate',
                            '<tpl for=".">',
                            '{knownum} {knowname}',
                            '</tpl>'
                        )
                    },
                    {
                        xtype: 'displayfield',
                        fieldLabel: 'Вопрос',
                        itemId: 'textQuestion',
                        fieldStyle: {
                            color: '#666666',
                            'font-weight': 'bold',
                            'font-size': 'larger',
                            'font-variant': 'small-caps'
                        }
                    },
                    {
                        xtype: 'displayfield',
                        fieldLabel: 'Ответ',
                        myCustomText:' ', // * текст вопроса во всплывающей подсказке
                        itemId: 'textAnswer',
                        listeners: {
                            //afterrender: 'answerTooltip'
                        }
                    },
                    {
                        xtype: 'displayfield',
                        fieldLabel: 'Нормативный документ',
                        itemId: 'textNormdoc'
                    }
                ],
                buttons: [
                    {
                        xtype: 'button',
                        action: 'starttest',
                        itemId: 'startTest',
                        scale:'medium',
                        iconCls: 'icon_start',
                        text: 'Начать тестирование'
                    }
                ]
            },
// * билет
            {
                xtype: 'panel',
                title: 'Билет',
                cls: 'my_shadowborder',
                margin: 5,
                itemId: 'panelCard',
                flex: 1,
                frame: true,
                border: false,
                buttonAlign: 'left',
                questionNumber: 0, // * текущий вопрос билета
                buttons: [
                    {
                        xtype: 'button',
                        action: 'nextquestion',
                        itemId: 'nextQuestion',
                        disabled: true,
                        scale:'medium',
                        iconCls: 'icon_next',
                        text: 'Следующий вопрос'
                    }
                ],
                layout: {
                    type: 'accordion',
                    titleCollapse: false,
                    fill: false,
                    multi: true
                },
                items: [
                    {
                        title:'Вопрос',
                        itemId: 'questionAccordion',
                        //flex: 1,
                        height:200,
                        autoScroll:true,
                        style: {
                            'font-variant': 'small-caps'
                            //'font-style': 'italic'
                        },
                        hideCollapseTool: true,
                        items: [
                            {
                                xtype: 'displayfield',
                                itemId: 'question',
                                padding: '20 20 20 20'
                            }
                        ]
                    },
                    {
                        title: 'Варианты ответа',
                        flex: 1,
                        autoScroll:true,
                        style: {
                            'font-variant': 'small-caps'
                            //'font-style': 'italic'
                        },
                        itemId: 'answerAccordion',
                        hideCollapseTool: true,
                        defaultType: 'radiofield',
                        defaults: {
                            flex: 1,
                            name: 'answertext',
                            padding: '10 20 5 20'
                        }
                    }
                ]
            }
        ];

        this.callParent(arguments);
        console.log('PanelSelfV end');
    }
});