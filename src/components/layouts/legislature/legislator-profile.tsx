"use client";

import { Button } from "@/components/ui/button";
import { legislators, LegislatorType } from "@/data/legislator";
import { unslugify } from "@/lib/helper";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaSquareXTwitter } from "react-icons/fa6";
import { IoIosMail, IoLogoFacebook, IoLogoLinkedin } from "react-icons/io";

const LegislatorProfileComp = ({ name }: { name: string }) => {
  const [legislator, setLegislator] = useState<LegislatorType | null>(null);
  const [viewBio, setViewBio] = useState<boolean>(false);
  const [projects, setProjects] = useState([]);
  
  /**
   * Attempts to find the best matching legislator based on the provided `name` slug.
   * The search is performed by splitting the search name into words and comparing them
   * against each legislator's name (case-insensitive, ignoring honorifics and punctuation).
   * 
   * The matching process works as follows:
   * - Split the search name into words.
   * - For each legislator, split their name into words (after removing honorifics like "Hon." or "Hon").
   * - Count how many words from the search name appear in the legislator's name.
   * - Select the legislator(s) with the highest number of matching words.
   * - If only one legislator matches best, return that legislator.
   * - If multiple legislators match equally, attempt to refine the search by including more words.
   * - If no match is found, return null.
   * 
   * This approach allows for flexible and partial matching, accommodating cases where
   * the search input may be incomplete or formatted differently.
   */
  const getLegislator = () => {
    const searchName = unslugify(name).replace(/^Hon\s+/i, '').toLowerCase();
    const leg = legislators.find(legis => 
      legis.name.replace(/^Hon\.?\s+/i, '').toLowerCase() === searchName
    );
    if (leg) {
      setLegislator(leg);
    } else {
      setLegislator(null);
    }
  }

  const toggleBio = () => setViewBio(!viewBio);

  useEffect(() => {
    getLegislator();
    setProjects([]);
  }, []);
  
  return (
    <div>
      {legislator ? (
        <div className="flex flex-col gap-5">
            <div className="flex flex-col md:flex-row gap-5 bg-gray-100 rounded-md p-4 w-full">
            <Image
              src={legislator.image || ""}
              alt={legislator.name}
              width={300}
              height={300}
              className="w-full md:w-[300px] h-auto object-cover rounded"
            />
            <div className="flex my-auto flex-col">
              <h2 className="flex text-2xl font-extrabold">{legislator.name}</h2>
              <p className="text-card-foreground/80 font-semibold">{legislator.office} <span className="italic text-secondary">({legislator.constituency})</span></p>
              {legislator.socials && (<div className="mt-2 w-full flex justify-start gap-2 text-gray-400">
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

              {legislator.bio && (
              <p className="text-gray-700 mt-3 text-sm">
                <span className={cn(!viewBio && "line-clamp-2")}>{legislator.bio}</span>
                <span onClick={toggleBio} className="text-primary font-bold underline cursor-pointer ml-2">{viewBio ? "Read less" : "Read more"}</span>
              </p>
              )}

              <Button
              className="mt-5 w-fit"
              >Send direct message</Button>
            </div>
            </div>

          <div>
            <h2 className="text-xl font-bold">Projects</h2>
            {projects.length > 0 ? (
              <ul className="list-disc pl-5">
                {projects.map((project, index) => (
                  <li key={index} className="text-gray-700">{project}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No projects available.</p>
            )}
          </div>
        </div>
      ) : (
        <div className="text-gray-300 font-medium italic text-center w-full">
          <p>Legislator not found.</p>
        </div>
      )}
    </div>
  )
}
export default LegislatorProfileComp;