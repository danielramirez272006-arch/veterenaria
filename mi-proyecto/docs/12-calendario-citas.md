# Calendario de citas

`src/components/CalendarioCitas.jsx` muestra las citas de **todos** los pacientes en una vista
semanal.

## Comportamiento

- La semana empieza en **lunes**.
- Cada día es una columna; dentro de ella se listan las citas de ese día con nombre y especie de
  la mascota.
- El día actual se resalta con la clase `calendario-dia-hoy`.
- Si un día no tiene citas, muestra "Sin citas".
- Los nombres de los días se traducen (Lun/Mar/... o Mon/Tue/...) según el idioma.

## Controles

| Botón           | Acción |
| --------------- | ------ |
| **Hoy**         | Vuelve a la semana actual. |
| **Semana anterior** | Retrocede 7 días. |
| **Semana siguiente** | Avanza 7 días. |

Internamente mantiene un contador `offset` de semanas: `offset = 0` es la semana actual,
`offset = -1` la anterior, etc.

## Datos

Recibe una lista de citas plana generada con `todasLasCitas(pacientes)` (de `js/storage.js`),
donde cada cita incluye:

```
{ fecha, sintomas, mascotaId, nombre, especie, propietario }
```

Se vincula cada cita a su día comparando `cita.fecha` con el ISO local del día
(`fechaLocalISO` de `js/fechas.js`).