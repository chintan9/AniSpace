import { Player } from "@lottiefiles/react-lottie-player";
import data from "../lottie/not_found.json";

function NotFound() {
  return (
    <div className="flex-grow flex flex-col justify-center items-center mt-8 gap-8">
      <Player
        autoplay
        loop
        src={data}
        className="w-full h-auto max-w-xs"
      ></Player>
      <h1 className="text-center text-3xl">Not Found</h1>
    </div>
  );
}

export default NotFound;
