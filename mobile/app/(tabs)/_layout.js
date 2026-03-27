import { Tabs } from 'expo-router';
import { View, TouchableOpacity } from 'react-native';
import { Home, LayoutGrid, BarChart2, User } from 'lucide-react-native';

function CustomTabBar({ state, descriptors, navigation }) {
  return (
    <View className="absolute bottom-10 left-0 right-0 items-center">
      <View className="flex-row bg-accent px-4 py-3 rounded-full shadow-lg border border-white/10">
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          if (options.href === null) return null;
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              className={`p-3 rounded-full mx-1 ${isFocused ? 'bg-white/20' : ''}`}
            >
              {options.tabBarIcon?.({
                color: isFocused ? "#FFFFFF" : "#9D9D9D",
                size: 24
              })}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: '#FDF6F0', elevation: 0, shadowOpacity: 0 },
        headerTitleStyle: { fontWeight: 'bold', fontSize: 24, color: '#1A1A1A' },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarIcon: (props) => <Home {...props} />,
        }}
      />
      <Tabs.Screen
        name="resources"
        options={{
          title: 'Resources',
          headerTitle: 'Wellness Library',
          tabBarIcon: (props) => <LayoutGrid {...props} />,
        }}
      />
      <Tabs.Screen
        name="statistics"
        options={{
          title: 'Statistics',
          headerTitle: 'Your Insights',
          tabBarIcon: (props) => <BarChart2 {...props} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerTitle: 'Account',
          tabBarIcon: (props) => <User {...props} />,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}