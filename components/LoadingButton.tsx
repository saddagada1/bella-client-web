import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { DominoSpinner } from "react-spinners-kit";

interface LoadingButtonProps
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  children: React.ReactNode;
  dark?: boolean;
  loading: boolean;
  disabled: boolean;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
  children,
  dark,
  loading,
  disabled,
  ...DetailedHTMLProps
}) => {
  return (
    <button {...DetailedHTMLProps} type="submit" disabled={disabled}>
      {loading ? (
        <DominoSpinner
          size={4}
          color={dark ? "#f2f2f2" : "#151515"}
          loading={loading}
          sizeUnit="vmax"
        />
      ) : (
        <>{children}</>
      )}
    </button>
  );
};
export default LoadingButton;
