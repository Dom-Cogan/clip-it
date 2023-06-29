import React from 'react';

// this refreshes the users token
const refreshToken = async (setGlobalVariableValue, anonKey) => {
  // Client setup
  const supabase = createClient(
    'https://jxuqkufoqqjhccjusxzf.supabase.co',
    anonKey
  );

  // Refresh token
  const { data, error } = await supabase.auth.api.refreshAccessToken();
  if (error) {
    console.log('Error refreshing token:', error.message);
  } else {
    console.log('New access token:', data.access_token);
  }
};

export default refreshToken;
