Ext.define('App.view.auth.tabreg.TabRegM', {
    extend: 'Ext.app.ViewModel',
    requires: [
        'Ext.data.proxy.Rest'
    ],
    alias: 'viewmodel.tabReg',
    stores: {
        /*storeOrg: {
            fields:[
                {name: 'orgid'},
                {name: 'orgname'},
                {name: 'orgabbr'}
            ],
            autoSync: true,
            autoLoad: true,
            proxy: {
                type: 'rest',
                api: {
                    create: 'resources/php/manage/syncGridOrg.php?act=create',
                    read: 'resources/php/manage/syncGridOrg.php?act=read',
                    update: 'resources/php/manage/syncGridOrg.php?act=update',
                    destroy: 'resources/php/manage/syncGridOrg.php?act=destroy'
                },
                reader: {
                    type: 'json'
                },
                writer: {
                    type: 'json'
                },
                appendId: false,
                actionMethods: {
                    create : 'POST',
                    read   : 'POST',
                    update : 'POST',
                    destroy: 'POST'
                },
                storeId:'storeOrg'
            }
        },
        storeSpec: {
            fields:[
                {name: 'specid'},
                {name: 'specname'},
                {name: 'groupid'},
                {name: 'orgid'}
            ],
            autoSync: true,
            autoLoad: true,
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
                    type: 'json'
                },
                appendId: false,
                actionMethods: {
                    create : 'POST',
                    read   : 'POST',
                    update : 'POST',
                    destroy: 'POST'
                },
                storeId:'storeSpec'
            }
        }*/

    }
});
