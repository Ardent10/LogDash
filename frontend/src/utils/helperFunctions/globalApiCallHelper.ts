type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

type GlobalApiCallHelperProps = {
  api: string;
  method?: HttpMethod;
  body?: any;
  headers?: Record<string, string>;
};

let baseURL = "";

if (process.env.NODE_ENV === "development") {
  // Use development base URL
  baseURL = process.env.DEVELOPMENT_API_URL!;
} else {
  // Use production base URL
  baseURL = process.env.PRODUCTION_API_URL!;
}

export const globalApiCallHelper = async ({
  api,
  method,
  body = null,
  headers = {},
}: GlobalApiCallHelperProps) => {
  try {
    const response = await fetch(`${baseURL}${api}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body,
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.log("ERROR", error);
  }
};
