import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as XanoApiApi from '../apis/XanoApiApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import getTime from '../global-functions/getTime';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import openImagePickerUtil from '../utils/openImagePicker';
import {
  Circle,
  Icon,
  IconButton,
  Pressable,
  ScreenContainer,
  TextInput,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { Fetch } from 'react-request';

const HubScreen = props => {
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();

  const { theme } = props;
  const { navigation } = props;

  const [addImage, setAddImage] = React.useState({});
  const [checkNull, setCheckNull] = React.useState('');
  const [hub, setHub] = React.useState({});
  const [inputText, setInputText] = React.useState('');
  const [replyComment, setReplyComment] = React.useState(false);
  const [textInputValue, setTextInputValue] = React.useState('');

  return (
    <ScreenContainer hasSafeArea={false} scrollable={true}>
      {/* page */}
      <View
        style={StyleSheet.applyWidth(
          {
            flex: { minWidth: Breakpoints.Laptop, value: 1 },
            flexDirection: { minWidth: Breakpoints.Laptop, value: 'row' },
            justifyContent: { minWidth: Breakpoints.Laptop, value: 'center' },
          },
          dimensions.width
        )}
        collapsable={false}
      >
        {/* fetchHub */}
        <XanoApiApi.FetchGetHubGET hub_user_id={props.route?.params?.hub ?? 1}>
          {({ loading, error, data, refetchGetHub }) => {
            const fetchHubData = data;
            if (!fetchHubData || loading) {
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
                {/* profile */}
                <View
                  style={StyleSheet.applyWidth({ flex: 4 }, dimensions.width)}
                >
                  {/* banner */}
                  <ImageBackground
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.ImageBackgroundStyles(theme)[
                          'Image Background'
                        ],
                        {
                          flexDirection: [
                            { minWidth: Breakpoints.Laptop, value: 'column' },
                            { minWidth: Breakpoints.Mobile, value: 'column' },
                          ],
                          height: [
                            { minWidth: Breakpoints.Laptop, value: '100%' },
                            { minWidth: Breakpoints.Mobile, value: 200 },
                          ],
                          justifyContent: [
                            {
                              minWidth: Breakpoints.Laptop,
                              value: 'space-between',
                            },
                            {
                              minWidth: Breakpoints.Mobile,
                              value: 'space-between',
                            },
                          ],
                          padding: [
                            { minWidth: Breakpoints.Laptop, value: 10 },
                            { minWidth: Breakpoints.Mobile, value: 10 },
                          ],
                        }
                      ),
                      dimensions.width
                    )}
                    source={{ uri: `${fetchHubData?.bannerPhoto?.url}` }}
                    resizeMode={'cover'}
                  >
                    {/* info */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          flexDirection: 'row',
                          height: { minWidth: Breakpoints.Laptop, value: 175 },
                          justifyContent: 'space-between',
                        },
                        dimensions.width
                      )}
                    >
                      {/* hubName */}
                      <Text
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.TextStyles(theme)['Text'],
                            {
                              fontFamily: [
                                {
                                  minWidth: Breakpoints.Laptop,
                                  value: 'AlfaSlabOne_400Regular',
                                },
                                {
                                  minWidth: Breakpoints.Tablet,
                                  value: 'AlfaSlabOne_400Regular',
                                },
                              ],
                              fontSize: [
                                { minWidth: Breakpoints.Laptop, value: 20 },
                                { minWidth: Breakpoints.Tablet, value: 32 },
                              ],
                            }
                          ),
                          dimensions.width
                        )}
                      >
                        {fetchHubData?.hubName}
                      </Text>
                      {/* watermark */}
                      <>
                        {Constants['showSidemenu'] ? null : (
                          <Pressable
                            onPress={() => {
                              try {
                                setGlobalVariableValue({
                                  key: 'showSidemenu',
                                  value: true,
                                });
                              } catch (err) {
                                console.error(err);
                              }
                            }}
                          >
                            <Icon size={30} name={'Feather/menu'} />
                          </Pressable>
                        )}
                      </>
                    </View>
                    {/* interaction */}
                    <View
                      style={StyleSheet.applyWidth(
                        { alignItems: 'center', flexDirection: 'row' },
                        dimensions.width
                      )}
                    >
                      {/* follower */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignItems: 'center',
                            alignSelf: {
                              minWidth: Breakpoints.Laptop,
                              value: 'flex-end',
                            },
                            flexDirection: [
                              { minWidth: Breakpoints.Laptop, value: 'row' },
                              { minWidth: Breakpoints.Mobile, value: 'row' },
                            ],
                            margin: { minWidth: Breakpoints.Laptop, value: 10 },
                          },
                          dimensions.width
                        )}
                      >
                        {/* Icon Button 2 */}
                        <IconButton
                          style={StyleSheet.applyWidth(
                            {
                              marginBottom: {
                                minWidth: Breakpoints.Laptop,
                                value: 5,
                              },
                              marginLeft: {
                                minWidth: Breakpoints.Laptop,
                                value: 5,
                              },
                              marginRight: {
                                minWidth: Breakpoints.Laptop,
                                value: 5,
                              },
                              marginTop: {
                                minWidth: Breakpoints.Laptop,
                                value: 5,
                              },
                            },
                            dimensions.width
                          )}
                          size={32}
                          icon={'SimpleLineIcons/user-follow'}
                          color={theme.colors['Primary']}
                        />
                        {/* Text 2 */}
                        <Text
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)['Text'],
                              {
                                margin: {
                                  minWidth: Breakpoints.Laptop,
                                  value: 5,
                                },
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'Follower Count'}
                        </Text>
                      </View>
                      {/* subscribers */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignItems: 'center',
                            alignSelf: {
                              minWidth: Breakpoints.Laptop,
                              value: 'flex-end',
                            },
                            flexDirection: [
                              { minWidth: Breakpoints.Laptop, value: 'row' },
                              { minWidth: Breakpoints.Mobile, value: 'row' },
                            ],
                            margin: { minWidth: Breakpoints.Laptop, value: 10 },
                            marginLeft: 10,
                          },
                          dimensions.width
                        )}
                      >
                        <IconButton
                          style={StyleSheet.applyWidth(
                            {
                              marginBottom: {
                                minWidth: Breakpoints.Laptop,
                                value: 5,
                              },
                              marginLeft: {
                                minWidth: Breakpoints.Laptop,
                                value: 5,
                              },
                              marginRight: {
                                minWidth: Breakpoints.Laptop,
                                value: 5,
                              },
                              marginTop: {
                                minWidth: Breakpoints.Laptop,
                                value: 5,
                              },
                            },
                            dimensions.width
                          )}
                          size={32}
                          icon={'AntDesign/hearto'}
                        />
                        <Text
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)['Text'],
                              {
                                margin: {
                                  minWidth: Breakpoints.Laptop,
                                  value: 5,
                                },
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'Subscriber Count'}
                        </Text>
                      </View>
                    </View>
                  </ImageBackground>
                  {/* hubContent */}
                  <View>
                    <FlatList
                      renderItem={({ item }) => {
                        const listData = item;
                        return (
                          <>
                            {/* getChannels */}
                            <XanoApiApi.FetchGetChannelGET
                              channel_id={fetchHubData?.channel_id}
                            >
                              {({
                                loading,
                                error,
                                data,
                                refetchGetChannel,
                              }) => {
                                const getChannelsData = data;
                                if (!getChannelsData || loading) {
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
                                    {/* channels */}
                                    <View
                                      style={StyleSheet.applyWidth(
                                        {
                                          alignItems: 'center',
                                          alignSelf: {
                                            minWidth: Breakpoints.Laptop,
                                            value: 'center',
                                          },
                                          flexDirection: {
                                            minWidth: Breakpoints.Laptop,
                                            value: 'row',
                                          },
                                          flexWrap: {
                                            minWidth: Breakpoints.Laptop,
                                            value: 'wrap',
                                          },
                                          justifyContent: {
                                            minWidth: Breakpoints.Laptop,
                                            value: 'center',
                                          },
                                          margin: 10,
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      <Pressable
                                        onPress={() => {
                                          try {
                                            navigation.navigate(
                                              'ChannelPageScreen',
                                              {
                                                channel_id: getChannelsData?.id,
                                              }
                                            );
                                          } catch (err) {
                                            console.error(err);
                                          }
                                        }}
                                      >
                                        {/* channel */}
                                        <View
                                          style={StyleSheet.applyWidth(
                                            {
                                              alignItems: 'center',
                                              backgroundColor:
                                                theme.colors['Medium'],
                                              borderRadius: [
                                                {
                                                  minWidth: Breakpoints.Laptop,
                                                  value: 25,
                                                },
                                                {
                                                  minWidth: Breakpoints.Mobile,
                                                  value: 25,
                                                },
                                              ],
                                              margin: 10,
                                              maxHeight: 300,
                                              maxWidth: 250,
                                              padding: 10,
                                            },
                                            dimensions.width
                                          )}
                                        >
                                          <Circle size={100}>
                                            {/* channelLogo */}
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
                                                uri: `${getChannelsData?.channelLogo?.url}`,
                                              }}
                                            />
                                          </Circle>

                                          <View
                                            style={StyleSheet.applyWidth(
                                              {
                                                marginTop: {
                                                  minWidth: Breakpoints.Laptop,
                                                  value: 5,
                                                },
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
                                                    color:
                                                      theme.colors[
                                                        'Background'
                                                      ],
                                                    fontFamily:
                                                      'AlfaSlabOne_400Regular',
                                                    fontSize: 20,
                                                    textAlign: 'center',
                                                  }
                                                ),
                                                dimensions.width
                                              )}
                                            >
                                              {getChannelsData?.name}
                                            </Text>
                                            {/* channelDescription */}
                                            <Text
                                              style={StyleSheet.applyWidth(
                                                StyleSheet.compose(
                                                  GlobalStyles.TextStyles(
                                                    theme
                                                  )['Text'],
                                                  {
                                                    color:
                                                      theme.colors[
                                                        'Background'
                                                      ],
                                                  }
                                                ),
                                                dimensions.width
                                              )}
                                            >
                                              {
                                                getChannelsData?.channelDescription
                                              }
                                            </Text>
                                          </View>
                                        </View>
                                      </Pressable>
                                    </View>
                                  </>
                                );
                              }}
                            </XanoApiApi.FetchGetChannelGET>
                          </>
                        );
                      }}
                      data={fetchHubData?.channel_id}
                      listKey={'SWUbsgbt'}
                      keyExtractor={listData => listData}
                      numColumns={1}
                      onEndReachedThreshold={0.5}
                      showsHorizontalScrollIndicator={true}
                      showsVerticalScrollIndicator={true}
                    />
                    {/* newPost */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignItems: {
                            minWidth: Breakpoints.Laptop,
                            value: 'center',
                          },
                          alignSelf: {
                            minWidth: Breakpoints.Laptop,
                            value: 'center',
                          },
                          justifyContent: {
                            minWidth: Breakpoints.Laptop,
                            value: 'center',
                          },
                          width: {
                            minWidth: Breakpoints.Laptop,
                            value: '100%',
                          },
                        },
                        dimensions.width
                      )}
                    >
                      {/* content */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignItems: [
                              { minWidth: Breakpoints.Laptop, value: 'center' },
                              { minWidth: Breakpoints.Mobile, value: 'center' },
                            ],
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
                              { minWidth: Breakpoints.Laptop, value: 15 },
                              { minWidth: Breakpoints.Mobile, value: 15 },
                            ],
                            justifyContent: {
                              minWidth: Breakpoints.Laptop,
                              value: 'space-around',
                            },
                            margin: 10,
                            maxWidth: {
                              minWidth: Breakpoints.Laptop,
                              value: 500,
                            },
                            padding: [
                              { minWidth: Breakpoints.Laptop, value: 10 },
                              { minWidth: Breakpoints.Mobile, value: 5 },
                            ],
                            width: {
                              minWidth: Breakpoints.Laptop,
                              value: '100%',
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
                                  minWidth: Breakpoints.Laptop,
                                  value: 'center',
                                },
                                {
                                  minWidth: Breakpoints.Mobile,
                                  value: 'center',
                                },
                              ],
                              flex: 1,
                              flexDirection: [
                                { minWidth: Breakpoints.Laptop, value: 'row' },
                                { minWidth: Breakpoints.Mobile, value: 'row' },
                              ],
                              justifyContent: {
                                minWidth: Breakpoints.Laptop,
                                value: 'space-around',
                              },
                              marginBottom: {
                                minWidth: Breakpoints.Laptop,
                                value: 10,
                              },
                              padding: [
                                { minWidth: Breakpoints.Laptop, value: 5 },
                                { minWidth: Breakpoints.Mobile, value: 5 },
                              ],
                              width: [
                                { minWidth: Breakpoints.Laptop, value: '100%' },
                                { minWidth: Breakpoints.Mobile, value: '100%' },
                              ],
                            },
                            dimensions.width
                          )}
                        >
                          {/* userProfile */}
                          <Circle size={50} bgColor={theme.colors.light}>
                            <Image
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(
                                  GlobalStyles.ImageStyles(theme)['Image'],
                                  {
                                    height: [
                                      {
                                        minWidth: Breakpoints.Laptop,
                                        value: '100%',
                                      },
                                      {
                                        minWidth: Breakpoints.Mobile,
                                        value: '100%',
                                      },
                                    ],
                                    width: [
                                      {
                                        minWidth: Breakpoints.Laptop,
                                        value: '100%',
                                      },
                                      {
                                        minWidth: Breakpoints.Mobile,
                                        value: '100%',
                                      },
                                    ],
                                  }
                                ),
                                dimensions.width
                              )}
                              resizeMode={'cover'}
                              source={{
                                uri: `${fetchHubData?.profilePicture?.url}`,
                              }}
                            />
                          </Circle>
                          {/* newPostContent */}
                          <TextInput
                            onChangeText={newNewPostContentValue => {
                              try {
                                setInputText(newNewPostContentValue);
                              } catch (err) {
                                console.error(err);
                              }
                            }}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TextInputStyles(theme)[
                                  'Text Input'
                                ],
                                {
                                  marginLeft: 5,
                                  marginRight: 5,
                                  width: [
                                    {
                                      minWidth: Breakpoints.Laptop,
                                      value: '100%',
                                    },
                                    {
                                      minWidth: Breakpoints.Mobile,
                                      value: '100%',
                                    },
                                  ],
                                }
                              ),
                              dimensions.width
                            )}
                            value={inputText}
                            editable={true}
                            placeholder={'Talk to your community...'}
                            changeTextDelay={500}
                            autoCapitalize={'none'}
                          />
                          {/* post */}
                          <IconButton size={32} icon={'Ionicons/send'} />
                        </View>
                        {/* upload Image */}
                        <Pressable
                          onPress={() => {
                            const handler = async () => {
                              try {
                                await openImagePickerUtil({
                                  allowsEditing: true,
                                });
                              } catch (err) {
                                console.error(err);
                              }
                            };
                            handler();
                          }}
                        >
                          {/* View 2 */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignItems: 'center',
                                backgroundColor: theme.colors['Ad'],
                                borderRadius: 10,
                                flexDirection: 'row',
                                justifyContent: 'center',
                                paddingLeft: 10,
                                paddingRight: 10,
                              },
                              dimensions.width
                            )}
                          >
                            <Icon
                              style={StyleSheet.applyWidth(
                                {
                                  marginBottom: 5,
                                  marginLeft: 5,
                                  marginRight: 5,
                                  marginTop: 5,
                                },
                                dimensions.width
                              )}
                              name={'FontAwesome/photo'}
                              size={24}
                            />
                            <Text
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(
                                  GlobalStyles.TextStyles(theme)['Text'],
                                  {
                                    alignSelf: {
                                      minWidth: Breakpoints.Laptop,
                                      value: 'center',
                                    },
                                    margin: {
                                      minWidth: Breakpoints.Laptop,
                                      value: 5,
                                    },
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {'media'}
                            </Text>
                          </View>
                        </Pressable>
                      </View>
                    </View>
                    {/* posts */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          flexDirection: {
                            minWidth: Breakpoints.Laptop,
                            value: 'row',
                          },
                          justifyContent: {
                            minWidth: Breakpoints.Laptop,
                            value: 'center',
                          },
                        },
                        dimensions.width
                      )}
                    >
                      {/* postContainer */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            flex: { minWidth: Breakpoints.Laptop, value: 3 },
                            flexBasis: {
                              minWidth: Breakpoints.Laptop,
                              value: 3,
                            },
                            flexGrow: {
                              minWidth: Breakpoints.Laptop,
                              value: 4,
                            },
                            flexShrink: {
                              minWidth: Breakpoints.Laptop,
                              value: 0,
                            },
                            marginBottom: {
                              minWidth: Breakpoints.Laptop,
                              value: 10,
                            },
                            marginTop: {
                              minWidth: Breakpoints.Laptop,
                              value: 10,
                            },
                            maxWidth: [
                              { minWidth: Breakpoints.Laptop, value: 580 },
                              { minWidth: Breakpoints.Desktop, value: 848 },
                              { minWidth: Breakpoints.BigScreen, value: 1135 },
                            ],
                          },
                          dimensions.width
                        )}
                      >
                        {/* fetchAllPosts */}
                        <XanoApiApi.FetchGetAllHubPostGET
                          user_id={props.route?.params?.hub ?? 1}
                        >
                          {({ loading, error, data, refetchGetAllHubPost }) => {
                            const fetchAllPostsData = data;
                            if (!fetchAllPostsData || loading) {
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
                                {/* postWall */}
                                <FlatList
                                  renderItem={({ item }) => {
                                    const postWallData = item;
                                    return (
                                      <>
                                        {/* postWall */}
                                        <View
                                          style={StyleSheet.applyWidth(
                                            {
                                              alignItems: {
                                                minWidth: Breakpoints.Laptop,
                                                value: 'stretch',
                                              },
                                              marginLeft: {
                                                minWidth: Breakpoints.Laptop,
                                                value: 10,
                                              },
                                              marginRight: {
                                                minWidth: Breakpoints.Laptop,
                                                value: 10,
                                              },
                                              marginTop: {
                                                minWidth: Breakpoints.Laptop,
                                                value: 5,
                                              },
                                            },
                                            dimensions.width
                                          )}
                                        >
                                          <Pressable
                                            onPress={() => {
                                              try {
                                                navigation.navigate(
                                                  'PostScreen'
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
                                            {/* post */}
                                            <View
                                              style={StyleSheet.applyWidth(
                                                {
                                                  alignItems: 'stretch',
                                                  backgroundColor: [
                                                    {
                                                      minWidth:
                                                        Breakpoints.Laptop,
                                                      value:
                                                        theme.colors['Medium'],
                                                    },
                                                    {
                                                      minWidth:
                                                        Breakpoints.Mobile,
                                                      value:
                                                        theme.colors['Medium'],
                                                    },
                                                  ],
                                                  borderRadius: [
                                                    {
                                                      minWidth:
                                                        Breakpoints.Laptop,
                                                      value: 10,
                                                    },
                                                    {
                                                      minWidth:
                                                        Breakpoints.Mobile,
                                                      value: 25,
                                                    },
                                                  ],
                                                  margin: 5,
                                                  minHeight: {
                                                    minWidth:
                                                      Breakpoints.Laptop,
                                                    value: 150,
                                                  },
                                                  padding: [
                                                    {
                                                      minWidth:
                                                        Breakpoints.Laptop,
                                                      value: 10,
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
                                              {/* info */}
                                              <FlatList
                                                renderItem={({ item }) => {
                                                  const infoData = item;
                                                  return (
                                                    <>
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
                                                            margin: 5,
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
                                                          size={50}
                                                          bgColor={
                                                            theme.colors.light
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
                                                            resizeMode={'cover'}
                                                            source={{
                                                              uri: `${infoData?.profilePicture?.url}`,
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
                                                              StyleSheet.compose(
                                                                GlobalStyles.TextStyles(
                                                                  theme
                                                                )['Text'],
                                                                {
                                                                  fontSize: {
                                                                    minWidth:
                                                                      Breakpoints.Laptop,
                                                                    value: 20,
                                                                  },
                                                                }
                                                              ),
                                                              dimensions.width
                                                            )}
                                                          >
                                                            {infoData?.hubName}
                                                          </Text>
                                                        </View>
                                                        {/* interaction */}
                                                        <View
                                                          style={StyleSheet.applyWidth(
                                                            {
                                                              alignContent: {
                                                                minWidth:
                                                                  Breakpoints.Laptop,
                                                                value:
                                                                  'stretch',
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
                                                              size={32}
                                                              icon={
                                                                'Entypo/thumbs-down'
                                                              }
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
                                                              size={32}
                                                              icon={
                                                                'Entypo/thumbs-up'
                                                              }
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
                                                data={
                                                  postWallData &&
                                                  postWallData['_hub_user']
                                                }
                                                listKey={JSON.stringify(
                                                  postWallData &&
                                                    postWallData['_hub_user']
                                                )}
                                                keyExtractor={infoData =>
                                                  infoData?.id ||
                                                  infoData?.uuid ||
                                                  JSON.stringify(infoData)
                                                }
                                                contentContainerStyle={StyleSheet.applyWidth(
                                                  {
                                                    alignSelf: {
                                                      minWidth:
                                                        Breakpoints.Laptop,
                                                      value: 'stretch',
                                                    },
                                                    flexDirection: {
                                                      minWidth:
                                                        Breakpoints.Laptop,
                                                      value: 'row',
                                                    },
                                                  },
                                                  dimensions.width
                                                )}
                                                numColumns={1}
                                                onEndReachedThreshold={0.5}
                                                showsHorizontalScrollIndicator={
                                                  true
                                                }
                                                showsVerticalScrollIndicator={
                                                  true
                                                }
                                              />
                                              {/* postText */}
                                              <View
                                                style={StyleSheet.applyWidth(
                                                  {
                                                    alignItems: {
                                                      minWidth:
                                                        Breakpoints.Laptop,
                                                      value: 'flex-start',
                                                    },
                                                    backgroundColor: [
                                                      {
                                                        minWidth:
                                                          Breakpoints.Laptop,
                                                        value:
                                                          'rgba(255, 255, 255, 0.2)',
                                                      },
                                                      {
                                                        minWidth:
                                                          Breakpoints.Mobile,
                                                        value:
                                                          theme.colors['Light'],
                                                      },
                                                    ],
                                                    borderRadius: [
                                                      {
                                                        minWidth:
                                                          Breakpoints.Laptop,
                                                        value: 10,
                                                      },
                                                      {
                                                        minWidth:
                                                          Breakpoints.Mobile,
                                                        value: 15,
                                                      },
                                                    ],
                                                    flex: {
                                                      minWidth:
                                                        Breakpoints.Laptop,
                                                      value: 1,
                                                    },
                                                    margin: [
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
                                                <Text
                                                  style={StyleSheet.applyWidth(
                                                    GlobalStyles.TextStyles(
                                                      theme
                                                    )['Text'],
                                                    dimensions.width
                                                  )}
                                                >
                                                  {postWallData?.postText}
                                                </Text>
                                              </View>
                                              {/* media */}
                                              <View
                                                style={StyleSheet.applyWidth(
                                                  {
                                                    alignItems: [
                                                      {
                                                        minWidth:
                                                          Breakpoints.Laptop,
                                                        value: 'flex-start',
                                                      },
                                                      {
                                                        minWidth:
                                                          Breakpoints.Mobile,
                                                        value: 'center',
                                                      },
                                                    ],
                                                    alignSelf: {
                                                      minWidth:
                                                        Breakpoints.Laptop,
                                                      value: 'center',
                                                    },
                                                    flexDirection: {
                                                      minWidth:
                                                        Breakpoints.Laptop,
                                                      value: 'row',
                                                    },
                                                    margin: 5,
                                                    padding: 5,
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
                                                        {/* Media */}
                                                        <FlatList
                                                          renderItem={({
                                                            item,
                                                          }) => {
                                                            const mediaData =
                                                              item;
                                                            return (
                                                              <>
                                                                {/* Post */}
                                                                <>
                                                                  {!(
                                                                    (mediaData?.videoURL).toString() ===
                                                                    checkNull
                                                                  ) ? null : (
                                                                    <View>
                                                                      <Image
                                                                        style={StyleSheet.applyWidth(
                                                                          StyleSheet.compose(
                                                                            GlobalStyles.ImageStyles(
                                                                              theme
                                                                            )[
                                                                              'Image'
                                                                            ],
                                                                            {
                                                                              marginBottom: 5,
                                                                              marginLeft: 5,
                                                                              marginRight: 5,
                                                                              marginTop: 5,
                                                                              minHeight: 200,
                                                                              minWidth: 200,
                                                                            }
                                                                          ),
                                                                          dimensions.width
                                                                        )}
                                                                        source={{
                                                                          uri: `${mediaData?.image?.url}`,
                                                                        }}
                                                                        resizeMode={
                                                                          'contain'
                                                                        }
                                                                      />
                                                                    </View>
                                                                  )}
                                                                </>
                                                                {/* Video */}
                                                                <>
                                                                  {(mediaData?.videoURL).toString() ===
                                                                  checkNull ? null : (
                                                                    <View>
                                                                      {/* videoBlock */}
                                                                      <View
                                                                        style={StyleSheet.applyWidth(
                                                                          GlobalStyles.ViewStyles(
                                                                            theme
                                                                          )[
                                                                            'videoBlock'
                                                                          ],
                                                                          dimensions.width
                                                                        )}
                                                                        removeClippedSubviews={
                                                                          true
                                                                        }
                                                                      >
                                                                        <ImageBackground
                                                                          style={StyleSheet.applyWidth(
                                                                            StyleSheet.compose(
                                                                              GlobalStyles.ImageBackgroundStyles(
                                                                                theme
                                                                              )[
                                                                                'Image Background'
                                                                              ],
                                                                              {
                                                                                height:
                                                                                  [
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
                                                                            uri: `${mediaData?.image?.url}`,
                                                                          }}
                                                                          resizeMode={
                                                                            'cover'
                                                                          }
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
                                                                                  alignItems:
                                                                                    {
                                                                                      minWidth:
                                                                                        Breakpoints.Laptop,
                                                                                      value:
                                                                                        'flex-end',
                                                                                    },
                                                                                  alignSelf:
                                                                                    'flex-end',
                                                                                  height:
                                                                                    {
                                                                                      minWidth:
                                                                                        Breakpoints.Laptop,
                                                                                      value: 50,
                                                                                    },
                                                                                },
                                                                                dimensions.width
                                                                              )}
                                                                            ></View>
                                                                            {/* postInfo */}
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
                                                                                  padding:
                                                                                    [
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
                                                                                size={
                                                                                  50
                                                                                }
                                                                                bgColor={
                                                                                  theme
                                                                                    .colors
                                                                                    .light
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
                                                                                  source={{
                                                                                    uri: `${postWallData?.hub_channel?.channelLogo?.url}`,
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
                                                                                    marginLeft:
                                                                                      [
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
                                                                                    marginRight:
                                                                                      [
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
                                                                                    )[
                                                                                      'Text'
                                                                                    ],
                                                                                    dimensions.width
                                                                                  )}
                                                                                  disabled={
                                                                                    false
                                                                                  }
                                                                                  ellipsizeMode={
                                                                                    'tail'
                                                                                  }
                                                                                  numberOfLines={
                                                                                    1
                                                                                  }
                                                                                >
                                                                                  {
                                                                                    postWallData?.postName
                                                                                  }
                                                                                </Text>
                                                                                {/* channelName */}
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
                                                                                    postWallData
                                                                                      ?.hub_channel
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
                                                                                      '# views'
                                                                                    }
                                                                                  </Text>
                                                                                  {/* likes */}
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
                                                                                      null
                                                                                    }
                                                                                    {
                                                                                      ' likes'
                                                                                    }
                                                                                  </Text>
                                                                                  {/* dislikes */}
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
                                                                                      '# dislikes'
                                                                                    }
                                                                                  </Text>
                                                                                  {/* poseted time */}
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
                                                                                      'uploaded '
                                                                                    }
                                                                                    {getTime(
                                                                                      postWallData?.created_at
                                                                                    )}
                                                                                  </Text>
                                                                                </View>
                                                                              </View>
                                                                            </View>
                                                                          </View>
                                                                        </ImageBackground>
                                                                      </View>
                                                                    </View>
                                                                  )}
                                                                </>
                                                              </>
                                                            );
                                                          }}
                                                          data={mediaArrayData}
                                                          listKey={JSON.stringify(
                                                            mediaArrayData
                                                          )}
                                                          keyExtractor={mediaData =>
                                                            mediaData?.id
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
                                                  data={
                                                    postWallData?.media_array
                                                  }
                                                  listKey={JSON.stringify(
                                                    postWallData?.media_array
                                                  )}
                                                  keyExtractor={mediaArrayData =>
                                                    mediaArrayData?.id
                                                  }
                                                  contentContainerStyle={StyleSheet.applyWidth(
                                                    {
                                                      alignItems: {
                                                        minWidth:
                                                          Breakpoints.Laptop,
                                                        value: 'flex-start',
                                                      },
                                                      flexDirection: {
                                                        minWidth:
                                                          Breakpoints.Laptop,
                                                        value: 'row',
                                                      },
                                                    },
                                                    dimensions.width
                                                  )}
                                                  onEndReachedThreshold={0.5}
                                                  showsVerticalScrollIndicator={
                                                    false
                                                  }
                                                  showsHorizontalScrollIndicator={
                                                    false
                                                  }
                                                  horizontal={true}
                                                />
                                              </View>
                                              {/* posted(time) */}
                                              <Text
                                                style={StyleSheet.applyWidth(
                                                  StyleSheet.compose(
                                                    GlobalStyles.TextStyles(
                                                      theme
                                                    )['Text'],
                                                    {
                                                      alignSelf: [
                                                        {
                                                          minWidth:
                                                            Breakpoints.Laptop,
                                                          value: 'flex-end',
                                                        },
                                                        {
                                                          minWidth:
                                                            Breakpoints.Mobile,
                                                          value: 'flex-end',
                                                        },
                                                      ],
                                                      fontSize: {
                                                        minWidth:
                                                          Breakpoints.Laptop,
                                                        value: 10,
                                                      },
                                                      marginBottom: 5,
                                                      marginRight: 5,
                                                    }
                                                  ),
                                                  dimensions.width
                                                )}
                                              >
                                                {getTime(
                                                  postWallData?.created_at
                                                )}
                                              </Text>
                                            </View>
                                          </Pressable>
                                        </View>
                                      </>
                                    );
                                  }}
                                  data={fetchAllPostsData}
                                  listKey={'pdC45Cas'}
                                  keyExtractor={postWallData =>
                                    postWallData?.id
                                  }
                                  numColumns={1}
                                  onEndReachedThreshold={0.5}
                                  showsHorizontalScrollIndicator={true}
                                  showsVerticalScrollIndicator={true}
                                />
                              </>
                            );
                          }}
                        </XanoApiApi.FetchGetAllHubPostGET>
                      </View>
                    </View>
                  </View>
                </View>
                {/* sidemenu */}
                <>
                  {!Constants['showSidemenu'] ? null : (
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          backgroundColor: {
                            minWidth: Breakpoints.Laptop,
                            value: theme.colors['Medium'],
                          },
                          flex: { minWidth: Breakpoints.Laptop, value: 1 },
                          marginLeft: {
                            minWidth: Breakpoints.Laptop,
                            value: 10,
                          },
                        },
                        dimensions.width
                      )}
                    >
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignItems: {
                              minWidth: Breakpoints.Laptop,
                              value: 'flex-end',
                            },
                            margin: { minWidth: Breakpoints.Laptop, value: 10 },
                          },
                          dimensions.width
                        )}
                      >
                        <IconButton
                          onPress={() => {
                            try {
                              setGlobalVariableValue({
                                key: 'showSidemenu',
                                value: false,
                              });
                            } catch (err) {
                              console.error(err);
                            }
                          }}
                          size={32}
                          icon={'AntDesign/close'}
                          color={theme.colors['Primary']}
                        />
                      </View>
                      {/* View 2 */}
                      <View />
                    </View>
                  )}
                </>
              </>
            );
          }}
        </XanoApiApi.FetchGetHubGET>
      </View>
    </ScreenContainer>
  );
};

export default withTheme(HubScreen);
