export const sortOrderProducts = (data, order) => {
  let resultsSorted;

  const sortByPriceAsc = (a, b) => {
    return a.price - b.price;
  }

  const sortByPriceDesc = (a, b) => {
    return b.price - a.price;
  }

  const sortByScore = (a, b) => {
    return b.score - a.score;
  }

  const sortByAlphabetical = (a, b) => {
    return a.name.localeCompare(b.name);
  }

  switch (order) {
    case "price_asc":
      resultsSorted = data.sort(sortByPriceAsc)
      break;
    case "price_desc":
      resultsSorted = data.sort(sortByPriceDesc)
      break;
    case "score":
      resultsSorted = data.sort(sortByScore)
      break;
    case "alpha":
      resultsSorted = data.sort(sortByAlphabetical)
      break;
    default:
      break;
  }

  return resultsSorted
}
