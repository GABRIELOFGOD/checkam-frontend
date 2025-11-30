"use client";
import Image from "next/image";

export default function DiscussionImages({ images }: { images: string[] }) {
  if (!images || images.length === 0) return null;

  const displayImages = images.slice(0, 4);    // only show first 4
  const remaining = images.length - 4;

  return (
    <div className="w-full overflow-hidden rounded-md">
      {images.length === 1 && (
        <div className="relative w-full h-80">
          <Image
            src={images[0]}
            alt=""
            fill
            className="object-cover rounded-md"
          />
        </div>
      )}

      {images.length === 2 && (
        <div className="grid grid-cols-2 gap-1 h-64">
          {images.map((img, i) => (
            <div key={i} className="relative">
              <Image src={img} alt="" fill className="object-cover rounded-md" />
            </div>
          ))}
        </div>
      )}

      {images.length === 3 && (
        <div className="grid grid-cols-2 gap-1 h-80">
          <div className="relative col-span-2 h-48">
            <Image
              src={images[0]}
              alt=""
              fill
              className="object-cover rounded-md"
            />
          </div>
          {images.slice(1).map((img, i) => (
            <div key={i} className="relative h-32">
              <Image src={img} alt="" fill className="object-cover rounded-md" />
            </div>
          ))}
        </div>
      )}

      {images.length >= 4 && (
        <div className="grid grid-cols-2 gap-1 h-80">
          {displayImages.map((img, i) => (
            <div key={i} className="relative">
              <Image src={img} alt="" fill className="object-cover rounded-md" />
              {i === 3 && remaining > 0 && (
                <div className="absolute inset-0 bg-black/60 flex justify-center items-center rounded-md">
                  <p className="text-white text-3xl font-bold">+{remaining}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
