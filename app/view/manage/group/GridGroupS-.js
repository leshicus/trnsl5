Ext.define('App.store.manage.GridGroupS', {
    extend: 'Ext.data.Store',
    model: 'App.model.manage.GridGroupM',
    //autoSync: true,
    //autoLoad: true,
    proxy: {
        type: 'rest',
        api: {
            create: 'resources/php/manage/syncGridGroup.php?act=create',
            read: 'resources/php/manage/syncGridGroup.php?act=read',
            update: 'resources/php/manage/syncGridGroup.php?act=update',
            destroy: 'resources/php/manage/syncGridGroup.php?act=destroy'
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