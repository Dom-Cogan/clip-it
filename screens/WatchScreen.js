import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import {
  Button,
  Circle,
  Icon,
  IconButton,
  Pressable,
  ScreenContainer,
  TextInput,
  withTheme,
} from '@draftbit/ui';
import { Image, Text, View, useWindowDimensions } from 'react-native';

const WatchScreen = props => {
  const dimensions = useWindowDimensions();

  const { theme } = props;

  const [textInputValue, setTextInputValue] = React.useState('');

  return (
    <ScreenContainer hasSafeArea={false} scrollable={true}>
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
                alignItems: { minWidth: Breakpoints.Laptop, value: 'flex-end' },
                minHeight: { minWidth: Breakpoints.Laptop, value: 52 },
                padding: { minWidth: Breakpoints.Laptop, value: 10 },
                width: { minWidth: Breakpoints.Laptop, value: '100%' },
              },
              dimensions.width
            )}
          >
            {/* watermark */}
            <IconButton size={32} icon={'Feather/menu'} />
          </View>
          {/* page */}
          <View
            style={StyleSheet.applyWidth(
              { flex: { minWidth: Breakpoints.Laptop, value: 1 } },
              dimensions.width
            )}
          >
            {/* video */}
            <View
              style={StyleSheet.applyWidth(
                {
                  flexDirection: {
                    minWidth: Breakpoints.Laptop,
                    value: 'column',
                  },
                  flexWrap: { minWidth: Breakpoints.Laptop, value: 'wrap' },
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
                    backgroundColor: {
                      minWidth: Breakpoints.Laptop,
                      value: theme.colors['Error'],
                    },
                    borderRadius: { minWidth: Breakpoints.Laptop, value: 25 },
                    height: { minWidth: Breakpoints.Laptop, value: 480 },
                    margin: { minWidth: Breakpoints.Laptop, value: 5 },
                    width: { minWidth: Breakpoints.Laptop, value: 960 },
                  },
                  dimensions.width
                )}
              />
              {/* Details */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: {
                      minWidth: Breakpoints.Laptop,
                      value: theme.colors['Light'],
                    },
                    borderRadius: { minWidth: Breakpoints.Laptop, value: 25 },
                    margin: { minWidth: Breakpoints.Laptop, value: 5 },
                    padding: { minWidth: Breakpoints.Laptop, value: 10 },
                  },
                  dimensions.width
                )}
              >
                {/* info */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: {
                        minWidth: Breakpoints.Laptop,
                        value: 'center',
                      },
                      alignSelf: {
                        minWidth: Breakpoints.Laptop,
                        value: 'flex-end',
                      },
                      flexDirection: {
                        minWidth: Breakpoints.Laptop,
                        value: 'row',
                      },
                      padding: { minWidth: Breakpoints.Laptop, value: 10 },
                      width: { minWidth: Breakpoints.Laptop, value: '100%' },
                    },
                    dimensions.width
                  )}
                >
                  <Circle bgColor={theme.colors.light} size={69}>
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
                  {/* details */}
                  <View
                    style={StyleSheet.applyWidth(
                      { flex: { minWidth: Breakpoints.Laptop, value: 1 } },
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
                            margin: { minWidth: Breakpoints.Laptop, value: 5 },
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
                              value: 2,
                            },
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {'Follower Count'}
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
                            margin: { minWidth: Breakpoints.Laptop, value: 2 },
                            marginLeft: {
                              minWidth: Breakpoints.Laptop,
                              value: 10,
                            },
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {'Subscriber Count'}
                    </Text>
                  </View>
                  {/* interaction */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: {
                          minWidth: Breakpoints.Laptop,
                          value: 'stretch',
                        },
                        flexDirection: {
                          minWidth: Breakpoints.Laptop,
                          value: 'row',
                        },
                        padding: { minWidth: Breakpoints.Laptop, value: 5 },
                      },
                      dimensions.width
                    )}
                  >
                    {/* Button 2 */}
                    <Button
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.ButtonStyles(theme)['Button'],
                          { margin: { minWidth: Breakpoints.Laptop, value: 5 } }
                        ),
                        dimensions.width
                      )}
                      title={'Follow'}
                    />
                    <Button
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.ButtonStyles(theme)['Button'],
                          { margin: { minWidth: Breakpoints.Laptop, value: 5 } }
                        ),
                        dimensions.width
                      )}
                      title={'Subscribe'}
                    />
                  </View>
                </View>
                {/* interactable */}
                <View
                  style={StyleSheet.applyWidth(
                    {
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
                  <Pressable
                    style={StyleSheet.applyWidth(
                      {
                        marginRight: { minWidth: Breakpoints.Laptop, value: 5 },
                        marginTop: { minWidth: Breakpoints.Laptop, value: 5 },
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
                            value: theme.colors['Background'],
                          },
                          borderTopLeftRadius: {
                            minWidth: Breakpoints.Laptop,
                            value: 10,
                          },
                          borderTopRightRadius: {
                            minWidth: Breakpoints.Laptop,
                            value: 10,
                          },
                          justifyContent: {
                            minWidth: Breakpoints.Laptop,
                            value: 'center',
                          },
                          maxWidth: {
                            minWidth: Breakpoints.Laptop,
                            value: 100,
                          },
                          padding: { minWidth: Breakpoints.Laptop, value: 5 },
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
                        {'Description'}
                      </Text>
                    </View>
                  </Pressable>

                  <Pressable
                    style={StyleSheet.applyWidth(
                      {
                        marginRight: { minWidth: Breakpoints.Laptop, value: 5 },
                        marginTop: { minWidth: Breakpoints.Laptop, value: 5 },
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
                            value: theme.colors['Medium Inverse'],
                          },
                          borderTopLeftRadius: {
                            minWidth: Breakpoints.Laptop,
                            value: 10,
                          },
                          borderTopRightRadius: {
                            minWidth: Breakpoints.Laptop,
                            value: 10,
                          },
                          justifyContent: {
                            minWidth: Breakpoints.Laptop,
                            value: 'center',
                          },
                          maxWidth: {
                            minWidth: Breakpoints.Laptop,
                            value: 100,
                          },
                          padding: { minWidth: Breakpoints.Laptop, value: 5 },
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
                        {'References'}
                      </Text>
                    </View>
                  </Pressable>
                </View>
                {/* contnet */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      backgroundColor: {
                        minWidth: Breakpoints.Laptop,
                        value: theme.colors['Background'],
                      },
                      borderBottomLeftRadius: {
                        minWidth: Breakpoints.Laptop,
                        value: 20,
                      },
                      borderBottomRightRadius: {
                        minWidth: Breakpoints.Laptop,
                        value: 20,
                      },
                      borderTopRightRadius: {
                        minWidth: Breakpoints.Laptop,
                        value: 20,
                      },
                    },
                    dimensions.width
                  )}
                >
                  {/* description */}
                  <View
                    style={StyleSheet.applyWidth(
                      { flex: { minWidth: Breakpoints.Laptop, value: 1 } },
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
                        'This is a text box that takes basic text (possible Rich text depending on implementation ease). This should only be text however (no links, images, or attached files are allowed)'
                      }
                    </Text>
                  </View>
                  {/* references */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
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
                    {/* component */}
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
                          flexDirection: {
                            minWidth: Breakpoints.Laptop,
                            value: 'row',
                          },
                          margin: { minWidth: Breakpoints.Laptop, value: 10 },
                          padding: { minWidth: Breakpoints.Laptop, value: 10 },
                          width: { minWidth: Breakpoints.Laptop, value: 400 },
                        },
                        dimensions.width
                      )}
                    >
                      <Image
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.ImageStyles(theme)['Image'],
                            {
                              height: {
                                minWidth: Breakpoints.Laptop,
                                value: 100,
                              },
                              width: {
                                minWidth: Breakpoints.Laptop,
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
                            flex: { minWidth: Breakpoints.Laptop, value: 1 },
                            justifyContent: {
                              minWidth: Breakpoints.Laptop,
                              value: 'space-between',
                            },
                            marginLeft: {
                              minWidth: Breakpoints.Laptop,
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
                              GlobalStyles.TextStyles(theme)['Text'],
                              dimensions.width
                            )}
                          >
                            {'Reference Title'}
                          </Text>
                          {/* description */}
                          <Text
                            style={StyleSheet.applyWidth(
                              GlobalStyles.TextStyles(theme)['Text'],
                              dimensions.width
                            )}
                          >
                            {'Reference description'}
                          </Text>
                        </View>
                        {/* link */}
                        <View>
                          {/* url */}
                          <Text
                            style={StyleSheet.applyWidth(
                              GlobalStyles.TextStyles(theme)['Text'],
                              dimensions.width
                            )}
                          >
                            {'Reference Url'}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            {/* commentSection */}
            <View>
              {/* comment */}
              <View
                style={StyleSheet.applyWidth(
                  GlobalStyles.ViewStyles(theme)['add comment'],
                  dimensions.width
                )}
              >
                <View
                  style={StyleSheet.applyWidth(
                    {
                      backgroundColor: {
                        minWidth: Breakpoints.Laptop,
                        value: theme.colors['Ad'],
                      },
                      borderRadius: { minWidth: Breakpoints.Laptop, value: 15 },
                      height: { minWidth: Breakpoints.Laptop, value: 75 },
                      margin: { minWidth: Breakpoints.Laptop, value: 5 },
                      overflow: {
                        minWidth: Breakpoints.Laptop,
                        value: 'hidden',
                      },
                    },
                    dimensions.width
                  )}
                />
                {/* content */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      backgroundColor: {
                        minWidth: Breakpoints.Laptop,
                        value: theme.colors['Light'],
                      },
                      borderRadius: { minWidth: Breakpoints.Laptop, value: 15 },
                      marginLeft: { minWidth: Breakpoints.Laptop, value: 10 },
                      marginRight: { minWidth: Breakpoints.Laptop, value: 10 },
                      minHeight: { minWidth: Breakpoints.Laptop, value: 100 },
                      padding: { minWidth: Breakpoints.Laptop, value: 5 },
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
                        padding: { minWidth: Breakpoints.Laptop, value: 5 },
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
                          flex: { minWidth: Breakpoints.Laptop, value: 1 },
                          margin: { minWidth: Breakpoints.Laptop, value: 5 },
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
                          width: { minWidth: Breakpoints.Laptop, value: 150 },
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
                            padding: { minWidth: Breakpoints.Laptop, value: 5 },
                          },
                          dimensions.width
                        )}
                      >
                        <IconButton icon={'Entypo/thumbs-down'} size={18} />
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
                            padding: { minWidth: Breakpoints.Laptop, value: 5 },
                          },
                          dimensions.width
                        )}
                      >
                        {/* Icon Button 2 */}
                        <IconButton icon={'Entypo/thumbs-up'} size={18} />
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
                        flex: { minWidth: Breakpoints.Laptop, value: 1 },
                        padding: { minWidth: Breakpoints.Laptop, value: 5 },
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
                      marginRight: { minWidth: Breakpoints.Laptop, value: 10 },
                      marginTop: { minWidth: Breakpoints.Laptop, value: 5 },
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
                        padding: { minWidth: Breakpoints.Laptop, value: 10 },
                      },
                      dimensions.width
                    )}
                  >
                    <IconButton
                      icon={'Ionicons/ios-pencil-sharp'}
                      size={18}
                      color={theme.colors['Strong']}
                    />
                  </View>
                </View>
                {/* addReply */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      backgroundColor: {
                        minWidth: Breakpoints.Laptop,
                        value: theme.colors['Light'],
                      },
                      borderRadius: { minWidth: Breakpoints.Laptop, value: 15 },
                      flex: { minWidth: Breakpoints.Laptop, value: 1 },
                      marginLeft: { minWidth: Breakpoints.Laptop, value: 20 },
                      marginRight: { minWidth: Breakpoints.Laptop, value: 20 },
                      marginTop: { minWidth: Breakpoints.Laptop, value: 5 },
                      padding: { minWidth: Breakpoints.Laptop, value: 10 },
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
                        margin: { minWidth: Breakpoints.Laptop, value: 5 },
                      },
                      dimensions.width
                    )}
                  >
                    {/* close */}
                    <Pressable>
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
                          GlobalStyles.TextInputStyles(theme)['Text Input'],
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
              </View>
            </View>
          </View>
        </View>
      </View>
      {/* sideMenu */}
      <View />
    </ScreenContainer>
  );
};

export default withTheme(WatchScreen);
