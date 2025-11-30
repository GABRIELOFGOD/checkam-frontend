"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { IUser } from "@/models/user";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandEmpty,
} from "@/components/ui/command";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { toast } from "sonner";
import { IConstituency } from "@/models/constituency";
import CreateDiscussionFilePreview from "./create-discussion-file-preview";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

const CreateDiscussionForm = () => {
  // const [tags, setTags] = useState<IUser[]>([]);
  const [content, setContent] = useState("");
  const [constituencies, setConstituencies] = useState<IConstituency[]>([]);
  const [selectedConstituencies, setSelectedConstituencies] = useState<
    IConstituency[]
  >([]);
  const [legislators, setLegislators] = useState<IUser[]>([]);
  const [selectedLegislators, setSelectedLegislators] = useState<IUser[]>([]);
  const [postFiles, setPostFiles] = useState<File[] | null>(null);
  
  const [openConstituencies, setOpenConstituencies] = useState(false);
  const [openLegislators, setOpenLegislators] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const getConstituencies = async () => {
      try {
        const response = await fetch("/api/constituency");
        const data = await response.json();
        setConstituencies(data);
      } catch (error: unknown) {
        console.log("Error getting constituencies", error);
        if (error instanceof Error) {
          toast.error(error.message);
        }
      }
    };

    const getLegislators = async () => {
      try {
        const response = await fetch("/api/users");
        const users = (await response.json()) as IUser[];
        setLegislators(
          users.filter((user: IUser) => user.role === "legislator")
        );
      } catch (error) {
        console.log("Error getting legislators", error);
        if (error instanceof Error) {
          toast.error(error.message);
        }
      }
    };

    getConstituencies();
    getLegislators();
  }, []);

  const handleSelectConstituency = (constituency: IConstituency) => {
    setSelectedConstituencies((prev) =>
      prev.includes(constituency)
        ? prev.filter((c) => c !== constituency)
        : [...prev, constituency]
    );
    // setOpen(false);
  };

  const handleSelectLegislator = (legislator: IUser) => {
    setSelectedLegislators((prev) =>
      prev.includes(legislator)
        ? prev.filter((l) => l !== legislator)
        : [...prev, legislator]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) {
      toast.error("Please enter some content for the discussion");
      return;
    }

    // if (selectedConstituencies.length === 0) {
    //   toast.error("Please select at least one constituency");
    //   return;
    // }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("content", content);
      if (selectedConstituencies.length)
        formData.append(
          "constituencies",
          JSON.stringify(selectedConstituencies.map((c) => c._id))
        );
      if (selectedLegislators.length)
        formData.append(
          "tags",
          JSON.stringify(selectedLegislators.map((l) => l._id))
        );

      if (postFiles?.length) {
        postFiles.forEach((file) => {
          formData.append("files", file);
        });
      }

      const response = await fetch("/api/discussion", {
        method: "POST",
        headers: {
          "authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error("Failed to create discussion", data.error);
      }

      toast.success("Discussion created successfully");
      setContent("");
      setSelectedConstituencies([]);
      setSelectedLegislators([]);
      setPostFiles([]);
      router.push("/discussion");
    } catch (error) {
      console.log("Discussion post error", error);
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="px-3">
      <div className="pb-5">
        <h2 className="font-semibold text-2xl">Create discussion</h2>
        <p>Create discussion that people can engage with in the community</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Textarea
          placeholder="Say what's on your mind or what is happening in your environment"
          className="w-full h-[200px]"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />

        <div className="flex flex-col gap-2">
          <Label className="font-semibold">Add images/videos</Label>
          <div className="flex flex-wrap gap-2">
            <div className="flex flex-wrap gap-2">
              {postFiles?.map(((f, i) => (<CreateDiscussionFilePreview file={f} key={i} removeFile={() => {
                const newSetFiles = postFiles.filter(fi => fi !== f);
                setPostFiles(newSetFiles)
              }} />)))}
            </div>

            <div>
              <Label htmlFor="add-file" className="border border-primary bg-primary/40 h-20 w-20 rounded-md cursor-pointer flex items-center justify-center">
                <Plus size={40} className="text-primary" />
              </Label>
              <Input
                className="hidden"
                id="add-file"
                type="file"
                multiple
                onChange={(e) => {
                  const files = Array.from(e.target.files || []);
                  setPostFiles(prev => prev ? [...prev, ...files] : files);
                }}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
          <div className="flex flex-col gap-1 w-full">
            <Label className="font-semibold">Select location concerns</Label>
            <Popover
              open={openConstituencies}
              onOpenChange={setOpenConstituencies}
            >
              <PopoverTrigger asChild>
                <Button variant="outline" type="button">
                  {selectedConstituencies.length > 0
                    ? selectedConstituencies.map((c) => c.name).join(", ")
                    : "Select constituencies"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full">
                <Command>
                  <CommandInput placeholder="Search constituency..." />
                  <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    {constituencies.map((constituency, id) => (
                      <CommandItem
                        key={id}
                        onSelect={() => handleSelectConstituency(constituency)}
                      >
                        {constituency.name}{" "}
                        {selectedConstituencies.includes(constituency)
                          ? "✓"
                          : ""}
                      </CommandItem>
                    ))}
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex flex-col gap-1 w-full">
            <Label className="font-semibold">Tag legislators concerns</Label>
            <Popover open={openLegislators} onOpenChange={setOpenLegislators}>
              <PopoverTrigger asChild>
                <Button variant="outline" type="button">
                  {selectedLegislators.length > 0
                    ? selectedLegislators
                        .map((l) => `${l.fname} ${l.lname}`)
                        .join(", ")
                    : "Select legislators"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full">
                <Command>
                  <CommandInput placeholder="Search legislators..." />
                  <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    {legislators.map((legislator, id) => (
                      <CommandItem
                        key={id}
                        onSelect={() => handleSelectLegislator(legislator)}
                      >
                        {legislator.fname} {legislator.lname}{" "}
                        {selectedLegislators.includes(legislator) ? "✓" : ""}
                      </CommandItem>
                    ))}
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <Button type="submit" className="w-full md:w-auto" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create Discussion"}
        </Button>
      </form>
    </div>
  );
};

export default CreateDiscussionForm;
