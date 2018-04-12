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
var GuyService = (function () {
    function GuyService(http) {
        this.http = http;
        console.log('Guy Service Initialized...');
    }
    GuyService.prototype.getGuys = function () {
        return this.http.get('/api/guys')
            .map(function (res) { return res.json(); });
    };
    GuyService.prototype.getUsers = function () {
        return this.http.get('/api/users')
            .map(function (res) { return res.json(); });
    };
    GuyService.prototype.getGuysSortNam = function () {
        return this.http.get('/api/guysnam')
            .map(function (res) { return res.json(); });
    };
    GuyService.prototype.getGuysSortSub = function () {
        return this.http.get('/api/guyssub')
            .map(function (res) { return res.json(); });
    };
    GuyService.prototype.getGuysSortIsW = function () {
        return this.http.get('/api/guysisw')
            .map(function (res) { return res.json(); });
    };
    GuyService.prototype.getGuysSortNamDes = function () {
        return this.http.get('/api/guysnamdes')
            .map(function (res) { return res.json(); });
    };
    GuyService.prototype.getGuysSortSubDes = function () {
        return this.http.get('/api/guyssubdes')
            .map(function (res) { return res.json(); });
    };
    GuyService.prototype.getGuysSortIsWDes = function () {
        return this.http.get('/api/guysiswdes')
            .map(function (res) { return res.json(); });
    };
    GuyService.prototype.addGuy = function (newGuy) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/api/guy', JSON.stringify(newGuy), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    GuyService.prototype.addUser = function (newUser) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/api/user', JSON.stringify(newUser), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    GuyService.prototype.deleteGuy = function (id) {
        return this.http.delete('/api/guy/' + id)
            .map(function (res) { return res.json(); });
    };
    GuyService.prototype.updateStatus = function (guy) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put('/api/guy/' + guy._id, JSON.stringify(guy), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    GuyService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], GuyService);
    return GuyService;
}());
exports.GuyService = GuyService;
//# sourceMappingURL=guy.service.js.map