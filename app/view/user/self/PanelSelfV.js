Ext.define('App.view.user.self.PanelSelfV', {
    extend: 'Ext.container.Container',
    requires: [
        'App.view.main.MainM',
        'App.view.user.self.PanelSelfC',
        'App.view.user.self.PanelSelfM',
        'App.view.admin.clas.GridExamM'
    ],
    viewModel: {type: 'panelSelf'},
    controller:'panelSelf',
    alias: 'widget.panelSelf',
    itemId: 'content',
    flex: 1,
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    //questionMaxInCardSelf : 0, // * число вопросов в билете
    constructor: function () {
        console.log('PanelSelfV init');

        //var storeKnow = Ext.create('App.store.user.KnowS');
        this.items = [
            {
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                width: 300,
                items: [
                    {
                        xtype: 'panel',
                        cls: 'my_shadowborder',
                        margin: 5,
                        title: 'Область',
                        itemId: 'panelKnow',
                        height: 150,
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
                                viewModel: {type: 'main'},
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
                                ),
                                listeners:{
                                }
                            }
                        ],
                        buttons: [
                            {
                                xtype: 'button',
                                action: 'starttest',
                                itemId: 'startTest',
                                scale:'medium',
                                //iconCls: 'icon_start',
                                glyph: Glyphs.get('flag'),
                                text: 'Начать тестирование'
                            }
                        ]
                    },
                    {
                        xtype: 'panel',
                        cls: 'my_shadowborder',
                        margin: 5,
                        flex: 2,
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
                                xtype: 'box',
                                style: {
                                    color: '#666666',
                                    backgroundColor: '#000000'
                                },
                                height: 1
                            },
                            {
                                xtype: 'displayfield',
                                fieldLabel: 'Предыдущий ответ',
                                myCustomText:' ', // * текст вопроса во всплывающей подсказке
                                itemId: 'textAnswer',
                                listeners: {
                                }
                            },
                            {
                                xtype: 'displayfield',
                                fieldLabel: 'Нормативный документ',
                                itemId: 'textNormdoc'
                            }
                        ]
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
                        glyph: Glyphs.get('arrowright'),
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