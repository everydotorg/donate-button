import {useState} from 'preact/hooks';
import {DafAmountView} from 'src/components/widget/components/PaymentProcess/DafFlow/Views/DafAmountView';
import {DafManualView} from 'src/components/widget/components/PaymentProcess/DafFlow/Views/DafManualView';
import {DafStartView} from 'src/components/widget/components/PaymentProcess/DafFlow/Views/DafStartView';
import {DafFlowView} from 'src/components/widget/components/PaymentProcess/DafFlow/types';

export const DafFlow = () => {
	const [view, setView] = useState<DafFlowView>(DafFlowView.START);

	// eslint-disable-next-line default-case
	switch (view) {
		case DafFlowView.START:
			return <DafStartView changeView={setView} />;
		case DafFlowView.MANUAL:
			return <DafManualView changeView={setView} />;
		case DafFlowView.AMOUNT:
			return <DafAmountView changeView={setView} />;
	}
};
