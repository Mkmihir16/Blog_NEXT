interface FetchError extends Error {
  info?: any;
  status?: number;
}

const fetcher = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);
  
  if (!response.ok) {
    const error: FetchError = new Error('An error occurred while fetching the data.');
    error.info = await response.json();
    error.status = response.status;
    throw error;
  }

  return response.json() as Promise<T>;
};

export default fetcher;
