 # API DE MASCOTAS #
*DESCRIPCIÓN*

API REST para la gestión de propietarios (Owners) y mascotas (Pets), con subida de imágenes a Cloudinary mediante Multer, y relaciones entre entidades (Owner ↔ Pet).

**Tecnologías utilizadas**
Node.js
Express
MongoDB
Mongoose
Cloudinary
Multer
Cors
Insomnia

**URL Base http://localhost:3000/api/v1**

**Seed Pets (datos de mascotas)**

1)La seed se ejecuta con el script:
```sh
npm run seed 
```
La función realiza dos acciones principales:
Limpia la colección “pets”
Inserta los datos definidos en el archivo seedPet.js

Logs esperados:
Conectado: Connected to MongoDB
Limpieza: Collection 'pets' cleared (solo si existía contenido previo)
Inserción: X pets inserted
La semilla utiliza el modelo Pet y la colección configurada como ‘pets’.

2)Requisito previo: existencia de un Owner
Para que la seed funcione correctamente, es necesario que exista al menos un Owner en la base de datos, ya que cada Pet requiere un campo obligatorio:

```sh
owner: ObjectId (ref: "owners")
```

3)Relación entre colecciones
Cada mascota creada mediante la seed queda asociada a un Owner existente.

4)Carga de la imagen: con updatePet en Insomnia vamos a cargar atraves de multipart/form-data en  name: photo y en file(carpeta de assets tiene imagenes de ejemplo). ya que en url de la seed es ficticio

**Gestión de archivos**
Las imágenes (avatar y photo) se suben mediante multipart/form-data.
Los archivos se almacenan en Cloudinary.

*Subida de archivos con Cloudinary*
Middleware principal:
```sh  
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "Proyecto8",
    allowedFormats: ["jpg", "png", "jpeg", "gif"],
  },
});
```
*Eliminación de archivos en Cloudinary*
Cuando se elimina/actualiza un Owner o un Pet, también se elimina su imagen mediante deleteFile().

**ENDPOINTS – OWNER**

Ruta base: http://localhost:3000/api/v1

|Método	|Endpoint	|Middleware	|Descripción|
| ------ | ------ |----------|-------------|
|GET	| /owners	|—	|Obtener todos los propietarios|
|POST	| /owners	|upload.single("avatar")	|Crear nuevo propietario|
|PUT	| /owners/:id |	upload.single("avatar")	|Actualizar propietario|
|DELETE	| /owners/:id |	—	|Eliminar propietario y su avatar en Cloudinary|

*Ejemplo POST*
http://localhost:3000/api/v1/owners
```sh
{
  "name": "Juan Pérez",
  "email": "juan@email.com",
  "phone": 123456789,
  "avatar": (archivo)
}
```
Notas
email es único y se guarda en minúsculas.
avatar es obligatorio y debe enviarse como archivo.

*PUT Actualizar propietario*

http://localhost:3000/api/v1/owners/:id
```sh
{
  "name": "Juan Actualizado",
  "phone": 987654321
}
```
Permite actualizar uno o varios campos.
Si se envía un nuevo avatar, el anterior se elimina de Cloudinary.

**ENDPOINTS – PET**

Ruta base: http://localhost:3000/api/v1

|Método	|Endpoint	|Middleware	|Descripción |
| ------ | ------ |----------|-------------|
|GET	|/pets	|—	|Obtener todas las mascotas 
|POST	|/pets	|upload.single("photo")	|Crear nueva mascota
|PUT	|/pets/:id|	upload.single("photo")|	Actualizar mascota
|DELETE	|/pets/:id|	—	|Eliminar mascota y su imagen en Cloudinary|

*GET Obtener mascotas*

http://localhost:3000/api/v1/pets
Devuelve todas las mascotas con el propietario asociado (populate("owner")).

*POST Crear mascota*

http://localhost:3000/api/v1/pets
```sh
{
  "name": "Chikorita",
  "species": "Cobayo",
  "breed": "Americano",
  "age": 2,
  "weight": 0.9,
  "photo": (archivo),
  "owner": "6949628531a8da84450d8f4c"
}
```

*PUT Actualizar mascota*

http://localhost:3000/api/v1/pets/:id
```sh
{
  "age": 3,
  "weight": 1.1
}
```
Permite actualizar campos individuales.
Si se envía una nueva photo, se elimina la anterior de Cloudinary.
Devuelve la mascota con el owner.

*DELETE Eliminar mascota*

http://localhost:3000/api/v1/pets/:id

Elimina la mascota y su imagen asociada en Cloudinary.

***Notas importantes***
Todas las peticiones POST y PUT con imágenes deben enviarse como multipart/form-data.

