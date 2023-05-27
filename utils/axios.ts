import axiosRetry from "axios-retry";
import axios, { AxiosError } from "axios";
import { UserObjectFragment } from "../generated/graphql";

axiosRetry(axios, {
  retries: 3,
  // retryCondition: (error) => {
  //   console.log(error);
  //   return true;
  // },
  retryDelay: axiosRetry.exponentialDelay,
  onRetry: (retryCount) => {
    console.log("retry: ", retryCount);
  },
});

interface FetchError {
  error: string;
}

interface RefreshTokenResponse {
  ok: boolean;
  access_token: string;
  expires_in: number;
  user: UserObjectFragment;
}

export const fetchRefreshToken = async () => {
  try {
    const response = await axios.post<RefreshTokenResponse>(
      process.env.REFRESH_TOKEN_ENDPOINT!,
      {},
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<FetchError>;
      if (serverError && serverError.response) {
        return serverError.response.data;
      }
    }
    return { error: "Failed to Refresh Token" };
  }
};

export const putProductImage = async (url: string, file: File) => {
  const response = await axios.put(url, file);
  if (response.status === 200) {
    return true;
  }
  return false;
};
