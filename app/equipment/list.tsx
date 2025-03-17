import { View, FlatList, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useEquipmentContext } from '../context/EquipmentContext';

export default function EquipmentListScreen() {
  const { equipmentList, exercises, removeEquipment } = useEquipmentContext();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Equipment</Text>

      {/* Equipment List */}
      <FlatList
        data={equipmentList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.equipmentItem}>
            <TouchableOpacity onPress={() => router.push(`/equipment/${encodeURIComponent(item.id)}`)}>
              <Image source={{ uri: item.imageUri }} style={styles.equipmentImage} />
              <Text style={styles.equipmentName}>{item.name}</Text>
            </TouchableOpacity>

            {/* Display Exercises for Each Equipment */}
            {exercises[item.name] && exercises[item.name].length > 0 ? (
              <View style={styles.exerciseList}>
                <Text style={styles.exerciseTitle}>Exercises:</Text>
                {exercises[item.name].map((exercise) => (
                  <Text key={exercise.name} style={styles.exerciseItem}>
                    • {exercise.name} ({exercise.muscle})
                  </Text>
                ))}
              </View>
            ) : (
              <Text style={{ color: "gray", fontStyle: "italic", padding: 10 }}>
                No exercises found for this equipment.
              </Text>
            )}


            {/* Remove Equipment Button */}
            <TouchableOpacity style={styles.removeButton} onPress={() => removeEquipment(item.id)}>
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No equipment added yet.</Text>}
        ListFooterComponent={(
          <TouchableOpacity style={styles.addButton} onPress={() => router.push('/equipment/add')}>
            <Text style={styles.addButtonText}>+ Add Equipment</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ flexGrow: 1 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F8F8F8',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'gray',
    marginTop: 20,
  },
  equipmentItem: {
    flexDirection: 'column',
    backgroundColor: '#FFF',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2,
  },
  equipmentImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
  },
  equipmentName: {
    fontSize: 18,
    fontWeight: '500',
  },
  exerciseList: {
    marginTop: 10,
  },
  exerciseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  exerciseItem: {
    fontSize: 14,
    marginLeft: 10,
  },
  removeButton: {
    backgroundColor: '#FF3B30',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  removeButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#1D3D47',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    alignSelf: 'center',
    width: '80%',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
