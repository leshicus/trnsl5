Ext.define('App.store.admin.GridUserS', {
    extend: 'Ext.data.Store',
    model: 'App.model.admin.GridUserM',
    autoSync: true,
    //autoLoad: true,
    proxy: {
        type: 'rest',
        api: {
            create: 'resources/php/admin/syncGridUser.php?act=create',
            read: 'resources/php/admin/syncGridUser.php?act=read',
            update: 'resources/php/admin/syncGridUser.php?act=update',
            destroy: 'resources/php/admin/syncGridUser.php?act=destroy'
        },
        reader: {
            type: 'json'
        },
        writer: {
            type: 'json',
            allowSingle:false
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