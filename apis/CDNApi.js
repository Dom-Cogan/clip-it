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

export const createCollectionPOSTStatusAndText = (Constants, { name }) =>
  fetch(`https://video.bunnycdn.com/library/117194/collections`, {
    body: JSON.stringify({ name: name }),
    headers: {
      Accept: 'application/json',
      AccessKey: 'b2ddde8a-5e13-48d2-86f711dd1dba-5cc2-459f',
      'content-type': 'application/*+json',
    },
    method: 'POST',
  }).then(async res => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }));

export const createCollectionPOST = (Constants, { name }) =>
  createCollectionPOSTStatusAndText(Constants, { name }).then(
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

export const useCreateCollectionPOST = initialArgs => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();

  return useMutation(
    args => createCollectionPOST(Constants, { ...initialArgs, ...args }),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('guid', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('guid');
        queryClient.invalidateQueries('guids');
      },
    }
  );
};

export const FetchCreateCollectionPOST = ({
  children,
  onData = () => {},
  refetchInterval,
  name,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    loading,
    data,
    error,
    mutate: refetch,
  } = useCreateCollectionPOST({ name }, { refetchInterval });

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

  return children({ loading, data, error, refetchCreateCollection: refetch });
};

export const createVideoPOSTStatusAndText = (Constants, { videoTitle }) =>
  fetch(`https://video.bunnycdn.com/library/117194/videos`, {
    body: JSON.stringify({ title: videoTitle }),
    headers: {
      Accept: 'application/json',
      AccessKey: 'b2ddde8a-5e13-48d2-86f711dd1dba-5cc2-459f',
      'content-type': 'application/*+json',
    },
    method: 'POST',
  }).then(async res => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }));

export const createVideoPOST = (Constants, { videoTitle }) =>
  createVideoPOSTStatusAndText(Constants, { videoTitle }).then(
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

export const useCreateVideoPOST = initialArgs => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();

  return useMutation(
    args => createVideoPOST(Constants, { ...initialArgs, ...args }),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('guid', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('guid');
        queryClient.invalidateQueries('guids');
      },
    }
  );
};

export const FetchCreateVideoPOST = ({
  children,
  onData = () => {},
  refetchInterval,
  videoTitle,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    loading,
    data,
    error,
    mutate: refetch,
  } = useCreateVideoPOST({ videoTitle }, { refetchInterval });

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

  return children({ loading, data, error, refetchCreateVideo: refetch });
};
