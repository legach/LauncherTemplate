import React from 'react'
import mapParsedAppEntitiesToAppEntities from 'src/mappers/map-ParsedAppEntities-to-AppEntities'

import {
  Box,
  Container,
  createTheme,
  ThemeProvider,
  useMediaQuery,
  LinearProgress,
  Typography
} from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import { getParsedApps } from 'src/data/applicationsService'
import AppEntity from 'src/domain/applications.entity'
import debounce from 'lodash.debounce'
import throttle from 'lodash.throttle'
import Apps from 'src/components/Apps'
import SearchAppInput from 'src/components/SearchAppInput/SearchAppInput'
import Logo from 'src/components/Logo/Logo'
import isElectron from 'is-electron'
import {ipcRenderer} from 'electron'

interface Props {}

export const delay = async (timeout: number) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, timeout)
  })
}

const INITIAL_APPS: AppEntity[] = Array(16).fill({
  cover: null,
  name: '',
  likes: null,
  media: {
    discord: null,
    f95zone: null,
    itch: null,
    patreon: null,
    twitter: null,
    website: null,
  },
  rating: null,
  tags: [],
  views: null,
})

const hasMoreApps = (page: number, limit: number, total: number) => {
  const startIndex = (page - 1) * limit + 1
  return total === 0 || startIndex < total
}

const OpenLauncherDownloadPopup = () => {
  console.log("Open popup");
  
}

const OpenNotFoundAppPopup = (name: string) => {
  console.log(`Not found ${name} yet :(`);
  
}

const Home: React.FC<Props> = () => {
  const [page, setPage] = React.useState(1)
  const [applications, setApps] = React.useState<AppEntity[]>(INITIAL_APPS)
  const [showLoader, setShowLoader] = React.useState<boolean>(false)
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [searchText, setSearchText] = React.useState('')
  const [currentApp, setCurrentApp] = React.useState('')

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: 'dark',
          primary: {
            main: '#2c62fc',
          },
        },
      }),
    [],
  )

  const isMedium = useMediaQuery(theme.breakpoints.down('md'))

  React.useEffect(() => {
    if (searchText) {
      imitateLoading()
    }
  }, [searchText])

  React.useEffect(() => {
    window.addEventListener(
      'scroll',
      throttle((event) => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement

        if (
          scrollTop + clientHeight >= scrollHeight - clientHeight * 2 &&
          hasMoreApps(page + 1, 100, applications.length) &&
          applications.length > 0
        ) {
          setPage((prevState) => prevState + 1)
        }
      }, 1000),
    )
  }, [applications.length, page])

  React.useEffect(() => {
    setIsLoading(true)
    fetchParsedApps(() => {
      setIsLoading(false)
    })
    if (isElectron()) {
      ipcRenderer.on('handling-start', (event, arg) => {
        console.log('handling-start ' + arg);
        setCurrentApp(arg);
        setShowLoader(true);
      })
    
      ipcRenderer.on('handling-stop', (event, arg) => {
        console.log('handling-stop ' + arg);
        setCurrentApp('');
        setShowLoader(false);
      })
    }
    
  }, [])

  const imitateLoading = async () => {
    setIsLoading(true)
    await delay(300)
    setIsLoading(false)
  }

  const fetchParsedApps = async (callback: Function) => {
    const parsedApps = await getParsedApps()
    if (parsedApps) {
      const applications = mapParsedAppEntitiesToAppEntities(parsedApps)
      setApps(applications)
    }
    callback()
  }

  let handleLaunchApp: (name: string, downloadLink: NullOr<string>, executablePath: NullOr<string>) => void
  if (isElectron()) {
    const LinkHandlerPromise = import('services/LinkHandler')
    handleLaunchApp = (name: string, downloadLink: NullOr<string>, executablePath: NullOr<string>) => {
      LinkHandlerPromise.then((linkHandlerType) => {
        const linkHandler = (linkHandlerType.default).GetInstance();
        if (downloadLink) {
          const link = {name, 
            downloadLink: downloadLink ?? '', 
            executablePath: executablePath ?? ''}
          linkHandler.Run(link)          
        } else {
          OpenNotFoundAppPopup(name);  
        }
         
      })
      
    }
  } else {
    handleLaunchApp = (name: string, downloadLink: NullOr<string>, executablePath: NullOr<string>) => {
      OpenLauncherDownloadPopup();
    }
  }
  
  let filteredApps = React.useMemo(() => {
    let previousSearchText: string
    let previousFilterResult: AppEntity[]

    let serializedSearchText = searchText.toLowerCase().trim()

    if (!serializedSearchText) {
      previousFilterResult = applications
      return previousFilterResult
    }

    const createSearchableString = (applications: AppEntity) =>
      `${applications.name.toLowerCase().trim()}, ${applications.tags.map((tag) =>
        tag.toLowerCase().trim().split(', '),
      )}`

    if (
      serializedSearchText !== '' &&
      // @ts-ignore
      previousSearchText &&
      // @ts-ignore
      previousFilterResult &&
      serializedSearchText > previousSearchText
    ) {
      previousSearchText = serializedSearchText
      previousFilterResult = applications.filter((applications: AppEntity) =>
        createSearchableString(applications).includes(previousSearchText),
      )
      return previousFilterResult
    }

    previousSearchText = ''
    previousFilterResult = applications.filter((applications: AppEntity) =>
      createSearchableString(applications).includes(serializedSearchText),
    )
    return previousFilterResult
  }, [applications, searchText])

  const handleChangeAppInput = React.useCallback(
    debounce<React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>>((event) => {
      setSearchText(event.target.value)
      setPage(1)
      window.scrollTo({ top: 0 })
    }, 500),
    [],
  )

  const renderingApps = React.useMemo(() => {
    const applicationsOnPage = filteredApps.slice(0, 100 * page)
    const skeletonApps = hasMoreApps(page + 1, 100, filteredApps.length)
      ? INITIAL_APPS.slice(0, 4)
      : []

    if (isLoading) {
      return INITIAL_APPS
    } else if (applicationsOnPage.length > 0) {
      return [...applicationsOnPage, ...skeletonApps]
    } else if (applicationsOnPage.length === 0 && searchText) {
      return filteredApps
    } else {
      return filteredApps
    }
  }, [filteredApps, isLoading, page, searchText])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box display={'flex'} flexDirection={'column'} sx={{ flex: 1 }}>
        <Container
          component={'header'}
          sx={{
            position: 'fixed',
            zIndex: 1000,
            backgroundColor: '#121212bd',
            top: 0,
            right: 0,
            left: 0,
            backdropFilter: 'blur(4px)',
            height: '80px',
          }}>
          <Box height={80} pt={0.5} sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <Box
              display={'flex'}
              alignItems={'center'}
              mr={isMedium ? 1 : 4}
              position={'relative'}
              sx={{ height: '100%' }}>
              <Logo />
            </Box>
            <SearchAppInput isLoading={isLoading} onChange={handleChangeAppInput} />
          </Box>
        </Container>
        <Box pb={4}>
          <Apps data={renderingApps} onAppLaunch={handleLaunchApp}/>
        </Box>
        <Box sx={{ 
          width: '100%',
          position: 'fixed',
          zIndex: 1005,
          backgroundColor: '#121212bd',
          bottom: 0,
          right: 0,
          left: 0,
          backdropFilter: 'blur(4px)',
          height: '40px',
          }} visibility={showLoader ? 'visible' : 'hidden'}>
            <Typography variant={'body2'} fontStyle={'italic'} margin={'2px'}>
              {`Download and install ${currentApp}`}
            </Typography>
            <LinearProgress sx={{height: '10px'}}/>
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default Home
