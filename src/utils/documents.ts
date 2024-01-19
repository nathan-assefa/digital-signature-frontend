import fetchData from "./makeRequest";
import AuthToken from "./AuthToken";
import { SigningDocument } from "./types";

const url: string = "http://localhost:8000/api";

const accessToken: string = AuthToken();

// export function getDocuments(): Promise<SigningDocument[]> {
//   return fetchData(`${url}/sign-documents/`);
// }

export async function getDocuments(): Promise<SigningDocument[]> {
  try {
    const response: SigningDocument[] = await fetchData(
      `${url}/sign-documents/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(accessToken),
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
}
