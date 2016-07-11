"use strict";
var chai = require("chai");
var spies = require("chai-spies");
chai.use(spies);
var Plugin_1 = require("../../src/Plugin");
describe("PluginHost's IEvent and actual implementation", function () {
    it("registers handlers", function (done) {
        var event = new Plugin_1.Event();
        event.on(function () { return undefined; });
        done();
    });
    it("unregisters handlers", function (done) {
        var event = new Plugin_1.Event();
        var mockHandler = function () { return undefined; };
        event.on(mockHandler);
        event.off(mockHandler);
        done();
    });
    it("notifies registered handler when triggered", function (done) {
        var event = new Plugin_1.Event();
        var spy = chai.spy();
        event.on(spy);
        event.trigger("mock event");
        chai.expect(spy).to.have.been.called.once();
        chai.expect(spy).to.have.been.called.with("mock event");
        done();
    });
    it("notifies registered handler every time when triggered", function (done) {
        var event = new Plugin_1.Event();
        var spy = chai.spy();
        event.on(spy);
        event.trigger("mock event");
        chai.expect(spy).to.have.been.called.once();
        chai.expect(spy).to.have.been.called.with("mock event");
        event.trigger("another mock event");
        event.trigger("again a mock event");
        event.trigger("the fourth mock event");
        chai.expect(spy).to.have.been.called.exactly(4);
        chai.expect(spy).to.have.been.called.with("the fourth mock event");
        done();
    });
    it("notifies all registered handlers when triggered", function (done) {
        var event = new Plugin_1.Event();
        var spyOne = chai.spy();
        var spyTwo = chai.spy();
        var spyThree = chai.spy();
        event.on(spyOne);
        event.on(spyTwo);
        event.on(spyThree);
        event.trigger("mock event");
        chai.expect(spyOne).to.have.been.called.once();
        chai.expect(spyOne).to.have.been.called.with("mock event");
        chai.expect(spyTwo).to.have.been.called.once();
        chai.expect(spyTwo).to.have.been.called.with("mock event");
        chai.expect(spyThree).to.have.been.called.once();
        chai.expect(spyThree).to.have.been.called.with("mock event");
        done();
    });
    it("doesn't notify unregistered handlers when triggered", function (done) {
        var event = new Plugin_1.Event();
        var spy = chai.spy();
        event.on(spy);
        event.trigger("mock event");
        chai.expect(spy).to.have.been.called.once();
        chai.expect(spy).to.have.been.called.with("mock event");
        event.off(spy);
        event.trigger("mock event");
        chai.expect(spy).to.have.been.called.once();
        done();
    });
});
