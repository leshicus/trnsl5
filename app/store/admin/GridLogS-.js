Ext.define('App.store.admin.GridLogS', {
    extend: 'Ext.data.Store',
    model: 'App.model.admin.GridLogM',
    autoSync: true,
    //autoLoad: true,
    proxy: {
        type: 'rest',
        api: {
            //create: 'resources/php/admin/syncGridLog.php?act=create',
            read: 'resources/php/admin/syncGridLog.php?act=read'
            //update: 'resources/php/admin/syncGridLog.php?act=update',
            //destroy: 'resources/php/admin/syncGridLog.php?act=destroy'
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