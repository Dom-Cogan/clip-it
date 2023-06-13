import React from 'react';
import * as supabase from '../supabase';

const getHub = async (returnedError, setHub, id) => {
  const { data: hub, error } = await supabase.from('hub').select(id);

  if (error) {
    returnedError('could not find the hub your looking for');
    setHub(null);
    console.log(error);
  }
  if (data) {
    setHub(data);
    returnedError(null);
  }
};

export default getHub;
