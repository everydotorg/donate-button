import {
	chariotButtonCss,
	manualButtonCss
} from 'src/components/widget/components/PaymentProcess/DafFlow/styles';
import {
	DafFlowViewProps,
	DafFlowView
} from 'src/components/widget/components/PaymentProcess/DafFlow/types';
import {
	LargePaymentMethodSelect,
	SmallPaymentMethodSelect
} from 'src/components/widget/components/PaymentProcess/PaymentMethodSelect';
import {RedirectNotice} from 'src/components/widget/components/PaymentProcess/RedirectNotice';
import {
	formCss,
	formContainerCss
} from 'src/components/widget/components/PaymentProcess/styles';
import {useConfigContext} from 'src/components/widget/hooks/useConfigContext';

export const DafLogo = () => {
	return (
		<svg
			width="62"
			height="19"
			viewBox="0 0 62 19"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M4 0C1.79086 0 0 1.79086 0 4V15C0 17.2091 1.79086 19 4 19H32.4127C34.6218 19 36.4127 17.2091 36.4127 15V4C36.4127 1.79086 34.6218 0 32.4127 0H4ZM4.50829 4.36V14.952C5.11629 15.032 6.01229 15.112 7.27629 15.112C9.38829 15.112 11.1163 14.664 12.2523 13.72C13.2923 12.84 14.0443 11.416 14.0443 9.352C14.0443 7.448 13.3403 6.12 12.2203 5.288C11.1803 4.504 9.85229 4.136 7.80429 4.136C6.57229 4.136 5.40429 4.216 4.50829 4.36ZM6.95629 13.16V6.104C7.16429 6.056 7.51629 6.008 8.06029 6.008C10.1563 6.008 11.4683 7.192 11.4523 9.432C11.4523 12.008 10.0123 13.224 7.80429 13.208C7.50029 13.208 7.16429 13.208 6.95629 13.16ZM17.7509 12.232H20.8389L21.6709 15H24.2949L20.9509 4.216H17.7509L14.4549 15H16.9829L17.7509 12.232ZM20.4869 10.408H18.1029L18.7429 8.12C18.8484 7.74614 18.9481 7.30336 19.0455 6.8708C19.1106 6.58139 19.1748 6.29655 19.2389 6.04H19.2709C19.2969 6.14386 19.3237 6.25193 19.3512 6.36285C19.4932 6.93544 19.6541 7.58386 19.8149 8.12L20.4869 10.408ZM25.5789 4.216V15H28.0269V10.664H31.8989V8.68H28.0269V6.216H32.1709V4.216H25.5789Z"
				fill="#00203F"
			/>
			<path
				d="M40.2192 16.772V9.45C40.2192 8.554 40.1912 7.784 40.1632 7.154H42.0112L42.1092 8.106H42.1372C42.6412 7.378 43.4252 7 44.4192 7C45.9172 7 47.2612 8.302 47.2612 10.486C47.2612 12.978 45.6792 14.154 44.1532 14.154C43.3272 14.154 42.6832 13.818 42.3752 13.37H42.3472V16.772H40.2192ZM42.3472 10.122V11.06C42.3472 11.228 42.3612 11.382 42.3892 11.508C42.5292 12.082 43.0192 12.516 43.6352 12.516C44.5592 12.516 45.1052 11.746 45.1052 10.584C45.1052 9.492 44.6152 8.666 43.6632 8.666C43.0612 8.666 42.5292 9.114 42.3892 9.744C42.3612 9.856 42.3472 9.996 42.3472 10.122ZM54.2564 14H52.3384L52.2124 13.314H52.1704C51.7224 13.86 51.0224 14.154 50.2104 14.154C48.8244 14.154 47.9984 13.146 47.9984 12.054C47.9984 10.276 49.5944 9.422 52.0164 9.436V9.338C52.0164 8.974 51.8204 8.456 50.7704 8.456C50.0704 8.456 49.3284 8.694 48.8804 8.974L48.4884 7.602C48.9644 7.336 49.9024 7 51.1484 7C53.4304 7 54.1584 8.344 54.1584 9.954V12.334C54.1584 12.992 54.1864 13.622 54.2564 14ZM52.0864 11.508V10.766C50.9664 10.752 50.0984 11.018 50.0984 11.844C50.0984 12.39 50.4624 12.656 50.9384 12.656C51.4704 12.656 51.9044 12.306 52.0444 11.872C52.0724 11.76 52.0864 11.634 52.0864 11.508ZM54.7688 7.154H57.1348L58.1568 10.514C58.2688 10.92 58.4088 11.424 58.4928 11.788H58.5348C58.6328 11.424 58.7448 10.906 58.8428 10.514L59.6828 7.154H61.9648L60.3688 11.662C59.3888 14.378 58.7308 15.47 57.9608 16.156C57.2188 16.8 56.4348 17.024 55.9028 17.094L55.4548 15.288C55.7208 15.246 56.0568 15.12 56.3788 14.924C56.7008 14.756 57.0508 14.42 57.2608 14.07C57.3308 13.972 57.3728 13.86 57.3728 13.762C57.3728 13.692 57.3588 13.58 57.2748 13.412L54.7688 7.154Z"
				fill="#00203F"
			/>
		</svg>
	);
};

export const DafStartView = ({changeView}: DafFlowViewProps) => {
	const {primaryColor} = useConfigContext();

	return (
		<div className={formCss}>
			<LargePaymentMethodSelect />
			<div className={formContainerCss}>
				<SmallPaymentMethodSelect />
				<h4>Instant DAF donation</h4>
				<p>
					We use Chariot to verify your account info and automatically initiate
					a grant from your DAF, or you can get instructions for making the
					donation manually.
				</p>
				<button
					type="button"
					className={chariotButtonCss}
					onClick={() => {
						changeView(DafFlowView.AMOUNT);
					}}
				>
					<span>Donate with</span>
					<DafLogo />
				</button>
				<button
					type="button"
					className={manualButtonCss(primaryColor)}
					onClick={() => {
						changeView(DafFlowView.MANUAL);
					}}
				>
					Get instructions for a manual DAF donation
				</button>
				<RedirectNotice />
			</div>
		</div>
	);
};
