Ext.define('App.view.admin.stat.PanelStatC', {
    extend: 'Ext.app.ViewController',
    requires: [
        'App.view.admin.stat.ChartActivityV',
        'App.view.admin.stat.ChartActivityProgressV',
        'App.view.admin.stat.ChartKnowProgressV'
    ],
    alias: 'controller.panelstat',

    control: {
        '#comboStat': {
            select: function (combo, records, eOpts) {
                console.log('comboStat');

                var type = records[0].get('id'),
                    panelStat = combo.up('#panelStat'),
                    dateFrom = panelStat.down('#dateFindFrom').getValue(),
                    dateTo = panelStat.down('#dateFindTo').getValue(),
                    org = panelStat.down('#comboOrg').getValue(),
                    panel = panelStat.down('#panelChart');
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

                        var chart = Ext.create('App.view.admin.stat.ChartActivityV'),
                            storeAct = panelStat.getViewModel().getStore('chartactivity');

                        storeAct.load({
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
                        //var storeAct = Ext.data.StoreManager.lookup('admin.ChartActivityS');
                        var storeAct = panelStat.getViewModel().getStore('chartactivity');
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
                                            chart = Ext.create('App.view.admin.stat.ChartActivityProgressV');
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
                        //var storeAct = Ext.data.StoreManager.lookup('admin.ChartActivityS');
                        var storeAct = panelStat.getViewModel().getStore('chartactivity');
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
                                            chart = Ext.create('App.view.admin.stat.ChartKnowProgressV');
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
        '#dateFindFrom': {
            specialkey: function (field, e) {
                if (e.getKey() == e.DELETE) {
                    field.reset();
                }
            }
        },
        '#dateFindTo': {
            specialkey: function (field, e) {
                if (e.getKey() == e.DELETE) {
                    field.reset();
                }
            }
        }

    }
});
