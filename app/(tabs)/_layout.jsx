import { Tabs } from "expo-router";
import { MaterialIcon } from "../../src/components/MaterialIcon";
import { colors, type } from "../../src/theme/tokens";

const icon = (name) => ({ color, size }) => (
    <MaterialIcon name={name} color={color} size={size} />
);

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,

                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.onSurfaceVariant,

                tabBarStyle: {
                    position: "absolute",
                    height: 76,
                    paddingTop: 8,
                    paddingBottom: 8,

                    backgroundColor: colors.surfaceContainer,

                    borderTopWidth: 0,
                    borderRadius: 28,

                    marginHorizontal: 12,
                    marginBottom: 10,

                    elevation: 0,
                    shadowOpacity: 0,
                },

                tabBarItemStyle: {
                    borderRadius: 22,
                    marginHorizontal: 2,
                },

                tabBarLabelStyle: {
                    fontFamily: type.bodyBold,
                    fontSize: 10,
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: icon("home"),
                }}
            />

            <Tabs.Screen
                name="games"
                options={{
                    title: "Games",
                    tabBarIcon: icon("sports-esports"),
                }}
            />

            <Tabs.Screen
                name="videos"
                options={{
                    title: "Videos",
                    tabBarIcon: icon("play-circle"),
                }}
            />

            <Tabs.Screen
                name="newswire"
                options={{
                    title: "Newswire",
                    tabBarIcon: icon("newspaper"),
                }}
            />

            <Tabs.Screen
                name="wishlist"
                options={{
                    title: "Wishlist",
                    tabBarIcon: icon("favorite"),
                }}
            />
        </Tabs>
    );
}