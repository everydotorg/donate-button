
import { Story } from '@storybook/preact'
import EveryMonth from '../components/EveryMonth/every-month'

export default {
  title: 'Example/Button',
  component: EveryMonth,
  argTypes: {
    backgroundColor: { control: 'color' },
    onClick: { action: 'onClick' },
  },
};

const Template: Story<any> = (args) => <EveryMonth {...args} />;

export const Primary = Template.bind({});
