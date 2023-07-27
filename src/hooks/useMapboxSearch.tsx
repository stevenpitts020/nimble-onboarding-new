import * as React from "react";
import { MAPBOX_TOKEN } from "../utils/constants/general";

export interface Suggestion {
  name: string;
  position: number[];
  bbox: number[];
}

const useMapboxSearch = (query: string) => {
  const [suggestions, setSuggestions] = React.useState<Suggestion[]>([]);
  const [loading, setLoading] = React.useState(false);

  const buildQuery = (query: string) => {
    const base_url = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
    return `${base_url}${query}.json?access_token=${MAPBOX_TOKEN}&country=US`;
  };

  React.useEffect(() => {
    const getSuggestions = async () => {
      try {
        setLoading(true);
        const path = buildQuery(query);
        const response = await fetch(path, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw Error(response.statusText);
        }

        const json = await response.json();

        const parsedSuggestions = json.features.map((location: any) => {
          const suggestion: Suggestion = {
            name: location.place_name,
            position: location.center,
            bbox: location.bbox,
          };
          return suggestion;
        });
        setLoading(false);
        setSuggestions(parsedSuggestions);
      } catch (error) {
        setLoading(false);
        setSuggestions([]);
      }
    };

    if (query !== "") {
      getSuggestions();
    }
  }, [query]);

  return { suggestions, loading };
};

export default useMapboxSearch;
