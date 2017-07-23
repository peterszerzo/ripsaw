module Drag
    exposing
        ( Drag
        , init
        , start
        , move
        , stop
        , state
        )

{-| This module holds on to the drag state.

# Types
@docs Drag

# Constructors
@docs init, start

# Update utilities
@docs start, move, stop

# Accessors
@docs state
-}

import Types exposing (..)


{-| This opaque data type contains the current drag state. If there is dragging, it contains the screen position where the drag began, where the cursor currently is, and which point is being dragged, specified by a [ControlPointAddress](/Shape#ControlPointAddress). The client can define any way of identifying points, hence the pointId type variable.
-}
type Drag pointId
    = Drag
        (Maybe
            { id : pointId
            , x0 : Float
            , y0 : Float
            , xd : Float
            , yd : Float
            }
        )


{-| Initialize a `Drag` data type as no drag.
-}
init : Drag pointId
init =
    Drag Nothing


{-| Start a new drag.
-}
start : pointId -> RawPoint2d -> Drag pointId
start id ( x0, y0 ) =
    Drag
        (Just
            { id = id
            , x0 = x0
            , y0 = y0
            , xd = x0
            , yd = y0
            }
        )


{-| Set a new drag position under the current drag.
-}
move : RawPoint2d -> Drag pointId -> Drag pointId
move ( xm, ym ) (Drag drag) =
    case drag of
        Just dg ->
            Drag
                (Just
                    { dg
                        | xd = xm
                        , yd = ym
                    }
                )

        Nothing ->
            Drag drag


{-| Stop the current drag.
-}
stop : pointId -> Drag pointId -> Drag pointId
stop id (Drag drag) =
    Drag Nothing


{-| Retrieve drag state.
-}
state : Drag pointId -> Maybe ( pointId, RawPoint2d )
state (Drag drag) =
    drag
        |> Maybe.map (\d -> ( d.id, ( d.xd - d.x0, d.yd - d.y0 ) ))
