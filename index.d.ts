export declare class AsyncData {
  uId: string;
  constructor(
    htmlmElement?: HTMLElement | null,
    init?: string | number | boolean | Node | HTMLElement | object | [] | null,
    uId?: string | null
  );
  getValue(): string | number | boolean | Node | HTMLElement | object | [] | null;
  setValue(value: string | number | boolean | null): void;
  setNode(node: Node): void;
  setAttribute(name: string, value: string | number | boolean | null): void;
  setObject(object: object): void;
  setArray(array: []): void;
}

declare namespace httpClient {
  export function get(url: string, headers?: Headers): Promise<Response>;
  export function post(url: string, data: Object, headers?: Headers): Promise<Response>;
}

export declare function Router(outletName: string, routes: Route[]): void;
export declare class Route {
  constructor(elementName: string, path: string, isDefaultRoute?: boolean);
}

export declare class UnissonComponent extends HTMLElement {
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
