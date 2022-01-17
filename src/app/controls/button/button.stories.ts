import { ButtonComponent } from './button.component';
import { Story, Meta } from '@storybook/angular/types-6-0';
import { Button } from '.';
import { Size } from '@app/models';

export default {
  title: 'Controls/Button',
  component: ButtonComponent,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta;

const Template: Story<ButtonComponent> = (args: ButtonComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  button: new Button({
    text: 'Button',
  }),
};

export const Secondary = Template.bind({});
Secondary.args = {
  button: new Button({
    text: 'Button',
  }),
};

export const Large = Template.bind({});
Large.args = {
  button: new Button({
    text: 'Button',
    size: Size.large,
  }),
};

export const Small = Template.bind({});
Small.args = {
  button: new Button({
    text: 'Button',
    size: Size.small,
  }),
};
