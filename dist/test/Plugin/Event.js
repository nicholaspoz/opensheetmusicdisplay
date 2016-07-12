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
    it("does return the specified type", function (done) {
        var eventString = new Plugin_1.Event();
        var eventNumber = new Plugin_1.Event();
        var eventCustom = new Plugin_1.Event();
        var spyString = chai.spy();
        eventString.on(spyString);
        eventString.trigger("mock event");
        chai.expect(spyString).to.have.been.called.once();
        chai.expect(spyString).to.have.been.called.with("mock event");
        var spyNumber = chai.spy();
        eventNumber.on(spyNumber);
        eventNumber.trigger(123456);
        chai.expect(spyNumber).to.have.been.called.once();
        chai.expect(spyNumber).to.have.been.called.with(123456);
        var spyCustom = chai.spy(function (eventArg) {
            chai.expect(eventArg).to.be.an("object");
            chai.expect(eventArg.age).to.be.a("number");
            chai.expect(eventArg.age).to.equal(60);
            chai.expect(eventArg.name).to.be.a("string");
            chai.expect(eventArg.name).to.equal("Max");
            chai.expect(eventArg.greet).to.be.a("function");
            chai.expect(eventArg.greet("Unit Tester")).to.equal("Hello, Unit Tester!");
        });
        eventCustom.on(spyCustom);
        eventCustom.trigger({
            age: 60,
            greet: function (arg) { return "Hello, " + arg + "!"; },
            name: "Max",
        });
        chai.expect(spyCustom).to.have.been.called.once();
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
