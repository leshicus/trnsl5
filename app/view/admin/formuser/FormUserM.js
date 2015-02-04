Ext.define('App.view.admin.formuser.FormUserM', {
    extend: 'Ext.app.ViewModel',
    requires: [

    ],
    alias: 'viewmodel.formuser',
    stores: {
        spec: {
            fields: [

            ],
            autoLoad:true,
            idProperty:'specid',
            proxy: {
                type: 'rest',
                api: {
                    create: 'resources/php/manage/syncGridSpec.php?act=create',
                    read: 'resources/php/manage/syncGridSpec.php?act=read',
                    update: 'resources/php/manage/syncGridSpec.php?act=update',
                    destroy: 'resources/php/manage/syncGridSpec.php?act=destroy'
                },
                reader: {
                    type: 'json'
                },
                writer: {
                    type: 'json',
                    writeAllFields: true
                },
                appendId: false,
                actionMethods: {
                    create: 'POST',
                    read: 'POST',
                    update: 'POST',
                    destroy: 'POST'
                },
                storeId: 'storeSpec'
            }
        },
        role: {
            fields: [

            ],
            autoLoad: true,
            proxy: {
                type: 'rest',
                url: 'resources/php/admin/getRole.php',
                reader: {
                    type: 'json'
                }
            }
        }
    }
});
