import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as XanoApiApi from '../apis/XanoApiApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import * as tus from '../custom-files/tus';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import selectFileUtil from '../utils/selectFile';
import {
  Button,
  Circle,
  Divider,
  Icon,
  IconButton,
  Pressable,
  ScreenContainer,
  Swiper,
  SwiperItem,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { Fetch } from 'react-request';

const HomeScreen = props => {
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();

  // upload to CDN with TUS
  const tusUpload = (
    setGlobalVariableValue,
    file,
    signature,
    videoGuid,
    expirationTime
  ) => {
    // Create a new tus upload
    var upload = new customPackages.tus.Upload(file, {
      endpoint: 'https://video.bunnycdn.com/tusupload',
      retryDelays: [0, 3000, 5000, 10000, 20000, 60000, 60000],
      headers: {
        AuthorizationSignature: signature, // SHA256 signature (library_id + api_key + expiration_time + video_id)
        AuthorizationExpire: expirationTime, // Expiration time as in the signature,
        VideoId: videoGuid, // The guid of a previously created video object through the Create Video API call
        LibraryId: 117194,
      },
      metadata: {
        filetype: file.type,
        title: file.name,
        collection: 'collectionID',
      },
      onError: function (error) {},
      onProgress: function (bytesUploaded, bytesTotal) {},
      onSuccess: function () {},
    });

    // Check if there are any previous uploads to continue.
    upload.findPreviousUploads().then(function (previousUploads) {
      // Found previous uploads so we select the first one.
      if (previousUploads.length) {
        upload.resumeFromPreviousUpload(previousUploads[0]);
      }

      // Start the upload
      upload.start();
    });
  };

  const { theme } = props;
  const { navigation } = props;

  const [checkNull, setCheckNull] = React.useState('');
  const [mediaType, setMediaType] = React.useState('Post');
  const [sideMenu, setSideMenu] = React.useState(false);

  return (
    <ScreenContainer scrollable={true} hasSafeArea={false}>
      {/* NavBar */}
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'center',
            backgroundColor: [
              { minWidth: Breakpoints.Desktop, value: theme.colors['Primary'] },
              { minWidth: Breakpoints.Mobile, value: theme.colors['Medium'] },
            ],
            borderRadius: [
              { minWidth: Breakpoints.Desktop, value: 10 },
              { minWidth: Breakpoints.Mobile, value: 15 },
            ],
            flexDirection: [
              { minWidth: Breakpoints.Desktop, value: 'row' },
              { minWidth: Breakpoints.Mobile, value: 'row' },
            ],
            height: [
              { minWidth: Breakpoints.Desktop, value: 40 },
              { minWidth: Breakpoints.Mobile, value: 50 },
            ],
            justifyContent: 'space-between',
            margin: [
              { minWidth: Breakpoints.Desktop, value: 5 },
              { minWidth: Breakpoints.Mobile, value: 5 },
            ],
            padding: 5,
          },
          dimensions.width
        )}
      >
        {/* search */}
        <View
          style={StyleSheet.applyWidth(
            {
              flex: 3,
              justifyContent: [
                { minWidth: Breakpoints.Laptop, value: 'center' },
                { minWidth: Breakpoints.Mobile, value: 'center' },
              ],
              width: [
                { minWidth: Breakpoints.Desktop, value: '80%' },
                { minWidth: Breakpoints.Laptop, value: '80%' },
              ],
            },
            dimensions.width
          )}
        >
          <Text
            style={StyleSheet.applyWidth(
              StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                alignSelf: {
                  minWidth: Breakpoints.Laptop,
                  value: 'flex-start',
                },
                margin: { minWidth: Breakpoints.Laptop, value: 5 },
              }),
              dimensions.width
            )}
          >
            {'Clip-it'}
          </Text>
        </View>
        {/* options */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: [
                { minWidth: Breakpoints.Desktop, value: 'center' },
                { minWidth: Breakpoints.Laptop, value: 'center' },
                { minWidth: Breakpoints.Mobile, value: 'center' },
              ],
              flex: 1,
              flexDirection: [
                { minWidth: Breakpoints.Desktop, value: 'row' },
                { minWidth: Breakpoints.Laptop, value: 'row' },
                { minWidth: Breakpoints.Mobile, value: 'row' },
              ],
              justifyContent: [
                { minWidth: Breakpoints.Desktop, value: 'space-evenly' },
                { minWidth: Breakpoints.Laptop, value: 'space-evenly' },
                { minWidth: Breakpoints.Mobile, value: 'space-around' },
              ],
              width: [
                { minWidth: Breakpoints.Desktop, value: '20%' },
                { minWidth: Breakpoints.Laptop, value: '20%' },
              ],
            },
            dimensions.width
          )}
        >
          <IconButton
            color={theme.colors['Error']}
            icon={'Ionicons/play'}
            size={32}
          />
          <Pressable
            onPress={() => {
              try {
                setSideMenu(!sideMenu);
              } catch (err) {
                console.error(err);
              }
            }}
          >
            <Circle size={40}>
              <Image
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(GlobalStyles.ImageStyles(theme)['Image'], {
                    height: '100%',
                    width: '100%',
                  }),
                  dimensions.width
                )}
                source={{
                  uri: 'https://static.draftbit.com/images/placeholder-image.png',
                }}
                resizeMode={'cover'}
              />
            </Circle>
          </Pressable>
        </View>
      </View>
      {/* content */}
      <View
        style={StyleSheet.applyWidth(
          StyleSheet.compose(GlobalStyles.ViewStyles(theme)['deleteme'], {
            height: '100%',
          }),
          dimensions.width
        )}
      >
        {/* displayContent */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: { minWidth: Breakpoints.Laptop, value: 'center' },
              flex: { minWidth: Breakpoints.Laptop, value: 7 },
              height: { minWidth: Breakpoints.Laptop, value: '100%' },
              justifyContent: { minWidth: Breakpoints.Laptop, value: 'center' },
            },
            dimensions.width
          )}
        >
          {/* upload */}
          <>
            {!Constants['profile'] ? null : (
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: {
                      minWidth: Breakpoints.Laptop,
                      value: 'center',
                    },
                    backgroundColor: {
                      minWidth: Breakpoints.Laptop,
                      value: theme.colors['Background'],
                    },
                    height: { minWidth: Breakpoints.Laptop, value: '100%' },
                    justifyContent: {
                      minWidth: Breakpoints.Laptop,
                      value: 'center',
                    },
                    width: { minWidth: Breakpoints.Laptop, value: '100%' },
                  },
                  dimensions.width
                )}
              >
                {/* chooseFile */}
                <Touchable
                  onPress={() => {
                    const handler = async () => {
                      try {
                        const choosenFile = await selectFileUtil({
                          returnNameAndValue: true,
                        });
                        undefined;
                        setGlobalVariableValue({
                          key: 'profile',
                          value: false,
                        });
                        setGlobalVariableValue({
                          key: 'home',
                          value: true,
                        });
                        navigation.navigate('RootNavigator');
                      } catch (err) {
                        console.error(err);
                      }
                    };
                    handler();
                  }}
                >
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: {
                          minWidth: Breakpoints.Laptop,
                          value: 'center',
                        },
                        backgroundColor: {
                          minWidth: Breakpoints.Laptop,
                          value: theme.colors['Medium'],
                        },
                        borderRadius: {
                          minWidth: Breakpoints.Laptop,
                          value: 25,
                        },
                        height: { minWidth: Breakpoints.Laptop, value: 250 },
                        justifyContent: {
                          minWidth: Breakpoints.Laptop,
                          value: 'center',
                        },
                        width: { minWidth: Breakpoints.Laptop, value: 500 },
                      },
                      dimensions.width
                    )}
                  >
                    <Icon name={'FontAwesome/photo'} size={100} />
                  </View>
                </Touchable>
              </View>
            )}
          </>
          {/* townSquare */}
          <>
            {Constants['showSidemenu'] ? null : (
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: [
                      { minWidth: Breakpoints.Mobile, value: 'center' },
                      { minWidth: Breakpoints.Laptop, value: 'flex-start' },
                    ],
                    flex: { minWidth: Breakpoints.Laptop, value: 7 },
                    flexWrap: { minWidth: Breakpoints.Laptop, value: 'wrap' },
                    width: { minWidth: Breakpoints.Laptop, value: '100%' },
                  },
                  dimensions.width
                )}
              >
                {/* get Public posts */}
                <XanoApiApi.FetchGetAllPublicPostsGET mediaType={mediaType}>
                  {({ loading, error, data, refetchGetAllPublicPosts }) => {
                    const getPublicPostsData = data;
                    if (!getPublicPostsData || loading) {
                      return <ActivityIndicator />;
                    }

                    if (error) {
                      return (
                        <Text style={{ textAlign: 'center' }}>
                          There was a problem fetching this data
                        </Text>
                      );
                    }

                    return (
                      <>
                        {/* postArray */}
                        <FlatList
                          renderItem={({ item }) => {
                            const postArrayData = item;
                            return (
                              <>
                                {/* videoComponent */}
                                <>
                                  {!(
                                    postArrayData?.Media_Type === 'Video'
                                  ) ? null : (
                                    <View
                                      style={StyleSheet.applyWidth(
                                        {
                                          backgroundColor: {
                                            minWidth: Breakpoints.Laptop,
                                            value: theme.colors['Ad'],
                                          },
                                          borderRadius: 25,
                                          height: [
                                            {
                                              minWidth: Breakpoints.Laptop,
                                              value: 200,
                                            },
                                            {
                                              minWidth: Breakpoints.Mobile,
                                              value: 200,
                                            },
                                          ],
                                          margin: 10,
                                          maxWidth: 360,
                                          overflow: 'hidden',
                                          width: {
                                            minWidth: Breakpoints.Laptop,
                                            value: 360,
                                          },
                                        },
                                        dimensions.width
                                      )}
                                      removeClippedSubviews={true}
                                    >
                                      {/* media */}
                                      <FlatList
                                        renderItem={({ item }) => {
                                          const mediaData = item;
                                          return (
                                            <>
                                              {/* fetchthumbnail */}
                                              <FlatList
                                                renderItem={({ item }) => {
                                                  const fetchthumbnailData =
                                                    item;
                                                  return (
                                                    <ImageBackground
                                                      style={StyleSheet.applyWidth(
                                                        StyleSheet.compose(
                                                          GlobalStyles.ImageBackgroundStyles(
                                                            theme
                                                          )['Image Background'],
                                                          {
                                                            height: [
                                                              {
                                                                minWidth:
                                                                  Breakpoints.Laptop,
                                                                value: 200,
                                                              },
                                                              {
                                                                minWidth:
                                                                  Breakpoints.Mobile,
                                                                value: 200,
                                                              },
                                                            ],
                                                          }
                                                        ),
                                                        dimensions.width
                                                      )}
                                                      source={{
                                                        uri: `${fetchthumbnailData?.image?.url}`,
                                                      }}
                                                      resizeMode={'cover'}
                                                    >
                                                      <Pressable
                                                        onPress={() => {
                                                          try {
                                                            navigation.navigate(
                                                              'PostScreen',
                                                              {
                                                                post_id:
                                                                  postArrayData?.id,
                                                              }
                                                            );
                                                          } catch (err) {
                                                            console.error(err);
                                                          }
                                                        }}
                                                        style={StyleSheet.applyWidth(
                                                          {
                                                            height: [
                                                              {
                                                                minWidth:
                                                                  Breakpoints.Laptop,
                                                                value: '100%',
                                                              },
                                                              {
                                                                minWidth:
                                                                  Breakpoints.Mobile,
                                                                value: '100%',
                                                              },
                                                            ],
                                                            width: [
                                                              {
                                                                minWidth:
                                                                  Breakpoints.Laptop,
                                                                value: '100%',
                                                              },
                                                              {
                                                                minWidth:
                                                                  Breakpoints.Mobile,
                                                                value: '100%',
                                                              },
                                                            ],
                                                          },
                                                          dimensions.width
                                                        )}
                                                      >
                                                        <View
                                                          style={StyleSheet.applyWidth(
                                                            {
                                                              flex: 1,
                                                              justifyContent:
                                                                'space-between',
                                                            },
                                                            dimensions.width
                                                          )}
                                                        >
                                                          {/* Indicator */}
                                                          <View
                                                            style={StyleSheet.applyWidth(
                                                              {
                                                                alignItems: {
                                                                  minWidth:
                                                                    Breakpoints.Laptop,
                                                                  value:
                                                                    'flex-end',
                                                                },
                                                                alignSelf:
                                                                  'flex-end',
                                                                height: {
                                                                  minWidth:
                                                                    Breakpoints.Laptop,
                                                                  value: 50,
                                                                },
                                                              },
                                                              dimensions.width
                                                            )}
                                                          >
                                                            <View
                                                              style={StyleSheet.applyWidth(
                                                                {
                                                                  alignItems: [
                                                                    {
                                                                      minWidth:
                                                                        Breakpoints.Laptop,
                                                                      value:
                                                                        'center',
                                                                    },
                                                                    {
                                                                      minWidth:
                                                                        Breakpoints.Mobile,
                                                                      value:
                                                                        'center',
                                                                    },
                                                                  ],
                                                                  backgroundColor:
                                                                    [
                                                                      {
                                                                        minWidth:
                                                                          Breakpoints.Laptop,
                                                                        value:
                                                                          theme
                                                                            .colors[
                                                                            'Light'
                                                                          ],
                                                                      },
                                                                      {
                                                                        minWidth:
                                                                          Breakpoints.Mobile,
                                                                        value:
                                                                          theme
                                                                            .colors[
                                                                            'Light'
                                                                          ],
                                                                      },
                                                                    ],
                                                                  borderBottomLeftRadius:
                                                                    [
                                                                      {
                                                                        minWidth:
                                                                          Breakpoints.Laptop,
                                                                        value: 25,
                                                                      },
                                                                      {
                                                                        minWidth:
                                                                          Breakpoints.Mobile,
                                                                        value: 25,
                                                                      },
                                                                    ],
                                                                  borderTopRightRadius:
                                                                    [
                                                                      {
                                                                        minWidth:
                                                                          Breakpoints.Laptop,
                                                                        value: 25,
                                                                      },
                                                                      {
                                                                        minWidth:
                                                                          Breakpoints.Mobile,
                                                                        value: 25,
                                                                      },
                                                                    ],
                                                                  flexDirection:
                                                                    [
                                                                      {
                                                                        minWidth:
                                                                          Breakpoints.Laptop,
                                                                        value:
                                                                          'row',
                                                                      },
                                                                      {
                                                                        minWidth:
                                                                          Breakpoints.Mobile,
                                                                        value:
                                                                          'row',
                                                                      },
                                                                    ],
                                                                  height: [
                                                                    {
                                                                      minWidth:
                                                                        Breakpoints.Laptop,
                                                                      value: 30,
                                                                    },
                                                                    {
                                                                      minWidth:
                                                                        Breakpoints.Mobile,
                                                                      value: 30,
                                                                    },
                                                                  ],
                                                                  justifyContent:
                                                                    [
                                                                      {
                                                                        minWidth:
                                                                          Breakpoints.Laptop,
                                                                        value:
                                                                          'space-evenly',
                                                                      },
                                                                      {
                                                                        minWidth:
                                                                          Breakpoints.Mobile,
                                                                        value:
                                                                          'space-evenly',
                                                                      },
                                                                    ],
                                                                  width: [
                                                                    {
                                                                      minWidth:
                                                                        Breakpoints.Laptop,
                                                                      value: 75,
                                                                    },
                                                                    {
                                                                      minWidth:
                                                                        Breakpoints.Mobile,
                                                                      value: 75,
                                                                    },
                                                                  ],
                                                                },
                                                                dimensions.width
                                                              )}
                                                            >
                                                              <Circle
                                                                size={15}
                                                                bgColor={
                                                                  theme.colors[
                                                                    'Error'
                                                                  ]
                                                                }
                                                              />
                                                              <Text
                                                                style={StyleSheet.applyWidth(
                                                                  StyleSheet.compose(
                                                                    GlobalStyles.TextStyles(
                                                                      theme
                                                                    )['Text'],
                                                                    {
                                                                      color: [
                                                                        {
                                                                          minWidth:
                                                                            Breakpoints.Laptop,
                                                                          value:
                                                                            theme
                                                                              .colors[
                                                                              'Error'
                                                                            ],
                                                                        },
                                                                        {
                                                                          minWidth:
                                                                            Breakpoints.Mobile,
                                                                          value:
                                                                            theme
                                                                              .colors[
                                                                              'Error'
                                                                            ],
                                                                        },
                                                                      ],
                                                                      fontFamily:
                                                                        [
                                                                          {
                                                                            minWidth:
                                                                              Breakpoints.Laptop,
                                                                            value:
                                                                              'AlfaSlabOne_400Regular',
                                                                          },
                                                                          {
                                                                            minWidth:
                                                                              Breakpoints.Mobile,
                                                                            value:
                                                                              'AlfaSlabOne_400Regular',
                                                                          },
                                                                        ],
                                                                    }
                                                                  ),
                                                                  dimensions.width
                                                                )}
                                                              >
                                                                {'Live'}
                                                              </Text>
                                                            </View>
                                                          </View>
                                                          {/* postInfo */}
                                                          <View
                                                            style={StyleSheet.applyWidth(
                                                              {
                                                                alignItems: [
                                                                  {
                                                                    minWidth:
                                                                      Breakpoints.Laptop,
                                                                    value:
                                                                      'center',
                                                                  },
                                                                  {
                                                                    minWidth:
                                                                      Breakpoints.Mobile,
                                                                    value:
                                                                      'center',
                                                                  },
                                                                ],
                                                                backgroundColor:
                                                                  [
                                                                    {
                                                                      minWidth:
                                                                        Breakpoints.Laptop,
                                                                      value:
                                                                        'rgba(255, 255, 255, 0.69)',
                                                                    },
                                                                    {
                                                                      minWidth:
                                                                        Breakpoints.Mobile,
                                                                      value:
                                                                        'rgba(255, 255, 255, 0.6)',
                                                                    },
                                                                  ],
                                                                flexDirection: [
                                                                  {
                                                                    minWidth:
                                                                      Breakpoints.Laptop,
                                                                    value:
                                                                      'row',
                                                                  },
                                                                  {
                                                                    minWidth:
                                                                      Breakpoints.Mobile,
                                                                    value:
                                                                      'row',
                                                                  },
                                                                ],
                                                                padding: [
                                                                  {
                                                                    minWidth:
                                                                      Breakpoints.Laptop,
                                                                    value: 5,
                                                                  },
                                                                  {
                                                                    minWidth:
                                                                      Breakpoints.Mobile,
                                                                    value: 5,
                                                                  },
                                                                ],
                                                              },
                                                              dimensions.width
                                                            )}
                                                          >
                                                            <Circle
                                                              size={50}
                                                              bgColor={
                                                                theme.colors
                                                                  .light
                                                              }
                                                            >
                                                              <Image
                                                                style={StyleSheet.applyWidth(
                                                                  StyleSheet.compose(
                                                                    GlobalStyles.ImageStyles(
                                                                      theme
                                                                    )['Image'],
                                                                    {
                                                                      height: [
                                                                        {
                                                                          minWidth:
                                                                            Breakpoints.Laptop,
                                                                          value:
                                                                            '100%',
                                                                        },
                                                                        {
                                                                          minWidth:
                                                                            Breakpoints.Mobile,
                                                                          value:
                                                                            '100%',
                                                                        },
                                                                      ],
                                                                      width: [
                                                                        {
                                                                          minWidth:
                                                                            Breakpoints.Laptop,
                                                                          value:
                                                                            '100%',
                                                                        },
                                                                        {
                                                                          minWidth:
                                                                            Breakpoints.Mobile,
                                                                          value:
                                                                            '100%',
                                                                        },
                                                                      ],
                                                                    }
                                                                  ),
                                                                  dimensions.width
                                                                )}
                                                                source={{
                                                                  uri: `${postArrayData?.post?.channel?.channelLogo?.url}`,
                                                                }}
                                                                resizeMode={
                                                                  'contain'
                                                                }
                                                              />
                                                            </Circle>

                                                            <View
                                                              style={StyleSheet.applyWidth(
                                                                {
                                                                  flex: [
                                                                    {
                                                                      minWidth:
                                                                        Breakpoints.Laptop,
                                                                      value: 1,
                                                                    },
                                                                    {
                                                                      minWidth:
                                                                        Breakpoints.Mobile,
                                                                      value: 1,
                                                                    },
                                                                  ],
                                                                  marginLeft: [
                                                                    {
                                                                      minWidth:
                                                                        Breakpoints.Laptop,
                                                                      value: 5,
                                                                    },
                                                                    {
                                                                      minWidth:
                                                                        Breakpoints.Mobile,
                                                                      value: 5,
                                                                    },
                                                                  ],
                                                                  marginRight: [
                                                                    {
                                                                      minWidth:
                                                                        Breakpoints.Laptop,
                                                                      value: 5,
                                                                    },
                                                                    {
                                                                      minWidth:
                                                                        Breakpoints.Mobile,
                                                                      value: 5,
                                                                    },
                                                                  ],
                                                                },
                                                                dimensions.width
                                                              )}
                                                            >
                                                              {/* videoTitle */}
                                                              <Text
                                                                style={StyleSheet.applyWidth(
                                                                  GlobalStyles.TextStyles(
                                                                    theme
                                                                  )['Text'],
                                                                  dimensions.width
                                                                )}
                                                                disabled={false}
                                                                ellipsizeMode={
                                                                  'tail'
                                                                }
                                                                numberOfLines={
                                                                  1
                                                                }
                                                              >
                                                                {
                                                                  postArrayData
                                                                    ?.post
                                                                    ?.postName
                                                                }
                                                              </Text>
                                                              {/* channelName */}
                                                              <Text
                                                                style={StyleSheet.applyWidth(
                                                                  GlobalStyles.TextStyles(
                                                                    theme
                                                                  )['Text'],
                                                                  dimensions.width
                                                                )}
                                                              >
                                                                {
                                                                  postArrayData
                                                                    ?.post
                                                                    ?.channel
                                                                    ?.name
                                                                }
                                                              </Text>

                                                              <View
                                                                style={StyleSheet.applyWidth(
                                                                  {
                                                                    flexDirection:
                                                                      [
                                                                        {
                                                                          minWidth:
                                                                            Breakpoints.Laptop,
                                                                          value:
                                                                            'row',
                                                                        },
                                                                        {
                                                                          minWidth:
                                                                            Breakpoints.Mobile,
                                                                          value:
                                                                            'row',
                                                                        },
                                                                      ],
                                                                    justifyContent:
                                                                      [
                                                                        {
                                                                          minWidth:
                                                                            Breakpoints.Laptop,
                                                                          value:
                                                                            'space-between',
                                                                        },
                                                                        {
                                                                          minWidth:
                                                                            Breakpoints.Mobile,
                                                                          value:
                                                                            'space-evenly',
                                                                        },
                                                                      ],
                                                                  },
                                                                  dimensions.width
                                                                )}
                                                              >
                                                                {/* views */}
                                                                <Text
                                                                  style={StyleSheet.applyWidth(
                                                                    StyleSheet.compose(
                                                                      GlobalStyles.TextStyles(
                                                                        theme
                                                                      )['Text'],
                                                                      {
                                                                        fontSize:
                                                                          {
                                                                            minWidth:
                                                                              Breakpoints.Laptop,
                                                                            value: 10,
                                                                          },
                                                                      }
                                                                    ),
                                                                    dimensions.width
                                                                  )}
                                                                >
                                                                  {'# views'}
                                                                </Text>
                                                                {/* likes */}
                                                                <Text
                                                                  style={StyleSheet.applyWidth(
                                                                    StyleSheet.compose(
                                                                      GlobalStyles.TextStyles(
                                                                        theme
                                                                      )['Text'],
                                                                      {
                                                                        fontSize:
                                                                          {
                                                                            minWidth:
                                                                              Breakpoints.Laptop,
                                                                            value: 10,
                                                                          },
                                                                      }
                                                                    ),
                                                                    dimensions.width
                                                                  )}
                                                                >
                                                                  {null}
                                                                  {' likes'}
                                                                </Text>
                                                                {/* dislikes */}
                                                                <Text
                                                                  style={StyleSheet.applyWidth(
                                                                    StyleSheet.compose(
                                                                      GlobalStyles.TextStyles(
                                                                        theme
                                                                      )['Text'],
                                                                      {
                                                                        fontSize:
                                                                          {
                                                                            minWidth:
                                                                              Breakpoints.Laptop,
                                                                            value: 10,
                                                                          },
                                                                      }
                                                                    ),
                                                                    dimensions.width
                                                                  )}
                                                                >
                                                                  {'# dislikes'}
                                                                </Text>
                                                                {/* poseted time */}
                                                                <Text
                                                                  style={StyleSheet.applyWidth(
                                                                    StyleSheet.compose(
                                                                      GlobalStyles.TextStyles(
                                                                        theme
                                                                      )['Text'],
                                                                      {
                                                                        fontSize:
                                                                          {
                                                                            minWidth:
                                                                              Breakpoints.Laptop,
                                                                            value: 10,
                                                                          },
                                                                      }
                                                                    ),
                                                                    dimensions.width
                                                                  )}
                                                                >
                                                                  {
                                                                    'time relative HH:MM'
                                                                  }
                                                                </Text>
                                                              </View>
                                                            </View>
                                                          </View>
                                                        </View>
                                                      </Pressable>
                                                    </ImageBackground>
                                                  );
                                                }}
                                                data={mediaData?.thumbnail}
                                                listKey={JSON.stringify(
                                                  mediaData?.thumbnail
                                                )}
                                                keyExtractor={fetchthumbnailData =>
                                                  fetchthumbnailData
                                                }
                                                numColumns={1}
                                                onEndReachedThreshold={0.5}
                                                showsHorizontalScrollIndicator={
                                                  true
                                                }
                                                showsVerticalScrollIndicator={
                                                  true
                                                }
                                              />
                                            </>
                                          );
                                        }}
                                        data={postArrayData?.post?.media_array}
                                        listKey={JSON.stringify(
                                          postArrayData?.post?.media_array
                                        )}
                                        keyExtractor={mediaData => mediaData}
                                        numColumns={1}
                                        onEndReachedThreshold={0.5}
                                        showsHorizontalScrollIndicator={true}
                                        showsVerticalScrollIndicator={true}
                                      />
                                    </View>
                                  )}
                                </>
                                {/* postComponent */}
                                <>
                                  {!(
                                    postArrayData?.Media_Type === 'Post'
                                  ) ? null : (
                                    <View
                                      style={StyleSheet.applyWidth(
                                        {
                                          backgroundColor:
                                            theme.colors['Medium'],
                                          borderRadius: 15,
                                          flexWrap: 'wrap',
                                          margin: 5,
                                          maxWidth: 400,
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      <Pressable
                                        onPress={() => {
                                          try {
                                            navigation.navigate('PostScreen', {
                                              post_id: postArrayData?.id,
                                            });
                                          } catch (err) {
                                            console.error(err);
                                          }
                                        }}
                                      >
                                        {/* hubUser */}
                                        <FlatList
                                          renderItem={({ item }) => {
                                            const hubUserData = item;
                                            return (
                                              <>
                                                {/* postInfo */}
                                                <View
                                                  style={StyleSheet.applyWidth(
                                                    {
                                                      flexDirection: 'row',
                                                      margin: 5,
                                                    },
                                                    dimensions.width
                                                  )}
                                                >
                                                  <Circle
                                                    size={50}
                                                    bgColor={theme.colors.light}
                                                  >
                                                    <Image
                                                      style={StyleSheet.applyWidth(
                                                        StyleSheet.compose(
                                                          GlobalStyles.ImageStyles(
                                                            theme
                                                          )['Image'],
                                                          {
                                                            height: '100%',
                                                            width: '100%',
                                                          }
                                                        ),
                                                        dimensions.width
                                                      )}
                                                      resizeMode={'contain'}
                                                      source={{
                                                        uri: `${hubUserData?.profilePicture?.url}`,
                                                      }}
                                                    />
                                                  </Circle>

                                                  <View
                                                    style={StyleSheet.applyWidth(
                                                      {
                                                        flex: 1,
                                                        marginLeft: 5,
                                                        marginRight: 5,
                                                      },
                                                      dimensions.width
                                                    )}
                                                  >
                                                    {/* hubName */}
                                                    <Text
                                                      style={StyleSheet.applyWidth(
                                                        StyleSheet.compose(
                                                          GlobalStyles.TextStyles(
                                                            theme
                                                          )['Text'],
                                                          {
                                                            fontFamily:
                                                              'AlfaSlabOne_400Regular',
                                                            fontSize: 15,
                                                          }
                                                        ),
                                                        dimensions.width
                                                      )}
                                                    >
                                                      {hubUserData?.hubName}
                                                    </Text>
                                                    {/* follower Count */}
                                                    <Text
                                                      style={StyleSheet.applyWidth(
                                                        GlobalStyles.TextStyles(
                                                          theme
                                                        )['Text'],
                                                        dimensions.width
                                                      )}
                                                    >
                                                      {
                                                        'Double click me to edit 👀'
                                                      }
                                                    </Text>
                                                    {/* supporterCount */}
                                                    <Text
                                                      style={StyleSheet.applyWidth(
                                                        GlobalStyles.TextStyles(
                                                          theme
                                                        )['Text'],
                                                        dimensions.width
                                                      )}
                                                    >
                                                      {
                                                        'Double click me to edit 👀'
                                                      }
                                                    </Text>
                                                  </View>
                                                  {/* interaction */}
                                                  <View
                                                    style={StyleSheet.applyWidth(
                                                      {
                                                        alignItems: 'center',
                                                        flexDirection: 'row',
                                                      },
                                                      dimensions.width
                                                    )}
                                                  >
                                                    <Pressable>
                                                      <View
                                                        style={StyleSheet.applyWidth(
                                                          {
                                                            alignItems:
                                                              'center',
                                                          },
                                                          dimensions.width
                                                        )}
                                                      >
                                                        <Icon
                                                          name={
                                                            'FontAwesome/photo'
                                                          }
                                                          size={24}
                                                        />
                                                        <Text
                                                          style={StyleSheet.applyWidth(
                                                            GlobalStyles.TextStyles(
                                                              theme
                                                            )['Text'],
                                                            dimensions.width
                                                          )}
                                                        >
                                                          {'like'}
                                                        </Text>
                                                      </View>
                                                    </Pressable>
                                                    {/* Pressable 2 */}
                                                    <Pressable>
                                                      <View
                                                        style={StyleSheet.applyWidth(
                                                          {
                                                            alignItems:
                                                              'center',
                                                          },
                                                          dimensions.width
                                                        )}
                                                      >
                                                        <Icon
                                                          name={
                                                            'FontAwesome/photo'
                                                          }
                                                          size={24}
                                                        />
                                                        <Text
                                                          style={StyleSheet.applyWidth(
                                                            GlobalStyles.TextStyles(
                                                              theme
                                                            )['Text'],
                                                            dimensions.width
                                                          )}
                                                        >
                                                          {'dislike'}
                                                        </Text>
                                                      </View>
                                                    </Pressable>
                                                  </View>
                                                </View>
                                              </>
                                            );
                                          }}
                                          data={postArrayData?.post?.hub_user}
                                          listKey={JSON.stringify(
                                            postArrayData?.post?.hub_user
                                          )}
                                          keyExtractor={hubUserData =>
                                            hubUserData
                                          }
                                          numColumns={1}
                                          onEndReachedThreshold={0.5}
                                          showsHorizontalScrollIndicator={true}
                                          showsVerticalScrollIndicator={true}
                                        />
                                        {/* postMessage */}
                                        <View
                                          style={StyleSheet.applyWidth(
                                            {
                                              backgroundColor:
                                                theme.colors['Light'],
                                              borderRadius: 15,
                                              margin: 5,
                                              padding: 7,
                                            },
                                            dimensions.width
                                          )}
                                        >
                                          <Text
                                            style={StyleSheet.applyWidth(
                                              GlobalStyles.TextStyles(theme)[
                                                'Text'
                                              ],
                                              dimensions.width
                                            )}
                                          >
                                            {postArrayData?.post?.postText}
                                          </Text>
                                        </View>
                                        <>
                                          {(postArrayData?.post?.media_array).toString() ===
                                          checkNull ? null : (
                                            <View
                                              style={StyleSheet.applyWidth(
                                                { minHeight: 200, padding: 10 },
                                                dimensions.width
                                              )}
                                            >
                                              <>
                                                {!postArrayData?.post
                                                  ?.media_array ? null : (
                                                  <Swiper
                                                    renderItem={({ item }) => {
                                                      const swiperData = item;
                                                      return (
                                                        <SwiperItem>
                                                          <View>
                                                            <FlatList
                                                              renderItem={({
                                                                item,
                                                              }) => {
                                                                const listData =
                                                                  item;
                                                                return (
                                                                  <Image
                                                                    style={StyleSheet.applyWidth(
                                                                      StyleSheet.compose(
                                                                        GlobalStyles.ImageStyles(
                                                                          theme
                                                                        )[
                                                                          'Image'
                                                                        ],
                                                                        {
                                                                          height: 200,
                                                                          width:
                                                                            '100%',
                                                                        }
                                                                      ),
                                                                      dimensions.width
                                                                    )}
                                                                    source={{
                                                                      uri: `${listData?.image?.url}`,
                                                                    }}
                                                                    resizeMode={
                                                                      'contain'
                                                                    }
                                                                  />
                                                                );
                                                              }}
                                                              data={
                                                                swiperData?.thumbnail
                                                              }
                                                              listKey={JSON.stringify(
                                                                swiperData?.thumbnail
                                                              )}
                                                              keyExtractor={listData =>
                                                                listData?.id ||
                                                                listData?.uuid ||
                                                                JSON.stringify(
                                                                  listData
                                                                )
                                                              }
                                                              numColumns={1}
                                                              onEndReachedThreshold={
                                                                0.5
                                                              }
                                                              showsHorizontalScrollIndicator={
                                                                true
                                                              }
                                                              showsVerticalScrollIndicator={
                                                                true
                                                              }
                                                            />
                                                          </View>
                                                        </SwiperItem>
                                                      );
                                                    }}
                                                    data={
                                                      postArrayData?.post
                                                        ?.media_array
                                                    }
                                                    listKey={JSON.stringify(
                                                      postArrayData?.post
                                                        ?.media_array
                                                    )}
                                                    keyExtractor={swiperData =>
                                                      swiperData?.id ||
                                                      swiperData?.uuid ||
                                                      JSON.stringify(swiperData)
                                                    }
                                                    style={StyleSheet.applyWidth(
                                                      {
                                                        height: '100%',
                                                        width: '100%',
                                                      },
                                                      dimensions.width
                                                    )}
                                                    dotColor={
                                                      theme.colors.light
                                                    }
                                                    dotActiveColor={
                                                      theme.colors.primary
                                                    }
                                                    dotsTouchable={false}
                                                    loop={true}
                                                  />
                                                )}
                                              </>
                                            </View>
                                          )}
                                        </>
                                      </Pressable>
                                    </View>
                                  )}
                                </>
                              </>
                            );
                          }}
                          data={getPublicPostsData}
                          listKey={'QUFZbtml'}
                          keyExtractor={postArrayData =>
                            postArrayData?.id ||
                            postArrayData?.uuid ||
                            JSON.stringify(postArrayData)
                          }
                          style={StyleSheet.applyWidth(
                            { width: '100%' },
                            dimensions.width
                          )}
                          contentContainerStyle={StyleSheet.applyWidth(
                            {
                              alignContent: [
                                {
                                  minWidth: Breakpoints.Mobile,
                                  value: 'center',
                                },
                                {
                                  minWidth: Breakpoints.Laptop,
                                  value: 'flex-start',
                                },
                              ],
                              flexDirection: {
                                minWidth: Breakpoints.Laptop,
                                value: 'row',
                              },
                              flexWrap: 'wrap',
                            },
                            dimensions.width
                          )}
                          numColumns={1}
                          onEndReachedThreshold={0.5}
                          showsHorizontalScrollIndicator={true}
                          showsVerticalScrollIndicator={true}
                        />
                      </>
                    );
                  }}
                </XanoApiApi.FetchGetAllPublicPostsGET>
              </View>
            )}
          </>
        </View>
        {/* Side menu */}
        <>
          {!sideMenu ? null : (
            <View
              style={StyleSheet.applyWidth(
                {
                  backgroundColor: [
                    {
                      minWidth: Breakpoints.Desktop,
                      value: theme.colors['Secondary'],
                    },
                    {
                      minWidth: Breakpoints.Mobile,
                      value: theme.colors['Strong'],
                    },
                  ],
                  bottom: 0,
                  flex: { minWidth: Breakpoints.Laptop, value: 1.5 },
                  height: [
                    { minWidth: Breakpoints.Desktop, value: '100%' },
                    { minWidth: Breakpoints.Mobile, value: '100%' },
                  ],
                  left: 0,
                  marginLeft: [
                    { minWidth: Breakpoints.Desktop, value: 5 },
                    { minWidth: Breakpoints.Laptop, value: 5 },
                  ],
                  position: [
                    { minWidth: Breakpoints.Mobile, value: 'absolute' },
                    { minWidth: Breakpoints.Laptop, value: 'relative' },
                  ],
                  right: 0,
                  top: 0,
                },
                dimensions.width
              )}
              collapsable={true}
            >
              <ScrollView
                contentContainerStyle={StyleSheet.applyWidth(
                  {
                    backgroundColor: theme.colors['Strong'],
                    bottom: 0,
                    left: 0,
                    position: 'absolute',
                    right: 0,
                    top: 0,
                  },
                  dimensions.width
                )}
                bounces={true}
                horizontal={false}
                showsVerticalScrollIndicator={true}
                showsHorizontalScrollIndicator={false}
              >
                {/* profileButton */}
                <Button
                  onPress={() => {
                    const handler = async () => {
                      try {
                        const currentUser = await XanoApiApi.currentUserGET(
                          Constants
                        );
                        const userId = currentUser?.id;
                        console.log(currentUser);
                        const errorMessage = currentUser?.message;
                        if (userId) {
                          navigation.navigate('HubScreen', { hub: userId });
                        }
                        if (errorMessage) {
                          navigation.navigate('LoginScreen');
                        }
                      } catch (err) {
                        console.error(err);
                      }
                    };
                    handler();
                  }}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.ButtonStyles(theme)['Button'],
                      { backgroundColor: theme.colors['frost'], margin: 5 }
                    ),
                    dimensions.width
                  )}
                  title={'Profile'}
                />
                {/* videosOnly */}
                <Button
                  onPress={() => {
                    try {
                      setMediaType('Video');
                      setSideMenu(!sideMenu);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.ButtonStyles(theme)['Button'],
                      { backgroundColor: theme.colors['Light'], margin: 5 }
                    ),
                    dimensions.width
                  )}
                  title={'Videos'}
                />
                {/* liveOnly */}
                <Button
                  onPress={() => {
                    try {
                      setMediaType('Live');
                      setSideMenu(!sideMenu);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.ButtonStyles(theme)['Button'],
                      { backgroundColor: theme.colors['Light'], margin: 5 }
                    ),
                    dimensions.width
                  )}
                  title={'Live'}
                />
                {/* postOnly */}
                <Button
                  onPress={() => {
                    try {
                      setMediaType('Post');
                      setSideMenu(!sideMenu);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.ButtonStyles(theme)['Button'],
                      { backgroundColor: theme.colors['Light'], margin: 5 }
                    ),
                    dimensions.width
                  )}
                  title={'Posts'}
                />
              </ScrollView>
            </View>
          )}
        </>
      </View>
    </ScreenContainer>
  );
};

export default withTheme(HomeScreen);
