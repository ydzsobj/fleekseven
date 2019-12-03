export function toMoney(money = 0){
   
    return Number(money).toFixed(2)

}
export function toDivide(money = 0){
    var value=money/100;
    var s=value.toString().split(".");
	if(s.length==1){
		value=value.toString()+".00";
		return value;
	}
	if(s.length>1){
		if(s[1].length<2){
			value=value.toString()+"0";
		}
		return value
      }
}
export function toThousands(money =0) {
	var s= money.toString().split(".")
	var num = s[0], result = '';
	while (num.length > 3) {
		result = ',' + num.slice(-3) + result;
		num = num.slice(0, num.length - 3);
	}
	if (num) { result = num + result; }
	if(s[1]) {result = result + '.' + s[1]}
	return result ;
}
export function int (money = 0){
	return Number(money)/100
}
export function num (money = 0){
	return Number(money)
}