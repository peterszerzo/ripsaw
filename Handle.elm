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



-- Factory


handle : Maybe Point -> Point -> Maybe Point -> Handle
handle left center right =
    Handle
        { left = left
        , center = center
        , right = right
        , coupling = Coupled
        }



-- Accessors


left : Handle -> Maybe Point
left (Handle h) =
    h.left


center : Handle -> Point
center (Handle h) =
    h.center


right : Handle -> Maybe Point
right (Handle h) =
    h.left



-- Operations


moveLeft : Point -> Handle -> Handle
moveLeft diff handle =
    -- TODO: finish
    handle


moveCenter : Point -> Handle -> Handle
moveCenter diff (Handle handle) =
    -- TODO: finish
    Handle handle


moveRight : Point -> Handle -> Handle
moveRight diff (Handle handle) =
    -- TODO: finish
    Handle handle


decouple : Handle -> Handle
decouple (Handle h) =
    Handle { h | coupling = Decoupled }


couple : Handle -> Handle
couple (Handle h) =
    Handle { h | coupling = Coupled }
