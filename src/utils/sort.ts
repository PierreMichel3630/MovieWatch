import moment from "moment";

export const sortByPopularity = (a: any, b: any) =>
  a.popularity > b.popularity ? -1 : 1;

export const sortByReleaseYear = (a: any, b: any) =>
  moment(a.release_date).format("YYYY") > moment(b.release_date).format("YYYY")
    ? -1
    : 1;

export const sortByFirstAirDate = (a: any, b: any) =>
  moment(a.first_air_date).format("YYYY") >
  moment(b.first_air_date).format("YYYY")
    ? -1
    : 1;

export const sortByDateDesc = (a: any, b: any) =>
  moment(a.date).format("YYYY") > moment(b.date).format("YYYY") ? 1 : -1;

export const sortByTotalEpisodeCount = (a: any, b: any) =>
  a.total_episode_count > b.total_episode_count ? -1 : 1;

export const sortByEpisodeNumber = (a: any, b: any) =>
  a.episode_number > b.episode_number ? 1 : -1;

export const sortByName = (a: any, b: any) => {
  const nameA = a.name !== "" ? a.name : a.english_name;
  const nameB = b.name !== "" ? b.name : b.english_name;
  return nameA > nameB ? 1 : -1;
};

export const sortByNativeName = (a: any, b: any) =>
  a.native_name > b.native_name ? 1 : -1;
