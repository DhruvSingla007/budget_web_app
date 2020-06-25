// Budget controller (all items are accessed here)
var budgetController = ( function() {

    // two different function constructors 

    // Income function constructor
    var Income = function(id,description,value){
        this.id = id;
        this.description = description;
        this.value = value;
    }
    // Expense function constructor
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
        },
        budget : 0,
        percentage : -1,
    }

    // calculate the budget
    var calculateBudget = function(type){
        var sum = 0;
        data.allItems[type].forEach(function(val) {
            sum += val.value;
        })

        // push the budget in totals
        data.totals[type] = sum;
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

        deleteItem : function(type,ID){
            var itemsID, index;
            itemsID = data.allItems[type].map(function(el){
                return el.id;
            })

            index = itemsID.indexOf(ID);
            if (index !== -1){
                data.allItems[type].splice(index,1)
            }
        },
        
        // calculate the percentage exp inc and all
        allBudgetCal : function(){
            calculateBudget('inc');
            calculateBudget('exp');
        
            data.budget  = data.totals.inc - data.totals.exp;
            if (data.totals.inc !==0){
                data.percentage = parseFloat(((data.totals.exp / data.totals.inc)*100).toFixed(1));
            } else {
                data.percentage = -1;
            }
        },

        // return the budget

        getBudget : function(){
            return {
                budget : data.budget,
                totalIncome : data.totals.inc,
                totalExpense : data.totals.exp,
                percentage : data.percentage,
            }
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
    allExpenseList : '.expenses__list',
    budgetPannel : '.budget__value',
    incomePannel : '.budget__income--value',
    expensePannel : '.budget__expenses--value',
    percentagePannel : '.budget__expenses--percentage',
    containerAllItems : '.container',
    }

    return {
        
        // this is to have access of DOMstrings outside the UIcontroller 
        getDOMstrings : function(){
            return DOMstrings;
        },

        // Getting values from the user
        getInput : function(){
            return {
                type : document.querySelector(DOMstrings.inputType).value,
                des : document.querySelector(DOMstrings.descriptionType).value,
                val : parseFloat(document.querySelector(DOMstrings.valueType).value),
            };
        },

        // adding items to the UI according to their types
        addItemList : function(type,obj){
            var htmlFile, newHtmlFile, element_type;

            if (type === 'exp'){
                element_type = DOMstrings.allExpenseList;
                htmlFile = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if(type === 'inc'){
                element_type = DOMstrings.allIncomeList;
                htmlFile = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            newHtmlFile = htmlFile.replace('%id%',obj.id);
            newHtmlFile = newHtmlFile.replace('%description%',obj.description);
            newHtmlFile = newHtmlFile.replace('%value%',obj.value);

            // to insert HTML file to the UI
            document.querySelector(element_type).insertAdjacentHTML('beforeend',newHtmlFile);
        },

        deleteItem : function(id){
            el = document.getElementById(id);
            el.parentNode.removeChild(el);
        },

        // upadating the budget in the UI
        updateBudget : function(obj){
            document.querySelector(DOMstrings.expensePannel).textContent = obj.totalExpense;
            document.querySelector(DOMstrings.incomePannel).textContent = obj.totalIncome;
            document.querySelector(DOMstrings.budgetPannel).textContent = obj.budget;
            if(obj.percentage > 0){
                document.querySelector(DOMstrings.percentagePannel).textContent = obj.percentage + '%';
            } else {
                document.querySelector(DOMstrings.percentagePannel).textContent = "---";
            }
        },

        // to clear the inputs after adding them to UI
        clearInputs : function(){
            var selectItems, clearData;

            // here queryselectorALL is used and it will return the list not the array
            // therefore we need to convert the list into array
            selectItems = document.querySelectorAll(DOMstrings.descriptionType + ',' + DOMstrings.valueType);

            // converting the list into array
            // here the slice function is used it will return the copy of array passed into it but it will also except thr array
            // slice method returns a shallow copy of a portion of an array into a new array object selected from begin to end (end not included).
            // The original array will not be modified during the use of slice method
            // it will return a new array having the extracted elements
            // after that we use call method to call the list
            clearData = Array.prototype.slice.call(selectItems);

            // for each loop is used we can also use simple for loop but forEach loop is more common and better
            clearData.forEach(function(itemValue){
                itemValue.value = "";
            });

            // to focus the cursor back to the description box
            document.querySelector(DOMstrings.inputType).focus();
        },
    };
}) ();








// main CONTROLLER to control both UIcontroller and BudgetController
var controller = ( function(budgetCtrl,UICtrl) {

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

        document.querySelector(addDOMstrings.containerAllItems).addEventListener('click', deleteItems);
    }
        // Adding new Items to thhe income and expenses list 
        var addNewItems = function(){
            var input,newOnes;
    
            // Getting user input
            input = UICtrl.getInput();
            
            // to check whether the description box and value box is empty or not
            if(input.des !== "" && !isNaN(input.val) && input.val > 0){
                // getting the data
                newOnes = budgetCtrl.addItems(input.type,input.des,input.val);
    
                // displaying it to the UI
                UICtrl.addItemList(input.type,newOnes);
    
                // clearing the input fields
                UICtrl.clearInputs();
        
                //console.log('BUTTON IS PRESSED')
            }
            gettingBudget();
        }
    
        // get the budget
        function gettingBudget(){
            budgetCtrl.allBudgetCal();
            var allData = budgetCtrl.getBudget();
            UICtrl.updateBudget(allData);
        }

        var deleteItems = function(event){
            var itemID, splitID, type, IDnumber;
            itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

            if (itemID){
                splitID = itemID.split('-');
                type =  splitID[0];
                IDnumber = parseInt(splitID[1]);

                budgetCtrl.deleteItem(type,IDnumber);

                UICtrl.deleteItem(itemID);
                
                gettingBudget();

            }
            
        }

    // creating the init function to calls event listeners and ......
    return {
        init : function(){
            console.log("Application has started");
            UICtrl.updateBudget({
                budget : 0,
                totalIncome : 0,
                totalExpense : 0,
                percentage : -1,
            })
            settingEventListeners();
        }
    }
}) (budgetController,UIController);

// Calling the init function
controller.init();