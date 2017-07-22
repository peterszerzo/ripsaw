module Handle
    exposing
        ( Handle
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

import Types exposing (..)


{-| When a handle is coupled, the left and right control points move together, preserving smoothness at the handle's center. When they're not coupled, they can move independently.
-}
type Coupling
    = Coupled
    | Decoupled


type Handle
    = Handle
        { left : Maybe RawPoint2d
        , center : RawPoint2d
        , right : Maybe RawPoint2d
        , coupling : Coupling
        }



-- Factory


handle : Maybe RawPoint2d -> RawPoint2d -> Maybe RawPoint2d -> Handle
handle left center right =
    Handle
        { left = left
        , center = center
        , right = right
        , coupling = Coupled
        }



-- Accessors


left : Handle -> Maybe RawPoint2d
left (Handle h) =
    h.left


center : Handle -> RawPoint2d
center (Handle h) =
    h.center


right : Handle -> Maybe RawPoint2d
right (Handle h) =
    h.left



-- Operations


moveLeft : RawPoint2d -> Handle -> Handle
moveLeft ( diffX, diffY ) (Handle handle) =
    -- TODO: account for coupling
    Handle
        { handle
            | left = handle.left |> Maybe.map (\( x, y ) -> ( x + diffX, y + diffY ))
        }


moveCenter : RawPoint2d -> Handle -> Handle
moveCenter ( diffX, diffY ) (Handle handle) =
    Handle
        { handle
            | left = handle.left |> Maybe.map (\( x, y ) -> ( x + diffX, y + diffY ))
            , center = handle.center |> (\( x, y ) -> ( x + diffX, y + diffY ))
            , right = handle.right |> Maybe.map (\( x, y ) -> ( x + diffX, y + diffY ))
        }


moveRight : RawPoint2d -> Handle -> Handle
moveRight ( diffX, diffY ) (Handle handle) =
    -- TODO: account for coupling
    Handle
        { handle
            | right = handle.right |> Maybe.map (\( x, y ) -> ( x + diffX, y + diffY ))
        }


decouple : Handle -> Handle
decouple (Handle h) =
    Handle { h | coupling = Decoupled }


couple : Handle -> Handle
couple (Handle h) =
    Handle { h | coupling = Coupled }
