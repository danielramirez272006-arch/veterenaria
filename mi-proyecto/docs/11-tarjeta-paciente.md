# Tarjeta del paciente

`src/components/TarjetaPaciente.jsx` muestra la ficha completa de un paciente en el panel de
pacientes.

## Contenido

- **Cabecera**: nombre de la mascota y especie.
- **Datos**: Dueño y Teléfono (etiquetas traducidas).
- **Lista de citas**: cada cita muestra fecha, síntomas, notas (si existen) y un botón
  "Recordar cita".
- **Botón "Agregar cita"**: despliega el formulario de cita inline (oculto al cancelar o guardar).
- **Botón "Editar"**: pasa la mascota al panel izquierdo de `PacientesPage` para editarla.
- **Botón "Dar de alta"**: elimina al paciente del registro.

## Confirmación

`dar de alta` pide confirmación con `window.confirm`:

> "¿Dar de alta a {nombre}? Se eliminará del registro."

El texto del mensaje se traduce según el idioma activo.

## Notas

- Las citas se ordenan de la **más antigua a la más reciente**.
- Una nota se muestra como "Nota: {texto}" solo si existe.