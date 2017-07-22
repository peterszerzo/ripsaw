module Drag
    exposing
        ( Drag
        , init
        , start
        , move
        , stop
        , state
        )

import Types exposing (..)


{-| The drag data type contains the current drag state. If there is dragging, it contains the screen position where the drag began, where the cursor currently is, and which point is being dragged. The client can define any way of identifying points, hence the pointId type variable.
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


init : Drag pointId
init =
    Drag Nothing


start : pointId -> Float -> Float -> Drag pointId
start id x0 y0 =
    Drag
        (Just
            { id = id
            , x0 = x0
            , y0 = y0
            , xd = x0
            , yd = y0
            }
        )


move : Float -> Float -> Drag pointId -> Drag pointId
move xm ym (Drag drag) =
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


stop : pointId -> Drag pointId -> Drag pointId
stop id (Drag drag) =
    Drag Nothing


state : Drag pointId -> Maybe ( pointId, RawPoint2d )
state (Drag drag) =
    drag
        |> Maybe.map (\d -> ( d.id, ( d.xd - d.x0, d.yd - d.y0 ) ))
