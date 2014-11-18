Ext.define('App.view.admin.stat.ChartActivityV', {
    //extend: 'Ext.chart.Chart',
    extend: 'Ext.Panel',
    requires: [
        'Ext.chart.*',
        'App.view.admin.stat.PanelStatM'
    ],
    alias: 'widget.chartActivity',
    viewModel: {type: 'panelstat'},
  /*  bind:{
     store:'{chartactivity}'
     },*/
    itemId: 'chartActivity',
    /*animate: true,
    shadow: true,*/
    /*legend: {
     position: 'right'
     },*/
    flex: false,
    width: 400,
    /*insetPadding: 60,
    margin: '0 200 0 200',
    theme: 'Base:gradients',*/

    initComponent: function () {
        console.log('ChartActivityV init');

        this.items = [
            {
                xtype: 'cartesian',
                itemId:'chart',
                width: '100%',
                height: 460,
                legend: {
                    docked: 'bottom'
                },
                /*bind: {
                    store: '{chartactivity}'
                },*/
                insetPadding: {
                    top: 40,
                    left: 40,
                    right: 40,
                    bottom: 40
                },
                sprites: [{
                    type: 'text',
                    text: "Количество экзаменуемых по видам деятельности",
                    fontSize: 22,
                    width: 100,
                    height: 30,
                    x: 40, // the sprite x position
                    y: 20  // the sprite y position
                }],
                axes: [
                    {
                        type: 'numeric',
                        position: 'left',
                        // fields: ['группа 1', 'группа 2', 'группа 3', 'группа 4', 'группа 5'],
                        label: {
                            renderer: Ext.util.Format.numberRenderer('0,0')
                        },
                        title: 'Количество сотрудников',
                        grid: true,
                        minimum: 0
                    },
                    {
                        type: 'category',
                        position: 'bottom',
                        fields: ['name'],
                        title: 'Виды деятельности',
                        style: {
                            width: '50'
                        }
                    }
                ],
                series: [
                    {
                        type: 'bar',
                        axis: 'left',
                        highlight: true,
                        tips: {
                            trackMouse: true,
                            width: 140,
                            height: 28,
                            renderer: function (storeItem, item) {
                                //this.setTitle('Группа №' + String(item.yField).replace('группа ', ''));
                                this.setTitle(item.field);
                            }
                        },
                        label: {
                            display: 'insideEnd',
                            'text-anchor': 'middle',
                            field: ['группа_1', 'группа_2', 'группа_3', 'группа_4', 'группа_5'],
                            renderer: Ext.util.Format.numberRenderer('0'),
                            orientation: 'vertical',
                            color: '#333'
                        },
                        stacked: true,
                        xField: 'name',
                        yField: ['группа_1', 'группа_2', 'группа_3', 'группа_4', 'группа_5']
                    }
                ]
            }
        ]

        /*this.axes = [
            {
                type: 'Numeric',
                position: 'left',
                fields: ['g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'g7', 'g8', 'g9', 'g10'],
                label: {
                    renderer: Ext.util.Format.numberRenderer('0,0')
                },
                title: 'Количество сотрудников',
                grid: true,
                minimum: 0
            },
            {
                type: 'Category',
                position: 'bottom',
                fields: ['name'],
                title: 'Виды деятельности',
                style: {
                    width: '50'
                }
            }
        ]
        this.series = [
            {
                type: 'column',
                axis: 'left',
                highlight: true,
                tips: {
                    trackMouse: true,
                    width: 140,
                    height: 28,
                    renderer: function (storeItem, item) {
                        this.setTitle('Группа №' + String(item.yField).replace('g', ''));
                    }
                },
                label: {
                    display: 'insideEnd',
                    'text-anchor': 'middle',
                    field: ['g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'g7', 'g8', 'g9', 'g10'],
                    renderer: Ext.util.Format.numberRenderer('0'),
                    orientation: 'vertical',
                    color: '#333'
                },
                stacked: true,
                xField: 'name',
                yField: ['g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'g7', 'g8', 'g9', 'g10']*//*,
             style:{
             width:'50'
             }*//*
            }
        ]
*/

        this.callParent(arguments);
        console.log('ChartActivityV end');
    }
});