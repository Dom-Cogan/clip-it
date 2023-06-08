import React from 'react';

const expireTime = () => {
  // Type the code for the body of your function or hook here.
  // Functions can be triggered via Button/Touchable actions.
  // Hooks are run per ReactJS rules.
  var time = new Date(); // get current date
  return time.setHours(time.getHours() + 5); // add 5 hours for expiration
  /* String line breaks are accomplished with backticks ( example: `line one
line two` ) and will not work with special characters inside of quotes ( example: "line one line two" ) */
};

export default expireTime;
