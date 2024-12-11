import React from 'react';
import { Platform, StyleSheet, View, StatusBar } from 'react-native';
import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import { HapticTab } from '@/components/HapticTab';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaInsetsContext.Consumer>
      {(insets) => (
        <View
          style={[
            styles.container,
            {
              backgroundColor: Colors[colorScheme ?? 'light'].background,
              paddingTop: insets?.top || 0,
            },
          ]}
        >
          {/* Configuración de la barra de estado */}
          <StatusBar
            barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
            backgroundColor={Colors[colorScheme ?? 'light'].background}
          />

          <Tabs
            screenOptions={{
              tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
              headerShown: false,
              tabBarButton: HapticTab,
              tabBarStyle: Platform.select({
                ios: {
                  position: 'absolute',
                  backgroundColor: Colors[colorScheme ?? 'light'].background,
                  borderTopWidth: 0,
                  elevation: 0,
                },
                default: {
                  backgroundColor: Colors[colorScheme ?? 'light'].background,
                },
              }),
            }}
          >
            {/* Inicio */}
            <Tabs.Screen
              name="inicio"
              options={{
                title: 'Inicio',
                tabBarIcon: ({ color }) => (
                  <MaterialIcons size={28} name="home" color={color} />
                ),
              }}
            />

            {/* Cámara */}
            <Tabs.Screen
              name="camara"
              options={{
                title: 'Cámara',
                tabBarIcon: ({ color }) => (
                  <MaterialIcons size={28} name="photo-camera" color={color} />
                ),
              }}
            />

            {/* Asistencia */}
            <Tabs.Screen
              name="asistencia"
              options={{
                title: 'Asistencia',
                tabBarIcon: ({ color }) => (
                  <MaterialIcons size={28} name="forum" color={color} />
                ),
              }}
            />

            {/* Perfil */}
            <Tabs.Screen
              name="perfil"
              options={{
                title: 'Perfil',
                tabBarIcon: ({ color }) => (
                  <MaterialIcons size={28} name="account-circle" color={color} />
                ),
              }}
            />
          </Tabs>
        </View>
      )}
    </SafeAreaInsetsContext.Consumer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
