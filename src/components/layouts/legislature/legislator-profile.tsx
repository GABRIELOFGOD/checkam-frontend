"use client";

import Loading from "@/components/general-loader";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { IBill } from "@/models/bill";
import { IUser } from "@/models/user";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaSquareXTwitter } from "react-icons/fa6";
import { IoIosMail, IoLogoFacebook, IoLogoLinkedin } from "react-icons/io";
import { toast } from "sonner";
import BillCard from "../bills/bill-card";

const LegislatorProfileComp = ({ id }: { id: string }) => {
  const [legislator, setLegislator] = useState<IUser | null>(null);
  const [viewBio, setViewBio] = useState<boolean>(false);
  const [projects, setProjects] = useState<IBill[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();
  
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
  const getLegislator = async () => {
    try {
      const req = await fetch(`/api/users?id=${id}&with=projects`);
      const data = await req.json();
      if (req.ok) {
        if (data.user.role !== "legislator") {
          toast.warning("The ID you provided does not belong to a legislator.");
          router.push("/legislators");
        };
        setLegislator(data.user);
        if (data.projects) {
          setProjects(data.projects);
        }
      } else {
        console.error("Failed to fetch legislator:", data);
      }
    } catch (error) {
      console.error("Error fetching legislator:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const toggleBio = () => setViewBio(!viewBio);

  useEffect(() => {
    getLegislator();
    setProjects([]);
  }, []);

  if (isLoading) {
    return (
      <div className='h-screen w-full flex justify-center items-center left-0 top-0'>
        <Loading />
      </div>
    )
  }
  
  return (
    <div>
      {legislator ? (
        <div className="flex flex-col gap-5">
            <div className="flex flex-col md:flex-row gap-5 bg-gray-100 rounded-md p-4 w-full">
            <Image
              src={legislator.image || ""}
              alt={legislator.fname}
              width={300}
              height={300}
              className="w-full md:w-[300px] h-auto object-cover rounded"
            />
            <div className="flex my-auto flex-col">
              <h2 className="flex text-2xl font-extrabold">{legislator.fname} {legislator.lname}</h2>
              <p className="text-card-foreground/80 font-semibold">{legislator.party} <span className="italic text-secondary">({legislator.constituency})</span></p>
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
                  <BillCard
                    key={index}
                    bill={project}
                  />
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