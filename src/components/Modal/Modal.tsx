import { Modal as RNModal, View, TouchableWithoutFeedback } from 'react-native';

/**
 * Modal 컴포넌트
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
