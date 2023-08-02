import { IHoverer } from "./IHoverer"

export interface IAdder {
    name: string
    step: number
    hoverer: IHoverer
    action: Function
}