Ext.define('App.store.admin.ComboStatS', {
    extend: 'Ext.data.ArrayStore',
    fields:['id', 'name'],
    data:App.util.Utilities.dataStat
});