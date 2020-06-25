var budgetController = (function() {

    var Income = function(ID, description, value){
        this.ID = ID;
        this.description = description;
        this.value = value;
    }

    var Expense = function(ID, description, value){
        this.ID = ID;
        this.description = description;
        this.value = value;
    }

    var data = {
        allItems : {
            inc : [],
            exp : [],
        },

        totals : {
            inc : 0,
            exp : 0,
        },
        budget : 0,
        percentage : -1,
    }

    var calBudget = function(type){
        var sum = 0;
        data.allItems[type].forEach(function(element) {
            sum += element.value;
        });

        data.totals[type] = sum;
    }

    return {
        
        addItem : function(type, des, val){
            var newItem, ID;

            if(data.allItems[type].length > 0){
                ID = data.allItems[type][data.allItems[type].length - 1].ID + 1;
            } else {
                ID = 0;
            }

            if(type === 'inc'){
                newItem = new Income(ID, des, val)
            }
            if(type === 'exp'){
                newItem = new Expense(ID, des, val)
            }
            
            data.allItems[type].push(newItem);
            
            return newItem;
        },

        deleteItem : function(type, id){
            var itemIDs, IDIndex;
            itemIDs = data.allItems[type].map(function(current){
                return current.ID;
            })

            IDIndex = itemIDs.indexOf(id);

            if(IDIndex !== -1){
                data.allItems[type].splice(IDIndex, 1);
            }
        },

        allBudgetCalc : function(){
            calBudget('inc');
            calBudget('exp');

            data.budget = data.totals.inc - data.totals.exp;
            if(data.totals.inc !== 0){
                data.percentage = parseFloat((data.totals.exp/data.totals.inc)*100).toFixed(1);
            } else {
                data.percentage = -1;
            }
        },

        getBudget : function() {
            return {
                budget : data.budget,
                percentage : data.percentage,
                totalIncome : data.totals.inc,
                totalExpense : data.totals.exp,
            }
        },

        showItems : function(){
            console.log(data);
        }
    }

})();

var UIController = (function() {

    var DOMStrings = {
        type_pannel : '.add__type',
        des_pannel : '.add__description',
        val_pannel : '.add__value',
        add_button : '.add__btn',
        income_list_pannel : '.income__list',
        expense_list_pannel : '.expenses__list',
        income_UI_pannel : '.budget__income--value',
        expense_UI_pannel : '.budget__expenses--value',
        budget_pannel : '.budget__value',
        total_percentage_pannel : '.budget__expenses--percentage',
        container : '.container',
    }

    return {
        getInfo : function() {
            return {
                type : document.querySelector(DOMStrings.type_pannel).value,
                des : document.querySelector(DOMStrings.des_pannel).value,
                val : parseInt(document.querySelector(DOMStrings.val_pannel).value),
            }
        },

        addNewItems : function(type,obj){
            var HtmlFile, newHtmlFile, elementType;
            
            if(type === 'inc'){
                elementType = DOMStrings.income_list_pannel;
                HtmlFile = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%des%</div><div class="right clearfix"><div class="item__value">%val%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            
            if(type === 'exp'){
                elementType = DOMStrings.expense_list_pannel;
                HtmlFile = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%des%</div><div class="right clearfix"><div class="item__value">%val%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            newHtmlFile = HtmlFile.replace('%id%', obj.ID);
            newHtmlFile = newHtmlFile.replace('%des%', obj.description);
            newHtmlFile = newHtmlFile.replace('%val%', obj.value);

            document.querySelector(elementType).insertAdjacentHTML('beforeend', newHtmlFile);
        },

        clearInputs : function(){
            var selectItems, clearItems;
            selectItems = document.querySelectorAll(DOMStrings.des_pannel + ',' + DOMStrings.val_pannel);
            clearItems = Array.from(selectItems);

            clearItems.forEach(function(current) {
                current.value = "";
            });

            document.querySelector(DOMStrings.type_pannel).focus();

        },

        deleteSelecetedItem : function(id){
            var element = document.getElementById(id);
            element.parentNode.removeChild(element);
        },

        updateBudget : function(data){
            document.querySelector(DOMStrings.income_UI_pannel).textContent = data.totalIncome;
            document.querySelector(DOMStrings.expense_UI_pannel).textContent = data.totalExpense;
            document.querySelector(DOMStrings.budget_pannel).textContent = data.budget;
            if(data.percentage > 0){
                document.querySelector(DOMStrings.total_percentage_pannel).textContent = data.percentage + '%';
            } else {
                document.querySelector(DOMStrings.total_percentage_pannel).textContent = '---';
            }
        },

        DOMStringList : function(){
            return DOMStrings;
        }
    }
})();

var controller = (function(budgetCtrl, UICtrl) {

    var getUIInfo = function() {
        var inputInfo = UICtrl.getInfo();
        //console.log(inputInfo);

        if(inputInfo.des !== "" && !isNaN(inputInfo.val) && inputInfo.val > 0){
            var newItems = budgetCtrl.addItem(inputInfo.type, inputInfo.des, inputInfo.val);
            //console.log(newItems);

            var addUIItems = UICtrl.addNewItems(inputInfo.type, newItems);
            UICtrl.clearInputs();
        }
        gettingBudget();
    }

    var gettingBudget = function() {
        var budgetData;
        budgetCtrl.allBudgetCalc()
        budgetData = budgetCtrl.getBudget();
        UICtrl.updateBudget(budgetData);
    }

    var deleteItems = function(event){
        var itemID, itemInfo, itemType, item_id;
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        if(itemID){
            itemInfo = itemID.split("-");
            itemType = itemInfo[0];
            item_id = parseInt(itemInfo[1]);

            budgetCtrl.deleteItem(itemType, item_id);

            UICtrl.deleteSelecetedItem(itemID);

            gettingBudget();
        }
    }

    var settingEventListeners = function(){
        var allDOMstr = UICtrl.DOMStringList();

        document.querySelector(allDOMstr.add_button).addEventListener('click', getUIInfo);
            //console.log('clicked');
        //})

        document.addEventListener('keypress', function(event) {
            if(event.keyCode === 13 || event.which === 13){
                //console.log('clicked');
                getUIInfo();
            }
        })

        document.querySelector(allDOMstr.container).addEventListener('click', deleteItems);
    }

    return {
        init : function(){
            console.log("Application has started");
            settingEventListeners();
            UICtrl.updateBudget({
                budget : 0,
                percentage : "---",
                totalIncome : 0,
                totalExpense : 0,
            })
        }
    }

})(budgetController, UIController);

controller.init();