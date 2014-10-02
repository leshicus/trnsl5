Ext.define('App.view.admin.treeuser.TreeUserM', {
    extend: 'Ext.app.ViewModel',
    requires: [
        'Ext.data.TreeStore',
    ],
    alias: 'viewmodel.treeuser',
    stores: {
       treeuser: {
           type:'tree',
           proxy: {
               type: 'ajax',
               url: 'resources/php/admin/getTreeUser.php',
               //url: 'resources/data/admin/getTreeUser.json',
               reader: {
                   type: 'json'
               }
           },
           //idProperty: 'id',
           // * если не указывать нижние строчки, то ругается на isUtilObservable of undefined
           root: {
               text: 'Организации',
               expanded: true
           },
           autoLoad:true
        }
    }
});
