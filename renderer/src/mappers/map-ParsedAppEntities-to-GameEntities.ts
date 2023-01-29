import type AppEntity from 'src/domain/applications.entity'
import type ParsedAppEntity from 'src/domain/parsed-applications.entity'

const MAX_LINKS = 50
const MAX_TAGS = 50
const SUPPORTED_MEDIA: SupportedMedia[] = [
  'Discord',
  'F95zone',
  'Itch.io',
  'Patreon',
  'Twitter',
  'Website',
]

const isSupportedMedia = (value: string | number): value is SupportedMedia => {
  return SUPPORTED_MEDIA.includes(value as SupportedMedia)
}

const mapParsedAppEntitiesToAppEntities = (
  parsedApps: Record<Url, ParsedAppEntity>,
): AppEntity[] => {
  return Object.entries(parsedApps)
    .sort((a, b) => {
      const linkA = a[1].App_Settings ? a[1].App_Settings?.Download_link.toLowerCase() : ''
      const linkB = b[1].App_Settings ? b[1].App_Settings?.Download_link.toLowerCase() : ''


      if (linkA < linkB) {
        return 1;
      }
      if (linkA > linkB) {
        return -1;
      }

      return 0;
    })
    .map(([f95zoneUrl, applications]): AppEntity => {
      const {
        App_Likes: applicationsLikes,
        App_name: applicationsName,
        App_Views: applicationsViews,
        App_Rating: applicationsRating,
        App_Settings: applicationsSettings
      } = applications

      // Initial values

      let cover: AppEntity['cover'] = applications.App_Picture ?? null
      let likes: AppEntity['likes'] = null
      let media: AppEntity['media'] = {
        discord: null,
        f95zone: f95zoneUrl,
        itch: null,
        patreon: null,
        twitter: null,
        website: null,
      }
      let name: AppEntity['name'] = applicationsName
      let rating: AppEntity['rating'] = null
      let tags: AppEntity['tags'] = []
      let views: AppEntity['views'] = null
      let settings: AppEntity['settings'] = null

      // Serialization

      if (applicationsLikes) {
        likes = Number(applicationsLikes)
      }

      if (applicationsRating) {
        const normalizedAppRating = applicationsRating.toString().replace(',', '.')
        rating = Number(normalizedAppRating) ?? null
      }

      if (applicationsViews) {
        views = applicationsViews
      }

      if (applicationsSettings) {
        settings = {
          downloadLink: applicationsSettings.Download_link,
          executablePath: applicationsSettings.Executable_path
        }
      }

      for (let i = 1; i <= MAX_TAGS; i++) {
        const key = `links_Tags_${i}_Tags` as keyof ParsedAppEntity
        const tagValue = applications[key]
        if (tagValue && typeof tagValue === 'string') {
          tags = [...tags, tagValue]
        }
      }

      for (let i = 1; i <= MAX_LINKS; i++) {
        const nameKey = `links_Links_${i}_name` as keyof ParsedAppEntity
        const urlKey = `links_Links_${i}_url` as keyof ParsedAppEntity
        const linkName = applications[nameKey]
        const linkUrl = applications[urlKey]

        if (linkUrl &&
            (typeof linkName === 'string' || typeof linkName === 'number') &&
            typeof linkUrl === 'string' &&
            isSupportedMedia(linkName)) {
          const linkNameByAppMediaName = {
            Discord: 'discord' as const,
            F95zone: 'f95zone' as const,
            'Itch.io': 'itch' as const,
            Patreon: 'patreon' as const,
            Twitter: 'twitter' as const,
            Website: 'website' as const,
          }

          const applicationsMediaName = linkNameByAppMediaName[linkName]

          media[applicationsMediaName] = linkUrl
        }
      }

      // Result

      return {
        cover,
        media,
        tags,
        likes,
        name,
        views,
        rating,
        settings
      }
    })
}

export default mapParsedAppEntitiesToAppEntities
