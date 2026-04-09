import { Pressable, Text, ActivityIndicator } from 'react-native';

/**
 * Button 컴포넌트
 *
 * **기능**
 * - 클릭 이벤트(onPress) 처리
 * - disabled 상태 지원
 * - loading 상태 지원 (로딩 중에는 클릭 불가 및 ActivityIndicator 표시)
 * - children이 문자열/숫자일 경우 Text로 감싸서 표시, 그 외 React 요소는 그대로 렌더링
 *
 * @example
 * <Button onPress={() => console.log('클릭!')}>클릭</Button>
 * <Button onPress={handleSave} disabled={isSaving}>저장</Button>
 * <Button onPress={handleLoad} loading={true}>로딩 중</Button>
 * <Button onPress={handleCustom}><Icon name="star" /></Button>
 *
 * @param onPress 클릭 이벤트 함수
 * @param disabled 버튼 비활성화 여부
 * @param loading 로딩 상태 여부
 * @param children 버튼 내부 텍스트/숫자 또는 React 노드
 */
export const Button = ({ onPress, disabled, loading, children }: any) => {
  return (
    <Pressable onPress={onPress} disabled={disabled || loading}>
      {loading ? (
        <ActivityIndicator />
      ) : typeof children === 'string' || typeof children === 'number' ? (
        <Text>{children}</Text>
      ) : (
        children
      )}
    </Pressable>
  );
};
