Ext.define('App.store.admin.GridSigngroupS', {
    extend: 'Ext.data.Store',
    model: 'App.model.admin.GridSigngroupM',
    autoSync: true,
    //autoLoad: true,
    proxy: {
        type: 'rest',
        api: {
            create: 'resources/php/admin/syncGridSigngroup.php?act=create',
            read: 'resources/php/admin/syncGridSigngroup.php?act=read',
            update: 'resources/php/admin/syncGridSigngroup.php?act=update',
            destroy: 'resources/php/admin/syncGridSigngroup.php?act=destroy'
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