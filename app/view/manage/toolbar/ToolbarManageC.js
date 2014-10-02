Ext.define('App.view.manage.toolbar.ToolbarManageC', {
    extend: 'Ext.app.ViewController',
    requires: [
        'App.view.manage.question.question.GridQuestionV',
        'App.view.manage.question.tree.TreeQuestionV',
        'App.view.manage.question.answer.GridAnswerV',
    ],
    alias: 'controller.toolbarmanage',

    control: {
        'toolbarManage #questionMI': {
            toggle: function (me, state) {
                if (me.pressed) {
                    console.log('click questionMI');

                    var main = me.up('main'),
                        toolbar = me.up('toolbar'),
                        layout = main.getLayout(),
                        content = layout.activeItem.query('#content')[0];
                    if (content) {
                        layout.activeItem.remove(content);
                    }
                    content = Ext.create('Ext.container.Container', {
                        border: false,
                        itemId: 'content',
                        flex: 1,
                        layout: {
                            type: 'hbox',
                            align: 'stretch'
                        },
                        items: [
                            {
                                xtype: 'treeQuestion',
                                cls: 'my_shadowborder',
                                margin: 5,
                                width: 270
                            },
                            {
                                xtype: 'gridQuestion',
                                cls: 'my_shadowborder',
                                margin: 5,
                                flex: 2
                            },
                            {
                                xtype: 'gridAnswer',
                                cls: 'my_shadowborder',
                                margin: 5,
                                flex: 2
                            }
                        ]
                    });
                    //storeTreeUser.getRootNode().expand(true);
                    layout.activeItem.add(content);



                   /* var toolbarManage = me.up('toolbarManage'),
                        viewport = me.up('viewport'),
                        panel = Ext.ComponentQuery.query('panelQuestion')[0],
                        storeQuest = Ext.StoreManager.lookup('manage.GridQuestionS'),
                        storeAnswer = Ext.StoreManager.lookup('manage.GridAnswerS'),
                        tree = Ext.StoreManager.lookup('manage.TreeQuestionS'),
                        layout = viewport.getLayout();*/
                    // * чтобы при переключении кнопок в тулбаре не оставались значения в гридах
                    storeQuest.filter(function () {
                        return false;
                    });
                    storeAnswer.filter(function () {
                        return false;
                    });
                    /*if (!panel) {
                        panel = Ext.create('App.view.manage.PanelQuestionV');
                    }
                    tree.getRootNode().expand(true);
                    layout.activeItem.query('.panel').forEach(App.util.Utilities.cascadeRemoveGrid);
                    layout.activeItem.add(panel);*/
                }
            }
        },
        'toolbarManage #specialityMI': {
            toggle: function (me, state) {
                if (me.pressed) {
                    console.log('click specialityMI');

                    var toolbarManage = me.up('toolbarManage'),
                        panel = Ext.ComponentQuery.query('panelSpec')[0],
                        storeSpec = Ext.StoreManager.lookup('manage.GridSpecS'),
                        tree = Ext.StoreManager.lookup('manage.TreeSpecS'),
                        viewport = me.up('viewport'),
                        layout = viewport.getLayout();
                    storeSpec.filter(function () {
                        return false;
                    });
                    if (!panel) {
                        panel = Ext.create('App.view.manage.PanelSpecV');
                    }
                    tree.getRootNode().expand(true);
                    layout.activeItem.query('.panel').forEach(App.util.Utilities.cascadeRemoveGrid);
                    layout.activeItem.add(panel);
                }
            }
        },
        'toolbarManage #groupMI': {
            toggle: function (me, state) {
                if (me.pressed) {
                    console.log('click groupMI');

                    var toolbarManage = me.up('toolbarManage'),
                        panel = Ext.ComponentQuery.query('gridGroupV')[0],
                        viewport = me.up('viewport'),
                        layout = viewport.getLayout();
                    if (!panel) {
                        panel = Ext.create('App.view.manage.GridGroupV');
                    }
                    layout.activeItem.query('.panel').forEach(App.util.Utilities.cascadeRemoveGrid);
                    layout.activeItem.add(panel);
                }
            }
        },
        'toolbarManage #activityMI': {
            toggle: function (me, state) {
                if (me.pressed) {
                    console.log('click activityMI');

                    var toolbarManage = me.up('toolbarManage'),
                        panel = Ext.ComponentQuery.query('gridActV')[0],
                        viewport = me.up('viewport'),
                        layout = viewport.getLayout();
                    if (!panel) {
                        panel = Ext.create('App.view.manage.GridActV');
                    }
                    layout.activeItem.query('.panel').forEach(App.util.Utilities.cascadeRemoveGrid);
                    layout.activeItem.add(panel);
                }
            }
        },
        'toolbarManage #knowMI': {
            toggle: function (me, state) {
                if (me.pressed) {
                    console.log('click knowMI');

                    var toolbarManage = me.up('toolbarManage'),
                        panel = Ext.ComponentQuery.query('gridKnowV')[0],
                        viewport = me.up('viewport'),
                        layout = viewport.getLayout();
                    if (!panel) {
                        panel = Ext.create('App.view.manage.GridKnowV');
                    }
                    layout.activeItem.query('.panel').forEach(App.util.Utilities.cascadeRemoveGrid);
                    layout.activeItem.add(panel);
                }
            }
        },
        'toolbarManage #orgMI': {
            toggle: function (me, state) {
                if (me.pressed) {
                    console.log('click orgMI');

                    var toolbarManage = me.up('toolbarManage'),
                        panel = Ext.ComponentQuery.query('gridOrgV')[0],
                        viewport = me.up('viewport'),
                        layout = viewport.getLayout();
                    if (!panel) {
                        panel = Ext.create('App.view.manage.GridOrgV');
                    }
                    layout.activeItem.query('.panel').forEach(App.util.Utilities.cascadeRemoveGrid);
                    layout.activeItem.add(panel);
                }
            }
        },
        'toolbarManage #mainMI': {
            toggle: function (me, state) {
                if (me.pressed) {
                    console.log('click mainMI');

                    var viewport = me.up('viewport'),
                        layout = viewport.getLayout();
                    layout.activeItem.query('.panel').forEach(App.util.Utilities.cascadeRemoveGrid);
                    layout.setActiveItem(0);
                    var storeSpec = Ext.data.StoreManager.lookup('manage.GridSpecS');
                    storeSpec.clearFilter();
                }
            }
        }
    }
});
