import React from 'react';

// users session
const getSession = async () => {
  const { data, error } = await supabase.auth.getSession();

  if (error) console.log('Error retrieving session:', error.message);
  else console.log('Session retrieved successfully:', data.Key);
};

export default getSession;
