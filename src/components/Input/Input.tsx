import { TextInput, View } from 'react-native';
import { useFormContext } from '../../contexts/FormContext';
import { Typography } from '@/src/components/Typography/Typography';

export const Input = ({ name, placeholder }: any) => {
  const { values, errors, handleChange } = useFormContext();

  return (
    <View>
      <TextInput
        value={values[name]}
        onChangeText={(text) => handleChange(name, text)}
        placeholder={placeholder}
      />
      {errors[name] && (
        <Typography size="xs" color="error">
          {errors[name]}
        </Typography>
      )}
    </View>
  );
};
