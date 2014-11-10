Ext.define('App.view.manage.question.tree.TreeQuestionM', {
    extend: 'Ext.app.ViewModel',
    requires: [
        'Ext.data.TreeStore',
    ],
    alias: 'viewmodel.treeQuestion',
    stores: {
       treequestion: {
           type:'tree',
           proxy: {
               type: 'ajax',
               url: 'resources/php/manage/getTreeQuestion.php',
               reader: {
                   type: 'json'
               }
           },
           // * если не указывать нижние строчки, то ругается на isUtilObservable of undefined
           /*rootVisible: true,
           root: {
               text: 'Организации',
               expanded: true,
               id:0
           },*/
           root: {expanded: true, children: [] },
           autoLoad:true,
           listeners: {
               beforeload: function (store, operation, eOpts) {
                   if (store.isLoading()) return false;
               }
           }
        }
    }
});
