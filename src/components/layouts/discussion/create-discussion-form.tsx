"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { IUser } from "@/models/user";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandEmpty,
} from "@/components/ui/command";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

const CreateDiscussionForm = () => {
  const [tags, setTages] = useState<IUser[]>([]);
  const [content, setContent] = useState("");
  const [constituencies, setContituencies] = useState<string[]>([]);

  const [open, setOpen] = useState(false);

  const handleSelect = (value: string) => {
    if (selectedValues.includes(value)) {
      onChange(selectedValues.filter(v => v !== value));
    } else {
      onChange([...selectedValues, value]);
    }
  };
  
  return (
    <div>
      <div className="pb-5">
        <h2 className="font-semibold text-2xl">Create discussion</h2>
        <p>Create discussion that people and engage with in the community</p>
      </div>
      <form>

        <Textarea
          placeholder="Say what's on your mind or what is happening in your environment"
          className="w-full h-[200px]"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className="flex flex-col gap-5 md:flex-row">
          <div className="flex flex-col gap-1">
            <Label>Select location</Label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  {constituencies.length > 0
                    ? constituencies.map(v => options.find(o => o.value === v)?.label).join(", ")
                    : placeholder}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px]">
                <Command>
                  <CommandInput placeholder="Search…" />
                  <CommandList>
                    <CommandEmpty>No results.</CommandEmpty>
                    {Constituencies.map((opt, i) => (
                      <CommandItem key={i} onSelect={() => handleSelect(opt)}>
                        <span className={ constituencies.includes(opt.value) ? "font-bold" : "" }>
                          {opt.label}
                        </span>
                      </CommandItem>
                    ))}
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
      </form>
    </div>
  )
}
export default CreateDiscussionForm;