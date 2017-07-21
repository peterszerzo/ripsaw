module Drag exposing (Drag, start, move, stop, diff)


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


diff : Drag -> Maybe ( Int, Int )
diff (Drag drag) =
    drag
        |> Maybe.map (\d -> ( d.xd - d.x0, d.yd - d.y0 ))


id : Drag -> Maybe String
id (Drag drag) =
    Maybe.map .id drag
