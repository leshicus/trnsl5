Ext.define('App.store.admin.FormToolS', {
    extend:'Ext.data.Store',
    model:'App.model.admin.FormToolM',
    //autoSync:true,
    autoLoad:true,
    proxy: {
        type: 'rest',
        api: {
            read: 'resources/php/admin/syncFormTool.php?act=read',
            update: 'resources/php/admin/syncFormTool.php?act=update'
        },
        reader: {
            type: 'json'
        },
        writer: {
            type: 'json',
            writeAllFields: false
        },
        appendId: false,
        actionMethods: {
            create : 'POST',
            read   : 'POST',
            update : 'POST',
            destroy: 'POST'
        }
    }
});