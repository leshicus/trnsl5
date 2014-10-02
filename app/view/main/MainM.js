Ext.define('App.view.main.MainM', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.main',

    data: {
        name: 'App'
    },
    stores: {
        org: {
            fields: [
                {name: 'orgid',type:'int'},
                {name: 'orgname'},
                {name: 'orgabbr',type:'string'}
            ],
            autoSync: true,
            idProperty:'orgid',
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
                    create: 'POST',
                    read: 'POST',
                    update: 'POST',
                    destroy: 'POST'
                },
                storeId: 'storeOrg'
            }
        },
        spec: {
            fields: [
                {name: 'specid'},
                {name: 'specname'},
                {name: 'groupid'},
                {name: 'orgid'}
            ],
            autoSync: true,
            autoLoad: true,
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
                    type: 'json'
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
                {name: 'id'},
                {name: 'name'},
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



        /* storeGridcard: {
         fields: [
         'cardid',
         'family',
         'firstname',
         'lastname',
         'pasnum',
         'passer',
         'resident',
         'issued',
         'dateissue',
         'depcode',
         'regaddr',
         'phone',
         'vip',
         'blacklist',
         'barcode',
         'status'
         ],
         //idProperty: 'id',
         proxy: {
         type: 'ajax',
         url: 'resources/data/card/getGridCard.json',
         reader: {type: 'json'}
         },
         //pageSize: Office.util.Utilities.pageSize,
         remoteSort: true,
         sorters: [{
         property: 'family',
         direction: 'DESC'
         }],
         autoLoad: true
         }*/
    }
    //TODO - add data, formulas and/or methods to support your view
});