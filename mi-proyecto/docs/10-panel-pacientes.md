# Panel de pacientes

`pages/PacientesPage.jsx` es la vista "Servicios". Se divide en dos paneles.

## Panel izquierdo: formulario

- Muestra el formulario para **agendar nueva cita** (es decir, registrar u editar una mascota).
- Si el usuario elige **editar** una mascota desde la lista, este panel cambia a "Editar a
  {nombre}" y reutiliza `FormularioMascota` en modo edición.

## Panel derecho: pacientes registrados

- Título "Pacientes registrados".
- Contador en español/inglés: "3 mascotas y 5 citas en seguimiento" (con plurales correctos).
- **Buscador**: filtra por nombre de la mascota o nombre del dueño (case-insensitive).
- **Filtro por especie**: desplegable que muestra las especies presentes en la lista. El valor
  interno se guarda en español y la etiqueta se traduce según el idioma activo.
- Lista de tarjetas de pacientes (`ListaPacientes` → `TarjetaPaciente`).

## Calendario

Debajo de los paneles se muestra el **calendario semanal** de citas (`CalendarioCitas`) con todas
las citas de todos los pacientes.

## Lógica de filtrado

```js
coincideTexto   = nombre del paciente o dueño coincide con la búsqueda
coincideEspecie = especieFiltro === 'Todas' o la especie coincide
```

Para el contador se usa `useMemo` sobre `todasLasCitas(pacientes)` (de `js/storage.js`), que
reúne las citas de todos los pacientes junto con el nombre, especie y propietario de cada uno.