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
var paint_service_1 = require('../../services/paint.service');
var PaintsComponent = (function () {
    function PaintsComponent(paintService) {
        var _this = this;
        this.paintService = paintService;
        this.paintService.getPaints()
            .subscribe(function (paints) {
            _this.paints = paints;
        });
        this.paintService.getUsers()
            .subscribe(function (users) {
            _this.users = users;
        });
    }
    PaintsComponent.prototype.addPaint = function (event) {
        var _this = this;
        event.preventDefault();
        var newPaint = {
            name: this.name,
            subname: this.subname,
            isWorking: false
        };
        console.log(this.name + ' creado');
        this.paintService.addPaint(newPaint)
            .subscribe(function (paint) {
            _this.paints.push(paint);
            _this.name = '';
            _this.subname = '';
        });
        console.log('El usuario ' + this.name + ' fué añadido a la base');
    };
    PaintsComponent.prototype.deletePaint = function (id) {
        var paints = this.paints;
        this.paintService.deletePaint(id).subscribe(function (data) {
            if (data.n == 1) {
                for (var i = 0; i < paints.length; i++) {
                    if (paints[i]._id == id) {
                        paints.splice(i, 1);
                    }
                }
            }
        });
        console.log('El usuario fué eliminado');
        this.selected = false;
    };
    PaintsComponent.prototype.updateStatus = function (paint) {
        var _paint = {
            _id: paint._id,
            name: paint.name,
            subname: paint.subname,
            isWorking: !paint.isWorking
        };
        this.paintService.updateStatus(_paint).subscribe(function (data) {
            paint.isWorking = !paint.isWorking;
            if (paint.isWorking !== undefined) {
                console.log('El usuario ' + paint.name + ' esta trabajando');
            }
            else {
                console.log('El usuario ' + paint.name + ' dejó de trabajar');
            }
        });
    };
    PaintsComponent.prototype.Select = function (paint) {
        console.log('El usuario ' + paint.name + ' fué seleccionado');
        this.selectedPaint = paint;
        this.selected = true;
    };
    PaintsComponent.prototype.OrdName = function () {
        var _this = this;
        this.paintService.getPaintsSortNam().subscribe(function (paints) {
            _this.paints = paints;
        });
    };
    PaintsComponent.prototype.OrdNameDes = function () {
        var _this = this;
        this.paintService.getPaintsSortNamDes().subscribe(function (paints) {
            _this.paints = paints;
        });
    };
    PaintsComponent.prototype.OrdSub = function () {
        var _this = this;
        this.paintService.getPaintsSortSub().subscribe(function (paints) {
            _this.paints = paints;
        });
    };
    PaintsComponent.prototype.OrdSubDes = function () {
        var _this = this;
        this.paintService.getPaintsSortSubDes().subscribe(function (paints) {
            _this.paints = paints;
        });
    };
    PaintsComponent.prototype.OrdIsW = function () {
        var _this = this;
        this.paintService.getPaintsSortIsW().subscribe(function (paints) {
            _this.paints = paints;
        });
    };
    PaintsComponent.prototype.OrdIsWDes = function () {
        var _this = this;
        this.paintService.getPaintsSortIsWDes().subscribe(function (paints) {
            _this.paints = paints;
        });
    };
    PaintsComponent.prototype.openNav = function (paint) {
        document.getElementById("myNav").style.width = "100%";
        this.navpaint = paint;
    };
    PaintsComponent.prototype.closeNav = function () {
        document.getElementById("myNav").style.width = "0%";
    };
    PaintsComponent.prototype.openAddNav = function () {
        document.getElementById("mySidenav").style.width = "250px";
    };
    PaintsComponent.prototype.closeAddNav = function () {
        document.getElementById("mySidenav").style.width = "0";
    };
    PaintsComponent.prototype.update = function () {
        var _this = this;
        var paint = this.navpaint;
        var _paint = {
            //_id:paint._id,
            name: this.newname,
            subname: this.newsubname,
            isWorking: paint.isWorking
        };
        //aqui encima estoy actualizando a la persona seleccionada
        //y debajo estoy actualizando lo que vemos
        this.paintService.updateStatus(_paint).subscribe(function (data) {
            paint.name = _this.newname;
            paint.subname = _this.newsubname;
            if (paint.isWorking !== undefined) {
                console.log('El usuario ' + paint.name + ' esta trabajando');
            }
            else {
                console.log('El usuario ' + paint.name + ' dejó de trabajar');
            }
        });
    };
    PaintsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'paints',
            templateUrl: 'paints.component.html'
        }), 
        __metadata('design:paramtypes', [paint_service_1.PaintService])
    ], PaintsComponent);
    return PaintsComponent;
}());
exports.PaintsComponent = PaintsComponent;
//# sourceMappingURL=paints.component.js.map