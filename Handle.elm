module Handle
    exposing
        ( Handle
        , handle
        , updateLeft
        , updateCenter
        , updateRight
        , decouple
        , couple
        )


type Coupling
    = Coupled
    | Decoupled


type alias Point =
    ( Float, Float )


type Handle
    = Handle
        { left : Maybe Point
        , center : Point
        , right : Maybe Point
        , coupling : Coupling
        }


handle : Maybe Point -> Point -> Maybe Point -> Handle
handle left center right =
    Handle
        { left = left
        , center = center
        , right = right
        , coupling = Coupled
        }


updateLeft : Point -> Handle -> Handle
updateLeft diff handle =
    -- TODO: finish
    handle


updateCenter : Point -> Handle -> Handle
updateCenter diff handle =
    -- TODO: finish
    handle


updateRight : Point -> Handle -> Handle
updateRight diff handle =
    -- TODO: finish
    handle


decouple : Handle -> Handle
decouple (Handle h) =
    Handle { h | coupling = Decoupled }


couple : Handle -> Handle
couple (Handle h) =
    Handle { h | coupling = Coupled }
