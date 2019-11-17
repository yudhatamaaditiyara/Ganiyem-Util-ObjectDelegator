/**
 * Copyright (C) 2019 Yudha Tama Aditiyara
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const assert = require('assert');
const {IllegalArgumentError} = require('ganiyem-error');
const ObjectDelegator = require('../../');
const helper = require('../helper');

describe('ObjectDelegator#method', () => {
  it('must be work called with ("method")', () => {
    let target = helper.createTarget();
    let source = helper.createSource();
    let object = new ObjectDelegator(target, source);

    assert.ok(object.method('method') instanceof ObjectDelegator);

    let targetDescriptor = Object.getOwnPropertyDescriptor(target, 'method');
    let sourceDescriptor = Object.getOwnPropertyDescriptor(source, 'method');

    assert.strictEqual(targetDescriptor.get, void 0);
    assert.strictEqual(targetDescriptor.set, void 0);
    assert.strictEqual(typeof targetDescriptor.value, 'function');
    assert.strictEqual(targetDescriptor.configurable, sourceDescriptor.configurable);
    assert.strictEqual(targetDescriptor.enumerable, sourceDescriptor.enumerable);
    assert.strictEqual(targetDescriptor.writable, sourceDescriptor.writable);

    assert.ok(typeof target.method === 'function');
    assert.notStrictEqual(targetDescriptor.value, sourceDescriptor.value);
    assert.notStrictEqual(target.method, source.method);
    assert.strictEqual(target.method(), source.method());
  });

  it('must be work called with ("method", #descriptor)', () => {
    let target = helper.createTarget();
    let source = helper.createSource();
    let object = new ObjectDelegator(target, source);
    let descriptor = {value: false, configurable: false, enumerable: false, writable: false};

    assert.ok(object.method('method', descriptor) instanceof ObjectDelegator);

    let targetDescriptor = Object.getOwnPropertyDescriptor(target, 'method');
    let sourceDescriptor = Object.getOwnPropertyDescriptor(source, 'method');

    assert.strictEqual(targetDescriptor.get, void 0);
    assert.strictEqual(targetDescriptor.set, void 0);
    assert.strictEqual(typeof targetDescriptor.value, 'function');
    assert.strictEqual(targetDescriptor.configurable, descriptor.configurable);
    assert.strictEqual(targetDescriptor.enumerable, descriptor.enumerable);
    assert.strictEqual(targetDescriptor.writable, descriptor.writable);

    assert.ok(typeof target.method === 'function');
    assert.notStrictEqual(targetDescriptor.value, sourceDescriptor.value);
    assert.notStrictEqual(target.method, source.method);
    assert.strictEqual(target.method(), source.method());
  });

  it('must be throw IllegalArgumentError() called with ("unknown")', () => {
    let target = helper.createTarget();
    let source = helper.createSource();
    let object = new ObjectDelegator(target, source);
    try {
      object.method('unknown');
      assert.ok(false);
    } catch (e) {
      assert.ok(e instanceof IllegalArgumentError);
    }
  });

  it('must be throw IllegalArgumentError() called with (Symbol("unknown"))', () => {
    let target = helper.createTarget();
    let source = helper.createSource();
    let object = new ObjectDelegator(target, source);
    try {
      object.method(Symbol('unknown'));
      assert.ok(false);
    } catch (e) {
      assert.ok(e instanceof IllegalArgumentError);
    }
  });

  it('must be throw IllegalArgumentError() called with ("field")', () => {
    let target = helper.createTarget();
    let source = helper.createSource();
    let object = new ObjectDelegator(target, source);
    try {
      object.method('field');
      assert.ok(false);
    } catch (e) {
      assert.ok(e instanceof IllegalArgumentError);
    }
  });

  it('must be throw IllegalArgumentError() called with ("setter")', () => {
    let target = helper.createTarget();
    let source = helper.createSource();
    let object = new ObjectDelegator(target, source);
    try {
      object.method('setter');
      assert.ok(false);
    } catch (e) {
      assert.ok(e instanceof IllegalArgumentError);
    }
  });

  it('must be throw IllegalArgumentError() called with ("getter")', () => {
    let target = helper.createTarget();
    let source = helper.createSource();
    let object = new ObjectDelegator(target, source);
    try {
      object.method('getter');
      assert.ok(false);
    } catch (e) {
      assert.ok(e instanceof IllegalArgumentError);
    }
  });

  it('must be throw IllegalArgumentError() called with ("access")', () => {
    let target = helper.createTarget();
    let source = helper.createSource();
    let object = new ObjectDelegator(target, source);
    try {
      object.method('access');
      assert.ok(false);
    } catch (e) {
      assert.ok(e instanceof IllegalArgumentError);
    }
  });
});