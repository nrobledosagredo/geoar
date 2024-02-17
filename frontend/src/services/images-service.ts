// images-service.ts
const BACKEND_HOST = import.meta.env.VITE_BACKEND_HOST;
const BACKEND_PORT = import.meta.env.VITE_BACKEND_PORT;
const BACKEND_URL = `${BACKEND_HOST}:${BACKEND_PORT}/api`;

// services/image-service.ts
export function getImage(url: string): string {
  return `${BACKEND_URL}/images?url=${encodeURIComponent(url)}`;
}