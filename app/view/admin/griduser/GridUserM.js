Ext.define('App.view.admin.griduser.GridUserM', {
    extend: 'Ext.app.ViewModel',
    requires: [

    ],
    alias: 'viewmodel.griduser',
    stores: {
       user: {
            fields:[
               /* {name: 'userid',type:'int'},
                {name: 'familyname'},
                {name: 'firstname'},
                {name: 'lastname'},
                {name: 'roleid'},
                {name: 'login'},
                {name: 'begindate'},
                {name: 'enddate'},
                {name: 'groupid'},
                {name: 'specid'},
                {name: 'password'},
                {name: 'actid'},
                {name: 'orgid'}*/
            ],
           //autoSync: true,
           //autoLoad: true,
           idProperty:'userid',
           proxy: {
               type: 'ajax',
               api: {
                   create: 'resources/php/admin/syncGridUser.php?act=create',
                   read: 'resources/php/admin/syncGridUser.php?act=read',
                   update: 'resources/php/admin/syncGridUser.php?act=update',
                   destroy: 'resources/php/admin/syncGridUser.php?act=destroy'
               },
               reader: {
                   type: 'json'
               },
               writer: {
                   type: 'json',
                   allowSingle:false,
                   writeAllFields:true,
                   writeValue:function (data, field) {
                        if('specname' !== field.name)   {
                            Ext.data.writer.Json.prototype.writeValue.apply(this,arguments);
                        }
                   }
               },
               appendId: false,
               actionMethods: {
                   create : 'POST',
                   read   : 'POST',
                   update : 'POST',
                   destroy: 'POST'
               }
           }
        }
    }
});
