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
/*
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

    return {
        test : function(){
            var type = document.querySelector('.add__type').value;
            var des = document.querySelector('.add__description').value;
            var val = document.querySelector('add__value').value;
        }
    }

}) ();

var controller = ( function(budgetCtrl,UICtrl) {
    
    document.querySelector('.add__btn').addEventListener('click', () => {
        console.log("Button is clicked");
    })
     
    
    
    /*var x = budgetCtrl.publicTest(5);

    return {
        finalRes : function (){
            console.log(x);
        }
    }
}) (budgetController,UIController);
*/

// create 3 modules 
/*
var budgetController = (function(){
    var Income = function(id,description,value){
        this.id = id;
        this.description = description;
        this.value = value;
    }
    
    var Expense = function(id,description,value){
        this.id = id;
        this.description = description;
        this.value = value;
    }
    var data = {
        exp : [],
        inc : [],
    }

    return {
        getItems : function(type,des,val){
            var newItem, ID;
            /*if(data[type].length > 0){
                ID = data[type][data[type].length].id + 1;
            } else {
                ID = 0;
            }*/
            /*
            ID = 0;
            if(type === 'exp'){
                newItem = new Expense(ID,des,val);
            } else if(type === 'inc'){
                newItem = new Income(ID,des,val);
            }
            data[type].push(newItem);
            return newItem;
        },
        forTest : function(){
            console.log(data);
        }
    }
})();

var UIController = (function(){

    var DOMstrings = {
        addtype : '.add__type',
        des : '.add__description',
        val : '.add__value',
        addButton : '.add__btn',
        allIncome : '.income__list',
        allExpenses : '.expenses__list',
    }
    return{
        getInput : function(){
            return{
                type : document.querySelector(DOMstrings.addtype).value,
                des : document.querySelector(DOMstrings.des).value,
                val : document.querySelector(DOMstrings.val).value,
            };
        },

        getDOMstrings : function(){
            return DOMstrings;
        },
        newItem : function(type,obj){
            var htmlFile, newHtml, elementType;
            if(type === 'inc'){
                elementType = DOMstrings.allIncome;
                htmlFile = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if(type === 'exp'){
                elementType = DOMstrings.allExpenses;
                htmlFile = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            newHtml = htmlFile.replace('%id%',obj.id);
            newHtml = newHtml.replace('%description%',obj.description);
            newHtml = newHtml.replace('%value%',obj.value);

            document.querySelector(elementType).insertAdjacentHTML('beforeend',newHtml);
        },
    };
})();

var controller = (function(budgetCtrl,UICtrl){

    var allEventListeners = function(){

        var allDOMstrings = UICtrl.getDOMstrings();
        document.querySelector(allDOMstrings.addButton).addEventListener('click',addNewItem)

        document.addEventListener('keypress',(event) =>{
            if(event.keyCode === 13 || event.which === 13){
                addNewItem();
            }
        })
    }
    var addNewItem = function(){
        var input  = UICtrl.getInput();
        console.log(input);

        var getItem = budgetCtrl.getItems(input.type,input.des,input.val);

        UICtrl.newItem(input.type,getItem);
        
        //console.log("Button");
    }
    

    return {
        init: function(){
            console.log('Application has started');
            allEventListeners();
        }
    }
})(budgetController,UIController);

controller.init();
*/

// forEach loop
/*
let numbers = [2,3,7,4,1,5,8,3,8,2];
numbers.forEach((hello,index,array) => {
    console.log(array);    
})
*/



























/*
// calculationg the budget update

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
        percentage : 0,
    }

    function addBudget(type) {
        var sum = 0;
        var totalBudget = data.allItems[type];
        totalBudget.forEach((val) =>{
            sum += val.value;
        })
        data.totals[type] = sum;
    } 
    return {

        // get the totals from data
        
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

        calculateBudget : function(){

            //getting the budget
            addBudget('inc');
            addBudget('exp');

            data.budget = data.totals.inc - data.totals.exp;

            data.percentage = (data.totals.exp / data.totals.inc)*100
        },

        getBudget : function() {
            return {
                budget : data.budget,
                allIncome : data.totals.inc,
                allExpenses : data.totals.exp,
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
    allExpenseList : '.expenses__list'
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
                htmlFile = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if(type === 'inc'){
                element_type = DOMstrings.allIncomeList;
                htmlFile = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            newHtmlFile = htmlFile.replace('%id%',obj.id);
            newHtmlFile = newHtmlFile.replace('%description%',obj.description);
            newHtmlFile = newHtmlFile.replace('%value%',obj.value);

            // to insert HTML file to the UI
            document.querySelector(element_type).insertAdjacentHTML('beforeend',newHtmlFile);
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
            document.querySelector(DOMstrings.descriptionType).focus();
        },
    };
}) ();

// main CONTROLLER to control both UIcontroller and BudgetController
var controller = ( function(budgetCtrl,UICtrl) {
    
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

            finalBudget();
        }
    }

    // printing the budget 
    var finalBudget = function(){
        budgetCtrl.calculateBudget();
        var budgetValue = budgetCtrl.getBudget();
        console.log(budgetValue);
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

    // creating the init function to calsl event listeners and ......
    return {
        init : function(){
            console.log("Application has started");
            settingEventListeners();
        }
    }
}) (budgetController,UIController);

// Calling the init function
controller.init();
*/

/*function Movies(whichOne){
    this.whichOne = whichOne;
}

var movies = [new Movies('Pirates of the Carribean'),new Movies('apostle'),new Movies('the usual suspects'),new Movies('javascript')];
var random = Math.floor(Math.random()*4);

console.log(movies[random].whichOne);
*/







// Practice 2      ID ERROR
/*
var budgetController = (function(){

    function Income(id,description,value){
        this.id = id;
        this.description = description;
        this.value = value;
    }

    function Expense(id,description,value){
        this.id = id;
        this.description = description;
        this.value = value;
    }

    var data = {
        allItems : {
            exp : [],
            inc : [],
        },
        totals : {
            exp : 0,
            inc : 0,
        },
        totalBudget : 0,
        percentage : -1,
    }
    return{
        addItems : function(type,des,val){
            var newItem, ID;
            if(data.allItems[type].length > 0){
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }
            if(type === 'inc'){
                newItem = new Income(ID,des,val);
            } else if(type === 'exp'){
                newItem = new Expense(ID,des,val);
            }
            data.allItems[type].push(newItem);
            return newItem;
        },

        forTesting : function(){
            console.log(data);
        },
    }

    

})();

var UIController = (function(){
    var DOMstrings = {
        addButton : '.add__btn',
        dataType : '.add__type',
        description  : '.add__description',
        value : '.add__value',
        incomeList : '.income__list',
        expenseList : '.expenses__list'
    }

    return {
        getInput : function(){
            return {
                type : document.querySelector(DOMstrings.dataType).value,
                description : document.querySelector(DOMstrings.description).value,
                value : parseFloat(document.querySelector(DOMstrings.value).value),
            };
        },
        addItemsUI : function(type,obj){
            var html, newHtml, elementType;
            if(type === 'inc') {
                elementType = DOMstrings.incomeList;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if(type === 'exp') {
                elementType = DOMstrings.expenseList;
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
    
            newHtml = html.replace('%id%',obj.id);
            newHtml = newHtml.replace('%description%',obj.description);
            newHtml = newHtml.replace('%value%',obj.value);

            document.querySelector(elementType).insertAdjacentHTML('beforeend',newHtml);
        },

        allDOMstrings : function(){
            return DOMstrings;
        }
    };
})();

var controller = (function(budgetCtrl,UICtrl){

    function allEventListeners(){
        var getDOMstrings = UICtrl.allDOMstrings();

        document.querySelector(getDOMstrings.addButton).addEventListener('click',addNewItem)
    
        document.addEventListener('keypress',(event)=>{
            if(event.keyCode === 13 || event.which === 13){
                addNewItem();
            }
        })
    }
    
    var addNewItem = function(){
        var input, newOnes;
        input = UICtrl.getInput();

        if(input.description !== "" && !isNaN(input.value) && input.value > 0)
        newOnes = budgetCtrl.addItems(input.type, input.description, input.value);

        UICtrl.addItemsUI(input.type, newOnes);
        console.log(newOnes);
        //console.log('Clicked');


    }

    return {
        init : function(){
            console.log('Application is started');
            allEventListeners();
        },

    }
    
})(budgetController,UIController);

controller.init();
*/




// default description



/*
var arr = [1,2,3,4,5,6]
console.log(typeof arr);*/

/*
numberFormats = function(num){
    //35415.2564 --> 35,415.26

    var numParts, numFrontPart, numDecPart, type;
    type = 'inc';

    num = Math.abs(num);
    num = num.toFixed(2);
    numParts = num.split('.');
    numFrontPart = numParts[0];
    if(numFrontPart.length > 3){
        numFrontPart = numFrontPart.substr(0,numFrontPart.length-3) + ',' + numFrontPart.substr(numFrontPart.length-3,3);
    }
    numDecPart = numParts[1];

    console.log((type === 'exp'? '-' : '+') + " " + numFrontPart + '.' + numDecPart); 

}

numberFormats(12345.6789);
*/


var i = 50;
for(var  i = 0;i<5;i++){
    console.log(i);
}
console.log(i);