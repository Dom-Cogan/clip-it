import React from 'react';

const fileName = (setGlobalVariableValue, event) => {
  const file = event?.target?.files?.[0];
  if (file) {
    return file.name;
  } else {
    return null; // Handle the case when no file is selected
  }

  // const file = event.target.files[0];
  // const fileName = file.name;
};

export default fileName;
