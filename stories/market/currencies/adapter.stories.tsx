import { ComponentStory, ComponentMeta } from '@storybook/react';
import { JSXElementConstructor } from 'react';
import { formatCurrencyAmount } from '../../../src';

interface Props {}

export default {
  title: 'Market/CurrenciesAdapter',
} as ComponentMeta<JSXElementConstructor<Props>>;

function App() {
  return <div></div>;
}

const Template: ComponentStory<JSXElementConstructor<Props>> = ({}: Props) => (
  <div>
    <h1>Amount: {formatCurrencyAmount(500, 'FDY', 2, false)}</h1>
  </div>
);

export const Default = Template.bind({});

Default.args = {};
