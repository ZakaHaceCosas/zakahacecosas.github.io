---
layout: ../../layouts/Project.astro
titleES: Kantra
titleEN: Kantra
id: kantra
descriptionES: "«Controla quién entra» - Sistema de Acceso Controlado local, basado en la web."
descriptionEN: '"Control who enters" - Self-hosted Access Control System, based on the web.'
---

<esp>

# Qué es y qué hace

Kantra es una aplicación web que sirve como SAC; es decir, programa para registrar entradas y salidas de un edificio. Kantra está específicamente diseñado para el uso educativo, por lo que permite, por ejemplo, filtrar entre alumnos, docentes o personal del centro. También es apropiado para centros educativos ya que es totalmente privado, no porque lo prometa yo sino porque los centros usuarios tienen que alojar el software en sus propios servidores (labor para la que servirá un ordenador que esté encendido siempre que haya alguien dentro del centro; Kantra no es la gran cosa en exigencias de hardware), y de todos modos requiere HTTPS para cifrado en tránsito y una clave maestra usada para cifrado en reposo. Solo quien conozca la clave (se presupone alguien fiable dentro del centro) puede acceder a los datos, o conceder a otros usuarios autentificados el permiso para consultarlos desde la app.

<br>

Lo desarrollé con un compañero[^1].

## La arquitectura

Es bastante sencilla, y eso es intencional. Por su naturaleza, Kantra no espera cargas de trabajo intensas o picos de concurrencia, por lo que nos podemos permitir un diseño mucho más plano que sacrifique «migajas» de rendimiento a cambio de un desarrollo mucho más fácil y rápido.

<br>

Kantra sigue una arquitectura **cliente-servidor-BD**, los clientes (bien la interfaz web o la línea de comandos) se comunican mediante HTTP a un servidor central (alojado por el centro), que hace todo el trabajo complejo y orquesta una base de datos SQLite que procesa todos los datos.

<br>

Como decía, Kantra se va a usar en colegios para registrar entradas y salidas a lo largo del día (cosa que, por diseño, no incluye la entrada/salida de todos los alumnos a las nueve y a las tres; _solo_ todo lo demás), así que tampoco hacen falta cosas más complejas. Esto bastará.

# Desarrollo

## La pila tecnológica

No es nada sobre lo que vaya a escribir demasiado.

<br>

**Svelte(Kit) para la interfaz gráfica.** No hay mucho que explicar respecto a la decisión, Svelte es en líneas generales (y eso incluye mi opinión, claro) la mejor opción para casi cualquier proyecto web.

<br>

**Bun para el servidor.** Elegí usar JavaScript del lado del servidor ya que al estar la interfaz hecha también en JS, a partir de un mono-repo toda la lógica de validación y de tipado son un tercer repositorio compartido entre ambos, eliminando duplicidad y discrepancias (cosas que en el pasado dieron bastante guerra, por lo despistados que somos...)

<br>

**C# para la línea de comandos.** ¡Sí, hay una _CLI_! La «`kantractl`», se utiliza principalmente como gestor de instalación y actualización del programa, aunque a futuro prevemos permitir su uso para interactuar con todo el software desde la terminal. Elegí C# por ser un lenguaje bastante disfrutable y por .NET, que me lo pone muy fácil para enchufar un kit como Avalonia para en el futuro darle interfaz gráfica al instalador/actualizador (o incluso portar Kantra de web a nativo para reducir exigencias, quién sabe).

## Modelo de distribución

La idea es muy sencilla, tú te descargas el programa `kantractl`, y este te explica paso a paso que cosas hacer en tu ordenador o red (si tienes que abrir puertos, instalar certificados o lo que sea), para luego encargarse este por sí mismo de instalar dependencias (Bun, básicamente), descargar la última versión de Kantra, generar y exportar certificados HTTPS locales, y arrancar el servidor.

<br>

Sobre si debería hacer todo en la máquina directamente o instalar una solución de contenedorización y meter Kantra en un contenedor, es algo que aún debatimos, pero por lo pronto lo hace todo en la máquina directamente.

# Funcionalidades

- Registro de entradas, salidas y recogidas de hijos/as
  - Diferencia docentes, alumnos, trabajadores, o visitantes (mas «otros»)
  - Agrupación por puertas
  - Registra acompañantes o hijos/as
  - Ofrece tique a imprimir (formatos Zebra y PDF)
  - Ofrece gafete a imprimir en papel (formato PDF)
  - Permite añadir notas adicionales por si algo se da he esclarecer
  - Una vez registrada una entrada, con un clic se auto-registra la salida de quien haya entrado a la hora actual (u otra a especificar)
- Registro interactivo en el que la propia persona anota los datos
  - Muestra indicaciones de privacidad (R.G.P.D.) y plan de evacuación (a determinar por el centro)
  - Dicha interfaz es personalizable con colores y logotipos del centro
- Visualización de los datos, agrupados por fecha
- Interfaz para filtrar datos de múltiples maneras (por tipo de autor, por DNI)
- Generación de informes (formato PDF) con todos los movimientos asociados a una o varias personas
- Prevención de borrado de datos con menos de 5 años de antigüedad (requerido por ley)

# Disponibilidad

Kantra no está disponible todavía.

<br>

Lo estamos desarrollando entre dos personas[^1] como proyecto escolar adicional, se probará inicialmente en nuestro centro y en caso de demostrarse funcional (que debería) se lanzará como producto con disponibilidad general, momento en que actualizaré esta sección.

# Capturas de pantalla

Pág de inicio con datos:

<img src="/screens/kantra_1.png" alt="Captura 1" class="proj-d-png" />

Registrar entrada desde recepción:

<img src="/screens/kantra_2.png" alt="Captura 2" class="proj-d-png" />

Auto-registro:

<img src="/screens/kantra_3.png" alt="Captura 3" class="proj-d-png" />

(Cabe aclarar que estas son viejas, hace no demasiado que empezamos a re-diseñar Kantra usando un diseño propio en vez de Microsoft Fluent 2; actualizaré las capturas en cuanto esté terminado)

[^1]: Créditos a mi compañero [Mario](https://mariomadorran-portfolio.vercel.app/) por aportar gran parte del desarrollo del proyecto.

</esp>

<eng>

I haven't ported this page to English yet. Will do soon! You could switch to Spanish, then use your browser's built-in translator, if you're okay with that.

</eng>
