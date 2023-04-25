import { formatCurrencyAmount } from '../../../src';

export default {
  title: 'Market/CurrenciesAdapter',
};

function App() {
  return <div />;
}

function Template() {
  return (
    <div>
      <h1>Amount: {formatCurrencyAmount(500, 'GTC', 2, false)}</h1>
    </div>
  );
}

export const Default = Template.bind({});
