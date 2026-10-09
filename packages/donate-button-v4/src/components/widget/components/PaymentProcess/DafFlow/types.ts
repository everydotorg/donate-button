export enum DafFlowView {
	START,
	AMOUNT
}

export interface DafFlowViewProps {
	changeView: (view: DafFlowView) => void;
}
