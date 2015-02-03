Ext.define('App.view.user.self.PanelSelfC', {
    extend: 'Ext.app.ViewController',
    requires: [
        'Ext.form.field.Radio'
    ],
    alias: 'controller.panelSelf',

    listen: {
        store: {
            '#card': {
                load: function (store, rec) {

                }
            }
        }
    },
    control: {
        '#': {},
        '#comboKnow': {
            specialkey: function (combo, e) {
                if (e.getKey() == e.DELETE && combo.readOnly == false) {
                    combo.reset();
                }
            }
        },
        'button[action=starttest]': {
            click: function (button) {
                console.log('action=starttest');

                var panelSelf = this.getView(),
                    comboKnow = panelSelf.down('#comboKnow'),
                    textAnswer = panelSelf.down('#textAnswer'),
                    textNormdoc = panelSelf.down('#textNormdoc'),
                    know = comboKnow.getValue();
                panelSelf.questionNumber = 0;
                panelSelf.questionMaxInCardSelf = 0;
                // * генерация билета
                var storeCard = panelSelf.getViewModel().getStore('card');
                storeCard.clearFilter();
                storeCard.load({params: {know: know}});
                textAnswer.reset();
                textAnswer.myCustomText = ' ';
                textNormdoc.reset();
            }
        },
        'button[action=nextquestion]': {
            click: function (button) {
                console.log('action=nextquestion');

                var panelSelf = button.up('panelSelf'),
                    panelCard = panelSelf.down('#panelCard'),
                    panelProgress = panelSelf.down('#panelProgress'),
                    rownum = panelSelf.questionNumber,
                    textAnswer = panelSelf.down('#textAnswer'), // * прогресс - Ответ
                    answerAccordion = panelSelf.down('#answerAccordion'),
                    arrayAnswers = answerAccordion.query('radiofield'),
                    storeCard = panelSelf.getViewModel().getStore('card'),
                    questionId = storeCard.findRecord('rownum', rownum, 0, false, true, true).get('questionid'),
                    questionText = storeCard.findRecord('rownum', rownum, 0, false, true, true).get('questiontext'),
                    buttonNextQuestion = panelSelf.down('#nextQuestion'),
                    checkedAnswerId,
                    answerText = 'нет ответа',
                    correct = 0,
                    textNormdoc = panelSelf.down('#textNormdoc');

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
                } else {
                    textAnswer.setValue(App.util.Utilities.uncorrectString);
                    textAnswer.setFieldStyle(App.util.Utilities.colorStatusTextUnreg);
                }
                // * Норм док
                var normdoc = storeCard.findRecord('correct', 1).get('normdoc');
                textNormdoc.setValue(normdoc);
                // * отсроченный показ следующего билета
                this.showNextQuestion(buttonNextQuestion);
            }
        },
        // * всплывающие подсказки (вопросы и ответы) при наведении на Вопрос № в Прогрессе
        '#panelProgress field[myCustomText]': {
            boxready: function (field) {
                field.el.on({
                    mouseover: function (e) {
                        Ext.tip.QuickTipManager.register({
                            target: field.getId(), // Target button's ID
                            anchor: 'top',
                            dismissDelay: 3000,
                            anchorOffset: 85,
                            text: field.myCustomText // Tip content
                        });
                    },
                    mouseout: function () {

                    }
                });
            }
        }

    },


    // * показ 1-го вопроса после загрузки стора билетов
    onStoreCardLoad: function (storeCard) {
        console.log('onStoreCardLoad');

        var maxRownum = this.getStoreMaxValue(storeCard, 'rownum'), // число вопросов в билете
            panelSelf = this.getView();
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
        var panelSelf = this.getView(),
            storeCard = panelSelf.getViewModel().getStore('card'),
            panelCard = panelSelf.down('#panelCard'),// * билет
            questionAccordion = panelCard.down('#questionAccordion'),
            answerAccordion = panelCard.down('#answerAccordion'),
            question = panelCard.down('#question'), // * поле внутри аккордиона Вопрос
            textQuestion = panelSelf.down('#textQuestion'), // * Прогресс - Вопрос
            buttonNextQuestion = panelSelf.down('#nextQuestion');
        storeCard.clearFilter();
        if (storeCard.count() > 0) {
            var questionText = storeCard.findRecord('rownum', num, 0, false, true, true).get('questiontext'); // текст вопроса
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
        } else {
            Ext.Msg.alert('Внимание', 'Вопросы не найдены');
        }


    },
    showNextQuestion: function (buttonNextQuestion) {
        var panelSelf = this.getView();
        if (panelSelf.questionNumber < panelSelf.questionMaxInCardSelf) {
            buttonNextQuestion.setDisabled(false);
            this.showCard(panelSelf.questionNumber + 1);
        } else {
            buttonNextQuestion.setDisabled(true);
        }
    },
    /*  onChangeComboKnow: function (combo, n, o) {
     var panelProgress = combo.up('#panelProgress'),
     buttonStartTest = panelProgress.down('#startTest');
     if (n)
     buttonStartTest.enable();
     else
     buttonStartTest.disable();
     }*/


});