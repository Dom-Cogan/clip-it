import React from 'react';
import * as HubCDNApi from '../apis/HubCDNApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import {
  Button,
  CheckboxRow,
  Divider,
  Icon,
  ScreenContainer,
  TextInput,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { Image, Text, View, useWindowDimensions } from 'react-native';

const LoginScreen = props => {
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();

  const { theme } = props;
  const { navigation } = props;

  const [checkboxRowValue, setCheckboxRowValue] = React.useState('');
  const [email, setEmail] = React.useState(Constants['email']);
  const [password, setPassword] = React.useState(Constants['password']);

  return (
    <ScreenContainer
      style={StyleSheet.applyWidth(
        {
          alignItems: { minWidth: Breakpoints.Laptop, value: 'center' },
          flex: { minWidth: Breakpoints.Laptop, value: 1 },
        },
        dimensions.width
      )}
      scrollable={false}
      hasSafeArea={true}
    >
      {/* View 2 */}
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'center',
            alignSelf: { minWidth: Breakpoints.Laptop, value: 'stretch' },
            flex: [
              { minWidth: Breakpoints.Laptop, value: 1 },
              { minWidth: Breakpoints.Mobile, value: 1 },
            ],
            justifyContent: 'center',
          },
          dimensions.width
        )}
      >
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              maxWidth: 500,
              paddingLeft: 24,
              paddingRight: 24,
              paddingTop: 20,
            },
            dimensions.width
          )}
        >
          {/* Logo */}
          <Image
            style={StyleSheet.applyWidth(
              { height: 120, width: 120 },
              dimensions.width
            )}
            resizeMode={'cover'}
            source={Images.BigLogo}
          />
          {/* Login to Your Account */}
          <Text
            style={StyleSheet.applyWidth(
              {
                color: theme.colors.strong,
                fontFamily: 'Inter_700Bold',
                fontSize: 28,
              },
              dimensions.width
            )}
          >
            {'Login to Your Account'}
          </Text>
          {/* Email */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                backgroundColor: theme.colors['BG Gray'],
                borderBottomWidth: 1,
                borderColor: theme.colors['Divider'],
                borderLeftWidth: 1,
                borderRadius: 16,
                borderRightWidth: 1,
                borderTopWidth: 1,
                flexDirection: 'row',
                height: 60,
                justifyContent: 'space-between',
                margin: { minWidth: Breakpoints.Laptop, value: 5 },
                paddingLeft: 20,
                paddingRight: 20,
                width: '100%',
              },
              dimensions.width
            )}
          >
            <Icon
              size={24}
              name={'MaterialCommunityIcons/email'}
              color={theme.colors['Custom Color_20']}
            />
            <View
              style={StyleSheet.applyWidth(
                { flex: 1, paddingLeft: 10, paddingRight: 10 },
                dimensions.width
              )}
            >
              {/* emailInput */}
              <TextInput
                onChangeText={newEmailInputValue => {
                  try {
                    setEmail(newEmailInputValue);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                style={StyleSheet.applyWidth(
                  {
                    borderRadius: 8,
                    paddingBottom: 8,
                    paddingLeft: 8,
                    paddingRight: 8,
                    paddingTop: 8,
                  },
                  dimensions.width
                )}
                placeholder={'Email'}
                value={email}
                editable={true}
                placeholderTextColor={theme.colors['Custom Color_20']}
              />
            </View>
          </View>
          {/* Password */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                backgroundColor: theme.colors['BG Gray'],
                borderBottomWidth: 1,
                borderColor: theme.colors['Divider'],
                borderLeftWidth: 1,
                borderRadius: 16,
                borderRightWidth: 1,
                borderTopWidth: 1,
                flexDirection: 'row',
                height: 60,
                justifyContent: 'space-between',
                paddingLeft: 20,
                paddingRight: 20,
                width: '100%',
              },
              dimensions.width
            )}
          >
            <Icon
              size={24}
              color={theme.colors['Custom Color_20']}
              name={'FontAwesome/lock'}
            />
            <View
              style={StyleSheet.applyWidth(
                { flex: 1, paddingLeft: 10, paddingRight: 10 },
                dimensions.width
              )}
            >
              {/* passwordInput */}
              <TextInput
                onChangeText={newPasswordInputValue => {
                  console.log('passwordInput ON_CHANGE_TEXT Start');
                  let error = null;
                  try {
                    console.log(
                      'Start ON_CHANGE_TEXT:0 SET_SCREEN_LOCAL_STATE'
                    );
                    setEmail(newPasswordInputValue);
                    console.log(
                      'Complete ON_CHANGE_TEXT:0 SET_SCREEN_LOCAL_STATE'
                    );
                    console.log('Start ON_CHANGE_TEXT:1 CONSOLE_LOG');
                    console.log(email);
                    console.log('Complete ON_CHANGE_TEXT:1 CONSOLE_LOG');
                  } catch (err) {
                    console.error(err);
                    error = err.message ?? err;
                  }
                  console.log(
                    'passwordInput ON_CHANGE_TEXT Complete',
                    error ? { error } : 'no error'
                  );
                }}
                style={StyleSheet.applyWidth(
                  {
                    borderRadius: 8,
                    paddingBottom: 8,
                    paddingLeft: 8,
                    paddingRight: 8,
                    paddingTop: 8,
                  },
                  dimensions.width
                )}
                placeholder={'Password'}
                editable={true}
                placeholderTextColor={theme.colors['Custom Color_20']}
                secureTextEntry={true}
              />
            </View>
            <Icon
              size={24}
              name={'Ionicons/md-eye-off'}
              color={theme.colors['Custom Color_20']}
            />
          </View>
          {/* Remember me */}
          <View style={StyleSheet.applyWidth({ width: 160 }, dimensions.width)}>
            <CheckboxRow
              onPress={newCheckboxRowValue => {
                try {
                  setCheckboxRowValue(newCheckboxRowValue);
                  console.log(checkboxRowValue);
                } catch (err) {
                  console.error(err);
                }
              }}
              style={StyleSheet.applyWidth({ minHeight: 50 }, dimensions.width)}
              value={checkboxRowValue}
              label={'Remember me'}
              direction={'row-reverse'}
            />
          </View>
          {/* Sign in */}
          <Button
            onPress={() => {
              const handler = async () => {
                console.log('Sign in ON_PRESS Start');
                let error = null;
                try {
                  console.log('Start ON_PRESS:0 FETCH_REQUEST');
                  const user = await HubCDNApi.emailLoginPOST(Constants, {
                    email: email,
                    password: password,
                  });
                  console.log('Complete ON_PRESS:0 FETCH_REQUEST', { user });
                  console.log('Start ON_PRESS:1 CONSOLE_LOG');
                  console.log(email);
                  console.log('Complete ON_PRESS:1 CONSOLE_LOG');
                  console.log('Start ON_PRESS:2 CONSOLE_LOG');
                  console.log(Constants['password']);
                  console.log('Complete ON_PRESS:2 CONSOLE_LOG');
                  console.log('Start ON_PRESS:3 NAVIGATE_SCREEN');
                  navigation.navigate('LoginScreen', { currentUser: user });
                  console.log('Complete ON_PRESS:3 NAVIGATE_SCREEN');
                  console.log('Start ON_PRESS:4 TERMINATION_CHECK');
                  if (checkboxRowValue?.false) {
                    return;
                  }
                  console.log('Complete ON_PRESS:4 TERMINATION_CHECK');
                  console.log('Start ON_PRESS:5 SET_GLOBAL_VARIABLE');
                  setGlobalVariableValue({
                    key: 'email',
                    value: email,
                  });
                  console.log('Complete ON_PRESS:5 SET_GLOBAL_VARIABLE');
                  console.log('Start ON_PRESS:6 SET_GLOBAL_VARIABLE');
                  setGlobalVariableValue({
                    key: 'password',
                    value: password,
                  });
                  console.log('Complete ON_PRESS:6 SET_GLOBAL_VARIABLE');
                  console.log('Start ON_PRESS:7 CONSOLE_LOG');
                  console.log(Constants['email']);
                  console.log('Complete ON_PRESS:7 CONSOLE_LOG');
                  console.log('Start ON_PRESS:8 CONSOLE_LOG');
                  console.log(Constants['password']);
                  console.log('Complete ON_PRESS:8 CONSOLE_LOG');
                } catch (err) {
                  console.error(err);
                  error = err.message ?? err;
                }
                console.log(
                  'Sign in ON_PRESS Complete',
                  error ? { error } : 'no error'
                );
              };
              handler();
            }}
            style={StyleSheet.applyWidth(
              {
                backgroundColor: theme.colors.primary,
                borderRadius: 100,
                fontFamily: 'Inter_600SemiBold',
                fontSize: 15,
                height: 58,
                textAlign: 'center',
                width: '100%',
              },
              dimensions.width
            )}
            title={'Sign in'}
          />
          {/* Forgot Password */}
          <Touchable
            style={StyleSheet.applyWidth({ width: '100%' }, dimensions.width)}
          >
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  paddingBottom: 10,
                  paddingTop: 10,
                },
                dimensions.width
              )}
            >
              <Text
                style={StyleSheet.applyWidth(
                  {
                    color: theme.colors['Custom Color'],
                    fontFamily: 'Inter_600SemiBold',
                    fontSize: 16,
                    marginLeft: 10,
                  },
                  dimensions.width
                )}
              >
                {'Forgot Password?'}
              </Text>
            </View>
          </Touchable>
          {/* or continue with */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                flexDirection: 'row',
                height: 45,
                justifyContent: 'space-between',
                width: '100%',
              },
              dimensions.width
            )}
          >
            <Divider
              style={StyleSheet.applyWidth(
                { height: 2, width: '20%' },
                dimensions.width
              )}
              color={theme.colors.divider}
            />
            {/* OR */}
            <Text
              style={StyleSheet.applyWidth(
                {
                  color: theme.colors.strong,
                  fontFamily: 'Inter_500Medium',
                  fontSize: 16,
                  marginLeft: 20,
                  marginRight: 20,
                  opacity: 0.7,
                },
                dimensions.width
              )}
            >
              {'or continue with'}
            </Text>
            <Divider
              style={StyleSheet.applyWidth(
                { height: 2, width: '20%' },
                dimensions.width
              )}
              color={theme.colors.divider}
            />
          </View>
          {/* Social options */}
          <View
            style={StyleSheet.applyWidth(
              {
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                width: '100%',
              },
              dimensions.width
            )}
          >
            {/* Facebook */}
            <Touchable>
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    borderBottomWidth: 2,
                    borderColor: theme.colors['Divider'],
                    borderLeftWidth: 2,
                    borderRadius: 16,
                    borderRightWidth: 2,
                    borderTopWidth: 2,
                    flexDirection: 'row',
                    height: 60,
                    justifyContent: 'center',
                    width: 88,
                  },
                  dimensions.width
                )}
              >
                <Image
                  style={StyleSheet.applyWidth(
                    { height: 24, width: 24 },
                    dimensions.width
                  )}
                  resizeMode={'cover'}
                  source={Images.ObFB}
                />
              </View>
            </Touchable>
            {/* Google */}
            <Touchable>
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    borderBottomWidth: 2,
                    borderColor: theme.colors['Divider'],
                    borderLeftWidth: 2,
                    borderRadius: 16,
                    borderRightWidth: 2,
                    borderTopWidth: 2,
                    flexDirection: 'row',
                    height: 60,
                    justifyContent: 'center',
                    width: 88,
                  },
                  dimensions.width
                )}
              >
                <Image
                  style={StyleSheet.applyWidth(
                    { height: 24, width: 24 },
                    dimensions.width
                  )}
                  resizeMode={'cover'}
                  source={Images.ObGoogle}
                />
              </View>
            </Touchable>
            {/* Apple */}
            <Touchable>
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    borderBottomWidth: 2,
                    borderColor: theme.colors['Divider'],
                    borderLeftWidth: 2,
                    borderRadius: 16,
                    borderRightWidth: 2,
                    borderTopWidth: 2,
                    flexDirection: 'row',
                    height: 60,
                    justifyContent: 'center',
                    width: 88,
                  },
                  dimensions.width
                )}
              >
                <Image
                  style={StyleSheet.applyWidth(
                    { height: 24, width: 24 },
                    dimensions.width
                  )}
                  resizeMode={'cover'}
                  source={Images.ObApple}
                />
              </View>
            </Touchable>
          </View>
          {/* Sign up */}
          <Touchable
            style={StyleSheet.applyWidth({ width: '100%' }, dimensions.width)}
          >
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  paddingBottom: 10,
                  paddingTop: 10,
                },
                dimensions.width
              )}
            >
              <Text
                style={StyleSheet.applyWidth(
                  {
                    color: theme.colors['Custom Color_20'],
                    fontFamily: 'Inter_400Regular',
                  },
                  dimensions.width
                )}
              >
                {'Don’t have an account?'}
              </Text>

              <Text
                style={StyleSheet.applyWidth(
                  {
                    color: theme.colors['Custom Color'],
                    fontFamily: 'Inter_500Medium',
                    marginLeft: 7,
                  },
                  dimensions.width
                )}
              >
                {'Sign up'}
              </Text>
            </View>
          </Touchable>
        </View>
      </View>
    </ScreenContainer>
  );
};

export default withTheme(LoginScreen);
