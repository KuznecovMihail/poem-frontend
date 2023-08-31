export const mask = (phoneNumber) => {
  return `+7 (${phoneNumber.slice(1, 4)}) ${phoneNumber.slice(
    4,
    7
  )}-${phoneNumber.slice(7, 9)}-${phoneNumber.slice(9, 11)}`;
};

export const unmask = (maskedNumber) => {
  return maskedNumber.replace(/\D/g, "").replace(/7/, "8").slice(0, 11);
};

export const onPhoneChange = (e) => {
  let input = e.target;
  let numbersValue = input.value.replace(/\D/g, "");
  let formattedValue = "+7 (";
  let selectionStart = input.selectionStart;

  if (!numbersValue) {
    return (input.value = "");
  }

  if (input.value.length !== selectionStart) {
    if (e.nativeEvent.data && /\D/g.test(e.nativeEvent.data)) {
      input.value = numbersValue;
    }
    return;
  }

  if (numbersValue.length < 2) {
    if (["7", "8"].indexOf(numbersValue[0]) > -1) {
      return (input.value = "+7");
    }

    return (input.value = "+7 (" + numbersValue);
  }

  if (numbersValue.length > 1) {
    formattedValue += numbersValue.slice(1, 4);
  }

  if (numbersValue.length >= 5) {
    formattedValue += ") " + numbersValue.slice(4, 7);
  }

  if (numbersValue.length >= 8) {
    formattedValue += "-" + numbersValue.slice(7, 9);
  }

  if (numbersValue.length >= 10) {
    formattedValue += "-" + numbersValue.slice(9, 11);
  }

  input.value = formattedValue;
};

export const onPhonePaste = (e) => {
  let pasted = e.clipboardData || window.clipboardData;
  let input = e.target;
  let numbersValue = input.value.replace(/\D/g, "");
  if (pasted) {
    let pastedData = pasted.getData("Text");
    if (/\D/g.test(pastedData)) {
      input.value = numbersValue;
    }
  }
};
