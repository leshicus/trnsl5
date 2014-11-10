Ext.define('App.view.manage.spec.TreeSpecM', {
    extend: 'Ext.app.ViewModel',
    requires: [
        'Ext.data.TreeStore',
    ],
    alias: 'viewmodel.treeSpec',
    stores: {
       treespec: {
           type:'tree',
           proxy: {
               type: 'ajax',
               url: 'resources/php/manage/getTreeSpec.php',
               reader: {
                   type: 'json'
               }
           },
           /*root: {
               text: 'Организации',
               expanded: true
           },*/
           autoLoad:true
        }
    }
});
