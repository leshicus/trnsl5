Ext.define('App.store.admin.GridExamS', {
    extend: 'Ext.data.Store',
    model: 'App.model.admin.GridExamM',
    autoSync: true,
    //autoLoad: true,
    proxy: {
        type: 'rest',
        api: {
            create: 'resources/php/admin/syncGridExam.php?act=create',
            read: 'resources/php/admin/syncGridExam.php?act=read',
            update: 'resources/php/admin/syncGridExam.php?act=update',
            destroy: 'resources/php/admin/syncGridExam.php?act=destroy'
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