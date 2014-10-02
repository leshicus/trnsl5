Ext.define('App.store.admin.ComboLogtypeS', {
    extend:'Ext.data.Store',
    model:'App.model.ComboModel',
    proxy:{
        type:'rest',
        url:'resources/php/admin/getLogtype.php',
        reader:{
            type:'json'
        }
    },
    autoLoad:true
});