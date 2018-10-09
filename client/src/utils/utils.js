export const updateObj = (oldObj, propToUpdate) => {
  return {
    ...oldObj,
    ...propToUpdate
  };
};
