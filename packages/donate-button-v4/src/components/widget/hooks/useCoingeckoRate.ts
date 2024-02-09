import {useEffect, useState} from 'preact/hooks';
import {getCoingeckoRate} from 'src/components/widget/api';

export const useCoingeckoRate = (
	coingeckoId?: string
): [number | null, boolean, string | null] => {
	const [rate, setRate] = useState<number | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		if (!coingeckoId) {
			setRate(null);
			setError(null);
			setLoading(false);
			return;
		}

		setLoading(true);
		getCoingeckoRate(coingeckoId)
			.then((rate) => {
				setRate(rate);
				setError(null);
			})
			.catch((error) => {
				setRate(null);
				setError(error.message);
			})
			.finally(() => {
				setLoading(false);
			});
	}, [coingeckoId]);

	return [rate, loading, error];
};

export default useCoingeckoRate;
