import * as React from 'react';
import * as Notifications from 'expo-notifications';
import * as SplashScreen from 'expo-splash-screen';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import { View, Text, ActivityIndicator, AppState } from 'react-native';
import { Provider as ThemeProvider } from '@draftbit/ui';
import { QueryClient, QueryClientProvider } from 'react-query';

import AppNavigator from './AppNavigator';
import DraftbitTheme from './themes/DraftbitTheme.js';
import cacheAssetsAsync from './config/cacheAssetsAsync';
import { GlobalVariableProvider } from './config/GlobalVariableContext';
SplashScreen.preventAutoHideAsync();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const queryClient = new QueryClient();

const App = () => {
  const [isReady, setIsReady] = React.useState(false);
  const fontsLoaded = true;

  React.useEffect(() => {
    async function prepare() {
      try {
        await cacheAssetsAsync();
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = React.useCallback(async () => {
    if (isReady && fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [isReady, fontsLoaded]);

  if (!isReady || !fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider
      initialMetrics={initialWindowMetrics}
      onLayout={onLayoutRootView}
    >
      <GlobalVariableProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <AppNavigator />
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
                      minWidth: Breakpoints.Laptop,
                      value: theme.colors['Strong'],
                    },
                  ],
                  flex: { minWidth: Breakpoints.Laptop, value: 1.5 },
                  height: [
                    { minWidth: Breakpoints.Desktop, value: '100%' },
                    { minWidth: Breakpoints.Laptop, value: '100%' },
                  ],
                  marginLeft: [
                    { minWidth: Breakpoints.Desktop, value: 5 },
                    { minWidth: Breakpoints.Laptop, value: 5 },
                  ],
                },
                dimensions.width
              )}
              collapsable={true}
            >
              {/* home */}
              <Touchable
                onPress={() => {
                  try {
                    if (Constants['home']?.false) {
                      return;
                    }
                    setSideMenu(false);
                    setGlobalVariableValue({
                      key: 'profile',
                      value: false,
                    });
                    setGlobalVariableValue({
                      key: 'home',
                      value: true,
                    });
                    setGlobalVariableValue({
                      key: 'page',
                      value: 'home',
                    });
                  } catch (err) {
                    console.error(err);
                  }
                }}
                activeOpacity={25}
              >
                {/* container */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignContent: [
                        { minWidth: Breakpoints.Desktop, value: 'stretch' },
                        { minWidth: Breakpoints.Laptop, value: 'stretch' },
                      ],
                      alignItems: [
                        { minWidth: Breakpoints.Desktop, value: 'center' },
                        { minWidth: Breakpoints.Laptop, value: 'center' },
                      ],
                      backgroundColor: {
                        minWidth: Breakpoints.Laptop,
                        value: theme.colors['Light'],
                      },
                      borderRadius: { minWidth: Breakpoints.Laptop, value: 10 },
                      flexDirection: [
                        { minWidth: Breakpoints.Desktop, value: 'row' },
                        { minWidth: Breakpoints.Laptop, value: 'row' },
                      ],
                      height: { minWidth: Breakpoints.Laptop, value: 40 },
                      margin: { minWidth: Breakpoints.Laptop, value: 5 },
                    },
                    dimensions.width
                  )}
                >
                  {/* spacer */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        height: { minWidth: Breakpoints.Desktop, value: 50 },
                        marginLeft: { minWidth: Breakpoints.Laptop, value: 3 },
                        width: { minWidth: Breakpoints.Laptop, value: 5 },
                      },
                      dimensions.width
                    )}
                  />
                  <Icon size={24} name={'FontAwesome/user-circle'} />
                  <Text
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['Text'],
                        {
                          fontFamily: {
                            minWidth: Breakpoints.Laptop,
                            value: 'System',
                          },
                          fontSize: { minWidth: Breakpoints.Laptop, value: 18 },
                          fontWeight: {
                            minWidth: Breakpoints.Laptop,
                            value: '400',
                          },
                          margin: { minWidth: Breakpoints.Laptop, value: 10 },
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {'Home'}
                  </Text>
                </View>
              </Touchable>
              {/* upload */}
              <Touchable
                onPress={() => {
                  console.log('upload ON_PRESS Start');
                  let error = null;
                  try {
                    console.log('Start ON_PRESS:0 TERMINATION_CHECK');
                    if (Constants['profile']?.false) {
                      return;
                    }
                    console.log('Complete ON_PRESS:0 TERMINATION_CHECK');
                    console.log('Start ON_PRESS:1 SET_GLOBAL_VARIABLE');
                    setGlobalVariableValue({
                      key: 'home',
                      value: !Constants['home'],
                    });
                    console.log('Complete ON_PRESS:1 SET_GLOBAL_VARIABLE');
                    console.log('Start ON_PRESS:2 SET_GLOBAL_VARIABLE');
                    setGlobalVariableValue({
                      key: 'profile',
                      value: !Constants['profile'],
                    });
                    console.log('Complete ON_PRESS:2 SET_GLOBAL_VARIABLE');
                    console.log('Start ON_PRESS:3 SET_SCREEN_LOCAL_STATE');
                    setSideMenu(!sideMenu);
                    console.log('Complete ON_PRESS:3 SET_SCREEN_LOCAL_STATE');
                  } catch (err) {
                    console.error(err);
                    error = err.message ?? err;
                  }
                  console.log(
                    'upload ON_PRESS Complete',
                    error ? { error } : 'no error'
                  );
                }}
                activeOpacity={25}
              >
                {/* container */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignContent: [
                        { minWidth: Breakpoints.Desktop, value: 'stretch' },
                        { minWidth: Breakpoints.Laptop, value: 'stretch' },
                      ],
                      alignItems: [
                        { minWidth: Breakpoints.Desktop, value: 'center' },
                        { minWidth: Breakpoints.Laptop, value: 'center' },
                      ],
                      backgroundColor: {
                        minWidth: Breakpoints.Laptop,
                        value: theme.colors['Light'],
                      },
                      borderRadius: { minWidth: Breakpoints.Laptop, value: 10 },
                      flexDirection: [
                        { minWidth: Breakpoints.Desktop, value: 'row' },
                        { minWidth: Breakpoints.Laptop, value: 'row' },
                      ],
                      height: { minWidth: Breakpoints.Laptop, value: 40 },
                      margin: { minWidth: Breakpoints.Laptop, value: 5 },
                    },
                    dimensions.width
                  )}
                >
                  {/* spacer */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        height: { minWidth: Breakpoints.Desktop, value: 50 },
                        marginLeft: { minWidth: Breakpoints.Laptop, value: 3 },
                        width: { minWidth: Breakpoints.Laptop, value: 5 },
                      },
                      dimensions.width
                    )}
                  />
                  <Icon size={24} name={'FontAwesome/user-circle'} />
                  <Text
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['Text'],
                        {
                          fontFamily: {
                            minWidth: Breakpoints.Laptop,
                            value: 'System',
                          },
                          fontSize: { minWidth: Breakpoints.Laptop, value: 18 },
                          fontWeight: {
                            minWidth: Breakpoints.Laptop,
                            value: '400',
                          },
                          margin: { minWidth: Breakpoints.Laptop, value: 10 },
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {'Profile'}
                  </Text>
                </View>
              </Touchable>
            </View>
          )}
        </>
          </ThemeProvider>
        </QueryClientProvider>
      </GlobalVariableProvider>
    </SafeAreaProvider>
  );
};

export default App;
