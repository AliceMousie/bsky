/* eslint-disable bsky-internal/avoid-unwrapped-text */
import {useState} from 'react'

import {atoms as a} from '#/alf'
import {Button, ButtonText} from '#/components/Button'

export function ColorPickerSlider({
  satLuma,
  value,
  onChange,
}: {
  satLuma: string
  value: number
  onChange: Function
}) {
  const [sliderValue, setSliderValue] = useState(value)
  const pickerId = 'colorPickerSlider' + satLuma.replace(/[^\d]/g, '')
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
      }}>
      <input
        id={pickerId}
        value={sliderValue}
        onChange={e => setSliderValue(parseInt(e.target.value))}
        style={{
          width: '100%',
          marginRight: '0.5rem',
          height: '0.35rem',
        }}
        type="range"
        min="0"
        max="359"
        step="1"
      />
      <Button
        label="Apply"
        testID="applyColorButton"
        variant="solid"
        color="primary"
        size="small"
        style={[a.rounded_full]}
        onPress={() => onChange(sliderValue)}>
        <ButtonText>Apply</ButtonText>
      </Button>
      <style>
        {`
		#${pickerId} {
			-webkit-appearance: none;
		}
		#${pickerId}::-webkit-slider-runnable-track {
			background: linear-gradient(90deg, ${Array.from(Array(12))
        .map((_, i) => 'hsl(' + i * 30 + ', ' + satLuma + ')')
        .join(', ')}, hsl(359, ${satLuma})); 
		height: 0.35rem;
		border-radius: 0.175rem;
		}
		#${pickerId}::-webkit-slider-thumb {
			-webkit-appearance: none;
			appearance: none;
			background: hsl(${sliderValue}, ${satLuma}) !important;
			border: 1px solid white;
			margin-top: -4px;
		}
		#${pickerId}::-moz-range-track{ 
			background: linear-gradient(90deg, ${Array.from(Array(12))
        .map((_, i) => 'hsl(' + i * 30 + ', ' + satLuma + ')')
        .join(', ')}, hsl(359, ${satLuma})); 
			block-size: 0.3rem;
			border-radius: 0.175rem;
		}
		#${pickerId}::-moz-range-progress {display: none;} 
		#${pickerId}::-moz-range-thumb {
			background-color: hsl(${sliderValue}, ${satLuma});
			border: 1px solid white;
		} `}
      </style>
    </div>
  )
}
