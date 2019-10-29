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

/**
 */
let createTarget = () => ({});
let createSource = () => ({
	field: 1,
	method(){
		return 'method';
	},
	methodBind(binding){
		return binding;
	},
	get getterMethod(){
		return 'getterMethod';
	},
	set setterMethod(val){
		this.setterValue = val;
	},
	get accessMethod(){
		return 'accessMethod';
	},
	set accessMethod(val){
		this.accessValue = val;
	}
});

/**
 */
describe('index', () => {
	/**
	 */
	it('new ObjectDelegator(target, source)', () => {
		let target = createTarget();
		let source = createSource();
		let object = new ObjectDelegator(target, source);
		assert.strictEqual(object.target, target);
		assert.strictEqual(object.source, source);
	});

	/**
	 */
	it('ObjectDelegator.create(target, source)', () => {
		let target = createTarget();
		let source = createSource();
		let object = ObjectDelegator.create(target, source);
		assert.strictEqual(object.target, target);
		assert.strictEqual(object.source, source);
	});

	/**
	 */
	it('ObjectDelegator.create() ...catch(e)', () => {
		try {
			ObjectDelegator.create();
		} catch (e) {
			assert.ok(e instanceof IllegalArgumentError);
		}
		try {
			ObjectDelegator.create({});
		} catch (e) {
			assert.ok(e instanceof IllegalArgumentError);
		}
		try {
			ObjectDelegator.create(null, {});
		} catch (e) {
			assert.ok(e instanceof IllegalArgumentError);
		}
		try {
			ObjectDelegator.create({}, null);
		} catch (e) {
			assert.ok(e instanceof IllegalArgumentError);
		}
		try {
			ObjectDelegator.create(null, null);
		} catch (e) {
			assert.ok(e instanceof IllegalArgumentError);
		}
	});

	/**
	 */
	it('method("method")', () => {
		let target = createTarget();
		let source = createSource();
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

		assert.strictEqual(typeof target.method, 'function');
		assert.notStrictEqual(targetDescriptor.value, sourceDescriptor.value);
		assert.notStrictEqual(target.method, source.method);
		assert.strictEqual(target.method(), source.method());
	});

	/**
	 */
	it('method("method", {...})', () => {
		let target = createTarget();
		let source = createSource();
		let object = new ObjectDelegator(target, source);
		let descriptor = {value: false, configurable: false, enumerable:false, writable:false};

		assert.ok(object.method('method', descriptor) instanceof ObjectDelegator);

		let targetDescriptor = Object.getOwnPropertyDescriptor(target, 'method');
		let sourceDescriptor = Object.getOwnPropertyDescriptor(source, 'method');

		assert.strictEqual(targetDescriptor.get, void 0);
		assert.strictEqual(targetDescriptor.set, void 0);
		assert.strictEqual(typeof targetDescriptor.value, 'function');
		assert.strictEqual(targetDescriptor.configurable, descriptor.configurable);
		assert.strictEqual(targetDescriptor.enumerable, descriptor.enumerable);
		assert.strictEqual(targetDescriptor.writable, descriptor.writable);

		assert.strictEqual(typeof target.method, 'function');
		assert.notStrictEqual(targetDescriptor.value, sourceDescriptor.value);
		assert.notStrictEqual(target.method, source.method);
		assert.strictEqual(target.method(), source.method());
	});

	/**
	 */
	it('methodAs("method", "methodAs")', () => {
		let target = createTarget();
		let source = createSource();
		let object = new ObjectDelegator(target, source);

		assert.ok(object.methodAs('method', "methodAs") instanceof ObjectDelegator);

		let targetDescriptor = Object.getOwnPropertyDescriptor(target, 'methodAs');
		let sourceDescriptor = Object.getOwnPropertyDescriptor(source, 'method');

		assert.strictEqual(targetDescriptor.get, void 0);
		assert.strictEqual(targetDescriptor.set, void 0);
		assert.strictEqual(typeof targetDescriptor.value, 'function');
		assert.strictEqual(targetDescriptor.configurable, sourceDescriptor.configurable);
		assert.strictEqual(targetDescriptor.enumerable, sourceDescriptor.enumerable);
		assert.strictEqual(targetDescriptor.writable, sourceDescriptor.writable);

		assert.strictEqual(typeof target.methodAs, 'function');
		assert.notStrictEqual(targetDescriptor.value, sourceDescriptor.value);
		assert.notStrictEqual(target.methodAs, source.method);
		assert.strictEqual(target.methodAs(), source.method());
	});

	/**
	 */
	it('methodAs("method", "methodAs", {...})', () => {
		let target = createTarget();
		let source = createSource();
		let object = new ObjectDelegator(target, source);
		let descriptor = {value: false, configurable: false, enumerable:false, writable:false};

		assert.ok(object.methodAs('method', "methodAs", descriptor) instanceof ObjectDelegator);

		let targetDescriptor = Object.getOwnPropertyDescriptor(target, 'methodAs');
		let sourceDescriptor = Object.getOwnPropertyDescriptor(source, 'method');

		assert.strictEqual(targetDescriptor.get, void 0);
		assert.strictEqual(targetDescriptor.set, void 0);
		assert.strictEqual(typeof targetDescriptor.value, 'function');
		assert.strictEqual(targetDescriptor.configurable, descriptor.configurable);
		assert.strictEqual(targetDescriptor.enumerable, descriptor.enumerable);
		assert.strictEqual(targetDescriptor.writable, descriptor.writable);

		assert.strictEqual(typeof target.methodAs, 'function');
		assert.notStrictEqual(targetDescriptor.value, sourceDescriptor.value);
		assert.notStrictEqual(target.methodAs, source.method);
		assert.strictEqual(target.methodAs(), source.method());
	});

	/**
	 */
	it('method() ...catch(e)', () => {
		let target = createTarget();
		let source = createSource();
		let symbol = Symbol('');
		let object = new ObjectDelegator(target, source);
		try {
			object.method('');
			assert.ok(false);
		} catch (e) {
			assert.ok(e instanceof IllegalArgumentError);
		}
		try {
			object.method(symbol);
			assert.ok(false);
		} catch (e) {
			assert.ok(e instanceof IllegalArgumentError);
		}
		try {
			object.method('field');
			assert.ok(false);
		} catch (e) {
			assert.ok(e instanceof IllegalArgumentError);
		}
		try {
			object.method('getterMethod');
			assert.ok(false);
		} catch (e) {
			assert.ok(e instanceof IllegalArgumentError);
		}
		try {
			object.method('setterMethod');
			assert.ok(false);
		} catch (e) {
			assert.ok(e instanceof IllegalArgumentError);
		}
		try {
			object.method('method', {set: () => {}});
			assert.ok(false);
		} catch (e) {
			assert.ok(!(e instanceof IllegalArgumentError));
		}
		try {
			object.method('method', {get: () => {}});
			assert.ok(false);
		} catch (e) {
			assert.ok(!(e instanceof IllegalArgumentError));
		}
	});

	/**
	 */
	it('methodBind("methodBind", [...])', () => {
		let target = createTarget();
		let source = createSource();
		let object = new ObjectDelegator(target, source);

		assert.ok(object.methodBind('methodBind', ['foo']) instanceof ObjectDelegator);

		let targetDescriptor = Object.getOwnPropertyDescriptor(target, 'methodBind');
		let sourceDescriptor = Object.getOwnPropertyDescriptor(source, 'methodBind');

		assert.strictEqual(targetDescriptor.get, void 0);
		assert.strictEqual(targetDescriptor.set, void 0);
		assert.strictEqual(typeof targetDescriptor.value, 'function');
		assert.strictEqual(targetDescriptor.configurable, sourceDescriptor.configurable);
		assert.strictEqual(targetDescriptor.enumerable, sourceDescriptor.enumerable);
		assert.strictEqual(targetDescriptor.writable, sourceDescriptor.writable);

		assert.strictEqual(typeof target.methodBind, 'function');
		assert.notStrictEqual(targetDescriptor.value, sourceDescriptor.value);
		assert.notStrictEqual(target.methodBind, source.methodBind);
		assert.notStrictEqual(target.methodBind(), source.methodBind());
		assert.strictEqual(target.methodBind(), 'foo');
	});

	/**
	 */
	it('methodBind("methodBind", [...], {...})', () => {
		let target = createTarget();
		let source = createSource();
		let object = new ObjectDelegator(target, source);
		let descriptor = {value: false, configurable: false, enumerable:false, writable:false};

		assert.ok(object.methodBind('methodBind', ['foo'], descriptor) instanceof ObjectDelegator);

		let targetDescriptor = Object.getOwnPropertyDescriptor(target, 'methodBind');
		let sourceDescriptor = Object.getOwnPropertyDescriptor(source, 'methodBind');

		assert.strictEqual(targetDescriptor.get, void 0);
		assert.strictEqual(targetDescriptor.set, void 0);
		assert.strictEqual(typeof targetDescriptor.value, 'function');
		assert.strictEqual(targetDescriptor.configurable, descriptor.configurable);
		assert.strictEqual(targetDescriptor.enumerable, descriptor.enumerable);
		assert.strictEqual(targetDescriptor.writable, descriptor.writable);

		assert.strictEqual(typeof target.methodBind, 'function');
		assert.notStrictEqual(targetDescriptor.value, sourceDescriptor.value);
		assert.notStrictEqual(target.methodBind, source.methodBind);
		assert.notStrictEqual(target.methodBind(), source.methodBind());
		assert.strictEqual(target.methodBind(), 'foo');
	});

	/**
	 */
	it('methodBindAs("methodBind", "methodBindAs", [...])', () => {
		let target = createTarget();
		let source = createSource();
		let object = new ObjectDelegator(target, source);

		assert.ok(object.methodBindAs('methodBind', 'methodBindAs', ['foo']) instanceof ObjectDelegator);

		let targetDescriptor = Object.getOwnPropertyDescriptor(target, 'methodBindAs');
		let sourceDescriptor = Object.getOwnPropertyDescriptor(source, 'methodBind');

		assert.strictEqual(targetDescriptor.get, void 0);
		assert.strictEqual(targetDescriptor.set, void 0);
		assert.strictEqual(typeof targetDescriptor.value, 'function');
		assert.strictEqual(targetDescriptor.configurable, sourceDescriptor.configurable);
		assert.strictEqual(targetDescriptor.enumerable, sourceDescriptor.enumerable);
		assert.strictEqual(targetDescriptor.writable, sourceDescriptor.writable);

		assert.strictEqual(typeof target.methodBindAs, 'function');
		assert.notStrictEqual(targetDescriptor.value, sourceDescriptor.value);
		assert.notStrictEqual(target.methodBindAs, source.methodBind);
		assert.notStrictEqual(target.methodBindAs(), source.methodBind());
		assert.strictEqual(target.methodBindAs(), 'foo');
	});

	/**
	 */
	it('methodBindAs("methodBind", "methodBindAs", [...], {...})', () => {
		let target = createTarget();
		let source = createSource();
		let object = new ObjectDelegator(target, source);
		let descriptor = {value: false, configurable: false, enumerable:false, writable:false};

		assert.ok(object.methodBindAs('methodBind', 'methodBindAs', ['foo'], descriptor) instanceof ObjectDelegator);

		let targetDescriptor = Object.getOwnPropertyDescriptor(target, 'methodBindAs');
		let sourceDescriptor = Object.getOwnPropertyDescriptor(source, 'methodBind');

		assert.strictEqual(targetDescriptor.get, void 0);
		assert.strictEqual(targetDescriptor.set, void 0);
		assert.strictEqual(typeof targetDescriptor.value, 'function');
		assert.strictEqual(targetDescriptor.configurable, descriptor.configurable);
		assert.strictEqual(targetDescriptor.enumerable, descriptor.enumerable);
		assert.strictEqual(targetDescriptor.writable, descriptor.writable);

		assert.strictEqual(typeof target.methodBindAs, 'function');
		assert.notStrictEqual(targetDescriptor.value, sourceDescriptor.value);
		assert.notStrictEqual(target.methodBindAs, source.methodBind);
		assert.notStrictEqual(target.methodBindAs(), source.methodBind());
		assert.strictEqual(target.methodBindAs(), 'foo');
	});

	/**
	 */
	it('methodBind() ...catch(e)', () => {
		let target = createTarget();
		let source = createSource();
		let symbol = Symbol('');
		let object = new ObjectDelegator(target, source);
		try {
			object.methodBind('');
			assert.ok(false);
		} catch (e) {
			assert.ok(e instanceof IllegalArgumentError);
		}
		try {
			object.methodBind(symbol);
			assert.ok(false);
		} catch (e) {
			assert.ok(e instanceof IllegalArgumentError);
		}
		try {
			object.methodBind('field');
			assert.ok(false);
		} catch (e) {
			assert.ok(e instanceof IllegalArgumentError);
		}
		try {
			object.methodBind('getterMethod');
			assert.ok(false);
		} catch (e) {
			assert.ok(e instanceof IllegalArgumentError);
		}
		try {
			object.methodBind('setterMethod');
			assert.ok(false);
		} catch (e) {
			assert.ok(e instanceof IllegalArgumentError);
		}
		try {
			object.methodBind('methodBind', {set: () => {}});
			assert.ok(false);
		} catch (e) {
			assert.ok(!(e instanceof IllegalArgumentError));
		}
		try {
			object.methodBind('methodBind', {get: () => {}});
			assert.ok(false);
		} catch (e) {
			assert.ok(!(e instanceof IllegalArgumentError));
		}
	});

	/**
	 */
	it('getter("getterMethod")', () => {
		let target = createTarget();
		let source = createSource();
		let object = new ObjectDelegator(target, source);

		assert.ok(object.getter('getterMethod') instanceof ObjectDelegator);

		let targetDescriptor = Object.getOwnPropertyDescriptor(target, 'getterMethod');
		let sourceDescriptor = Object.getOwnPropertyDescriptor(source, 'getterMethod');

		assert.strictEqual(targetDescriptor.set, void 0);
		assert.strictEqual(targetDescriptor.value, void 0);
		assert.strictEqual(typeof targetDescriptor.get, 'function');
		assert.strictEqual(targetDescriptor.configurable, sourceDescriptor.configurable);
		assert.strictEqual(targetDescriptor.enumerable, sourceDescriptor.enumerable);

		assert.notStrictEqual(targetDescriptor.get, sourceDescriptor.get);
		assert.strictEqual(target.getterMethod, source.getterMethod);
	});

	/**
	 */
	it('getter("getterMethod", {...})', () => {
		let target = createTarget();
		let source = createSource();
		let object = new ObjectDelegator(target, source);
		let descriptor = {get: null, set: () => {}, configurable: false, enumerable:false};

		assert.ok(object.getter('getterMethod', descriptor) instanceof ObjectDelegator);

		let targetDescriptor = Object.getOwnPropertyDescriptor(target, 'getterMethod');
		let sourceDescriptor = Object.getOwnPropertyDescriptor(source, 'getterMethod');

		assert.strictEqual(targetDescriptor.value, void 0);
		assert.strictEqual(targetDescriptor.set, descriptor.set);
		assert.strictEqual(typeof targetDescriptor.get, 'function');
		assert.strictEqual(targetDescriptor.configurable, descriptor.configurable);
		assert.strictEqual(targetDescriptor.enumerable, descriptor.enumerable);

		assert.notStrictEqual(targetDescriptor.get, sourceDescriptor.get);
		assert.strictEqual(target.getterMethod, source.getterMethod);
	});

	/**
	 */
	it('getterAs("getterMethod", "getterMethodAs")', () => {
		let target = createTarget();
		let source = createSource();
		let object = new ObjectDelegator(target, source);

		assert.ok(object.getterAs('getterMethod', 'getterMethodAs') instanceof ObjectDelegator);

		let targetDescriptor = Object.getOwnPropertyDescriptor(target, 'getterMethodAs');
		let sourceDescriptor = Object.getOwnPropertyDescriptor(source, 'getterMethod');

		assert.strictEqual(targetDescriptor.set, void 0);
		assert.strictEqual(targetDescriptor.value, void 0);
		assert.strictEqual(typeof targetDescriptor.get, 'function');
		assert.strictEqual(targetDescriptor.configurable, sourceDescriptor.configurable);
		assert.strictEqual(targetDescriptor.enumerable, sourceDescriptor.enumerable);

		assert.notStrictEqual(targetDescriptor.get, sourceDescriptor.get);
		assert.strictEqual(target.getterMethodAs, source.getterMethod);
	});

	/**
	 */
	it('getterAs("getterMethod", "getterMethodAs", {...})', () => {
		let target = createTarget();
		let source = createSource();
		let object = new ObjectDelegator(target, source);
		let descriptor = {get: null, set: () => {}, configurable: false, enumerable:false};

		assert.ok(object.getterAs('getterMethod', 'getterMethodAs', descriptor) instanceof ObjectDelegator);

		let targetDescriptor = Object.getOwnPropertyDescriptor(target, 'getterMethodAs');
		let sourceDescriptor = Object.getOwnPropertyDescriptor(source, 'getterMethod');

		assert.strictEqual(targetDescriptor.value, void 0);
		assert.strictEqual(targetDescriptor.set, descriptor.set);
		assert.strictEqual(typeof targetDescriptor.get, 'function');
		assert.strictEqual(targetDescriptor.configurable, descriptor.configurable);
		assert.strictEqual(targetDescriptor.enumerable, descriptor.enumerable);

		assert.notStrictEqual(targetDescriptor.get, sourceDescriptor.get);
		assert.strictEqual(target.getterMethodAs, source.getterMethod);
	});

	/**
	 */
	it('getter() ...catch(e)', () => {
		let target = createTarget();
		let source = createSource();
		let symbol = Symbol('');
		let object = new ObjectDelegator(target, source);
		try {
			object.getter('');
			assert.ok(false);
		} catch (e) {
			assert.ok(e instanceof IllegalArgumentError);
		}
		try {
			object.getter(symbol);
			assert.ok(false);
		} catch (e) {
			assert.ok(e instanceof IllegalArgumentError);
		}
		try {
			object.getter('field');
			assert.ok(false);
		} catch (e) {
			assert.ok(e instanceof IllegalArgumentError);
		}
		try {
			object.getter('method');
			assert.ok(false);
		} catch (e) {
			assert.ok(e instanceof IllegalArgumentError);
		}
		try {
			object.getter('setterMethod');
			assert.ok(false);
		} catch (e) {
			assert.ok(e instanceof IllegalArgumentError);
		}
		try {
			object.getter('getterMethod', {value: 1});
			assert.ok(false);
		} catch (e) {
			assert.ok(!(e instanceof IllegalArgumentError));
		}
		try {
			object.getter('getterMethod', {writable: true});
			assert.ok(false);
		} catch (e) {
			assert.ok(!(e instanceof IllegalArgumentError));
		}
	});

	/**
	 */
	it('setter("setterMethod")', () => {
		let target = createTarget();
		let source = createSource();
		let object = new ObjectDelegator(target, source);

		assert.ok(object.setter('setterMethod') instanceof ObjectDelegator);

		let targetDescriptor = Object.getOwnPropertyDescriptor(target, 'setterMethod');
		let sourceDescriptor = Object.getOwnPropertyDescriptor(source, 'setterMethod');

		assert.strictEqual(targetDescriptor.get, void 0);
		assert.strictEqual(targetDescriptor.value, void 0);
		assert.strictEqual(typeof targetDescriptor.set, 'function');
		assert.strictEqual(targetDescriptor.configurable, sourceDescriptor.configurable);
		assert.strictEqual(targetDescriptor.enumerable, sourceDescriptor.enumerable);
		
		assert.notStrictEqual(targetDescriptor.set, sourceDescriptor.set);

		target.setterMethod = 'foo';
		assert.strictEqual(source.setterValue, 'foo');
		assert.strictEqual(target.setterValue, void 0);
	});

	/**
	 */
	it('setter("setterMethod", {...})', () => {
		let target = createTarget();
		let source = createSource();
		let object = new ObjectDelegator(target, source);
		let descriptor = {get: () => {}, set: null, configurable: false, enumerable:false};

		assert.ok(object.setter('setterMethod', descriptor) instanceof ObjectDelegator);

		let targetDescriptor = Object.getOwnPropertyDescriptor(target, 'setterMethod');
		let sourceDescriptor = Object.getOwnPropertyDescriptor(source, 'setterMethod');

		assert.strictEqual(targetDescriptor.value, void 0);
		assert.strictEqual(targetDescriptor.get, descriptor.get);
		assert.strictEqual(typeof targetDescriptor.set, 'function');
		assert.strictEqual(targetDescriptor.configurable, descriptor.configurable);
		assert.strictEqual(targetDescriptor.enumerable, descriptor.enumerable);
		
		assert.notStrictEqual(targetDescriptor.set, sourceDescriptor.set);

		target.setterMethod = 'foo';
		assert.strictEqual(source.setterValue, 'foo');
		assert.strictEqual(target.setterValue, void 0);
	});

	/**
	 */
	it('setterAs("setterMethod", "setterMethodAs")', () => {
		let target = createTarget();
		let source = createSource();
		let object = new ObjectDelegator(target, source);

		assert.ok(object.setterAs('setterMethod', 'setterMethodAs') instanceof ObjectDelegator);

		let targetDescriptor = Object.getOwnPropertyDescriptor(target, 'setterMethodAs');
		let sourceDescriptor = Object.getOwnPropertyDescriptor(source, 'setterMethod');

		assert.strictEqual(targetDescriptor.get, void 0);
		assert.strictEqual(targetDescriptor.value, void 0);
		assert.strictEqual(typeof targetDescriptor.set, 'function');
		assert.strictEqual(targetDescriptor.configurable, sourceDescriptor.configurable);
		assert.strictEqual(targetDescriptor.enumerable, sourceDescriptor.enumerable);
		
		assert.notStrictEqual(targetDescriptor.set, sourceDescriptor.set);

		target.setterMethodAs = 'foo';
		assert.strictEqual(source.setterValue, 'foo');
		assert.strictEqual(target.setterValue, void 0);
	});

	/**
	 */
	it('setterAs("setterMethod", "setterMethodAs", {...})', () => {
		let target = createTarget();
		let source = createSource();
		let object = new ObjectDelegator(target, source);
		let descriptor = {get: () => {}, set: null, configurable: false, enumerable:false};

		assert.ok(object.setterAs('setterMethod', 'setterMethodAs', descriptor) instanceof ObjectDelegator);

		let targetDescriptor = Object.getOwnPropertyDescriptor(target, 'setterMethodAs');
		let sourceDescriptor = Object.getOwnPropertyDescriptor(source, 'setterMethod');

		assert.strictEqual(targetDescriptor.value, void 0);
		assert.strictEqual(targetDescriptor.get, descriptor.get);
		assert.strictEqual(typeof targetDescriptor.set, 'function');
		assert.strictEqual(targetDescriptor.configurable, descriptor.configurable);
		assert.strictEqual(targetDescriptor.enumerable, descriptor.enumerable);
		
		assert.notStrictEqual(targetDescriptor.set, sourceDescriptor.set);

		target.setterMethodAs = 'foo';
		assert.strictEqual(source.setterValue, 'foo');
		assert.strictEqual(target.setterValue, void 0);
	});

	/**
	 */
	it('setter() ...catch(e)', () => {
		let target = createTarget();
		let source = createSource();
		let symbol = Symbol('');
		let object = new ObjectDelegator(target, source);
		try {
			object.setter('');
			assert.ok(false);
		} catch (e) {
			assert.ok(e instanceof IllegalArgumentError);
		}
		try {
			object.setter(symbol);
			assert.ok(false);
		} catch (e) {
			assert.ok(e instanceof IllegalArgumentError);
		}
		try {
			object.setter('field');
			assert.ok(false);
		} catch (e) {
			assert.ok(e instanceof IllegalArgumentError);
		}
		try {
			object.setter('method');
			assert.ok(false);
		} catch (e) {
			assert.ok(e instanceof IllegalArgumentError);
		}
		try {
			object.setter('getterMethod');
			assert.ok(false);
		} catch (e) {
			assert.ok(e instanceof IllegalArgumentError);
		}
		try {
			object.setter('setterMethod', {value: 1});
			assert.ok(false);
		} catch (e) {
			assert.ok(!(e instanceof IllegalArgumentError));
		}
		try {
			object.setter('setterMethod', {writable: true});
			assert.ok(false);
		} catch (e) {
			assert.ok(!(e instanceof IllegalArgumentError));
		}
	});

	/**
	 */
	it('access("accessMethod")', () => {
		let target = createTarget();
		let source = createSource();
		let object = new ObjectDelegator(target, source);

		assert.ok(object.access('accessMethod') instanceof ObjectDelegator);

		let targetDescriptor = Object.getOwnPropertyDescriptor(target, 'accessMethod');
		let sourceDescriptor = Object.getOwnPropertyDescriptor(source, 'accessMethod');

		assert.strictEqual(targetDescriptor.value, void 0);
		assert.strictEqual(typeof targetDescriptor.get, 'function');
		assert.strictEqual(typeof targetDescriptor.set, 'function');
		assert.strictEqual(targetDescriptor.configurable, sourceDescriptor.configurable);
		assert.strictEqual(targetDescriptor.enumerable, sourceDescriptor.enumerable);
		
		assert.notStrictEqual(targetDescriptor.get, sourceDescriptor.get);
		assert.notStrictEqual(targetDescriptor.set, sourceDescriptor.set);

		target.accessMethod = 'foo';
		assert.strictEqual(source.accessValue, 'foo');
		assert.strictEqual(target.accessValue, void 0);

		assert.strictEqual(target.accessMethod, source.accessMethod);
	});

	/**
	 */
	it('access("accessMethod", {...})', () => {
		let target = createTarget();
		let source = createSource();
		let object = new ObjectDelegator(target, source);
		let descriptor = {get: null, set: null, configurable: false, enumerable:false};

		assert.ok(object.access('accessMethod', descriptor) instanceof ObjectDelegator);

		let targetDescriptor = Object.getOwnPropertyDescriptor(target, 'accessMethod');
		let sourceDescriptor = Object.getOwnPropertyDescriptor(source, 'accessMethod');

		assert.strictEqual(targetDescriptor.value, void 0);
		assert.strictEqual(typeof targetDescriptor.get, 'function');
		assert.strictEqual(typeof targetDescriptor.set, 'function');
		assert.strictEqual(targetDescriptor.configurable, descriptor.configurable);
		assert.strictEqual(targetDescriptor.enumerable, descriptor.enumerable);
		
		assert.notStrictEqual(targetDescriptor.get, sourceDescriptor.get);
		assert.notStrictEqual(targetDescriptor.set, sourceDescriptor.set);

		target.accessMethod = 'foo';
		assert.strictEqual(source.accessValue, 'foo');
		assert.strictEqual(target.accessValue, void 0);

		assert.strictEqual(target.accessMethod, source.accessMethod);
	});

	/**
	 */
	it('accessAs("accessMethod", "accessMethodAs")', () => {
		let target = createTarget();
		let source = createSource();
		let object = new ObjectDelegator(target, source);

		assert.ok(object.accessAs('accessMethod', 'accessMethodAs') instanceof ObjectDelegator);

		let targetDescriptor = Object.getOwnPropertyDescriptor(target, 'accessMethodAs');
		let sourceDescriptor = Object.getOwnPropertyDescriptor(source, 'accessMethod');

		assert.strictEqual(targetDescriptor.value, void 0);
		assert.strictEqual(typeof targetDescriptor.get, 'function');
		assert.strictEqual(typeof targetDescriptor.set, 'function');
		assert.strictEqual(targetDescriptor.configurable, sourceDescriptor.configurable);
		assert.strictEqual(targetDescriptor.enumerable, sourceDescriptor.enumerable);
		
		assert.notStrictEqual(targetDescriptor.get, sourceDescriptor.get);
		assert.notStrictEqual(targetDescriptor.set, sourceDescriptor.set);

		target.accessMethodAs = 'foo';
		assert.strictEqual(source.accessValue, 'foo');
		assert.strictEqual(target.accessValue, void 0);

		assert.strictEqual(target.accessMethodAs, source.accessMethod);
	});

	/**
	 */
	it('accessAs("accessMethod", "accessMethodAs", {...})', () => {
		let target = createTarget();
		let source = createSource();
		let object = new ObjectDelegator(target, source);
		let descriptor = {get: null, set: null, configurable: false, enumerable:false};

		assert.ok(object.accessAs('accessMethod', 'accessMethodAs', descriptor) instanceof ObjectDelegator);

		let targetDescriptor = Object.getOwnPropertyDescriptor(target, 'accessMethodAs');
		let sourceDescriptor = Object.getOwnPropertyDescriptor(source, 'accessMethod');

		assert.strictEqual(targetDescriptor.value, void 0);
		assert.strictEqual(typeof targetDescriptor.get, 'function');
		assert.strictEqual(typeof targetDescriptor.set, 'function');
		assert.strictEqual(targetDescriptor.configurable, descriptor.configurable);
		assert.strictEqual(targetDescriptor.enumerable, descriptor.enumerable);
		
		assert.notStrictEqual(targetDescriptor.get, sourceDescriptor.get);
		assert.notStrictEqual(targetDescriptor.set, sourceDescriptor.set);

		target.accessMethodAs = 'foo';
		assert.strictEqual(source.accessValue, 'foo');
		assert.strictEqual(target.accessValue, void 0);

		assert.strictEqual(target.accessMethodAs, source.accessMethod);
	});

	/**
	 */
	it('access() ...catch(e)', () => {
		let target = createTarget();
		let source = createSource();
		let symbol = Symbol('');
		let object = new ObjectDelegator(target, source);
		try {
			object.access('');
			assert.ok(false);
		} catch (e) {
			assert.ok(e instanceof IllegalArgumentError);
		}
		try {
			object.access(symbol);
			assert.ok(false);
		} catch (e) {
			assert.ok(e instanceof IllegalArgumentError);
		}
		try {
			object.access('field');
			assert.ok(false);
		} catch (e) {
			assert.ok(e instanceof IllegalArgumentError);
		}
		try {
			object.access('method');
			assert.ok(false);
		} catch (e) {
			assert.ok(e instanceof IllegalArgumentError);
		}
		try {
			object.access('setterMethod');
			assert.ok(false);
		} catch (e) {
			assert.ok(e instanceof IllegalArgumentError);
		}
		try {
			object.access('getterMethod');
			assert.ok(false);
		} catch (e) {
			assert.ok(e instanceof IllegalArgumentError);
		}
		try {
			object.access('accessMethod', {value: 1});
			assert.ok(false);
		} catch (e) {
			assert.ok(!(e instanceof IllegalArgumentError));
		}
		try {
			object.access('accessMethod', {writable: true});
			assert.ok(false);
		} catch (e) {
			assert.ok(!(e instanceof IllegalArgumentError));
		}
	});
});