export function parseURL(url) {
  console.log(url);

  let { origin, pathname, search } = new URL(url);

  const data = {
    origin,
    pathname,
    query: {},
  };

  search = search.replace(/[?]+/g, "");

  search = search.split("&")

  search.forEach(item => {
    const [key, value] = item.split("=");

    data.query[key] = value
  });

  return data;
}

export function getByValue(map, searchValue) {
  for (let [key, value] of map.entries()) {
    if (value === searchValue)
      return key;
  }
}

export function round(value, precision) {
    const multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}
