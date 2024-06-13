# Proyecto de Citas Medicas

## Configuración

Dado que el proyecto en este repositorio omite el node_modules en primer lugar se debe ejecutar el comando:
```
npm install
```
Además esta incluido nodemon en la dependencia dev, por lo tanto para ejecutar el proyecto se debe usar el comando:
```
npm run dev
```

## Como funciona este proyecto?

El proyecto consiste en un sistema para agendar citas medicas y por lo tanto en primer lugar para obtener los datos de los usuarios, se utiliza la API de https://randomuser.me/api
Usando esta API esta el metodo get en la ruta:
```
http://localhost:3000/register-user
```
Esta ruta nos permite registrar un usuario, el cual luego de ser registrado, se puede ver en consola donde se utiliza Chalk para darle colores como es requerido.
Además para separar los usuarios por genero usamos Lodash, para ver esto debemos ir a la ruta:
```
http://localhost:3000/users
```
Donde podemos ver un objeto con 2 arreglos, cada uno correspondiente para el genero male y female.

En general se busco cumplir con los requerimientos :)

