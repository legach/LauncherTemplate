export const toVisibleTags = (
  tags: string[],
  maxVisibleTags: number,
  moreTagLabel: string,
): string[] => {
  return tags.slice(0, maxVisibleTags).reduce<string[]>((acc, tag, index, initialArray) => {
    if (index === initialArray.length - 1 && tags.length > maxVisibleTags) {
      return [...acc, tag, moreTagLabel]
    }
    return [...acc, tag]
  }, [])
}
