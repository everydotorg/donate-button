import { Story } from '@storybook/preact'
import { ComponentProps } from 'preact';
import GenericButton from '../components/GenericButton'

export default {
  title: 'Generic Button',
  component: GenericButton,
};

const Template: Story<ComponentProps<typeof GenericButton>> = (args) => <GenericButton {...args} />;

export const Default = Template.bind({})
Default.args = {}

export const CustomLabel = Template.bind({})
CustomLabel.args = {
  label: 'Custom label'
}

export const WithoutLogo = Template.bind({})
WithoutLogo.args = {
  withLogo: false
}

export const Background = Template.bind({})
Background.args = {
  bgColor: 'black',
  textColor: 'white',
}

export const FullConfiguration = Template.bind({})
FullConfiguration.args = {
  bgColor: '',
  borderRadius: '',
  classes: '',
  fontSize: '',
  hrefUrl: '',
  label: 'Donate',
  padding: '',
  textColor: '',
  withLogo: true 
}