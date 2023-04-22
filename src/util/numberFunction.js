export function numberFormater(num, syncWithInput, withDecimal) {
  const numString = String(num);
  let prevIndexOfDecimal = numString.includes('.');
  let prevNumAfterDecimal = '';

  if(prevIndexOfDecimal != -1){
    prevNumAfterDecimal = numString.substring(prevIndexOfDecimal);
  }

  num = Number(num).toFixed(2);
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
  let numberText = String(number);
  let newNumber = Number(number);

  if (!isNaN(newNumber)) {
    return numberText;
  }

  numberText = numberText.match(/\d+|\.+/g).join('');

  const indexOfDecimal = numberText.indexOf('.');
  if(indexOfDecimal != -1){
    const numberBeforeDecimal = numberText.substring(0, indexOfDecimal);
    const numberAfterDecimal = numberText.substring(indexOfDecimal).replace(/\.+/g, '');
    if(useDecimal){
      newNumber = numberBeforeDecimal + '.' + numberAfterDecimal;
    }
    else{
      newNumber = numberBeforeDecimal;
    }
  }

  return newNumber;
}
