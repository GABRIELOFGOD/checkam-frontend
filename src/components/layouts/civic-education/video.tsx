import { dummyVideos, VideoType } from "@/data/videos";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import VideoCard from "./video-card";

const Video = () => {
  const [videos, setVideos] = useState<VideoType[]>([]);

  useEffect(() => {
    setVideos(dummyVideos);
  }, []);
  
  return (
    <div className='flex flex-col gap-5 w-full'>
      <p className='text-[22px] font-bold'>Videos</p>
      <div className="w-full gap-5">
        {!videos.length ?
        (<div className="w-full h-[200px] flex flex-col items-center justify-center">
          <p className="text-lg font-semibold italic text-gray-400 text-center">No Video yet!</p>
        </div>):
        (<div className="w-full overflow-x-auto flex gap-5">
          {videos.map((info, i) => (
            <VideoCard
              key={i}
              info={info}
            />
          ))}
        </div>)}
      </div>
      {videos.length > 0 && (<div className="flex gap-5 w-full justify-end">
        <Button>
          <Share2 size={15} />
          Share
        </Button>
      </div>)}
    </div>
  )
}

export default Video;