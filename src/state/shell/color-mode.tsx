import React from 'react'

import * as persisted from '#/state/persisted'

type StateContext = {
  colorMode: persisted.Schema['colorMode']
  darkTheme: persisted.Schema['darkTheme']
  primaryColorHue: persisted.Schema['primaryColorHue']
  contrastColorHue: persisted.Schema['contrastColorHue']
}
type SetContext = {
  setColorMode: (v: persisted.Schema['colorMode']) => void
  setDarkTheme: (v: persisted.Schema['darkTheme']) => void
  setPrimaryColorHue: (v: persisted.Schema['primaryColorHue']) => void
  setContrastColorHue: (v: persisted.Schema['contrastColorHue']) => void
}

const stateContext = React.createContext<StateContext>({
  colorMode: 'system',
  darkTheme: 'dark',
  primaryColorHue: '211',
  contrastColorHue: '211',
})
const setContext = React.createContext<SetContext>({} as SetContext)

export function Provider({children}: React.PropsWithChildren<{}>) {
  const [colorMode, setColorMode] = React.useState(persisted.get('colorMode'))
  const [darkTheme, setDarkTheme] = React.useState(persisted.get('darkTheme'))
  const [primaryColorHue, setPrimaryColorHue] = React.useState(
    persisted.get('primaryColorHue'),
  )
  const [contrastColorHue, setContrastColorHue] = React.useState(
    persisted.get('contrastColorHue'),
  )

  const stateContextValue = React.useMemo(
    () => ({
      colorMode,
      darkTheme,
      primaryColorHue,
      contrastColorHue,
    }),
    [colorMode, darkTheme, primaryColorHue, contrastColorHue],
  )

  const setContextValue = React.useMemo(
    () => ({
      setColorMode: (_colorMode: persisted.Schema['colorMode']) => {
        setColorMode(_colorMode)
        persisted.write('colorMode', _colorMode)
      },
      setDarkTheme: (_darkTheme: persisted.Schema['darkTheme']) => {
        setDarkTheme(_darkTheme)
        persisted.write('darkTheme', _darkTheme)
      },
      setPrimaryColorHue: (
        _primaryColorHue: persisted.Schema['primaryColorHue'],
      ) => {
        setPrimaryColorHue(_primaryColorHue)
        persisted.write('primaryColorHue', _primaryColorHue)
      },
      setContrastColorHue: (
        _contrastColorHue: persisted.Schema['contrastColorHue'],
      ) => {
        setContrastColorHue(_contrastColorHue)
        persisted.write('contrastColorHue', _contrastColorHue)
      },
    }),
    [],
  )

  React.useEffect(() => {
    const unsub1 = persisted.onUpdate('darkTheme', nextDarkTheme => {
      setDarkTheme(nextDarkTheme)
    })
    const unsub2 = persisted.onUpdate('colorMode', nextColorMode => {
      setColorMode(nextColorMode)
    })
    const unsub3 = persisted.onUpdate(
      'primaryColorHue',
      nextPrimaryColorHue => {
        setPrimaryColorHue(nextPrimaryColorHue)
      },
    )
    const unsub4 = persisted.onUpdate(
      'contrastColorHue',
      nextContrastColorHue => {
        setContrastColorHue(nextContrastColorHue)
      },
    )
    return () => {
      unsub1()
      unsub2()
      unsub3()
      unsub4()
    }
  }, [])

  return (
    <stateContext.Provider value={stateContextValue}>
      <setContext.Provider value={setContextValue}>
        {children}
      </setContext.Provider>
    </stateContext.Provider>
  )
}

export function useThemePrefs() {
  return React.useContext(stateContext)
}

export function useSetThemePrefs() {
  return React.useContext(setContext)
}
