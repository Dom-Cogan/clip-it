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

export const createNewUserPOSTStatusAndText = (
  Constants,
  { email, firstName, lastName, password }
) =>
  fetch(`https://xx9a-1etk-syju.n7c.xano.io/api:KQQbfU2v/auth/signup`, {
    body: JSON.stringify({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    }),
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    method: 'POST',
  }).then(async res => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }));

export const createNewUserPOST = (
  Constants,
  { email, firstName, lastName, password }
) =>
  createNewUserPOSTStatusAndText(Constants, {
    email,
    firstName,
    lastName,
    password,
  }).then(({ status, statusText, text }) => {
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
  });

export const useCreateNewUserPOST = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(['User', args], () => createNewUserPOST(Constants, args), {
    refetchInterval,
    onSuccess: () => queryClient.invalidateQueries(['Users']),
  });
};

export const FetchCreateNewUserPOST = ({
  children,
  onData = () => {},
  refetchInterval,
  email,
  firstName,
  lastName,
  password,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    loading,
    data,
    error,
    mutate: refetch,
  } = useCreateNewUserPOST(
    { email, firstName, lastName, password },
    { refetchInterval }
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

  return children({ loading, data, error, refetchCreateNewUser: refetch });
};

export const createPostPOSTStatusAndText = (
  Constants,
  { hubId, mediaId, mediaType, postText }
) =>
  fetch(`https://xx9a-1etk-syju.n7c.xano.io/api:KQQbfU2v/post`, {
    body: JSON.stringify({
      hub_user_id: hubId,
      media_id: mediaId,
      references_id: 0,
      comments_id: 0,
      mediaType: mediaType,
      postText: postText,
      tags: [],
    }),
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    method: 'POST',
  }).then(async res => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }));

export const createPostPOST = (
  Constants,
  { hubId, mediaId, mediaType, postText }
) =>
  createPostPOSTStatusAndText(Constants, {
    hubId,
    mediaId,
    mediaType,
    postText,
  }).then(({ status, statusText, text }) => {
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
  });

export const useCreatePostPOST = initialArgs => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();

  return useMutation(
    args => createPostPOST(Constants, { ...initialArgs, ...args }),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('New Post', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('New Post');
        queryClient.invalidateQueries('New Posts');
      },
    }
  );
};

export const FetchCreatePostPOST = ({
  children,
  onData = () => {},
  refetchInterval,
  hubId,
  mediaId,
  mediaType,
  postText,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    loading,
    data,
    error,
    mutate: refetch,
  } = useCreatePostPOST(
    { hubId, mediaId, mediaType, postText },
    { refetchInterval }
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

  return children({ loading, data, error, refetchCreatePost: refetch });
};

export const createANewCommentPOSTStatusAndText = (
  Constants,
  { comment, mediaId, postId, userId }
) =>
  fetch(`https://xx9a-1etk-syju.n7c.xano.io/api:KQQbfU2v/comments`, {
    body: JSON.stringify({
      hub_user_id: userId,
      post_id: postId,
      media_id: mediaId,
      commentText: comment,
    }),
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    method: 'POST',
  }).then(async res => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }));

export const createANewCommentPOST = (
  Constants,
  { comment, mediaId, postId, userId }
) =>
  createANewCommentPOSTStatusAndText(Constants, {
    comment,
    mediaId,
    postId,
    userId,
  }).then(({ status, statusText, text }) => {
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
  });

export const useCreateANewCommentPOST = initialArgs => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();

  return useMutation(
    args => createANewCommentPOST(Constants, { ...initialArgs, ...args }),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('Comment', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('Comment');
        queryClient.invalidateQueries('Comments');
      },
    }
  );
};

export const FetchCreateANewCommentPOST = ({
  children,
  onData = () => {},
  refetchInterval,
  comment,
  mediaId,
  postId,
  userId,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    loading,
    data,
    error,
    mutate: refetch,
  } = useCreateANewCommentPOST(
    { comment, mediaId, postId, userId },
    { refetchInterval }
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

  return children({ loading, data, error, refetchCreateANewComment: refetch });
};

export const getAllHubPostGETStatusAndText = (Constants, { user_id }) =>
  fetch(
    `https://xx9a-1etk-syju.n7c.xano.io/api:KQQbfU2v/post/hub/${user_id ?? ''}`,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  ).then(async res => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }));

export const getAllHubPostGET = (Constants, { user_id }) =>
  getAllHubPostGETStatusAndText(Constants, { user_id }).then(
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

export const useGetAllHubPostGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues();
  return useQuery(['Posts', args], () => getAllHubPostGET(Constants, args), {
    refetchInterval,
  });
};

export const FetchGetAllHubPostGET = ({
  children,
  onData = () => {},
  refetchInterval,
  user_id,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useGetAllHubPostGET(
    { user_id },
    { refetchInterval }
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

  return children({ loading, data, error, refetchGetAllHubPost: refetch });
};

export const getAllPublicPostsGETStatusAndText = (Constants, { mediaType }) =>
  fetch(
    `https://xx9a-1etk-syju.n7c.xano.io/api:KQQbfU2v/clip_it_post/${
      mediaType ?? ''
    }`,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  ).then(async res => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }));

export const getAllPublicPostsGET = (Constants, { mediaType }) =>
  getAllPublicPostsGETStatusAndText(Constants, { mediaType }).then(
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

export const useGetAllPublicPostsGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues();
  return useQuery(
    ['Posts', args],
    () => getAllPublicPostsGET(Constants, args),
    {
      refetchInterval,
    }
  );
};

export const FetchGetAllPublicPostsGET = ({
  children,
  onData = () => {},
  refetchInterval,
  mediaType,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useGetAllPublicPostsGET(
    { mediaType },
    { refetchInterval }
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

  return children({ loading, data, error, refetchGetAllPublicPosts: refetch });
};

export const getChannelGETStatusAndText = (Constants, { channel_id }) =>
  fetch(
    `https://xx9a-1etk-syju.n7c.xano.io/api:KQQbfU2v/channel/${
      channel_id ?? ''
    }`,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  ).then(async res => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }));

export const getChannelGET = (Constants, { channel_id }) =>
  getChannelGETStatusAndText(Constants, { channel_id }).then(
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

export const useGetChannelGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(['Channel', args], () => getChannelGET(Constants, args), {
    refetchInterval,
    onSuccess: () => queryClient.invalidateQueries(['Channels']),
  });
};

export const FetchGetChannelGET = ({
  children,
  onData = () => {},
  refetchInterval,
  channel_id,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useGetChannelGET(
    { channel_id },
    { refetchInterval }
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

  return children({ loading, data, error, refetchGetChannel: refetch });
};

export const getSinglePostGETStatusAndText = (Constants, { post_id }) =>
  fetch(
    `https://xx9a-1etk-syju.n7c.xano.io/api:KQQbfU2v/post/${post_id ?? ''}`,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  ).then(async res => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }));

export const getSinglePostGET = (Constants, { post_id }) =>
  getSinglePostGETStatusAndText(Constants, { post_id }).then(
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

export const useGetSinglePostGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(['Post', args], () => getSinglePostGET(Constants, args), {
    refetchInterval,
    onSuccess: () => queryClient.invalidateQueries(['Posts']),
  });
};

export const FetchGetSinglePostGET = ({
  children,
  onData = () => {},
  refetchInterval,
  post_id,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useGetSinglePostGET(
    { post_id },
    { refetchInterval }
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

  return children({ loading, data, error, refetchGetSinglePost: refetch });
};

export const userCreateChannelPOSTStatusAndText = (
  Constants,
  { hub_user_id, name }
) =>
  fetch(`https://xx9a-1etk-syju.n7c.xano.io/api:KQQbfU2v/channel`, {
    body: JSON.stringify({
      hub_user_id: hub_user_id,
      name: name,
      followerCount: 0,
      supportersCount: 0,
    }),
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    method: 'POST',
  }).then(async res => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }));

export const userCreateChannelPOST = (Constants, { hub_user_id, name }) =>
  userCreateChannelPOSTStatusAndText(Constants, { hub_user_id, name }).then(
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

export const useUserCreateChannelPOST = ({ hub_user_id, name }) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();

  return useFetch(`https://xx9a-1etk-syju.n7c.xano.io/api:KQQbfU2v/channel`, {
    body: JSON.stringify({
      hub_user_id: hub_user_id,
      name: name,
      followerCount: 0,
      supportersCount: 0,
    }),
    depends: [isFocused],
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    method: 'POST',
  });
};

export const FetchUserCreateChannelPOST = ({
  children,
  onData = () => {},
  refetchInterval,
  hub_user_id,
  name,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const refetch = () => {};
  const {
    isLoading: loading,
    data,
    error,
  } = useFetch(`https://xx9a-1etk-syju.n7c.xano.io/api:KQQbfU2v/channel`, {
    body: JSON.stringify({
      hub_user_id: hub_user_id,
      name: name,
      followerCount: 0,
      supportersCount: 0,
    }),
    depends: [isFocused],
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
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

  return children({ loading, data, error, refetchUserCreateChannel: refetch });
};

export const addMediaPOSTStatusAndText = (
  Constants,
  { image, postId, videoURL }
) =>
  fetch(`https://xx9a-1etk-syju.n7c.xano.io/api:KQQbfU2v/media`, {
    body: JSON.stringify({ image: image, videoURL: videoURL, post_id: postId }),
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    method: 'POST',
  }).then(async res => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }));

export const addMediaPOST = (Constants, { image, postId, videoURL }) =>
  addMediaPOSTStatusAndText(Constants, { image, postId, videoURL }).then(
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

export const useAddMediaPOST = initialArgs => {
  const queryClient = useQueryClient();
  const Constants = GlobalVariables.useValues();

  return useMutation(
    args => addMediaPOST(Constants, { ...initialArgs, ...args }),
    {
      onError: (err, variables, { previousValue }) => {
        if (previousValue) {
          return queryClient.setQueryData('New Post', previousValue);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries('New Post');
        queryClient.invalidateQueries('New Posts');
      },
    }
  );
};

export const FetchAddMediaPOST = ({
  children,
  onData = () => {},
  refetchInterval,
  image,
  postId,
  videoURL,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    loading,
    data,
    error,
    mutate: refetch,
  } = useAddMediaPOST({ image, postId, videoURL }, { refetchInterval });

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

  return children({ loading, data, error, refetchAddMedia: refetch });
};

export const currentUserGETStatusAndText = Constants =>
  fetch(`https://xx9a-1etk-syju.n7c.xano.io/api:KQQbfU2v/auth/me`, {
    headers: {
      Accept: 'application/json',
      Authorization: Constants['AUTH_HEADER'],
      'Content-Type': 'application/json',
    },
  }).then(async res => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }));

export const currentUserGET = Constants =>
  currentUserGETStatusAndText(Constants).then(
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

export const useCurrentUserGET = () => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();

  return useFetch(`https://xx9a-1etk-syju.n7c.xano.io/api:KQQbfU2v/auth/me`, {
    depends: [isFocused],
    headers: {
      Accept: 'application/json',
      Authorization: Constants['AUTH_HEADER'],
      'Content-Type': 'application/json',
    },
  });
};

export const FetchCurrentUserGET = ({
  children,
  onData = () => {},
  refetchInterval,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const refetch = () => {};
  const {
    isLoading: loading,
    data,
    error,
  } = useFetch(`https://xx9a-1etk-syju.n7c.xano.io/api:KQQbfU2v/auth/me`, {
    depends: [isFocused],
    headers: {
      Accept: 'application/json',
      Authorization: Constants['AUTH_HEADER'],
      'Content-Type': 'application/json',
    },
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

  return children({ loading, data, error, refetchCurrentUser: refetch });
};

export const getMediaGETStatusAndText = (Constants, { media_id }) =>
  fetch(
    `https://xx9a-1etk-syju.n7c.xano.io/api:KQQbfU2v/media/${media_id ?? ''}`,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  ).then(async res => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }));

export const getMediaGET = (Constants, { media_id }) =>
  getMediaGETStatusAndText(Constants, { media_id }).then(
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

export const useGetMediaGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues();
  return useQuery(['media', args], () => getMediaGET(Constants, args), {
    refetchInterval,
  });
};

export const FetchGetMediaGET = ({
  children,
  onData = () => {},
  refetchInterval,
  media_id,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useGetMediaGET(
    { media_id },
    { refetchInterval }
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

  return children({ loading, data, error, refetchGetMedia: refetch });
};

export const getMediaTypeGETStatusAndText = (Constants, { mediatype_id }) =>
  fetch(
    `https://xx9a-1etk-syju.n7c.xano.io/api:KQQbfU2v/mediatype/${
      mediatype_id ?? ''
    }`,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  ).then(async res => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }));

export const getMediaTypeGET = (Constants, { mediatype_id }) =>
  getMediaTypeGETStatusAndText(Constants, { mediatype_id }).then(
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

export const useGetMediaTypeGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues();
  return useQuery(['media', args], () => getMediaTypeGET(Constants, args), {
    refetchInterval,
  });
};

export const FetchGetMediaTypeGET = ({
  children,
  onData = () => {},
  refetchInterval,
  mediatype_id,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useGetMediaTypeGET(
    { mediatype_id },
    { refetchInterval }
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

  return children({ loading, data, error, refetchGetMediaType: refetch });
};

export const getHubGETStatusAndText = (Constants, { hub_user_id }) =>
  fetch(
    `https://xx9a-1etk-syju.n7c.xano.io/api:KQQbfU2v/hub_user/${
      hub_user_id ?? ''
    }`,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  ).then(async res => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }));

export const getHubGET = (Constants, { hub_user_id }) =>
  getHubGETStatusAndText(Constants, { hub_user_id }).then(
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

export const useGetHubGET = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(['Hub', args], () => getHubGET(Constants, args), {
    refetchInterval,
    onSuccess: () => queryClient.invalidateQueries(['Hubs']),
  });
};

export const FetchGetHubGET = ({
  children,
  onData = () => {},
  refetchInterval,
  hub_user_id,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const { loading, data, error, refetch } = useGetHubGET(
    { hub_user_id },
    { refetchInterval }
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

  return children({ loading, data, error, refetchGetHub: refetch });
};

export const logUserInPOSTStatusAndText = (Constants, { email, password }) =>
  fetch(`https://xx9a-1etk-syju.n7c.xano.io/api:KQQbfU2v/auth/login`, {
    body: JSON.stringify({ email: email, password: password }),
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    method: 'POST',
  }).then(async res => ({
    status: res.status,
    statusText: res.statusText,
    text: await res.text(),
  }));

export const logUserInPOST = (Constants, { email, password }) =>
  logUserInPOSTStatusAndText(Constants, { email, password }).then(
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

export const useLogUserInPOST = (args, { refetchInterval } = {}) => {
  const Constants = GlobalVariables.useValues();
  const queryClient = useQueryClient();
  return useQuery(['User', args], () => logUserInPOST(Constants, args), {
    refetchInterval,
    onSuccess: () => queryClient.invalidateQueries(['Users']),
  });
};

export const FetchLogUserInPOST = ({
  children,
  onData = () => {},
  refetchInterval,
  email,
  password,
}) => {
  const Constants = GlobalVariables.useValues();
  const isFocused = useIsFocused();
  const prevIsFocused = usePrevious(isFocused);

  const {
    loading,
    data,
    error,
    mutate: refetch,
  } = useLogUserInPOST({ email, password }, { refetchInterval });

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

  return children({ loading, data, error, refetchLogUserIn: refetch });
};
