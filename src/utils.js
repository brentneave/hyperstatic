export const objectFromEntries = (entries) => {
  const obj = {};
  entries.forEach(
    entry => {
      obj[entry[0]] = entry[1]
    }
  )
  return obj;
}

export const getPathInfo = (state, path) => {
  const url = new URL(path, 'https://localhost')
  const { search, pathname, searchParams } = url

  // Ignore trailing slashes EXPEPT for home page
  const withoutTrailingSlash = pathname !== '/' ? pathname.replace(/\/$/, '') : pathname
  const routes = Object.keys(state.routes).map(route => state.routes[route])
  const matchedRoute = routes.find(route => route.pattern.match(withoutTrailingSlash))
  const matchParams = matchedRoute && matchedRoute.pattern.match(withoutTrailingSlash)
  const loaded = matchedRoute && matchedRoute.view

  return {
    path: withoutTrailingSlash,
    params: matchParams || {},
    query: search,
    queryParams: objectFromEntries(searchParams.entries()),
    route: matchedRoute && matchedRoute.route, // Route pattern, ex: /products/:id
    loaded: !!loaded
  }
}
