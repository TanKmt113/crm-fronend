import { apiClient } from '@/lib/api-client';
import type { WebsiteSettings, WebsiteSettingsUpdatePayload } from '@/types';

/**
 * Fetch current website settings
 */
export async function getWebsiteSettings(): Promise<WebsiteSettings> {
  try {
    const data = await apiClient.get<WebsiteSettings>('/api/v1/settings/website');
    return data;
  } catch (error) {
    console.error('Error fetching website settings:', error);
    throw error;
  }
}

/**
 * Update website settings
 * @param payload - Settings to update (logo, banner, sections)
 */
export async function updateWebsiteSettings(
  payload: WebsiteSettingsUpdatePayload
): Promise<WebsiteSettings> {
  try {
    const formData = new FormData();

    // Add logo file if provided
    if (payload.logo) {
      formData.append('logo', payload.logo);
    }

    // Add banner file if provided
    if (payload.banner) {
      formData.append('banner', payload.banner);
    }

    // Add sections configuration
    if (payload.sections) {
      formData.append('sections', JSON.stringify(payload.sections));
    }

    const data = await apiClient.put<WebsiteSettings>(
      '/api/v1/settings/website',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return data;
  } catch (error) {
    console.error('Error updating website settings:', error);
    throw error;
  }
}

/**
 * Upload a single image (logo or banner)
 * @param file - Image file to upload
 * @param type - Type of image ('logo' or 'banner')
 */
export async function uploadSettingsImage(
  file: File,
  type: 'logo' | 'banner'
): Promise<string> {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    const data = await apiClient.post<{ url: string }>(
      '/api/v1/settings/upload',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return data.url;
  } catch (error) {
    console.error('Error uploading settings image:', error);
    throw error;
  }
}
