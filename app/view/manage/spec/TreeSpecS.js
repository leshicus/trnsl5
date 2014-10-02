Ext.define('App.store.manage.TreeSpecS', {
    extend: 'Ext.data.TreeStore',
    //autoLoad:true,
    proxy: {
        type: 'rest',
        url: 'resources/php/manage/getTreeSpec.php'
    },
    root: {
        text: 'Организации',
        expanded: false
    }
});