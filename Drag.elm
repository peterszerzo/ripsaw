module Drag
    exposing
        ( Drag
        , init
        , start
        , move
        , stop
        , state
        )


type Drag
    = Drag
        (Maybe
            { id : String
            , x0 : Float
            , y0 : Float
            , xd : Float
            , yd : Float
            }
        )


init : Drag
init =
    Drag Nothing


start : String -> Float -> Float -> Drag
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


move : Float -> Float -> Drag -> Drag
move xm ym (Drag drag) =
    case drag of
        Just dg ->
            Drag
                (Just { dg | xd = xm, yd = ym })

        Nothing ->
            Drag drag


stop : String -> Drag -> Drag
stop id (Drag drag) =
    Drag Nothing


state : Drag -> Maybe ( String, ( Float, Float ) )
state (Drag drag) =
    drag
        |> Maybe.map (\d -> ( d.id, ( d.xd - d.x0, d.yd - d.y0 ) ))
