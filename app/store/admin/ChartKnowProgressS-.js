Ext.define('App.store.admin.ChartKnowProgressS', {
    extend:'Ext.data.Store',
    model:'App.model.admin.ChartM',
    proxy:{
        type:'rest',
        url:'resources/php/admin/getChartKnowProgress.php',
        reader:{
            type:'json'
        }
    }
});