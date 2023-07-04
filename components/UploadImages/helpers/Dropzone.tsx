import { Accept, useDropzone } from "react-dropzone";
import { FiCamera } from "react-icons/fi";

interface DropzoneProps {
  onDrop: <T extends File>(acceptedFiles: T[]) => void;
  accept: Accept;
  maxFiles: number;
}

const Dropzone: React.FC<DropzoneProps> = ({ onDrop, accept, maxFiles }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    multiple: true,
    maxFiles: maxFiles,
  });

  return (
    <div
      className="w-full aspect-[16/5] border border-dashed border-secondary rounded"
      {...getRootProps()}
    >
      <input className="dropzone-input" {...getInputProps()} />
      <div className="w-full h-full flex flex-col justify-center items-center font-medium text-sm text-gray-400">
        <p className="flex items-center">
          <FiCamera className="mr-2" />
          Upload up to {maxFiles} Images
        </p>
        {isDragActive ? <p>Release to Upload</p> : <p>Drag & Drop or Click to Select Images</p>}
      </div>
    </div>
  );
};

export default Dropzone;
