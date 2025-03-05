import { View, FlatList, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useEquipmentContext } from '../context/EquipmentContext';

export default function EquipmentListScreen() {
  const { equipmentList } = useEquipmentContext();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Equipment</Text>

      {/* Equipment List */}
      <FlatList
        data={equipmentList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.equipmentItem}
            onPress={() => router.push(`/equipment/${item.id}`)}
          >
            <Image source={{ uri: item.imageUri }} style={styles.equipmentImage} />
            <Text style={styles.equipmentName}>{item.name}</Text>
          </TouchableOpacity>
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
    flexDirection: 'row',
    alignItems: 'center',
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
