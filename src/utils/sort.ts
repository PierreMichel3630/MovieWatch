import moment from "moment";

export const sortByPopularity = (a: any, b: any) =>
  a.popularity > b.popularity ? -1 : 1;

export const sortByReleaseYear = (a: any, b: any) =>
  moment(a.release_date).format("YYYY") > moment(b.release_date).format("YYYY")
    ? -1
    : 1;
