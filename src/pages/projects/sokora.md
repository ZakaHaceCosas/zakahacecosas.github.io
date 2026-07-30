---
layout: ../../layouts/Project.astro
titleES: Sokora
titleEN: Sokora
id: sokora
descriptionES: "Sokora, un bot de Discord multipropósito."
descriptionEN: "Sokora, a multipurpose Discord bot."
---

<esp>

# Qué es y qué hace

Sokora es un bot de Discord multiusos. Piensa en ello como MEE6 (pero mejor y gratis), un bot que intenta acaparar todas las responsabilidades posibles.

<br>

Es un proyecto de código abierto, colaborativo y relativamente grande (somos un equipo de más de 10; aunque lo que es desarrollar el bot lo hacemos solo 2-3).

<br>

También es mi mejor proyecto para exhibir, ya que puedo exhibir de todo (he hecho tanto diseño de marca y de interfaces como desarrollo web y del bot de forma considerable) y el que más me enorgullece, ya que sin ser tampoco un gran éxito ya hace números (más de 13 mil miembros a través de 100 servidores).

## Desarrollo web (+ diseño)

Usa Svelte y SvelteKit, y se despliega en Vercel. Poco más. Tampoco quiero hablar demasiado, la lógica de servidor del sitio (que no es poca) no la hice yo.

Lo que sí hice fue diseñar íntegramente la web principal, y programar su mayoría. Y, aunque esté mal que yo lo diga, es bastante bonita.

[La puedes ver aquí](https://sokora.org/) con todas sus animaciones y efectos. Alguna captura de pantalla:

<img src="/screens/sokora_web_1.png" alt="Captura web 1" class="proj-d-png" />

<img src="/screens/sokora_web_2.png" alt="Captura web 2" class="proj-d-png" />

<img src="/screens/sokora_web_3.png" alt="Captura web 2" class="proj-d-png" />

## Bot en sí

### Arquitectura y desarrollo

> El bot es actualmente de código abierto y se puede ver [aquí](https://github.com/SokoraDesu/Sokora) como está hecho.

Está todo programado en TypeScript con `discord.js` sobre Bun, usando PostgreSQL como base de datos y Docker para despliegue.

<br>

No hay mucho que explicar respecto a cómo está programado, hay dos puntos de entrada (uno para bot y otro para _sharding_), el del bot carga todos los comandos y manejadores de eventos (organizados por separado) y el bot arranca, poco más. Tiene algunas herramientas para desarrollar de forma segura; dos ramas de publicación, una estable y otra de prueba pública; y un mini-_middleware_ de manejo y reporte de errores.

### Funcionalidades

Sokora tiene bastantes funciones, algunas que más de un bot grande podría envidiar.

#### Sistema de niveles

El nivelaje de Sokora (para quien no sepa, obtención de «puntos» por enviar mensajes, para favorecer la actividad) no tiene nada que envidiar a los demás, tiene todo lo que esperarías, incluidas recompensas por nivel, multiplicadores ajustables, y canales desactivados.

<br>

Además, tiene algo particularmente útil (y que no he visto a casi nadie de la competencia): capacidad de importación. Estuve yo mismo un buen rato tratando de hacer averiguar cómo funcionan las APIs de varios bots de Discord (sí, incluido MEE6) y programando una libreria para mover todos los datos de un bot a otro.

#### Sistema de configuración

Lo suyo sería poner algo así al final, pero el Panel de Control de Sokora es envidiable, en serio.

En lugar de un panel web (que requiere iniciar sesión al usuario) o comandos de ajuste individuales (que son engorrosos, y lo sabemos porque eso usaba Sokora antes), Sokora exprime al máximo la API de Componentes V2 de Discord para crear un panel de control dentro de la aplicación. Usando los contenedores interactivos de Discord, obtienes la preciosa interfaz que ves abajo (en [Capturas de pantalla](#capturas-de-pantalla)), que te muestra en el momento los ajustes actuales y cómo cambiarlos. Funciona extremadamente bien, con un par de clics se ajusta todo, sin tener que iniciar sesión en ninguna web ni confirmar cambios (como le des a «Reset» sí que te hará confirmar, no te preocupes…).

Programar eso ha sido un horror y un trabajo en equipo, pero el resultado es muy cómodo, de verdad.

#### Sistema de noticias

Permite publicar anuncios que en vez de perderse con el tiempo otros usuarios pueden ver de manera paginada cuándo y dónde quieran.

#### Moderación básica

Tiene todo lo que esperarías: registros de eliminación y edición, atajos para Discord (kick, ban, timeout, slowdown), y poder de silenciar o advertir usuarios y bloquear canales. Tiene también un visor de incidencias completo y por usuario.

#### Misceláneos

- Tablón de mensajes destacados («starboard»)
- Tablón de servidores públicos
- Mini-juegos y huevos de pascua

### Disponibilidad

Es público y completamente gratuito (se puede donar, claro, pero es opcional).

<br>

Cabe mencionar que está en inglés y no en español, pero salvo eso, lo puedes usar ahora mismo.

### Capturas de pantalla

Configuración > Panel de control abierto:
<img src="/screens/sokora_bot_2.png" alt="Captura bot 2" class="proj-d-png" />

Configuración > Panel de control con un objeto de ajustes abierto:
<img src="/screens/sokora_bot_3.png" alt="Captura bot 3" class="proj-d-png" />

Configuración > Panel de contro con un ajuste dentro de un objeto abierto:
<img src="/screens/sokora_bot_4.png" alt="Captura bot 4" class="proj-d-png" />

Configuración > Registro de cambios
<img src="/screens/sokora_bot_5.png" alt="Captura bot 5" class="proj-d-png" />

Nivelaje > Subida de nivel anunciada y dando una recompensa:
<img src="/screens/sokora_bot_1.png" alt="Captura bot 1" class="proj-d-png" />

Moderación > Registros de mensajería
<img src="/screens/sokora_bot_6.png" alt="Captura bot 6" class="proj-d-png" />

Noticias > Publicación
<img src="/screens/sokora_bot_7.png" alt="Captura bot 7" class="proj-d-png" />

Noticias > Resultado de publicación
<img src="/screens/sokora_bot_8.png" alt="Captura bot 8" class="proj-d-png" />

Noticias > Viendo una noticia desde otro sitio
<img src="/screens/sokora_bot_9.png" alt="Captura bot 9" class="proj-d-png" />

Misceláneo > Perfil de usuario
<img src="/screens/sokora_bot_10.png" alt="Captura bot 10" class="proj-d-png" />

</esp>

<eng>

I haven't ported this page to English yet. Will do soon! You could switch to Spanish, then use your browser's built-in translator, if you're okay with that.

</eng>
