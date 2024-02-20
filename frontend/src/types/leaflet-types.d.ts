// types.d.ts
import "leaflet"

declare module "leaflet" {
  namespace control {
    function locate(options?: any): L.Control
  }
}
