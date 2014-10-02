Ext.define('App.store.admin.ChartActivityProgressS', {
    extend:'Ext.data.Store',
    model:'App.model.admin.ChartActivityProgressM',
    proxy:{
        type:'rest',
        url:'resources/php/admin/getChartActivityProgress.php',
        reader:{
            type:'json'
        }
    }
});