Ext.define('App.store.manage.GridAnswerS', {
    extend: 'Ext.data.Store',
    model: 'App.model.manage.GridAnswerM',
    //sorters:['object_type', 'object_name', 'manid'],
    autoSync: true,
    //autoLoad: true,
    proxy: {
        type: 'rest',
        api: {
            create: 'resources/php/manage/syncGridAnswer.php?act=create',
            read: 'resources/php/manage/syncGridAnswer.php?act=read',
            update: 'resources/php/manage/syncGridAnswer.php?act=update',
            destroy: 'resources/php/manage/syncGridAnswer.php?act=destroy'
        },
        reader: {
            type: 'json'
        },
        writer: {
            type: 'json'
            //allowSingle:true  // * чтобы всегда передавал массив
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