import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as HubCDNApi from '../apis/HubCDNApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import getHub from '../global-functions/getHub';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
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
  Image,
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

  const isFocused = useIsFocused();
  React.useEffect(() => {
    const handler = async () => {
      try {
        if (!isFocused) {
          return;
        }
        await getHub(
          Constants['ERROR_MESSAGE'],
          hub,
          'e9c39cf6-59cf-480e-a25b-34f73dcc85f6'
        );
      } catch (err) {
        console.error(err);
      }
    };
    handler();
  }, [isFocused]);

  const [hub, setHub] = React.useState({});
  const [replyComment, setReplyComment] = React.useState(false);
  const [textInputValue, setTextInputValue] = React.useState('');
  const [textInputValue2, setTextInputValue2] = React.useState('');

  return (
    <ScreenContainer scrollable={false} hasSafeArea={false}>
      {/* page */}
      <View
        style={StyleSheet.applyWidth(
          {
            flex: { minWidth: Breakpoints.Laptop, value: 1 },
            flexDirection: { minWidth: Breakpoints.Laptop, value: 'row' },
          },
          dimensions.width
        )}
      >
        <HubCDNApi.FetchEmailLoginPOST
          email={'domcoganda@gmail.com'}
          password={'Bluemummy!9'}
        >
          {({ loading, error, data, refetchEmailLogin }) => {
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
                {/* profile */}
                <View
                  style={StyleSheet.applyWidth(
                    { flex: { minWidth: Breakpoints.Laptop, value: 4 } },
                    dimensions.width
                  )}
                >
                  {/* banner */}
                  <View
                    style={StyleSheet.applyWidth(
                      { flex: { minWidth: Breakpoints.Laptop, value: 2 } },
                      dimensions.width
                    )}
                  >
                    {/* header */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignItems: {
                            minWidth: Breakpoints.Laptop,
                            value: 'flex-start',
                          },
                          flex: { minWidth: Breakpoints.Laptop, value: 2 },
                          flexDirection: {
                            minWidth: Breakpoints.Laptop,
                            value: 'row',
                          },
                          justifyContent: {
                            minWidth: Breakpoints.Laptop,
                            value: 'space-between',
                          },
                          padding: { minWidth: Breakpoints.Laptop, value: 10 },
                        },
                        dimensions.width
                      )}
                    >
                      <Text
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.TextStyles(theme)['Text'],
                            {
                              fontFamily: {
                                minWidth: Breakpoints.Laptop,
                                value: 'AlfaSlabOne_400Regular',
                              },
                              fontSize: {
                                minWidth: Breakpoints.Laptop,
                                value: 20,
                              },
                            }
                          ),
                          dimensions.width
                        )}
                      >
                        {'Hub Name'}
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
                        {
                          alignItems: {
                            minWidth: Breakpoints.Laptop,
                            value: 'center',
                          },
                          flex: { minWidth: Breakpoints.Laptop, value: 1 },
                          flexDirection: {
                            minWidth: Breakpoints.Laptop,
                            value: 'row',
                          },
                          justifyContent: {
                            minWidth: Breakpoints.Laptop,
                            value: 'flex-start',
                          },
                        },
                        dimensions.width
                      )}
                    >
                      {/* follower */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignSelf: {
                              minWidth: Breakpoints.Laptop,
                              value: 'flex-end',
                            },
                            flexDirection: {
                              minWidth: Breakpoints.Laptop,
                              value: 'row',
                            },
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
                            alignSelf: {
                              minWidth: Breakpoints.Laptop,
                              value: 'flex-end',
                            },
                            flexDirection: {
                              minWidth: Breakpoints.Laptop,
                              value: 'row',
                            },
                            margin: { minWidth: Breakpoints.Laptop, value: 10 },
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
                  </View>
                  {/* view */}
                  <View
                    style={StyleSheet.applyWidth(
                      { flex: { minWidth: Breakpoints.Laptop, value: 7 } },
                      dimensions.width
                    )}
                  >
                    {/* channels */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignItems: {
                            minWidth: Breakpoints.Laptop,
                            value: 'flex-start',
                          },
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
                        },
                        dimensions.width
                      )}
                    >
                      {/* channel */}
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
                            height: {
                              minWidth: Breakpoints.Laptop,
                              value: 300,
                            },
                            margin: { minWidth: Breakpoints.Laptop, value: 10 },
                            padding: {
                              minWidth: Breakpoints.Laptop,
                              value: 10,
                            },
                            width: { minWidth: Breakpoints.Laptop, value: 250 },
                          },
                          dimensions.width
                        )}
                      >
                        <Circle size={100}>
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
                          <Text
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TextStyles(theme)['Text'],
                                {
                                  color: {
                                    minWidth: Breakpoints.Laptop,
                                    value: theme.colors['Background'],
                                  },
                                }
                              ),
                              dimensions.width
                            )}
                          >
                            {
                              'This is the channel details page. this allows others users quick access to any channel made by the Hub. If a user has not made a channel this section is invisible.'
                            }
                          </Text>
                        </View>
                      </View>
                    </View>
                    {/* posts */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          flex: { minWidth: Breakpoints.Laptop, value: 1 },
                          flexDirection: {
                            minWidth: Breakpoints.Laptop,
                            value: 'row',
                          },
                        },
                        dimensions.width
                      )}
                    >
                      {/* adBanner */}
                      <>
                        {Constants['showSidemenu'] ? null : (
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                backgroundColor: {
                                  minWidth: Breakpoints.Laptop,
                                  value: theme.colors['Ad'],
                                },
                                flex: {
                                  minWidth: Breakpoints.Laptop,
                                  value: 1,
                                },
                                flexBasis: {
                                  minWidth: Breakpoints.Laptop,
                                  value: 1,
                                },
                                margin: {
                                  minWidth: Breakpoints.Laptop,
                                  value: 10,
                                },
                              },
                              dimensions.width
                            )}
                          />
                        )}
                      </>
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
                        {/* post */}
                        <View
                          style={StyleSheet.applyWidth(
                            {
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
                          {/* View 2 */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                backgroundColor: {
                                  minWidth: Breakpoints.Laptop,
                                  value: theme.colors['Ad'],
                                },
                                height: {
                                  minWidth: Breakpoints.Laptop,
                                  value: 75,
                                },
                                margin: {
                                  minWidth: Breakpoints.Laptop,
                                  value: 5,
                                },
                              },
                              dimensions.width
                            )}
                          />
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                backgroundColor: {
                                  minWidth: Breakpoints.Laptop,
                                  value: theme.colors['Medium'],
                                },
                                borderRadius: {
                                  minWidth: Breakpoints.Laptop,
                                  value: 10,
                                },
                                minHeight: {
                                  minWidth: Breakpoints.Laptop,
                                  value: 150,
                                },
                                padding: {
                                  minWidth: Breakpoints.Laptop,
                                  value: 10,
                                },
                              },
                              dimensions.width
                            )}
                          >
                            {/* info */}
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  flexDirection: {
                                    minWidth: Breakpoints.Laptop,
                                    value: 'row',
                                  },
                                  padding: {
                                    minWidth: Breakpoints.Laptop,
                                    value: 5,
                                  },
                                },
                                dimensions.width
                              )}
                            >
                              {/* logo */}
                              <Circle size={50} bgColor={theme.colors.light}>
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

                              <View
                                style={StyleSheet.applyWidth(
                                  {
                                    flex: {
                                      minWidth: Breakpoints.Laptop,
                                      value: 1,
                                    },
                                    margin: {
                                      minWidth: Breakpoints.Laptop,
                                      value: 5,
                                    },
                                  },
                                  dimensions.width
                                )}
                              >
                                <Text
                                  style={StyleSheet.applyWidth(
                                    GlobalStyles.TextStyles(theme)['Text'],
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
                                  {'posted time (relative) @ HH:MM AM'}
                                </Text>
                              </View>
                              {/* interaction */}
                              <View
                                style={StyleSheet.applyWidth(
                                  {
                                    alignContent: {
                                      minWidth: Breakpoints.Laptop,
                                      value: 'stretch',
                                    },
                                    flexDirection: {
                                      minWidth: Breakpoints.Laptop,
                                      value: 'row',
                                    },
                                    marginLeft: {
                                      minWidth: Breakpoints.Laptop,
                                      value: 10,
                                    },
                                    marginRight: {
                                      minWidth: Breakpoints.Laptop,
                                      value: 10,
                                    },
                                    width: {
                                      minWidth: Breakpoints.Laptop,
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
                                      alignItems: {
                                        minWidth: Breakpoints.Laptop,
                                        value: 'center',
                                      },
                                      padding: {
                                        minWidth: Breakpoints.Laptop,
                                        value: 5,
                                      },
                                    },
                                    dimensions.width
                                  )}
                                >
                                  <IconButton
                                    size={32}
                                    icon={'Entypo/thumbs-down'}
                                  />
                                  <Text
                                    style={StyleSheet.applyWidth(
                                      GlobalStyles.TextStyles(theme)['Text'],
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
                                      alignItems: {
                                        minWidth: Breakpoints.Laptop,
                                        value: 'center',
                                      },
                                      padding: {
                                        minWidth: Breakpoints.Laptop,
                                        value: 5,
                                      },
                                    },
                                    dimensions.width
                                  )}
                                >
                                  {/* Icon Button 2 */}
                                  <IconButton
                                    size={32}
                                    icon={'Entypo/thumbs-up'}
                                  />
                                  <Text
                                    style={StyleSheet.applyWidth(
                                      GlobalStyles.TextStyles(theme)['Text'],
                                      dimensions.width
                                    )}
                                  >
                                    {'# of Likes'}
                                  </Text>
                                </View>
                              </View>
                            </View>
                            {/* content */}
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  alignItems: {
                                    minWidth: Breakpoints.Laptop,
                                    value: 'flex-start',
                                  },
                                  backgroundColor: {
                                    minWidth: Breakpoints.Laptop,
                                    value: 'rgba(255, 255, 255, 0.2)',
                                  },
                                  borderRadius: {
                                    minWidth: Breakpoints.Laptop,
                                    value: 10,
                                  },
                                  flex: {
                                    minWidth: Breakpoints.Laptop,
                                    value: 1,
                                  },
                                  padding: {
                                    minWidth: Breakpoints.Laptop,
                                    value: 5,
                                  },
                                },
                                dimensions.width
                              )}
                            >
                              <Text
                                style={StyleSheet.applyWidth(
                                  GlobalStyles.TextStyles(theme)['Text'],
                                  dimensions.width
                                )}
                              >
                                {
                                  'This is where the Hubs post goes. A Hub post is created by the users. Every user has a Hub This of a Hub as a personal Blog. As seen here You should be able to Upload text, like a Facebook post, twitter post, but should also Be able to host images and links to videos from any channel that this Hub is in change of. '
                                }
                              </Text>
                            </View>
                            {/* showReply */}
                            <>
                              {replyComment ? null : (
                                <View
                                  style={StyleSheet.applyWidth(
                                    {
                                      alignItems: {
                                        minWidth: Breakpoints.Laptop,
                                        value: 'center',
                                      },
                                      flexDirection: {
                                        minWidth: Breakpoints.Laptop,
                                        value: 'row',
                                      },
                                      justifyContent: {
                                        minWidth: Breakpoints.Laptop,
                                        value: 'flex-end',
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
                                  <View
                                    style={StyleSheet.applyWidth(
                                      {
                                        backgroundColor: {
                                          minWidth: Breakpoints.Laptop,
                                          value: theme.colors['Light'],
                                        },
                                        borderRadius: {
                                          minWidth: Breakpoints.Laptop,
                                          value: 10,
                                        },
                                        padding: {
                                          minWidth: Breakpoints.Laptop,
                                          value: 10,
                                        },
                                      },
                                      dimensions.width
                                    )}
                                  >
                                    <IconButton
                                      onPress={() => {
                                        try {
                                          setReplyComment(!replyComment);
                                        } catch (err) {
                                          console.error(err);
                                        }
                                      }}
                                      icon={'Ionicons/ios-pencil-sharp'}
                                      size={18}
                                      color={theme.colors['Strong']}
                                    />
                                  </View>
                                </View>
                              )}
                            </>
                          </View>
                          {/* addReply */}
                          <>
                            {!replyComment ? null : (
                              <View
                                style={StyleSheet.applyWidth(
                                  {
                                    backgroundColor: {
                                      minWidth: Breakpoints.Laptop,
                                      value: theme.colors['Light'],
                                    },
                                    borderRadius: {
                                      minWidth: Breakpoints.Laptop,
                                      value: 15,
                                    },
                                    flex: {
                                      minWidth: Breakpoints.Laptop,
                                      value: 1,
                                    },
                                    marginBottom: {
                                      minWidth: Breakpoints.Laptop,
                                      value: 5,
                                    },
                                    marginTop: {
                                      minWidth: Breakpoints.Laptop,
                                      value: 5,
                                    },
                                    padding: {
                                      minWidth: Breakpoints.Laptop,
                                      value: 10,
                                    },
                                  },
                                  dimensions.width
                                )}
                              >
                                {/* interaction */}
                                <View
                                  style={StyleSheet.applyWidth(
                                    {
                                      alignItems: {
                                        minWidth: Breakpoints.Laptop,
                                        value: 'center',
                                      },
                                      flexDirection: {
                                        minWidth: Breakpoints.Laptop,
                                        value: 'row',
                                      },
                                      justifyContent: {
                                        minWidth: Breakpoints.Laptop,
                                        value: 'flex-end',
                                      },
                                      margin: {
                                        minWidth: Breakpoints.Laptop,
                                        value: 5,
                                      },
                                    },
                                    dimensions.width
                                  )}
                                >
                                  {/* close */}
                                  <Pressable
                                    onPress={() => {
                                      try {
                                        setReplyComment(false);
                                      } catch (err) {
                                        console.error(err);
                                      }
                                    }}
                                  >
                                    <View
                                      style={StyleSheet.applyWidth(
                                        {
                                          flexDirection: {
                                            minWidth: Breakpoints.Laptop,
                                            value: 'row',
                                          },
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      <Icon size={24} name={'Ionicons/close'} />
                                    </View>
                                  </Pressable>
                                </View>

                                <View
                                  style={StyleSheet.applyWidth(
                                    {
                                      flexDirection: {
                                        minWidth: Breakpoints.Laptop,
                                        value: 'row',
                                      },
                                    },
                                    dimensions.width
                                  )}
                                >
                                  <TextInput
                                    onChangeText={newTextInputValue => {
                                      const textInputValue = newTextInputValue;
                                      try {
                                        setTextInputValue2(newTextInputValue);
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
                                          width: {
                                            minWidth: Breakpoints.Laptop,
                                            value: '100%',
                                          },
                                        }
                                      ),
                                      dimensions.width
                                    )}
                                    value={textInputValue2}
                                    changeTextDelay={500}
                                    autoCapitalize={'none'}
                                    placeholder={'Enter a value...'}
                                  />
                                  <IconButton
                                    style={StyleSheet.applyWidth(
                                      {
                                        marginBottom: {
                                          minWidth: Breakpoints.Laptop,
                                          value: 10,
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
                                    style={StyleSheet.applyWidth(
                                      {
                                        marginBottom: {
                                          minWidth: Breakpoints.Laptop,
                                          value: 10,
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
                            )}
                          </>
                        </View>
                        {/* comments */}
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              paddingLeft: {
                                minWidth: Breakpoints.Laptop,
                                value: 25,
                              },
                              paddingRight: {
                                minWidth: Breakpoints.Laptop,
                                value: 25,
                              },
                            },
                            dimensions.width
                          )}
                        >
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                backgroundColor: {
                                  minWidth: Breakpoints.Laptop,
                                  value: theme.colors['Light'],
                                },
                                borderBottomLeftRadius: {
                                  minWidth: Breakpoints.Laptop,
                                  value: 15,
                                },
                                borderBottomRightRadius: {
                                  minWidth: Breakpoints.Laptop,
                                  value: 15,
                                },
                                marginLeft: {
                                  minWidth: Breakpoints.Laptop,
                                  value: 10,
                                },
                                marginRight: {
                                  minWidth: Breakpoints.Laptop,
                                  value: 10,
                                },
                                minHeight: {
                                  minWidth: Breakpoints.Laptop,
                                  value: 100,
                                },
                                padding: {
                                  minWidth: Breakpoints.Laptop,
                                  value: 5,
                                },
                              },
                              dimensions.width
                            )}
                          >
                            {/* info */}
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  flexDirection: {
                                    minWidth: Breakpoints.Laptop,
                                    value: 'row',
                                  },
                                  padding: {
                                    minWidth: Breakpoints.Laptop,
                                    value: 5,
                                  },
                                },
                                dimensions.width
                              )}
                            >
                              {/* logo */}
                              <Circle bgColor={theme.colors.light} size={50}>
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

                              <View
                                style={StyleSheet.applyWidth(
                                  {
                                    flex: {
                                      minWidth: Breakpoints.Laptop,
                                      value: 1,
                                    },
                                    margin: {
                                      minWidth: Breakpoints.Laptop,
                                      value: 5,
                                    },
                                  },
                                  dimensions.width
                                )}
                              >
                                <Text
                                  style={StyleSheet.applyWidth(
                                    GlobalStyles.TextStyles(theme)['Text'],
                                    dimensions.width
                                  )}
                                >
                                  {'Commentors Name'}
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
                                  {'posted time (relative) @ HH:MM AM'}
                                </Text>
                              </View>
                              {/* interaction */}
                              <View
                                style={StyleSheet.applyWidth(
                                  {
                                    alignContent: {
                                      minWidth: Breakpoints.Laptop,
                                      value: 'stretch',
                                    },
                                    flexDirection: {
                                      minWidth: Breakpoints.Laptop,
                                      value: 'row',
                                    },
                                    marginLeft: {
                                      minWidth: Breakpoints.Laptop,
                                      value: 10,
                                    },
                                    marginRight: {
                                      minWidth: Breakpoints.Laptop,
                                      value: 10,
                                    },
                                    width: {
                                      minWidth: Breakpoints.Laptop,
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
                                      alignItems: {
                                        minWidth: Breakpoints.Laptop,
                                        value: 'center',
                                      },
                                      padding: {
                                        minWidth: Breakpoints.Laptop,
                                        value: 5,
                                      },
                                    },
                                    dimensions.width
                                  )}
                                >
                                  <IconButton
                                    icon={'Entypo/thumbs-down'}
                                    size={18}
                                  />
                                  <Text
                                    style={StyleSheet.applyWidth(
                                      GlobalStyles.TextStyles(theme)['Text'],
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
                                      alignItems: {
                                        minWidth: Breakpoints.Laptop,
                                        value: 'center',
                                      },
                                      padding: {
                                        minWidth: Breakpoints.Laptop,
                                        value: 5,
                                      },
                                    },
                                    dimensions.width
                                  )}
                                >
                                  {/* Icon Button 2 */}
                                  <IconButton
                                    icon={'Entypo/thumbs-up'}
                                    size={18}
                                  />
                                  <Text
                                    style={StyleSheet.applyWidth(
                                      GlobalStyles.TextStyles(theme)['Text'],
                                      dimensions.width
                                    )}
                                  >
                                    {'# of Likes'}
                                  </Text>
                                </View>
                              </View>
                            </View>
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
                                    value: 'rgba(255, 255, 255, 0.2)',
                                  },
                                  borderRadius: {
                                    minWidth: Breakpoints.Laptop,
                                    value: 10,
                                  },
                                  flex: {
                                    minWidth: Breakpoints.Laptop,
                                    value: 1,
                                  },
                                  padding: {
                                    minWidth: Breakpoints.Laptop,
                                    value: 5,
                                  },
                                },
                                dimensions.width
                              )}
                            >
                              <Text
                                style={StyleSheet.applyWidth(
                                  GlobalStyles.TextStyles(theme)['Text'],
                                  dimensions.width
                                )}
                              >
                                {
                                  'This is a comment on a hub post. This shows the Users profile image that posted the comment, the users name, Unlike an actual post comments con only contain links text and images not videos'
                                }
                              </Text>
                            </View>
                          </View>
                          {/* showReply */}
                          <>
                            {replyComment ? null : (
                              <View
                                style={StyleSheet.applyWidth(
                                  {
                                    alignItems: {
                                      minWidth: Breakpoints.Laptop,
                                      value: 'center',
                                    },
                                    flexDirection: {
                                      minWidth: Breakpoints.Laptop,
                                      value: 'row',
                                    },
                                    justifyContent: {
                                      minWidth: Breakpoints.Laptop,
                                      value: 'flex-end',
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
                                <View
                                  style={StyleSheet.applyWidth(
                                    {
                                      backgroundColor: {
                                        minWidth: Breakpoints.Laptop,
                                        value: theme.colors['Light'],
                                      },
                                      borderRadius: {
                                        minWidth: Breakpoints.Laptop,
                                        value: 10,
                                      },
                                      padding: {
                                        minWidth: Breakpoints.Laptop,
                                        value: 10,
                                      },
                                    },
                                    dimensions.width
                                  )}
                                >
                                  <IconButton
                                    onPress={() => {
                                      try {
                                        setReplyComment(!replyComment);
                                      } catch (err) {
                                        console.error(err);
                                      }
                                    }}
                                    icon={'Ionicons/ios-pencil-sharp'}
                                    size={18}
                                    color={theme.colors['Strong']}
                                  />
                                </View>
                              </View>
                            )}
                          </>
                          {/* addReply */}
                          <>
                            {!replyComment ? null : (
                              <View
                                style={StyleSheet.applyWidth(
                                  {
                                    backgroundColor: {
                                      minWidth: Breakpoints.Laptop,
                                      value: theme.colors['Light'],
                                    },
                                    borderRadius: {
                                      minWidth: Breakpoints.Laptop,
                                      value: 15,
                                    },
                                    flex: {
                                      minWidth: Breakpoints.Laptop,
                                      value: 1,
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
                                    padding: {
                                      minWidth: Breakpoints.Laptop,
                                      value: 10,
                                    },
                                  },
                                  dimensions.width
                                )}
                              >
                                {/* interaction */}
                                <View
                                  style={StyleSheet.applyWidth(
                                    {
                                      alignItems: {
                                        minWidth: Breakpoints.Laptop,
                                        value: 'center',
                                      },
                                      flexDirection: {
                                        minWidth: Breakpoints.Laptop,
                                        value: 'row',
                                      },
                                      justifyContent: {
                                        minWidth: Breakpoints.Laptop,
                                        value: 'flex-end',
                                      },
                                      margin: {
                                        minWidth: Breakpoints.Laptop,
                                        value: 5,
                                      },
                                    },
                                    dimensions.width
                                  )}
                                >
                                  {/* close */}
                                  <Pressable
                                    onPress={() => {
                                      try {
                                        setReplyComment(false);
                                      } catch (err) {
                                        console.error(err);
                                      }
                                    }}
                                  >
                                    <View
                                      style={StyleSheet.applyWidth(
                                        {
                                          flexDirection: {
                                            minWidth: Breakpoints.Laptop,
                                            value: 'row',
                                          },
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      <Icon size={24} name={'Ionicons/close'} />
                                    </View>
                                  </Pressable>
                                </View>

                                <View
                                  style={StyleSheet.applyWidth(
                                    {
                                      flexDirection: {
                                        minWidth: Breakpoints.Laptop,
                                        value: 'row',
                                      },
                                    },
                                    dimensions.width
                                  )}
                                >
                                  <TextInput
                                    onChangeText={newTextInputValue => {
                                      const textInputValue = newTextInputValue;
                                      try {
                                        setTextInputValue(textInputValue);
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
                                          width: {
                                            minWidth: Breakpoints.Laptop,
                                            value: '100%',
                                          },
                                        }
                                      ),
                                      dimensions.width
                                    )}
                                    changeTextDelay={500}
                                    autoCapitalize={'none'}
                                    placeholder={'Enter a value...'}
                                    value={textInputValue}
                                  />
                                  <IconButton
                                    style={StyleSheet.applyWidth(
                                      {
                                        marginBottom: {
                                          minWidth: Breakpoints.Laptop,
                                          value: 10,
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
                                    style={StyleSheet.applyWidth(
                                      {
                                        marginBottom: {
                                          minWidth: Breakpoints.Laptop,
                                          value: 10,
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
                            )}
                          </>
                        </View>
                      </View>
                      {/* adBanner */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            backgroundColor: {
                              minWidth: Breakpoints.Laptop,
                              value: theme.colors['Ad'],
                            },
                            flex: { minWidth: Breakpoints.Laptop, value: 1 },
                            flexBasis: {
                              minWidth: Breakpoints.Laptop,
                              value: 1,
                            },
                            flexShrink: {
                              minWidth: Breakpoints.Laptop,
                              value: 0,
                            },
                            margin: { minWidth: Breakpoints.Laptop, value: 10 },
                          },
                          dimensions.width
                        )}
                      />
                    </View>
                  </View>
                </View>
              </>
            );
          }}
        </HubCDNApi.FetchEmailLoginPOST>
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
                  marginLeft: { minWidth: Breakpoints.Laptop, value: 10 },
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
      </View>
    </ScreenContainer>
  );
};

export default withTheme(HubScreen);
