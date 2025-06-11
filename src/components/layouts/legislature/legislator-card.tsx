import { LegislatorType } from "@/data/legislator";
import Image from "next/image";

import { IoLogoFacebook, IoLogoLinkedin, IoIosMail } from "react-icons/io";
import { FaSquareXTwitter } from "react-icons/fa6";
import Link from "next/link";

const LegislatorCard = ({ legislator }: { legislator: LegislatorType }) => {
  return (
    <div>
      <div className="rounded-md border-2 border-border/80 w-full overflow-hidden h-fit">
        <div className="md:h-[256px] h-[250px] w-full bg-accent/40 relative">
          <Image
            src={legislator?.image || "/brand/checkam_logo.png"}
            alt={`${legislator.name} image`}
            fill
            className="w-full h-full object-cover object-top"
          />
        </div>

        <div className="p-3 flex flex-col justify-center items-center w-full h-full">
          <p className="font-bold text-lg text-center capitalize line-clamp-2">{legislator.name}</p>
          <p className="italic text-secondary text-center capitalize line-clamp-1">{legislator.constituency} <span>({legislator.office})</span></p>
          {legislator.socials && (<div className="mt-2 w-full flex justify-center gap-2 text-gray-400">
            {legislator.socials.facebook && (<Link className="my-auto" href={legislator.socials.facebook}>
              <IoLogoFacebook size={30} />
            </Link>)}
            {legislator.socials.linkedIn && (<Link className="my-auto" href={legislator.socials.linkedIn}>
              <IoLogoLinkedin size={31} />
            </Link>)}
            {legislator.socials.x && (<Link className="my-auto" href={legislator.socials.x}>
              <FaSquareXTwitter size={26} />
            </Link>)}
            {legislator.socials.mail && (<Link className="my-auto" href={`mailto: ${legislator.socials.mail}`}>
              <IoIosMail size={35} />
            </Link>)}
          </div>)}
        </div>
      </div>
    </div>
  )
}

export default LegislatorCard