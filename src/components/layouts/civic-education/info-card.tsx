import { InfographicType } from "@/data/infographics";
import { VideoType } from "@/data/videos";
import Image from "next/image";

const InfoCard = ({ info, height="h-[402px]" }: { info: InfographicType, height?: string }) => {
  return (
    <div>
      <div className="w-[301px] flex flex-col gap-2 h-fit relative">
        <div className={`${height} w-full relative`}>
          <Image
            src={info.image}
            alt="Infographic image"
            fill
            className="object-fit "
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

export default InfoCard;