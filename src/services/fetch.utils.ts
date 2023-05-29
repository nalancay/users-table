type makeRequestProps = {
  URL_ENDPOINT: string;
};

const isSuccessful = (statusCode: number) =>
  statusCode >= 200 && statusCode < 400;

const makeRequest = async ({ URL_ENDPOINT }: makeRequestProps) => {
  const response = await fetch(URL_ENDPOINT);
  const code = response.status;
  const parsedResponse = response.json();
  return {
    data: parsedResponse,
    status: code,
    isSuccessful: isSuccessful(code),
  };
};

export { makeRequest };
