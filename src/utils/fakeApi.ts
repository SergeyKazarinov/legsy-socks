import { data } from "./data";
import { nameAndQuantityData } from "./nameAndQuantityData";

export const getRowDataRequest = async () => {
  return await new Promise(resolve => {
    setTimeout(() => {
      resolve(data);
    }, 1500);
  });
};

export const getNameAndQuantityData = async () => {
  return await new Promise(resolve => {
    setTimeout(() => {
      resolve(nameAndQuantityData);
    }, 1500);
  });
};