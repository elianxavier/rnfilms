async function getFilms(query: string = "", filmPosition?: number) {
  const typeSearch = query == "" ? "discover" : "search";

  const pageNumber = Math.ceil((filmPosition || 1) / 19);
  const filmNumber = (filmPosition || 19) % 19;

  const params = {
    language: "pt-br",
    api_key: `${process.env.EXPO_PUBLIC_API_KEY}`,
    include_adult: "false",
    page: pageNumber.toString(),
    ...(typeSearch === "search" && { query: query }),
  };

  const result = await fetch(
    `${process.env.EXPO_PUBLIC_BASE_URL}/${typeSearch}/movie?` +
      new URLSearchParams(params).toString(),
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_API_TOKEN}`,
      },
    }
  )
    .then((data) => data.json())
    .then((data) => {
      const filteredData = data.results.filter(
        (result: { overview: string }) => {
          return result.overview != "";
        }
      );

      return filteredData;
    });

  if (filmPosition) {
    return result[filmNumber];
  }

  return result;
}

async function getTrending(period: "week" | "day") {
  const params = {
    language: "pt-br",
    api_key: `${process.env.EXPO_PUBLIC_API_KEY}`,
    include_adult: "false",
  };

  const result = await fetch(
    `${process.env.EXPO_PUBLIC_BASE_URL}/trending/movie/${period}?` +
      new URLSearchParams(params).toString(),
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_API_TOKEN}`,
      },
    }
  )
    .then((data) => data.json())
    .then((data) => {
      const filteredData = data.results.filter(
        (result: { overview: string }) => {
          return result.overview != "";
        }
      );

      return filteredData;
    });

  return result;
}

async function getFilmsById(id: number) {
  const result = await fetch(
    `${process.env.EXPO_PUBLIC_BASE_URL}/movie/${id}?` +
      new URLSearchParams({
        language: "pt-br",
        api_key: `${process.env.EXPO_PUBLIC_API_KEY}`,
      }).toString(),
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_API_TOKEN}`,
      },
    }
  )
    .then((data) => data.json())
    .then((data) => {
      return data;
    });

  return result;
}

const useFilms = { getFilms, getFilmsById, getTrending };

export default useFilms;
