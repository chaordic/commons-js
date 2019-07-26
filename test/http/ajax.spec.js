import { expect, sinon } from '../globals';

import { ajax } from '../../src/http/ajax';

describe('http.ajax', function () {
  let fakeXhr;

  beforeEach(function () {
    fakeXhr = sinon.useFakeXMLHttpRequest();
    fakeXhr.onCreate = (xhr) => {
      this.request = xhr;
    };
  });

  afterEach(function () {
    fakeXhr.restore();
  });

  it('should run the callback option on successful responses', function (done) {
    ajax({
      url: 'http://www.google.com',
      callback: () => {
        done();
      },
    });

    this.request.respond(200, {}, 'OK');
  });

  it('should run the callback option on error responses', function (done) {
    ajax({
      url: 'http://www.google.com',
      callback: () => {
        done();
      },
    });

    this.request.error();
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

  it('should run the success option on successful responses', function (done) {
    ajax({
      url: 'http://www.google.com',
      success: () => {
        done();
      },
    });

    this.request.respond(200, {}, 'OK');
  });

  it('should pass response data to success callback', function (done) {
    const responseData = 'ok';

    ajax({
      url: 'http://www.google.com',
      success: (data) => {
        expect(data).to.be.equal(responseData);
        done();
      },
    });

    this.request.respond(200, {}, responseData);
  });

  it('should parse response data if its a json', function (done) {
    const responseData = { data: 'ok' };

    ajax({
      url: 'http://www.google.com',
      success: (data) => {
        expect(data).to.deep.equal(responseData);
        done();
      },
    });

    this.request.respond(200, {}, JSON.stringify(responseData));
  });

  it('should not run the success option on error responses', function (done) {
    ajax({
      url: 'http://www.google.com',
      success: () => {
        done.fail();
      },
      error: () => {
        done();
      },
    });

    this.request.error();
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

  it('should run the error option on error responses', function (done) {
    ajax({
      url: 'http://www.google.com',
      error: () => {
        done();
      },
    });

    this.request.error();
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

  it(
    'should not run the error option on successful responses',
    function (done) {
      ajax({
        url: 'http://www.google.com',
        success: () => {
          done();
        },
        error: () => {
          done.fail();
        },
      });

      this.request.respond(200, {}, 'OK');
    },
  );

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
    const fullUrl = 'http://www.google.com?q[]=query&q[]=query2&q[]=query3&user=user';

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
