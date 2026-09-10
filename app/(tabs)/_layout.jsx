import { Tabs } from 'expo-router';
import { Pressable, View, StyleSheet } from 'react-native';
import { colors } from '../../src/theme/tokens';
import {
  House,
  GameController,
  VideoCamera,
  Newspaper,
  Heart,
} from 'phosphor-react-native';
import { useSettings } from '../../src/context/SettingsContext';

const icon = (IconComponent) => ({ color, size }) => (
  <IconComponent
    weight="bold"
    color={color}
    size={size}
  />
);

function CustomTabButton({
  children,
  onPress,
  accessibilityState,
  accent,
}) {
  const isFocused = accessibilityState?.selected;
  const styles = createStyles(accent);

  return (
    <Pressable
      onPress={onPress}
      accessibilityState={accessibilityState}
      style={({ pressed }) => [
        styles.tabButton,
        pressed && styles.tabButtonPressed,
        isFocused && styles.tabButtonFocused,
      ]}
    >
      <View style={styles.iconWrapper}>
        {children}
      </View>
    </Pressable>
  );
}

export default function TabLayout() {
  const { accent } = useSettings();

  const primary = accent?.primary ?? colors.primary;
  const primaryContainer =
    accent?.primaryContainer ?? colors.primaryContainer;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,

        tabBarActiveTintColor: primary,
        tabBarInactiveTintColor: colors.onSurfaceVariant,

        tabBarStyle: {
          position: 'absolute',

          height: 74,

          backgroundColor: colors.surfaceContainer,

          borderWidth: 2,
          borderColor: colors.surfaceContainerHigh,

          borderRadius: 40,

          alignSelf: 'center',

          marginHorizontal: 46,
          marginBottom: 36,

          paddingHorizontal: 12,
          paddingVertical: 0,

          elevation: 4,

          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.15,
          shadowRadius: 6,
        },

        tabBarItemStyle: {
          padding: 0,
          margin: 0,
          height: 64,
        },

        tabBarIconStyle: {
          margin: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: icon(House),
          tabBarButton: (props) => (
            <CustomTabButton
              {...props}
              accent={{
                primary,
                primaryContainer,
              }}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="games"
        options={{
          title: 'Games',
          tabBarIcon: icon(GameController),
          tabBarButton: (props) => (
            <CustomTabButton
              {...props}
              accent={{
                primary,
                primaryContainer,
              }}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="videos"
        options={{
          title: 'Videos',
          tabBarIcon: icon(VideoCamera),
          tabBarButton: (props) => (
            <CustomTabButton
              {...props}
              accent={{
                primary,
                primaryContainer,
              }}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="newswire"
        options={{
          title: 'Newswire',
          tabBarIcon: icon(Newspaper),
          tabBarButton: (props) => (
            <CustomTabButton
              {...props}
              accent={{
                primary,
                primaryContainer,
              }}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="wishlist"
        options={{
          title: 'Wishlist',
          tabBarIcon: icon(Heart),
          tabBarButton: (props) => (
            <CustomTabButton
              {...props}
              accent={{
                primary,
                primaryContainer,
              }}
            />
          ),
        }}
      />
    </Tabs>
  );
}

function createStyles(accent) {
  const primaryContainer =
    accent?.primaryContainer ?? colors.primaryContainer;

  return StyleSheet.create({
    tabButton: {
      flex: 1,

      height: 64,

      justifyContent: 'flex-start',

      paddingTop: 17,

      alignItems: 'center',

      borderRadius: 30,

      paddingHorizontal: 2,
    },

    tabButtonPressed: {
      opacity: 0.6,
    },

    tabButtonFocused: {
      backgroundColor: primaryContainer,
    },

    iconWrapper: {
      justifyContent: 'center',
      alignItems: 'center',

      width: 36,
      height: 36,
    },
  });
}