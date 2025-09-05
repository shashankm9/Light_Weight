import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
import EquipmentListScreen from '../list';
import { useEquipmentContext } from '../../context/EquipmentContext';
import { useRouter } from 'expo-router';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// Mock the dependencies
jest.mock('../../context/EquipmentContext');
jest.mock('expo-router');

const mockUseEquipmentContext = useEquipmentContext as jest.MockedFunction<typeof useEquipmentContext>;
const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;

// Mock Alert.alert
jest.spyOn(Alert, 'alert');

describe('EquipmentListScreen', () => {
  const mockRemoveEquipment = jest.fn();
  const mockPush = jest.fn();
  
  const mockEquipmentList = [
    {
      id: '1',
      name: 'Dumbbells',
      imageUri: 'https://example.com/dumbbells.jpg'
    }
  ];

  const mockExercises = {
    'Dumbbells': [
      {
        name: 'Bicep Curl',
        type: 'strength',
        muscle: 'biceps',
        equipment: 'dumbbells',
        difficulty: 'beginner',
        instructions: 'Curl the dumbbells'
      }
    ]
  };

  beforeEach(() => {
    mockUseEquipmentContext.mockReturnValue({
      equipmentList: mockEquipmentList,
      exercises: mockExercises,
      removeEquipment: mockRemoveEquipment,
      addEquipment: jest.fn()
    });

    mockUseRouter.mockReturnValue({
      push: mockPush,
      back: jest.fn(),
      replace: jest.fn(),
      canGoBack: jest.fn(),
      setParams: jest.fn()
    });

    jest.clearAllMocks();
  });

  it('renders equipment list correctly', () => {
    const { getByText } = render(<EquipmentListScreen />);
    
    expect(getByText('Your Equipment')).toBeTruthy();
    expect(getByText('Dumbbells')).toBeTruthy();
    expect(getByText('Remove')).toBeTruthy();
  });

  it('shows confirmation dialog when remove button is pressed', async () => {
    const { getByText } = render(<EquipmentListScreen />);
    
    const removeButton = getByText('Remove');
    fireEvent.press(removeButton);

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        'Remove Equipment',
        'Are you sure you want to remove "Dumbbells" from your equipment list?',
        expect.arrayContaining([
          expect.objectContaining({ text: 'Cancel', style: 'cancel' }),
          expect.objectContaining({ text: 'Remove', style: 'destructive' })
        ])
      );
    });
  });

  it('does not call removeEquipment immediately when remove button is pressed', () => {
    const { getByText } = render(<EquipmentListScreen />);
    
    const removeButton = getByText('Remove');
    fireEvent.press(removeButton);

    // Should not call removeEquipment directly, only through the alert dialog
    expect(mockRemoveEquipment).not.toHaveBeenCalled();
  });
});