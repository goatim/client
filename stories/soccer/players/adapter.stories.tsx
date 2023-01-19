import { ComponentStory, ComponentMeta } from '@storybook/react';
import { JSXElementConstructor } from 'react';
import { formatPlayerName } from '../../../src';

interface Props {}

export default {
  title: 'Soccer/FormatPlayerName',
} as ComponentMeta<JSXElementConstructor<Props>>;

const Template: ComponentStory<JSXElementConstructor<Props>> = ({}: Props) => (
  <div>
    <h1>{formatPlayerName('John Ronald Reuel', 'Tolkien', 'reduced')}</h1>
  </div>
);

export const Default = Template.bind({});

Default.args = {};
