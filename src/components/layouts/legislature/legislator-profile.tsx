"use client";

import { Button } from "@/components/ui/button";
import { legislators, LegislatorType } from "@/data/legislator";
import { unslugify } from "@/lib/helper";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaSquareXTwitter } from "react-icons/fa6";
import { IoIosMail, IoLogoFacebook, IoLogoLinkedin } from "react-icons/io";

const LegislatorProfileComp = ({ name }: { name: string }) => {
  const [legislator, setLegislator] = useState<LegislatorType | null>(null);
  
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

  useEffect(() => {
    getLegislator();
  }, []);
  
  return (
    <div>
      {legislator ? (
        <div className="flex flex-col gap-5">
          <div className="flex gap-5 bg-gray-100 rounded-md p-4 w-full">
            <Image
              src={legislator.image || ""}
              alt={legislator.name}
              width={300}
              height={300}
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

              <Button
                className="mt-5 w-fit"
              >Send direct message</Button>
            </div>
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