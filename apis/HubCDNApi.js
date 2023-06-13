import * as React from 'react';
import {
  useQuery,
  useMutation,
  useIsFetching,
  useQueryClient,
} from 'react-query';
import useFetch from 'react-fetch-hook';
import { useIsFocused } from '@react-navigation/native';
import usePrevious from '../utils/usePrevious';
import * as GlobalVariables from '../config/GlobalVariableContext';

export const emailLoginPOSTStatusAndText = (Constants, { email, password }) =>
  fetch(
    `https://jxuqkufoqqjhccjusxzf.supabase.co/auth/v1/token?grant_type=password`,
    {
      body: JSON.stringify({ email: email, password: password }),
      headers: {
        'Content-Type': 'application/json',
        apiKey: Constants['API_KEY_HEADER'],
      },
      method: 'POST',
    }
  ).then(async res => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }));

export const emailLoginPOST = (Constants, { email, password }) =>
  emailLoginPOSTStatusAndText(Constants, { email, password }).then(
    ({ status, statusText, text }) => {
      try {
        return JSON.parse(text);
      } catch (e) {
        console.error(
          [
            'Failed to parse response text as JSON.',
            `Error: ${e.message}`,
            `Text: ${JSON.stringify(text)}`,
          ].join('\n\n')
        );
      }
    }
  );

export const useEmailLoginPOST = ({ email, password }) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();

  return useFetch(
    `https://jxuqkufoqqjhccjusxzf.supabase.co/auth/v1/token?grant_type=password`,
    {
      body: JSON.stringify({ email: email, password: password }),
      depends: [isFocused],
      headers: {
        'Content-Type': 'application/json',
        apiKey: Constants['API_KEY_HEADER'],
      },
      method: 'POST',
    }
  );
};

export const FetchEmailLoginPOST = ({
  children,
  onData = () => {},
  refetchInterval,
  email,
  password,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const refetch = () => {};
  const {
    isLoading: loading,
    data,
    error,
  } = useFetch(
    `https://jxuqkufoqqjhccjusxzf.supabase.co/auth/v1/token?grant_type=password`,
    {
      body: JSON.stringify({ email: email, password: password }),
      depends: [isFocused],
      headers: {
        'Content-Type': 'application/json',
        apiKey: Constants['API_KEY_HEADER'],
      },
      method: 'POST',
    }
  );

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    if (data) {
      onData(data);
    }
  }, [data]);

  return children({ loading, data, error, refetchEmailLogin: refetch });
};

export const emergencyLoginPOSTStatusAndText = (Constants, { email }) =>
  fetch(`https://jxuqkufoqqjhccjusxzf.supabase.co/auth/v1/magiclink`, {
    body: JSON.stringify({ email: email }),
    headers: { apiKey: Constants['API_KEY_HEADER'] },
    method: 'POST',
  }).then(async res => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }));

export const emergencyLoginPOST = (Constants, { email }) =>
  emergencyLoginPOSTStatusAndText(Constants, { email }).then(
    ({ status, statusText, text }) => {
      try {
        return JSON.parse(text);
      } catch (e) {
        console.error(
          [
            'Failed to parse response text as JSON.',
            `Error: ${e.message}`,
            `Text: ${JSON.stringify(text)}`,
          ].join('\n\n')
        );
      }
    }
  );

export const useEmergencyLoginPOST = ({ email }) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();

  return useFetch(
    `https://jxuqkufoqqjhccjusxzf.supabase.co/auth/v1/magiclink`,
    {
      body: JSON.stringify({ email: email }),
      depends: [isFocused],
      headers: { apiKey: Constants['API_KEY_HEADER'] },
      method: 'POST',
    }
  );
};

export const FetchEmergencyLoginPOST = ({
  children,
  onData = () => {},
  refetchInterval,
  email,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const refetch = () => {};
  const {
    isLoading: loading,
    data,
    error,
  } = useFetch(`https://jxuqkufoqqjhccjusxzf.supabase.co/auth/v1/magiclink`, {
    body: JSON.stringify({ email: email }),
    depends: [isFocused],
    headers: { apiKey: Constants['API_KEY_HEADER'] },
    method: 'POST',
  });

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    if (data) {
      onData(data);
    }
  }, [data]);

  return children({ loading, data, error, refetchEmergencyLogin: refetch });
};

export const userSignupPOSTStatusAndText = (Constants, { email, password }) =>
  fetch(`https://jxuqkufoqqjhccjusxzf.supabase.co/auth/v1/signup`, {
    body: JSON.stringify({ email: email, password: password }),
    headers: {
      'Content-Type': 'application/json',
      apiKey: Constants['API_KEY_HEADER'],
    },
    method: 'POST',
  }).then(async res => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }));

export const userSignupPOST = (Constants, { email, password }) =>
  userSignupPOSTStatusAndText(Constants, { email, password }).then(
    ({ status, statusText, text }) => {
      try {
        return JSON.parse(text);
      } catch (e) {
        console.error(
          [
            'Failed to parse response text as JSON.',
            `Error: ${e.message}`,
            `Text: ${JSON.stringify(text)}`,
          ].join('\n\n')
        );
      }
    }
  );

export const useUserSignupPOST = ({ email, password }) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();

  return useFetch(`https://jxuqkufoqqjhccjusxzf.supabase.co/auth/v1/signup`, {
    body: JSON.stringify({ email: email, password: password }),
    depends: [isFocused],
    headers: {
      'Content-Type': 'application/json',
      apiKey: Constants['API_KEY_HEADER'],
    },
    method: 'POST',
  });
};

export const FetchUserSignupPOST = ({
  children,
  onData = () => {},
  refetchInterval,
  email,
  password,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const refetch = () => {};
  const {
    isLoading: loading,
    data,
    error,
  } = useFetch(`https://jxuqkufoqqjhccjusxzf.supabase.co/auth/v1/signup`, {
    body: JSON.stringify({ email: email, password: password }),
    depends: [isFocused],
    headers: {
      'Content-Type': 'application/json',
      apiKey: Constants['API_KEY_HEADER'],
    },
    method: 'POST',
  });

  React.useEffect(() => {
    if (!prevIsFocused && isFocused) {
      refetch();
    }
  }, [isFocused, prevIsFocused]);

  React.useEffect(() => {
    if (error) {
      console.error('Fetch error: ' + error.status + ' ' + error.statusText);
      console.error(error);
    }
  }, [error]);
  React.useEffect(() => {
    if (data) {
      onData(data);
    }
  }, [data]);

  return children({ loading, data, error, refetchUserSignup: refetch });
};
