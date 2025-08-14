import type { GetawayFormData } from '../types/getaway';

const API_URL = "/api/getaways";
async function isBackendAvailable(url: string): Promise<boolean> {
  try {
    const res = await fetch(url, { method: "HEAD" });
    return res.ok;
  } catch {
    return false;
  }
}

export async function handleGetawaySubmit(payload: GetawayFormData): Promise<boolean> {
  const backendAvailable = await isBackendAvailable(API_URL);
  if (backendAvailable) {
    const apiFormData = new FormData();

    if (payload.galleryPhotos && Array.isArray(payload.galleryPhotos)) {
      payload.galleryPhotos.forEach(file => {
        apiFormData.append("galleryPhotos", file);
      });
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { galleryPhotos: _galleryPhotos, ...payloadWithoutFiles } = payload;

    apiFormData.append('data', JSON.stringify(payloadWithoutFiles));

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        body: apiFormData,
      });

      if (!response.ok) {
        console.error("API Error:", response.status, await response.text());
        alert("Error sending getaway");
        return false;
      }

      alert("Getaway sent successfully");
      return true;

    } catch (error) {
      console.error("Network or submission error:", error);
      alert("Error sending getaway");
      return false;
    }
  } else {
    console.warn("Backend no disponible, payload a enviar:");
    console.log(payload);
    const localPayload = {
      ...payload,
      //photosMetadata
      galleryPhotos: payload.galleryPhotos
        ? payload.galleryPhotos.map(f => ({ name: f.name, size: f.size, type: f.type }))
        : [],
    };
    const existing = JSON.parse(localStorage.getItem('getaways') || '[]');
    localStorage.setItem('getaways', JSON.stringify([...existing, localPayload]));
    alert("Backend unvailable. Getaway saved locally (metadata only). Check console for the full payload.");
    return true;
  }
}