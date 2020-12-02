import { h } from 'preact';
import test from 'ava';
import { render } from '@testing-library/preact';

import EveryMonth from './EveryMonth';

test('renders', t => {
  const { getByText } = render(<EveryMonth />);
  const linkElement = getByText(/Every Month/i);
  t.truthy(linkElement);
});
