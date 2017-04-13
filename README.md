# angular-minimaterial
Es una pequeña libreria para obtener material design en tus proyectos con angular

## Observa un ejemplo
[https://buster95.github.io/angular-minimaterial/](https://buster95.github.io/angular-minimaterial/)

### Using Bower
  
``` bash
bower install angular-minimaterial
```

```html
<link href="bower_components/angular-minimaterial/src/angular-minimaterial.min.js"></link>
```

```html
<script src="bower_components/angular-minimaterial/src/angular-minimaterial.min.css"></script>
```

### Module

```javascript
var app = angular.module('myapp', ['ngMiniMaterial']);
```

### Directives

```html
<mm-input ng-model="modelo" placeholder="Ingrese un texto"></mm-input>
```

```html
<mm-textarea ng-model="modelo" placeholder="Ingrese un texto"></mm-textarea>
```