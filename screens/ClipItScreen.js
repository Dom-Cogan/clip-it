import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import * as CDNApi from '../apis/CDNApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import * as customPackages from '../custom-files/customPackages';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import selectFileUtil from '../utils/selectFile';
import {
  Button,
  Icon,
  IconButton,
  ScreenContainer,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { Text, View, useWindowDimensions } from 'react-native';

const ClipItScreen = props => {
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

  const cDNCreateVideoPOST = CDNApi.useCreateVideoPOST();

  const [sideMenu, setSideMenu] = React.useState(false);
  const [videoId, setVideoId] = React.useState('');

  return (
    <ScreenContainer scrollable={false} hasSafeArea={false}>
      {/* NavBar */}
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: { minWidth: Breakpoints.Laptop, value: 'center' },
            backgroundColor: [
              { minWidth: Breakpoints.Desktop, value: theme.colors['Primary'] },
              { minWidth: Breakpoints.Laptop, value: theme.colors['Primary'] },
            ],
            borderRadius: [
              { minWidth: Breakpoints.Desktop, value: 10 },
              { minWidth: Breakpoints.Laptop, value: 15 },
            ],
            flexDirection: [
              { minWidth: Breakpoints.Desktop, value: 'row' },
              { minWidth: Breakpoints.Laptop, value: 'row' },
            ],
            height: [
              { minWidth: Breakpoints.Desktop, value: 40 },
              { minWidth: Breakpoints.Laptop, value: 50 },
            ],
            justifyContent: {
              minWidth: Breakpoints.Laptop,
              value: 'space-around',
            },
            margin: [
              { minWidth: Breakpoints.Desktop, value: 5 },
              { minWidth: Breakpoints.Laptop, value: 5 },
            ],
          },
          dimensions.width
        )}
      >
        {/* search */}
        <View
          style={StyleSheet.applyWidth(
            {
              justifyContent: { minWidth: Breakpoints.Laptop, value: 'center' },
              width: [
                { minWidth: Breakpoints.Desktop, value: '80%' },
                { minWidth: Breakpoints.Laptop, value: '80%' },
              ],
            },
            dimensions.width
          )}
        />
        {/* options */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: [
                { minWidth: Breakpoints.Desktop, value: 'center' },
                { minWidth: Breakpoints.Laptop, value: 'center' },
              ],
              flexDirection: [
                { minWidth: Breakpoints.Desktop, value: 'row' },
                { minWidth: Breakpoints.Laptop, value: 'row' },
              ],
              justifyContent: [
                { minWidth: Breakpoints.Desktop, value: 'space-evenly' },
                { minWidth: Breakpoints.Laptop, value: 'space-evenly' },
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
          {/* Icon Button 2 */}
          <IconButton
            onPress={() => {
              try {
                setSideMenu(!sideMenu);
              } catch (err) {
                console.error(err);
              }
            }}
            color={theme.colors['Background']}
            icon={'FontAwesome/user-circle'}
            size={32}
          />
        </View>
      </View>
      {/* content */}
      <View
        style={StyleSheet.applyWidth(
          GlobalStyles.ViewStyles(theme)['deleteme'],
          dimensions.width
        )}
      >
        {/* displayContent */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: { minWidth: Breakpoints.Laptop, value: 'center' },
              backgroundColor: {
                minWidth: Breakpoints.Laptop,
                value: theme.colors['Secondary'],
              },
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
                        await cDNCreateVideoPOST.mutateAsync({
                          videoTitle: choosenFile?.name,
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
                        setGlobalVariableValue({
                          key: 'page',
                          value: 'content',
                        });
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
          <View>
            <Button
              onPress={() => {
                try {
                  navigation.navigate('HomeScreen');
                } catch (err) {
                  console.error(err);
                }
              }}
              style={StyleSheet.applyWidth(
                GlobalStyles.ButtonStyles(theme)['Button'],
                dimensions.width
              )}
              title={'Get Started'}
            />
          </View>
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
                      value: theme.colors['Secondary'],
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
      </View>
    </ScreenContainer>
  );
};

export default withTheme(ClipItScreen);
