Ext.define('App.controller.user.PanelSelfC-', {
    extend: 'Ext.app.Controller',
    views: [
        'user.PanelSelfV'
    ],
    models: [
        'user.KnowM'
    ],
    stores: [
        'user.KnowS',
        'user.CardSelfS'
    ],
    refs: [
        {
            ref: 'comboKnow',
            selector: 'panelSelf #comboKnow'
        },
        {
            ref: 'panelSelf',
            selector: 'panelSelf'
        }
    ],
    onLaunch: function () {
        var me = this;
        var storeCard = Ext.data.StoreManager.lookup('user.CardSelfS');
        // * старт показа вопросов после генерации билета
        storeCard.on('load', me.onStoreCardLoad, me);
    },
    init: function () {
        console.log('PanelSelfC init');

        this.control({
            'panelSelf #comboKnow': {
                specialkey: function (combo, e) {
                    if (e.getKey() == e.DELETE && combo.readOnly == false) {
                        combo.reset();
                    }
                }
            },
            'panelSelf button[action=starttest]': {
                click: function (button) {
                    console.log('action=starttest');

                    var panelSelf = button.up('panelSelf'),
                        comboKnow = panelSelf.down('#comboKnow'),
                        textAnswer = panelSelf.down('#textAnswer'),
                        textNormdoc = panelSelf.down('#textNormdoc'),
                        know = comboKnow.getValue();
                    panelSelf.questionNumber = 0;
                    panelSelf.questionMaxInCardSelf = 0;
                    // * генерация билета
                    var storeCard = Ext.data.StoreManager.lookup('user.CardSelfS');
                    storeCard.clearFilter();
                    storeCard.load({params: {know: know}});
                    textAnswer.reset();
                    textAnswer.myCustomText = ' ';
                    textNormdoc.reset();
                }
            },
            'panelSelf button[action=nextquestion]': {
                click: function (button) {
                    console.log('action=nextquestion');

                    var panelSelf = button.up('panelSelf'),
                        panelCard = panelSelf.down('#panelCard'),
                        panelProgress = panelSelf.down('#panelProgress'),
                        rownum = panelSelf.questionNumber,
                        textAnswer = panelSelf.down('#textAnswer'), // * прогресс - Ответ
                        answerAccordion = panelSelf.down('#answerAccordion'),
                        arrayAnswers = answerAccordion.query('radiofield'),
                        storeCard = Ext.data.StoreManager.lookup('user.CardSelfS'),
                        questionId = storeCard.findRecord('rownum', rownum, 0,false,true,true).get('questionid'),
                        questionText = storeCard.findRecord('rownum', rownum, 0,false,true,true).get('questiontext'),
                        buttonNextQuestion = panelSelf.down('#nextQuestion'),
                        checkedAnswerId,
                        answerText = 'нет ответа',
                        correct = 0,
                        textNormdoc = panelSelf.down('#textNormdoc') // * Прогресс - Норм док
                        /*taskDelayShowNewQuestion = Ext.create('Ext.util.DelayedTask', function () {
                            this.showNextQuestion(buttonNextQuestion);
                        }, this)*/;

                    // * проверим правильность ответа
                    function getCheckedAnswer(element, index, array) {
                        if (element.checked)
                            checkedAnswerId = element.inputValue;
                    }

                    arrayAnswers.forEach(getCheckedAnswer);
                    if (checkedAnswerId) {
                        function findRecordAnswer(rec, id) {
                            if (rec.get('rownum') == rownum &&
                                rec.get('answerid') == checkedAnswerId) {
                                return true;
                            }
                        }
                        var checkedAnswerIndex = storeCard.findBy(findRecordAnswer);
                        if (checkedAnswerIndex != -1) {
                            var checkedAnswerRec = storeCard.getAt(checkedAnswerIndex);
                            correct = checkedAnswerRec.get('correct');
                        }
                        answerText = checkedAnswerRec.get('answertext');
                    }
                    textAnswer.myCustomText = '<ins>Вопрос:</ins> ' + questionText;
                    textAnswer.myCustomText = textAnswer.myCustomText + '<br><ins>Ответ:</ins> ' + answerText;
                    // * прогресс - ответ
                    if (correct == 1) {
                        textAnswer.setValue(App.util.Utilities.correctString);
                        textAnswer.setFieldStyle(App.util.Utilities.colorStatusTextReg);
                        textNormdoc.reset();
                    } else {
                        // * Норм док
                        var normdoc = storeCard.findRecord('correct',1).get('normdoc');
                        textNormdoc.setValue(normdoc);
                        textAnswer.setValue(App.util.Utilities.uncorrectString);
                        textAnswer.setFieldStyle(App.util.Utilities.colorStatusTextUnreg);
                    }
                    // * отсроченный показ следующего билета
                    //taskDelayShowNewQuestion.delay(1000);
                    this.showNextQuestion(buttonNextQuestion);
                }
            },
            // * всплывающие подсказки (вопросы и ответы) при наведении на Вопрос № в Прогрессе
            'panelSelf #panelProgress field[myCustomText]': {
                boxready: function (field) {
                    field.el.on({
                        mouseover: function (e) {
                            var tip = field.up('panelSelf').myTooltip;
                            tip.update(field.myCustomText);
                            tip.showAt(e.getXY());
                        },
                        mouseout: function () { field.up('panelSelf').myTooltip.hide(); }
                    });
                }
            }
        });
        console.log('PanelSelfC end');
    },


    // * показ 1-го вопроса после загрузки стора билетов
    onStoreCardLoad: function (storeCard) {
        console.log('onStoreCardLoad');

        var maxRownum = this.getStoreMaxValue(storeCard, 'rownum'), // число вопросов в билете
            panelSelf = this.getPanelSelf();
        panelSelf.questionMaxInCardSelf = maxRownum;
        this.showCard(1);
    },
    // * нахождение максимального значения поля в сторе
    getStoreMaxValue: function (store, field) {
        var max = 0;
        if (store.getCount() > 0) {
            max = store.getAt(0).get(field); // initialise to the first record's id value.
            store.each(function (rec) // go through all the records
            {
                max = Math.max(max, rec.get(field));
            });
        }
        return max;
    },
    // * смена вопросов и ответов
    showCard: function (num) {
        var storeCard = Ext.data.StoreManager.lookup('user.CardSelfS');
        storeCard.clearFilter();
        var panelSelf = this.getPanelSelf(),
            panelCard = panelSelf.down('#panelCard'),// * билет
            questionAccordion = panelCard.down('#questionAccordion'),
            answerAccordion = panelCard.down('#answerAccordion'),
            question = panelCard.down('#question'), // * поле внутри аккордиона Вопрос
            textQuestion = panelSelf.down('#textQuestion'), // * Прогресс - Вопрос
            buttonNextQuestion = panelSelf.down('#nextQuestion');
        if(storeCard.count() > 0){
            var questionText = storeCard.findRecord('rownum', num, 0,false,true,true).get('questiontext'); // текст вопроса
            //console.log(num,questionText,storeCard,storeCard.findRecord('rownum', num, 0,false,false,true));
            // * вопросы
            question.setValue(questionText);
            questionAccordion.setTitle('Вопрос №' + num);
            textQuestion.setValue(num + ' / ' + panelSelf.questionMaxInCardSelf);
            panelSelf.questionNumber = num;
            // * ответы
            answerAccordion.removeAll(true);
            storeCard.filterBy(function (rec) {
                if (rec.get('rownum') == num)
                    return true;
            });
            storeCard.each(function (r) {
                var answerId = r.get('answerid'),
                    answerText = r.get('answertext');
                answerAccordion.add(
                    {
                        boxLabel: answerText,
                        inputValue: answerId
                    }
                );
            });
            buttonNextQuestion.setDisabled(false);
        }else{
            Ext.Msg.alert('Внимание','Вопросы не найдены');
        }


    },
    showNextQuestion: function (buttonNextQuestion) {
        var panelSelf = this.getPanelSelf();
        if (panelSelf.questionNumber < panelSelf.questionMaxInCardSelf) {
            buttonNextQuestion.setDisabled(false);
            this.showCard(panelSelf.questionNumber + 1);
        } else {
            buttonNextQuestion.setDisabled(true);
        }
    }



});