/*var person = (function(){
    console.log("Dhruv");
    
    var currentYear = 2019;
    return {
        name : 'dhruv',
        year: 2000,
        calAge: function() {
            console.log(currentYear - this.year);
        }
    }
}) ();
*/

var budgetController = ( function() {
    var a  = 23;
    var add = function(b){
        return a + b;
    }

    return {
        publicTest : function(b){
            return add(b);
        }
    }

}) ();

var UIController = ( function() {

    var DOMstrings = {
        inputType : '.add__type',
        descriptionType : '.add__description',
        valueType : '.add__value',
        addButton : '.add__btn',
    }

    return {
        getInput : function(){
            return {
                type : document.querySelector(DOMstrings.inputType).value,
                des : document.querySelector(DOMstrings.descriptionType).value,
                val : document.querySelector(DOMstrings.valueType).value,
            };
        },

        getDOMstrings : function(){
            return DOMstrings;
        }
    };
}) ();

var controller = ( function(budgetCtrl,UICtrl) {

    var addChanges = function(){
        var input = UICtrl.getInput();
        console.log(input);
        /*var input = document.querySelector('.add__description').value;
        console.log(input);*/
    }

    var addDOMstrings = UICtrl.getDOMstrings();

    document.querySelector(addDOMstrings.addButton).addEventListener('click', addChanges);
        //console.log("Button is clicked");
    
    document.addEventListener('keypress', (event) => {
        if(event.keyCode === 13 || event.which === 13){
            addChanges();
        }
    })
}) (budgetController,UIController);
