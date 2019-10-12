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
'use strict';

/**
 */
class ObjectDelegator
{
	/**
	 * @param {Object} target
	 * @param {Object} source
	 */
	constructor(target, source){
		this.target = target;
		this.source = source;
	}
	
	/**
	 * @param {string|symbol} name
	 * @param {Object|void} descriptor
	 * @returns {ObjectDelegator}
	 */
	method(name, descriptor){
		return this.methodAs(name, name, descriptor);
	}

	/**
	 * @param {string|symbol} name
	 * @param {string|symbol} as
	 * @param {Object|void} descriptor
	 * @returns {ObjectDelegator}
	 */
	methodAs(name, as, descriptor){
		const target = this.target;
		const source = this.source;
		Object.defineProperty(target, as, Object.assign(Object(descriptor), {
			value: function(){
				return source[name].apply(source, arguments);
			}
		}));
		return this;
	}

	/**
	 * @param {string|symbol} name
	 * @param {Array} args
	 * @param {Object|void} descriptor
	 * @returns {ObjectDelegator}
	 */
	methodBind(name, args, descriptor){
		return this.methodBindAs(name, name, args, descriptor);
	}

	/**
	 * @param {string|symbol} name
	 * @param {string|symbol} as
	 * @param {Array} args
	 * @param {Object|void} descriptor
	 * @returns {ObjectDelegator}
	 */
	methodBindAs(name, as, args, descriptor){
		const target = this.target;
		const source = this.source;
		Object.defineProperty(target, as, Object.assign(Object(descriptor), {
			value: function(){
				return source[name].apply(source, args.concat(Array.from(arguments)));
			}
		}));
		return this;
	}

	/**
	 * @param {string|symbol} name
	 * @param {Object|void} descriptor
	 * @returns {ObjectDelegator}
	 */
	getter(name, descriptor){
		return this.getterAs(name, name, descriptor);
	}

	/**
	 * @param {string|symbol} name
	 * @param {string|symbol} as
	 * @param {Object|void} descriptor
	 * @returns {ObjectDelegator}
	 */
	getterAs(name, as, descriptor){
		const target = this.target;
		const source = this.source;
		Object.defineProperty(target, as, Object.assign(Object(descriptor), {
			get: () => source[name]
		}));
		return this;
	}

	/**
	 * @param {string|symbol} name
	 * @param {Object|void} descriptor
	 * @returns {ObjectDelegator}
	 */
	setter(name, descriptor){
		return this.setterAs(name, name, descriptor);
	}

	/**
	 * @param {string|symbol} name
	 * @param {string|symbol} as
	 * @param {Object|void} descriptor
	 * @returns {ObjectDelegator}
	 */
	setterAs(name, as, descriptor){
		const target = this.target;
		const source = this.source;
		Object.defineProperty(target, as, Object.assign(Object(descriptor), {
			set: (value) => source[name] = value
		}));
		return this;
	}

	/**
	 * @param {string|symbol} name
	 * @param {Object|void} descriptor
	 * @returns {ObjectDelegator}
	 */
	access(name, descriptor){
		return this.accessAs(name, name, descriptor);
	}

	/**
	 * @param {string|symbol} name
	 * @param {string|symbol} as
	 * @param {Object|void} descriptor
	 * @returns {ObjectDelegator}
	 */
	accessAs(name, as, descriptor){
		const target = this.target;
		const source = this.source;
		Object.defineProperty(target, as, Object.assign(Object(descriptor), {
			get: () => source[name],
			set: (value) => source[name] = value
		}));
		return this;
	}

	/**
	 * @param {Object} target
	 * @param {Object} source
	 * @returns {ObjectDelegator}
	 */
	static create(target, source){
		return new this(target, source);
	}
}

/**
 * @+
 */
module.exports = ObjectDelegator;