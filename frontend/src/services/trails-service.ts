// trails-service.ts
import i18n from "@/lib/i18n"

const BACKEND_HOST = import.meta.env.VITE_BACKEND_HOST;
const BACKEND_PORT = import.meta.env.VITE_BACKEND_PORT;
const BACKEND_URL = `${BACKEND_HOST}:${BACKEND_PORT}/api`;

export async function getAllTrails(): Promise<any> {
  const lang = i18n.language;
  const response = await fetch(`${BACKEND_URL}/trails?lang=${lang}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

export async function getTrailById(trailId: string): Promise<any> {
  const lang = i18n.language;
  const response = await fetch(`${BACKEND_URL}/trails/${trailId}?lang=${lang}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}