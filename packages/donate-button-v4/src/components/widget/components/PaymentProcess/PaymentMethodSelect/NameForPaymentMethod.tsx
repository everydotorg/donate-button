import cxs from 'cxs';
import {textSize} from 'src/components/widget/theme/font-sizes';
import {
	NameForPaymentMethodMap,
	PaymentMethod
} from 'src/components/widget/types/PaymentMethod';

interface NameForPaymentMethodProps {
	method: PaymentMethod;
}
export const NameForPaymentMethod = ({method}: NameForPaymentMethodProps) => (
	<span className={cxs({...textSize.s})}>
		{NameForPaymentMethodMap[method]}
	</span>
);
