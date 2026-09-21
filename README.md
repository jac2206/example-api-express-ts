# 🚀 Express TypeScript API Example

API REST de ejemplo construida con **Node.js, Express y TypeScript**.

El proyecto tiene como objetivo practicar progresivamente conceptos fundamentales para el desarrollo de APIs REST:

* Express
* TypeScript
* REST API
* DTOs
* Controllers
* Services
* Query Params
* Path Params
* Enums
* Manejo de errores
* `AppExeption`
* Middleware global de errores
* Inyección de dependencias con Awilix
* Docker

> Este proyecto utiliza un arreglo en memoria como fuente de datos. No utiliza todavía una base de datos.

---

# 📋 Requisitos

Antes de ejecutar el proyecto necesitas tener instalado:

* Node.js 24+
* npm
* Docker (opcional)

Puedes verificar las versiones:

```bash
node --version
npm --version
docker --version
```

---

# 📦 Instalación

Clonar el proyecto:

```bash
git clone <repository-url>
```

Entrar al proyecto:

```bash
cd api-example-backend
```

Instalar dependencias:

```bash
npm install
```

---

# ▶️ Ejecutar en desarrollo

Ejecutar el servidor:

```bash
npm run dev
```

La API estará disponible en:

```text
http://localhost:3000
```

---

# 🏗️ Compilar el proyecto

Para compilar TypeScript:

```bash
npm run build
```

Esto genera el código JavaScript compilado en:

```text
dist/
```

Para ejecutar la versión compilada:

```bash
npm start
```

---

# 🧱 Arquitectura

El proyecto utiliza una separación sencilla por responsabilidades:

```text
HTTP Request
     ↓
   Route
     ↓
 Controller
     ↓
  Service
     ↓
  Data
```

Cada capa tiene una responsabilidad:

### Routes

Define los endpoints disponibles.

```text
POST /transactions
GET  /transactions
GET  /transactions/:id
```

### Controller

Se encarga de la comunicación HTTP:

* Recibir `Request`
* Obtener parámetros
* Llamar al Service
* Enviar `Response`

### Service

Contiene la lógica de la aplicación:

* Buscar transacciones
* Filtrar
* Ordenar
* Crear transacciones
* Calcular puntos
* Lanzar errores

### Data

Para este ejercicio se utiliza un arreglo en memoria:

```ts
export const transactionData: Transactions[] = [
  {
    id: 1,
    amount: 2000,
    accumulate: 2,
    typePayment: "CC",
    status: "SUCCESS",
  },
  {
    id: 2,
    amount: 500,
    accumulate: 0,
    typePayment: "DC",
    status: "SUCCESS",
  },
  {
    id: 3,
    amount: 100,
    accumulate: 1,
    typePayment: "MN",
    status: "SUCCESS",
  },
];
```

---

# 📦 DTOs

Los DTOs representan los datos que entran y salen de la API.

## Request DTO

Para crear una transacción:

```ts
export interface TransactionsRequestDTO {
  amount: number;
  typePayment: TypePayment;
}
```

## Response DTO

```ts
export interface TransactionsResponseDTO {
  id: number;
  amount: number;
  accumulate: number;
  typePayment: TypePayment;
  status: TransactionStatus;
}
```

---

# 💳 Tipos de pago

La API utiliza un enum para los tipos de pago:

```ts
export enum TypePayment {
  CREDIT_CARD = "CC",
  DEBIT_CARD = "DC",
  CASH = "MN",
}
```

Valores disponibles:

| Valor | Descripción |
| ----- | ----------- |
| `CC`  | Credit Card |
| `DC`  | Debit Card  |
| `MN`  | Cash        |

---

# 📊 Estado de la transacción

```ts
export enum TransactionStatus {
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
}
```

---

# ⭐ Acumulación de puntos

La regla de negocio utilizada en el ejercicio es:

> **1 punto por cada $1.000**

El cálculo se realiza en el Service:

```ts
const accumulate = Math.floor(transaction.amount / 1000);
```

Ejemplos:

| Compra | Puntos |
| -----: | -----: |
|   $500 |      0 |
|   $999 |      0 |
| $1.000 |      1 |
| $1.500 |      1 |
| $2.000 |      2 |
| $2.999 |      2 |
| $3.000 |      3 |
| $5.000 |      5 |

---

# 🌐 Endpoints

## Transactions

### Obtener todas las transacciones

```http
GET /transactions
```

Ejemplo:

```bash
curl http://localhost:3000/transactions
```

Respuesta:

```json
[
  {
    "id": 1,
    "amount": 2000,
    "accumulate": 2,
    "typePayment": "CC",
    "status": "SUCCESS"
  },
  {
    "id": 2,
    "amount": 500,
    "accumulate": 0,
    "typePayment": "DC",
    "status": "SUCCESS"
  }
]
```

---

# 🔎 Query Params

El endpoint permite utilizar query params para filtrar y ordenar las transacciones.

## Filtrar por estado

```http
GET /transactions?status=SUCCESS
```

Ejemplo:

```bash
curl "http://localhost:3000/transactions?status=SUCCESS"
```

---

## Filtrar por tipo de pago

```http
GET /transactions?typePayment=CC
```

Ejemplo:

```bash
curl "http://localhost:3000/transactions?typePayment=CC"
```

---

## Ordenar por acumulación

```http
GET /transactions?sort=accumulate
```

Las transacciones se ordenan de mayor a menor acumulación.

```text
5
3
2
1
0
```

---

## Combinar filtros

Los query params pueden combinarse:

```http
GET /transactions?status=SUCCESS&typePayment=CC&sort=accumulate
```

El flujo del Service es:

```text
transactionData
      ↓
filter(status)
      ↓
filter(typePayment)
      ↓
sort(accumulate)
      ↓
map(ResponseDTO)
      ↓
Response
```

---

# 🔍 Obtener una transacción por ID

```http
GET /transactions/:id
```

Ejemplo:

```bash
curl http://localhost:3000/transactions/1
```

Respuesta:

```json
{
  "id": 1,
  "amount": 2000,
  "accumulate": 2,
  "typePayment": "CC",
  "status": "SUCCESS"
}
```

Si la transacción no existe:

```http
404 Not Found
```

```json
{
  "code": "TRANSACTION_NOT_FOUND",
  "message": "Transaction not found"
}
```

---

# ➕ Crear una transacción

```http
POST /transactions
```

Body:

```json
{
  "amount": 3500,
  "typePayment": "CC"
}
```

El Service:

1. Obtiene el último ID.
2. Genera el siguiente ID.
3. Calcula los puntos.
4. Define el estado como `SUCCESS`.
5. Agrega la transacción al arreglo.
6. Devuelve la transacción creada.

Por ejemplo:

```json
{
  "id": 4,
  "amount": 3500,
  "accumulate": 3,
  "typePayment": "CC",
  "status": "SUCCESS"
}
```

El cálculo:

```ts
Math.floor(3500 / 1000)
```

produce:

```text
3 puntos
```

---

# ⚠️ Manejo de errores

El proyecto utiliza un error personalizado:

```ts
export class AppExeption extends Error {
  constructor(
    public readonly code: string,
    public readonly message: string,
    public readonly statusCode: number = 400,
  ) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);
  }
}
```

Los errores se lanzan desde el Service:

```ts
throw new AppExeption(
  "TRANSACTION_NOT_FOUND",
  "Transaction not found",
  404,
);
```

El Controller no necesita manejar cada error individualmente.

---

# 🚨 Middleware global de errores

Los errores son procesados por un middleware global:

```ts
export const errorMiddleware = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  if (err instanceof AppExeption) {
    res.status(err.statusCode).json({
      code: err.code,
      message: err.message,
    });

    return;
  }

  res.status(500).json({
    code: "INTERNAL_SERVER_ERROR",
    message: "Internal server error",
  });
};
```

El flujo es:

```text
Controller
    ↓
Service
    ↓
throw AppExeption
    ↓
Express
    ↓
errorMiddleware
    ↓
HTTP Response
```

Por ejemplo:

```text
GET /transactions/999
```

produce:

```http
404 Not Found
```

```json
{
  "code": "TRANSACTION_NOT_FOUND",
  "message": "Transaction not found"
}
```

---

# 🧩 Inyección de dependencias

El proyecto utiliza **Awilix** para resolver los Controllers y Services.

Ejemplo:

```ts
const controller =
  container.resolve<TransactionsController>(
    "TransactionsController",
  );
```

La Route se encarga de obtener el Controller:

```ts
router.get("/", async (req, res) => {
  const controller =
    container.resolve<TransactionsController>(
      "TransactionsController",
    );

  return controller.getTransactions(req, res);
});
```

Flujo:

```text
Route
  ↓
Container
  ↓
Controller
  ↓
Service
```

---

# 🐳 Docker

El proyecto incluye un `Dockerfile` multi-stage.

La primera etapa compila la aplicación:

```text
BUILD STAGE
    ↓
npm ci
    ↓
npm run build
```

La segunda etapa contiene solamente lo necesario para ejecutar la aplicación:

```text
PRODUCTION STAGE
    ↓
npm ci --omit=dev
    ↓
dist/
    ↓
node dist/main.js
```

Esto permite mantener la imagen final más limpia y no incluir las dependencias de desarrollo.

---

# 🏗️ Construir la imagen Docker

Desde la raíz del proyecto:

```bash
docker build -t api-example-back .
```

Puedes verificar que la imagen existe:

```bash
docker images
```

Deberías encontrar:

```text
api-example-back
```

---

# ▶️ Ejecutar Docker

Ejecutar el contenedor:

```bash
docker run --name api-example-back -p 3000:3000 api-example-back
```

La API estará disponible en:

```text
http://localhost:3000
```

Por ejemplo:

```text
GET http://localhost:3000/transactions
```

---

# 🚀 Ejecutar Docker en segundo plano

```bash
docker run -d \
  --name api-example-back \
  -p 3000:3000 \
  api-example-back
```

Ver los contenedores activos:

```bash
docker ps
```

---

# 📋 Ver logs del contenedor

```bash
docker logs api-example-back
```

Seguir los logs en tiempo real:

```bash
docker logs -f api-example-back
```

---

# 🛑 Detener el contenedor

```bash
docker stop api-example-back
```

Eliminarlo:

```bash
docker rm api-example-back
```

También puedes hacer ambas operaciones:

```bash
docker rm -f api-example-back
```

---

# 🔄 Reconstruir después de cambios

Cuando modifiques el código:

```bash
docker build -t api-example-back .
```

Después elimina el contenedor anterior:

```bash
docker rm -f api-example-back
```

Y ejecútalo nuevamente:

```bash
docker run -d \
  --name api-example-back \
  -p 3000:3000 \
  api-example-back
```

---

# 🌎 Variables de entorno con Docker

Las variables de entorno pueden enviarse al contenedor mediante `-e`.

Ejemplo:

```bash
docker run -d \
  --name api-example-back \
  -p 3000:3000 \
  -e NODE_ENV=production \
  api-example-back
```

Para varias variables:

```bash
docker run -d \
  --name api-example-back \
  -p 3000:3000 \
  -e NODE_ENV=production \
  -e DATABASE_URL="postgresql://user:password@host:5432/database" \
  -e API_KEY="my-secret-key" \
  api-example-back
```

No es recomendable almacenar secretos directamente dentro del `Dockerfile`.

---

# 📁 Estructura simplificada

La estructura principal del ejercicio:

```text
src/
│
├── config/
│   └── container.ts
│
├── controllers/
│   ├── user.controller.ts
│   └── transactions.controller.ts
│
├── data/
│   ├── models/
│   │   └── transactions.model.ts
│   └── transactions.data.ts
│
├── dto/
│   ├── example.dto.ts
│   └── transactions.dto.ts
│
├── exceptions/
│   ├── app.exception.ts
│   └── errors/
│       └── app.error.ts
│
├── middlewares/
│   └── error.middleware.ts
│
├── routes/
│   ├── users.route.ts
│   └── transactions.route.ts
│
├── services/
│   ├── interfaces/
│   │   └── transactions.interface.ts
│   └── transactions.service.ts
│
├── main.ts
└── server.ts
│
├── Dockerfile
├── package.json
└── tsconfig.json
```

---

# 🧠 Conceptos practicados

Durante el desarrollo de esta API se practican progresivamente:

```text
Express
   ↓
Routes
   ↓
Controllers
   ↓
DTOs
   ↓
Services
   ↓
Query Params
   ↓
Path Params
   ↓
Enums
   ↓
Map / Filter / Sort
   ↓
Reglas de negocio
   ↓
AppExeption
   ↓
Error Middleware
   ↓
Dependency Injection
   ↓
Docker
```

---

# 🎯 Objetivo del ejercicio

El objetivo de esta API no es construir todavía una arquitectura completa con base de datos, repositorios o Prisma.

La finalidad es comprender progresivamente cómo separar responsabilidades:

```text
Route
   ↓
organiza la petición

Controller
   ↓
maneja HTTP

Service
   ↓
contiene la lógica

AppExeption
   ↓
representa errores

Error Middleware
   ↓
convierte errores en respuestas HTTP
```

Posteriormente esta estructura puede evolucionar hacia una arquitectura más completa incorporando:

* Repository Pattern
* PostgreSQL
* Prisma
* Validación con Zod
* Swagger / OpenAPI
* Testing
* Logging
* Autenticación
* CI/CD
