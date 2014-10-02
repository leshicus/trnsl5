Ext.define('App.controller.user.ToolbarUserC', {
    extend: 'Ext.app.Controller',
    views: [
        'user.ToolbarUserV'
    ],
    models: [

    ],
    stores: [

    ],
    refs: [
        {
            ref: 'toolbarUser',
            selector: 'toolbarUser'
        }
    ],

    init: function () {
        console.log('ToolbarC init');

        this.control({
            'toolbarUser #testMI': {
                toggle: function (me, state) {  // * использую toggle вместо click, т.к. при click можно нажать уже нажатую кнопку, а нам это не нужно
                    if (me.pressed) {
                        var toolbarUser = me.up('toolbarUser'),
                            viewport = me.up('viewport'),
                            panel = Ext.ComponentQuery.query('panelTest')[0],
                            layout = viewport.getLayout();
                        if (!panel) {
                            panel = Ext.create('App.view.user.PanelTestV');
                        }
                        if (layout.activeItem) {
                            layout.activeItem.query('.panel').forEach(App.util.Utilities.cascadeRemoveGrid);
                            layout.activeItem.add(panel);
                        }
                    }
                }
            },
            'toolbarUser #mainMI': {
                toggle: function (me, state) {
                    if (me.pressed) {
                        var viewport = me.up('viewport'),
                            layout = viewport.getLayout();
                        layout.activeItem.query('.panel').forEach(App.util.Utilities.cascadeRemoveGrid);
                        layout.setActiveItem(0);
                    }
                }
            },
            'toolbarUser #selfMI': {
                toggle: function (me, state) {
                    if (me.pressed) {
                        var toolbarUser = me.up('toolbarUser'),
                            viewport = me.up('viewport'),
                            panel = Ext.ComponentQuery.query('panelSelf')[0],
                            layout = viewport.getLayout();
                        if (!panel) {
                            panel = Ext.create('App.view.user.PanelSelfV');
                        }
                        if (layout.activeItem) {
                            layout.activeItem.query('.panel').forEach(App.util.Utilities.cascadeRemoveGrid);
                            //layout.activeItem.cascade(cascadeRemoveGrid, {scope:this, args:false});
                            layout.activeItem.add(panel);
                        }
                    }
                }
            }
        });

        console.log('ToolbarC end');
    }
});

