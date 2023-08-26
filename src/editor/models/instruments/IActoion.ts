export interface IAction {
    name: string
    undoAction: IAction
}