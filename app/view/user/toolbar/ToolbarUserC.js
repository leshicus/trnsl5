Ext.define('App.view.user.toolbar.ToolbarUserC', {
    extend: 'Ext.app.ViewController',
    requires: [
        'App.view.user.self.PanelSelfV',
        'App.view.user.test.PanelTestV'
    ],
    alias: 'controller.toolbaruser',

    control: {
        '#mainMI': {
            toggle: function (button, state) {
                if (button.pressed) {
                    console.log('click mainMI');

                    var main = button.up('main'),
                        layout = main.getLayout();
                    layout.activeItem.query('panel').forEach(App.util.Utilities.cascadeRemoveGrid);
                    layout.setActiveItem(0);
                }
            }
        },
        '#testMI': {
            toggle: function (me, state) {  // * использую toggle вместо click, т.к. при click можно нажать уже нажатую кнопку, а нам это не нужно
                if (me.pressed) {
                    /*var toolbarUser = me.up('toolbarUser'),
                        viewport = me.up('viewport'),
                        panel = Ext.ComponentQuery.query('panelTest')[0],
                        layout = viewport.getLayout();
                    if (!panel) {
                        panel = Ext.create('App.view.user.PanelTestV');
                    }
                    if (layout.activeItem) {
                        layout.activeItem.query('.panel').forEach(App.util.Utilities.cascadeRemoveGrid);
                        layout.activeItem.add(panel);
                    }*/


                    var main = me.up('main'),
                        toolbar = me.up('toolbar'),
                        layout = main.getLayout(),
                        content = layout.activeItem.query('#content')[0];
                    if (content) {
                        layout.activeItem.remove(content);
                    }
                    content = Ext.create('App.view.user.test.PanelTestV');
                    layout.activeItem.add(content);
                }
            }
        },

        '#selfMI': {
            toggle: function (me, state) {
                if (me.pressed) {
                    /*var toolbarUser = me.up('toolbarUser'),
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
                    }*/
                    var main = me.up('main'),
                        toolbar = me.up('toolbar'),
                        layout = main.getLayout(),
                        content = layout.activeItem.query('#content')[0];
                    if (content) {
                        layout.activeItem.remove(content);
                    }
                    content = Ext.create('App.view.user.self.PanelSelfV');
                    layout.activeItem.add(content);
                }
            }
        }
    }
});
