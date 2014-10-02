Ext.define('App.store.admin.GridPersonS', {
    extend: 'Ext.data.Store',
    model: 'App.model.admin.GridPersonM',
    autoSync: true,
    //autoLoad: true,
    proxy: {
        type: 'rest',
        api: {
            create: 'resources/php/admin/syncGridPerson.php?act=create',
            read: 'resources/php/admin/syncGridPerson.php?act=read',
            update: 'resources/php/admin/syncGridPerson.php?act=update',
            destroy: 'resources/php/admin/syncGridPerson.php?act=destroy'
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