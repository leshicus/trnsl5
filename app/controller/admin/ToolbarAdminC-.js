Ext.define('App.controller.admin.ToolbarAdminC', {
    extend: 'Ext.app.Controller',
    views: [
        'admin.ToolbarAdminV'
    ],
    models: [

    ],
    stores: [

    ],
    refs: [
        {
            ref: 'toolbarAdmin',
            selector: 'toolbarAdmin'
        }
    ],

    init: function () {
        console.log('ToolbarC init');

        this.control({
            'toolbarAdmin #userMI': {
                toggle: function (me, state) {
                    if (me.pressed) {
                        console.log('click userMI');

                        var toolbarAdmin = me.up('toolbarAdmin'),
                            viewport = me.up('viewport'),
                            panel = Ext.ComponentQuery.query('panelUser')[0],
                            storeUser = Ext.StoreManager.lookup('admin.GridUserS'),
                            treeUser = Ext.StoreManager.lookup('admin.TreeUserS'),
                            layout = viewport.getLayout();
                        storeUser.filter(function () {
                            return false;
                        });
                        if (!panel) {
                            panel = Ext.create('App.view.admin.PanelUserV');
                        }
                        treeUser.getRootNode().expand(true);
                        layout.activeItem.query('.panel').forEach(App.util.Utilities.cascadeRemoveGrid);
                        layout.activeItem.add(panel);
                    }
                }
            },
            'toolbarAdmin #mainMI': {
                toggle: function (me, state) {
                    if (me.pressed) {
                        console.log('click mainMI');

                        var viewport = me.up('viewport'),
                            layout = viewport.getLayout();
                        layout.activeItem.query('.panel').forEach(App.util.Utilities.cascadeRemoveGrid);
                        layout.setActiveItem(0);
                    }
                }
            },
            'toolbarAdmin #logMI': {
                toggle: function (me, state) {
                    if (me.pressed) {
                        console.log('click logMI');

                        var toolbarAdmin = me.up('toolbarAdmin'),
                            viewport = me.up('viewport'),
                            panel = Ext.ComponentQuery.query('gridLog')[0],
                            layout = viewport.getLayout();
                        if (!panel) {
                            panel = Ext.create('App.view.admin.GridLogV');
                        }
                        layout.activeItem.query('.panel').forEach(App.util.Utilities.cascadeRemoveGrid);
                        layout.activeItem.add(panel);

                        // * установим даты по умолчанию на текущую дату
                        var dateFrom = panel.down('#dateFindFrom'),
                            now = new Date(),
                            year = now.getFullYear(),
                            month = App.util.Utilities.reverseDate(now.getMonth() + 1),
                            day = App.util.Utilities.reverseDate(now.getDate()),
                            dateBegin = [day, month, year].join('.');
                        dateFrom.setValue(dateBegin);
                    }
                }
            },
            'toolbarAdmin #classMI': {
                toggle: function (me, state) {
                    if (me.pressed) {
                        console.log('click classMI');

                        var toolbarAdmin = me.up('toolbarAdmin'),
                            viewport = me.up('viewport'),
                            panel = Ext.ComponentQuery.query('panelClass')[0],
                            layout = viewport.getLayout();
                        if (!panel) {
                            panel = Ext.create('App.view.admin.PanelClassV');
                        }
                        layout.activeItem.query('.panel').forEach(App.util.Utilities.cascadeRemoveGrid);
                        layout.activeItem.add(panel);

                        var gridPerson = Ext.ComponentQuery.query('gridPerson')[0],
                            gridSigngroup = Ext.ComponentQuery.query('gridSigngroup')[0];
                        gridPerson.store.filter(function () {
                            return false
                        });
                        gridSigngroup.store.filter(function () {
                            return false
                        });
                    }
                }
            },
            'toolbarAdmin #statMI': {
                toggle: function (me, state) {
                    if (me.pressed) {
                        console.log('click statMI');

                        var toolbarAdmin = me.up('toolbarAdmin'),
                            viewport = me.up('viewport'),
                            panel = Ext.ComponentQuery.query('panelStat')[0],
                            layout = viewport.getLayout();

                        if (!panel) {
                            panel = Ext.create('App.view.admin.PanelStatV');
                        }
                        layout.activeItem.query('.panel').forEach(App.util.Utilities.cascadeRemoveGrid);
                        layout.activeItem.add(panel);

                        // * установим даты по умолчанию как начало и конец текущего месяца
                        var dateFrom = panel.down('#panelSet #dateFrom'),
                            dateTo = panel.down('#panelSet #dateTo'),
                            now = new Date(),
                            year = now.getFullYear(),
                            month = App.util.Utilities.reverseDate(now.getMonth() + 1),
                            daysCount = new Date(year, month, 0).getDate(),
                            dateBegin = ['01', month, year].join('.'),
                            dateEnd = [daysCount, month, year].join('.');
                        dateFrom.setValue(dateBegin);
                        dateTo.setValue(dateEnd);
                    }
                }
            },
            'toolbarAdmin #toolMI': {
                toggle: function (me, state) {
                    if (me.pressed) {
                        console.log('click toolMI');

                        var toolbarAdmin = me.up('toolbarAdmin'),
                            viewport = me.up('viewport'),
                            panel = Ext.ComponentQuery.query('formTool')[0],
                            layout = viewport.getLayout();
                        if (!panel) {
                            panel = Ext.create('App.view.admin.FormToolV');
                        }
                        // * загрузим данные в форму
                        var store = Ext.data.StoreManager.lookup('admin.FormToolS'),
                            rec = store.getAt(0);
                        panel.getForm().loadRecord(rec);

                        layout.activeItem.query('.panel').forEach(App.util.Utilities.cascadeRemoveGrid);
                        layout.activeItem.add(panel);
                    }
                }
            }
        });

        console.log('ToolbarC end');
    }
});

