import React from 'react';
import {Dimensions, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface SectionalButtonProps {
  buttonText: string;
  onPress: () => void;
}

const {width, height} = Dimensions.get('window');

const SectionalButton: React.FC<SectionalButtonProps> = ({
  buttonText,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: 'row',
        marginHorizontal: (width / 100) * 3,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(211, 211, 211,0.5)',
        paddingVertical: (height / 100) * 2,
        paddingHorizontal: (width / 100) * 2,
        marginTop: (width / 100) * 3,
        borderRadius: (width / 100) * 2,
      }}>
      <Text
        style={{
          color: 'black',
          fontSize: (width / 100) * 4.5,
          fontWeight: '600',
        }}>
        {buttonText}
      </Text>
      <Icon name="chevron-right" size={(width / 100) * 5} color="black" />
    </TouchableOpacity>
  );
};
export default SectionalButton;
