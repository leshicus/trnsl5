Ext.define('App.view.admin.clas.MenuExamC', {
    extend: 'Ext.app.ViewController',
    requires: [

    ],
    alias: 'controller.menuexam',

    control: {
        '#menuPrintConsolidated': {
            click: function (button) {
                console.log('click menuPrintConsolidated');

                var grid = Ext.ComponentQuery.query('gridExam')[0],
                    selection = grid.getSelected(),
                    examArr = Array(),
                    dateFindFrom = grid.down('#dateFindFrom'),
                    dateFindTo = grid.down('#dateFindTo');
                // * печатает только одну ведомость
                /*Ext.Ajax.request({
                 url: 'resources/php/admin/excelOneConsolidated.php'
                 });*/

                Ext.each(selection, function (item) {
                    var examid = item.get('examid');
                    examArr.push(examid);
                });
                window.open('resources/php/admin/excelOneConsolidated.php?examarr=' + examArr
                    + '&dateFindFrom=' + Ext.Date.format(dateFindFrom.getValue(), 'd.m.Y')
                    + '&dateFindTo=' + Ext.Date.format(dateFindTo.getValue(), 'd.m.Y')
                );

                //console.log(Ext.Date.format(dateFindFrom.getValue(),'d.m.Y'));
                /*Ext.Ajax.request({
                 url: 'resources/php/admin/excelOneConsolidated.php?examarr=' + examArr
                 + '&dateFindFrom=' + Ext.Date.format(dateFindFrom.getValue(),'d.m.Y')
                 + '&dateFindTo=' + Ext.Date.format(dateFindTo.getValue(),'d.m.Y')
                 });*/
            }
        }
    }
});
