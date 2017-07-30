module Utils exposing (closedLinkedMap, toPx)

{-| Utility methods.

# List
@docs closedLinkedMap, toPx
-}


{-| Map over a list with a mapping function that takes subsequent elements of a list as its arguments, running [ fn first second, fn second third, ..., fn last first ].

    closedLinkedMap (\a b -> a ++ " -> " ++ b) [ "first", "second", "third" ] ==
      [ "first -> second", "second -> third", "third -> first" ]
-}
closedLinkedMap : (a -> a -> b) -> List a -> List b
closedLinkedMap fn list =
    case list of
        [] ->
            []

        first :: rest ->
            closedLinkedMapHelper fn first list


{-| Helper method to closedLinkedMap, keeping track of the first element in the original array, regardless of the recursion step.
-}
closedLinkedMapHelper : (a -> a -> b) -> a -> List a -> List b
closedLinkedMapHelper fn veryFirst list =
    case list of
        [] ->
            []

        first :: rest ->
            case rest of
                [] ->
                    [ fn first veryFirst ]

                second :: rest_ ->
                    [ fn first second ] ++ (closedLinkedMapHelper fn veryFirst rest)


{-| Converts a floating point value to a pixel value.
-}
toPx : Float -> String
toPx =
    floor >> toString >> (\s -> s ++ "px")
