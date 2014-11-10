Ext.define('App.store.manage.GridQuestionS', {
    extend: 'Ext.data.Store',
    model: 'App.model.manage.GridQuestionM',
    //sorters:['object_type', 'object_name', 'manid'],
    //autoSync: true,
    //autoLoad: true,
    proxy: {
        type: 'ajax',
        api: {
            create: 'resources/php/manage/syncGridQuestion.php?act=create',
            read: 'resources/php/manage/syncGridQuestion.php?act=read',
            update: 'resources/php/manage/syncGridQuestion.php?act=update',
            destroy: 'resources/php/manage/syncGridQuestion.php?act=destroy'
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