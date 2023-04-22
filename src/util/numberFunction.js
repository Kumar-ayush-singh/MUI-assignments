export function numberFormater(num, syncWithInput, withDecimal) {
  let numString = String(num);
  let prevIndexOfDecimal = numString.includes('.');
  let prevNumAfterDecimal = '';

  if(prevIndexOfDecimal != -1){
    prevNumAfterDecimal = numString.substring(prevIndexOfDecimal);
  }

  num = Number(num).toFixed(2);
  numString = String(num);
  const beforeDecimal = numString.substring(0, numString.indexOf("."));
  const afterDecimal = numString.substring(
    numString.indexOf("."),
    numString.length
  );

  let formatedNum = Intl.NumberFormat("en-IN").format(Number(beforeDecimal));
  if(withDecimal){
    if(syncWithInput){
      return formatedNum + prevNumAfterDecimal;
    }
    return formatedNum + afterDecimal;
  }
  return formatedNum;
}

//for filtering number form inputString
export function filterNumber(number, useDecimal) {
  let numberString = String(number);
  let newNumber = Number(number);

  // if (!isNaN(newNumber) && useDecimal) {
  //   return numberString;
  // }

  const filteredArray = numberString.match(/\d+|\.+/g);
  numberString = filteredArray ? filteredArray.join('') : '';
  const indexOfDecimal = numberString.indexOf('.');

  if(indexOfDecimal == -1){
    return numberString;
  }
  
  const numberBeforeDecimal = numberString.substring(0, indexOfDecimal);
  const numberAfterDecimal = numberString.substring(indexOfDecimal).replace(/\.+/g, '');
  if(useDecimal){
    newNumber = numberBeforeDecimal + '.' + numberAfterDecimal.substring(0, 2);
  }
  else{
    newNumber = numberBeforeDecimal;
  }
  
  return newNumber;
}
