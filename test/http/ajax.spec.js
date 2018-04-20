import sinon from 'sinon';
import { expect } from 'chai';

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

  it('should run the error option on error responses', function (done) {
    ajax({
      url: 'http://www.google.com',
      error: () => {
        done();
      },
    });

    this.request.error();
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
});
