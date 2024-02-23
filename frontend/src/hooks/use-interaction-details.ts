import { useParams } from "react-router-dom";
import { useUser } from "@/hooks/use-user";
import { useMemo } from "react";

export function useInteractionDetails(cardId: String, cardType: String, latitude: Number, longitude: Number) {
    const user = useUser();
    const userId = useMemo(() => user ? user.uid : null, [user]);
    const trailId = useParams().id;

    const geometry = useMemo(() => ({
        type: "Point",
        coordinates: [latitude, longitude]
    }), [latitude, longitude]);

    const interactionDetails = useMemo(() => ({
        userId,
        trailId,
        cardId,
        cardType,
        geometry
    }), [userId, trailId, cardId, cardType, geometry]);

    return interactionDetails;
}
