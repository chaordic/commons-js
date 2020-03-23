import { expect, sinon } from '../globals';

import { ajax } from '../../src/http/ajax';

describe('http.ajax', function () {
  let fakeXhr;
  let sandbox;

  beforeEach(function () {
    fakeXhr = sinon.useFakeXMLHttpRequest();
    fakeXhr.onCreate = (xhr) => {
      this.request = xhr;
    };

    sandbox = sinon.createSandbox();
  });

  afterEach(function () {
    fakeXhr.restore();
    sandbox.restore();
  });

  it('should return a promise that resolves when successful', function () {
    const expectedResponse = { ok: true };

    const response = ajax({ url: 'http://www.google.com' });

    this.request.respond(200, expectedResponse, 'OK');

    expect(response).to.eventually.equal(expectedResponse);
  });

  it('should run the callback option on successful responses', function () {
    const callbackStub = sandbox.stub();

    ajax({
      url: 'http://www.google.com',
      callback: callbackStub,
    });

    this.request.respond(200, {}, 'OK');

    expect(callbackStub).to.have.been.calledOnce;
  });

  it('should run the callback option on error responses', function () {
    const callbackStub = sandbox.stub();

    ajax({
      url: 'http://www.google.com',
      callback: callbackStub,
    });

    this.request.error();

    expect(callbackStub).to.have.been.calledOnce;
  });

  it('should run the callback option when request times out', function () {
    const clock = sinon.useFakeTimers();
    const callbackStub = sinon.stub();

    ajax({
      url: 'http://www.google.com',
      timeout: 500,
      callback: callbackStub,
    });

    clock.tick(501);

    expect(callbackStub).to.have.been.calledOnce;
  });

  it('should run the success option on successful responses', function () {
    const successStub = sinon.stub();

    ajax({
      url: 'http://www.google.com',
      success: successStub,
    });

    this.request.respond(200, {}, 'OK');

    expect(successStub).to.have.been.calledOnce;
  });

  it('should pass response data to success callback', function () {
    const successStub = sinon.stub();

    const responseData = 'ok';

    ajax({
      url: 'http://www.google.com',
      success: successStub,
    });

    this.request.respond(200, {}, responseData);

    expect(successStub).to.have.been.calledOnce;
    expect(successStub).to.have.been.calledWith(responseData);
  });

  it('should parse response data if its a json', function () {
    const successStub = sinon.stub();

    const responseData = { data: 'ok' };

    ajax({
      url: 'http://www.google.com',
      success: successStub,
    });

    this.request.respond(200, {}, JSON.stringify(responseData));

    expect(successStub).to.have.been.calledOnce;
    expect(successStub).to.have.been.calledWith(responseData);
  });

  it('should not run the success option on error responses', function () {
    const successStub = sinon.stub();

    ajax({
      url: 'http://www.google.com',
      success: successStub,
    });

    this.request.error();

    expect(successStub).to.not.have.been.called;
  });

  it('should return a promise that rejects when request times out', function () {
    const clock = sinon.useFakeTimers();

    const response = ajax({
      url: 'http://www.google.com',
      timeout: 500,
    });

    clock.tick(501);

    expect(response).to.be.rejected;
  });

  it('should not run the success option when request times out', function () {
    const clock = sinon.useFakeTimers();
    const successStub = sinon.stub();

    ajax({
      url: 'http://www.google.com',
      timeout: 500,
      success: successStub,
    });

    clock.tick(501);

    expect(successStub).to.not.have.been.called;
  });

  it('should return a promise that rejects when an error is returned', function () {
    const response = ajax({ url: 'http://www.google.com' });

    this.request.error();

    expect(response).to.be.rejected;
  });

  it('should run the error option on error responses', function () {
    const errorStub = sandbox.stub();

    ajax({
      url: 'http://www.google.com',
      error: errorStub,
    });

    this.request.error();

    expect(errorStub).to.have.been.calledOnce;
  });

  it('should return a promise that rejects if response status is higher than 300', function () {
    const response = ajax({
      url: 'http://www.google.com',
    });

    this.request.respond(301);

    expect(response).to.be.rejected;
  });

  it('should run the error option when response status is higher than 300', function () {
    const errorStub = sinon.stub();

    ajax({
      url: 'http://www.google.com',
      error: errorStub,
    });

    this.request.respond(301);

    expect(errorStub).to.have.been.calledOnce;
  });

  it('should run the error option when request times out', function () {
    const clock = sinon.useFakeTimers();
    const errorStub = sinon.stub();

    ajax({
      url: 'http://www.google.com',
      timeout: 500,
      error: errorStub,
    });

    clock.tick(501);

    expect(errorStub).to.have.been.calledOnce;
  });

  it('should not run the error option on successful responses', function () {
    const errorStub = sandbox.stub();

    ajax({
      url: 'http://www.google.com',
      error: errorStub,
    });

    this.request.respond(200, {}, 'OK');

    expect(errorStub).to.not.have.been.called;
  });

  it('should pass params options on query', function (done) {
    const baseUrl = 'http://www.google.com';
    const fullUrl = 'http://www.google.com?q=query&user=user';

    ajax({
      url: baseUrl,
      params: {
        q: 'query',
        user: 'user',
      },
      callback: () => {
        expect(this.request.url).to.be.equal(fullUrl);
        done();
      },
    });

    this.request.respond(200, {}, 'OK');
  });

  it('should use "&" connector if url already have params', function (done) {
    const baseUrl = 'http://www.google.com?test=2';
    const fullUrl = 'http://www.google.com?test=2&q=query&user=user';

    ajax({
      url: baseUrl,
      params: {
        q: 'query',
        user: 'user',
      },
      callback: () => {
        expect(this.request.url).to.be.equal(fullUrl);
        done();
      },
    });

    this.request.respond(200, {}, 'OK');
  });

  it('should remove empty params', function (done) {
    const baseUrl = 'http://www.google.com';
    const fullUrl = 'http://www.google.com?q=query&user=user';

    ajax({
      url: baseUrl,
      params: {
        q: 'query',
        user: 'user',
        empty: undefined,
        anotherEmpty: null,
      },
      callback: () => {
        expect(this.request.url).to.be.equal(fullUrl);
        done();
      },
    });

    this.request.respond(200, {}, 'OK');
  });

  it('should serialize array params', function (done) {
    const baseUrl = 'http://www.google.com';
    const fullUrl =
      'http://www.google.com?q[]=query&q[]=query2&q[]=query3&user=user';

    ajax({
      url: baseUrl,
      params: {
        q: ['query', 'query2', 'query3'],
        user: 'user',
      },
      callback: () => {
        expect(this.request.url).to.be.equal(fullUrl);
        done();
      },
    });

    this.request.respond(200, {}, 'OK');
  });
});
