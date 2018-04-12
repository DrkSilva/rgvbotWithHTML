"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var guy_service_1 = require('../../services/guy.service');
var GuysComponent = (function () {
    function GuysComponent(guyService) {
        var _this = this;
        this.guyService = guyService;
        usuario: string = window.prompt("usuario");
        pass: string = window.prompt("contraseña");
        if (usuario == 'kvoruh' && pass == 'pass') {
            this.guyService.getGuys()
                .subscribe(function (guys) {
                _this.guys = guys;
            });
            this.guyService.getUsers()
                .subscribe(function (users) {
                _this.users = users;
            });
        }
    }
    GuysComponent.prototype.addGuy = function (event) {
        var _this = this;
        event.preventDefault();
        var newGuy = {
            name: this.name,
            subname: this.subname,
            isWorking: false
        };
        console.log(this.name + ' creado');
        this.guyService.addGuy(newGuy)
            .subscribe(function (guy) {
            _this.guys.push(guy);
            _this.name = '';
            _this.subname = '';
        });
        console.log('El usuario ' + this.name + ' fué añadido a la base');
        this.addUser();
    };
    GuysComponent.prototype.addUser = function () {
        var _this = this;
        var newUser = {
            ip: '192.168.1.1'
        };
        console.log(this.name + ' creado');
        this.guyService.addUser(newUser)
            .subscribe(function (user) {
            _this.users.push(user);
        });
        console.log('El usuario ' + this.name + ' fué añadido a la base');
    };
    GuysComponent.prototype.deleteGuy = function (id) {
        var guys = this.guys;
        this.guyService.deleteGuy(id).subscribe(function (data) {
            if (data.n == 1) {
                for (var i = 0; i < guys.length; i++) {
                    if (guys[i]._id == id) {
                        guys.splice(i, 1);
                    }
                }
            }
        });
        console.log('El usuario fué eliminado');
        this.selected = false;
    };
    GuysComponent.prototype.updateStatus = function (guy) {
        var _guy = {
            _id: guy._id,
            name: guy.name,
            subname: guy.subname,
            isWorking: !guy.isWorking
        };
        this.guyService.updateStatus(_guy).subscribe(function (data) {
            guy.isWorking = !guy.isWorking;
            if (guy.isWorking !== undefined) {
                console.log('El usuario ' + guy.name + ' esta trabajando');
            }
            else {
                console.log('El usuario ' + guy.name + ' dejó de trabajar');
            }
        });
    };
    GuysComponent.prototype.Select = function (guy) {
        console.log('El usuario ' + guy.name + ' fué seleccionado');
        this.selectedGuy = guy;
        this.selected = true;
    };
    GuysComponent.prototype.OrdName = function () {
        var _this = this;
        this.guyService.getGuysSortNam().subscribe(function (guys) {
            _this.guys = guys;
        });
    };
    GuysComponent.prototype.OrdNameDes = function () {
        var _this = this;
        this.guyService.getGuysSortNamDes().subscribe(function (guys) {
            _this.guys = guys;
        });
    };
    GuysComponent.prototype.OrdSub = function () {
        var _this = this;
        this.guyService.getGuysSortSub().subscribe(function (guys) {
            _this.guys = guys;
        });
    };
    GuysComponent.prototype.OrdSubDes = function () {
        var _this = this;
        this.guyService.getGuysSortSubDes().subscribe(function (guys) {
            _this.guys = guys;
        });
    };
    GuysComponent.prototype.OrdIsW = function () {
        var _this = this;
        this.guyService.getGuysSortIsW().subscribe(function (guys) {
            _this.guys = guys;
        });
    };
    GuysComponent.prototype.OrdIsWDes = function () {
        var _this = this;
        this.guyService.getGuysSortIsWDes().subscribe(function (guys) {
            _this.guys = guys;
        });
    };
    GuysComponent.prototype.openNav = function (guy) {
        document.getElementById("myNav").style.width = "100%";
        this.navguy = guy;
    };
    GuysComponent.prototype.closeNav = function () {
        document.getElementById("myNav").style.width = "0%";
    };
    GuysComponent.prototype.openAddNav = function () {
        document.getElementById("mySidenav").style.width = "250px";
    };
    GuysComponent.prototype.closeAddNav = function () {
        document.getElementById("mySidenav").style.width = "0";
    };
    GuysComponent.prototype.update = function () {
        var _this = this;
        var guy = this.navguy;
        var _guy = {
            //_id:guy._id,
            name: this.newname,
            subname: this.newsubname,
            isWorking: guy.isWorking
        };
        //aqui encima estoy actualizando a la persona seleccionada
        //y debajo estoy actualizando lo que vemos
        this.guyService.updateStatus(_guy).subscribe(function (data) {
            guy.name = _this.newname;
            guy.subname = _this.newsubname;
            if (guy.isWorking !== undefined) {
                console.log('El usuario ' + guy.name + ' esta trabajando');
            }
            else {
                console.log('El usuario ' + guy.name + ' dejó de trabajar');
            }
        });
    };
    GuysComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'guys',
            templateUrl: 'guys.component.html'
        }), 
        __metadata('design:paramtypes', [guy_service_1.GuyService])
    ], GuysComponent);
    return GuysComponent;
}());
exports.GuysComponent = GuysComponent;
//# sourceMappingURL=guys.component.js.map