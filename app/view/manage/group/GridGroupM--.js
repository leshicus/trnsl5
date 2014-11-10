Ext.define('App.view.manage.group.GridGroupM', {
    extend: 'Ext.app.ViewModel',
    requires: [],
    alias: 'viewmodel.gridGroup',
    stores: {
        group: {
            fields: [],
            //autoSync: true,
            idProperty:'groupid',
            autoLoad: true,
            proxy: {
                type: 'ajax',
                api: {
                    create: 'resources/php/manage/syncGridGroup.php?act=create',
                    read: 'resources/php/manage/syncGridGroup.php?act=read',
                    update: 'resources/php/manage/syncGridGroup.php?act=update',
                    destroy: 'resources/php/manage/syncGridGroup.php?act=destroy'
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
                    create : 'POST',
                    read   : 'POST',
                    update : 'POST',
                    destroy: 'POST'
                }
            }
        }
    }
});
