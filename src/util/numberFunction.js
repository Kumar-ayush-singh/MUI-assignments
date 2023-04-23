export function numberFormater(inputNumString, syncWithInput, withDecimal) {
  let filteredNumString = filterNumber(inputNumString, withDecimal);
  let prevIndexOfDecimal = filteredNumString.includes('.');
  let prevNumAfterDecimal = '';

  if(prevIndexOfDecimal != -1){
    prevNumAfterDecimal = filteredNumString.substring(prevIndexOfDecimal);
  }

  const numValue = Number(filteredNumString).toFixed(2);
  filteredNumString = String(numValue);
  const beforeDecimal = filteredNumString.substring(0, filteredNumString.indexOf("."));
  const afterDecimal = filteredNumString.substring(
    filteredNumString.indexOf("."),
    filteredNumString.length
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
