import { notification } from 'antd';

export const dotValidator = (val) => {
  const str = val.replace(/[,]/g, '.');
  const firstDotIndex = str.indexOf('.');
  if (firstDotIndex === 0) {
    return '';
  }
  let correctedString = str.substring(0, firstDotIndex + 1);
  for (let i = firstDotIndex + 1; i < str.length; i += 1) {
    if (str[i] >= '0' && str[i] <= '9') {
      correctedString += str[i];
    }
  }
  return correctedString;
};

export const numberValidator = (value, max) => {
  let field = value;
  if (max) {
    field = field.slice(0, max);
  }
  return field.replace(/[^\d]+/g, '');
};

export const vinNumberValidator = (field) => {
  const value = field;
  const alowedChar = 'ABCDEFGHJKLMNPRSTUVWXYZ0123456789'.split('');
  let validated = value.toUpperCase();
  validated = validated
    .split('')
    .filter((letter) =>
      alowedChar.includes(letter)
        ? true
        : notification.error({
            message:
              'Codul VIN nu poate conține simboluri și următoarele caractere: O, I, Q.',
          }),
    )
    .join('');
  return validated;
};

export const nameValidator = (value) => {
  let field = value;
  if (field === ' ') {
    field = field.slice(0, -1);
  }
  field = field.replace(/[^a-zA-Z\-'._ ]/g, '');
  return field;
};

export const maxLengthValidator = (value, number) => {
  let field = value;
  if (field.length > number) {
    field = field.slice(0, number);
  }

  return field;
};

export const phoneValidator = (value, number) => {
  let field = value;
  if (field.length > number) {
    field = field.slice(0, number);
  }
  // eslint-disable-next-line
  return field.replace(/[^\d\+]+/g, '');
};

export const floatValidator = (input, integerMax = 4, floatMax = 4) => {
  const inputStr = String(input);
  const dotIndex = inputStr.indexOf('.');
  if (dotIndex === -1) {
    return inputStr.slice(0, integerMax);
  }
  const integerPart = inputStr.slice(0, dotIndex).slice(0, integerMax);
  const decimalPart = inputStr.slice(dotIndex + 1, dotIndex + (floatMax + 1));
  return `${integerPart}.${decimalPart}`;
};

export const emailValidator = (rule, value, callback) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!value || emailRegex.test(value)) {
    callback();
  } else {
    callback('Introduceți o adresă validă.');
  }
};

export const maxNumberValidator = (value) => {
  let field = value;
  if (field > 6 || field.length > 1) {
    field = field.slice(0, -1);
  }
  return field;
};

export const stringLengthValidator = (value, length) => {
  if (value?.length > length) {
    return `${value?.slice(0, length)}...`;
  }
  return value;
};

export const roundValidator = (value) => {
  if (typeof value === 'number') {
    return Math.round(value);
  }
  return null;
};
