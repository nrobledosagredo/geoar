import { InfoCard } from "@/types/infocard"
import { Trail } from "@/types/trail"

export interface TrailWithInfoCards extends Omit<Trail, "infoCards"> {
  infoCards: InfoCard[]
}
