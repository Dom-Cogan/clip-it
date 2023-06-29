import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as XanoApiApi from '../apis/XanoApiApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import getTime from '../global-functions/getTime';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import openImagePickerUtil from '../utils/openImagePicker';
import {
  Button,
  Circle,
  IconButton,
  Pressable,
  ScreenContainer,
  TextInput,
  WebView,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { Fetch } from 'react-request';

const PostScreen = props => {
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;

  const { theme } = props;
  const { navigation } = props;

  const xanoApiCreateANewCommentPOST = XanoApiApi.useCreateANewCommentPOST();
  const xanoApiAddMediaPOST = XanoApiApi.useAddMediaPOST();

  const [checkNull, setCheckNull] = React.useState('');
  const [commentText, setCommentText] = React.useState('');
  const [imageList, setImageList] = React.useState([]);
  const [showVideoInfo, setShowVideoInfo] = React.useState('Details');
  const [textInputValue, setTextInputValue] = React.useState('');

  return (
    <ScreenContainer hasSafeArea={false} scrollable={true}>
      <XanoApiApi.FetchGetSinglePostGET
        post_id={props.route?.params?.post_id ?? 12}
      >
        {({ loading, error, data, refetchGetSinglePost }) => {
          const fetchData = data;
          if (!fetchData || loading) {
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
            <View
              style={StyleSheet.applyWidth(
                { flex: { minWidth: Breakpoints.Laptop, value: 1 } },
                dimensions.width
              )}
            >
              {/* content */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    flex: { minWidth: Breakpoints.Laptop, value: 1 },
                    width: { minWidth: Breakpoints.Laptop, value: '100%' },
                  },
                  dimensions.width
                )}
              >
                {/* header */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: {
                        minWidth: Breakpoints.Laptop,
                        value: 'flex-end',
                      },
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      minHeight: { minWidth: Breakpoints.Laptop, value: 52 },
                      padding: { minWidth: Breakpoints.Laptop, value: 10 },
                      width: { minWidth: Breakpoints.Laptop, value: '100%' },
                    },
                    dimensions.width
                  )}
                >
                  {/* back */}
                  <IconButton
                    onPress={() => {
                      try {
                        navigation.goBack();
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    size={32}
                    icon={'AntDesign/left'}
                  />
                  {/* watermark */}
                  <IconButton size={32} icon={'Feather/menu'} />
                </View>
                {/* page */}
                <View>
                  {/* post */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        flexDirection: [
                          { minWidth: Breakpoints.Laptop, value: 'column' },
                          { minWidth: Breakpoints.Desktop, value: 'row' },
                        ],
                        flexWrap: {
                          minWidth: Breakpoints.Laptop,
                          value: 'wrap',
                        },
                        padding: { minWidth: Breakpoints.Laptop, value: 10 },
                        width: { minWidth: Breakpoints.Laptop, value: '100%' },
                      },
                      dimensions.width
                    )}
                  >
                    {/* content */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          flexDirection: {
                            minWidth: Breakpoints.Laptop,
                            value: 'row',
                          },
                          margin: [
                            { minWidth: Breakpoints.Laptop, value: 5 },
                            { minWidth: Breakpoints.Mobile, value: 5 },
                          ],
                          maxHeight: {
                            minWidth: Breakpoints.BigScreen,
                            value: 1000,
                          },
                          width: {
                            minWidth: Breakpoints.Desktop,
                            value: '100%',
                          },
                        },
                        dimensions.width
                      )}
                    >
                      {/* mediaArray */}
                      <FlatList
                        renderItem={({ item }) => {
                          const mediaArrayData = item;
                          return (
                            <>
                              {/* media */}
                              <FlatList
                                renderItem={({ item }) => {
                                  const mediaData = item;
                                  return (
                                    <>
                                      {/* Post */}
                                      <View
                                        style={StyleSheet.applyWidth(
                                          {
                                            flexDirection: {
                                              minWidth: Breakpoints.Desktop,
                                              value: 'row',
                                            },
                                            width: {
                                              minWidth: Breakpoints.Desktop,
                                              value: '100%',
                                            },
                                          },
                                          dimensions.width
                                        )}
                                      >
                                        {/* video */}
                                        <>
                                          {(mediaData?.videoURL).toString() ===
                                          checkNull ? null : (
                                            <View
                                              style={StyleSheet.applyWidth(
                                                {
                                                  borderRadius: 25,
                                                  margin: 5,
                                                  minHeight: [
                                                    {
                                                      minWidth:
                                                        Breakpoints.Tablet,
                                                      value: 480,
                                                    },
                                                    {
                                                      minWidth:
                                                        Breakpoints.BigScreen,
                                                      value: 720,
                                                    },
                                                    {
                                                      minWidth:
                                                        Breakpoints.Desktop,
                                                      value: 576,
                                                    },
                                                    {
                                                      minWidth:
                                                        Breakpoints.Laptop,
                                                      value: 540,
                                                    },
                                                    {
                                                      minWidth:
                                                        Breakpoints.Mobile,
                                                      value: 200,
                                                    },
                                                  ],
                                                  overflow: 'hidden',
                                                  width: [
                                                    {
                                                      minWidth:
                                                        Breakpoints.Laptop,
                                                      value: '100%',
                                                    },
                                                    {
                                                      minWidth:
                                                        Breakpoints.Desktop,
                                                      value: '60%',
                                                    },
                                                    {
                                                      minWidth:
                                                        Breakpoints.BigScreen,
                                                      value: '70%',
                                                    },
                                                  ],
                                                },
                                                dimensions.width
                                              )}
                                            >
                                              <WebView
                                                style={StyleSheet.applyWidth(
                                                  GlobalStyles.WebViewStyles(
                                                    theme
                                                  )['Web View'],
                                                  dimensions.width
                                                )}
                                                javaScriptEnabled={true}
                                                showsHorizontalScrollIndicator={
                                                  true
                                                }
                                                showsVerticalScrollIndicator={
                                                  true
                                                }
                                                cacheEnabled={true}
                                                source={{
                                                  uri: `${mediaData?.videoURL}`,
                                                }}
                                              />
                                            </View>
                                          )}
                                        </>
                                        {/* Details */}
                                        <View
                                          style={StyleSheet.applyWidth(
                                            {
                                              backgroundColor: [
                                                {
                                                  minWidth: Breakpoints.Laptop,
                                                  value: theme.colors['Light'],
                                                },
                                                {
                                                  minWidth: Breakpoints.Mobile,
                                                  value: theme.colors['Medium'],
                                                },
                                              ],
                                              borderRadius: [
                                                {
                                                  minWidth: Breakpoints.Laptop,
                                                  value: 25,
                                                },
                                                {
                                                  minWidth: Breakpoints.Mobile,
                                                  value: 15,
                                                },
                                              ],
                                              margin: [
                                                {
                                                  minWidth: Breakpoints.Laptop,
                                                  value: 5,
                                                },
                                                {
                                                  minWidth: Breakpoints.Mobile,
                                                  value: 5,
                                                },
                                              ],
                                              padding: [
                                                {
                                                  minWidth: Breakpoints.Laptop,
                                                  value: 10,
                                                },
                                                {
                                                  minWidth: Breakpoints.Mobile,
                                                  value: 10,
                                                },
                                              ],
                                              width: [
                                                {
                                                  minWidth: Breakpoints.Desktop,
                                                  value: '38%',
                                                },
                                                {
                                                  minWidth:
                                                    Breakpoints.BigScreen,
                                                  value: '20%',
                                                },
                                              ],
                                            },
                                            dimensions.width
                                          )}
                                        >
                                          {/* info */}
                                          <View
                                            style={StyleSheet.applyWidth(
                                              {
                                                alignItems: [
                                                  {
                                                    minWidth:
                                                      Breakpoints.Laptop,
                                                    value: 'center',
                                                  },
                                                  {
                                                    minWidth:
                                                      Breakpoints.Mobile,
                                                    value: 'center',
                                                  },
                                                ],
                                                alignSelf: {
                                                  minWidth: Breakpoints.Laptop,
                                                  value: 'flex-end',
                                                },
                                                flexDirection: [
                                                  {
                                                    minWidth:
                                                      Breakpoints.Laptop,
                                                    value: 'row',
                                                  },
                                                  {
                                                    minWidth:
                                                      Breakpoints.Mobile,
                                                    value: 'row',
                                                  },
                                                ],
                                                padding: {
                                                  minWidth: Breakpoints.Laptop,
                                                  value: 10,
                                                },
                                                width: {
                                                  minWidth: Breakpoints.Laptop,
                                                  value: '100%',
                                                },
                                              },
                                              dimensions.width
                                            )}
                                          >
                                            <Pressable
                                              onPress={() => {
                                                try {
                                                  navigation.navigate(
                                                    'ChannelPageScreen'
                                                  );
                                                } catch (err) {
                                                  console.error(err);
                                                }
                                              }}
                                            >
                                              <View
                                                style={StyleSheet.applyWidth(
                                                  {
                                                    alignItems: {
                                                      minWidth:
                                                        Breakpoints.Laptop,
                                                      value: 'center',
                                                    },
                                                    flex: {
                                                      minWidth:
                                                        Breakpoints.Laptop,
                                                      value: 2,
                                                    },
                                                    padding: {
                                                      minWidth:
                                                        Breakpoints.Laptop,
                                                      value: 10,
                                                    },
                                                  },
                                                  dimensions.width
                                                )}
                                              >
                                                <Circle
                                                  bgColor={theme.colors.light}
                                                  size={69}
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
                                                        }
                                                      ),
                                                      dimensions.width
                                                    )}
                                                    resizeMode={'cover'}
                                                    source={{
                                                      uri: `${fetchData?.channel?.channelLogo?.url}`,
                                                    }}
                                                  />
                                                </Circle>
                                              </View>
                                            </Pressable>
                                            {/* details */}
                                            <View
                                              style={StyleSheet.applyWidth(
                                                {
                                                  flex: [
                                                    {
                                                      minWidth:
                                                        Breakpoints.Laptop,
                                                      value: 10,
                                                    },
                                                    {
                                                      minWidth:
                                                        Breakpoints.Mobile,
                                                      value: 1,
                                                    },
                                                  ],
                                                },
                                                dimensions.width
                                              )}
                                            >
                                              {/* channelName */}
                                              <Text
                                                style={StyleSheet.applyWidth(
                                                  StyleSheet.compose(
                                                    GlobalStyles.TextStyles(
                                                      theme
                                                    )['Text'],
                                                    {
                                                      fontFamily: [
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
                                                      fontSize: [
                                                        {
                                                          minWidth:
                                                            Breakpoints.Laptop,
                                                          value: 15,
                                                        },
                                                        {
                                                          minWidth:
                                                            Breakpoints.Mobile,
                                                          value: 20,
                                                        },
                                                      ],
                                                      marginTop: {
                                                        minWidth:
                                                          Breakpoints.Laptop,
                                                        value: 5,
                                                      },
                                                    }
                                                  ),
                                                  dimensions.width
                                                )}
                                              >
                                                {fetchData?.channel?.name}
                                              </Text>
                                              {/* followers */}
                                              <Text
                                                style={StyleSheet.applyWidth(
                                                  StyleSheet.compose(
                                                    GlobalStyles.TextStyles(
                                                      theme
                                                    )['Text'],
                                                    {
                                                      fontSize: {
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
                                                  fetchData?.channel
                                                    ?.followerCount
                                                }
                                                {' Followers'}
                                              </Text>
                                              {/* subscribers */}
                                              <Text
                                                style={StyleSheet.applyWidth(
                                                  StyleSheet.compose(
                                                    GlobalStyles.TextStyles(
                                                      theme
                                                    )['Text'],
                                                    {
                                                      fontSize: {
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
                                                  fetchData?.channel
                                                    ?.supportersCount
                                                }
                                                {' Subscriber'}
                                              </Text>
                                            </View>
                                            {/* interaction */}
                                            <View
                                              style={StyleSheet.applyWidth(
                                                {
                                                  alignItems: {
                                                    minWidth:
                                                      Breakpoints.Laptop,
                                                    value: 'stretch',
                                                  },
                                                  flexDirection: [
                                                    {
                                                      minWidth:
                                                        Breakpoints.Laptop,
                                                      value: 'row',
                                                    },
                                                    {
                                                      minWidth:
                                                        Breakpoints.Mobile,
                                                      value: 'row',
                                                    },
                                                  ],
                                                  padding: {
                                                    minWidth:
                                                      Breakpoints.Laptop,
                                                    value: 5,
                                                  },
                                                },
                                                dimensions.width
                                              )}
                                            >
                                              {/* follow */}
                                              <Button
                                                style={StyleSheet.applyWidth(
                                                  StyleSheet.compose(
                                                    GlobalStyles.ButtonStyles(
                                                      theme
                                                    )['Button'],
                                                    {
                                                      margin: {
                                                        minWidth:
                                                          Breakpoints.Laptop,
                                                        value: 5,
                                                      },
                                                    }
                                                  ),
                                                  dimensions.width
                                                )}
                                                title={'Follow'}
                                              />
                                              {/* support */}
                                              <Button
                                                style={StyleSheet.applyWidth(
                                                  StyleSheet.compose(
                                                    GlobalStyles.ButtonStyles(
                                                      theme
                                                    )['Button'],
                                                    {
                                                      margin: {
                                                        minWidth:
                                                          Breakpoints.Laptop,
                                                        value: 5,
                                                      },
                                                    }
                                                  ),
                                                  dimensions.width
                                                )}
                                                title={'Support'}
                                              />
                                            </View>
                                          </View>
                                          {/* interactable */}
                                          <View
                                            style={StyleSheet.applyWidth(
                                              {
                                                backgroundColor:
                                                  theme.colors['Background'],
                                                borderTopLeftRadius: 10,
                                                borderTopRightRadius: 10,
                                                flexDirection: [
                                                  {
                                                    minWidth:
                                                      Breakpoints.Laptop,
                                                    value: 'row',
                                                  },
                                                  {
                                                    minWidth:
                                                      Breakpoints.Mobile,
                                                    value: 'row',
                                                  },
                                                ],
                                                justifyContent: [
                                                  {
                                                    minWidth:
                                                      Breakpoints.Laptop,
                                                    value: 'flex-start',
                                                  },
                                                  {
                                                    minWidth:
                                                      Breakpoints.Mobile,
                                                    value: 'space-around',
                                                  },
                                                ],
                                                paddingTop: 5,
                                              },
                                              dimensions.width
                                            )}
                                          >
                                            {/* detailsContinued */}
                                            <Pressable
                                              onPress={() => {
                                                try {
                                                  setShowVideoInfo('Details');
                                                } catch (err) {
                                                  console.error(err);
                                                }
                                              }}
                                              style={StyleSheet.applyWidth(
                                                {
                                                  marginRight: {
                                                    minWidth:
                                                      Breakpoints.Laptop,
                                                    value: 5,
                                                  },
                                                  marginTop: {
                                                    minWidth:
                                                      Breakpoints.Laptop,
                                                    value: 5,
                                                  },
                                                },
                                                dimensions.width
                                              )}
                                            >
                                              <View
                                                style={StyleSheet.applyWidth(
                                                  {
                                                    alignItems: {
                                                      minWidth:
                                                        Breakpoints.Laptop,
                                                      value: 'center',
                                                    },
                                                    backgroundColor: {
                                                      minWidth:
                                                        Breakpoints.Laptop,
                                                      value:
                                                        theme.colors[
                                                          'Background'
                                                        ],
                                                    },
                                                    borderTopLeftRadius: {
                                                      minWidth:
                                                        Breakpoints.Laptop,
                                                      value: 10,
                                                    },
                                                    borderTopRightRadius: {
                                                      minWidth:
                                                        Breakpoints.Laptop,
                                                      value: 10,
                                                    },
                                                    justifyContent: {
                                                      minWidth:
                                                        Breakpoints.Laptop,
                                                      value: 'center',
                                                    },
                                                    maxWidth: {
                                                      minWidth:
                                                        Breakpoints.Laptop,
                                                      value: 100,
                                                    },
                                                    padding: {
                                                      minWidth:
                                                        Breakpoints.Laptop,
                                                      value: 5,
                                                    },
                                                  },
                                                  dimensions.width
                                                )}
                                              >
                                                <Text
                                                  style={StyleSheet.applyWidth(
                                                    GlobalStyles.TextStyles(
                                                      theme
                                                    )['Text'],
                                                    dimensions.width
                                                  )}
                                                >
                                                  {'Details'}
                                                </Text>
                                              </View>
                                            </Pressable>
                                            {/* referances */}
                                            <Pressable
                                              onPress={() => {
                                                try {
                                                  console.log(showVideoInfo);
                                                  setShowVideoInfo(
                                                    'References'
                                                  );
                                                } catch (err) {
                                                  console.error(err);
                                                }
                                              }}
                                              style={StyleSheet.applyWidth(
                                                {
                                                  marginRight: {
                                                    minWidth:
                                                      Breakpoints.Laptop,
                                                    value: 5,
                                                  },
                                                  marginTop: {
                                                    minWidth:
                                                      Breakpoints.Laptop,
                                                    value: 5,
                                                  },
                                                },
                                                dimensions.width
                                              )}
                                            >
                                              <View
                                                style={StyleSheet.applyWidth(
                                                  {
                                                    alignItems: {
                                                      minWidth:
                                                        Breakpoints.Laptop,
                                                      value: 'center',
                                                    },
                                                    backgroundColor: {
                                                      minWidth:
                                                        Breakpoints.Laptop,
                                                      value:
                                                        theme.colors[
                                                          'Medium Inverse'
                                                        ],
                                                    },
                                                    borderTopLeftRadius: {
                                                      minWidth:
                                                        Breakpoints.Laptop,
                                                      value: 10,
                                                    },
                                                    borderTopRightRadius: {
                                                      minWidth:
                                                        Breakpoints.Laptop,
                                                      value: 10,
                                                    },
                                                    justifyContent: {
                                                      minWidth:
                                                        Breakpoints.Laptop,
                                                      value: 'center',
                                                    },
                                                    maxWidth: {
                                                      minWidth:
                                                        Breakpoints.Laptop,
                                                      value: 100,
                                                    },
                                                    padding: {
                                                      minWidth:
                                                        Breakpoints.Laptop,
                                                      value: 5,
                                                    },
                                                  },
                                                  dimensions.width
                                                )}
                                              >
                                                <Text
                                                  style={StyleSheet.applyWidth(
                                                    GlobalStyles.TextStyles(
                                                      theme
                                                    )['Text'],
                                                    dimensions.width
                                                  )}
                                                >
                                                  {'References'}
                                                </Text>
                                              </View>
                                            </Pressable>
                                          </View>
                                          {/* contnet */}
                                          <View
                                            style={StyleSheet.applyWidth(
                                              {
                                                backgroundColor: [
                                                  {
                                                    minWidth:
                                                      Breakpoints.Laptop,
                                                    value:
                                                      theme.colors[
                                                        'Background'
                                                      ],
                                                  },
                                                  {
                                                    minWidth:
                                                      Breakpoints.Mobile,
                                                    value:
                                                      theme.colors[
                                                        'Background'
                                                      ],
                                                  },
                                                ],
                                                borderBottomLeftRadius: [
                                                  {
                                                    minWidth:
                                                      Breakpoints.Laptop,
                                                    value: 20,
                                                  },
                                                  {
                                                    minWidth:
                                                      Breakpoints.Mobile,
                                                    value: 10,
                                                  },
                                                ],
                                                borderBottomRightRadius: [
                                                  {
                                                    minWidth:
                                                      Breakpoints.Laptop,
                                                    value: 20,
                                                  },
                                                  {
                                                    minWidth:
                                                      Breakpoints.Mobile,
                                                    value: 10,
                                                  },
                                                ],
                                                flex: 1,
                                                padding: 5,
                                              },
                                              dimensions.width
                                            )}
                                          >
                                            {/* details */}
                                            <>
                                              {!(
                                                showVideoInfo === 'Details'
                                              ) ? null : (
                                                <View
                                                  style={StyleSheet.applyWidth(
                                                    {
                                                      flex: {
                                                        minWidth:
                                                          Breakpoints.Laptop,
                                                        value: 1,
                                                      },
                                                      height: '100%',
                                                      width: '100%',
                                                    },
                                                    dimensions.width
                                                  )}
                                                >
                                                  <View
                                                    style={StyleSheet.applyWidth(
                                                      {
                                                        flexDirection: {
                                                          minWidth:
                                                            Breakpoints.Laptop,
                                                          value: 'row',
                                                        },
                                                        padding: {
                                                          minWidth:
                                                            Breakpoints.Laptop,
                                                          value: 5,
                                                        },
                                                      },
                                                      dimensions.width
                                                    )}
                                                  >
                                                    {/* postName */}
                                                    <Text
                                                      style={StyleSheet.applyWidth(
                                                        StyleSheet.compose(
                                                          GlobalStyles.TextStyles(
                                                            theme
                                                          )['Text'],
                                                          {
                                                            fontFamily: [
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
                                                            fontSize: [
                                                              {
                                                                minWidth:
                                                                  Breakpoints.Laptop,
                                                                value: 20,
                                                              },
                                                              {
                                                                minWidth:
                                                                  Breakpoints.Mobile,
                                                                value: 18,
                                                              },
                                                            ],
                                                            margin: {
                                                              minWidth:
                                                                Breakpoints.Desktop,
                                                              value: 5,
                                                            },
                                                            padding: 10,
                                                          }
                                                        ),
                                                        dimensions.width
                                                      )}
                                                    >
                                                      {fetchData?.postName}
                                                    </Text>
                                                    {/* interactions */}
                                                    <View
                                                      style={StyleSheet.applyWidth(
                                                        {
                                                          alignItems: {
                                                            minWidth:
                                                              Breakpoints.Laptop,
                                                            value: 'stretch',
                                                          },
                                                          flexDirection: [
                                                            {
                                                              minWidth:
                                                                Breakpoints.Laptop,
                                                              value: 'row',
                                                            },
                                                            {
                                                              minWidth:
                                                                Breakpoints.Mobile,
                                                              value: 'row',
                                                            },
                                                          ],
                                                          justifyContent:
                                                            'space-around',
                                                          padding: {
                                                            minWidth:
                                                              Breakpoints.Laptop,
                                                            value: 5,
                                                          },
                                                        },
                                                        dimensions.width
                                                      )}
                                                    >
                                                      {/* Button 2 */}
                                                      <Button
                                                        style={StyleSheet.applyWidth(
                                                          StyleSheet.compose(
                                                            GlobalStyles.ButtonStyles(
                                                              theme
                                                            )['Button'],
                                                            {
                                                              margin: {
                                                                minWidth:
                                                                  Breakpoints.Laptop,
                                                                value: 5,
                                                              },
                                                              minWidth: {
                                                                minWidth:
                                                                  Breakpoints.Desktop,
                                                                value: 75,
                                                              },
                                                            }
                                                          ),
                                                          dimensions.width
                                                        )}
                                                        title={'Like'}
                                                      />
                                                      <Button
                                                        style={StyleSheet.applyWidth(
                                                          StyleSheet.compose(
                                                            GlobalStyles.ButtonStyles(
                                                              theme
                                                            )['Button'],
                                                            {
                                                              margin: {
                                                                minWidth:
                                                                  Breakpoints.Laptop,
                                                                value: 5,
                                                              },
                                                            }
                                                          ),
                                                          dimensions.width
                                                        )}
                                                        title={'Dislike'}
                                                      />
                                                    </View>
                                                  </View>
                                                  {/* View 2 */}
                                                  <View
                                                    style={StyleSheet.applyWidth(
                                                      {
                                                        backgroundColor:
                                                          theme.colors['Light'],
                                                        borderRadius: 10,
                                                        padding: 5,
                                                      },
                                                      dimensions.width
                                                    )}
                                                  >
                                                    <Text
                                                      style={StyleSheet.applyWidth(
                                                        StyleSheet.compose(
                                                          GlobalStyles.TextStyles(
                                                            theme
                                                          )['Text'],
                                                          {
                                                            margin: {
                                                              minWidth:
                                                                Breakpoints.Laptop,
                                                              value: 5,
                                                            },
                                                            paddingLeft: {
                                                              minWidth:
                                                                Breakpoints.Laptop,
                                                              value: 5,
                                                            },
                                                            paddingRight: {
                                                              minWidth:
                                                                Breakpoints.Laptop,
                                                              value: 5,
                                                            },
                                                          }
                                                        ),
                                                        dimensions.width
                                                      )}
                                                    >
                                                      {fetchData?.postText}
                                                    </Text>
                                                  </View>
                                                </View>
                                              )}
                                            </>
                                            {/* references */}
                                            <>
                                              {!(
                                                showVideoInfo === 'References'
                                              ) ? null : (
                                                <View
                                                  style={StyleSheet.applyWidth(
                                                    {
                                                      flexDirection: {
                                                        minWidth:
                                                          Breakpoints.Laptop,
                                                        value: 'row',
                                                      },
                                                      flexWrap: {
                                                        minWidth:
                                                          Breakpoints.Laptop,
                                                        value: 'wrap',
                                                      },
                                                      justifyContent: {
                                                        minWidth:
                                                          Breakpoints.Laptop,
                                                        value: 'center',
                                                      },
                                                    },
                                                    dimensions.width
                                                  )}
                                                >
                                                  {/* component */}
                                                  <View
                                                    style={StyleSheet.applyWidth(
                                                      {
                                                        backgroundColor: {
                                                          minWidth:
                                                            Breakpoints.Laptop,
                                                          value:
                                                            theme.colors[
                                                              'Light'
                                                            ],
                                                        },
                                                        borderRadius: {
                                                          minWidth:
                                                            Breakpoints.Laptop,
                                                          value: 15,
                                                        },
                                                        flexDirection: {
                                                          minWidth:
                                                            Breakpoints.Laptop,
                                                          value: 'row',
                                                        },
                                                        margin: {
                                                          minWidth:
                                                            Breakpoints.Laptop,
                                                          value: 10,
                                                        },
                                                        padding: {
                                                          minWidth:
                                                            Breakpoints.Laptop,
                                                          value: 10,
                                                        },
                                                        width: {
                                                          minWidth:
                                                            Breakpoints.Laptop,
                                                          value: 400,
                                                        },
                                                      },
                                                      dimensions.width
                                                    )}
                                                  >
                                                    <Image
                                                      style={StyleSheet.applyWidth(
                                                        StyleSheet.compose(
                                                          GlobalStyles.ImageStyles(
                                                            theme
                                                          )['Image'],
                                                          {
                                                            height: {
                                                              minWidth:
                                                                Breakpoints.Laptop,
                                                              value: 100,
                                                            },
                                                            width: {
                                                              minWidth:
                                                                Breakpoints.Laptop,
                                                              value: 75,
                                                            },
                                                          }
                                                        ),
                                                        dimensions.width
                                                      )}
                                                      source={{
                                                        uri: 'https://static.draftbit.com/images/placeholder-image.png',
                                                      }}
                                                      resizeMode={'cover'}
                                                    />
                                                    {/* content */}
                                                    <View
                                                      style={StyleSheet.applyWidth(
                                                        {
                                                          flex: {
                                                            minWidth:
                                                              Breakpoints.Laptop,
                                                            value: 1,
                                                          },
                                                          justifyContent: {
                                                            minWidth:
                                                              Breakpoints.Laptop,
                                                            value:
                                                              'space-between',
                                                          },
                                                          marginLeft: {
                                                            minWidth:
                                                              Breakpoints.Laptop,
                                                            value: 10,
                                                          },
                                                        },
                                                        dimensions.width
                                                      )}
                                                    >
                                                      {/* info */}
                                                      <View>
                                                        {/* title */}
                                                        <Text
                                                          style={StyleSheet.applyWidth(
                                                            GlobalStyles.TextStyles(
                                                              theme
                                                            )['Text'],
                                                            dimensions.width
                                                          )}
                                                        >
                                                          {'Reference Title'}
                                                        </Text>
                                                        {/* description */}
                                                        <Text
                                                          style={StyleSheet.applyWidth(
                                                            GlobalStyles.TextStyles(
                                                              theme
                                                            )['Text'],
                                                            dimensions.width
                                                          )}
                                                        >
                                                          {
                                                            'Reference description'
                                                          }
                                                        </Text>
                                                      </View>
                                                      {/* link */}
                                                      <View>
                                                        {/* url */}
                                                        <Text
                                                          style={StyleSheet.applyWidth(
                                                            GlobalStyles.TextStyles(
                                                              theme
                                                            )['Text'],
                                                            dimensions.width
                                                          )}
                                                        >
                                                          {'Reference Url'}
                                                        </Text>
                                                      </View>
                                                    </View>
                                                  </View>
                                                </View>
                                              )}
                                            </>
                                          </View>
                                        </View>
                                      </View>
                                    </>
                                  );
                                }}
                                data={mediaArrayData?.media}
                                listKey={JSON.stringify(mediaArrayData?.media)}
                                keyExtractor={mediaData => mediaData}
                                contentContainerStyle={StyleSheet.applyWidth(
                                  {
                                    backgroundColor: {
                                      minWidth: Breakpoints.Tablet,
                                      value: theme.colors['Ad'],
                                    },
                                    flex: {
                                      minWidth: Breakpoints.Tablet,
                                      value: 1,
                                    },
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
                        data={fetchData?.media_array}
                        listKey={'cHq4ysPU'}
                        keyExtractor={mediaArrayData => mediaArrayData}
                        numColumns={1}
                        onEndReachedThreshold={0.5}
                        showsHorizontalScrollIndicator={true}
                        showsVerticalScrollIndicator={true}
                      />
                    </View>
                  </View>
                  {/* commentSection */}
                  <View
                    style={StyleSheet.applyWidth(
                      { marginTop: 10, padding: 5 },
                      dimensions.width
                    )}
                  >
                    {/* commentList */}
                    <FlatList
                      renderItem={({ item }) => {
                        const commentListData = item;
                        return (
                          <>
                            {/* comment */}
                            <FlatList
                              renderItem={({ item }) => {
                                const commentData = item;
                                return (
                                  <>
                                    {/* commentDetails */}
                                    <View
                                      style={StyleSheet.applyWidth(
                                        {
                                          minHeight: {
                                            minWidth: Breakpoints.Laptop,
                                            value: 100,
                                          },
                                          padding: {
                                            minWidth: Breakpoints.Laptop,
                                            value: 10,
                                          },
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      {/* comment */}
                                      <View
                                        style={StyleSheet.applyWidth(
                                          {
                                            backgroundColor: [
                                              {
                                                minWidth: Breakpoints.Laptop,
                                                value: theme.colors['Light'],
                                              },
                                              {
                                                minWidth: Breakpoints.Mobile,
                                                value: theme.colors['Light'],
                                              },
                                            ],
                                            borderRadius: [
                                              {
                                                minWidth: Breakpoints.Laptop,
                                                value: 15,
                                              },
                                              {
                                                minWidth: Breakpoints.Mobile,
                                                value: 10,
                                              },
                                            ],
                                            marginTop: 5,
                                            padding: 5,
                                          },
                                          dimensions.width
                                        )}
                                      >
                                        {/* commentingUser */}
                                        <FlatList
                                          renderItem={({ item }) => {
                                            const commentingUserData = item;
                                            return (
                                              <>
                                                {/* info */}
                                                <View
                                                  style={StyleSheet.applyWidth(
                                                    {
                                                      alignItems: 'center',
                                                      flexDirection: [
                                                        {
                                                          minWidth:
                                                            Breakpoints.Laptop,
                                                          value: 'row',
                                                        },
                                                        {
                                                          minWidth:
                                                            Breakpoints.Mobile,
                                                          value: 'row',
                                                        },
                                                      ],
                                                      padding: {
                                                        minWidth:
                                                          Breakpoints.Laptop,
                                                        value: 5,
                                                      },
                                                    },
                                                    dimensions.width
                                                  )}
                                                >
                                                  {/* logo */}
                                                  <Circle
                                                    bgColor={theme.colors.light}
                                                    size={50}
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
                                                          }
                                                        ),
                                                        dimensions.width
                                                      )}
                                                      resizeMode={'cover'}
                                                      source={{
                                                        uri: `${commentingUserData?.profilePicture?.url}`,
                                                      }}
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
                                                        margin: {
                                                          minWidth:
                                                            Breakpoints.Laptop,
                                                          value: 5,
                                                        },
                                                      },
                                                      dimensions.width
                                                    )}
                                                  >
                                                    <Text
                                                      style={StyleSheet.applyWidth(
                                                        GlobalStyles.TextStyles(
                                                          theme
                                                        )['Text'],
                                                        dimensions.width
                                                      )}
                                                    >
                                                      {
                                                        commentingUserData?.hubName
                                                      }
                                                    </Text>
                                                    {/* Text 2 */}
                                                    <Text
                                                      style={StyleSheet.applyWidth(
                                                        StyleSheet.compose(
                                                          GlobalStyles.TextStyles(
                                                            theme
                                                          )['Text'],
                                                          {
                                                            fontSize: {
                                                              minWidth:
                                                                Breakpoints.Laptop,
                                                              value: 10,
                                                            },
                                                          }
                                                        ),
                                                        dimensions.width
                                                      )}
                                                    >
                                                      {'posted '}
                                                      {getTime(
                                                        commentData?.created_at
                                                      )}
                                                    </Text>
                                                  </View>
                                                  {/* interaction */}
                                                  <View
                                                    style={StyleSheet.applyWidth(
                                                      {
                                                        alignContent: {
                                                          minWidth:
                                                            Breakpoints.Laptop,
                                                          value: 'stretch',
                                                        },
                                                        flexDirection: [
                                                          {
                                                            minWidth:
                                                              Breakpoints.Laptop,
                                                            value: 'row',
                                                          },
                                                          {
                                                            minWidth:
                                                              Breakpoints.Mobile,
                                                            value: 'row',
                                                          },
                                                        ],
                                                        marginLeft: {
                                                          minWidth:
                                                            Breakpoints.Laptop,
                                                          value: 10,
                                                        },
                                                        marginRight: {
                                                          minWidth:
                                                            Breakpoints.Laptop,
                                                          value: 10,
                                                        },
                                                        width: {
                                                          minWidth:
                                                            Breakpoints.Laptop,
                                                          value: 150,
                                                        },
                                                      },
                                                      dimensions.width
                                                    )}
                                                  >
                                                    {/* dislikes */}
                                                    <View
                                                      style={StyleSheet.applyWidth(
                                                        {
                                                          alignItems: [
                                                            {
                                                              minWidth:
                                                                Breakpoints.Laptop,
                                                              value: 'center',
                                                            },
                                                            {
                                                              minWidth:
                                                                Breakpoints.Mobile,
                                                              value: 'center',
                                                            },
                                                          ],
                                                          padding: {
                                                            minWidth:
                                                              Breakpoints.Laptop,
                                                            value: 5,
                                                          },
                                                        },
                                                        dimensions.width
                                                      )}
                                                    >
                                                      <IconButton
                                                        icon={
                                                          'Entypo/thumbs-down'
                                                        }
                                                        size={18}
                                                      />
                                                      <Text
                                                        style={StyleSheet.applyWidth(
                                                          GlobalStyles.TextStyles(
                                                            theme
                                                          )['Text'],
                                                          dimensions.width
                                                        )}
                                                      >
                                                        {'# of dislikes'}
                                                      </Text>
                                                    </View>
                                                    {/* likes */}
                                                    <View
                                                      style={StyleSheet.applyWidth(
                                                        {
                                                          alignItems: [
                                                            {
                                                              minWidth:
                                                                Breakpoints.Laptop,
                                                              value: 'center',
                                                            },
                                                            {
                                                              minWidth:
                                                                Breakpoints.Mobile,
                                                              value: 'center',
                                                            },
                                                          ],
                                                          padding: {
                                                            minWidth:
                                                              Breakpoints.Laptop,
                                                            value: 5,
                                                          },
                                                        },
                                                        dimensions.width
                                                      )}
                                                    >
                                                      {/* Icon Button 2 */}
                                                      <IconButton
                                                        icon={
                                                          'Entypo/thumbs-up'
                                                        }
                                                        size={18}
                                                      />
                                                      <Text
                                                        style={StyleSheet.applyWidth(
                                                          GlobalStyles.TextStyles(
                                                            theme
                                                          )['Text'],
                                                          dimensions.width
                                                        )}
                                                      >
                                                        {'# of Likes'}
                                                      </Text>
                                                    </View>
                                                  </View>
                                                </View>
                                              </>
                                            );
                                          }}
                                          data={commentData?.commenting_user}
                                          listKey={JSON.stringify(
                                            commentData?.commenting_user
                                          )}
                                          keyExtractor={commentingUserData =>
                                            commentingUserData
                                          }
                                          numColumns={1}
                                          onEndReachedThreshold={0.5}
                                          showsHorizontalScrollIndicator={true}
                                          showsVerticalScrollIndicator={true}
                                        />
                                        {/* content */}
                                        <View
                                          style={StyleSheet.applyWidth(
                                            {
                                              alignItems: {
                                                minWidth: Breakpoints.Laptop,
                                                value: 'stretch',
                                              },
                                              backgroundColor: {
                                                minWidth: Breakpoints.Laptop,
                                                value:
                                                  'rgba(255, 255, 255, 0.2)',
                                              },
                                              borderRadius: {
                                                minWidth: Breakpoints.Laptop,
                                                value: 10,
                                              },
                                              flex: {
                                                minWidth: Breakpoints.Laptop,
                                                value: 1,
                                              },
                                              padding: [
                                                {
                                                  minWidth: Breakpoints.Laptop,
                                                  value: 5,
                                                },
                                                {
                                                  minWidth: Breakpoints.Mobile,
                                                  value: 5,
                                                },
                                              ],
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
                                            {commentData?.commentText}
                                          </Text>
                                        </View>

                                        <View
                                          style={StyleSheet.applyWidth(
                                            {
                                              alignItems: {
                                                minWidth: Breakpoints.Desktop,
                                                value: 'center',
                                              },
                                              padding: 5,
                                            },
                                            dimensions.width
                                          )}
                                        >
                                          {/* add_reply */}
                                          <View
                                            style={StyleSheet.applyWidth(
                                              {
                                                alignItems: 'center',
                                                alignSelf: [
                                                  {
                                                    minWidth:
                                                      Breakpoints.Tablet,
                                                    value: 'center',
                                                  },
                                                  {
                                                    minWidth:
                                                      Breakpoints.Mobile,
                                                    value: 'center',
                                                  },
                                                ],
                                                backgroundColor:
                                                  theme.colors['Medium'],
                                                borderRadius: 10,
                                                flexDirection: [
                                                  {
                                                    minWidth:
                                                      Breakpoints.Laptop,
                                                    value: 'row',
                                                  },
                                                  {
                                                    minWidth:
                                                      Breakpoints.Mobile,
                                                    value: 'row',
                                                  },
                                                ],
                                                marginBottom: 2,
                                                marginLeft: {
                                                  minWidth: Breakpoints.Laptop,
                                                  value: 25,
                                                },
                                                marginTop: 2,
                                                maxWidth: 600,
                                                padding: 5,
                                                width: '100%',
                                              },
                                              dimensions.width
                                            )}
                                          >
                                            <TextInput
                                              onChangeText={newTextInputValue => {
                                                const textInputValue =
                                                  newTextInputValue;
                                                try {
                                                  setCommentText(
                                                    newTextInputValue
                                                  );
                                                } catch (err) {
                                                  console.error(err);
                                                }
                                              }}
                                              style={StyleSheet.applyWidth(
                                                StyleSheet.compose(
                                                  GlobalStyles.TextInputStyles(
                                                    theme
                                                  )['Text Input'],
                                                  {
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
                                                  }
                                                ),
                                                dimensions.width
                                              )}
                                              changeTextDelay={500}
                                              autoCapitalize={'none'}
                                              placeholder={'Enter a value...'}
                                              value={textInputValue}
                                            />
                                            {/* imagePicker */}
                                            <IconButton
                                              onPress={() => {
                                                const handler = async () => {
                                                  try {
                                                    const Image =
                                                      await openImagePickerUtil(
                                                        { mediaTypes: 'Images' }
                                                      );
                                                    setImageList(
                                                      imageList.concat([Image])
                                                    );
                                                  } catch (err) {
                                                    console.error(err);
                                                  }
                                                };
                                                handler();
                                              }}
                                              style={StyleSheet.applyWidth(
                                                {
                                                  marginBottom: {
                                                    minWidth:
                                                      Breakpoints.Laptop,
                                                    value: 10,
                                                  },
                                                  marginLeft: {
                                                    minWidth:
                                                      Breakpoints.Laptop,
                                                    value: 5,
                                                  },
                                                  marginRight: {
                                                    minWidth:
                                                      Breakpoints.Laptop,
                                                    value: 5,
                                                  },
                                                  marginTop: {
                                                    minWidth:
                                                      Breakpoints.Laptop,
                                                    value: 10,
                                                  },
                                                },
                                                dimensions.width
                                              )}
                                              size={32}
                                              icon={'Ionicons/attach'}
                                            />
                                            {/* Icon Button 2 */}
                                            <IconButton
                                              onPress={() => {
                                                const handler = async () => {
                                                  try {
                                                    if (
                                                      Constants[
                                                        'AUTH_HEADER'
                                                      ].toString() === checkNull
                                                    ) {
                                                      navigation.navigate(
                                                        'LoginScreen'
                                                      );
                                                    }
                                                    await xanoApiCreateANewCommentPOST.mutateAsync(
                                                      {
                                                        comment: commentText,
                                                        mediaId: AddMedia,
                                                        postId: fetchData?.id,
                                                        userId:
                                                          Constants[
                                                            'AUTH_HEADER'
                                                          ],
                                                      }
                                                    );
                                                    const AddMedia =
                                                      await xanoApiAddMediaPOST.mutateAsync(
                                                        {
                                                          image: imageList,
                                                          postId: fetchData?.id,
                                                          videoURL: '',
                                                        }
                                                      );
                                                  } catch (err) {
                                                    console.error(err);
                                                  }
                                                };
                                                handler();
                                              }}
                                              style={StyleSheet.applyWidth(
                                                {
                                                  marginBottom: {
                                                    minWidth:
                                                      Breakpoints.Laptop,
                                                    value: 10,
                                                  },
                                                  marginLeft: {
                                                    minWidth:
                                                      Breakpoints.Laptop,
                                                    value: 5,
                                                  },
                                                  marginRight: {
                                                    minWidth:
                                                      Breakpoints.Laptop,
                                                    value: 5,
                                                  },
                                                  marginTop: {
                                                    minWidth:
                                                      Breakpoints.Laptop,
                                                    value: 10,
                                                  },
                                                },
                                                dimensions.width
                                              )}
                                              size={32}
                                              icon={'Ionicons/send'}
                                            />
                                          </View>
                                        </View>
                                      </View>
                                      <>
                                        {(commentData?.replys_id).toString() ===
                                        checkNull ? null : (
                                          <View
                                            style={StyleSheet.applyWidth(
                                              {
                                                borderRadius: 5,
                                                overflow: 'hidden',
                                              },
                                              dimensions.width
                                            )}
                                          >
                                            <View
                                              style={StyleSheet.applyWidth(
                                                {
                                                  backgroundColor:
                                                    theme.colors['Light'],
                                                  borderRadius: 10,
                                                  marginLeft: 15,
                                                  marginRight: 15,
                                                  overflow: 'hidden',
                                                  padding: 5,
                                                },
                                                dimensions.width
                                              )}
                                            >
                                              {/* replys_id */}
                                              <FlatList
                                                renderItem={({ item }) => {
                                                  const replysIdData = item;
                                                  return (
                                                    <>
                                                      {/* replys */}
                                                      <FlatList
                                                        renderItem={({
                                                          item,
                                                        }) => {
                                                          const replysData =
                                                            item;
                                                          return (
                                                            <>
                                                              {/* reply */}
                                                              <View
                                                                style={StyleSheet.applyWidth(
                                                                  StyleSheet.compose(
                                                                    GlobalStyles.ViewStyles(
                                                                      theme
                                                                    )[
                                                                      'commentsComponent 2'
                                                                    ],
                                                                    {
                                                                      borderBottomLeftRadius: 10,
                                                                      borderBottomRightRadius: 10,
                                                                      overflow:
                                                                        'hidden',
                                                                    }
                                                                  ),
                                                                  dimensions.width
                                                                )}
                                                              >
                                                                {/* info */}
                                                                <View
                                                                  style={StyleSheet.applyWidth(
                                                                    {
                                                                      alignItems:
                                                                        {
                                                                          minWidth:
                                                                            Breakpoints.Laptop,
                                                                          value:
                                                                            'center',
                                                                        },
                                                                      flexDirection:
                                                                        {
                                                                          minWidth:
                                                                            Breakpoints.Laptop,
                                                                          value:
                                                                            'row',
                                                                        },
                                                                      marginTop: 5,
                                                                      padding: {
                                                                        minWidth:
                                                                          Breakpoints.Laptop,
                                                                        value: 5,
                                                                      },
                                                                    },
                                                                    dimensions.width
                                                                  )}
                                                                >
                                                                  {/* replyingUser */}
                                                                  <FlatList
                                                                    renderItem={({
                                                                      item,
                                                                    }) => {
                                                                      const replyingUserData =
                                                                        item;
                                                                      return (
                                                                        <View
                                                                          style={StyleSheet.applyWidth(
                                                                            {
                                                                              alignItems:
                                                                                'center',
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
                                                                            },
                                                                            dimensions.width
                                                                          )}
                                                                        >
                                                                          {/* logo */}
                                                                          <Circle
                                                                            bgColor={
                                                                              theme
                                                                                .colors
                                                                                .light
                                                                            }
                                                                            size={
                                                                              50
                                                                            }
                                                                          >
                                                                            <Image
                                                                              style={StyleSheet.applyWidth(
                                                                                StyleSheet.compose(
                                                                                  GlobalStyles.ImageStyles(
                                                                                    theme
                                                                                  )[
                                                                                    'Image'
                                                                                  ],
                                                                                  {
                                                                                    height:
                                                                                      [
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
                                                                                    width:
                                                                                      [
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
                                                                              resizeMode={
                                                                                'cover'
                                                                              }
                                                                              source={{
                                                                                uri: `${replyingUserData?.profilePicture?.url}`,
                                                                              }}
                                                                            />
                                                                          </Circle>
                                                                          {/* hubName */}
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
                                                                                margin:
                                                                                  {
                                                                                    minWidth:
                                                                                      Breakpoints.Laptop,
                                                                                    value: 5,
                                                                                  },
                                                                              },
                                                                              dimensions.width
                                                                            )}
                                                                          >
                                                                            {/* replying_user */}
                                                                            <Text
                                                                              style={StyleSheet.applyWidth(
                                                                                GlobalStyles.TextStyles(
                                                                                  theme
                                                                                )[
                                                                                  'Text'
                                                                                ],
                                                                                dimensions.width
                                                                              )}
                                                                            >
                                                                              {
                                                                                replyingUserData?.hubName
                                                                              }
                                                                            </Text>
                                                                            {/* poseted_time */}
                                                                            <Text
                                                                              style={StyleSheet.applyWidth(
                                                                                StyleSheet.compose(
                                                                                  GlobalStyles.TextStyles(
                                                                                    theme
                                                                                  )[
                                                                                    'Text'
                                                                                  ],
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
                                                                                'posted '
                                                                              }
                                                                              {getTime(
                                                                                replysData?.created_at
                                                                              )}
                                                                            </Text>
                                                                          </View>
                                                                          {/* interaction */}
                                                                          <View
                                                                            style={StyleSheet.applyWidth(
                                                                              {
                                                                                alignContent:
                                                                                  {
                                                                                    minWidth:
                                                                                      Breakpoints.Laptop,
                                                                                    value:
                                                                                      'stretch',
                                                                                  },
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
                                                                                  {
                                                                                    minWidth:
                                                                                      Breakpoints.Laptop,
                                                                                    value:
                                                                                      'flex-end',
                                                                                  },
                                                                                marginLeft:
                                                                                  {
                                                                                    minWidth:
                                                                                      Breakpoints.Laptop,
                                                                                    value: 10,
                                                                                  },
                                                                                marginRight:
                                                                                  {
                                                                                    minWidth:
                                                                                      Breakpoints.Laptop,
                                                                                    value: 10,
                                                                                  },
                                                                                width:
                                                                                  {
                                                                                    minWidth:
                                                                                      Breakpoints.Laptop,
                                                                                    value: 150,
                                                                                  },
                                                                              },
                                                                              dimensions.width
                                                                            )}
                                                                          >
                                                                            {/* dislikes */}
                                                                            <View
                                                                              style={StyleSheet.applyWidth(
                                                                                {
                                                                                  alignItems:
                                                                                    [
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
                                                                                  padding:
                                                                                    {
                                                                                      minWidth:
                                                                                        Breakpoints.Laptop,
                                                                                      value: 5,
                                                                                    },
                                                                                },
                                                                                dimensions.width
                                                                              )}
                                                                            >
                                                                              <IconButton
                                                                                icon={
                                                                                  'Entypo/thumbs-down'
                                                                                }
                                                                                size={
                                                                                  18
                                                                                }
                                                                              />
                                                                              <Text
                                                                                style={StyleSheet.applyWidth(
                                                                                  GlobalStyles.TextStyles(
                                                                                    theme
                                                                                  )[
                                                                                    'Text'
                                                                                  ],
                                                                                  dimensions.width
                                                                                )}
                                                                              >
                                                                                {
                                                                                  '# dislikes'
                                                                                }
                                                                              </Text>
                                                                            </View>
                                                                            {/* likes */}
                                                                            <View
                                                                              style={StyleSheet.applyWidth(
                                                                                {
                                                                                  alignItems:
                                                                                    [
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
                                                                                  padding:
                                                                                    {
                                                                                      minWidth:
                                                                                        Breakpoints.Laptop,
                                                                                      value: 5,
                                                                                    },
                                                                                },
                                                                                dimensions.width
                                                                              )}
                                                                            >
                                                                              {/* Icon Button 2 */}
                                                                              <IconButton
                                                                                icon={
                                                                                  'Entypo/thumbs-up'
                                                                                }
                                                                                size={
                                                                                  18
                                                                                }
                                                                              />
                                                                              <Text
                                                                                style={StyleSheet.applyWidth(
                                                                                  GlobalStyles.TextStyles(
                                                                                    theme
                                                                                  )[
                                                                                    'Text'
                                                                                  ],
                                                                                  dimensions.width
                                                                                )}
                                                                              >
                                                                                {
                                                                                  '# Likes'
                                                                                }
                                                                              </Text>
                                                                            </View>
                                                                          </View>
                                                                        </View>
                                                                      );
                                                                    }}
                                                                    data={
                                                                      replysData?.Replying_user
                                                                    }
                                                                    listKey={JSON.stringify(
                                                                      replysData?.Replying_user
                                                                    )}
                                                                    keyExtractor={replyingUserData =>
                                                                      replyingUserData
                                                                    }
                                                                    style={StyleSheet.applyWidth(
                                                                      {
                                                                        width: {
                                                                          minWidth:
                                                                            Breakpoints.Laptop,
                                                                          value:
                                                                            '100%',
                                                                        },
                                                                      },
                                                                      dimensions.width
                                                                    )}
                                                                    contentContainerStyle={StyleSheet.applyWidth(
                                                                      {
                                                                        flexDirection:
                                                                          {
                                                                            minWidth:
                                                                              Breakpoints.Laptop,
                                                                            value:
                                                                              'row',
                                                                          },
                                                                      },
                                                                      dimensions.width
                                                                    )}
                                                                    numColumns={
                                                                      1
                                                                    }
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
                                                                {/* content */}
                                                                <View
                                                                  style={StyleSheet.applyWidth(
                                                                    {
                                                                      alignItems:
                                                                        {
                                                                          minWidth:
                                                                            Breakpoints.Laptop,
                                                                          value:
                                                                            'stretch',
                                                                        },
                                                                      backgroundColor:
                                                                        {
                                                                          minWidth:
                                                                            Breakpoints.Laptop,
                                                                          value:
                                                                            'rgba(255, 255, 255, 0.2)',
                                                                        },
                                                                      borderRadius:
                                                                        {
                                                                          minWidth:
                                                                            Breakpoints.Laptop,
                                                                          value: 10,
                                                                        },
                                                                      flex: {
                                                                        minWidth:
                                                                          Breakpoints.Laptop,
                                                                        value: 1,
                                                                      },
                                                                      padding: {
                                                                        minWidth:
                                                                          Breakpoints.Laptop,
                                                                        value: 5,
                                                                      },
                                                                    },
                                                                    dimensions.width
                                                                  )}
                                                                >
                                                                  <Text
                                                                    style={StyleSheet.applyWidth(
                                                                      StyleSheet.compose(
                                                                        GlobalStyles.TextStyles(
                                                                          theme
                                                                        )[
                                                                          'Text'
                                                                        ],
                                                                        {
                                                                          margin: 5,
                                                                        }
                                                                      ),
                                                                      dimensions.width
                                                                    )}
                                                                  >
                                                                    {
                                                                      replysData?.commentText
                                                                    }
                                                                  </Text>
                                                                </View>
                                                                {/* add_reply */}
                                                                <View
                                                                  style={StyleSheet.applyWidth(
                                                                    {
                                                                      alignItems:
                                                                        'center',
                                                                      backgroundColor:
                                                                        theme
                                                                          .colors[
                                                                          'Medium'
                                                                        ],
                                                                      borderRadius: 10,
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
                                                                      marginLeft:
                                                                        {
                                                                          minWidth:
                                                                            Breakpoints.Laptop,
                                                                          value: 25,
                                                                        },
                                                                      marginTop: 5,
                                                                      padding: 5,
                                                                    },
                                                                    dimensions.width
                                                                  )}
                                                                >
                                                                  <TextInput
                                                                    onChangeText={newTextInputValue => {
                                                                      const textInputValue =
                                                                        newTextInputValue;
                                                                      try {
                                                                        setTextInputValue(
                                                                          textInputValue
                                                                        );
                                                                      } catch (err) {
                                                                        console.error(
                                                                          err
                                                                        );
                                                                      }
                                                                    }}
                                                                    style={StyleSheet.applyWidth(
                                                                      StyleSheet.compose(
                                                                        GlobalStyles.TextInputStyles(
                                                                          theme
                                                                        )[
                                                                          'Text Input'
                                                                        ],
                                                                        {
                                                                          width:
                                                                            [
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
                                                                    changeTextDelay={
                                                                      500
                                                                    }
                                                                    autoCapitalize={
                                                                      'none'
                                                                    }
                                                                    placeholder={
                                                                      'Enter a value...'
                                                                    }
                                                                    value={
                                                                      textInputValue
                                                                    }
                                                                  />
                                                                  <IconButton
                                                                    style={StyleSheet.applyWidth(
                                                                      {
                                                                        marginBottom:
                                                                          {
                                                                            minWidth:
                                                                              Breakpoints.Laptop,
                                                                            value: 10,
                                                                          },
                                                                        marginLeft:
                                                                          {
                                                                            minWidth:
                                                                              Breakpoints.Laptop,
                                                                            value: 5,
                                                                          },
                                                                        marginRight:
                                                                          {
                                                                            minWidth:
                                                                              Breakpoints.Laptop,
                                                                            value: 5,
                                                                          },
                                                                        marginTop:
                                                                          {
                                                                            minWidth:
                                                                              Breakpoints.Laptop,
                                                                            value: 10,
                                                                          },
                                                                      },
                                                                      dimensions.width
                                                                    )}
                                                                    size={32}
                                                                    icon={
                                                                      'Ionicons/attach'
                                                                    }
                                                                  />
                                                                  {/* Icon Button 2 */}
                                                                  <IconButton
                                                                    onPress={() => {
                                                                      const handler =
                                                                        async () => {
                                                                          try {
                                                                            const currentUser =
                                                                              await XanoApiApi.currentUserGET(
                                                                                Constants
                                                                              );
                                                                            console.log(
                                                                              currentUser
                                                                            );
                                                                          } catch (err) {
                                                                            console.error(
                                                                              err
                                                                            );
                                                                          }
                                                                        };
                                                                      handler();
                                                                    }}
                                                                    style={StyleSheet.applyWidth(
                                                                      {
                                                                        marginBottom:
                                                                          {
                                                                            minWidth:
                                                                              Breakpoints.Laptop,
                                                                            value: 10,
                                                                          },
                                                                        marginLeft:
                                                                          {
                                                                            minWidth:
                                                                              Breakpoints.Laptop,
                                                                            value: 5,
                                                                          },
                                                                        marginRight:
                                                                          {
                                                                            minWidth:
                                                                              Breakpoints.Laptop,
                                                                            value: 5,
                                                                          },
                                                                        marginTop:
                                                                          {
                                                                            minWidth:
                                                                              Breakpoints.Laptop,
                                                                            value: 10,
                                                                          },
                                                                      },
                                                                      dimensions.width
                                                                    )}
                                                                    size={32}
                                                                    icon={
                                                                      'Ionicons/send'
                                                                    }
                                                                  />
                                                                </View>
                                                              </View>
                                                            </>
                                                          );
                                                        }}
                                                        data={
                                                          replysIdData?.replys
                                                        }
                                                        listKey={JSON.stringify(
                                                          replysIdData?.replys
                                                        )}
                                                        keyExtractor={replysData =>
                                                          replysData
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
                                                    </>
                                                  );
                                                }}
                                                data={commentData?.replys_id}
                                                listKey={JSON.stringify(
                                                  commentData?.replys_id
                                                )}
                                                keyExtractor={replysIdData =>
                                                  replysIdData?.replys
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
                                            </View>
                                          </View>
                                        )}
                                      </>
                                    </View>
                                  </>
                                );
                              }}
                              data={commentListData?.comments_in_post}
                              listKey={JSON.stringify(
                                commentListData?.comments_in_post
                              )}
                              keyExtractor={commentData => commentData}
                              numColumns={1}
                              onEndReachedThreshold={0.5}
                              showsHorizontalScrollIndicator={true}
                              showsVerticalScrollIndicator={true}
                            />
                          </>
                        );
                      }}
                      data={fetchData?.comments_id}
                      listKey={'zZ7fIgMO'}
                      keyExtractor={commentListData => commentListData}
                      numColumns={1}
                      onEndReachedThreshold={0.5}
                      showsHorizontalScrollIndicator={true}
                      showsVerticalScrollIndicator={true}
                    />
                  </View>
                </View>
              </View>
            </View>
          );
        }}
      </XanoApiApi.FetchGetSinglePostGET>
      {/* sideMenu */}
      <View />
    </ScreenContainer>
  );
};

export default withTheme(PostScreen);
