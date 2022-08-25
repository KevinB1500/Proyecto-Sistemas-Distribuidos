import { Cancha } from "./cancha";
import { Cuenta } from "./cuenta";

export interface Comentario {
  id: string;
  fecha: Date;
  mensaje: Date;
  cuenta: Cuenta;
  cancha: Cancha;
}