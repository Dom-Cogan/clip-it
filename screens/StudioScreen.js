import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import {
  Divider,
  Icon,
  ScreenContainer,
  TextInput,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { useIsFocused } from '@react-navigation/native';
import { Image, Text, View, useWindowDimensions } from 'react-native';

const StudioScreen = props => {
  const dimensions = useWindowDimensions();

  const { theme } = props;

  const isFocused = useIsFocused();
  React.useEffect(() => {
    try {
      if (!isFocused) {
        return;
      }
      setFileName((props.route?.params?.videoFile ?? 'Test Value')?.name);
    } catch (err) {
      console.error(err);
    }
  }, [isFocused]);

  const [fileName, setFileName] = React.useState('');
  const [selected, setSelected] = React.useState(false);
  const [textInputValue, setTextInputValue] = React.useState('');
  const [textInputValue2, setTextInputValue2] = React.useState('');

  return (
    <ScreenContainer scrollable={false} hasSafeArea={false}>
      {/* upload */}
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: { minWidth: Breakpoints.Laptop, value: 'center' },
            backgroundColor: {
              minWidth: Breakpoints.Laptop,
              value: theme.colors['Error'],
            },
            flex: { minWidth: Breakpoints.Laptop, value: 1 },
            justifyContent: { minWidth: Breakpoints.Laptop, value: 'center' },
            margin: { minWidth: Breakpoints.Laptop, value: 5 },
          },
          dimensions.width
        )}
      >
        {/* details */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignSelf: { minWidth: Breakpoints.Laptop, value: 'stretch' },
              backgroundColor: {
                minWidth: Breakpoints.Laptop,
                value: theme.colors['Background'],
              },
              flex: { minWidth: Breakpoints.Laptop, value: 1 },
              flexDirection: { minWidth: Breakpoints.Laptop, value: 'column' },
              margin: { minWidth: Breakpoints.Laptop, value: 5 },
            },
            dimensions.width
          )}
        >
          <View
            style={StyleSheet.applyWidth(
              {
                alignSelf: { minWidth: Breakpoints.Laptop, value: 'stretch' },
                backgroundColor: {
                  minWidth: Breakpoints.Laptop,
                  value: theme.colors['Strong'],
                },
                flex: { minWidth: Breakpoints.Laptop, value: 1 },
              },
              dimensions.width
            )}
          >
            <Divider
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.DividerStyles(theme)['Divider'],
                  {
                    height: { minWidth: Breakpoints.Laptop, value: 5 },
                    marginBottom: { minWidth: Breakpoints.Laptop, value: 2 },
                    marginTop: { minWidth: Breakpoints.Laptop, value: 2 },
                  }
                ),
                dimensions.width
              )}
              color={theme.colors['Medium']}
            />
            <Text
              style={StyleSheet.applyWidth(
                StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                  color: {
                    minWidth: Breakpoints.Laptop,
                    value: theme.colors['Background'],
                  },
                }),
                dimensions.width
              )}
            >
              {null}
            </Text>
          </View>
          {/* View 2 */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: { minWidth: Breakpoints.Laptop, value: 'center' },
                alignSelf: { minWidth: Breakpoints.Laptop, value: 'stretch' },
                backgroundColor: {
                  minWidth: Breakpoints.Laptop,
                  value: theme.colors['Secondary'],
                },
                flex: { minWidth: Breakpoints.Laptop, value: 2 },
                flexDirection: { minWidth: Breakpoints.Laptop, value: 'row' },
                justifyContent: {
                  minWidth: Breakpoints.Laptop,
                  value: 'space-around',
                },
                margin: { minWidth: Breakpoints.Laptop, value: 5 },
              },
              dimensions.width
            )}
          >
            {/* detailinfo */}
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: { minWidth: Breakpoints.Laptop, value: 'center' },
                  backgroundColor: {
                    minWidth: Breakpoints.Laptop,
                    value: theme.colors['Divider'],
                  },
                  borderRadius: { minWidth: Breakpoints.Laptop, value: 15 },
                  height: { minWidth: Breakpoints.Laptop, value: 75 },
                  justifyContent: {
                    minWidth: Breakpoints.Laptop,
                    value: 'center',
                  },
                  width: { minWidth: Breakpoints.Laptop, value: 175 },
                },
                dimensions.width
              )}
            >
              <Text
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                    fontFamily: {
                      minWidth: Breakpoints.Laptop,
                      value: 'AlfaSlabOne_400Regular',
                    },
                    fontSize: { minWidth: Breakpoints.Laptop, value: 18 },
                  }),
                  dimensions.width
                )}
              >
                {'Details'}
              </Text>
              <Icon size={24} name={'FontAwesome/check-circle'} />
            </View>
            {/* elementInfo */}
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: { minWidth: Breakpoints.Laptop, value: 'center' },
                  backgroundColor: {
                    minWidth: Breakpoints.Laptop,
                    value: theme.colors['Divider'],
                  },
                  borderRadius: { minWidth: Breakpoints.Laptop, value: 15 },
                  height: { minWidth: Breakpoints.Laptop, value: 75 },
                  justifyContent: {
                    minWidth: Breakpoints.Laptop,
                    value: 'center',
                  },
                  width: { minWidth: Breakpoints.Laptop, value: 175 },
                },
                dimensions.width
              )}
            >
              <Text
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                    fontFamily: {
                      minWidth: Breakpoints.Laptop,
                      value: 'AlfaSlabOne_400Regular',
                    },
                    fontSize: { minWidth: Breakpoints.Laptop, value: 18 },
                  }),
                  dimensions.width
                )}
              >
                {'Details'}
              </Text>
              <Icon size={24} name={'FontAwesome/check-circle'} />
            </View>
            {/* checkinfo */}
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: { minWidth: Breakpoints.Laptop, value: 'center' },
                  backgroundColor: {
                    minWidth: Breakpoints.Laptop,
                    value: theme.colors['Divider'],
                  },
                  borderRadius: { minWidth: Breakpoints.Laptop, value: 15 },
                  height: { minWidth: Breakpoints.Laptop, value: 75 },
                  justifyContent: {
                    minWidth: Breakpoints.Laptop,
                    value: 'center',
                  },
                  width: { minWidth: Breakpoints.Laptop, value: 175 },
                },
                dimensions.width
              )}
            >
              <Text
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                    fontFamily: {
                      minWidth: Breakpoints.Laptop,
                      value: 'AlfaSlabOne_400Regular',
                    },
                    fontSize: { minWidth: Breakpoints.Laptop, value: 18 },
                  }),
                  dimensions.width
                )}
              >
                {'Details'}
              </Text>
              <Icon size={24} name={'FontAwesome/check-circle'} />
            </View>
            {/* visibilityinfo */}
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: { minWidth: Breakpoints.Laptop, value: 'center' },
                  backgroundColor: {
                    minWidth: Breakpoints.Laptop,
                    value: theme.colors['Divider'],
                  },
                  borderRadius: { minWidth: Breakpoints.Laptop, value: 15 },
                  height: { minWidth: Breakpoints.Laptop, value: 75 },
                  justifyContent: {
                    minWidth: Breakpoints.Laptop,
                    value: 'center',
                  },
                  width: { minWidth: Breakpoints.Laptop, value: 175 },
                },
                dimensions.width
              )}
            >
              <Text
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                    fontFamily: {
                      minWidth: Breakpoints.Laptop,
                      value: 'AlfaSlabOne_400Regular',
                    },
                    fontSize: { minWidth: Breakpoints.Laptop, value: 18 },
                  }),
                  dimensions.width
                )}
              >
                {'Visibility'}
              </Text>
              <Icon size={24} name={'FontAwesome/check-circle'} />
            </View>
          </View>
        </View>
        {/* elements */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignSelf: { minWidth: Breakpoints.Laptop, value: 'stretch' },
              flex: { minWidth: Breakpoints.Laptop, value: 5 },
              margin: { minWidth: Breakpoints.Laptop, value: 5 },
            },
            dimensions.width
          )}
        >
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
                StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                  fontFamily: {
                    minWidth: Breakpoints.Laptop,
                    value: 'AlfaSlabOne_400Regular',
                  },
                  fontSize: { minWidth: Breakpoints.Laptop, value: 18 },
                  marginLeft: { minWidth: Breakpoints.Laptop, value: 5 },
                }),
                dimensions.width
              )}
            >
              {'Hub Info'}
            </Text>
            {/* View 2 */}
            <View
              style={StyleSheet.applyWidth(
                {
                  backgroundColor: {
                    minWidth: Breakpoints.Laptop,
                    value: theme.colors['Secondary'],
                  },
                  flex: { minWidth: Breakpoints.Laptop, value: 1 },
                },
                dimensions.width
              )}
            >
              <Text
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                    fontFamily: {
                      minWidth: Breakpoints.Laptop,
                      value: 'AlfaSlabOne_400Regular',
                    },
                    fontSize: { minWidth: Breakpoints.Laptop, value: 24 },
                  }),
                  dimensions.width
                )}
              >
                {'Visibility'}
              </Text>
              {/* Text 2 */}
              <Text
                style={StyleSheet.applyWidth(
                  GlobalStyles.TextStyles(theme)['Text'],
                  dimensions.width
                )}
              >
                {
                  'Choose where your video lives, when your video can be viewed, and who can see you video.'
                }
              </Text>
              <View />
            </View>
          </View>
        </View>
        {/* progress */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignSelf: { minWidth: Breakpoints.Laptop, value: 'stretch' },
              backgroundColor: {
                minWidth: Breakpoints.Laptop,
                value: theme.colors['Primary'],
              },
              flex: { minWidth: Breakpoints.Laptop, value: 1 },
              margin: { minWidth: Breakpoints.Laptop, value: 5 },
            },
            dimensions.width
          )}
        />
      </View>
    </ScreenContainer>
  );
};

export default withTheme(StudioScreen);
