import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'react-native';
import Logo from './Logo';

const meta: Meta<typeof Logo> = {
  title: 'Logo/Logo',
  component: Logo,
  args: { width: 240, height: 249 },
};

export default meta;
type Story = StoryObj<typeof Logo>;

export const Default: Story = {
  args: { variant: 'LOGO' },
};

export const Logo1: Story = {
  args: { variant: 'LOGO_1' },
};

export const Logo2: Story = {
  args: { variant: 'LOGO_02_1' },
};

export const Logo3: Story = {
  args: { variant: 'LOGO_3' },
};

export const Logo4: Story = {
  args: { variant: 'LOGO_4' },
};

export const Logo5: Story = {
  args: { variant: 'LOGO01_5' },
};

export const AllVariants: Story = {
  render: () => (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 24 }}>
      <Logo variant="LOGO" width={120} height={124} />
      <Logo variant="LOGO_1" width={120} height={124} />
      <Logo variant="LOGO_02_1" width={120} height={124} />
      <Logo variant="LOGO_3" width={120} height={124} />
      <Logo variant="LOGO_4" width={120} height={124} />
      <Logo variant="LOGO01_5" width={120} height={124} />
    </View>
  ),
};
