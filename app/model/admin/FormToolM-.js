Ext.define('App.model.admin.FormToolM', {
    extend:'Ext.data.Model',
    fields:[
        {name:'toolid'},
        {name:'maxquestion',type:'int'},
        {name:'minquestion',type:'int'},
        {name:'regstatint',type:'int'},
        {name:'regstatdur',type:'int'},
        {name:'examtimermin',type:'int'}
    ]
});