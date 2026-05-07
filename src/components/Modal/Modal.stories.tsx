import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Pressable, Text, View } from 'react-native';
import { Modal } from './Modal';

const meta: Meta<typeof Modal> = {
  title: 'Modal/Modal',
  component: Modal,
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Interactive: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Pressable
          onPress={() => setIsOpen(true)}
          style={{ padding: 12, backgroundColor: '#FFE066', borderRadius: 8 }}
        >
          <Text>모달 열기</Text>
        </Pressable>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <View style={{ backgroundColor: '#fff', padding: 24, borderRadius: 12, margin: 40 }}>
            <Text style={{ fontSize: 16, marginBottom: 16 }}>모달 내용입니다.</Text>
            <Pressable onPress={() => setIsOpen(false)}>
              <Text style={{ color: '#666' }}>닫기</Text>
            </Pressable>
          </View>
        </Modal>
      </View>
    );
  },
};
