//tip calculator object

var tipObj = {
    bills: [124, 48, 268, 180, 42],
    tips: [],
    billTotal: [],
    calTip: function () {
        
        for (var i=0;i<this.bills.length;i++){
            
            if(this.bills[i]<50){
                
              this.tips.push(this.bills[i]*0.2);
              this.billTotal.push(this.bills[i]+(this.bills[i]*0.2))
               
               }
            else if(this.bills[i]>=50 || this.bills[i]<=200 ){
            
            this.tips.push(this.bills[i]*0.15);
            this.billTotal.push(this.bills[i]+(this.bills[i]*0.15))
                
            }else{
                
              this.tips.push(this.bills[i]*0.1);  
              this.billTotal.push(this.bills[i]+(this.bills[i]*0.1))
            }
        }
        
        return this.tips;
        
    }
};

console.log(tipObj.calTip());
console.log(tipObj.billTotal);