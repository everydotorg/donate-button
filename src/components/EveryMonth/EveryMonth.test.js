;
import { render } from '@testing-library/react';
import EveryMonth from './EveryMonth';

test('renders', () => {
  const { getByText } = render(<EveryMonth />);
  const linkElement = getByText(/Every Month/i);
  expect(linkElement).toBeInTheDocument();
});
