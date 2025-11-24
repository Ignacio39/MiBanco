# Simulador de Transferencias Bancarias

Una aplicación web educativa diseñada para enseñar a realizar transferencias bancarias a personas con discapacidad, con una interfaz accesible y fácil de usar.

## Características

- **Interfaz tipo móvil:** La aplicación se muestra dentro de un marco que simula un teléfono móvil para una experiencia más realista.

- **Flujo paso a paso:**
  1. Ingresa tu saldo inicial
  2. Especifica el alias del destinatario
  3. Ingresa el monto a transferir
  4. Confirma la transferencia

- **Cantidad en palabras:** El monto se muestra escrito en palabras a medida que lo escribes, no solo en números.

- **Síntesis de voz:** Un botón "🔊 Escuchar" que lee en voz alta el monto a transferir usando texto a voz.

- **Escaneo QR:** Funcionalidad para escanear códigos QR y cargar automáticamente el monto a transferir.

- **Accesibilidad:** 
  - Texto grande y legible
  - Colores con buen contraste
  - Diseño simple e intuitivo
  - Mensajes claros de confirmación y error

## Requisitos

- Navegador web moderno (Chrome, Firefox, Edge, Safari)
- Para el escaneo QR: dispositivo con cámara
- Permisos de acceso a cámara (si se usa la función de escaneo QR)

## Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/tu-usuario/web_de_matematica.git
cd web_de_matematica
```

2. Abre el archivo `index.html` en tu navegador web:
```bash
# En Linux/Mac
open index.html

# O simplemente arrastra el archivo a tu navegador
```

## Uso

1. **Pantalla 1 - Saldo Inicial:**
   - Ingresa tu saldo inicial (ejemplo: 10000)
   - Haz clic en "Comenzar"

2. **Pantalla 2 - Alias del destinatario:**
   - Ingresa el alias del que quieres transferir (ejemplo: juan.perez.casa)
   - Haz clic en "Siguiente"
   - Verás tu saldo actual

3. **Pantalla 3 - Monto a transferir:**
   - Ingresa el monto que deseas transferir
   - Verás el monto escrito en palabras
   - Puedes hacer clic en "🔊 Escuchar" para escuchar el monto
   - Puedes hacer clic en "📱 Escanear QR" para leer un código QR
   - Haz clic en "Realizar Transferencia"

4. **Pantalla 4 - Confirmación:**
   - Verás el resumen de tu transferencia
   - Haz clic en "Nueva Transferencia" para hacer otra transferencia con el saldo restante

## Funcionalidades Detalladas

### Conversión a Palabras
La aplicación convierte automáticamente números a su representación en palabras en español:
- 1 → Un peso
- 100 → Cien pesos
- 1500 → Mil quinientos pesos
- 21345 → Veintiuno mil trescientos cuarenta y cinco pesos

### Síntesis de Voz
- Lee el monto en voz alta
- Velocidad de reproducción adaptada para mejor comprensión
- Disponible solo si el navegador soporta la API de síntesis de voz

### Escaneo QR
- Abre la cámara del dispositivo
- Detecta códigos QR en tiempo real
- Soporta formatos:
  - Números simples: `1500`
  - Formato con etiqueta: `monto:1500`
- Carga automáticamente el monto detectado

## Tecnologías Utilizadas

- **HTML5:** Estructura de la aplicación
- **CSS3:** Estilos y diseño responsivo
- **JavaScript (Vanilla):** Lógica de la aplicación
- **Web Speech API:** Para la síntesis de voz
- **jsQR:** Librería para detectar códigos QR desde la cámara

## Archivos

- `index.html` - Estructura HTML de la aplicación
- `styles.css` - Estilos CSS
- `script.js` - Lógica de JavaScript
- `README.md` - Este archivo

## Navegadores Compatibles

- Chrome 45+
- Firefox 40+
- Safari 10+
- Edge 12+

## Permisos Requeridos

Si usas la función de escaneo QR:
- Permiso de acceso a cámara
- Permiso de micrófono (para síntesis de voz en algunos navegadores)

## Notas de Accesibilidad

Esta aplicación está diseñada pensando en personas con discapacidad:
- **Discapacidad visual:** Texto grande, colores con contraste, síntesis de voz
- **Discapacidad motriz:** Botones grandes y fáciles de presionar
- **Dificultad cognitiva:** Interfaz simple, paso a paso, confirmaciones claras

## Contribuciones

Las contribuciones son bienvenidas. Por favor, siéntete libre de hacer un fork del proyecto y enviar pull requests.

## Licencia

Este proyecto está disponible bajo la licencia MIT.

## Autor

Creado como una herramienta educativa para facilitar el aprendizaje de transferencias bancarias.

## Soporte

Si encuentras algún problema o tienes sugerencias, por favor abre un issue en el repositorio.
