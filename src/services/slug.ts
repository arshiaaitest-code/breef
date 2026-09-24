/**
 * Generates a clean URL slug from client name and project title.
 * Example: "آرش پارسا" + "کافه مانلی" -> "arash/cafe-maneli"
 * Supports English and transliterated / cleaned Persian strings.
 */
export function generateBriefSlug(clientName: string, projectTitle: string): string {
  const sanitize = (text: string): string => {
    return text
      .trim()
      .toLowerCase()
      .replace(/[^\w\u0600-\u06FF\s-]/g, '') // keep alphanumeric, spaces, dashes, and Persian/Arabic letters
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '') || 'project';
  };

  const clientSlug = sanitize(clientName) || 'client';
  const projectSlug = sanitize(projectTitle) || 'brief';

  return `${clientSlug}/${projectSlug}`;
}

export function parseBriefUrl(path: string): { clientSlug: string; projectSlug: string } | null {
  const match = path.match(/\/brief\/([^\/]+)\/([^\/]+)/);
  if (match) {
    return {
      clientSlug: decodeURIComponent(match[1]),
      projectSlug: decodeURIComponent(match[2]),
    };
  }
  return null;
}
