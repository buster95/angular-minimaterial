# angular-minimaterial
Es una pequeña libreria para obtener material design en tus proyectos con angular

## Observa un ejemplo
[https://buster95.github.io/angular-minimaterial/](https://buster95.github.io/angular-minimaterial/)

### Using Bower
  
``` bash
bower install angular-minimaterial
```

```html
<link href="angular-minimaterial.min.css"></link>
```

```html
<script src="angular-minimaterial.min.js"></script>
```

## Module
El nombre del modulo es **ngMiniMaterial** se debe hacer inject al momento de crear el modulo de nuestra aplicación para utilizar **minimaterial**
```javascript
var app = angular.module('myapp', ['ngMiniMaterial']);
```

## Directives
### mm-loader
```html
<mm-loader ng-model="modelo"></mm-loader>
```

### mm-input
```html
<mm-input ng-model="modelo" placeholder="Ingrese un texto"></mm-input>
```

### mm-textarea
```html
<mm-textarea ng-model="modelo" placeholder="Ingrese un texto"></mm-textarea>
```

### mm-checkbox
```html
<mm-checkbox ng-model="modelo" label="Mini Material Checkbox"></mm-checkbox>
```

### mm-switch
```html
<mm-switch ng-model="modelo" label="Mini Material Switch"></mm-switch>
```

### mm-button
```html
<mm-button ng-click="clickEvent()" class="btn-success">Success</mm-button>
```

##  Services
### $mmSnackbar 
```javascript
var app = angular.module('myapp', ['ngMiniMaterial']);
app.controller('mycontroller', ['$mmSnackbar', function($mmSnackbar){
    $mmSnackbar.setTime(5000); // Default 3000 (3s)
    $mmSnackbar.success('my message');
    $mmSnackbar.info('my message');
    $mmSnackbar.warning('my message');
    $mmSnackbar.error('my message');
}]);
```