//tip calculator object

var johnTipObj = {
  firstName: 'John',
    bills: [124, 48, 268, 180, 42],
    tips: [],
    billTotal: [],
    calTip: function () {

        for (var i=0;i<this.bills.length;i++){

          var percentage;
          var bill = this.bills[i];
            
            if(bill<50){
                
             percentage = .2;
               
               }
            else if(bill>=50 && bill<200 ){
            
              percentage = .15;
                
            }else{
                
              percentage = .1;
            }

            this.tips.push(bill*percentage);
            this.billTotal.push(bill+(bill*percentage))
        }
    }
};


var markTipObj = {

  firstName: 'Mark',
  bills: [77, 475, 110, 45],
  tips: [],
  billTotal: [],
  calTip: function () {

    for (var i=0;i<this.bills.length;i++){

      var percentage;
      var bill = this.bills[i];
        
        if(bill<100){
            
         percentage = .2;
           
           }
        else if(bill>=100 && bill<300 ){
        
          percentage = .1;
            
        }else{
            
          percentage = .25;
        }

        this.tips.push(bill*percentage);
        this.billTotal.push(bill+(bill*percentage))
    }
}
};


johnTipObj.calTip();


markTipObj.calTip();


//calculate the average tip for each family and who paid highest tips

function calculateAverageTip (arrayOfTips){

  var sizeOfTips = arrayOfTips.length;
  var sumOfTips = 0;

  for(var i = 0;i<sizeOfTips;i++){

    sumOfTips = arrayOfTips[i]+sumOfTips;

  }

  return sumOfTips/sizeOfTips;


}

var avergaOfMarkFamilyTip =  calculateAverageTip(markTipObj.tips);
var avergaOfJohnFamilyTip =  calculateAverageTip(johnTipObj.tips);

console.log('john average tip: '+avergaOfJohnFamilyTip+' -> '+johnTipObj.tips);
console.log('mark average tip: '+avergaOfMarkFamilyTip+' -> '+markTipObj.tips);

if(avergaOfJohnFamilyTip > avergaOfMarkFamilyTip){

  console.log('John\'s family paid higher tips' );

}else if(avergaOfMarkFamilyTip > avergaOfJohnFamilyTip){

  console.log('Mark\'s family paid higher tips' );

}else{

 console.log('Both family paid same tip average');
}

