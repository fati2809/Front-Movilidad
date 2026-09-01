# Movilidad - Frontend

Aplicación frontend de gestión y captura de boletas de infracción para el sistema de movilidad.

## Tecnologías principales

- React 19
- TypeScript
- Vite
- React Router
- Axios
- React Hot Toast
- Recharts
- React Signature Canvas

## Dependencias del frontend

Estas son las librerías usadas en el proyecto frontend según el archivo de configuración:

### Dependencias principales

```json
{
  "axios": "^1.18.1",
  "react": "^19.2.7",
  "react-dom": "^19.2.7",
  "react-hot-toast": "^2.6.0",
  "react-router-dom": "^7.18.1",
  "react-signature-canvas": "^1.1.0-alpha.2",
  "recharts": "^3.10.1"
}
```

### Dependencias de desarrollo

```json
{
  "@eslint/js": "^10.0.1",
  "@tailwindcss/vite": "^4.3.3",
  "@types/node": "^24.13.2",
  "@types/react": "^19.2.17",
  "@types/react-dom": "^19.2.3",
  "@vitejs/plugin-react": "^4.0.0",
  "eslint": "^10.6.0",
  "eslint-plugin-react-hooks": "^7.1.1",
  "eslint-plugin-react-refresh": "^0.5.3",
  "globals": "^15.0.0",
  "tailwindcss": "^4.3.3",
  "typescript": "~6.0.2",
  "typescript-eslint": "^8.62.0",
  "vite": "^8.1.1"
}
```

## Dependencias del backend

El sistema también usa un backend en Python con estas bibliotecas listadas en [Back/requirements.txt](../Back/requirements.txt):

```txt
fastapi
uvicorn
sqlalchemy
pymysql
python-dotenv
python-jose[cryptography]
passlib[bcrypt]
pydantic
email-validator
passlib[bcrypt]==1.7.4
bcrypt==4.0.1
```

## Comandos principales

### Frontend

```bash
npm install
npm run dev
npm run build
```

### Backend

```bash
cd Back
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## Observación

Este proyecto usa un conjunto de herramientas frontend y backend para:

- autenticación y autorización,
- gestión de usuarios,
- creación y consulta de boletas,
- generación de PDF,
- envío de correos,
- firma digital del conductor y oficial,
- visualización de reportes.
