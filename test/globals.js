import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chaiDom from 'chai-dom';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

chai.use(chaiAsPromised);
chai.use(sinonChai);
chai.use(chaiDom);

const { expect } = chai;

export { expect, sinon };
