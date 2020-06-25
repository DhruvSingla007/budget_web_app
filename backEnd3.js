// Budget controller (all items are accessed here)
var budgetController = ( function() {

    // two different function constructors 

    // Income
    var Income = function(id,description,value){
        this.id = id;
        this.description = description;
        this.value = value;
    }
    // Expense
    var Expense = function(id,description,value){
        this.id = id;
        this.description = description;
        this.value = value;
    }

    // all Data ---- divided into two sections (allItems) and (total expenses and income)
    var data  = {
        allItems : {
            exp : [],
            inc : [],
        },
        totals : {
            exp : 0,
            inc : 0,
        }
    }
    return {
        
        // adding new Items and push it into data object

        addItems : function(type,des,val){
            var newItem,ID;
            if(data.allItems[type].length > 0){
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }
            if(type === 'exp'){
                newItem = new Expense(ID,des,val);
            } else if(type === 'inc'){
                newItem = new Income(ID,des,val)
            }

            data.allItems[type].push(newItem);
            return newItem;
        },

        // for testing purpose
        showData : function() {
            console.log(data);
        }
    }
}) (); 

// UIcontroller controls UI system
var UIController = ( function() {

    // All DOMstrings so that we dont have to edit class and ID names in all code if changed
    var DOMstrings = {
    inputType : '.add__type',
    descriptionType : '.add__description',
    valueType : '.add__value',
    addButton : '.add__btn',
    allIncomeList : '.income__list',
    allExpenseList : '.expenses__list'
    }

    return {

        // Getting values from the user
        getInput : function(){
            return {
                type : document.querySelector(DOMstrings.inputType).value,
                des : document.querySelector(DOMstrings.descriptionType).value,
                val : document.querySelector(DOMstrings.valueType).value,
            };
        },
        addItemList : function(type,obj){
            var htmlFile, newHtmlFile, element_type;

            if (type === 'exp'){
                element_type = DOMstrings.allExpenseList;
                htmlFile = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if(type === 'inc'){
                element_type = DOMstrings.allIncomeList;
                htmlFile = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            newHtmlFile = htmlFile.replace('%id%',obj.id);
            newHtmlFile = newHtmlFile.replace('%description%',obj.description);
            newHtmlFile = newHtmlFile.replace('%value%',obj.value);

            document.querySelector(element_type).insertAdjacentHTML('beforeend',newHtmlFile);
        },

        // this is to have access of DOMstrings outside the UIcontroller 
        getDOMstrings : function(){
            return DOMstrings;
        }
    };
}) ();

// main CONTROLLER to control both UIcontroller and BudgetController
var controller = ( function(budgetCtrl,UICtrl) {
    
    // Adding new Items to thhe income and expenses list 
    var addNewItems = function(){
        var input,newOnes;

        // Getting user input
        input = UICtrl.getInput();
        newOnes = budgetCtrl.addItems(input.type,input.des,input.val);

        UICtrl.addItemList(input.type,newOnes);

        //console.log('BUTTON IS PRESSED')
    }


    // setting up all event listeners in one function
    var settingEventListeners = function(){
        
        // accessing DOM strings
        var addDOMstrings = UICtrl.getDOMstrings();

        // update when button is clicked
        document.querySelector(addDOMstrings.addButton).addEventListener('click', addNewItems);
        
        // same happens as above when enter is pressed 
        // Enter or return key has a code = 13
        // Some earlier browsers do nor have .keycode thats why we also have to use .which property
        document.addEventListener('keypress', (event) => {
            if(event.keyCode === 13 || event.which === 13){
                addNewItems();
            }
    })
    }

    // creating the init function to call event listeners and ......
    return {
        init : function(){
            console.log("Application has started");
            settingEventListeners();
        }
    }
}) (budgetController,UIController);

// Calling the init function
controller.init();