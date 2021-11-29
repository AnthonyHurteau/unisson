"use strict";

import { domLoaded } from "./helpers";

export default class AsyncData extends EventTarget {
  constructor(htmlmElement, init, uId) {
    super();
    this.value = init || "";
    this.uId = uIdHelpepr(uId);
    this.params = { htmlmElement, uId: this.uId, domLoaded };
    return this.init;
  }

  getValue() {
    return this.value;
  }

  setValue(value) {
    this.value = value;
    const node = document.createTextNode(value);
    render({ node, type: renderType.content, ...this.params });
    this.dispatchEvent(new Event(this.uId));
  }

  setNode(node) {
    this.value = node;
    render({ node, type: renderType.content, ...this.params });
  }

  setAttribute(name, value) {
    this.value = value;
    render({ name, value, type: renderType.attribute, ...this.params });
  }
}

const renderType = { content: 1, attribute: 2 };

async function render(params) {
  const { node, name, value, uId, type, domLoaded, htmlmElement } = params;

  if (await domLoaded) {
    let elements;

    if (htmlmElement) {
      elements = htmlmElement.querySelectorAll(`*[uId='${uId}']`);
    } else {
      elements = document.querySelectorAll(`*[uId='${uId}']`);
    }

    if (elements.length > 0) {
      elements.forEach((el) => {
        if (type === renderType.content) {
          el.replaceChildren();
          el.append(node.cloneNode(true));
        }
        if (type === renderType.attribute) {
          el.setAttribute(name, value);
        }
      });
    }
  }
}

function uIdHelpepr(uId) {
  function createUuid() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );
  }

  if (uId) {
    return uId;
  } else {
    return `${createUuid()}`;
  }
}
