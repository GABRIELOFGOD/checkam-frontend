import { Search } from "lucide-react";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

const PagesTop = ({
  title,
  searchState,
  searchChange,
  short,
  image,
  gotSearch = true
}: {
  title:  string,
  searchState?: string,
  searchChange?: Dispatch<SetStateAction<string>>,
  short?: string,
  gotSearch?: boolean
  image?: string
}) => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col md:flex-row items-center justify-between py-10">
      <div className="flex-1 w-full md:w-1/2 space-y-4 mb-6 md:mb-0">
        <p className='text-2xl md:text-4xl font-extrabold'>{title}</p>
        <p className='text-muted-foreground text-sm'>{short}</p>
      </div>
      {image && (
        <div className="relative w-full md:w-1/2 h-[200px] md:h-[300px]">
        <Image
          src={image}
          alt="page top image"
          fill
          className="object-cover object-center rounded-lg"
          priority
        />
        </div>
      )}
      </div>
      {gotSearch && (
      <div
        className="h-12 w-full shadow-sm border-2 border-muted/20 rounded-md flex gap-3 px-3"
      >
        <Search size={20} className="my-auto text-muted/40" />
        <input
          type="search"
          placeholder="Search"
          className="h-full md:w-full border-none outline-none h-12"
          value={searchState}
          onChange={searchChange ? (e) => searchChange(e.target.value) : () => {}}
        />
      </div>
      )}
    </div>
  )
}

export default PagesTop;