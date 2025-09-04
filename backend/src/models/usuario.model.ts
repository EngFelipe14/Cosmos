/**
 * Representa un usuario registrado en el sistema.
 */
export interface Usuario {
  /** Identificador único del usuario en la base de datos */
  id: number;

  /** Identificador único de Google asociado al usuario */
  google_sub: string;

  /** Dirección de correo electrónico del usuario */
  email: string;

  /** Nombre completo del usuario */
  name: string;

  /** Fecha en la que se creó el registro del usuario */
  fecha_creacion: Date;
}
