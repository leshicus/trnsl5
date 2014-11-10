Ext.define('App.view.user.test.PanelTestM', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.paneltest',
    stores: {
        exam: {
            fields: [
                {name: 'examid'},
                {name: 'examdate'},
                {name: 'userid'},
                {name: 'fio'},
                {name: 'login'},
                {name: 'orgid'},
                {name: 'orgabbr',type:'string'}
            ],
            autoSync: true,
            autoLoad: true,
            idProperty:'examid',
            proxy: {
                type: 'rest',
                extraParams: {
                    testMode:1
                },
                api: {
                    create: 'resources/php/admin/syncGridExam.php?act=create',
                    read: 'resources/php/admin/syncGridExam.php?act=read',
                    update: 'resources/php/admin/syncGridExam.php?act=update',
                    destroy: 'resources/php/admin/syncGridExam.php?act=destroy'
                },
                reader: {
                    type: 'json'
                },
                writer: {
                    type: 'json',
                    writeAllFields:true,
                    encode: true,
                    writeValue:function (data, field) {
                        console.info(arguments);
                        if('orgabbr' !== field.name)   {
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
