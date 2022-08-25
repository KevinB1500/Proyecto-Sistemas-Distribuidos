import { Cancha } from "./cancha";
import { Cuenta } from "./cuenta";

export interface Like {
  id: string;
  fecha: Date;
  cuenta: Cuenta;
  cancha: Cancha;
}