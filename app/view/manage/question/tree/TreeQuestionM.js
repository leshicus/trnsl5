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
          // rootVisible: false,
           /*root: {
               //text: 'children',
               expanded: false

           },*/
           /*root: {
               text: 'текст',
               loaded: true // * нужно, чтобы реагировало на autoLoad: false, а иначе все равно грузит
           },*/
           autoLoad:true
        }
    }
});
