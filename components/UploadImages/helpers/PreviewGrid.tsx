import { SortableItem } from "react-easy-sort";
import Image from "next/image";
import { FiX } from "react-icons/fi";
import { useState } from "react";
import clsx from "clsx";

interface PreviewItemProps {
  image: string;
  index: number;
}

const PreviewItem: React.FC<PreviewItemProps> = ({ image, index }) => {
  return (
    <SortableItem>
      <div className="w-full aspect-square relative rounded-xl overflow-hidden select-none pointer-events-none">
        <Image src={image} alt={`Product Image - ${index + 1}`} fill className="object-cover" />
      </div>
    </SortableItem>
  );
};

interface PreviewGridProps {
  images: string[];
  onDelete: (index: number) => void;
}
const PreviewGrid: React.FC<PreviewGridProps> = ({ images, onDelete }) => {
  const [hideDelete, setHideDelete] = useState(false);
  return (
    <div className="w-full grid grid-cols-3 grid-rows-3 gap-2 my-4">
      {Array(9)
        .fill(null)
        .map((_, index) =>
          images[index] ? (
            <div
              onMouseDown={() => setHideDelete(true)}
              onMouseUp={() => setHideDelete(false)}
              className="relative"
              key={index}
            >
              <PreviewItem image={images[index]} index={index} />
              <FiX
                onClick={() => onDelete(index)}
                className={clsx(
                  "absolute top-0 right-0 bg-red-500 text-md text-primary rounded cursor-pointer",
                  hideDelete && "opacity-0"
                )}
              />
            </div>
          ) : (
            <div key={index} className="w-full aspect-square rounded-xl bg-gray-300" />
          )
        )}
    </div>
  );
};

export default PreviewGrid;
