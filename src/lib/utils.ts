export const getQueryString = (params: Record<string, string>) => {
  const cleaned: Record<string, string> = {};
  for (const key in params) {
    if (params[key]) cleaned[key] = params[key];
  }
  const query = new URLSearchParams(cleaned).toString();
  return query ? `?${query}` : "";
};

export const customFetch = async (url: string, options?: RequestInit) => {
  try {
    const res = await fetch(url, options);
    const data = await res.json();

    if (!res.ok || data.status === "error") throw new Error(data.message);

    return data.data;
  } catch (error) {
    throw error;
  }
};
