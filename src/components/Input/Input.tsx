import { TextInput, View, Text } from 'react-native';
import { useFormContext } from '../../contexts/FormContext';

/**
 * Input 컴포넌트
 *
 * 기능:
 * - useFormContext를 통해 form 상태와 validation 연동
 * - 입력값 변경 시 handleChange 호출
 * - 에러 메시지 표시
 *
 * @param {Object} props
 * @param {string} props.name - form state에서 연결할 필드 이름
 * @param {string} [props.placeholder] - 입력창 placeholder
 *
 * @example
 * <Input name="email" placeholder="이메일 입력" />
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
