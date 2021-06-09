import { IArticleAction } from "../../../types";
export interface IArticleAnchor {
  link: string;
  text: string;
}
export interface IAside {
  actions?: IArticleAction[]
  anchors?:IArticleAnchor[]
}
export function transformAside(props:IAside) {
const {anchors, actions} = props


  return {anchors: anchors ?? null, actions:actions ?? null} 
} 