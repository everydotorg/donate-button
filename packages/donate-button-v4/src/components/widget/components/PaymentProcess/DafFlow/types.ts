export enum DafFlowView {
	START,
	AMOUNT,
	MANUAL
}

export interface DafFlowViewProps {
	changeView: (view: DafFlowView) => void;
}
