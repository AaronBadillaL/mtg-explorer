# 🎴 MTG Explorer

**Explorador visual de cartas de Magic: The Gathering**

Una aplicación web moderna y elegante que permite a los jugadores de Magic: The Gathering explorar, buscar y descubrir cartas de manera intuitiva y visual. Desarrollada con React, TypeScript y Vite, ofrece una experiencia de usuario fluida con un diseño responsive que se adapta a cualquier dispositivo.

![MTG Explorer Preview](https://img.shields.io/badge/React-19.1.0-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-6.3.5-purple?style=for-the-badge&logo=vite)

## ✨ Características Principales

### 🔍 Búsqueda Avanzada
- **Filtros múltiples**: Busca por nombre, tipo, color, rareza, coste de maná y edición
- **Búsqueda inteligente**: Filtro de ediciones que funciona tanto por nombre como por código
- **Filtros de color visuales**: Botones con iconos SVG de los símbolos de maná
- **Selección múltiple**: Combina varios filtros para búsquedas precisas

### 🎨 Interfaz Moderna
- **Tema claro/oscuro**: Cambio dinámico entre modos de visualización
- **Diseño responsive**: Optimizado para desktop, tablet y móvil
- **Animaciones suaves**: Transiciones elegantes y efectos hover
- **Modal detallado**: Vista ampliada de cartas con información completa

### 📱 Experiencia de Usuario
- **Modal informativo**: Muestra detalles completos de cada carta
- **Símbolos de maná**: Iconos SVG reales de Scryfall en lugar de texto
- **Paginación**: Navegación fácil entre resultados
- **Búsqueda en resultados**: Filtra cartas ya encontradas sin nueva consulta

### 🃏 Información Detallada
- **Datos completos**: Coste de maná, tipo, rareza, poder/resistencia, lealtad
- **Metadatos**: Edición, número de colección, artista
- **Texto de la carta**: Reglas y efectos con símbolos de maná renderizados
- **Cartas de doble cara**: Soporte completo para cartas transformadas

## 🚀 Tecnologías Utilizadas

- **Frontend**: React 19, TypeScript, Vite
- **UI Components**: React Select, CSS Modules
- **API**: [Scryfall API](https://scryfall.com/docs/api) (base de datos oficial de MTG)
- **Estilos**: CSS personalizado con variables CSS para temas
- **Herramientas**: ESLint, Git

## 📦 Instalación

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/AaronBadillaL/mtg-explorer.git
   cd mtg-explorer
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   ```

3. **Ejecuta el servidor de desarrollo**
   ```bash
   npm run dev
   ```

4. **Abre tu navegador**
   ```
   http://localhost:5173
   ```

## 🛠️ Scripts Disponibles

```bash
npm run dev          # Inicia el servidor de desarrollo
npm run build        # Construye la aplicación para producción
npm run preview      # Previsualiza la build de producción
npm run lint         # Ejecuta el linter
```

## 🎯 Casos de Uso

- **Jugadores casuales**: Descubrir nuevas cartas y ediciones
- **Constructores de mazos**: Buscar cartas específicas por criterios
- **Coleccionistas**: Explorar rarezas y ediciones
- **Nuevos jugadores**: Aprender sobre tipos de cartas y mecánicas

## 📱 Características Técnicas

- **Arquitectura modular**: Componentes reutilizables y bien estructurados
- **TypeScript**: Tipado fuerte para mayor robustez
- **API Integration**: Uso eficiente de la API de Scryfall
- **Performance**: Lazy loading y optimizaciones de rendimiento
- **Accesibilidad**: ARIA labels y navegación por teclado

## 🎨 Temas y Personalización

La aplicación incluye un sistema de temas dinámico:
- **Tema claro**: Colores brillantes y legibles
- **Tema oscuro**: Colores suaves para uso nocturno
- **Transiciones suaves**: Cambio automático entre temas

## 🔧 Configuración del Proyecto

### Estructura de Archivos
```
mtg-explorer/
├── src/
│   ├── components/          # Componentes React
│   │   ├── Cards.tsx       # Componente principal de búsqueda
│   │   ├── Header.tsx      # Header con cambio de tema
│   │   └── CardCarousel.tsx # Carrusel de cartas de fondo
│   ├── context/            # Contextos de React
│   │   ├── ThemeContext.tsx # Contexto del tema
│   │   └── useTheme.ts     # Hook personalizado para el tema
│   └── assets/             # Recursos estáticos
├── public/                 # Archivos públicos
└── package.json           # Dependencias y scripts
```

## 🌟 Características Destacadas

### Búsqueda Inteligente
- Filtros combinables para búsquedas precisas
- Búsqueda por nombre de edición o código
- Exclusión automática de sets de tokens/promos

### Modal Detallado
- Información completa de cada carta
- Símbolos de maná renderizados como SVG
- Soporte para cartas de doble cara
- Metadatos completos (artista, edición, número)

### Experiencia Visual
- Iconos SVG oficiales de Scryfall
- Animaciones suaves y transiciones
- Diseño responsive y accesible
- Temas claro/oscuro

## 🤝 Contribuir

Las contribuciones son bienvenidas. Para contribuir:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la **Licencia MIT** - ver el archivo [LICENSE](LICENSE) para más detalles.

### ¿Qué significa la Licencia MIT?

La Licencia MIT es una de las licencias de código abierto más permisivas y populares. Te permite:

✅ **Usar** el código libremente para cualquier propósito  
✅ **Modificar** el código según tus necesidades  
✅ **Distribuir** copias del software  
✅ **Usar comercialmente** sin restricciones  

**Solo se requiere:**
- Mantener el aviso de copyright original
- Incluir el texto completo de la licencia

### Texto de la Licencia

```
MIT License

Copyright (c) 2025 Aaron

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 🙏 Agradecimientos

- [Scryfall](https://scryfall.com/) por proporcionar la API oficial de Magic: The Gathering
- [Wizards of the Coast](https://company.wizards.com/) por crear Magic: The Gathering
- La comunidad de React y TypeScript por las herramientas increíbles

## 📞 Contacto

- **GitHub**: [@AaronBadillaL](https://github.com/AaronBadillaL)
- **Email**: aaronbadilla01@gmail.com

---

⭐ **¡Si te gusta este proyecto, dale una estrella en GitHub!**
