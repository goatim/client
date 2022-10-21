import { ComponentStory, ComponentMeta } from '@storybook/react';
import { JSXElementConstructor } from 'react';
import { formatCurrency } from '../../../src';

interface Props {}

export default {
  title: 'Market/CurrenciesAdapter',
} as ComponentMeta<JSXElementConstructor<Props>>;

function App() {
  return <div></div>;
}

const Template: ComponentStory<JSXElementConstructor<Props>> = ({}: Props) => (
  <div>
    <h1>Amount: {formatCurrency(500, { iso: 'FDY' })}</h1>
  </div>
);

export const Default = Template.bind({});

Default.args = {};
