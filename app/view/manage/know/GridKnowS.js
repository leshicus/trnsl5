Ext.define('App.store.manage.GridKnowS', {
    extend: 'Ext.data.Store',
    model: 'App.model.manage.GridKnowM',
    autoSync: true,
    //autoLoad: true,
    proxy: {
        type: 'rest',
        api: {
            create: 'resources/php/manage/syncGridKnow.php?act=create',
            read: 'resources/php/manage/syncGridKnow.php?act=read',
            update: 'resources/php/manage/syncGridKnow.php?act=update',
            destroy: 'resources/php/manage/syncGridKnow.php?act=destroy'
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