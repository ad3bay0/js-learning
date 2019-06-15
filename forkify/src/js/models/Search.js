export default 'Model Title';
export const user = {name:'John Smith',birthYear:1999,getAge:function(){
    return new Date().getFullYear()-this.birthYear;
}};

