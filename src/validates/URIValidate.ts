export function isTikTokURL(url: string): boolean {
  const tiktokURLPattern = /^https:\/\/www\.tiktok\.com\/@[^/]+$/
  return tiktokURLPattern.test(url)
}

export function isFacebookURL(url: string): boolean {
  const facebookURLPattern = /^(https?:\/\/)?(www\.)?facebook\.com\/[^/]+\/?$/
  console.log(facebookURLPattern.test(url))
  return facebookURLPattern.test(url)
}

export function isYouTubeURL(url: string): boolean {
  const youtubeURLPattern = /^(https?:\/\/)?(www\.)?youtube\.com\/@[^/]+$/
  return youtubeURLPattern.test(url)
}

export function isInstagramURL(url: string): boolean {
  const instagramURLPattern = /^(https?:\/\/)?(www\.)?instagram\.com\/[^/]+\/?$/
  return instagramURLPattern.test(url)
}
