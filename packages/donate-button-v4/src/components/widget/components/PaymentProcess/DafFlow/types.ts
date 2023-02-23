export enum DafFlowView {
	START,
	MANUAL,
	AMOUNT
}

export interface DafFlowViewProps {
	changeView: (view: DafFlowView) => void;
}
