# ERPFRONTEDPURIFREEZE - Backend (NestJS)

Guía rápida para configurar y ejecutar el proyecto backend.

## Prerrequisitos

*   **Node.js**: Versión `22.12.0` o superior.
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
    Crea un archivo `.env` en la raíz del proyecto con este formato:
    ```env
    DB_HOST=
    DB_USER=
    DB_PASSWORD=
    DB_NAME=
    DB_PORT=
    ```    **Nota:** Solicita las credenciales a **una persona autorizada**.

5.  **Ejecutar la aplicación en modo desarrollo:**
    ```bash
    npm run start:dev
    ```

La API estará disponible en `http://localhost:3000`.

**Nota:** El día 14 de agosto de 2025 se realizó la actualización de las dependencias principales del proyecto
    **Node.js**: Versión `20.15.1` => `22.12.0`
