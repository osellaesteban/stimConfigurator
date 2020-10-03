# Stimulator configurator
**Esteban Osella - Programación de dispositivos móviles - Especialización en sistemas embebidos FI-UNER**

This project is a prototype for configuring  via bluetooth a Functional electrical stimulator device operated using a ESP32 device. The sample ESP program only shows in a serial terminal the uploaded configuration and test. 

The dialog between devices is performed via JSON messages. 
### ToDo list:
+ Generate a server to store the configurations. 
+ When connecting,  the stimulator should talk with the phone things like number of channels and limiting configuration parameters.
+ A QR code might be usefull as a second authentification method.


### Pautas
El proyecto final es requisito obligatorio para aprobar el curso. 

Putos a tener en cuenta:
- [x] El proyecto puede ser una integración con una api rest  (ABM de una entidad, ocupando los 4 verbos GET POST PUT DELETE) o puede ser un proyecto que utilice algún plugin de ionic native (bluetooth, geolacation, cámara de fotos, etc).
- [x] El proyecto debe constar con alert de ionic para la información hacia el usuario, validaciones de datos de ingreso, ngFor o ngIf dentro del HTML y algún tipo de posicionamiento de objetos dentro de la pantalla por medio de CSS. (Estos puntos deben estar contenidos si o si dentro del proyecto)
- [ ] La entrega se tiene que realizar en la seccion de tareas, subiendo un pdf con una descripción básica del proyecto y un link de su github personal. El último commit debe estar realizado antes de la fecha limite dada.
- [ ] Fecha limite 15 de Octubre. Cualquier proyecto entregado fuera de rango no va a ser aprobado.
- [x] Cualquier duda o consulta lo debemos canalizar por este foro.