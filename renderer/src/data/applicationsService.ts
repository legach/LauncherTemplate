import isElectron from 'is-electron';
import type ParsedAppEntity from 'src/domain/parsed-applications.entity'

type GetParsedAppsResponse = Record<Url, ParsedAppEntity>

export const getParsedApps = async (): Promise<GetParsedAppsResponse | undefined> => {
  let response: Response

  if (isElectron()) {
    response = await fetch('/data/applications.json') 
  } else {
    response = await fetch('/data/applications.json')
  }


  if (response.ok) {
    let json: GetParsedAppsResponse = await response.json()
    return json
  } else {
    console.log('HTTP Error: ' + response.status)
  }
}
