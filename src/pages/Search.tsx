import { FC, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import AnimeGrid from "../components/AnimeGrid";
import InfiniteScroll from "react-infinite-scroll-component";
import WentWrong from "../components/WentWrong";
import { searchAnime } from "../api";
import { useInfiniteQuery } from "react-query";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Search: FC = () => {
  const navigate = useNavigate();
  const query = useQuery();

  const q = String(query.get("q"));

  useEffect(() => {
    if (!query.get("q")?.trim()) {
      navigate("/");
    }
  }, [query]);

  const { data, error, fetchNextPage, hasNextPage, isFetching } =
    useInfiniteQuery(
      `search-${encodeURIComponent(q)}`,
      ({ pageParam = 1 }) => searchAnime(pageParam, q),
      {
        getNextPageParam: (page) =>
          page.current_page + 1 <= page.last_page
            ? page.current_page + 1
            : undefined,
      }
    );

  if (error) return <WentWrong />;

  return (
    <>
      <div>
        <InfiniteScroll
          dataLength={data?.pages.length || 0}
          next={fetchNextPage}
          hasMore={Boolean(hasNextPage)}
          loader={<></>}
        >
          <AnimeGrid
            title={`Search result for ${q}${
              data?.pages[0]?.documents?.length === 0
                ? " : No result found"
                : ""
            }`}
            skeleton={Boolean(isFetching)}
            data={data?.pages.map((e) => e.documents) || [[]]}
          />
        </InfiniteScroll>
      </div>
    </>
  );
};

export default Search;
