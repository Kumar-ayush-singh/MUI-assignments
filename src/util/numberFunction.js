export function numberFormater(numb, withDecimal) {
  numb = Number(numb).toFixed(2);
  let numString = String(numb);
  let beforeDecimal = numString.substring(0, numString.indexOf("."));
  let afterDecimal = numString.substring(
    numString.indexOf("."),
    numString.length
  );

  let number = Intl.NumberFormat("en-IN").format(Number(beforeDecimal));
  if(withDecimal){
    return number + afterDecimal;
  }
  return number;
}

//for filtering number form inputString
export function filterNumber(number, digitAfterDecimal) {
  let numberText = String(number);
  let newNumber = Number(number);

  if (!isNaN(newNumber) && !digitAfterDecimal) {
    return newNumber;
  }

  newNumber = "";
  let gotDecimalPoint = false;
  let noOfDigitAfterDecimal = 0;
  for (let i = 0; i < numberText.length; i++) {
    const charCode = numberText.charCodeAt(i);

    if (charCode > 47 && charCode < 58) {
      newNumber = newNumber + numberText.charAt(i);

      if (gotDecimalPoint) {
        noOfDigitAfterDecimal++;

        if (noOfDigitAfterDecimal === digitAfterDecimal) {
          break;
        }
      }
    } else if (digitAfterDecimal && charCode == 46 && !gotDecimalPoint) {
      newNumber = newNumber + ".";
      gotDecimalPoint = true;
    } else {
      break;
    }
  }

  return newNumber;
}
