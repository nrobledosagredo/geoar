// trails-service.ts
import i18n from "@/lib/i18n";
import { getAuthToken } from "@/lib/get-auth-token";

const BACKEND_HOST = import.meta.env.VITE_BACKEND_HOST;
const BACKEND_PORT = import.meta.env.VITE_BACKEND_PORT;
const BACKEND_URL = `${BACKEND_HOST}:${BACKEND_PORT}/api`;

export async function getTrails(): Promise<any> {
  const lang = i18n.language;
  const token = await getAuthToken();

  const response = await fetch(`${BACKEND_URL}/trails?lang=${lang}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

export async function getTrail(id: string): Promise<any> {
  const lang = i18n.language;
  const token = await getAuthToken();

  const response = await fetch(`${BACKEND_URL}/trails/${id}?lang=${lang}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}