Ext.define('App.store.admin.ComboRoleS', {
    extend:'Ext.data.Store',
    model:'App.model.ComboModel',
    proxy:{
        type:'rest',
        url:'resources/php/admin/getRole.php',
        reader:{
            type:'json'
        }
    }
    //autoLoad:true
});