import React, { useCallback, useEffect, useState } from "react";
import Dropzone from "./helpers/Dropzone";
import PreviewGrid from "./helpers/PreviewGrid";
import SortableList from "react-easy-sort";
import update from "immutability-helper";

interface UploadImagesProps {
  maxImages: number;
  setImages: (images: File[]) => void;
}

const UploadImages: React.FC<UploadImagesProps> = ({ maxImages, setImages }) => {
  const [productImages, setProductImages] = useState<File[]>([]);
  const [imageURLS, setImageURLS] = useState<string[]>([]);
  const onDrop = useCallback(
    <T extends File>(acceptedFiles: T[]) => {
      acceptedFiles.map((file) => {
        if (productImages.length < maxImages) {
          setProductImages((prevState) => [...prevState, file]);
          setImageURLS((prevState) => [...prevState, URL.createObjectURL(file)]);
        }
      });
    },
    [maxImages, productImages]
  );

  useEffect(() => {
    if (productImages.length !== 0) {
      setImages(productImages);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productImages]);

  return (
    <>
      <Dropzone
        onDrop={onDrop}
        accept={{ "image/png": [".png"], "image/jpg": [".jpg"], "image/jpeg": [".jpeg"] }}
        maxFiles={maxImages}
      />
      <SortableList
        onSortEnd={(oldIndex, newIndex) => {
          setProductImages(
            update(productImages, {
              $splice: [
                [oldIndex, 1],
                [newIndex, 0, productImages[oldIndex]],
              ],
            })
          );
          setImageURLS(
            update(imageURLS, {
              $splice: [
                [oldIndex, 1],
                [newIndex, 0, imageURLS[oldIndex]],
              ],
            })
          );
        }}
      >
        <PreviewGrid
          images={imageURLS}
          onDelete={(index) => {
            const images = productImages.filter((_, i) => index !== i);
            setProductImages(images);
          }}
        />
      </SortableList>
    </>
  );
};
export default UploadImages;
