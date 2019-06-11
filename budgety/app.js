//coding in modules to seperate concerns and to protect access to some varibles/functions

//budget controller
var budgetController =  (
    function(){

        //create expense and income fucntion constructor

        var Income = function(id, description,value){

            this.id = id;
            this.description = description;
            this.value = value;
        };

        var Expense = function(id, description,value){

            this.id = id;
            this.description = description;
            this.value = value;
            this.percentage = -1;
        };

        Expense.prototype.calcPercentage = function(totalIncome){

       if(totalIncome>0){

        this.percentage = Math.round((this.value/totalIncome)*100);

       }else{
 this.percentage = -1;
       }

           

        }

        Expense.prototype.getPercentage = function(){

return this.percentage;
        };

        var calculateTotal = function(type){

            var sum = 0;

            data.allItems[type].forEach(element=>{

                sum += element.value;

            });

            data.total[type] = sum;

        };

        var data = {

            allItems:{

                inc:[],
                exp:[]

            },
            total: {
                inc:0,
                exp:0
            },
            budget: 0,
            percentage: -1
        };

        return {

            addItem: function(type,des,val){

                var newItem, ID, itemsSize;

                itemsSize = data.allItems[type].length;

                if( itemsSize> 0){

                    ID = data.allItems[type][itemsSize-1].id + 1;
                
                }else{

                    ID = 1;
                }

                if(type === 'exp'){

                    newItem = new Expense(ID,des,val);
                }
                else if(type === 'inc'){

                    newItem = new Income(ID,des,val);
                }

                data.allItems[type].push(newItem);

                return newItem;

            },

            deleteItem: function(type,id){

                var ids, index;
                ids = data.allItems[type].map(function(current){

                    return current.id;

                });

                index = ids.indexOf(id);

                if(index !== -1){

                  data.allItems[type].splice(index,1);

                }

            },

            calculateBudget: function(){

                //calculate totals

                calculateTotal('exp');
                calculateTotal('inc');

                //calculate budget
                data.budget = data.total.inc - data.total.exp;

                //calculate percentage
               if(data.total.inc > 0){
                data.percentage = Math.round((data.total.exp/data.total.inc)*100);
               }
               else{

                data.percentage = -1;
               }

            },
            calculatePercentages: function(){


                data.allItems.exp.forEach(function(curr){

                    curr.calcPercentage(data.total.inc);

                });
 

            },

            getPercentages: function(){

                var allPerc = data.allItems.exp.map(function(curr){

                    return  curr.getPercentage();

                });

                return allPerc;
            },

            getBudget : function(){

                return {

                    budget:data.budget,
                    totalIncome:data.total.inc,
                    totalExpense:data.total.exp,
                    percentage: data.percentage

                }

            },

            testdata: function(){

                console.log(data.allItems['inc']);
                console.log(data.allItems['exp']);
            }
        };



    }
)();



var UIController = (function(){

var DOMStrings = {

    inputType:'.add__type',
    inputDescription:'.add__description',
    inputValue:'.add__value',
    btnAddItem:'.add__btn',
    incomeContainer: '.income__list',
    expenseContainer: '.expenses__list',
    budgetLabel:'.budget__value',
    incomeLabel:'.budget__income--value',
    expenseLabel:'.budget__expenses--value',
    percentageLabel:'.budget__expenses--percentage',
    deleteBtnParentContainer:'.container',
    expensePercentageLabel:'.item__percentage',
    dateLabel:'.budget__title--month'


}

var formatNumber = function(num,type){

    var numSplit, int, dec;

    num = Math.abs(num);
    num = num.toFixed(2);

    numSplit = num.split('.');

    int = numSplit[0];
   
    if(int.length>3){

        int =int.substr(0,int.length - 3)+','+int.substr(int.length - 3,3);
    }

    dec = numSplit[1];

    return (type === 'exp'? '-':'+')+int+'.'+dec;
}


var nodeListForEach = function(list,callback){

    for(var i= 0; i<list.length;i++){

        callback(list[i],i);
    }


  };


return {

    getInput: function(){

        return{
             type: document.querySelector(DOMStrings.inputType).value,//value would be either inc or exp

             description : document.querySelector(DOMStrings.inputDescription).value,
    
             value : parseFloat( document.querySelector(DOMStrings.inputValue).value)
        }
         
       
    },

    changedType: function(){

        var fields = document.querySelectorAll(DOMStrings.inputType+','+DOMStrings.inputDescription+','+DOMStrings.inputValue);

        nodeListForEach(fields,function(cur){

               cur.classList.toggle('red-focus');

        });

        document.querySelector(DOMStrings.btnAddItem).classList.toggle('red');
    },

    

    getDomStrings: function(){

        return DOMStrings;
    },

    addListItem: function(obj,type){

        //html string

        var html, newHtml, element;

        if(type === 'inc'){

            element = DOMStrings.incomeContainer;
            html = ' <div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';

        }else if(type === 'exp'){
            element = DOMStrings.expenseContainer;
            html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
        }

        //replace placeholders in the html
        newHtml =  html.replace('%id%',obj.id);
        newHtml = newHtml.replace('%description%',obj.description);
        newHtml = newHtml.replace('%value%',formatNumber(obj.value,type));

        //insert into dom
        document.querySelector(element).insertAdjacentHTML('beforeend',newHtml);
       

    },

    deletItemFromList: function(selectorId){
       var element =document.getElementById(selectorId);
        element.parentNode.removeChild(element);

    },

    clearFields:function(){

        var fields;

        fields = document.querySelectorAll(DOMStrings.inputDescription+','+DOMStrings.inputValue);

        fieldsArray = Array.prototype.slice.call(fields);

        fieldsArray.forEach(element => {

            element.value = "";
            
        });


        fieldsArray[0].focus;

    },

    displayBudget: function(obj){
        var type;
        obj.budget > 0 ? type ='inc': type='exp';

        document.querySelector(DOMStrings.budgetLabel).textContent = formatNumber(obj.budget,type);
        document.querySelector(DOMStrings.incomeLabel).textContent = formatNumber(obj.totalIncome,'inc');
        document.querySelector(DOMStrings.expenseLabel).textContent = formatNumber(obj.totalExpense,'exp');
        document.querySelector(DOMStrings.percentageLabel).textContent = obj.percentage;

        if(obj.percentage > 0){
            document.querySelector(DOMStrings.percentageLabel).textContent = obj.percentage +'%';

        }else{

            document.querySelector(DOMStrings.percentageLabel).textContent = '-----';
        }


    },

    displayPercentages:function(percentages){

      var fields = document.querySelectorAll(DOMStrings.expensePercentageLabel);


      nodeListForEach(fields,function(current,index){
       
        if(percentages[index]>0){
            current.textContent = percentages[index] +'%';
        }else{

            current.textContent = '-----';
        }
       

      });



    },

    displayMonth: function(){

        var now,months,month, year;
         now =  new Date();

         year = now.getFullYear();
         month = now.getMonth();
         months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

         document.querySelector(DOMStrings.dateLabel).textContent = months[month]+' '+year;


    }

};

})();


var controller = (function(bCtrl,uiCtrl){

    //set up event listeners
    var setUpEventListners = function(){

        var DOM = uiCtrl.getDomStrings();

        document.querySelector(DOM.btnAddItem).addEventListener('click',ctrlAddItem);
        document.querySelector(DOM.inputType).addEventListener('change',UIController.changedType);

    
        document.addEventListener('keypress',function(event){
    
            if(event.keyCode === 13){
    
                ctrlAddItem();
            }
    
        });

        document.querySelector(DOM.deleteBtnParentContainer).addEventListener('click',ctrlDeleteItem);

    }

    //calculate and update budget
    var calculateAndUpdateBudget = function(){
        budgetController.calculateBudget();
        var budget = budgetController.getBudget();
        uiCtrl.displayBudget(budget);


    }

    //calculate and update percentages
    var calculateAndUpdatePercentages= function(){

        budgetController.calculatePercentages();
        var percentages = budgetController.getPercentages();

       uiCtrl.displayPercentages(percentages);

    }

    //add items
    var ctrlAddItem = function(){
        //get values from input
       var input= uiCtrl.getInput();
       
       if(input.description!=="" && !isNaN(input.value) && input.value>0){

        //add new item to model
       var newItem = budgetController.addItem(input.type,input.description,input.value);
       //add item to UI
       uiCtrl.addListItem(newItem,input.type);
       //Clear UI input fields
       uiCtrl.clearFields();

       budgetController.testdata();

       //calculate and update budget
       calculateAndUpdateBudget();

       calculateAndUpdatePercentages();
       }

    };

    //delete item from list

    var ctrlDeleteItem = function(event){
        var itemId, splitId, type, ID;

        itemId = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if(itemId){

          splitId = itemId.split('-');
          type = splitId[0];
          ID = parseInt(splitId[1]);  
          
          budgetController.deleteItem(type,ID);

          uiCtrl.deletItemFromList(itemId);

          calculateAndUpdateBudget();

          calculateAndUpdatePercentages();
        }


    };

    return {
      
        init:function(){

            console.log('app started');
            UIController.displayMonth();
            UIController.displayBudget({ budget:0,
                totalIncome:0,
                totalExpense:0,
                percentage: -1});
            setUpEventListners();
        }

    }
   

})(budgetController,UIController);

controller.init();