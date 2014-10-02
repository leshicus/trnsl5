Ext.define('App.store.admin.TreeUserS', {
    extend: 'Ext.data.TreeStore',
    //autoLoad:true,
    proxy: {
        type: 'rest',
        url: 'resources/php/admin/getTreeUser.php'
    },
    root: {
        text: 'Организации'
        //expanded: false
        //loaded:true
    }
});