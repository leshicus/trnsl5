Ext.define('App.view.Viewport', {
    extend: 'Ext.container.Viewport',
    requires: [
        //'App.view.auth.TabpanelAuthV',
     /*   'Ext.tab.Panel',
        'Ext.form.Label',
        'App.view.auth.tabreg.TabRegV',
        'App.view.auth.tabauth.TabAuthV',
        'App.view.user.ToolbarUserV',
        'App.view.manage.ToolbarManageV',
        'App.view.admin.toolbar.ToolbarAdminV',
        'App.view.common.SubsystemTitleV'*/
    ],
    layout: 'card',
    activeItem: 0,
    border: false,
    defaults: {
        border: false
    },
    initComponent: function () {
        console.log('Init Viewport');

        this.items = [
            {
                id: 'card-0-auth',
                layout: {
                    align: 'center',
                    pack: 'center',
                    type: 'vbox'
                },
                items: [
                    {
                        xtype: 'box',
                        margin: '5 5 5 1',
                        cls: 'mystyle_title_subsystem',
                        html: 'Авторизация',
                        height: 35,
                        width: 500
                    },
                    {
                        xtype: 'tabpanel',
                        height: 340,
                        width: 500,
                        frame: true,
                        activeTab: 0,
                        cls: 'my_shadowborder',
                        margin: '5 5 5 5',
                        defaults: {
                            bodyPadding: 10
                        },
                        items: [
                            {xtype: 'tabAuth'},
                            {xtype: 'tabReg'}
                        ]
                    }
                ]
            },
            {
                id: 'card-1-user',
                defaults: {
                    border: false
                },
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                items: [
                    /*{
                        layout: {
                            type: 'hbox',
                            align: 'stretch'
                        },
                        defaults: {
                            xtype: 'box',

                            height: 35
                        },
                        items: [
                            {
                                html: 'Подсистема тестирования',
                                margin: '5 0 0 5',
                                cls: 'mystyle_title_subsystem',
                                flex: 1
                            },
                            {
                                margin: '5 5 0 0',
                                cls: 'mystyle_title_user',
                                flex: 1
                            }
                        ]
                    },*/
                    {
                        xtype: 'subsystemtitle',
                        _textSubsystem:'Тестирование'
                    },
                    {xtype: 'toolbarUser'}
                ]
            },
            {
                id: 'card-2-admin',
                defaults: {
                    border: false
                },
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                items: [
                    /*{
                        layout: {
                            type: 'hbox',
                            align: 'stretch'
                        },
                        defaults: {
                            xtype: 'container',
                            height: 35
                        },
                        items: [
                            {
                                margin: '5 5 5 5',
                                cls: 'mystyle_title_subsystem_container',
                                flex: 1,
                                layout:'hbox',
                                items:[
                                    {
                                        xtype: 'label',
                                        cls: 'mystyle_title_subsystem_text',
                                        text: 'Подсистема администрирования',
                                        flex: 1
                                    },
                                    {
                                        xtype: 'label',
                                        itemId:'labelUser',
                                        cls: 'mystyle_title_subsystem_user',
                                        flex: 1
                                    }
                                ]
                            }
                        ]
                    },*/
                    {
                        xtype: 'subsystemtitle',
                        _textSubsystem:'Администрирование'
                    },
                    {xtype: 'toolbarAdmin'}
                ]
            },
            /*{
             id: 'card-3-manage',
             defaults: {
             border: false
             },
             layout: {
             type: 'vbox',
             align: 'stretch'
             },
             items: [
             {
             xtype:'box',
             margin:'5 5 0 1',
             cls:'mystyle',
             itemId:'boxManage',
             html:'Подсистема ведения',
             //html:"<table width='100%'><tr><td>123</td><td align='right'>123</td></tr></table>",
             height: 35
             },
             {xtype: 'toolbarManage'}
             ]
             }*/
            {
                id: 'card-3-manage',
                defaults: {
                    border: false
                },
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                items: [
                    /*{
                        layout: {
                            type: 'hbox',
                            align: 'stretch'
                        },
                        defaults: {
                            xtype: 'box',

                            height: 35
                        },
                        items: [
                            {
                                html: 'Подсистема ведения',
                                margin: '5 0 0 5',
                                cls: 'mystyle_title_subsystem',
                                flex: 1
                            },
                            {
                                margin: '5 5 0 0',
                                cls: 'mystyle_title_user',
                                flex: 1
                            }
                        ]
                    },*/
                    {
                        xtype: 'subsystemtitle',
                        _textSubsystem:'Ведение'
                    },
                    {xtype: 'toolbarManage'}
                ]
            }
        ];

        this.callParent(arguments);
    }
});