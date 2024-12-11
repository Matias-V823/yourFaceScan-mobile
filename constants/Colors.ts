const tintColorLight = '#0062ff'; // Azul saturado
const tintColorDark = '#31a6ff'; // Azul claro para tema oscuro

export default {
  light: {
    text: '#000', // Negro para texto en tema claro
    background: '#fff', // Fondo blanco para tema claro
    tint: tintColorLight, // Azul saturado como color principal
    tabIconDefault: '#ccc', // Íconos inactivos en tema claro
    tabIconSelected: tintColorLight, // Azul saturado para íconos seleccionados
    statButtonBackground: '#e6f0ff', // Fondo claro para botones de estadísticas
    newsButtonBackground: '#f9f9f9', // Fondo claro para botones de noticias
    buttonBorder: '#e2e1e1', // Color de borde para botones en tema claro
  },
  dark: {
    text: '#fff', // Blanco para texto en tema oscuro
    background: '#09131b', // Fondo negro para tema oscuro
    tint: tintColorDark, // Azul claro como color principal
    tabIconDefault: '#ccc', // Íconos inactivos en tema oscuro
    tabIconSelected: tintColorDark, // Azul claro para íconos seleccionados
    statButtonBackground: '#082644', // Fondo oscuro para botones de estadísticas
    newsButtonBackground: '#0C1A27', // Fondo oscuro para botones de noticias
    buttonBorder: '#172036', // Color de borde para botones en tema oscuro
  },
};
