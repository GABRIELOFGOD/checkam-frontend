"use client";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type Props = {
  file: File | null | undefined;
  removeFile: () => void;
};

const CreateDiscussionFilePreview: React.FC<Props> = ({ file, removeFile }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [type, setType] = useState<"image" | "video" | "other" | null>(null);

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      setType(null);
      return;
    }

    const mime = file.type;
    if (mime.startsWith("image/")) setType("image");
    else if (mime.startsWith("video/")) setType("video");
    else setType("other");

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    return () => {
      URL.revokeObjectURL(url);
      setPreviewUrl(null);
    };
  }, [file]);

  return (
    <div className="w-20 h-20 rounded-md overflow-hidden border-2 border-gray-400/80 bg-gray-50 flex items-center justify-center relative">
      {previewUrl && type === "image" && (
        <Image
          src={previewUrl}
          alt={file?.name ?? "preview"}
          className="w-full h-full object-cover"
          fill
        />
      )}

      {previewUrl && type === "video" && (
        <video
          src={previewUrl}
          className="w-full h-full object-cover"
          controls
          playsInline
          muted
        />
      )}

      {!previewUrl || type === "other" ? (
        <div className="px-1 text-xs text-center text-gray-600">
          {file?.name ?? "No file"}
        </div>
      ) : null}

      <Button
        className={`bg-black/20 absolute top-0 right-0 w-fit h-fit p-2`}
        onClick={removeFile}
        variant={"destructive"}
      >
        <X size={10} />
      </Button>
    </div>
  );
};

export default CreateDiscussionFilePreview;