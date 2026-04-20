<div align="center">

#  Academia Monká

### Sistema web de gestión para academia de fútbol

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![PHP](https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)

*Grecia, Alajuela, Costa Rica*

</div>

---

## 📋 Tabla de Contenidos

- [Descripción](#-descripción)
- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Instalación](#-instalación)
- [Uso](#-uso)
- [Páginas del Sistema](#-páginas-del-sistema)
- [Roles de Usuario](#-roles-de-usuario)
- [Capturas de Pantalla](#-capturas-de-pantalla)
- [Autores](#-autores)
- [Licencia](#-licencia)

---

## 📖 Descripción

**Academia Monká** es un sistema web completo desarrollado para una academia de fútbol ubicada en **Grecia, Alajuela, Costa Rica**. Combina una página institucional pública con un robusto sistema de gestión interna para administradores y usuarios registrados.

El proyecto fue construido con tecnologías web fundamentales (HTML, CSS, JavaScript, PHP y MySQL), sin frameworks externos, lo que demuestra un dominio sólido del stack base del desarrollo web.

---

## ✨ Características

- 🌐 **Página institucional pública** con información de la academia, jugadores y torneos
- 👤 **Sistema de autenticación** con login, registro y recuperación por palabra de seguridad
- 🔐 **Control de acceso por roles** (Administrador / Usuario común)
- ⚽ **Gestión completa de jugadores**: datos personales, categorías, estadísticas
- 📊 **Estadísticas detalladas**: anotaciones, asistencias, sanciones y evaluaciones
- 📈 **Gráficos interactivos** de rendimiento por jugador y categoría
- 🗂️ **Filtros por categoría** para navegación eficiente
- 📅 **Control de asistencias** por jugador y sesión
- 📝 **Registro de anotaciones y sanciones** con historial

---

## 🧰 Tecnologías

| Tecnología | Uso |
|---|---|
| **HTML5** | Estructura y maquetado de todas las vistas |
| **CSS3** | Estilos, diseño responsivo y tipografía personalizada |
| **JavaScript** | Interactividad, filtros dinámicos y gráficos |
| **PHP** | Backend, manejo de sesiones, lógica de negocio y conexión a BD |
| **MySQL** | Almacenamiento de jugadores, usuarios, estadísticas y registros |
| **Composer** | Gestión de dependencias PHP |

---

## 📁 Estructura del Proyecto

```
MONKA_Academia/
├── css/                    # Hojas de estilo por módulo
├── js/                     # Scripts JavaScript por módulo
├── php/                    # Lógica del servidor (conexión, CRUD, sesiones)
├── images/                 # Recursos gráficos del sistema
├── fonts/                  # Tipografías personalizadas
├── vendor/                 # Dependencias instaladas con Composer
├── .htaccess               # Configuración del servidor Apache
├── composer.json           # Definición de dependencias PHP
│
├── index.html              # Página de inicio / landing pública
├── login.html              # Inicio de sesión
├── registro.html           # Registro de nuevos usuarios
├── palabraSeguridad.html   # Recuperación de acceso
├── about.html              # Información de la academia
├── categoria.html          # Vista por categorías de jugadores
├── asistencias.html        # Módulo de asistencias
├── anotaciones.html        # Registro de goles y asistencias
├── sanciones.html          # Registro de tarjetas y sanciones
├── evaluaciones.html       # Evaluaciones técnicas de jugadores
├── estadisticas.html       # Panel de estadísticas general
└── graficos.html           # Visualización gráfica de datos
```

---

## ⚙️ Instalación

### Requisitos previos

- [XAMPP](https://www.apachefriends.org/) (o cualquier stack con Apache + PHP + MySQL)
- [MySQL Workbench](https://www.mysql.com/products/workbench/) (para importar la base de datos)
- [Composer](https://getcomposer.org/) (para instalar dependencias PHP)

### Pasos

**1. Clonar el repositorio**
```bash
git clone https://github.com/Jercahdz/MONKA_Academia.git
```

**2. Mover el proyecto a la carpeta del servidor**
```bash
# En XAMPP (Windows)
mv MONKA_Academia/ C:/xampp/htdocs/

# En XAMPP (Linux/Mac)
mv MONKA_Academia/ /opt/lampp/htdocs/
```

**3. Instalar dependencias PHP**
```bash
cd MONKA_Academia
composer install
```

**4. Importar la base de datos**
- Abrir **MySQL Workbench**
- Conectarse al servidor local (`localhost:3306`)
- Ir a `Server > Data Import`
- Seleccionar el archivo `.sql` incluido en el proyecto
- Ejecutar la importación

**5. Configurar la conexión a la base de datos**
- Abrir el archivo de conexión en `/php/` (e.g., `conexion.php`)
- Actualizar las credenciales según tu entorno:
```php
$host = "localhost";
$user = "root";
$password = "";
$database = "monka_academia";
```

**6. Iniciar el servidor**
- Abrir el panel de XAMPP
- Iniciar **Apache** y **MySQL**

**7. Acceder al proyecto**
```
http://localhost/MONKA_Academia/
```

---

## 🖥️ Uso

Una vez instalado, accedé al sistema desde el navegador. La página principal muestra la información pública de la academia. Para acceder al panel de gestión, iniciá sesión desde `login.html`.

---

## 📄 Páginas del Sistema

| Página | Descripción |
|---|---|
| `index.html` | Landing pública con presentación de la academia |
| `login.html` | Autenticación de usuarios |
| `registro.html` | Registro de nuevos usuarios |
| `palabraSeguridad.html` | Recuperación de acceso por palabra clave |
| `about.html` | Historia e información institucional |
| `categoria.html` | Jugadores filtrados por categoría |
| `asistencias.html` | Control de asistencia a entrenamientos |
| `anotaciones.html` | Registro de goles y asistencias de jugadores |
| `sanciones.html` | Tarjetas amarillas, rojas y otras sanciones |
| `evaluaciones.html` | Evaluaciones técnicas y físicas |
| `estadisticas.html` | Resumen estadístico general |
| `graficos.html` | Gráficos de rendimiento y comparativas |

---

## 👥 Roles de Usuario

### 🔴 Administrador
- Acceso completo al sistema
- Agregar, editar y eliminar jugadores
- Registrar estadísticas, sanciones y evaluaciones
- Gestionar asistencias
- Ver todos los gráficos y reportes

### 🔵 Usuario Común
- Acceso de solo lectura
- Visualizar jugadores, estadísticas y gráficos
- Filtrar por categorías

---

## 📸 Capturas de Pantalla

> 
![alt text](Monka1.png)
![alt text](Monka2.png)
![alt text](Monka3.png)

---

## 👨‍💻 Autores

Desarrollado por estudiantes de Ingeniería en Sistemas de la **Universidad Fidélitas**, Costa Rica.

- **Jercahdz** – [@Jercahdz](https://github.com/Jercahdz)
- **JManu02** – [@JManu02](https://github.com/JManu02)
- **JuanM-25** – [@JuanM-25](https://github.com/JuanM-25)
- **JoseCastillo16** – [@JoseCastillo16](https://github.com/JoseCastillo16)

---

## 📄 Licencia

Este proyecto fue desarrollado para una academia de fútbol real en Costa Rica. Puede adaptarse o comercializarse para otras academias deportivas que requieran una solución similar.

---

<div align="center">
  <sub>Construido con 💚 en Costa Rica · Academia Monká © 2024</sub>
</div>