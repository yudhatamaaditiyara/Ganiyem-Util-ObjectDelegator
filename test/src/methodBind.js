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

describe('ObjectDelegator#methodBind', () => {
  it('must be work called with ("methodBind", #args)', () => {
    let target = helper.createTarget();
    let source = helper.createSource();
    let object = new ObjectDelegator(target, source);

    assert.ok(object.methodBind('methodBind', ['value']) instanceof ObjectDelegator);

    let targetDescriptor = Object.getOwnPropertyDescriptor(target, 'methodBind');
    let sourceDescriptor = Object.getOwnPropertyDescriptor(source, 'methodBind');

    assert.strictEqual(targetDescriptor.get, void 0);
    assert.strictEqual(targetDescriptor.set, void 0);
    assert.strictEqual(typeof targetDescriptor.value, 'function');
    assert.strictEqual(targetDescriptor.configurable, sourceDescriptor.configurable);
    assert.strictEqual(targetDescriptor.enumerable, sourceDescriptor.enumerable);
    assert.strictEqual(targetDescriptor.writable, sourceDescriptor.writable);

    assert.ok(typeof target.methodBind === 'function');
    assert.notStrictEqual(targetDescriptor.value, sourceDescriptor.value);
    assert.notStrictEqual(target.methodBind, source.methodBind);
    assert.strictEqual(target.methodBind(), source.methodBind('value'));
  });

  it('must be work called with ("methodBind", #args, #descriptor)', () => {
    let target = helper.createTarget();
    let source = helper.createSource();
    let object = new ObjectDelegator(target, source);
    let descriptor = {value: false, configurable: false, enumerable: false, writable: false};

    assert.ok(object.methodBind('methodBind', ['value'], descriptor) instanceof ObjectDelegator);

    let targetDescriptor = Object.getOwnPropertyDescriptor(target, 'methodBind');
    let sourceDescriptor = Object.getOwnPropertyDescriptor(source, 'methodBind');

    assert.strictEqual(targetDescriptor.get, void 0);
    assert.strictEqual(targetDescriptor.set, void 0);
    assert.strictEqual(typeof targetDescriptor.value, 'function');
    assert.strictEqual(targetDescriptor.configurable, descriptor.configurable);
    assert.strictEqual(targetDescriptor.enumerable, descriptor.enumerable);
    assert.strictEqual(targetDescriptor.writable, descriptor.writable);

    assert.ok(typeof target.methodBind === 'function');
    assert.notStrictEqual(targetDescriptor.value, sourceDescriptor.value);
    assert.notStrictEqual(target.methodBind, source.methodBind);
    assert.strictEqual(target.methodBind(), source.methodBind('value'));
  });

  it('must be throw IllegalArgumentError() called with ("unknown")', () => {
    let target = helper.createTarget();
    let source = helper.createSource();
    let object = new ObjectDelegator(target, source);
    try {
      object.methodBind('unknown');
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
      object.methodBind(Symbol('unknown'));
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
      object.methodBind('field');
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
      object.methodBind('setter');
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
      object.methodBind('getter');
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
      object.methodBind('access');
      assert.ok(false);
    } catch (e) {
      assert.ok(e instanceof IllegalArgumentError);
    }
  });
});