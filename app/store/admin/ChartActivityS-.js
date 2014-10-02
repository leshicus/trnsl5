Ext.define('App.store.admin.ChartActivityS', {
    extend:'Ext.data.Store',
    model:'App.model.admin.ChartActivityM',
    proxy:{
        type:'rest',
        url:'resources/php/admin/getChartActivity.php',
        reader:{
            type:'json'
        }
    }

});