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
      <div className="flex gap-2 flex-col relative py-20 px-6">
        {image && (
          <Image
            src={image}
            alt="page top image"
            fill
            className="object-cover object-center rounded-lg opacity-40 absolute top-0 left-0"
            priority
          />
        )}
        <p className='text-2xl md:text-4xl font-extrabold z-40'>{title}</p>
        <p className='text-muted text-sm z-40'>{short}</p>
      </div>
      {gotSearch && (
        <div
          className="h-12 w-full shadow-sm border-2 border-muted/20 rounded-md flex gap-3 px-3"
        >
          <Search size={20} className="my-auto text-muted/40" />
          <input
            type="search"
            placeholder="Search"
            className="h-full w-full border-none outline-none"
            value={searchState}
            onChange={searchChange ? (e) => searchChange(e.target.value) : () => {}}
          />
        </div>
      )}
    </div>
  )
}

export default PagesTop;