module Types exposing (RawPoint2d)

{-| Types shared across the package.

# Geometry
@docs RawPoint2d
-}


{-| A transparent raw point type that's not tied to an OpenSolid constructor.
-}
type alias RawPoint2d =
    ( Float, Float )
