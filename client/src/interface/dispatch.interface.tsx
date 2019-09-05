export type IDispatch = React.Dispatch<IAction>;

export interface IAction {
	type: string;
	payload: any;
}
