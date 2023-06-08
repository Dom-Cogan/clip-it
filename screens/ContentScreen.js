import React from 'react';
import * as GlobalStyles from '../GlobalStyles.js';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import { Button, ScreenContainer, withTheme } from '@draftbit/ui';
import { View, useWindowDimensions } from 'react-native';

const ContentScreen = props => {
  const dimensions = useWindowDimensions();

  const { theme } = props;
  const { navigation } = props;

  return (
    <ScreenContainer scrollable={false} hasSafeArea={false}>
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: { minWidth: Breakpoints.Laptop, value: 'center' },
            flex: { minWidth: Breakpoints.Laptop, value: 1 },
            justifyContent: { minWidth: Breakpoints.Laptop, value: 'center' },
          },
          dimensions.width
        )}
      >
        <Button
          onPress={() => {
            try {
              navigation.navigate('ClipItScreen');
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
    </ScreenContainer>
  );
};

export default withTheme(ContentScreen);
