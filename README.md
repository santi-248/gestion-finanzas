# 📊 Sistema de Gestión de Finanzas Personales y Patrimonio (Bimonetario)

Aplicación web Full-Stack para el seguimiento patrimonial en tiempo real, distribución de activos y planificación de presupuesto mensual con soporte multimoneda (ARS / USD). 

Proyecto desarrollado aplicando la metodología ágil **Scrum** para el espacio curricular **Taller de Tecnología**.

---

## 👥 Equipo Scrum

| Integrante | Rol Scrum | Responsabilidades Principales |
| :--- | :--- | :--- |
| **Santiago Apoud** | **Product Owner (PO)** | Visión del producto, lógica de negocio financiera/bimonetaria y gestión del Product Backlog. |
| **Josefina Marsala** | **Scrum Master (SM)** | Facilitación de eventos Scrum, gestión del tablero en Jira y seguimiento en la bitácora de Sprints. |
| **Kevin Figueroa** | **Developer** | Arquitectura de datos, modelado UML y desarrollo Full-Stack. |
| **Santiago Mir** | **Developer** | Configuración de entornos, infraestructura de repositorios y desarrollo Full-Stack. |
| **Franco Rojas** | **Developer** | Análisis funcional, diseño de Casos de Uso y desarrollo Full-Stack. |

---

## 🚀 Tecnologías y Arquitectura

El sistema está diseñado bajo una arquitectura cliente-servidor desacoplada:

* **Frontend:** React 18 + Vite. Implementado como **SPA (Single Page Application)** con actualización de estado reactiva y diseño personalizado estilo *Sketch / Hand-drawn*.
* **Backend:** Java 17+ con **Spring Boot 3** (Spring Web, Spring Data JPA / Hibernate).
* **Base de Datos:** MySQL relacional.
* **Diseño Orientado a Objetos (OOP):** 
  * Implementación de **Herencia y Polimorfismo** para el módulo de presupuesto (`MovimientoPresupuesto` como clase abstracta y subclases `Ingreso`, `Gasto`, `Inversion`).
  * Estrategia **Single Table Inheritance (STI)** a nivel ORM (`@Inheritance(strategy = InheritanceType.SINGLE_TABLE)`) y deserialización polimórfica mediante Jackson (`@JsonTypeInfo` y `@JsonSubTypes`).

---

## ✨ Funcionalidades Principales

1. **Dashboard Patrimonial Interactivo:**
   * Alta, edición en lote y baja de cuentas bancarias, billeteras virtuales y brokers en **ARS** y **USD**.
   * Conversión automática de divisas según tipo de cambio personalizado.
   * Gráfico de torta dinámico de distribución de activos.
   * Cálculo automático de **Rendimiento del Mes** comparando el patrimonio en vivo contra el último cierre histórico.
   * Barra de progreso hacia el **Objetivo Anual** editable con persistencia.
   * Gráfico de evolución histórica patrimonial mes a mes.

2. **Planificación de Presupuesto Mensual:**
   * Carga categorizada de **Ingresos**, **Gastos** e **Inversiones (DCA)** en múltiples monedas.
   * Cálculo reactivo del **Flujo de Caja Neto** (`Ingresos - Gastos - Inversiones`) con indicadores visuales de superávit o déficit.

3. **Portal y Acceso Multiusuario *(En desarrollo - Próximos Sprints)*:**
   * Landing Page informativa con sección institucional (*Sobre Nosotros*).
   * Registro e inicio de sesión de usuarios con aislamiento de datos por cuenta.

---

## 🛠️ Instalación y Ejecución Local

### 1. Base de Datos (MySQL)
Crear la base de datos vacía en MySQL:
```sql
CREATE DATABASE finanzas_db;