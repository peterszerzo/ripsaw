module Shape exposing (..)

import Handle exposing (Handle, handle)


type alias Point =
    ( Float, Float )


type alias Shape =
    List Handle


shape : List ( Maybe Point, Point, Maybe Point ) -> Shape
shape handleData =
    List.map (\( left, center, right ) -> handle left center right) handleData
