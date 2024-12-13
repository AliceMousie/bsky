import React, {useCallback} from 'react'
import Animated, {
  FadeInUp,
  FadeOutUp,
  LayoutAnimationConfig,
  LinearTransition,
} from 'react-native-reanimated'
import {msg, Trans} from '@lingui/macro'
import {useLingui} from '@lingui/react'

import {DISCOVER_DEBUG_DIDS} from '#/lib/constants'
import {CommonNavigatorParams, NativeStackScreenProps} from '#/lib/routes/types'
import {isNative} from '#/platform/detection'
import {useSession} from '#/state/session'
import {useSetThemePrefs, useThemePrefs} from '#/state/shell'
import {SettingsListItem as AppIconSettingsListItem} from '#/screens/Settings/AppIconSettings/SettingsListItem'
import {atoms as a, native, useAlf, useTheme} from '#/alf'
import * as ToggleButton from '#/components/forms/ToggleButton'
import {ColorPalette_Stroke2_Corner0_Rounded as Pal} from '#/components/icons/ColorPalette'
import {Props as SVGIconProps} from '#/components/icons/common'
import {Moon_Stroke2_Corner0_Rounded as MoonIcon} from '#/components/icons/Moon'
import {Phone_Stroke2_Corner0_Rounded as PhoneIcon} from '#/components/icons/Phone'
import {TextSize_Stroke2_Corner0_Rounded as TextSize} from '#/components/icons/TextSize'
import {TitleCase_Stroke2_Corner0_Rounded as Aa} from '#/components/icons/TitleCase'
import * as Layout from '#/components/Layout'
import {Text} from '#/components/Typography'
import * as SettingsList from './components/SettingsList'

type Props = NativeStackScreenProps<CommonNavigatorParams, 'AppearanceSettings'>
export function AppearanceSettingsScreen({}: Props) {
  const {_} = useLingui()
  const {fonts} = useAlf()

  const {colorMode, darkTheme, primaryColorHue, contrastColorHue} =
    useThemePrefs()
  const {setColorMode, setDarkTheme, setPrimaryColorHue, setContrastColorHue} =
    useSetThemePrefs()

  const onChangeAppearance = useCallback(
    (keys: string[]) => {
      const appearance = keys.find(key => key !== colorMode) as
        | 'system'
        | 'light'
        | 'dark'
        | undefined
      if (!appearance) return
      setColorMode(appearance)
    },
    [setColorMode, colorMode],
  )

  const onChangeDarkTheme = useCallback(
    (keys: string[]) => {
      const theme = keys.find(key => key !== darkTheme) as
        | 'dim'
        | 'dark'
        | undefined
      if (!theme) return
      setDarkTheme(theme)
    },
    [setDarkTheme, darkTheme],
  )

  const onChangeFontFamily = useCallback(
    (values: string[]) => {
      const next = values[0] === 'system' ? 'system' : 'theme'
      fonts.setFontFamily(next)
    },
    [fonts],
  )

  const onChangeFontScale = useCallback(
    (values: string[]) => {
      const next = values[0] || ('0' as any)
      fonts.setFontScale(next)
    },
    [fonts],
  )

  const {currentAccount} = useSession()

  return (
    <LayoutAnimationConfig skipExiting skipEntering>
      <Layout.Screen testID="preferencesThreadsScreen">
        <Layout.Header.Outer>
          <Layout.Header.BackButton />
          <Layout.Header.Content>
            <Layout.Header.TitleText>
              <Trans>Appearance</Trans>
            </Layout.Header.TitleText>
          </Layout.Header.Content>
          <Layout.Header.Slot />
        </Layout.Header.Outer>
        <Layout.Content>
          <SettingsList.Container>
            <AppearanceToggleButtonGroup
              title={_(msg`Color mode`)}
              icon={PhoneIcon}
              items={[
                {
                  label: _(msg`System`),
                  name: 'system',
                },
                {
                  label: _(msg`Light`),
                  name: 'light',
                },
                {
                  label: _(msg`Dark`),
                  name: 'dark',
                },
              ]}
              values={[colorMode]}
              onChange={onChangeAppearance}
            />

            {colorMode !== 'light' && (
              <Animated.View
                entering={native(FadeInUp)}
                exiting={native(FadeOutUp)}>
                <AppearanceToggleButtonGroup
                  title={_(msg`Dark theme`)}
                  icon={MoonIcon}
                  items={[
                    {
                      label: _(msg`Dim`),
                      name: 'dim',
                    },
                    {
                      label: _(msg`Dark`),
                      name: 'dark',
                    },
                  ]}
                  values={[darkTheme ?? 'dim']}
                  onChange={onChangeDarkTheme}
                />
              </Animated.View>
            )}

            <SettingsList.Group
              contentContainerStyle={[a.gap_sm]}
              iconInset={false}>
              <SettingsList.ItemIcon icon={Pal} />
              <SettingsList.ItemText>Custom Colors!</SettingsList.ItemText>
              <Text style={[a.leading_snug]}>Primary Color</Text>
              <input
                type="color"
                value={rgbFromSettings(primaryColorHue, 0.99, 0.53)}
                onChange={e => setPrimaryColorHue(updateHue(e.target.value))}
              />
              <Text style={[a.leading_snug]}>Secondary Color</Text>
              <input
                type="color"
                value={rgbFromSettings(contrastColorHue, 0.2, 0.5)}
                onChange={e => setContrastColorHue(updateHue(e.target.value))}
              />
            </SettingsList.Group>

            <Animated.View layout={native(LinearTransition)}>
              <SettingsList.Divider />

              <AppearanceToggleButtonGroup
                title={_(msg`Font`)}
                description={_(
                  msg`For the best experience, we recommend using the theme font.`,
                )}
                icon={Aa}
                items={[
                  {
                    label: _(msg`System`),
                    name: 'system',
                  },
                  {
                    label: _(msg`Theme`),
                    name: 'theme',
                  },
                ]}
                values={[fonts.family]}
                onChange={onChangeFontFamily}
              />

              <AppearanceToggleButtonGroup
                title={_(msg`Font size`)}
                icon={TextSize}
                items={[
                  {
                    label: _(msg`Smaller`),
                    name: '-1',
                  },
                  {
                    label: _(msg`Default`),
                    name: '0',
                  },
                  {
                    label: _(msg`Larger`),
                    name: '1',
                  },
                ]}
                values={[fonts.scale]}
                onChange={onChangeFontScale}
              />

              {isNative && DISCOVER_DEBUG_DIDS[currentAccount?.did ?? ''] && (
                <>
                  <SettingsList.Divider />
                  <AppIconSettingsListItem />
                </>
              )}
            </Animated.View>
          </SettingsList.Container>
        </Layout.Content>
      </Layout.Screen>
    </LayoutAnimationConfig>
  )
}

export function AppearanceToggleButtonGroup({
  title,
  description,
  icon: Icon,
  items,
  values,
  onChange,
}: {
  title: string
  description?: string
  icon: React.ComponentType<SVGIconProps>
  items: {
    label: string
    name: string
  }[]
  values: string[]
  onChange: (values: string[]) => void
}) {
  const t = useTheme()
  return (
    <>
      <SettingsList.Group contentContainerStyle={[a.gap_sm]} iconInset={false}>
        <SettingsList.ItemIcon icon={Icon} />
        <SettingsList.ItemText>{title}</SettingsList.ItemText>
        {description && (
          <Text
            style={[
              a.text_sm,
              a.leading_snug,
              t.atoms.text_contrast_medium,
              a.w_full,
            ]}>
            {description}
          </Text>
        )}
        <ToggleButton.Group label={title} values={values} onChange={onChange}>
          {items.map(item => (
            <ToggleButton.Button
              key={item.name}
              label={item.label}
              name={item.name}>
              <ToggleButton.ButtonText>{item.label}</ToggleButton.ButtonText>
            </ToggleButton.Button>
          ))}
        </ToggleButton.Group>
      </SettingsList.Group>
    </>
  )
}

function updateHue(hex: string) {
  return Math.floor(hexToHsl(hex)[0] * 360).toString()
}

function rgbFromSettings(h: string, s: number, l: number) {
  let h_num = parseInt(h) / 360
  return rgbToHex(hslToRgb(h_num, s, l))
}

function rgbToHex(colors: number[]) {
  let h = colors[0] << 16
  h += colors[1] << 8
  h += colors[2]
  return `#${h.toString(16)}`
}

function hexToHsl(hex: string) {
  let r = '0x' + hex.slice(1, 3)
  let g = '0x' + hex.slice(3, 5)
  let b = '0x' + hex.slice(5)
  return rgbToHsl([parseInt(r), parseInt(g), parseInt(b)])
}

function hslToRgb(h: number, s: number, l: number) {
  let r, g, b

  if (s === 0) {
    r = g = b = l // achromatic
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    r = hueToRgb(p, q, h + 1 / 3)
    g = hueToRgb(p, q, h)
    b = hueToRgb(p, q, h - 1 / 3)
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)]
}

function hueToRgb(p: number, q: number, t: number) {
  if (t < 0) t += 1
  if (t > 1) t -= 1
  if (t < 1 / 6) return p + (q - p) * 6 * t
  if (t < 1 / 2) return q
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
  return p
}

function rgbToHsl(colors: number[]) {
  let [r, g, b] = colors
  ;(r /= 255), (g /= 255), (b /= 255)
  const vmax = Math.max(r, g, b),
    vmin = Math.min(r, g, b)
  let h = (vmax + vmin) / 2
  let s = (vmax + vmin) / 2
  let l = (vmax + vmin) / 2

  if (vmax === vmin) {
    return [0, 0, l] // achromatic
  }

  const d = vmax - vmin
  s = l > 0.5 ? d / (2 - vmax - vmin) : d / (vmax + vmin)
  if (vmax === r) h = (g - b) / d + (g < b ? 6 : 0)
  if (vmax === g) h = (b - r) / d + 2
  if (vmax === b) h = (r - g) / d + 4
  h /= 6

  return [h, s, l]
}
