import { VideoType } from "@/data/videos";
import { PlayIcon } from "lucide-react";
import Image from "next/image";

const VideoCard = ({ info }: { info: VideoType }) => {
  return (
    <div>
      <div className="w-[301px] flex flex-col gap-2 h-fit relative">
        <div className={`h-[169px] w-full relative rounded-md overflow-hidden`}>
          <div className="absolute w-full h-full bg-black/30 z-10 flex flex-col justify-center items-center">
            <div className="bg-white h-14 w-14 justify-center items-center flex flex-col text-primary rounded-full">
              <PlayIcon size={25} />
            </div>
          </div>
          <Image
            src={info.image}
            alt="Infographic image"
            fill
            className="object-fit -z-10"
          />
        </div>
        <div>
          <p className="font-semibold">{info.title}</p>
          <p className="text-sm text-muted line-clamp-2">{info.des}</p>
        </div>
      </div>
    </div>
  )
}

export default VideoCard;