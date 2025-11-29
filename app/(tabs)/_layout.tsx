import { Tabs } from 'expo-router';
import { PlusCircle, PieChart, List, Moon, Sun, LogOut } from 'lucide-react-native';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

export default function TabLayout() {
  const { colors, toggleTheme, theme } = useTheme();
  const { signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
        },
        headerStyle: {
          backgroundColor: colors.surface,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          color: colors.text,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Add Expense',
          tabBarIcon: ({ size, color }) => <PlusCircle size={size} color={color} />,
          headerRight: () => (
            <View style={styles.headerContainer}>
              <TouchableOpacity onPress={toggleTheme} style={styles.headerButton}>
                {theme === 'light' ? (
                  <Moon size={24} color={colors.text} />
                ) : (
                  <Sun size={24} color={colors.text} />
                )}
              </TouchableOpacity>
              <TouchableOpacity onPress={handleLogout} style={styles.headerButton}>
                <LogOut size={24} color={colors.error} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="monthly"
        options={{
          title: 'Monthly Overview',
          tabBarIcon: ({ size, color }) => <PieChart size={size} color={color} />,
          headerRight: () => (
            <View style={styles.headerContainer}>
              <TouchableOpacity onPress={toggleTheme} style={styles.headerButton}>
                {theme === 'light' ? (
                  <Moon size={24} color={colors.text} />
                ) : (
                  <Sun size={24} color={colors.text} />
                )}
              </TouchableOpacity>
              <TouchableOpacity onPress={handleLogout} style={styles.headerButton}>
                <LogOut size={24} color={colors.error} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="all"
        options={{
          title: 'All Expenses',
          tabBarIcon: ({ size, color }) => <List size={size} color={color} />,
          headerRight: () => (
            <View style={styles.headerContainer}>
              <TouchableOpacity onPress={toggleTheme} style={styles.headerButton}>
                {theme === 'light' ? (
                  <Moon size={24} color={colors.text} />
                ) : (
                  <Sun size={24} color={colors.text} />
                )}
              </TouchableOpacity>
              <TouchableOpacity onPress={handleLogout} style={styles.headerButton}>
                <LogOut size={24} color={colors.error} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    gap: 12,
  },
  headerButton: {
    padding: 8,
  },
});
