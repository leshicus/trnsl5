Ext.define('App.controller.admin.PanelStatC', {
    extend: 'Ext.app.Controller',
    views: [
        'admin.PanelStatV',
        'admin.ChartActivityV',
        'admin.ChartActivityProgressV',
        'admin.ChartKnowProgressV'
    ],
    models: [
        'admin.ChartM',
        'admin.ChartActivityProgressM'
    ],
    stores: [
        'admin.ChartActivityS',
        'admin.ChartActivityProgressS',
        'admin.ChartKnowProgressS',
        'admin.ComboStatS'
    ],
    refs: [
        /*     {
         ref: 'chart',
         selector: 'panelStat #panelChart chart'
         },*/
        {
            ref: 'panelChart',
            selector: 'panelStat #panelChart'
        },
        {
            ref: 'panelStat',
            selector: 'panelStat'
        },
        {
            ref: 'panelSet',
            selector: 'panelStat #panelSet'
        }
    ],

    onLaunch: function () {
        var me = this;
        /* var storeAct = Ext.data.StoreManager.lookup('storeAct_2');
         storeAct.on('load', me.onStoreActLoad, me);*/
    },
    init: function () {
        console.log('PanelStatC init');

        this.control({
            'panelStat #comboStat': {
                select: function (combo, records, eOpts) {
                    console.log('comboStat');

                    var type = records[0].get('id'),
                        dateFrom = this.getPanelSet().down('#dateFrom').getValue(),
                        dateTo = this.getPanelSet().down('#dateTo').getValue(),
                        org = this.getPanelSet().down('#comboOrg').getValue(),
                        panel = this.getPanelChart();
                    if (!org) {
                        Ext.Msg.alert('Внимание', 'Укажите организацию');
                        return false;
                    }
                    if (!dateFrom || !dateTo) {
                        Ext.Msg.alert('Внимание', 'Укажите период');
                        return false;
                    }
                    panel.removeAll(true);
                    switch (type) {
                        case '1':
                            var chart = Ext.create('App.view.admin.ChartActivityV');
                            chart.store.load({
                                params: {
                                    dateFrom: dateFrom,
                                    dateTo: dateTo,
                                    org: org
                                },
                                callback: function (records, operation, success) {
                                    if (success == true) {
                                        panel.add(chart);
                                    } else {
                                        App.util.Utilities.errorMessage('Ошибка подключения к базе', 'График не получен');
                                    }
                                },
                                scope: this
                            });
                            break;
                        case '2':
                            var storeAct = Ext.data.StoreManager.lookup('admin.ChartActivityS');
                            storeAct.load({
                                params: {
                                    dateFrom: dateFrom,
                                    dateTo: dateTo,
                                    org: org
                                },
                                callback: function (records, operation, success) {
                                    if (success == true) {
                                        // * получим сколько у нас будет графиков- сколько записей в storeAct
                                        storeAct.each(function (rec) {
                                            var act = rec.get('name'),
                                                chart = Ext.create('App.view.admin.ChartActivityProgressV');
                                            // * для каждого вида деятельности грузим стор для своей диаграммы
                                            chart.store.load({params: {
                                                dateFrom: dateFrom,
                                                dateTo: dateTo,
                                                act: act,
                                                org: org
                                            }});
                                            chart.title = act;
                                            panel.add(chart);

                                            //panel.add({xtype:'textfield',fieldLabel:'textfield'});
                                        });
                                    } else {
                                        App.util.Utilities.errorMessage('Ошибка подключения к базе', 'График не получен');
                                    }
                                },
                                scope: this
                            });
                            break;
                        case '3':
                            var storeAct = Ext.data.StoreManager.lookup('admin.ChartActivityS');
                            storeAct.load({
                                params: {
                                    dateFrom: dateFrom,
                                    dateTo: dateTo,
                                    org: org
                                },
                                callback: function (records, operation, success) {
                                    if (success == true) {
                                        // * получим сколько у нас будет графиков- сколько записей в storeAct
                                        storeAct.each(function (rec) {
                                            var act = rec.get('name'),
                                                chart = Ext.create('App.view.admin.ChartKnowProgressV');
                                            // * для каждого вида деятельности грузим стор для своей диаграммы
                                            chart.store.load({params: {
                                                dateFrom: dateFrom,
                                                dateTo: dateTo,
                                                act: act,
                                                org: org
                                            }});
                                            chart.title = act;
                                            panel.add(chart);
                                        });
                                    } else {
                                        App.util.Utilities.errorMessage('Ошибка подключения к базе', 'График не получен');
                                    }
                                },
                                scope: this
                            });
                            break;
                    }

                }
            },
            'panelStat #dateFrom': {
                specialkey: function (field, e) {
                    if (e.getKey() == e.DELETE) {
                        field.reset();
                    }
                }
            },
            'panelStat #dateTo': {
                specialkey: function (field, e) {
                    if (e.getKey() == e.DELETE) {
                        field.reset();
                    }
                }
            }/*,
             'panelStat #panelChart button[action=saveChart]': {
             click: function (button) {
             console.log('action=saveChart');

             Ext.MessageBox.confirm('Подтвердите', 'Хотите сохранить изображение?', function (choice) {
             if (choice == 'yes') {
             var chart = this.getPanelChart().down('chart');
             // TODO печать работает только для одного из графиков
             chart.save({
             type: 'image/png'
             });
             //Ext.ux.Printer.print(chart);
             *//*Ext.ux.printer.Manager.print(stat, {
             styleSheets: ['/ext-4.2.1/resources/css/ext-all.css']
             });*//*
             }
             }, this);
             }
             }*/
        });
        console.log('PanelStatC end');
    }





});