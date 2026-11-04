import React from 'react'
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native'
import {AppBskyEmbedImages} from '@atproto/api'

import {HandleRef, useHandleRef} from '#/lib/hooks/useHandleRef'
import {PostEmbedViewContext} from '#/view/com/util/post-embeds/types'
import {atoms as a, useBreakpoints} from '#/alf'
import {Dimensions} from '../../lightbox/ImageViewing/@types'
import {GalleryItem} from './Gallery'

interface ImageLayoutGridProps {
  images: AppBskyEmbedImages.ViewImage[]
  onPress?: (
    index: number,
    containerRefs: HandleRef[],
    fetchedDims: (Dimensions | null)[],
  ) => void
  onLongPress?: (index: number) => void
  onPressIn?: (index: number) => void
  style?: StyleProp<ViewStyle>
  viewContext?: PostEmbedViewContext
}

export function ImageLayoutGrid({style, ...props}: ImageLayoutGridProps) {
  const {gtMobile} = useBreakpoints()
  const gap =
    props.viewContext === PostEmbedViewContext.FeedEmbedRecordWithMedia
      ? gtMobile
        ? a.gap_xs
        : a.gap_2xs
      : a.gap_xs

  return (
    <View style={style}>
      <View style={[gap, a.rounded_md, a.overflow_hidden]}>
        <ImageLayoutGridInner {...props} gap={gap} />
      </View>
    </View>
  )
}

interface ImageLayoutGridInnerProps {
  images: AppBskyEmbedImages.ViewImage[]
  onPress?: (
    index: number,
    containerRefs: HandleRef[],
    fetchedDims: (Dimensions | null)[],
  ) => void
  onLongPress?: (index: number) => void
  onPressIn?: (index: number) => void
  viewContext?: PostEmbedViewContext
  gap: {gap: number}
}

function ImageLayoutGridInner(props: ImageLayoutGridInnerProps) {
  const gap = props.gap
  const count = props.images.length

  const containerRef1 = useHandleRef()
  const containerRef2 = useHandleRef()
  const containerRef3 = useHandleRef()
  const containerRef4 = useHandleRef()
  const containerRef5 = useHandleRef()
  const containerRef6 = useHandleRef()
  const containerRef7 = useHandleRef()
  const containerRef8 = useHandleRef()
  const containerRef9 = useHandleRef()
  const containerRef10 = useHandleRef()
  const thumbDimsRef = React.useRef<(Dimensions | null)[]>([])

  switch (count) {
    case 2: {
      const containerRefs = [containerRef1, containerRef2]
      return (
        <View style={[a.flex_1, a.flex_row, gap]}>
          <View style={[a.flex_1, {aspectRatio: 1}]}>
            <GalleryItem
              {...props}
              index={0}
              insetBorderStyle={noCorners(['topRight', 'bottomRight'])}
              containerRefs={containerRefs}
              thumbDimsRef={thumbDimsRef}
            />
          </View>
          <View style={[a.flex_1, {aspectRatio: 1}]}>
            <GalleryItem
              {...props}
              index={1}
              insetBorderStyle={noCorners(['topLeft', 'bottomLeft'])}
              containerRefs={containerRefs}
              thumbDimsRef={thumbDimsRef}
            />
          </View>
        </View>
      )
    }

    case 3: {
      const containerRefs = [containerRef1, containerRef2, containerRef3]
      return (
        <View style={[a.flex_1, a.flex_row, gap]}>
          <View style={[a.flex_1, {aspectRatio: 1}]}>
            <GalleryItem
              {...props}
              index={0}
              insetBorderStyle={noCorners(['topRight', 'bottomRight'])}
              containerRefs={containerRefs}
              thumbDimsRef={thumbDimsRef}
            />
          </View>
          <View style={[a.flex_1, {aspectRatio: 1}, gap]}>
            <View style={[a.flex_1]}>
              <GalleryItem
                {...props}
                index={1}
                insetBorderStyle={noCorners([
                  'topLeft',
                  'bottomLeft',
                  'bottomRight',
                ])}
                containerRefs={containerRefs}
                thumbDimsRef={thumbDimsRef}
              />
            </View>
            <View style={[a.flex_1]}>
              <GalleryItem
                {...props}
                index={2}
                insetBorderStyle={noCorners([
                  'topLeft',
                  'bottomLeft',
                  'topRight',
                ])}
                containerRefs={containerRefs}
                thumbDimsRef={thumbDimsRef}
              />
            </View>
          </View>
        </View>
      )
    }

    case 4: {
      const containerRefs = [
        containerRef1,
        containerRef2,
        containerRef3,
        containerRef4,
      ]
      return (
        <>
          <View style={[a.flex_row, gap]}>
            <View style={[a.flex_1, {aspectRatio: 1.5}]}>
              <GalleryItem
                {...props}
                index={0}
                insetBorderStyle={noCorners([
                  'bottomLeft',
                  'topRight',
                  'bottomRight',
                ])}
                containerRefs={containerRefs}
                thumbDimsRef={thumbDimsRef}
              />
            </View>
            <View style={[a.flex_1, {aspectRatio: 1.5}]}>
              <GalleryItem
                {...props}
                index={1}
                insetBorderStyle={noCorners([
                  'topLeft',
                  'bottomLeft',
                  'bottomRight',
                ])}
                containerRefs={containerRefs}
                thumbDimsRef={thumbDimsRef}
              />
            </View>
          </View>
          <View style={[a.flex_row, gap]}>
            <View style={[a.flex_1, {aspectRatio: 1.5}]}>
              <GalleryItem
                {...props}
                index={2}
                insetBorderStyle={noCorners([
                  'topLeft',
                  'topRight',
                  'bottomRight',
                ])}
                containerRefs={containerRefs}
                thumbDimsRef={thumbDimsRef}
              />
            </View>
            <View style={[a.flex_1, {aspectRatio: 1.5}]}>
              <GalleryItem
                {...props}
                index={3}
                insetBorderStyle={noCorners([
                  'topLeft',
                  'bottomLeft',
                  'topRight',
                ])}
                containerRefs={containerRefs}
                thumbDimsRef={thumbDimsRef}
              />
            </View>
          </View>
        </>
      )
    }

    case 0:
      return null

    default: {
      const containerRefs = [
        containerRef1,
        containerRef2,
        containerRef3,
        containerRef4,
        containerRef5,
        containerRef6,
        containerRef7,
        containerRef8,
        containerRef9,
        containerRef10,
      ]
      return (
        <>
          <View style={[{flexDirection: 'row', flexWrap: 'wrap'}]}>
            {props.images.map((_img, i) => (
              <View
                style={[{width: 'calc(50% - 3px)', padding: '3px'} as any]}
                key={'image_' + i}>
                <GalleryItem
                  {...props}
                  index={i}
                  insetBorderStyle={noCorners([])}
                  containerRefs={containerRefs}
                  thumbDimsRef={thumbDimsRef}
                />
              </View>
            ))}
          </View>
        </>
      )
    }
  }
}

function noCorners(
  corners: ('topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight')[],
) {
  const styles: StyleProp<ViewStyle>[] = []
  if (corners.includes('topLeft')) {
    styles.push({borderTopLeftRadius: 0})
  }
  if (corners.includes('topRight')) {
    styles.push({borderTopRightRadius: 0})
  }
  if (corners.includes('bottomLeft')) {
    styles.push({borderBottomLeftRadius: 0})
  }
  if (corners.includes('bottomRight')) {
    styles.push({borderBottomRightRadius: 0})
  }
  return StyleSheet.flatten(styles)
}
