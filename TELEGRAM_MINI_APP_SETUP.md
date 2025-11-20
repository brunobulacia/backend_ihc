# 🤖 Configuración de Telegram Mini App para CambaEats

Esta guía te ayudará a configurar completamente tu bot de Telegram con Mini App integrada.

## 📋 Índice

- [Configuración del Bot](#configuración-del-bot)
- [Configuración del Frontend](#configuración-del-frontend)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [URLs de la Mini App](#urls-de-la-mini-app)
- [Troubleshooting](#troubleshooting)

## 🤖 Configuración del Bot

### Paso 1: Configurar Mini App en BotFather

1. **Abrir BotFather**
   - Busca `@BotFather` en Telegram
   - Inicia conversación

2. **Configurar botón de menú**

   ```
   /setmenubutton
   ```

   - Selecciona: `@CambaEats_bot`
   - URL: `https://frontend-ihc.vercel.app/`
   - Texto del botón: `🍽️ Explorar Menú`

3. **Configurar dominio (Recomendado)**

   ```
   /setdomain
   ```

   - Selecciona: `@CambaEats_bot`
   - Dominio: `frontend-ihc.vercel.app`

4. **Verificar configuración**
   ```
   /mybots
   ```

   - Selecciona tu bot
   - Verifica que aparezca la Mini App

### Paso 2: Variables de Entorno

Asegúrate de tener estas variables en tu backend:

```env
TELEGRAM_BOT_TOKEN=tu_token_aqui
BOT_TOKEN=tu_token_aqui (backup)
WEBHOOK_SECRET=tu_secreto_webhook
```

## 🌐 Configuración del Frontend

### Paso 1: Agregar Script de Telegram

En tu `index.html` o componente principal:

```html
<script src="https://telegram.org/js/telegram-web-app.js"></script>
```

### Paso 2: Configurar Telegram WebApp

```javascript
// En tu App.js o componente principal
useEffect(() => {
  if (window.Telegram?.WebApp) {
    const webapp = window.Telegram.WebApp;

    // Expandir la web app
    webapp.expand();

    // Configurar tema
    webapp.ready();

    // Obtener parámetro de inicio
    const startParam = webapp.initDataUnsafe?.start_param;

    // Navegar según el parámetro
    handleStartParam(startParam);
  }
}, []);

const handleStartParam = (param) => {
  switch (param) {
    case 'menu':
      // Navegar a la página de menú
      navigate('/menu');
      break;
    case 'cart':
      // Navegar al carrito
      navigate('/cart');
      break;
    case 'orders':
      // Navegar a pedidos
      navigate('/orders');
      break;
    default:
      // Página principal
      navigate('/');
  }
};
```

### Paso 3: Configurar Tema (Opcional)

```javascript
// Configurar colores del tema
if (window.Telegram?.WebApp) {
  const webapp = window.Telegram.WebApp;

  // Aplicar tema de Telegram
  document.documentElement.style.setProperty(
    '--tg-theme-bg-color',
    webapp.backgroundColor,
  );

  document.documentElement.style.setProperty(
    '--tg-theme-text-color',
    webapp.textColor,
  );
}
```

## 🔗 URLs de la Mini App

El bot utiliza estas URLs para diferentes secciones:

| Acción         | URL                                               | Parámetro   |
| -------------- | ------------------------------------------------- | ----------- |
| Menú Principal | `https://t.me/CambaEats_bot/depl?startapp=menu`   | `menu`      |
| Carrito        | `https://t.me/CambaEats_bot/depl?startapp=cart`   | `cart`      |
| Mis Pedidos    | `https://t.me/CambaEats_bot/depl?startapp=orders` | `orders`    |
| Inicio         | `https://t.me/CambaEats_bot/depl`                 | `undefined` |

## 🏗️ Estructura del Proyecto

```
backend_ihc/
├── src/
│   └── telegram/
│       ├── telegram.controller.ts    # Maneja webhooks
│       ├── telegram.service.ts       # Lógica del bot
│       └── telegram.module.ts        # Módulo de Telegram
├── TELEGRAM_MINI_APP_SETUP.md       # Esta guía
└── README.md
```

## 🎯 Funcionalidades Implementadas

### Comando `/start`

- ✅ Mensaje de bienvenida personalizado
- ✅ Botones interactivos
- ✅ Enlace a Mini App

### Botones Interactivos

- ✅ **🍽️ Explorar el Menú**: Abre Mini App con parámetro `menu`
- ✅ **📍 Mi Ubicación**: Callback para gestionar ubicación
- ✅ **🛒 Mi Carrito**: Abre Mini App con parámetro `cart`
- ✅ **📞 Soporte**: Información de contacto
- ✅ **🔄 Mis Pedidos**: Abre Mini App con parámetro `orders`

### Optimizaciones

- ✅ Rate limiting interno (máx 3 peticiones concurrentes)
- ✅ Timeouts configurados (5-10 segundos)
- ✅ Logs optimizados para evitar spam
- ✅ Manejo de errores mejorado

## 🔧 Troubleshooting

### Error 400: BUTTON_URL_INVALID

**Causa**: URL de Mini App incorrecta
**Solución**: Verificar configuración en BotFather

### Error 400: Bad Request

**Causa**: Formato JSON incorrecto en botones
**Solución**: Verificar sintaxis de inline_keyboard

### Mini App no se abre

**Causa**: Dominio no configurado en BotFather
**Solución**: Ejecutar `/setdomain` en BotFather

### No se reciben parámetros en frontend

**Causa**: Script de Telegram no cargado
**Solución**: Agregar script en `<head>` de HTML

## 📱 Ejemplo de Uso

1. Usuario envía `/start` al bot
2. Bot responde con mensaje + botones
3. Usuario presiona "🍽️ Explorar el Menú"
4. Se abre Mini App con URL: `https://t.me/CambaEats_bot/depl?startapp=menu`
5. Frontend recibe parámetro `menu` y navega a la sección correspondiente

## 🚀 Próximos Pasos

1. **Configurar BotFather** (pasos arriba)
2. **Actualizar frontend** con código JavaScript
3. **Probar funcionalidad** enviando `/start`
4. **Ajustar navegación** según parámetros recibidos

## 📞 Soporte

Si tienes problemas:

1. Verifica logs en Railway
2. Revisa configuración en BotFather
3. Confirma que el script de Telegram esté cargado
4. Prueba en un navegador con herramientas de desarrollo

---

**Fecha de creación**: Noviembre 20, 2025  
**Autor**: GitHub Copilot  
**Proyecto**: CambaEats - Bot de Telegram con Mini App
