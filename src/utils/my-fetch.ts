import { baseUrl } from "./constants";


export async function MyFetch(
    endpoint: string,
    option?: RequestInit | undefined
) {
    const response = await fetch(`${baseUrl}${endpoint}`, option);
    const res = await response.json();

    return res;
}