module Drag exposing (Drag, init, start, move, stop, status)


type Drag
    = Drag
        (Maybe
            { id : String
            , x0 : Int
            , y0 : Int
            , xd : Int
            , yd : Int
            }
        )


init : Drag
init =
    Drag Nothing


start : String -> Int -> Int -> Drag
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


move : Int -> Int -> Drag -> Drag
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


status : Drag -> Maybe ( String, ( Int, Int ) )
status (Drag drag) =
    drag
        |> Maybe.map (\d -> ( d.id, ( d.xd - d.x0, d.yd - d.y0 ) ))
