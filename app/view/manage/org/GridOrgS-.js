Ext.define('App.store.manage.GridOrgS', {
    extend: 'Ext.data.Store',
    model: 'App.model.manage.GridOrgM',
    autoSync: true,
    autoLoad: true,
    proxy: {
        type: 'rest',
        api: {
            create: 'resources/php/manage/syncGridOrg.php?act=create',
            read: 'resources/php/manage/syncGridOrg.php?act=read',
            update: 'resources/php/manage/syncGridOrg.php?act=update',
            destroy: 'resources/php/manage/syncGridOrg.php?act=destroy'
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