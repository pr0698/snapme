import { useEffect, useState } from "react";

import MasonryLayout from "./masonry.layout";
import { client } from "../client";
import { feedQuery, searchQuery } from "../utils/data";
import Spinner from "./spinner";
import { TPins } from "../type/user";

type SearchPinProps = {
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  searchTerm: string;
};

const Search = ({ searchTerm }: SearchPinProps) => {
  const [pins, setPins] = useState([] as TPins[]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchTerm !== "") {
      setLoading(true);
      const query = searchQuery(searchTerm.toLowerCase());
      client.fetch(query).then((data) => {
        setPins(data);
        setLoading(false);
      });
    } else {
      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  }, [searchTerm]);

  return (
    <div>
      {loading && <Spinner message="Searching pins" />}
      {pins?.length !== 0 && <MasonryLayout pins={pins} />}
      {pins?.length === 0 && searchTerm !== "" && !loading && (
        <div className="mt-10 text-center text-xl ">No Pins Found!</div>
      )}
    </div>
  );
};

export default Search;
