"use strict";
var _this = this;
var chai = require('chai');
var spies = require('chai-spies');
chai.use(spies);
var MusicSheetReader_1 = require("../../src/MusicalScore/ScoreIO/MusicSheetReader");
var MusicSheetAPI_1 = require("../../src/MusicSheetAPI");
var Xml_1 = require("../../src/Common/FileIO/Xml");
var _1 = require("./");
describe("OSMD Plugin infrastructure", function () {
    // Initialize variables
    var path = "test/data/MuzioClementi_SonatinaOpus36No1_Part1.xml";
    var reader = new MusicSheetReader_1.MusicSheetReader();
    var score;
    var sheet;
    var osmd;
    function getSheet(filename) {
        return (window.__xml__)[filename];
    }
    before(function () {
        // Load the xml file
        var doc = getSheet(path);
        chai.expect(doc).to.not.be.undefined;
        score = new Xml_1.IXmlElement(doc.getElementsByTagName("score-partwise")[0]);
        // chai.expect(score).to.not.be.undefined;
        sheet = reader.createMusicSheet(score, path);
    });
    beforeEach(function () {
        _this.osmd = new MusicSheetAPI_1.MusicSheetAPI();
    });
    afterEach(function () {
        _this.osmd = null;
    });
    it("registers a plugin", function (done) {
        var plugin = new _1.MockPlugin();
        osmd.registerPlugin(plugin);
        done();
    });
    it("unregisters a plugin", function (done) {
        var plugin = new _1.MockPlugin();
        osmd.registerPlugin(plugin);
        osmd.unregisterPlugin(plugin);
        done();
    });
    it("triggers on sheet loaded", function (done) {
        var plugin = new _1.MockPlugin();
        osmd.registerPlugin(plugin);
        osmd.load(_this.score);
        chai.expect(plugin.OnSheetLoadedSpy).to.have.been.called.once();
        done();
    });
});
