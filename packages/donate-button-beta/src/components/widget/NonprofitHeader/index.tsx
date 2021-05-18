import cxs from 'cxs';
import preact from 'preact';
import {forwardRef} from 'preact/compat';
import {headingText} from 'src/components/widget/theme/font-sizes';
import {Radii} from 'src/components/widget/theme/radii';
import {Spacing} from 'src/components/widget/theme/spacing';

const containerCss = cxs({
	background:
		'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 100%), url(https://s3-alpha-sig.figma.com/img/d7aa/78a4/b6a15610c281667759af6bcd489fe8ed?Expires=1621814400&Signature=ZdVP7JbZkjh9PoJjmlfaldO09jPgXukSe757JyeGDvM76SghgE4UjdEnLRzWo9coetjHBZsKYdJPhagd2U2f8427UttzQQg0~5J5s1DghtmDSEiR0FvPkHPNf~GlRyPiCOxqlA25DKYWQnAaqNqq4UmSDunltUAwJZLzdFL0VMhsLIe9EclokuAQDFFurgbXr7Pe3z~XAKuV4u~XynBVEGtHEtVPpC8kQQgFde8~c4bHiVSuMk-ZrCqt46hnVA6hFfjVVsguMKSR89RM7NbFyHqcGI2nYXHGos-0FLL1S0UY9-eEbn7WWq5RJJ~y85yLayQIPA6Cd284EU~ugrIH~Q__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA)',
	backgroundPosition: 'center',
	backgroundSize: 'contain',
	position: 'relative'
});

const nonprofitNameCss = cxs({
	...headingText,
	position: 'absolute',
	bottom: Spacing.M,
	left: '0',
	padding: 0,
	margin: `${Spacing.Empty} ${Spacing.XL}`,
	fontWeight: 'bold',
	color: 'white'
});

const logoContainerCss = cxs({
	borderRadius: Radii.Circle,
	border: '4px solid rgba(255,255,255,0.2)',
	width: '4rem',
	height: '4rem',
	position: 'absolute',
	top: Spacing.XL,
	right: Spacing.XL,
	overflow: 'hidden'
});

const logoImageCss = cxs({
	width: '100%',
	height: '100%',
	display: 'block',
	backgroundImage:
		'url(https://s3-alpha-sig.figma.com/img/101a/bbe0/c8c360ff03dd87d115086c65e993e48f?Expires=1621814400&Signature=O52GUOXZ93DYQ7G5U4COtIsC2I0J39BrMkRETFPOLbIvzQXjSsJmhBjogz5QsQhHDnwxTBQS4ZCQMzqE0GwJsrRHfLH378YqcrJa9xRRZb~Ycn7U-8K8Iqx~rmCx5JFFRjHoxVClh7sSQAzjFpUDDBkesH5tznhH4ntIMHyDdEOKi7r8JWX0b1Q9fWLq2tUcyLwpiIWaMbFhIVA7vaYucHNIQ88uyajiT8h~et198F6MtB8Qy4xMKxYLQfpwIDRHhTkNEk5XC2cG2AkIwVJAjmIDTRI8eRO9~sKYT97-GHj3xEu0i9-Urm3rbmPRFJDqDRQAGPgYGGoVWSUzUUp-tg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA)',
	backgroundSize: 'contain'
});

type NonprofitHeader = {
	classes: string[];
};
export const NonprofitHeader = forwardRef(
	({classes}: NonprofitHeader, ref: preact.Ref<HTMLDivElement>) => {
		return (
			<div ref={ref} className={[containerCss].concat(classes).join(' ')}>
				<p className={nonprofitNameCss}>Our world in data</p>
				<div className={logoContainerCss}>
					<div alt="nonprofit logo" className={logoImageCss} />
				</div>
			</div>
		);
	}
);
