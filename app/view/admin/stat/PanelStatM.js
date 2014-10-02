Ext.define('App.view.admin.stat.PanelStatM', {
    extend: 'Ext.app.ViewModel',
    requires: [

    ],
    alias: 'viewmodel.panelstat',
    stores: {
        stat: {
            fields: ['id', 'name'],
            data: [
                ["1", "Количество экзаменуемых по видам деятельности"],
                ["2", "Успеваемость по видам деятельности"],
                ["3", "Успеваемость по областям знаний"]
            ]
        },
        chartactivityprogress:{
            fields:[
                {name:'name'},
                {name:'data',type:'int'},
                {name:'result'}
            ],
            proxy:{
                type:'rest',
                url:'resources/php/admin/getChartActivityProgress.php',
                reader:{
                    type:'json'
                }
            }
        },
        chartactivity:{
            fields:[
                {name:'name'},
                {name:'g1',type:'int'},
                {name:'g2',type:'int'},
                {name:'g3',type:'int'},
                {name:'g4',type:'int'},
                {name:'g5',type:'int'},
                {name:'g6',type:'int'},
                {name:'g7',type:'int'},
                {name:'g8',type:'int'},
                {name:'g9',type:'int'},
                {name:'g10',type:'int'}
            ],
            proxy:{
                type:'rest',
                url:'resources/php/admin/getChartActivity.php',
                reader:{
                    type:'json'
                }
            }
        },
        chartknowprogress: {
            fields:[
                {name:'name'},
                {name:'data',type:'int'}
            ],
            proxy:{
                type:'rest',
                url:'resources/php/admin/getChartKnowProgress.php',
                reader:{
                    type:'json'
                }
            }
        }
    }
});
