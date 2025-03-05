import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ParallaxScrollView from '@/components/ParallaxScrollView';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image source={require('@/assets/images/gym2.png')} style={styles.headerImage} />
      }
    >
      <ThemedView style={styles.container}>
        <ThemedText type="title">Welcome to Light Weight!</ThemedText>
        <Text style={styles.description}>
          Track your equipment and workouts with ease.
        </Text>

        {/* Navigation Buttons */}
        <TouchableOpacity style={styles.button} onPress={() => router.push('/equipment/list')}>
          <Text style={styles.buttonText}>View Equipment</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => router.push('/workouts/today')}>
          <Text style={styles.buttonText}>Today's Workout</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => router.push('/workouts/history')}>
          <Text style={styles.buttonText}>Workout History</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => router.push('/workouts/explore')}>
          <Text style={styles.buttonText}>Explore Workouts</Text>
        </TouchableOpacity>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  headerImage: {
    height: 300,
    width: '100%',
    resizeMode: 'cover',
  },
  button: {
    backgroundColor: '#1D3D47',
    padding: 12,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
