import { TextInput, View, Text } from 'react-native';
import { useFormContext } from '../../contexts/FormContext';

/**
 * Form 연결 Input
 *
 * @example
 * <Input name="email" />
 */
export const Input = ({ name, placeholder }: any) => {
  const { values, errors, handleChange } = useFormContext();

  return (
    <View>
      <TextInput
        value={values[name]}
        onChangeText={(text) => handleChange(name, text)}
        placeholder={placeholder}
      />
      {errors[name] && <Text>{errors[name]}</Text>}
    </View>
  );
};
