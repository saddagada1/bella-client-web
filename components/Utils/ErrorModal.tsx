import { Dispatch, SetStateAction } from "react";

interface ErrorModalProps {
  setVisible: Dispatch<SetStateAction<boolean>>;
  error: string;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ setVisible, error }) => {
  return (
    <div className="w-screen h-screen z-50 fixed top-0 flex justify-center items-center">
      <div
        onClick={() => setVisible(false)}
        className="w-full h-full absolute bg-secondary opacity-50"
      />
      <div className="w-11/12 sm:w-10/12 p-6 z-10 bg-primary rounded-xl">
        <h1 className="w-full text-2xl font-bold uppercase font-display pb-2 mb-4 border-b border-solid border-gray-300">
          Error
        </h1>
        <p className="bg-red-100 text-md font-medium font-sans normal-case text-red-500 border border-solid border-red-500 px-2 py-0.5 rounded">
          {error}
        </p>
      </div>
    </div>
  );
};
export default ErrorModal;
