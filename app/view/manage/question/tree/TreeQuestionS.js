Ext.define('App.store.manage.TreeQuestionS', {
    extend: 'Ext.data.TreeStore',
    //autoLoad:true,
    proxy: {
        type: 'rest',
        url: 'resources/php/manage/getTreeQuestion.php'
    },
    root: {
        text: 'Организации',
        expanded: false
    }
});