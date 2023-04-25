import { formatPlayerName } from '../../../src';

export default {
  title: 'Soccer/FormatPlayerName',
};

function Template() {
  return (
    <div>
      <h1>{formatPlayerName('Édouard', 'Mendy')}</h1>
    </div>
  );
}

export const Default = Template.bind({});
