Ext.define('App.view.admin.toolbar.ToolbarAdminC', {
    extend: 'Ext.app.ViewController',
    requires: [
        'App.view.admin.treeuser.TreeUserV',
        'App.view.admin.griduser.GridUserV',
        'App.view.admin.log.GridLogV',
        'App.view.admin.clas.GridExamV',
        'App.view.admin.clas.GridSigngroupV',
        'App.view.admin.clas.GridPersonV',
        'App.view.admin.stat.PanelStatV',
        'App.view.admin.tool.FormToolV'
    ],
    alias: 'controller.toolbaradmin',

    control: {
        '#userMI': {
            toggle: function (me, state) {
                if (me.pressed) {
                    console.log('click userMI');

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
                                xtype: 'treeUser',
                                cls: 'my_shadowborder',
                                margin: 5,
                                width: 250
                            },
                            {
                                xtype: 'gridUser',
                                cls: 'my_shadowborder',
                                margin: 5,
                                flex: 2
                            }
                        ]
                    });
                    //storeTreeUser.getRootNode().expand(true);
                    layout.activeItem.add(content);
                }
            }
        },
        'toolbarAdmin #mainMI': {
            toggle: function (me, state) {
                if (me.pressed) {
                    console.log('click mainMI');

                    var main = me.up('main'),
                        layout = main.getLayout(),
                        content = layout.activeItem.query('#content')[0];
                    if (content) {
                        layout.activeItem.remove(content);
                    }
                    layout.setActiveItem(0);
                }
            }
        },
        'toolbarAdmin #logMI': {
            toggle: function (me, state) {
                if (me.pressed) {
                    console.log('click logMI');

                    var main = me.up('main'),
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
                                xtype: 'gridLog',
                                cls: 'my_shadowborder',
                                margin: 5,
                                flex: 2
                            }
                        ]
                    });
                    layout.activeItem.add(content);
                }
            }
        },
        'toolbarAdmin #classMI': {
            toggle: function (me, state) {
                if (me.pressed) {
                    console.log('click classMI');

                    var main = me.up('main'),
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
                                layout: {
                                    type: 'vbox',
                                    align: 'stretch'
                                },
                                border: false,
                                width: 560,
                                items: [
                                    {
                                        xtype: 'gridExam',
                                        margin: 5,
                                        cls: 'my_shadowborder'
                                    },
                                    {
                                        xtype: 'gridSigngroup',
                                        margin: 5,
                                        cls: 'my_shadowborder'
                                    }
                                ]
                            },
                            {
                                xtype: 'gridPerson',
                                cls: 'my_shadowborder',
                                margin: 5,
                                flex: 2
                            }
                        ]
                    });
                    layout.activeItem.add(content);

              /*      var gridPerson = Ext.ComponentQuery.query('gridPerson')[0],
                        gridSigngroup = Ext.ComponentQuery.query('gridSigngroup')[0];
                    gridPerson.getViewModel().getStore('person').filterBy(function () {
                        return false
                    });
                    gridSigngroup.getViewModel().getStore('signgroup').filterBy(function () {
                        return false
                    });*/
                }
            }
        },
        'toolbarAdmin #statMI': {
            toggle: function (me, state) {
                if (me.pressed) {
                    console.log('click statMI');

                    var toolbarAdmin = me.up('toolbarAdmin'),
                        main = me.up('main'),
                        layout = main.getLayout(),
                        content = layout.activeItem.query('#content')[0];
                    if (content) {
                        layout.activeItem.remove(content);
                    }
                    content = Ext.create('Ext.container.Container', {
                        border: false,
                        itemId: 'content',
                        autoScroll: true,
                        flex: 1,
                        layout: {
                            type: 'hbox',
                            align: 'stretch'
                        },
                        items: [
                            {
                                xtype: 'panelStat'

                            }
                        ]
                    });
                    layout.activeItem.add(content);

                    // * установим даты по умолчанию как начало и конец текущего месяца
                    /*  var dateFrom = content.down('#panelStat #dateFrom'),
                     dateTo = content.down('#panelStat #dateTo'),
                     now = new Date(),
                     year = now.getFullYear(),
                     month = App.util.Utilities.reverseDate(now.getMonth() + 1),
                     daysCount = new Date(year, month, 0).getDate(),
                     dateBegin = ['01', month, year].join('.'),
                     dateEnd = [daysCount, month, year].join('.');
                     dateFrom.setValue(dateBegin);
                     dateTo.setValue(dateEnd);*/
                }
            }
        },
        'toolbarAdmin #toolMI': {
            toggle: function (me, state) {
                if (me.pressed) {
                    console.log('click toolMI');

                    var toolbarAdmin = me.up('toolbarAdmin'),
                        main = me.up('main'),
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
                                xtype: 'formTool',
                                cls: 'my_shadowborder',
                                margin: 5,
                                flex: 2
                            }
                        ]
                    });
                    /*// * загрузим данные в форму
                     var form = content.down('form'),
                     store = form.getViewModel().getStore('tool'),
                     rec = store.getAt(0);
                     console.info(form,store,rec);
                     form.getForm().loadRecord(rec);*/
                    layout.activeItem.add(content);
                }
            }
        }
    }
});
