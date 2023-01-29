export default interface AppEntity {
  cover: NullOr<RelativePath>
  likes: NullOr<number>
  media: {
    discord: NullOr<Url>
    f95zone: NullOr<Url>
    itch: NullOr<Url>
    patreon: NullOr<Url>
    twitter: NullOr<Url>
    website: NullOr<Url>
  },
  settings: {
    downloadLink: NullOr<string>
    executablePath: NullOr<string>
  } | null,
  name: string
  rating: NullOr<Rating>
  tags: string[]
  views: NullOr<Views>
}
