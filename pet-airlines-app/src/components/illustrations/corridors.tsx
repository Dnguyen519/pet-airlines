import { CorridorScene } from './CorridorScene'
import { Hanoi, HoChiMinhCity, NewYork, Paris, Seoul, Sydney, Toronto } from './landmarks'
import type { IllustrationProps } from './tokens'

// One illustration per corridor in POPULAR_ROUTES. Each is the shared
// CorridorScene frame with the origin and destination silhouettes swapped in.

export function CorridorCanadaVietnam({
  className,
  title,
  titleId = 'illus-corridor-ca-vn',
}: IllustrationProps) {
  return (
    <CorridorScene
      className={className}
      title={title}
      titleId={titleId}
      origin={Toronto}
      destination={Hanoi}
    />
  )
}

export function CorridorCanadaSouthKorea({
  className,
  title,
  titleId = 'illus-corridor-ca-kr',
}: IllustrationProps) {
  return (
    <CorridorScene
      className={className}
      title={title}
      titleId={titleId}
      origin={Toronto}
      destination={Seoul}
    />
  )
}

export function CorridorSouthKoreaVietnam({
  className,
  title,
  titleId = 'illus-corridor-kr-vn',
}: IllustrationProps) {
  return (
    <CorridorScene
      className={className}
      title={title}
      titleId={titleId}
      origin={Seoul}
      destination={HoChiMinhCity}
    />
  )
}

export function CorridorCanadaFrance({
  className,
  title,
  titleId = 'illus-corridor-ca-fr',
}: IllustrationProps) {
  return (
    <CorridorScene
      className={className}
      title={title}
      titleId={titleId}
      origin={Toronto}
      destination={Paris}
    />
  )
}

export function CorridorSouthKoreaFrance({
  className,
  title,
  titleId = 'illus-corridor-kr-fr',
}: IllustrationProps) {
  return (
    <CorridorScene
      className={className}
      title={title}
      titleId={titleId}
      origin={Seoul}
      destination={Paris}
    />
  )
}

export function CorridorVietnamFrance({
  className,
  title,
  titleId = 'illus-corridor-vn-fr',
}: IllustrationProps) {
  return (
    <CorridorScene
      className={className}
      title={title}
      titleId={titleId}
      origin={Hanoi}
      destination={Paris}
    />
  )
}

export function CorridorCanadaUnitedStates({
  className,
  title,
  titleId = 'illus-corridor-ca-us',
}: IllustrationProps) {
  return (
    <CorridorScene
      className={className}
      title={title}
      titleId={titleId}
      origin={Toronto}
      destination={NewYork}
    />
  )
}

export function CorridorCanadaAustralia({
  className,
  title,
  titleId = 'illus-corridor-ca-au',
}: IllustrationProps) {
  return (
    <CorridorScene
      className={className}
      title={title}
      titleId={titleId}
      origin={Toronto}
      destination={Sydney}
    />
  )
}
