import { domLoaded } from "./helpers";

export async function Router(outletName, routes) {
  await domLoaded;

  if (domLoaded) {
    navigate(window.location.pathname + window.location.hash, routes, document.getElementById(outletName));
    document.querySelectorAll("[route]").forEach((route) =>
      route.addEventListener(
        "click",
        (e) => {
          e.preventDefault();
          navigate(e.target.getAttribute("route"), routes, document.getElementById(outletName));
        },
        false
      )
    );
  }
}

function navigate(path, routes, renderNode) {
  const route = routes.filter((r) => match(r, path))[0];

  if (renderNode) {
    if (!route) {
      const defaultRoute = routes.find((r) => r.isDefaultRoute) ? routes.find((r) => r.isDefaultRoute) : routes[0];

      if (defaultRoute) {
        render(renderNode, defaultRoute);
      }
    } else if (!route.IsRouteActive(path)) {
      window.history.pushState({}, "", path);

      routes.find((r) => r.isActive)?.setIsActive(false);

      render(renderNode, route, path);
    }
  }
}

function render(renderNode, route, path) {
  while (renderNode.firstChild) {
    renderNode.removeChild(renderNode.firstChild);
  }
  const element = document.createElement(route.element);
  renderNode.appendChild(element);
  route.rendered(path, element);
}

function match(route, requestPath) {
  let paramNames = [];
  let params;
  let routeMatch;
  let regexPath =
    route.path.replace(/([:*])(\w+)/g, (full, colon, name) => {
      paramNames.push(name);
      return "([^/]+)";
    }) + "(?:/|$)";

  if (requestPath) {
    routeMatch = requestPath.match(new RegExp(regexPath));

    if (routeMatch !== null) {
      params = routeMatch.slice(1).reduce((params, value, index) => {
        if (params === null) {
          params = null;
        }

        params = value;

        return params;
      }, null);
    }
  }

  if (params) {
    route.setParams(params);
  }

  return routeMatch;
}

export class Route {
  constructor(element, path, isDefaultRoute = false) {
    this.element = element;
    this.path = path;
    this.isDefaultRoute = isDefaultRoute;
  }

  setIsActive(isActive) {
    if (!isActive) {
      this.previousPath = null;
    }
    this.isActive = isActive;
  }

  IsRouteActive(path) {
    if (this.previousPath) {
      if (this.previousPath === path) {
        return true;
      } else {
        return false;
      }
    }
    return this.isActive;
  }

  setParams(newParams) {
    this.params = newParams;
  }

  rendered(path, element) {
    this.setIsActive(true);
    this.previousPath = path;
    if (this.params) {
      element.params = this.params;
    }
  }
}
