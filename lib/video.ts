export type ParsedVideo =
  | { kind: "youtube"; embedUrl: string }
  | { kind: "vimeo"; embedUrl: string }
  | { kind: "file"; url: string }
  | null;

export function parseVideoUrl(raw: string): ParsedVideo {
  const url = raw.trim();
  if (!url) return null;

  // YouTube — supports youtu.be/ID, watch?v=ID, /embed/ID, /shorts/ID
  const yt =
    url.match(/youtu\.be\/([\w-]{6,})/) ||
    url.match(/[?&]v=([\w-]{6,})/) ||
    url.match(/youtube\.com\/embed\/([\w-]{6,})/) ||
    url.match(/youtube\.com\/shorts\/([\w-]{6,})/);
  if (yt) {
    const id = yt[1];
    return {
      kind: "youtube",
      embedUrl: `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=1&modestbranding=1&rel=0`,
    };
  }

  // Vimeo — vimeo.com/ID
  const vim = url.match(/vimeo\.com\/(\d+)/);
  if (vim) {
    const id = vim[1];
    return {
      kind: "vimeo",
      embedUrl: `https://player.vimeo.com/video/${id}?autoplay=1&muted=1&loop=1&background=1`,
    };
  }

  // Otherwise assume it's a direct video file URL (.mp4, .webm, .mov, etc.)
  return { kind: "file", url };
}
