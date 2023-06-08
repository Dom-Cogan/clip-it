import React from 'react';

const getUID = video => {
  // Type the code for the body of your function or hook here.
  // Functions can be triggered via Button/Touchable actions.
  // Hooks are run per ReactJS rules.
  let jsonData = JSON.parse(video);
  return jsonData['guid'];
  /* String line breaks are accomplished with backticks ( example: `line one
line two` ) and will not work with special characters inside of quotes ( example: "line one line two" ) */
};

export default getUID;
