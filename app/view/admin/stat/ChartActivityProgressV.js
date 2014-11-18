Ext.define('App.view.admin.stat.ChartActivityProgressV', {
    //extend: 'Ext.ux.chart.TitleChart',
    extend: 'Ext.Panel',
    requires: [
        'Ext.chart.*',
        'App.view.admin.stat.PanelStatM'
    ],
    alias: 'widget.chartActivityProgress',
    viewModel: {type: 'panelstat'},
    itemId: 'chartActivityProgress',
    animate: true,
    shadow: true,
    // * title параметры - это из плагина Ext.ux.chart.TitleChart
    titleFont: 'bold 16px sans-serif',
    titlePadding: 5,
    titleMargin: 5,
    titleLocation: 'top',
    legend: {
        position: 'right'
    },
  /*  bind:{
        store:'{chartactivityprogress}'
    },*/
    insetPadding: 60,
    theme: 'Base',
    initComponent: function () {
        console.log('ChartActivityProgressV init');
        var me = this;
       /* var store = Ext.create('App.store.admin.ChartActivityProgressS');
        this.store = store;*/

        this.items = [
            {
                xtype: 'polar',
                theme: 'default-gradients',
                width: '100%',
                height: 460,
                legend: {
                    docked: 'bottom'
                },
             /*   bind: {
                    store: '{chartactivityprogress}'
                },*/
                insetPadding: {
                    top: 40,
                    left: 40,
                    right: 40,
                    bottom: 40
                },
                innerPadding: 20,
                interactions: ['rotate', 'itemhighlight'],
                sprites: [{
                    type: 'text',
                    text: 'Успеваемость по видам деятельности',
                    fontSize: 22,
                    width: 100,
                    height: 30,
                    x: 40, // the sprite x position
                    y: 20  // the sprite y position
                }],
                series: [
                    {
                        type: 'pie',
                        angleField: 'data',
                        showInLegend: true,

                        tooltip: {
                            trackMouse: true,
                            width: 140,
                            height: 28,
                          /*  renderer: function (storeItem, item) {
                                //calculate percentage.
                                var total = 0,
                                    store = me.getViewModel().getStore('chartactivityprogress');
                                store.each(function (rec) {
                                    total += rec.get('data');
                                    console.info(store,total);
                                });

                                this.setTitle(storeItem.get('result') + ': ' + Math.round(storeItem.get('data') / total * 100) + '%');
                                this.setHtml(storeItem.get('result') + ': ' + storeItem.get('data') + '%');
                            }*/
                        },
                        label: {
                            field: 'result',
                            display: 'rotate',
                            contrast: true,
                            font: '18px Arial',
                            // * чтобы не показывались подписи если значение 0
                         /*   renderer: function (val) {

                                var store = me.getViewModel().getStore('chartactivityprogress'),
                                    m = store.findRecord('result', val, 0,false,true,true);
                                console.info(store,val);
                                return m.get('data') > 0 ? val : '';
                            }*/
                        }
                    }
                ]
            }
            ]

        /*this.series = [
            {
                type: 'pie',
                angleField: 'data',
                showInLegend: true,

                tips: {
                    trackMouse: true,
                    width: 140,
                    height: 28,
                    renderer: function (storeItem, item) {
                        //calculate percentage.
                        var total = 0;
                        store.each(function (rec) {
                            total += rec.get('data');
                        });
                        this.setTitle(storeItem.get('result') + ': ' + Math.round(storeItem.get('data') / total * 100) + '%');
                    }
                },
                highlight: {
                    segment: {
                        margin: 20
                    }
                },
                label: {
                    field: 'result',
                    display: 'rotate',
                    contrast: true,
                    font: '18px Arial',
                    // * чтобы не показывались подписи если значение 0
                    renderer: function (val) {
                        var m = store.findRecord('result', val, 0,false,true,true);
                        return m.get('data') > 0 ? val : '';
                    }
                }
            }
        ];
*/
        this.callParent(arguments);
        console.log('ChartActivityProgressV end');
    }
});