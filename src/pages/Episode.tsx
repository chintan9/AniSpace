import { FC, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Plyr from "plyr-react";
import Skeleton from "../components/Skeleton";
import WentWrong from "../components/WentWrong";
import { addEpisodeToStorage } from "../utils/localStorage";
import { getEpisodeData } from "../api";
import { useQuery } from "react-query";

const Episode: FC = () => {
  const { id, episode } = useParams() as { id: string; episode: string };

  const { data, error, isLoading } = useQuery(`episode-${id}-${episode}`, () =>
    getEpisodeData(id, episode)
  );

  const [expandEpisodes, setExpandEpisodes] = useState(false);

  useEffect(() => {
    addEpisodeToStorage(id, episode);
  }, [data, episode, id]);

  if (isLoading)
    return (
      <div className="flex justify-center mt-8 mx-two-percent">
        <div className="w-full max-w-2xl">
          <Skeleton className="w-96 h-7 my-4 rounded" />
          <Skeleton
            className="w-full h-0"
            style={{ paddingBottom: "56.25%" }}
          />
          <Skeleton className="w-56 h-7 my-4 rounded" />
          <div className="flex gap-2 flex-wrap mb-5">
            {new Array(10).fill("").map((_, i) => (
              <Skeleton key={i} className="w-14 h-9 rounded" />
            ))}
          </div>
        </div>
      </div>
    );
  if (error) return <WentWrong />;

  return (
    <div className="flex justify-center mx-two-percent pb-8">
      <div className="w-full max-w-2xl">
        <h1 className="my-4 ml-2 text-2xl">
          <Link className="text-blue-sky" to={`/anime/${id}`}>
            {data?.titles?.en ||
              data?.titles?.jp ||
              data?.titles?.it ||
              "Unknown title"}
          </Link>{" "}
          <span>Episode {episode}</span>
        </h1>

        {data?.video && (
          <Plyr
            source={{ type: "video", sources: [{ src: data.video }] }}
            controls
            autoPlay={false}
            playsInline
            width="100%"
            height="auto"
          />
        )}

        <h1 className="my-4 ml-2">Episodes</h1>
        <div
          className={`overflow-hidden ${
            !expandEpisodes ? "max-h-36 darken-to-bottom" : "max-h-infinity"
          }`}
        >
          <div className="flex gap-2 flex-wrap mb-5 justify-between fill-last-item">
            {new Array(data?.episodes_count).fill("").map((_, index) => (
              <Link
                to={`/anime/${id}/${index + 1}`}
                key={index + 1}
                className={`text-white transition py-2 px-4 rounded-md outline-none${
                  index + 1 === Number(episode)
                    ? " bg-blue-sky hover:bg-blue-700"
                    : " bg-dark-lighten hover:bg-dark-darken"
                }`}
              >
                {index + 1}
              </Link>
            ))}
          </div>
        </div>
        <span
          onClick={() => setExpandEpisodes((prev) => !prev)}
          className="text-blue-400 hover:text-blue-500 transition cursor-pointer ml-2 mt-2"
        >
          {expandEpisodes ? "Hide" : "Expand"}
        </span>
      </div>
    </div>
  );
};

export default Episode;
