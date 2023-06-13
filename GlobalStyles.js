import * as StyleSheet from './utils/StyleSheet';

import Breakpoints from './utils/Breakpoints';

export const AccordionGroupStyles = theme =>
  StyleSheet.create({
    Accordion: {
      fontSize: 16,
      paddingBottom: 8,
      paddingLeft: 8,
      paddingRight: 8,
      paddingTop: 8,
    },
  });

export const ActivityIndicatorStyles = theme =>
  StyleSheet.create({ 'Activity Indicator': { height: 36, width: 36 } });

export const ButtonStyles = theme =>
  StyleSheet.create({
    Button: {
      backgroundColor: theme.colors.primary,
      borderRadius: 8,
      fontFamily: 'System',
      fontWeight: '700',
      textAlign: 'center',
    },
  });

export const DividerStyles = theme =>
  StyleSheet.create({ Divider: { height: 1 } });

export const FetchStyles = theme =>
  StyleSheet.create({ Fetch: { minHeight: 40 } });

export const ImageStyles = theme =>
  StyleSheet.create({ Image: { width: 100 } });

export const SwipeableItemStyles = theme =>
  StyleSheet.create({ 'Swipeable Item': { overflow: 'hidden' } });

export const SwiperStyles = theme => StyleSheet.create({});

export const TabViewItemStyles = theme =>
  StyleSheet.create({ 'Tab View Item': { flex: 1 } });

export const TextStyles = theme => StyleSheet.create({});

export const TextInputStyles = theme =>
  StyleSheet.create({
    'Text Input': {
      borderBottomWidth: 1,
      borderColor: theme.colors.divider,
      borderLeftWidth: 1,
      borderRadius: 8,
      borderRightWidth: 1,
      borderTopWidth: 1,
      margin: { minWidth: Breakpoints.Laptop, value: 5 },
      paddingBottom: 8,
      paddingLeft: 8,
      paddingRight: 8,
      paddingTop: 8,
      textAlign: { minWidth: Breakpoints.Laptop, value: 'left' },
    },
  });

export const WebViewStyles = theme =>
  StyleSheet.create({ 'Web View': { flex: 1 } });

export const ViewStyles = theme =>
  StyleSheet.create({
    'add comment': {
      paddingLeft: { minWidth: Breakpoints.Laptop, value: 25 },
      paddingRight: { minWidth: Breakpoints.Laptop, value: 25 },
    },
    deleteme: {
      flex: { minWidth: Breakpoints.Laptop, value: 1 },
      flexDirection: [
        { minWidth: Breakpoints.Desktop, value: 'row' },
        { minWidth: Breakpoints.Laptop, value: 'row' },
      ],
      height: [
        { minWidth: Breakpoints.Desktop, value: '95%' },
        { minWidth: Breakpoints.Laptop, value: '90%' },
      ],
      margin: [
        { minWidth: Breakpoints.Desktop, value: 5 },
        { minWidth: Breakpoints.Laptop, value: 5 },
      ],
    },
    navBar: {
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
      justifyContent: { minWidth: Breakpoints.Laptop, value: 'space-around' },
      margin: [
        { minWidth: Breakpoints.Desktop, value: 5 },
        { minWidth: Breakpoints.Laptop, value: 5 },
      ],
    },
    navbar: {
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
      justifyContent: { minWidth: Breakpoints.Laptop, value: 'space-around' },
      margin: [
        { minWidth: Breakpoints.Desktop, value: 5 },
        { minWidth: Breakpoints.Laptop, value: 5 },
      ],
    },
    'navbar 2': {
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
      justifyContent: { minWidth: Breakpoints.Laptop, value: 'space-around' },
      margin: [
        { minWidth: Breakpoints.Desktop, value: 5 },
        { minWidth: Breakpoints.Laptop, value: 5 },
      ],
    },
  });
