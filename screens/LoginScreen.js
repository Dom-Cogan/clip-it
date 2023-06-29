import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as XanoApiApi from '../apis/XanoApiApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import {
  Button,
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

  const [confPassword, setConfPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [hasAccount, setHasAccount] = React.useState(true);
  const [lastName, setLastName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [time, setTime] = React.useState('');

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
      {/* view */}
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
        {/* signIn */}
        <>
          {!hasAccount ? null : (
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
                        setPassword(newPasswordInputValue);
                        console.log(
                          'Complete ON_CHANGE_TEXT:0 SET_SCREEN_LOCAL_STATE'
                        );
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
              </View>
              {/* Error Message */}
              <>
                {!Constants['ERROR_MESSAGE'] ? null : (
                  <Text
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['Text'],
                        { margin: { minWidth: Breakpoints.Laptop, value: 5 } }
                      ),
                      dimensions.width
                    )}
                  >
                    {null}
                  </Text>
                )}
              </>
              {/* Sign in */}
              <Button
                onPress={() => {
                  const handler = async () => {
                    console.log('Sign in ON_PRESS Start');
                    let error = null;
                    try {
                      console.log('Start ON_PRESS:0 FETCH_REQUEST');
                      const loginToken = await XanoApiApi.logUserInPOST(
                        Constants,
                        { email: email, password: password }
                      );
                      console.log('Complete ON_PRESS:0 FETCH_REQUEST', {
                        loginToken,
                      });
                      console.log('Start ON_PRESS:1 EXTRACT_KEY');
                      const authToken = loginToken?.authToken;
                      console.log('Complete ON_PRESS:1 EXTRACT_KEY', {
                        authToken,
                      });
                      console.log('Start ON_PRESS:2 EXTRACT_KEY');
                      const errorMessage = loginToken?.message;
                      console.log('Complete ON_PRESS:2 EXTRACT_KEY', {
                        errorMessage,
                      });
                      console.log('Start ON_PRESS:3 SET_GLOBAL_VARIABLE');
                      setGlobalVariableValue({
                        key: 'ERROR_MESSAGE',
                        value: errorMessage,
                      });
                      console.log('Complete ON_PRESS:3 SET_GLOBAL_VARIABLE');
                      console.log('Start ON_PRESS:4 TERMINATION_CHECK');
                      if (!authToken) {
                        return;
                      }
                      console.log('Complete ON_PRESS:4 TERMINATION_CHECK');
                      console.log('Start ON_PRESS:5 SET_GLOBAL_VARIABLE');
                      setGlobalVariableValue({
                        key: 'AUTH_HEADER',
                        value: authToken,
                      });
                      console.log('Complete ON_PRESS:5 SET_GLOBAL_VARIABLE');
                      console.log('Start ON_PRESS:6 CONSOLE_LOG');
                      console.log(authToken);
                      console.log('Complete ON_PRESS:6 CONSOLE_LOG');
                      console.log('Start ON_PRESS:7 NAVIGATE_GOBACK');
                      navigation.goBack();
                      console.log('Complete ON_PRESS:7 NAVIGATE_GOBACK');
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
                style={StyleSheet.applyWidth(
                  { width: '100%' },
                  dimensions.width
                )}
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
                onPress={() => {
                  try {
                    setHasAccount(false);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                style={StyleSheet.applyWidth(
                  { width: '100%' },
                  dimensions.width
                )}
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
          )}
        </>
        {/* createAccount */}
        <>
          {hasAccount ? null : (
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
                {'Create Your Account'}
              </Text>

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
                {/* firstName */}
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
                    },
                    dimensions.width
                  )}
                >
                  {/* firstNameInput */}
                  <TextInput
                    onChangeText={newFirstNameInputValue => {
                      try {
                        setFirstName(newFirstNameInputValue);
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
                    placeholder={'First Name'}
                    editable={true}
                    placeholderTextColor={theme.colors['Custom Color_20']}
                  />
                </View>
                {/* LastName */}
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
                    },
                    dimensions.width
                  )}
                >
                  {/* lastNameInput */}
                  <TextInput
                    onChangeText={newLastNameInputValue => {
                      try {
                        setLastName(newLastNameInputValue);
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
                    placeholder={'LastName'}
                    editable={true}
                    placeholderTextColor={theme.colors['Custom Color_20']}
                  />
                </View>
              </View>
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
                        setPassword(newPasswordInputValue);
                        console.log(
                          'Complete ON_CHANGE_TEXT:0 SET_SCREEN_LOCAL_STATE'
                        );
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
              </View>
              {/* confirm-Password */}
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
                  {/* confPasswordInput */}
                  <TextInput
                    onChangeText={newConfPasswordInputValue => {
                      console.log('confPasswordInput ON_CHANGE_TEXT Start');
                      let error = null;
                      try {
                        console.log(
                          'Start ON_CHANGE_TEXT:0 SET_SCREEN_LOCAL_STATE'
                        );
                        setConfPassword(newConfPasswordInputValue);
                        console.log(
                          'Complete ON_CHANGE_TEXT:0 SET_SCREEN_LOCAL_STATE'
                        );
                      } catch (err) {
                        console.error(err);
                        error = err.message ?? err;
                      }
                      console.log(
                        'confPasswordInput ON_CHANGE_TEXT Complete',
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
                    placeholder={'Confirm Password'}
                    editable={true}
                    placeholderTextColor={theme.colors['Custom Color_20']}
                    secureTextEntry={true}
                  />
                </View>
              </View>
              {/* Error Message */}
              <Text
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'], {
                    color: {
                      minWidth: Breakpoints.Laptop,
                      value: theme.colors['Error'],
                    },
                    margin: { minWidth: Breakpoints.Laptop, value: 5 },
                  }),
                  dimensions.width
                )}
              >
                {Constants['ERROR_MESSAGE']}
              </Text>
              {/* createAccount */}
              <Button
                onPress={() => {
                  const handler = async () => {
                    console.log('createAccount ON_PRESS Start');
                    let error = null;
                    try {
                      console.log('Start ON_PRESS:0 SET_GLOBAL_VARIABLE');
                      setGlobalVariableValue({
                        key: 'ERROR_MESSAGE',
                        value: 'Passwords do not match',
                      });
                      console.log('Complete ON_PRESS:0 SET_GLOBAL_VARIABLE');
                      console.log('Start ON_PRESS:1 TERMINATION_CHECK');
                      if (password !== confPassword) {
                        return;
                      }
                      console.log('Complete ON_PRESS:1 TERMINATION_CHECK');
                      console.log('Start ON_PRESS:2 SET_GLOBAL_VARIABLE');
                      setGlobalVariableValue({
                        key: 'ERROR_MESSAGE',
                        value: ' ',
                      });
                      console.log('Complete ON_PRESS:2 SET_GLOBAL_VARIABLE');
                      console.log('Start ON_PRESS:3 FETCH_REQUEST');
                      const newUser = await XanoApiApi.createNewUserPOST(
                        Constants,
                        {
                          email: email,
                          firstName: firstName,
                          lastName: lastName,
                          password: password,
                        }
                      );
                      console.log('Complete ON_PRESS:3 FETCH_REQUEST', {
                        newUser,
                      });
                      console.log('Start ON_PRESS:4 EXTRACT_KEY');
                      const authToken = newUser?.authToken;
                      console.log('Complete ON_PRESS:4 EXTRACT_KEY', {
                        authToken,
                      });
                      console.log('Start ON_PRESS:5 EXTRACT_KEY');
                      const errorMessage = newUser?.message;
                      console.log('Complete ON_PRESS:5 EXTRACT_KEY', {
                        errorMessage,
                      });
                      console.log('Start ON_PRESS:6 SET_GLOBAL_VARIABLE');
                      setGlobalVariableValue({
                        key: 'ERROR_MESSAGE',
                        value: errorMessage,
                      });
                      console.log('Complete ON_PRESS:6 SET_GLOBAL_VARIABLE');
                      console.log('Start ON_PRESS:7 TERMINATION_CHECK');
                      if (!authToken) {
                        return;
                      }
                      console.log('Complete ON_PRESS:7 TERMINATION_CHECK');
                      console.log('Start ON_PRESS:8 SET_GLOBAL_VARIABLE');
                      setGlobalVariableValue({
                        key: 'AUTH_HEADER',
                        value: Constants['AUTH_HEADER'],
                      });
                      console.log('Complete ON_PRESS:8 SET_GLOBAL_VARIABLE');
                      console.log('Start ON_PRESS:9 NAVIGATE_GOBACK');
                      navigation.goBack();
                      console.log('Complete ON_PRESS:9 NAVIGATE_GOBACK');
                    } catch (err) {
                      console.error(err);
                      error = err.message ?? err;
                    }
                    console.log(
                      'createAccount ON_PRESS Complete',
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
                title={'create account'}
              />
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
              {/* Log in */}
              <Touchable
                onPress={() => {
                  try {
                    setHasAccount(true);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                style={StyleSheet.applyWidth(
                  { width: '100%' },
                  dimensions.width
                )}
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
                    {'Already have an account?'}
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
                    {'Log in'}
                  </Text>
                </View>
              </Touchable>
            </View>
          )}
        </>
      </View>
    </ScreenContainer>
  );
};

export default withTheme(LoginScreen);
