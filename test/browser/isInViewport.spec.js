import { expect } from 'chai';
import { isInViewport } from '../../src/browser/isInViewport';

describe('isInViewport', function () {
  beforeEach(function () {
    this.frame = document.createElement('iframe');
    this.frame.style.width = '500px';
    this.frame.style.height = '500px';
    document.body.appendChild(this.frame);

    this.win = this.frame.contentWindow;
    this.doc = this.win.document;
    this.doc.body.style.margin = 0;
    this.doc.body.style.padding = 0;

    this.mainContainer = this.doc.createElement('div');
    this.mainContainer.style.height = '1000px';
    this.mainContainer.style.width = '1000px';
    this.mainContainer.style.position = 'relative';
    this.doc.body.appendChild(this.mainContainer);
  });

  afterEach(function () {
    document.body.removeChild(this.frame);
  });

  it('should return true when element is in viewport', function () {
    const element = this.doc.createElement('div');
    element.style.height = '200px';
    element.style.width = '200px';
    this.mainContainer.appendChild(element);

    return expect(isInViewport(element, {
      window: this.win,
      document: this.doc,
    })).to.be.true;
  });

  it('should return false when element is out of viewport', function () {
    const element = this.doc.createElement('div');
    element.style.height = '200px';
    element.style.width = '200px';
    this.mainContainer.appendChild(element);

    this.win.scrollTo(0, 201);

    return expect(isInViewport(element, {
      window: this.win,
      document: this.doc,
    })).to.be.false;
  });

  it('should return false when element is partially in viewport', function () {
    const element = this.doc.createElement('div');
    element.style.height = '200px';
    element.style.width = '200px';
    this.mainContainer.appendChild(element);

    this.win.scrollTo(0, 1);

    return expect(isInViewport(element, {
      window: this.win,
      document: this.doc,
    })).to.be.false;
  });
});
