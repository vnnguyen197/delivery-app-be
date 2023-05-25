import { QueryProduct } from '@/interfaces/product.interface';

/**
 * @method isEmpty
 * @param {String | Number | Object} value
 * @returns {Boolean} true & false
 * @description this value is Empty Check
 */
export const isEmpty = (value: string | number | object): boolean => {
  if (value === null) {
    return true;
  } else if (typeof value !== 'number' && value === '') {
    return true;
  } else if (typeof value === 'undefined' || value === undefined) {
    return true;
  } else if (value !== null && typeof value === 'object' && !Object.keys(value).length) {
    return true;
  } else {
    return false;
  }
};

export const queryPagination = ({ limit = 20, page = 1 }: QueryProduct) => {
  return { skip: limit * (page - 1), take: +limit };
};

export const generateOTP = otp_length => {
  // Declare a digits variable
  // which stores all digits
  const digits = '0123456789';
  let OTP = '';
  for (let i = 0; i < otp_length; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
};

export const checkExpiredTime = (time: number) => {
  const currentOtp = new Date(); 
  const outExpirationTime = new Date(time + 5 * 60 * 100);
  return currentOtp > outExpirationTime;
};
