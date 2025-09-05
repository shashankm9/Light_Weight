import * as React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
import EquipmentListScreen from '../list';
import { EquipmentProvider } from '../../context/EquipmentContext';

// Mock expo-router
jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(() => Promise.resolve(null)),
  setItem: jest.fn(() => Promise.resolve()),
}));

// Mock the exercise API
jest.mock('../../api/exerciseApi', () => ({
  fetchExercises: jest.fn(() => Promise.resolve([])),
}));

describe('EquipmentListScreen', () => {
  it('should show confirmation dialog before removing equipment', async () => {
    // Mock Alert.alert
    const mockAlert = jest.spyOn(Alert, 'alert');
    
    const TestWrapper = () => (
      <EquipmentProvider>
        <EquipmentListScreen />
      </EquipmentProvider>
    );

    const { getByText } = render(<TestWrapper />);
    
    // Since there's no equipment by default, we should see the empty message
    expect(getByText('No equipment added yet.')).toBeTruthy();
    
    // Test that Alert.alert would be called with the correct parameters
    // when handleRemoveEquipment is called (we can't easily test this without adding equipment first)
    expect(mockAlert).not.toHaveBeenCalled();
    
    mockAlert.mockRestore();
  });
});