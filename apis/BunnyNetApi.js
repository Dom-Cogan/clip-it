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

export const getVideoGETStatusAndText = (Constants, { library, video_id }) =>
  fetch(
    `https://video.bunnycdn.com/library/${library ?? ''}/videos/${
      video_id ?? ''
    }`,
    {
      headers: {
        Accept: 'application/json',
        AccessKey: 'b2ddde8a-5e13-48d2-86f711dd1dba-5cc2-459f',
      },
    }
  ).then(async res => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }));

export const getVideoGET = (Constants, { library, video_id }) =>
  getVideoGETStatusAndText(Constants, { library, video_id }).then(
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

export const useGetVideoGET = ({ library, video_id }) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();

  return useFetch(
    `https://video.bunnycdn.com/library/${library ?? ''}/videos/${
      video_id ?? ''
    }`,
    {
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        AccessKey: 'b2ddde8a-5e13-48d2-86f711dd1dba-5cc2-459f',
      },
    }
  );
};

export const FetchGetVideoGET = ({
  children,
  onData = () => {},
  refetchInterval,
  library,
  video_id,
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
    `https://video.bunnycdn.com/library/${library ?? ''}/videos/${
      video_id ?? ''
    }`,
    {
      depends: [isFocused],
      headers: {
        Accept: 'application/json',
        AccessKey: 'b2ddde8a-5e13-48d2-86f711dd1dba-5cc2-459f',
      },
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

  return children({ loading, data, error, refetchGetVideo: refetch });
};
