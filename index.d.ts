declare module "unisson/core/asyncData" {
  export default class asyncData {
    uId: string;
    constructor(
      htmlmElement?: HTMLElement | null,
      init?: string | number | boolean | Node | HTMLElement | null,
      uId?: string | null
    );
    getValue(): string | number | boolean | Node | null;
    setValue(value: string | number | boolean | null): void;
    setNode(node: Node): void;
    setAttribute(name: string, value: string | number | boolean | null): void;
  }
}
declare module "unisson/core/http" {
  export function get(url: string, headers?: Headers): Promise<Response>;
  export function post(
    url: string,
    data: Object,
    headers?: Headers
  ): Promise<Response>;
}
declare module "unisson/core/jsxFactory";
declare module "unisson/core/router" {
  export function router(outletName: string, routes: Route[]): void;
  export class Route {
    constructor(elementName: string, path: string, isDefaultRoute?: boolean);
  }
}
declare module "unisson/core/unissonComponent" {
  export default class UnissonComponent extends HTMLElement {
    connectedCallback(): void;

    disconnectedCallback(): void;

    attributeChangedCallback(
      name: string,
      oldValue: string | number | boolean | null,
      newValue: string | number | boolean | null
    ): void;

    render(): void;

    template(): Node;
  }
}
