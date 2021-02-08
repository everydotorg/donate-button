import {render, cleanup} from '@testing-library/react';
import test from 'ava';
import EveryMonth from 'src/components/EveryMonth/every-month';
import {defaultOptions} from 'src/helpers/options-types';

test.afterEach(cleanup);

test('the site renders', (t) => {
	const {getByText} = render(
		<EveryMonth
			options={defaultOptions}
			hide={() => {
				// No-op
			}}
		/>
	);
	getByText(/every month/i);
});
