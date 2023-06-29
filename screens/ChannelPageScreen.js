import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as XanoApiApi from '../apis/XanoApiApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import {
  Button,
  Circle,
  Icon,
  Pressable,
  ScreenContainer,
  SwipeableItem,
  Swiper,
  SwiperItem,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import {
  ActivityIndicator,
  Image,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { Fetch } from 'react-request';

const ChannelPageScreen = props => {
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();

  const { theme } = props;
  const { navigation } = props;

  const [Live, setLive] = React.useState(false);
  const [Playlist, setPlaylist] = React.useState(false);
  const [Uploads, setUploads] = React.useState(true);

  return (
    <ScreenContainer
      style={StyleSheet.applyWidth(
        {
          alignContent: { minWidth: Breakpoints.Laptop, value: 'stretch' },
          flexDirection: { minWidth: Breakpoints.Laptop, value: 'row' },
        },
        dimensions.width
      )}
      scrollable={false}
      hasSafeArea={false}
    >
      <XanoApiApi.FetchGetChannelGET
        channel_id={props.route?.params?.channel_id ?? 1}
      >
        {({ loading, error, data, refetchGetChannel }) => {
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
            <>
              {/* channel */}
              <View
                style={StyleSheet.applyWidth(
                  { flex: { minWidth: Breakpoints.Laptop, value: 7 } },
                  dimensions.width
                )}
              >
                {/* info */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      flex: { minWidth: Breakpoints.Laptop, value: 2 },
                      flexDirection: {
                        minWidth: Breakpoints.Laptop,
                        value: 'row',
                      },
                      width: { minWidth: Breakpoints.Laptop, value: '100%' },
                    },
                    dimensions.width
                  )}
                >
                  {/* details */}
                  <View
                    style={StyleSheet.applyWidth(
                      { flex: { minWidth: Breakpoints.Laptop, value: 6 } },
                      dimensions.width
                    )}
                  >
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          flex: { minWidth: Breakpoints.Laptop, value: 4 },
                          flexDirection: {
                            minWidth: Breakpoints.Laptop,
                            value: 'row',
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
                              value: 'center',
                            },
                            justifyContent: {
                              minWidth: Breakpoints.Laptop,
                              value: 'center',
                            },
                            width: { minWidth: Breakpoints.Laptop, value: 150 },
                          },
                          dimensions.width
                        )}
                      >
                        {/* logo */}
                        <Circle bgColor={theme.colors.light} size={120}>
                          <Image
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.ImageStyles(theme)['Image'],
                                {
                                  height: {
                                    minWidth: Breakpoints.Laptop,
                                    value: '100%',
                                  },
                                  width: {
                                    minWidth: Breakpoints.Laptop,
                                    value: '100%',
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
                        </Circle>
                      </View>
                      {/* View 2 */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            flex: { minWidth: Breakpoints.Laptop, value: 1 },
                            justifyContent: {
                              minWidth: Breakpoints.Laptop,
                              value: 'center',
                            },
                          },
                          dimensions.width
                        )}
                      >
                        <Text
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)['Text'],
                              {
                                fontSize: {
                                  minWidth: Breakpoints.Laptop,
                                  value: 34,
                                },
                                marginBottom: {
                                  minWidth: Breakpoints.Laptop,
                                  value: 10,
                                },
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'Channel Name'}
                        </Text>
                        {/* Text 2 */}
                        <Text
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)['Text'],
                              {
                                fontSize: {
                                  minWidth: Breakpoints.Laptop,
                                  value: 10,
                                },
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'follower Count'}
                        </Text>
                        {/* Text 3 */}
                        <Text
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)['Text'],
                              {
                                fontSize: {
                                  minWidth: Breakpoints.Laptop,
                                  value: 10,
                                },
                                marginTop: {
                                  minWidth: Breakpoints.Laptop,
                                  value: 5,
                                },
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'subscriber Count'}
                        </Text>
                      </View>
                    </View>
                    {/* View 2 */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignItems: {
                            minWidth: Breakpoints.Laptop,
                            value: 'flex-end',
                          },
                          flexDirection: {
                            minWidth: Breakpoints.Laptop,
                            value: 'row',
                          },
                        },
                        dimensions.width
                      )}
                    >
                      <Pressable
                        onPress={() => {
                          try {
                            setLive(false);
                            setPlaylist(false);
                            setUploads(true);
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                      >
                        {/* tab */}
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              borderTopLeftRadius: {
                                minWidth: Breakpoints.Laptop,
                                value: 25,
                              },
                              borderTopRightRadius: {
                                minWidth: Breakpoints.Laptop,
                                value: 25,
                              },
                              justifyContent: {
                                minWidth: Breakpoints.Laptop,
                                value: 'flex-end',
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
                              minWidth: {
                                minWidth: Breakpoints.Laptop,
                                value: 150,
                              },
                              opacity: {
                                minWidth: Breakpoints.Laptop,
                                value: 1,
                              },
                              paddingLeft: {
                                minWidth: Breakpoints.Laptop,
                                value: 15,
                              },
                              paddingRight: {
                                minWidth: Breakpoints.Laptop,
                                value: 15,
                              },
                              paddingTop: {
                                minWidth: Breakpoints.Laptop,
                                value: 15,
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
                                  value: 'center',
                                },
                                backgroundColor: {
                                  minWidth: Breakpoints.Laptop,
                                  value: theme.colors['Medium'],
                                },
                                borderTopLeftRadius: {
                                  minWidth: Breakpoints.Laptop,
                                  value: 15,
                                },
                                borderTopRightRadius: {
                                  minWidth: Breakpoints.Laptop,
                                  value: 15,
                                },
                                width: {
                                  minWidth: Breakpoints.Laptop,
                                  value: '100%',
                                },
                              },
                              dimensions.width
                            )}
                          >
                            <Text
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(
                                  GlobalStyles.TextStyles(theme)['Text'],
                                  {
                                    color: {
                                      minWidth: Breakpoints.Laptop,
                                      value: theme.colors['Background'],
                                    },
                                    fontSize: {
                                      minWidth: Breakpoints.Laptop,
                                      value: 14,
                                    },
                                    margin: {
                                      minWidth: Breakpoints.Laptop,
                                      value: 5,
                                    },
                                    textAlign: {
                                      minWidth: Breakpoints.Laptop,
                                      value: 'justify',
                                    },
                                    whiteSpace: {
                                      minWidth: Breakpoints.Laptop,
                                      value: 'pre-line',
                                    },
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {'Uploads'}
                            </Text>
                          </View>
                        </View>
                      </Pressable>
                      {/* Pressable 2 */}
                      <Pressable
                        onPress={() => {
                          try {
                            setUploads(false);
                            setPlaylist(false);
                            setLive(true);
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                      >
                        {/* tab */}
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              backgroundColor: [
                                {
                                  minWidth: Breakpoints.Laptop,
                                  value: '"rgba(0, 0, 0, 0)"',
                                },
                                {
                                  minWidth: Breakpoints.Laptop,
                                  value: Live?.true,
                                },
                              ],
                              borderTopLeftRadius: {
                                minWidth: Breakpoints.Laptop,
                                value: 25,
                              },
                              borderTopRightRadius: {
                                minWidth: Breakpoints.Laptop,
                                value: 25,
                              },
                              height: {
                                minWidth: Breakpoints.Laptop,
                                value: '100%',
                              },
                              justifyContent: {
                                minWidth: Breakpoints.Laptop,
                                value: 'flex-end',
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
                              minWidth: {
                                minWidth: Breakpoints.Laptop,
                                value: 150,
                              },
                              paddingLeft: {
                                minWidth: Breakpoints.Laptop,
                                value: 15,
                              },
                              paddingRight: {
                                minWidth: Breakpoints.Laptop,
                                value: 15,
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
                                  value: 'center',
                                },
                                backgroundColor: {
                                  minWidth: Breakpoints.Laptop,
                                  value: theme.colors['Medium'],
                                },
                                borderTopLeftRadius: {
                                  minWidth: Breakpoints.Laptop,
                                  value: 15,
                                },
                                borderTopRightRadius: {
                                  minWidth: Breakpoints.Laptop,
                                  value: 15,
                                },
                                marginTop: {
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
                            <Text
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(
                                  GlobalStyles.TextStyles(theme)['Text'],
                                  {
                                    color: {
                                      minWidth: Breakpoints.Laptop,
                                      value: theme.colors['Background'],
                                    },
                                    fontSize: {
                                      minWidth: Breakpoints.Laptop,
                                      value: 14,
                                    },
                                    margin: {
                                      minWidth: Breakpoints.Laptop,
                                      value: 5,
                                    },
                                    textAlign: {
                                      minWidth: Breakpoints.Laptop,
                                      value: 'justify',
                                    },
                                    whiteSpace: {
                                      minWidth: Breakpoints.Laptop,
                                      value: 'pre-line',
                                    },
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {'Live'}
                            </Text>
                          </View>
                        </View>
                      </Pressable>
                      {/* Pressable 3 */}
                      <Pressable
                        onPress={() => {
                          try {
                            setUploads(false);
                            setLive(false);
                            setPlaylist(true);
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                      >
                        {/* tab */}
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              backgroundColor: [
                                {
                                  minWidth: Breakpoints.Laptop,
                                  value: '"rgba(0, 0, 0, 0)"',
                                },
                                {
                                  minWidth: Breakpoints.Laptop,
                                  value: Playlist?.true,
                                },
                              ],
                              borderTopLeftRadius: {
                                minWidth: Breakpoints.Laptop,
                                value: 25,
                              },
                              borderTopRightRadius: {
                                minWidth: Breakpoints.Laptop,
                                value: 25,
                              },
                              height: {
                                minWidth: Breakpoints.Laptop,
                                value: '100%',
                              },
                              justifyContent: {
                                minWidth: Breakpoints.Laptop,
                                value: 'flex-end',
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
                              minWidth: {
                                minWidth: Breakpoints.Laptop,
                                value: 150,
                              },
                              paddingLeft: {
                                minWidth: Breakpoints.Laptop,
                                value: 15,
                              },
                              paddingRight: {
                                minWidth: Breakpoints.Laptop,
                                value: 15,
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
                                  value: 'center',
                                },
                                backgroundColor: {
                                  minWidth: Breakpoints.Laptop,
                                  value: theme.colors['Medium'],
                                },
                                borderTopLeftRadius: {
                                  minWidth: Breakpoints.Laptop,
                                  value: 15,
                                },
                                borderTopRightRadius: {
                                  minWidth: Breakpoints.Laptop,
                                  value: 15,
                                },
                                marginTop: {
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
                            <Text
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(
                                  GlobalStyles.TextStyles(theme)['Text'],
                                  {
                                    color: {
                                      minWidth: Breakpoints.Laptop,
                                      value: theme.colors['Background'],
                                    },
                                    fontSize: {
                                      minWidth: Breakpoints.Laptop,
                                      value: 14,
                                    },
                                    margin: {
                                      minWidth: Breakpoints.Laptop,
                                      value: 5,
                                    },
                                    textAlign: {
                                      minWidth: Breakpoints.Laptop,
                                      value: 'justify',
                                    },
                                    whiteSpace: {
                                      minWidth: Breakpoints.Laptop,
                                      value: 'pre-line',
                                    },
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {'Playlist'}
                            </Text>
                          </View>
                        </View>
                      </Pressable>
                      {/* Pressable 4 */}
                      <Pressable
                        onPress={() => {
                          try {
                            navigation.navigate('HubScreen', {
                              hub: fetchData?.hub_user_id,
                            });
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                      >
                        {/* tab */}
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              borderTopLeftRadius: {
                                minWidth: Breakpoints.Laptop,
                                value: 25,
                              },
                              borderTopRightRadius: {
                                minWidth: Breakpoints.Laptop,
                                value: 25,
                              },
                              height: {
                                minWidth: Breakpoints.Laptop,
                                value: '100%',
                              },
                              justifyContent: {
                                minWidth: Breakpoints.Laptop,
                                value: 'flex-end',
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
                              minWidth: {
                                minWidth: Breakpoints.Laptop,
                                value: 150,
                              },
                              paddingLeft: {
                                minWidth: Breakpoints.Laptop,
                                value: 15,
                              },
                              paddingRight: {
                                minWidth: Breakpoints.Laptop,
                                value: 15,
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
                                  value: 'center',
                                },
                                backgroundColor: {
                                  minWidth: Breakpoints.Laptop,
                                  value: theme.colors['Medium'],
                                },
                                borderTopLeftRadius: {
                                  minWidth: Breakpoints.Laptop,
                                  value: 15,
                                },
                                borderTopRightRadius: {
                                  minWidth: Breakpoints.Laptop,
                                  value: 15,
                                },
                                marginTop: {
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
                            <Text
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(
                                  GlobalStyles.TextStyles(theme)['Text'],
                                  {
                                    color: {
                                      minWidth: Breakpoints.Laptop,
                                      value: theme.colors['Background'],
                                    },
                                    fontSize: {
                                      minWidth: Breakpoints.Laptop,
                                      value: 14,
                                    },
                                    margin: {
                                      minWidth: Breakpoints.Laptop,
                                      value: 5,
                                    },
                                    textAlign: {
                                      minWidth: Breakpoints.Laptop,
                                      value: 'justify',
                                    },
                                    whiteSpace: {
                                      minWidth: Breakpoints.Laptop,
                                      value: 'pre-line',
                                    },
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {'Hub'}
                            </Text>
                          </View>
                        </View>
                      </Pressable>
                    </View>
                  </View>
                  {/* watermark */}
                  <>
                    {Constants['showSidemenu'] ? null : (
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignItems: {
                              minWidth: Breakpoints.Laptop,
                              value: 'flex-end',
                            },
                            flex: { minWidth: Breakpoints.Laptop, value: 1 },
                            margin: { minWidth: Breakpoints.Laptop, value: 5 },
                          },
                          dimensions.width
                        )}
                      >
                        <View>
                          {/* menu */}
                          <Pressable
                            onPress={() => {
                              try {
                                setGlobalVariableValue({
                                  key: 'showSidemenu',
                                  value: !Constants['showSidemenu'],
                                });
                              } catch (err) {
                                console.error(err);
                              }
                            }}
                          >
                            <Icon name={'Feather/menu'} size={50} />
                          </Pressable>
                        </View>
                        {/* View 2 */}
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignItems: {
                                minWidth: Breakpoints.Laptop,
                                value: 'center',
                              },
                              flex: { minWidth: Breakpoints.Laptop, value: 1 },
                              justifyContent: {
                                minWidth: Breakpoints.Laptop,
                                value: 'flex-end',
                              },
                              width: {
                                minWidth: Breakpoints.Laptop,
                                value: '100%',
                              },
                            },
                            dimensions.width
                          )}
                        >
                          {/* follow */}
                          <Button
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.ButtonStyles(theme)['Button'],
                                {
                                  borderRadius: {
                                    minWidth: Breakpoints.Laptop,
                                    value: 15,
                                  },
                                  margin: {
                                    minWidth: Breakpoints.Laptop,
                                    value: 5,
                                  },
                                  width: {
                                    minWidth: Breakpoints.Laptop,
                                    value: 100,
                                  },
                                }
                              ),
                              dimensions.width
                            )}
                            title={'Follow'}
                          />
                          {/* subscribe */}
                          <Button
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.ButtonStyles(theme)['Button'],
                                {
                                  borderRadius: {
                                    minWidth: Breakpoints.Laptop,
                                    value: 15,
                                  },
                                  margin: {
                                    minWidth: Breakpoints.Laptop,
                                    value: 5,
                                  },
                                  width: {
                                    minWidth: Breakpoints.Laptop,
                                    value: 100,
                                  },
                                }
                              ),
                              dimensions.width
                            )}
                            title={'Subscribe'}
                          />
                        </View>
                      </View>
                    )}
                  </>
                </View>
                {/* content */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      flex: { minWidth: Breakpoints.Laptop, value: 7 },
                      width: { minWidth: Breakpoints.Laptop, value: '100%' },
                    },
                    dimensions.width
                  )}
                >
                  <Swiper
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.SwiperStyles(theme)['Swiper'],
                        {
                          flex: { minWidth: Breakpoints.Laptop, value: 1 },
                          flexBasis: { minWidth: Breakpoints.Laptop, value: 1 },
                          height: {
                            minWidth: Breakpoints.Laptop,
                            value: '100%',
                          },
                          margin: { minWidth: Breakpoints.Laptop, value: 5 },
                        }
                      ),
                      dimensions.width
                    )}
                    dotsTouchable={false}
                    dotColor={'"rgba(0, 0, 0, 0)"'}
                    dotActiveColor={'"rgba(0, 0, 0, 0)"'}
                  >
                    {/* visibleContent */}
                    <SwiperItem
                      style={StyleSheet.applyWidth(
                        {
                          alignItems: {
                            minWidth: Breakpoints.Laptop,
                            value: 'center',
                          },
                          flex: { minWidth: Breakpoints.Laptop, value: 1 },
                          height: {
                            minWidth: Breakpoints.Laptop,
                            value: '100%',
                          },
                        },
                        dimensions.width
                      )}
                    >
                      <>
                        {!Uploads ? null : (
                          <SwipeableItem
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.SwipeableItemStyles(theme)[
                                  'Swipeable Item'
                                ],
                                {
                                  alignSelf: {
                                    minWidth: Breakpoints.Laptop,
                                    value: 'stretch',
                                  },
                                  height: {
                                    minWidth: Breakpoints.Laptop,
                                    value: dimensions.height,
                                  },
                                }
                              ),
                              dimensions.width
                            )}
                            disableLeftSwipe={false}
                            disableRightSwipe={false}
                            closeOnPress={true}
                            swipeActivationPercentage={80}
                            friction={20}
                            swipeToOpenPercent={50}
                            swipeToClosePercent={50}
                          >
                            <View>
                              <Text
                                style={StyleSheet.applyWidth(
                                  StyleSheet.compose(
                                    GlobalStyles.TextStyles(theme)['Text'],
                                    {
                                      alignSelf: {
                                        minWidth: Breakpoints.Laptop,
                                        value: 'center',
                                      },
                                    }
                                  ),
                                  dimensions.width
                                )}
                              >
                                {
                                  'Upload Screen this screen has all uploaded videos from a specific channel'
                                }
                              </Text>
                            </View>
                          </SwipeableItem>
                        )}
                      </>
                      {/* Swipeable Item 2 */}
                      <>
                        {!Live ? null : (
                          <SwipeableItem
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.SwipeableItemStyles(theme)[
                                  'Swipeable Item'
                                ],
                                {
                                  alignSelf: {
                                    minWidth: Breakpoints.Laptop,
                                    value: 'stretch',
                                  },
                                  flex: {
                                    minWidth: Breakpoints.Laptop,
                                    value: 1,
                                  },
                                  height: {
                                    minWidth: Breakpoints.Laptop,
                                    value: dimensions.height,
                                  },
                                }
                              ),
                              dimensions.width
                            )}
                            disableLeftSwipe={false}
                            disableRightSwipe={false}
                            closeOnPress={true}
                            swipeActivationPercentage={80}
                            friction={20}
                            swipeToOpenPercent={50}
                            swipeToClosePercent={50}
                          >
                            <View>
                              <Text
                                style={StyleSheet.applyWidth(
                                  GlobalStyles.TextStyles(theme)['Text'],
                                  dimensions.width
                                )}
                              >
                                {
                                  'Live Screen this screen shows all past live content from this channel'
                                }
                              </Text>
                            </View>
                          </SwipeableItem>
                        )}
                      </>
                      {/* Swipeable Item 3 */}
                      <>
                        {!Playlist ? null : (
                          <SwipeableItem
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.SwipeableItemStyles(theme)[
                                  'Swipeable Item'
                                ],
                                {
                                  alignSelf: {
                                    minWidth: Breakpoints.Laptop,
                                    value: 'stretch',
                                  },
                                  flex: {
                                    minWidth: Breakpoints.Laptop,
                                    value: 1,
                                  },
                                  height: {
                                    minWidth: Breakpoints.Laptop,
                                    value: dimensions.height,
                                  },
                                }
                              ),
                              dimensions.width
                            )}
                            disableLeftSwipe={false}
                            disableRightSwipe={false}
                            closeOnPress={true}
                            swipeActivationPercentage={80}
                            friction={20}
                            swipeToOpenPercent={50}
                            swipeToClosePercent={50}
                          >
                            <View>
                              <Text
                                style={StyleSheet.applyWidth(
                                  GlobalStyles.TextStyles(theme)['Text'],
                                  dimensions.width
                                )}
                              >
                                {
                                  'Playlist screen this screen holds all the play lists from a Channel'
                                }
                              </Text>
                            </View>
                          </SwipeableItem>
                        )}
                      </>
                    </SwiperItem>
                  </Swiper>
                </View>
              </View>
            </>
          );
        }}
      </XanoApiApi.FetchGetChannelGET>
      {/* sideMenu */}
      <>
        {!Constants['showSidemenu'] ? null : (
          <View
            style={StyleSheet.applyWidth(
              { flex: { minWidth: Breakpoints.Laptop, value: 2 } },
              dimensions.width
            )}
          >
            {/* close */}
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: {
                    minWidth: Breakpoints.Laptop,
                    value: 'flex-end',
                  },
                  height: { minWidth: Breakpoints.Laptop, value: 40 },
                  justifyContent: {
                    minWidth: Breakpoints.Laptop,
                    value: 'center',
                  },
                  padding: { minWidth: Breakpoints.Laptop, value: 5 },
                  width: { minWidth: Breakpoints.Laptop, value: '100%' },
                },
                dimensions.width
              )}
            >
              <Pressable
                onPress={() => {
                  try {
                    setGlobalVariableValue({
                      key: 'showSidemenu',
                      value: !Constants['showSidemenu'],
                    });
                  } catch (err) {
                    console.error(err);
                  }
                }}
              >
                <Icon size={25} name={'Ionicons/close-circle-outline'} />
              </Pressable>
            </View>
            {/* View 2 */}
            <View
              style={StyleSheet.applyWidth(
                {
                  backgroundColor: {
                    minWidth: Breakpoints.Laptop,
                    value: theme.colors['Light'],
                  },
                  flex: { minWidth: Breakpoints.Laptop, value: 1 },
                },
                dimensions.width
              )}
            />
          </View>
        )}
      </>
    </ScreenContainer>
  );
};

export default withTheme(ChannelPageScreen);
