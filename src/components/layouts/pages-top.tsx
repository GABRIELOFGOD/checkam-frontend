import { Search } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

const PagesTop = ({
  title,
  searchState,
  searchChange,
  short
}: {
  title:  string,
  searchState: string,
  searchChange: Dispatch<SetStateAction<string>>,
  short: string
}) => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-2 flex-col">
        <p className='text-2xl md:text-4xl font-extrabold'>{title}</p>
        <p className='text-muted text-sm'>{short}</p>
      </div>
      <div
        className="h-12 w-full shadow-sm border-2 border-muted/20 rounded-md flex gap-3 px-3"
      >
        <Search size={20} className="my-auto text-muted/40" />
        <input
          type="search"
          placeholder="Search"
          className="h-full w-full border-none outline-none"
          value={searchState}
          onChange={e => searchChange(e.target.value)}
        />
      </div>
    </div>
  )
}

export default PagesTop;