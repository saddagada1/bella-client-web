import { DominoSpinner } from "react-spinners-kit";

const Loading: React.FC = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <DominoSpinner size={16} color="#151515" loading={true} sizeUnit="vmax" />
    </div>
  );
};

export default Loading;
