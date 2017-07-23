module Handle
    exposing
        ( Handle
        , ControlPointLocation(..)
        , handle
        , left
        , center
        , right
        , moveLeft
        , moveCenter
        , moveRight
        , decouple
        , couple
        )

{-| This module models a single control handle of a spline shape.

# Types
@docs Handle, ControlPointLocation

# The constructor
@docs handle

# Accessors
@docs left, center, right

# Update methods
@docs moveLeft, moveCenter, moveRight, decouple, couple
-}

import Types exposing (..)


{-| When a handle is coupled, the left and right control points move together, preserving smoothness at the handle's center. When they're not coupled, they can move independently.
-}
type Coupling
    = Coupled
    | Decoupled


{-| Control handle data structure.
-}
type Handle
    = Handle
        { left : Maybe RawPoint2d
        , center : RawPoint2d
        , right : Maybe RawPoint2d
        , coupling : Coupling
        }


{-| Specifies whether the control point is left, center or right on a control handle.
-}
type ControlPointLocation
    = Left
    | Center
    | Right


{-| Create a handle.
-}
handle : Maybe RawPoint2d -> RawPoint2d -> Maybe RawPoint2d -> Handle
handle left center right =
    Handle
        { left = left
        , center = center
        , right = right
        , coupling = Coupled
        }


{-| Get the left control point, which may not be present.
-}
left : Handle -> Maybe RawPoint2d
left (Handle h) =
    h.left


{-| Get the center control point.
-}
center : Handle -> RawPoint2d
center (Handle h) =
    h.center


{-| Get the right control point, which may not be present.
-}
right : Handle -> Maybe RawPoint2d
right (Handle h) =
    h.right


{-| Move the left control point, if exists. Depending on the coupling, this will move the right one as well.
-}
moveLeft : RawPoint2d -> Handle -> Handle
moveLeft ( diffX, diffY ) (Handle handle) =
    Handle
        { handle
            | left = handle.left |> Maybe.map (\( x, y ) -> ( x + diffX, y + diffY ))
            , right = handle.right |> Maybe.map (\( x, y ) -> ( x - diffX, y - diffY ))
        }


{-| Move the center control point. This will move left and right points by the same amount as well, in case they exist.
-}
moveCenter : RawPoint2d -> Handle -> Handle
moveCenter ( diffX, diffY ) (Handle handle) =
    Handle
        { handle
            | left = handle.left |> Maybe.map (\( x, y ) -> ( x + diffX, y + diffY ))
            , center = handle.center |> (\( x, y ) -> ( x + diffX, y + diffY ))
            , right = handle.right |> Maybe.map (\( x, y ) -> ( x + diffX, y + diffY ))
        }


{-| Move the right control point, if exists. Depending on the coupling, this will move the left one as well.
-}
moveRight : RawPoint2d -> Handle -> Handle
moveRight ( diffX, diffY ) (Handle handle) =
    -- TODO: account for coupling
    Handle
        { handle
            | right = handle.right |> Maybe.map (\( x, y ) -> ( x + diffX, y + diffY ))
            , left = handle.left |> Maybe.map (\( x, y ) -> ( x - diffX, y - diffY ))
        }


{-| Couple left and right control points so they move together.
-}
decouple : Handle -> Handle
decouple (Handle h) =
    Handle { h | coupling = Decoupled }


{-| Decouple left and right control points so they move separately.
-}
couple : Handle -> Handle
couple (Handle h) =
    Handle { h | coupling = Coupled }
