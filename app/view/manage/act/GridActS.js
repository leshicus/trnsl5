Ext.define('App.store.manage.GridActS', {
    extend: 'Ext.data.Store',
    model: 'App.model.manage.GridActM',
    autoSync: true,
    //autoLoad: true,
    proxy: {
        type: 'rest',
        api: {
            create: 'resources/php/manage/syncGridAct.php?act=create',
            read: 'resources/php/manage/syncGridAct.php?act=read',
            update: 'resources/php/manage/syncGridAct.php?act=update',
            destroy: 'resources/php/manage/syncGridAct.php?act=destroy'
        },
        reader: {
            type: 'json'
        },
        writer: {
            type: 'json'
        },
        appendId: false,
        actionMethods: {
            create : 'POST',
            read   : 'POST',
            update : 'POST',
            destroy: 'POST'
        }
    },
    initComponent:function () {

    }
});