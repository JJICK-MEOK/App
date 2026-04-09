import { Modal as RNModal, View, TouchableWithoutFeedback } from 'react-native';

/**
 * Modal 컴포넌트
 *
 * 기능:
 * - isOpen prop으로 열림/닫힘 제어
 * - onClose로 모달 닫기 처리
 * - 터치 외부 영역 클릭 시 모달 닫기
 *
 * @param {ModalProps} props - 모달 컴포넌트 props
 * @param {boolean} props.isOpen - 모달 열림 여부
 * @param {() => void} props.onClose - 모달 닫기 함수
 * @param {React.ReactNode} props.children - 모달 내용
 *
 * @example
 * <Modal isOpen={true} onClose={() => setOpen(false)}>
 *   <Text>모달 내용</Text>
 * </Modal>
 */
export const Modal = ({ isOpen, onClose, children }: any) => {
  return (
    <RNModal visible={isOpen} transparent onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={{ flex: 1 }}>
          <TouchableWithoutFeedback>
            <View>{children}</View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </RNModal>
  );
};
