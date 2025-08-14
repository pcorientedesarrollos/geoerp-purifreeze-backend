# ERPFRONTEDPURIFREEZE - Backend (NestJS)

Guía rápida para configurar y ejecutar el proyecto backend.

## Prerrequisitos

*   **Node.js**: Versión `20.15.1` o superior.
*   **Base de datos**: MySQL

## Pasos para Ejecutar

1.  **Clonar el repositorio:**
    ```bash
    git clone https://[URL-DEL-REPOSITORIO-BACKEND]
    ```

2.  **Entrar a la carpeta del proyecto:**
    ```bash
    cd nombre-de-la-carpeta-del-proyecto
    ```

3.  **Instalar dependencias:**
    ```bash
    npm install
    ```

4.  **Configurar el entorno:**
    Crea un archivo `.env`  en este formato en la raiz del proyecto
    
    DB_HOST =
    DB_USER = 
    DB_PASSWORD =
    DB_NAME = 
    DB_PORT  =
    
    # Preguntar lal credenciales 
    **A ALGUNA PERSONA AUTORIZADA**


5.  **Ejecutar la aplicación en modo desarrollo:**
    ```bash
    npm run start:dev
    ```

La API estará disponible en `http://localhost:3000`.