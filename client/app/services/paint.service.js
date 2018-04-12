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
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
var PaintService = (function () {
    function PaintService(http) {
        this.http = http;
        console.log('Paint Service Initialized...');
    }
    PaintService.prototype.getPaints = function () {
        return this.http.get('/api/paints')
            .map(function (res) { return res.json(); });
    };
    PaintService.prototype.getUsers = function () {
        return this.http.get('/api/users')
            .map(function (res) { return res.json(); });
    };
    PaintService.prototype.getPaintsSortNam = function () {
        return this.http.get('/api/paintsnam')
            .map(function (res) { return res.json(); });
    };
    PaintService.prototype.getPaintsSortSub = function () {
        return this.http.get('/api/paintssub')
            .map(function (res) { return res.json(); });
    };
    PaintService.prototype.getPaintsSortIsW = function () {
        return this.http.get('/api/paintsisw')
            .map(function (res) { return res.json(); });
    };
    PaintService.prototype.getPaintsSortNamDes = function () {
        return this.http.get('/api/paintsnamdes')
            .map(function (res) { return res.json(); });
    };
    PaintService.prototype.getPaintsSortSubDes = function () {
        return this.http.get('/api/paintssubdes')
            .map(function (res) { return res.json(); });
    };
    PaintService.prototype.getPaintsSortIsWDes = function () {
        return this.http.get('/api/paintsiswdes')
            .map(function (res) { return res.json(); });
    };
    PaintService.prototype.addPaint = function (newPaint) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/api/paint', JSON.stringify(newPaint), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    PaintService.prototype.addUser = function (newUser) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/api/user', JSON.stringify(newUser), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    PaintService.prototype.deletePaint = function (id) {
        return this.http.delete('/api/paint/' + id)
            .map(function (res) { return res.json(); });
    };
    PaintService.prototype.updateStatus = function (paint) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put('/api/paint/' + paint._id, JSON.stringify(paint), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    PaintService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], PaintService);
    return PaintService;
}());
exports.PaintService = PaintService;
//# sourceMappingURL=paint.service.js.map