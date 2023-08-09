import { PersonCast } from "./PersonCast";
import { PersonCrew } from "./PersonCrew";

export interface PersonCredits {
  id: number;
  cast: Array<PersonCast>;
  crew: Array<PersonCrew>;
}
