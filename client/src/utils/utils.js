export const updateObj = (oldObj, propToUpdate) => {
  return {
    ...oldObj,
    ...propToUpdate
  };
};

export const validateEmails = (emails = "") => {
  // eslint-disable-next-line
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const emailsArr = emails.split(",").map(email => email.trim());
  if (emailsArr[emailsArr.length - 1] === "") {
    // Remove trailing comma
    emailsArr.pop();
  }
  const invalidEmails = emailsArr.filter(email => !regex.test(email));

  if (invalidEmails.length > 0) {
    return `Following emails are invalid: ${invalidEmails}`;
  }
  return;
};
