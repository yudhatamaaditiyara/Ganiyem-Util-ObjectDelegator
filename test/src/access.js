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

describe('ObjectDelegator#access', () => {
  it('must be work called with ("access")', () => {
    let target = helper.createTarget();
    let source = helper.createSource();
    let object = new ObjectDelegator(target, source);

    assert.ok(object.access('access') instanceof ObjectDelegator);

    let targetDescriptor = Object.getOwnPropertyDescriptor(target, 'access');
    let sourceDescriptor = Object.getOwnPropertyDescriptor(source, 'access');

    assert.strictEqual(typeof targetDescriptor.get, 'function');
    assert.strictEqual(typeof targetDescriptor.set, 'function');
    assert.strictEqual(targetDescriptor.value, void 0);
    assert.strictEqual(targetDescriptor.configurable, sourceDescriptor.configurable);
    assert.strictEqual(targetDescriptor.enumerable, sourceDescriptor.enumerable);
    assert.strictEqual(targetDescriptor.writable, sourceDescriptor.writable);

    assert.strictEqual(target.access, 'access');
    assert.strictEqual(target.access, source.access);

    target.access = 'wrap-value';
    assert.strictEqual(target.accessValue, void 0);
    assert.strictEqual(source.accessValue, 'wrap-value');

    assert.notStrictEqual(targetDescriptor.set, sourceDescriptor.set);
    assert.notStrictEqual(targetDescriptor.get, sourceDescriptor.get);
  });

  it('must be work called with ("access", #descriptor)', () => {
    let target = helper.createTarget();
    let source = helper.createSource();
    let object = new ObjectDelegator(target, source);
    let descriptor = {get: () => {}, set: () => {}, configurable: false, enumerable: false};

    assert.ok(object.access('access', descriptor) instanceof ObjectDelegator);

    let targetDescriptor = Object.getOwnPropertyDescriptor(target, 'access');
    let sourceDescriptor = Object.getOwnPropertyDescriptor(source, 'access');

    assert.strictEqual(typeof targetDescriptor.get, 'function');
    assert.strictEqual(typeof targetDescriptor.set, 'function');
    assert.strictEqual(targetDescriptor.value, void 0);
    assert.strictEqual(targetDescriptor.configurable, descriptor.configurable);
    assert.strictEqual(targetDescriptor.enumerable, descriptor.enumerable);
    assert.strictEqual(targetDescriptor.writable, descriptor.writable);

    assert.strictEqual(target.access, 'access');
    assert.strictEqual(target.access, source.access);

    target.access = 'wrap-value';
    assert.strictEqual(target.accessValue, void 0);
    assert.strictEqual(source.accessValue, 'wrap-value');

    assert.notStrictEqual(targetDescriptor.get, descriptor.get);
    assert.notStrictEqual(targetDescriptor.set, descriptor.set);
    assert.notStrictEqual(targetDescriptor.get, sourceDescriptor.get);
    assert.notStrictEqual(targetDescriptor.set, sourceDescriptor.set);
  });

  it('must be throw IllegalArgumentError() called with ("unknown")', () => {
    let target = helper.createTarget();
    let source = helper.createSource();
    let object = new ObjectDelegator(target, source);
    try {
      object.access('unknown');
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
      object.access(Symbol('unknown'));
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
      object.access('field');
      assert.ok(false);
    } catch (e) {
      assert.ok(e instanceof IllegalArgumentError);
    }
  });

  it('must be throw IllegalArgumentError() called with ("method")', () => {
    let target = helper.createTarget();
    let source = helper.createSource();
    let object = new ObjectDelegator(target, source);
    try {
      object.access('method');
      assert.ok(false);
    } catch (e) {
      assert.ok(e instanceof IllegalArgumentError);
    }
  });

  it('must be throw IllegalArgumentError() called with ("methodBind")', () => {
    let target = helper.createTarget();
    let source = helper.createSource();
    let object = new ObjectDelegator(target, source);
    try {
      object.access('methodBind');
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
      object.access('getter');
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
      object.access('setter');
      assert.ok(false);
    } catch (e) {
      assert.ok(e instanceof IllegalArgumentError);
    }
  });
});