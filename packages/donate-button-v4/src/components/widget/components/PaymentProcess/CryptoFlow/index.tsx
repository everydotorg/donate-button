import {ErrorMessage} from 'src/components/widget/components/ErrorMessage';
import {CryptoAmountInput} from 'src/components/widget/components/PaymentProcess/CryptoFlow/CryptoAmountInput';
import {CryptoSelector} from 'src/components/widget/components/PaymentProcess/CryptoFlow/CryptoSelector';
import {
	LargePaymentMethodSelect,
	SmallPaymentMethodSelect
} from 'src/components/widget/components/PaymentProcess/PaymentMethodSelect';
import {PrivateNote} from 'src/components/widget/components/PaymentProcess/PrivateNote';
import {PublicTestimony} from 'src/components/widget/components/PaymentProcess/PublicTestimony';
import {RedirectNotice} from 'src/components/widget/components/PaymentProcess/RedirectNotice';
import {SubmitButton} from 'src/components/widget/components/PaymentProcess/SubmitButton';
import {
	fieldSetCss,
	formContainerCss,
	formCss,
	legendCss
} from 'src/components/widget/components/PaymentProcess/styles';
import useCoingeckoRate from 'src/components/widget/hooks/useCoingeckoRate';
import {useSubmitDonation} from 'src/components/widget/hooks/useSubmitDonation';
import {useWidgetContext} from 'src/components/widget/hooks/useWidgetContext';
import {COLORS} from 'src/components/widget/theme/colors';
import {textSize} from 'src/components/widget/theme/font-sizes';
import {verticalStackCss, Spacing} from 'src/components/widget/theme/spacing';
import {CryptoCurrencyConfig} from 'src/components/widget/types/Crypto';
import {PaymentMethod} from 'src/components/widget/types/PaymentMethod';
import css from 'src/helpers/css';
import {displayCurrencyValue} from 'src/helpers/displayCurrencyValue';
import {getSubmitButtonText} from 'src/helpers/getSubmitButtonText';

export const CryptoFlow = () => {
	const submitDonation = useSubmitDonation();
	const {cryptoAmount, cryptoCurrency, submitError} = useWidgetContext();

	const [cryptoTokenRate, cryptoTokenLoading] = useCoingeckoRate(
		cryptoCurrency && CryptoCurrencyConfig[cryptoCurrency]?.coingeckoId
	);

	return (
		<form className={formCss} onSubmit={submitDonation}>
			<LargePaymentMethodSelect />
			<div className={formContainerCss}>
				<SmallPaymentMethodSelect />
				<fieldset
					className={css({fieldSetCss, ...verticalStackCss.css(Spacing.XXL)})}
				>
					<div>
						<legend className={legendCss}>Crypto currency</legend>
						<CryptoSelector />
					</div>
					{cryptoCurrency && (
						<div>
							<legend className={legendCss}>Amount</legend>
							<CryptoAmountInput
								cryptoTokenRate={cryptoTokenRate}
								cryptoTokenLoading={cryptoTokenLoading}
							/>
						</div>
					)}
				</fieldset>
				<PrivateNote />
				<PublicTestimony />
				<ErrorMessage message={submitError} />
				<SubmitButton disabled={!cryptoAmount || !cryptoCurrency}>
					{getSubmitButtonText({method: PaymentMethod.CRYPTO, cryptoCurrency})}
				</SubmitButton>
				<RedirectNotice />
				{cryptoCurrency && cryptoTokenRate && cryptoTokenRate > 0 && (
					<p className={css({color: COLORS.TextGray, ...textSize.xs})}>
						*Estimated exchange rate of{' '}
						{displayCurrencyValue(cryptoTokenRate, 'USD', {showCurrency: true})}{' '}
						/ {cryptoCurrency} is provided by CoinGecko. Final rate will be
						determined by our brokerage at time of transaction conversion.
					</p>
				)}
			</div>
		</form>
	);
};
