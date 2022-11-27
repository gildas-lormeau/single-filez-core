const { Array, Object, String, BigInt, Math, Date, Map, URL, Error, Uint8Array, Uint16Array, Uint32Array, DataView, Blob, Promise, TextEncoder, TextDecoder, document, crypto, btoa, TransformStream, ReadableStream, WritableStream, CompressionStream, DecompressionStream, navigator } = globalThis;

/*
 Copyright (c) 2022 Gildas Lormeau. All rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 1. Redistributions of source code must retain the above copyright notice,
 this list of conditions and the following disclaimer.

 2. Redistributions in binary form must reproduce the above copyright 
 notice, this list of conditions and the following disclaimer in 
 the documentation and/or other materials provided with the distribution.

 3. The names of the authors may not be used to endorse or promote products
 derived from this software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED ''AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
 INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
 INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
 INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
 OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/* global navigator */

const DEFAULT_CONFIGURATION = {
	chunkSize: 512 * 1024,
	maxWorkers: (typeof navigator != "undefined" && navigator.hardwareConcurrency) || 2,
	terminateWorkerTimeout: 5000,
	useWebWorkers: true,
	workerScripts: undefined
};

const config = Object.assign({}, DEFAULT_CONFIGURATION);

function getConfiguration() {
	return config;
}

function configure(configuration) {
	if (configuration.baseURL !== undefined) {
		config.baseURL = configuration.baseURL;
	}
	if (configuration.chunkSize !== undefined) {
		config.chunkSize = configuration.chunkSize;
	}
	if (configuration.maxWorkers !== undefined) {
		config.maxWorkers = configuration.maxWorkers;
	}
	if (configuration.terminateWorkerTimeout !== undefined) {
		config.terminateWorkerTimeout = configuration.terminateWorkerTimeout;
	}
	if (configuration.useWebWorkers !== undefined) {
		config.useWebWorkers = configuration.useWebWorkers;
	}
	if (configuration.Deflate !== undefined) {
		config.Deflate = configuration.Deflate;
	}
	if (configuration.Inflate !== undefined) {
		config.Inflate = configuration.Inflate;
	}
	if (configuration.workerScripts !== undefined) {
		if (configuration.workerScripts.deflate) {
			if (!Array.isArray(configuration.workerScripts.deflate)) {
				throw new Error("workerScripts.deflate must be an array");
			}
			if (!config.workerScripts) {
				config.workerScripts = {};
			}
			config.workerScripts.deflate = configuration.workerScripts.deflate;
		}
		if (configuration.workerScripts.inflate) {
			if (!Array.isArray(configuration.workerScripts.inflate)) {
				throw new Error("workerScripts.inflate must be an array");
			}
			if (!config.workerScripts) {
				config.workerScripts = {};
			}
			config.workerScripts.inflate = configuration.workerScripts.inflate;
		}
	}
}

var t=t=>{if("function"==typeof URL.createObjectURL){const e=()=>URL.createObjectURL(new Blob(['const{Array:t,Object:e,Math:n,Error:r,Uint8Array:s,Uint16Array:a,Uint32Array:i,Int32Array:o,DataView:c,Promise:l,TextEncoder:h,crypto:f,postMessage:p,TransformStream:u,ReadableStream:d,WritableStream:g,CompressionStream:w,DecompressionStream:y}=globalThis,v=[];for(let t=0;256>t;t++){let e=t;for(let t=0;8>t;t++)1&e?e=e>>>1^3988292384:e>>>=1;v[t]=e}class m{constructor(t){this.crc=t||-1}append(t){let e=0|this.crc;for(let n=0,r=0|t.length;r>n;n++)e=e>>>8^v[255&(e^t[n])];this.crc=e}get(){return~this.crc}}const b={concat(t,e){if(0===t.length||0===e.length)return t.concat(e);const n=t[t.length-1],r=b.getPartial(n);return 32===r?t.concat(e):b._shiftRight(e,r,0|n,t.slice(0,t.length-1))},bitLength(t){const e=t.length;if(0===e)return 0;const n=t[e-1];return 32*(e-1)+b.getPartial(n)},clamp(t,e){if(32*t.length<e)return t;const r=(t=t.slice(0,n.ceil(e/32))).length;return e&=31,r>0&&e&&(t[r-1]=b.partial(e,t[r-1]&2147483648>>e-1,1)),t},partial:(t,e,n)=>32===t?e:(n?0|e:e<<32-t)+1099511627776*t,getPartial:t=>n.round(t/1099511627776)||32,_shiftRight(t,e,n,r){for(void 0===r&&(r=[]);e>=32;e-=32)r.push(n),n=0;if(0===e)return r.concat(t);for(let s=0;s<t.length;s++)r.push(n|t[s]>>>e),n=t[s]<<32-e;const s=t.length?t[t.length-1]:0,a=b.getPartial(s);return r.push(b.partial(e+a&31,e+a>32?n:r.pop(),1)),r}},_={bytes:{fromBits(t){const e=b.bitLength(t)/8,n=new s(e);let r;for(let s=0;e>s;s++)0==(3&s)&&(r=t[s/4]),n[s]=r>>>24,r<<=8;return n},toBits(t){const e=[];let n,r=0;for(n=0;n<t.length;n++)r=r<<8|t[n],3==(3&n)&&(e.push(r),r=0);return 3&n&&e.push(b.partial(8*(3&n),r)),e}}},k={sha1:function(t){t?(this._h=t._h.slice(0),this._buffer=t._buffer.slice(0),this._length=t._length):this.reset()}};k.sha1.prototype={blockSize:512,reset:function(){const t=this;return t._h=this._init.slice(0),t._buffer=[],t._length=0,t},update:function(t){const e=this;"string"==typeof t&&(t=_.utf8String.toBits(t));const n=e._buffer=b.concat(e._buffer,t),s=e._length,a=e._length=s+b.bitLength(t);if(a>9007199254740991)throw new r("Cannot hash more than 2^53 - 1 bits");const o=new i(n);let c=0;for(let t=e.blockSize+s-(e.blockSize+s&e.blockSize-1);a>=t;t+=e.blockSize)e._block(o.subarray(16*c,16*(c+1))),c+=1;return n.splice(0,16*c),e},finalize:function(){const t=this;let e=t._buffer;const r=t._h;e=b.concat(e,[b.partial(1,1)]);for(let t=e.length+2;15&t;t++)e.push(0);for(e.push(n.floor(t._length/4294967296)),e.push(0|t._length);e.length;)t._block(e.splice(0,16));return t.reset(),r},_init:[1732584193,4023233417,2562383102,271733878,3285377520],_key:[1518500249,1859775393,2400959708,3395469782],_f:(t,e,n,r)=>t>19?t>39?t>59?t>79?void 0:e^n^r:e&n|e&r|n&r:e^n^r:e&n|~e&r,_S:(t,e)=>e<<t|e>>>32-t,_block:function(e){const r=this,s=r._h,a=t(80);for(let t=0;16>t;t++)a[t]=e[t];let i=s[0],o=s[1],c=s[2],l=s[3],h=s[4];for(let t=0;79>=t;t++){16>t||(a[t]=r._S(1,a[t-3]^a[t-8]^a[t-14]^a[t-16]));const e=r._S(5,i)+r._f(t,o,c,l)+h+a[t]+r._key[n.floor(t/20)]|0;h=l,l=c,c=r._S(30,o),o=i,i=e}s[0]=s[0]+i|0,s[1]=s[1]+o|0,s[2]=s[2]+c|0,s[3]=s[3]+l|0,s[4]=s[4]+h|0}};const S=class{constructor(t){const e=this;e._tables=[[[],[],[],[],[]],[[],[],[],[],[]]],e._tables[0][0][0]||e._precompute();const n=e._tables[0][4],s=e._tables[1],a=t.length;let i,o,c,l=1;if(4!==a&&6!==a&&8!==a)throw new r("invalid aes key size");for(e._key=[o=t.slice(0),c=[]],i=a;4*a+28>i;i++){let t=o[i-1];(i%a==0||8===a&&i%a==4)&&(t=n[t>>>24]<<24^n[t>>16&255]<<16^n[t>>8&255]<<8^n[255&t],i%a==0&&(t=t<<8^t>>>24^l<<24,l=l<<1^283*(l>>7))),o[i]=o[i-a]^t}for(let t=0;i;t++,i--){const e=o[3&t?i:i-4];c[t]=4>=i||4>t?e:s[0][n[e>>>24]]^s[1][n[e>>16&255]]^s[2][n[e>>8&255]]^s[3][n[255&e]]}}encrypt(t){return this._crypt(t,0)}decrypt(t){return this._crypt(t,1)}_precompute(){const t=this._tables[0],e=this._tables[1],n=t[4],r=e[4],s=[],a=[];let i,o,c,l;for(let t=0;256>t;t++)a[(s[t]=t<<1^283*(t>>7))^t]=t;for(let h=i=0;!n[h];h^=o||1,i=a[i]||1){let a=i^i<<1^i<<2^i<<3^i<<4;a=a>>8^255&a^99,n[h]=a,r[a]=h,l=s[c=s[o=s[h]]];let f=16843009*l^65537*c^257*o^16843008*h,p=257*s[a]^16843008*a;for(let n=0;4>n;n++)t[n][h]=p=p<<24^p>>>8,e[n][a]=f=f<<24^f>>>8}for(let n=0;5>n;n++)t[n]=t[n].slice(0),e[n]=e[n].slice(0)}_crypt(t,e){if(4!==t.length)throw new r("invalid aes block size");const n=this._key[e],s=n.length/4-2,a=[0,0,0,0],i=this._tables[e],o=i[0],c=i[1],l=i[2],h=i[3],f=i[4];let p,u,d,g=t[0]^n[0],w=t[e?3:1]^n[1],y=t[2]^n[2],v=t[e?1:3]^n[3],m=4;for(let t=0;s>t;t++)p=o[g>>>24]^c[w>>16&255]^l[y>>8&255]^h[255&v]^n[m],u=o[w>>>24]^c[y>>16&255]^l[v>>8&255]^h[255&g]^n[m+1],d=o[y>>>24]^c[v>>16&255]^l[g>>8&255]^h[255&w]^n[m+2],v=o[v>>>24]^c[g>>16&255]^l[w>>8&255]^h[255&y]^n[m+3],m+=4,g=p,w=u,y=d;for(let t=0;4>t;t++)a[e?3&-t:t]=f[g>>>24]<<24^f[w>>16&255]<<16^f[y>>8&255]<<8^f[255&v]^n[m++],p=g,g=w,w=y,y=v,v=p;return a}},z={getRandomValues(t){const e=new i(t.buffer),r=t=>{let e=987654321;const r=4294967295;return()=>(e=36969*(65535&e)+(e>>16)&r,(((e<<16)+(t=18e3*(65535&t)+(t>>16)&r)&r)/4294967296+.5)*(n.random()>.5?1:-1))};for(let s,a=0;a<t.length;a+=4){const t=r(4294967296*(s||n.random()));s=987654071*t(),e[a/4]=4294967296*t()|0}return t}},C=class{constructor(t,e){this._prf=t,this._initIv=e,this._iv=e}reset(){this._iv=this._initIv}update(t){return this.calculate(this._prf,t,this._iv)}incWord(t){if(255==(t>>24&255)){let e=t>>16&255,n=t>>8&255,r=255&t;255===e?(e=0,255===n?(n=0,255===r?r=0:++r):++n):++e,t=0,t+=e<<16,t+=n<<8,t+=r}else t+=1<<24;return t}incCounter(t){0===(t[0]=this.incWord(t[0]))&&(t[1]=this.incWord(t[1]))}calculate(t,e,n){let r;if(!(r=e.length))return[];const s=b.bitLength(e);for(let s=0;r>s;s+=4){this.incCounter(n);const r=t.encrypt(n);e[s]^=r[0],e[s+1]^=r[1],e[s+2]^=r[2],e[s+3]^=r[3]}return b.clamp(e,s)}},I={importKey:t=>new I.hmacSha1(_.bytes.toBits(t)),pbkdf2(t,e,n,s){if(n=n||1e4,0>s||0>n)throw new r("invalid params to pbkdf2");const a=1+(s>>5)<<2;let i,o,l,h,f;const p=new ArrayBuffer(a),u=new c(p);let d=0;const g=b;for(e=_.bytes.toBits(e),f=1;(a||1)>d;f++){for(i=o=t.encrypt(g.concat(e,[f])),l=1;n>l;l++)for(o=t.encrypt(o),h=0;h<o.length;h++)i[h]^=o[h];for(l=0;(a||1)>d&&l<i.length;l++)u.setInt32(d,i[l]),d+=4}return p.slice(0,s/8)},hmacSha1:class{constructor(t){const e=this,n=e._hash=k.sha1,r=[[],[]],s=n.prototype.blockSize/32;e._baseHash=[new n,new n],t.length>s&&(t=n.hash(t));for(let e=0;s>e;e++)r[0][e]=909522486^t[e],r[1][e]=1549556828^t[e];e._baseHash[0].update(r[0]),e._baseHash[1].update(r[1]),e._resultHash=new n(e._baseHash[0])}reset(){const t=this;t._resultHash=new t._hash(t._baseHash[0]),t._updated=!1}update(t){this._updated=!0,this._resultHash.update(t)}digest(){const t=this,e=t._resultHash.finalize(),n=new t._hash(t._baseHash[1]).update(e).finalize();return t.reset(),n}encrypt(t){if(this._updated)throw new r("encrypt on already updated hmac called!");return this.update(t),this.digest(t)}}},B={name:"PBKDF2"},D=e.assign({hash:{name:"HMAC"}},B),T=e.assign({iterations:1e3,hash:{name:"SHA-1"}},B),V=["deriveBits"],E=[8,12,16],H=[16,24,32],K=[0,0,0,0],R=void 0!==f,A=R&&void 0!==f.subtle,x=_.bytes,P=S,W=C,L=I.hmacSha1;class U{constructor(t,n,r){e.assign(this,{password:t,signed:n,strength:r-1,pendingInput:new s(0)})}async append(e){const n=this;if(n.password){const s=O(e,0,E[n.strength]+2);await(async(t,e,n)=>{await F(t,n,O(e,0,E[t.strength]));const s=O(e,E[t.strength]),a=t.keys.passwordVerification;if(a[0]!=s[0]||a[1]!=s[1])throw new r("Invalid pasword")})(n,s,n.password),n.password=null,n.aesCtrGladman=new W(new P(n.keys.key),t.from(K)),n.hmac=new L(n.keys.authentication),e=O(e,E[n.strength]+2)}return M(n,e,new s(e.length-10-(e.length-10)%16),0,10,!0)}flush(){const t=this,e=t.pendingInput,n=O(e,0,e.length-10),r=O(e,e.length-10);let a=new s(0);if(n.length){const e=x.toBits(n);t.hmac.update(e);const r=t.aesCtrGladman.update(e);a=x.fromBits(r)}let i=!0;if(t.signed){const e=O(x.fromBits(t.hmac.digest()),0,10);for(let t=0;10>t;t++)e[t]!=r[t]&&(i=!1)}return{valid:i,data:a}}}class G{constructor(t,n){e.assign(this,{password:t,strength:n-1,pendingInput:new s(0)})}async append(e){const n=this;let r=new s(0);n.password&&(r=await(async(t,e)=>{const n=(r=new s(E[t.strength]),R&&"function"==typeof f.getRandomValues?f.getRandomValues(r):z.getRandomValues(r));var r;return await F(t,e,n),N(n,t.keys.passwordVerification)})(n,n.password),n.password=null,n.aesCtrGladman=new W(new P(n.keys.key),t.from(K)),n.hmac=new L(n.keys.authentication));const a=new s(r.length+e.length-e.length%16);return a.set(r,0),M(n,e,a,r.length,0)}flush(){const t=this;let e=new s(0);if(t.pendingInput.length){const n=t.aesCtrGladman.update(x.toBits(t.pendingInput));t.hmac.update(n),e=x.fromBits(n)}const n=O(x.fromBits(t.hmac.digest()),0,10);return{data:N(e,n),signature:n}}}function M(t,e,n,r,a,i){const o=e.length-a;let c;for(t.pendingInput.length&&(e=N(t.pendingInput,e),n=((t,e)=>{if(e&&e>t.length){const n=t;(t=new s(e)).set(n,0)}return t})(n,o-o%16)),c=0;o-16>=c;c+=16){const s=x.toBits(O(e,c,c+16));i&&t.hmac.update(s);const a=t.aesCtrGladman.update(s);i||t.hmac.update(a),n.set(x.fromBits(a),c+r)}return t.pendingInput=O(e,c),n}async function F(t,n,r){const a=(t=>{if(void 0===h){const e=new s((t=unescape(encodeURIComponent(t))).length);for(let n=0;n<e.length;n++)e[n]=t.charCodeAt(n);return e}return(new h).encode(t)})(n),i=await((t,e,n,r,s)=>R&&A&&"function"==typeof f.subtle.importKey?f.subtle.importKey("raw",e,n,!1,s):I.importKey(e))(0,a,D,0,V),o=await(async(t,e,n)=>R&&A&&"function"==typeof f.subtle.deriveBits?await f.subtle.deriveBits(t,e,n):I.pbkdf2(e,t.salt,T.iterations,n))(e.assign({salt:r},T),i,8*(2*H[t.strength]+2)),c=new s(o);t.keys={key:x.toBits(O(c,0,H[t.strength])),authentication:x.toBits(O(c,H[t.strength],2*H[t.strength])),passwordVerification:O(c,2*H[t.strength])}}function N(t,e){let n=t;return t.length+e.length&&(n=new s(t.length+e.length),n.set(t,0),n.set(e,t.length)),n}function O(t,e,n){return t.subarray(e,n)}class Y{constructor(t,n){e.assign(this,{password:t,passwordVerification:n}),Q(this,t)}append(t){const e=this;if(e.password){const n=q(e,t.subarray(0,12));if(e.password=null,n[11]!=e.passwordVerification)throw new r("Invalid pasword");t=t.subarray(12)}return q(e,t)}flush(){return{valid:!0,data:new s(0)}}}class j{constructor(t,n){e.assign(this,{password:t,passwordVerification:n}),Q(this,t)}append(t){const e=this;let n,r;if(e.password){e.password=null;const a=f.getRandomValues(new s(12));a[11]=e.passwordVerification,n=new s(t.length+a.length),n.set(J(e,a),0),r=12}else n=new s(t.length),r=0;return n.set(J(e,t),r),n}flush(){return{data:new s(0)}}}function q(t,e){const n=new s(e.length);for(let r=0;r<e.length;r++)n[r]=Z(t)^e[r],X(t,n[r]);return n}function J(t,e){const n=new s(e.length);for(let r=0;r<e.length;r++)n[r]=Z(t)^e[r],X(t,e[r]);return n}function Q(t,e){t.keys=[305419896,591751049,878082192],t.crcKey0=new m(t.keys[0]),t.crcKey2=new m(t.keys[2]);for(let n=0;n<e.length;n++)X(t,e.charCodeAt(n))}function X(t,e){t.crcKey0.append([e]),t.keys[0]=~t.crcKey0.get(),t.keys[1]=tt(t.keys[1]+$(t.keys[0])),t.keys[1]=tt(n.imul(t.keys[1],134775813)+1),t.crcKey2.append([t.keys[1]>>>24]),t.keys[2]=~t.crcKey2.get()}function Z(t){const e=2|t.keys[2];return $(n.imul(e,1^e)>>>8)}function $(t){return 255&t}function tt(t){return 4294967295&t}class et{constructor(t,{signature:n,password:r,signed:s,compressed:a,zipCrypto:i,passwordVerification:o,encryptionStrength:c},{chunkSize:l}){const h=!!r;e.assign(this,{signature:n,encrypted:h,signed:s,compressed:a,inflate:a&&new t({chunkSize:l}),crc32:s&&new m,zipCrypto:i,decrypt:h&&i?new Y(r,o):new U(r,s,c)})}async append(t){const e=this;return e.encrypted&&t.length&&(t=await e.decrypt.append(t)),e.compressed&&t.length&&(t=await e.inflate.append(t)),(!e.encrypted||e.zipCrypto)&&e.signed&&t.length&&e.crc32.append(t),t}async flush(){const t=this;let e,n=new s(0);if(t.encrypted){const e=t.decrypt.flush();if(!e.valid)throw new r("Invalid signature");n=e.data}if((!t.encrypted||t.zipCrypto)&&t.signed){const n=new c(new s(4).buffer);if(e=t.crc32.get(),n.setUint32(0,e),t.signature!=n.getUint32(0,!1))throw new r("Invalid signature")}return t.compressed&&(n=await t.inflate.append(n)||new s(0),await t.inflate.flush()),{data:n,signature:e}}}class nt{constructor(t,{encrypted:n,signed:r,compressed:s,level:a,zipCrypto:i,password:o,passwordVerification:c,encryptionStrength:l},{chunkSize:h}){e.assign(this,{encrypted:n,signed:r,compressed:s,deflate:s&&new t({level:a||5,chunkSize:h}),crc32:r&&new m,zipCrypto:i,encrypt:n&&i?new j(o,c):new G(o,l)})}async append(t){const e=this;let n=t;return e.compressed&&t.length&&(n=await e.deflate.append(t)),e.encrypted&&n.length&&(n=await e.encrypt.append(n)),(!e.encrypted||e.zipCrypto)&&e.signed&&t.length&&e.crc32.append(t),n}async flush(){const t=this;let e,n=new s(0);if(t.compressed&&(n=await t.deflate.flush()||new s(0)),t.encrypted){n=await t.encrypt.append(n);const r=t.encrypt.flush();e=r.signature;const a=new s(n.length+r.data.length);a.set(n,0),a.set(r.data,n.length),n=a}return t.encrypted&&!t.zipCrypto||!t.signed||(e=t.crc32.get()),{data:n,signature:e}}}const rt={init(t){t.scripts&&t.scripts.length&&importScripts.apply(void 0,t.scripts);const e=t.options;let n;self.initCodec&&self.initCodec(),e.codecType.startsWith("deflate")?n=self.Deflate:e.codecType.startsWith("inflate")&&(n=self.Inflate),st=((t,e,n)=>e.codecType.startsWith("deflate")?new nt(t,e,n):e.codecType.startsWith("inflate")?new et(t,e,n):void 0)(n,e,t.config)},append:async t=>({data:await st.append(t.data)}),flush:()=>st.flush()};let st;addEventListener("message",(async t=>{const e=t.data,n=e.type,r=rt[n];if(r)try{e.data&&(e.data=new s(e.data));const t=await r(e)||{};if(t.type=n,t.data)try{t.data=t.data.buffer,p(t,[t.data])}catch(e){p(t)}else p(t)}catch(t){p({type:n,error:{message:t.message,stack:t.stack}})}}));var at=s,it=a,ot=i,ct=new at([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),lt=new at([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),ht=new at([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),ft=(t,e)=>{for(var n=new it(31),r=0;31>r;++r)n[r]=e+=1<<t[r-1];var s=new ot(n[30]);for(r=1;30>r;++r)for(var a=n[r];a<n[r+1];++a)s[a]=a-n[r]<<5|r;return[n,s]},pt=ft(ct,2),ut=pt[0],dt=pt[1];ut[28]=258,dt[258]=28;for(var gt=ft(lt,0),wt=gt[0],yt=gt[1],vt=new it(32768),mt=0;32768>mt;++mt){var bt=(43690&mt)>>>1|(21845&mt)<<1;bt=(61680&(bt=(52428&bt)>>>2|(13107&bt)<<2))>>>4|(3855&bt)<<4,vt[mt]=((65280&bt)>>>8|(255&bt)<<8)>>>1}var _t=(t,e,n)=>{for(var r=t.length,s=0,a=new it(e);r>s;++s)t[s]&&++a[t[s]-1];var i,o=new it(e);for(s=0;e>s;++s)o[s]=o[s-1]+a[s-1]<<1;if(n){i=new it(1<<e);var c=15-e;for(s=0;r>s;++s)if(t[s])for(var l=s<<4|t[s],h=e-t[s],f=o[t[s]-1]++<<h,p=f|(1<<h)-1;p>=f;++f)i[vt[f]>>>c]=l}else for(i=new it(r),s=0;r>s;++s)t[s]&&(i[s]=vt[o[t[s]-1]++]>>>15-t[s]);return i},kt=new at(288);for(mt=0;144>mt;++mt)kt[mt]=8;for(mt=144;256>mt;++mt)kt[mt]=9;for(mt=256;280>mt;++mt)kt[mt]=7;for(mt=280;288>mt;++mt)kt[mt]=8;var St=new at(32);for(mt=0;32>mt;++mt)St[mt]=5;var zt=_t(kt,9,0),Ct=_t(kt,9,1),It=_t(St,5,0),Bt=_t(St,5,1),Dt=t=>{for(var e=t[0],n=1;n<t.length;++n)t[n]>e&&(e=t[n]);return e},Tt=(t,e,n)=>{var r=e/8|0;return(t[r]|t[r+1]<<8)>>(7&e)&n},Vt=(t,e)=>{var n=e/8|0;return(t[n]|t[n+1]<<8|t[n+2]<<16)>>(7&e)},Et=t=>(t+7)/8|0,Ht=(t,e,n)=>{(null==e||0>e)&&(e=0),(null==n||n>t.length)&&(n=t.length);var r=new(2==t.BYTES_PER_ELEMENT?it:4==t.BYTES_PER_ELEMENT?ot:at)(n-e);return r.set(t.subarray(e,n)),r},Kt=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],Rt=(t,e,n)=>{var s=new r(e||Kt[t]);if(s.code=t,r.captureStackTrace&&r.captureStackTrace(s,Rt),!n)throw s;return s},At=(t,e,n)=>{n<<=7&e;var r=e/8|0;t[r]|=n,t[r+1]|=n>>>8},xt=(t,e,n)=>{n<<=7&e;var r=e/8|0;t[r]|=n,t[r+1]|=n>>>8,t[r+2]|=n>>>16},Pt=(t,e)=>{for(var n=[],r=0;r<t.length;++r)t[r]&&n.push({s:r,f:t[r]});var s=n.length,a=n.slice();if(!s)return[Nt,0];if(1==s){var i=new at(n[0].s+1);return i[n[0].s]=1,[i,1]}n.sort(((t,e)=>t.f-e.f)),n.push({s:-1,f:25001});var o=n[0],c=n[1],l=0,h=1,f=2;for(n[0]={s:-1,f:o.f+c.f,l:o,r:c};h!=s-1;)o=n[n[l].f<n[f].f?l++:f++],c=n[l!=h&&n[l].f<n[f].f?l++:f++],n[h++]={s:-1,f:o.f+c.f,l:o,r:c};var p=a[0].s;for(r=1;s>r;++r)a[r].s>p&&(p=a[r].s);var u=new it(p+1),d=Wt(n[h-1],u,0);if(d>e){r=0;var g=0,w=d-e,y=1<<w;for(a.sort(((t,e)=>u[e.s]-u[t.s]||t.f-e.f));s>r;++r){var v=a[r].s;if(u[v]<=e)break;g+=y-(1<<d-u[v]),u[v]=e}for(g>>>=w;g>0;){var m=a[r].s;u[m]<e?g-=1<<e-u[m]++-1:++r}for(;r>=0&&g;--r){var b=a[r].s;u[b]==e&&(--u[b],++g)}d=e}return[new at(u),d]},Wt=(t,e,r)=>-1==t.s?n.max(Wt(t.l,e,r+1),Wt(t.r,e,r+1)):e[t.s]=r,Lt=t=>{for(var e=t.length;e&&!t[--e];);for(var n=new it(++e),r=0,s=t[0],a=1,i=t=>{n[r++]=t},o=1;e>=o;++o)if(t[o]==s&&o!=e)++a;else{if(!s&&a>2){for(;a>138;a-=138)i(32754);a>2&&(i(a>10?a-11<<5|28690:a-3<<5|12305),a=0)}else if(a>3){for(i(s),--a;a>6;a-=6)i(8304);a>2&&(i(a-3<<5|8208),a=0)}for(;a--;)i(s);a=1,s=t[o]}return[n.subarray(0,r),e]},Ut=(t,e)=>{for(var n=0,r=0;r<e.length;++r)n+=t[r]*e[r];return n},Gt=(t,e,n)=>{var r=n.length,s=Et(e+2);t[s]=255&r,t[s+1]=r>>>8,t[s+2]=255^t[s],t[s+3]=255^t[s+1];for(var a=0;r>a;++a)t[s+a+4]=n[a];return 8*(s+4+r)},Mt=(t,e,n,r,s,a,i,o,c,l,h)=>{At(e,h++,n),++s[256];for(var f=Pt(s,15),p=f[0],u=f[1],d=Pt(a,15),g=d[0],w=d[1],y=Lt(p),v=y[0],m=y[1],b=Lt(g),_=b[0],k=b[1],S=new it(19),z=0;z<v.length;++z)S[31&v[z]]++;for(z=0;z<_.length;++z)S[31&_[z]]++;for(var C=Pt(S,7),I=C[0],B=C[1],D=19;D>4&&!I[ht[D-1]];--D);var T,V,E,H,K=l+5<<3,R=Ut(s,kt)+Ut(a,St)+i,A=Ut(s,p)+Ut(a,g)+i+14+3*D+Ut(S,I)+(2*S[16]+3*S[17]+7*S[18]);if(R>=K&&A>=K)return Gt(e,h,t.subarray(c,c+l));if(At(e,h,1+(R>A)),h+=2,R>A){T=_t(p,u,0),V=p,E=_t(g,w,0),H=g;var x=_t(I,B,0);for(At(e,h,m-257),At(e,h+5,k-1),At(e,h+10,D-4),h+=14,z=0;D>z;++z)At(e,h+3*z,I[ht[z]]);h+=3*D;for(var P=[v,_],W=0;2>W;++W){var L=P[W];for(z=0;z<L.length;++z){var U=31&L[z];At(e,h,x[U]),h+=I[U],U>15&&(At(e,h,L[z]>>>5&127),h+=L[z]>>>12)}}}else T=zt,V=kt,E=It,H=St;for(z=0;o>z;++z)if(r[z]>255){U=r[z]>>>18&31,xt(e,h,T[U+257]),h+=V[U+257],U>7&&(At(e,h,r[z]>>>23&31),h+=ct[U]);var G=31&r[z];xt(e,h,E[G]),h+=H[G],G>3&&(xt(e,h,r[z]>>>5&8191),h+=lt[G])}else xt(e,h,T[r[z]]),h+=V[r[z]];return xt(e,h,T[256]),h+V[256]},Ft=new ot([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),Nt=new at(0),Ot=function(){function t(t,e){e||"function"!=typeof t||(e=t,t={}),this.ondata=e,this.o=t||{}}return t.prototype.p=function(t,e){var r,s,a;this.ondata((0,0,a=!e,((t,e,r,s,a,i)=>{var o=t.length,c=new at(0+o+5*(1+n.ceil(o/7e3))+0),l=c.subarray(0,c.length-0),h=0;if(!e||8>o)for(var f=0;o>=f;f+=65535){var p=f+65535;o>p||(l[h>>3]=i),h=Gt(l,h+1,t.subarray(f,p))}else{for(var u=Ft[e-1],d=u>>>13,g=8191&u,w=(1<<r)-1,y=new it(32768),v=new it(w+1),m=n.ceil(r/3),b=2*m,_=e=>(t[e]^t[e+1]<<m^t[e+2]<<b)&w,k=new ot(25e3),S=new it(288),z=new it(32),C=0,I=0,B=(f=0,0),D=0,T=0;o>f;++f){var V=_(f),E=32767&f,H=v[V];if(y[E]=H,v[V]=E,f>=D){var K=o-f;if((C>7e3||B>24576)&&K>423){h=Mt(t,l,0,k,S,z,I,B,T,f-T,h),B=C=I=0,T=f;for(var R=0;286>R;++R)S[R]=0;for(R=0;30>R;++R)z[R]=0}var A=2,x=0,P=g,W=E-H&32767;if(K>2&&V==_(f-W))for(var L=n.min(d,K)-1,U=n.min(32767,f),G=n.min(258,K);U>=W&&--P&&E!=H;){if(t[f+A]==t[f+A-W]){for(var M=0;G>M&&t[f+M]==t[f+M-W];++M);if(M>A){if(A=M,x=W,M>L)break;var F=n.min(W,M-2),N=0;for(R=0;F>R;++R){var O=f-W+R+32768&32767,Y=O-y[O]+32768&32767;Y>N&&(N=Y,H=O)}}}W+=(E=H)-(H=y[E])+32768&32767}if(x){k[B++]=268435456|dt[A]<<18|yt[x];var j=31&dt[A],q=31&yt[x];I+=ct[j]+lt[q],++S[257+j],++z[q],D=f+A,++C}else k[B++]=t[f],++S[t[f]]}}h=Mt(t,l,i,k,S,z,I,B,T,f-T,h),!i&&7&h&&(h=Gt(l,h+1,Nt))}return Ht(c,0,0+Et(h)+0)})(r=t,null==(s=this.o).level?6:s.level,null==s.mem?n.ceil(1.5*n.max(8,n.min(13,n.log(r.length)))):12+s.mem,0,0,!a)),e)},t.prototype.push=function(t,e){this.ondata||Rt(5),this.d&&Rt(4),this.d=e,this.p(t,e||!1)},t}(),Yt=function(){function t(t){this.s={},this.p=new at(0),this.ondata=t}return t.prototype.e=function(t){this.ondata||Rt(5),this.d&&Rt(4);var e=this.p.length,n=new at(e+t.length);n.set(this.p),n.set(t,e),this.p=n},t.prototype.c=function(t){this.d=this.s.i=t||!1;var e=this.s.b,r=((t,e,r)=>{var s=t.length;if(!s||r&&r.f&&!r.l)return e||new at(0);var a=!e||r,i=!r||r.i;r||(r={}),e||(e=new at(3*s));var o=t=>{var r=e.length;if(t>r){var s=new at(n.max(2*r,t));s.set(e),e=s}},c=r.f||0,l=r.p||0,h=r.b||0,f=r.l,p=r.d,u=r.m,d=r.n,g=8*s;do{if(!f){c=Tt(t,l,1);var w=Tt(t,l+1,3);if(l+=3,!w){var y=t[(D=Et(l)+4)-4]|t[D-3]<<8,v=D+y;if(v>s){i&&Rt(0);break}a&&o(h+y),e.set(t.subarray(D,v),h),r.b=h+=y,r.p=l=8*v,r.f=c;continue}if(1==w)f=Ct,p=Bt,u=9,d=5;else if(2==w){var m=Tt(t,l,31)+257,b=Tt(t,l+10,15)+4,_=m+Tt(t,l+5,31)+1;l+=14;for(var k=new at(_),S=new at(19),z=0;b>z;++z)S[ht[z]]=Tt(t,l+3*z,7);l+=3*b;var C=Dt(S),I=(1<<C)-1,B=_t(S,C,1);for(z=0;_>z;){var D,T=B[Tt(t,l,I)];if(l+=15&T,16>(D=T>>>4))k[z++]=D;else{var V=0,E=0;for(16==D?(E=3+Tt(t,l,3),l+=2,V=k[z-1]):17==D?(E=3+Tt(t,l,7),l+=3):18==D&&(E=11+Tt(t,l,127),l+=7);E--;)k[z++]=V}}var H=k.subarray(0,m),K=k.subarray(m);u=Dt(H),d=Dt(K),f=_t(H,u,1),p=_t(K,d,1)}else Rt(1);if(l>g){i&&Rt(0);break}}a&&o(h+131072);for(var R=(1<<u)-1,A=(1<<d)-1,x=l;;x=l){var P=(V=f[Vt(t,l)&R])>>>4;if((l+=15&V)>g){i&&Rt(0);break}if(V||Rt(2),256>P)e[h++]=P;else{if(256==P){x=l,f=null;break}var W=P-254;if(P>264){var L=ct[z=P-257];W=Tt(t,l,(1<<L)-1)+ut[z],l+=L}var U=p[Vt(t,l)&A],G=U>>>4;if(U||Rt(3),l+=15&U,K=wt[G],G>3&&(L=lt[G],K+=Vt(t,l)&(1<<L)-1,l+=L),l>g){i&&Rt(0);break}a&&o(h+131072);for(var M=h+W;M>h;h+=4)e[h]=e[h-K],e[h+1]=e[h+1-K],e[h+2]=e[h+2-K],e[h+3]=e[h+3-K];h=M}}r.l=f,r.p=x,r.b=h,r.f=c,f&&(c=1,r.m=u,r.d=p,r.n=d)}while(!c);return h==e.length?e:Ht(e,0,h)})(this.p,this.o,this.s);this.ondata(Ht(r,e,this.s.b),this.d),this.o=Ht(r,this.s.b-32768),this.s.b=this.o.length,this.p=Ht(this.p,this.s.p/8|0),this.s.p&=7},t.prototype.push=function(t,e){this.e(t),this.c(e)},t}(),jt="undefined"!=typeof TextDecoder&&new TextDecoder;try{jt.decode(Nt,{stream:!0})}catch(t){}function qt(t,n,r){return class{constructor(a){const i=this;i.codec=new t(e.assign({},n,a)),r(i.codec,(t=>{if(i.pendingData){const e=i.pendingData;i.pendingData=new s(e.length+t.length),i.pendingData.set(e,0),i.pendingData.set(t,e.length)}else i.pendingData=new s(t)}))}append(t){return this.codec.push(t),a(this)}flush(){return this.codec.push(new s(0),!0),a(this)}};function a(t){if(t.pendingData){const e=t.pendingData;return t.pendingData=null,e}return new s(0)}}const{Deflate:Jt,Inflate:Qt}=((t,e={},n)=>({Deflate:qt(t.Deflate,e.deflate,n),Inflate:qt(t.Inflate,e.inflate,n)}))({Deflate:Ot,Inflate:Yt},void 0,((t,e)=>t.ondata=e));self.initCodec=()=>{self.Deflate=Jt,self.Inflate=Qt};\n'],{type:"text/javascript"}));t({workerScripts:{inflate:[e],deflate:[e]}});}};

/*
 Copyright (c) 2022 Gildas Lormeau. All rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 1. Redistributions of source code must retain the above copyright notice,
 this list of conditions and the following disclaimer.

 2. Redistributions in binary form must reproduce the above copyright 
 notice, this list of conditions and the following disclaimer in 
 the documentation and/or other materials provided with the distribution.

 3. The names of the authors may not be used to endorse or promote products
 derived from this software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED ''AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
 INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
 INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
 INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
 OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

function getMimeType() {
	return "application/octet-stream";
}

/*
 Copyright (c) 2022 Gildas Lormeau. All rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 1. Redistributions of source code must retain the above copyright notice,
 this list of conditions and the following disclaimer.

 2. Redistributions in binary form must reproduce the above copyright 
 notice, this list of conditions and the following disclaimer in 
 the documentation and/or other materials provided with the distribution.

 3. The names of the authors may not be used to endorse or promote products
 derived from this software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED ''AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
 INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
 INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
 INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
 OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

var streamCodecShim = (library, options = {}, registerDataHandler) => {
	return {
		Deflate: createCodecClass(library.Deflate, options.deflate, registerDataHandler),
		Inflate: createCodecClass(library.Inflate, options.inflate, registerDataHandler)
	};
};

function createCodecClass(constructor, constructorOptions, registerDataHandler) {
	return class {

		constructor(options) {
			const codecAdapter = this;
			const onData = data => {
				if (codecAdapter.pendingData) {
					const pendingData = codecAdapter.pendingData;
					codecAdapter.pendingData = new Uint8Array(pendingData.length + data.length);
					codecAdapter.pendingData.set(pendingData, 0);
					codecAdapter.pendingData.set(data, pendingData.length);
				} else {
					codecAdapter.pendingData = new Uint8Array(data);
				}
			};
			codecAdapter.codec = new constructor(Object.assign({}, constructorOptions, options));
			registerDataHandler(codecAdapter.codec, onData);
		}
		append(data) {
			this.codec.push(data);
			return getResponse(this);
		}
		flush() {
			this.codec.push(new Uint8Array(0), true);
			return getResponse(this);
		}
	};

	function getResponse(codec) {
		if (codec.pendingData) {
			const output = codec.pendingData;
			codec.pendingData = null;
			return output;
		} else {
			return new Uint8Array(0);
		}
	}
}

/*
 Copyright (c) 2022 Gildas Lormeau. All rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 1. Redistributions of source code must retain the above copyright notice,
 this list of conditions and the following disclaimer.

 2. Redistributions in binary form must reproduce the above copyright 
 notice, this list of conditions and the following disclaimer in 
 the documentation and/or other materials provided with the distribution.

 3. The names of the authors may not be used to endorse or promote products
 derived from this software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED ''AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
 INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
 INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
 INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
 OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

const table = [];
for (let i = 0; i < 256; i++) {
	let t = i;
	for (let j = 0; j < 8; j++) {
		if (t & 1) {
			t = (t >>> 1) ^ 0xEDB88320;
		} else {
			t = t >>> 1;
		}
	}
	table[i] = t;
}

class Crc32 {

	constructor(crc) {
		this.crc = crc || -1;
	}

	append(data) {
		let crc = this.crc | 0;
		for (let offset = 0, length = data.length | 0; offset < length; offset++) {
			crc = (crc >>> 8) ^ table[(crc ^ data[offset]) & 0xFF];
		}
		this.crc = crc;
	}

	get() {
		return ~this.crc;
	}
}

/*
 Copyright (c) 2022 Gildas Lormeau. All rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 1. Redistributions of source code must retain the above copyright notice,
 this list of conditions and the following disclaimer.

 2. Redistributions in binary form must reproduce the above copyright 
 notice, this list of conditions and the following disclaimer in 
 the documentation and/or other materials provided with the distribution.

 3. The names of the authors may not be used to endorse or promote products
 derived from this software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED ''AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
 INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
 INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
 INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
 OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

function encodeText(value) {
	if (typeof TextEncoder == "undefined") {
		value = unescape(encodeURIComponent(value));
		const result = new Uint8Array(value.length);
		for (let i = 0; i < result.length; i++) {
			result[i] = value.charCodeAt(i);
		}
		return result;
	} else {
		return new TextEncoder().encode(value);
	}
}

// Derived from https://github.com/xqdoo00o/jszip/blob/master/lib/sjcl.js and https://github.com/bitwiseshiftleft/sjcl

/*// deno-lint-ignore-file no-this-alias *

/*
 * SJCL is open. You can use, modify and redistribute it under a BSD
 * license or under the GNU GPL, version 2.0.
 */

/** @fileOverview Javascript cryptography implementation.
 *
 * Crush to remove comments, shorten variable names and
 * generally reduce transmission size.
 *
 * @author Emily Stark
 * @author Mike Hamburg
 * @author Dan Boneh
 */

/*jslint indent: 2, bitwise: false, nomen: false, plusplus: false, white: false, regexp: false */

/** @fileOverview Arrays of bits, encoded as arrays of Numbers.
 *
 * @author Emily Stark
 * @author Mike Hamburg
 * @author Dan Boneh
 */

/**
 * Arrays of bits, encoded as arrays of Numbers.
 * @namespace
 * @description
 * <p>
 * These objects are the currency accepted by SJCL's crypto functions.
 * </p>
 *
 * <p>
 * Most of our crypto primitives operate on arrays of 4-byte words internally,
 * but many of them can take arguments that are not a multiple of 4 bytes.
 * This library encodes arrays of bits (whose size need not be a multiple of 8
 * bits) as arrays of 32-bit words.  The bits are packed, big-endian, into an
 * array of words, 32 bits at a time.  Since the words are double-precision
 * floating point numbers, they fit some extra data.  We use this (in a private,
 * possibly-changing manner) to encode the number of bits actually  present
 * in the last word of the array.
 * </p>
 *
 * <p>
 * Because bitwise ops clear this out-of-band data, these arrays can be passed
 * to ciphers like AES which want arrays of words.
 * </p>
 */
const bitArray = {
	/**
	 * Concatenate two bit arrays.
	 * @param {bitArray} a1 The first array.
	 * @param {bitArray} a2 The second array.
	 * @return {bitArray} The concatenation of a1 and a2.
	 */
	concat(a1, a2) {
		if (a1.length === 0 || a2.length === 0) {
			return a1.concat(a2);
		}

		const last = a1[a1.length - 1], shift = bitArray.getPartial(last);
		if (shift === 32) {
			return a1.concat(a2);
		} else {
			return bitArray._shiftRight(a2, shift, last | 0, a1.slice(0, a1.length - 1));
		}
	},

	/**
	 * Find the length of an array of bits.
	 * @param {bitArray} a The array.
	 * @return {Number} The length of a, in bits.
	 */
	bitLength(a) {
		const l = a.length;
		if (l === 0) {
			return 0;
		}
		const x = a[l - 1];
		return (l - 1) * 32 + bitArray.getPartial(x);
	},

	/**
	 * Truncate an array.
	 * @param {bitArray} a The array.
	 * @param {Number} len The length to truncate to, in bits.
	 * @return {bitArray} A new array, truncated to len bits.
	 */
	clamp(a, len) {
		if (a.length * 32 < len) {
			return a;
		}
		a = a.slice(0, Math.ceil(len / 32));
		const l = a.length;
		len = len & 31;
		if (l > 0 && len) {
			a[l - 1] = bitArray.partial(len, a[l - 1] & 0x80000000 >> (len - 1), 1);
		}
		return a;
	},

	/**
	 * Make a partial word for a bit array.
	 * @param {Number} len The number of bits in the word.
	 * @param {Number} x The bits.
	 * @param {Number} [_end=0] Pass 1 if x has already been shifted to the high side.
	 * @return {Number} The partial word.
	 */
	partial(len, x, _end) {
		if (len === 32) {
			return x;
		}
		return (_end ? x | 0 : x << (32 - len)) + len * 0x10000000000;
	},

	/**
	 * Get the number of bits used by a partial word.
	 * @param {Number} x The partial word.
	 * @return {Number} The number of bits used by the partial word.
	 */
	getPartial(x) {
		return Math.round(x / 0x10000000000) || 32;
	},

	/** Shift an array right.
	 * @param {bitArray} a The array to shift.
	 * @param {Number} shift The number of bits to shift.
	 * @param {Number} [carry=0] A byte to carry in
	 * @param {bitArray} [out=[]] An array to prepend to the output.
	 * @private
	 */
	_shiftRight(a, shift, carry, out) {
		if (out === undefined) {
			out = [];
		}

		for (; shift >= 32; shift -= 32) {
			out.push(carry);
			carry = 0;
		}
		if (shift === 0) {
			return out.concat(a);
		}

		for (let i = 0; i < a.length; i++) {
			out.push(carry | a[i] >>> shift);
			carry = a[i] << (32 - shift);
		}
		const last2 = a.length ? a[a.length - 1] : 0;
		const shift2 = bitArray.getPartial(last2);
		out.push(bitArray.partial(shift + shift2 & 31, (shift + shift2 > 32) ? carry : out.pop(), 1));
		return out;
	}
};

/** @fileOverview Bit array codec implementations.
 *
 * @author Emily Stark
 * @author Mike Hamburg
 * @author Dan Boneh
 */

/**
 * Arrays of bytes
 * @namespace
 */
const codec = {
	bytes: {
		/** Convert from a bitArray to an array of bytes. */
		fromBits(arr) {
			const bl = bitArray.bitLength(arr);
			const byteLength = bl / 8;
			const out = new Uint8Array(byteLength);
			let tmp;
			for (let i = 0; i < byteLength; i++) {
				if ((i & 3) === 0) {
					tmp = arr[i / 4];
				}
				out[i] = tmp >>> 24;
				tmp <<= 8;
			}
			return out;
		},
		/** Convert from an array of bytes to a bitArray. */
		toBits(bytes) {
			const out = [];
			let i;
			let tmp = 0;
			for (i = 0; i < bytes.length; i++) {
				tmp = tmp << 8 | bytes[i];
				if ((i & 3) === 3) {
					out.push(tmp);
					tmp = 0;
				}
			}
			if (i & 3) {
				out.push(bitArray.partial(8 * (i & 3), tmp));
			}
			return out;
		}
	}
};

const hash = {};

/**
 * Context for a SHA-1 operation in progress.
 * @constructor
 */
hash.sha1 = function (hash) {
	if (hash) {
		this._h = hash._h.slice(0);
		this._buffer = hash._buffer.slice(0);
		this._length = hash._length;
	} else {
		this.reset();
	}
};

hash.sha1.prototype = {
	/**
	 * The hash's block size, in bits.
	 * @constant
	 */
	blockSize: 512,

	/**
	 * Reset the hash state.
	 * @return this
	 */
	reset: function () {
		const sha1 = this;
		sha1._h = this._init.slice(0);
		sha1._buffer = [];
		sha1._length = 0;
		return sha1;
	},

	/**
	 * Input several words to the hash.
	 * @param {bitArray|String} data the data to hash.
	 * @return this
	 */
	update: function (data) {
		const sha1 = this;
		if (typeof data === "string") {
			data = codec.utf8String.toBits(data);
		}
		const b = sha1._buffer = bitArray.concat(sha1._buffer, data);
		const ol = sha1._length;
		const nl = sha1._length = ol + bitArray.bitLength(data);
		if (nl > 9007199254740991) {
			throw new Error("Cannot hash more than 2^53 - 1 bits");
		}
		const c = new Uint32Array(b);
		let j = 0;
		for (let i = sha1.blockSize + ol - ((sha1.blockSize + ol) & (sha1.blockSize - 1)); i <= nl;
			i += sha1.blockSize) {
			sha1._block(c.subarray(16 * j, 16 * (j + 1)));
			j += 1;
		}
		b.splice(0, 16 * j);
		return sha1;
	},

	/**
	 * Complete hashing and output the hash value.
	 * @return {bitArray} The hash value, an array of 5 big-endian words. TODO
	 */
	finalize: function () {
		const sha1 = this;
		let b = sha1._buffer;
		const h = sha1._h;

		// Round out and push the buffer
		b = bitArray.concat(b, [bitArray.partial(1, 1)]);
		// Round out the buffer to a multiple of 16 words, less the 2 length words.
		for (let i = b.length + 2; i & 15; i++) {
			b.push(0);
		}

		// append the length
		b.push(Math.floor(sha1._length / 0x100000000));
		b.push(sha1._length | 0);

		while (b.length) {
			sha1._block(b.splice(0, 16));
		}

		sha1.reset();
		return h;
	},

	/**
	 * The SHA-1 initialization vector.
	 * @private
	 */
	_init: [0x67452301, 0xEFCDAB89, 0x98BADCFE, 0x10325476, 0xC3D2E1F0],

	/**
	 * The SHA-1 hash key.
	 * @private
	 */
	_key: [0x5A827999, 0x6ED9EBA1, 0x8F1BBCDC, 0xCA62C1D6],

	/**
	 * The SHA-1 logical functions f(0), f(1), ..., f(79).
	 * @private
	 */
	_f: function (t, b, c, d) {
		if (t <= 19) {
			return (b & c) | (~b & d);
		} else if (t <= 39) {
			return b ^ c ^ d;
		} else if (t <= 59) {
			return (b & c) | (b & d) | (c & d);
		} else if (t <= 79) {
			return b ^ c ^ d;
		}
	},

	/**
	 * Circular left-shift operator.
	 * @private
	 */
	_S: function (n, x) {
		return (x << n) | (x >>> 32 - n);
	},

	/**
	 * Perform one cycle of SHA-1.
	 * @param {Uint32Array|bitArray} words one block of words.
	 * @private
	 */
	_block: function (words) {
		const sha1 = this;
		const h = sha1._h;
		// When words is passed to _block, it has 16 elements. SHA1 _block
		// function extends words with new elements (at the end there are 80 elements). 
		// The problem is that if we use Uint32Array instead of Array, 
		// the length of Uint32Array cannot be changed. Thus, we replace words with a 
		// normal Array here.
		const w = Array(80); // do not use Uint32Array here as the instantiation is slower
		for (let j = 0; j < 16; j++) {
			w[j] = words[j];
		}

		let a = h[0];
		let b = h[1];
		let c = h[2];
		let d = h[3];
		let e = h[4];

		for (let t = 0; t <= 79; t++) {
			if (t >= 16) {
				w[t] = sha1._S(1, w[t - 3] ^ w[t - 8] ^ w[t - 14] ^ w[t - 16]);
			}
			const tmp = (sha1._S(5, a) + sha1._f(t, b, c, d) + e + w[t] +
				sha1._key[Math.floor(t / 20)]) | 0;
			e = d;
			d = c;
			c = sha1._S(30, b);
			b = a;
			a = tmp;
		}

		h[0] = (h[0] + a) | 0;
		h[1] = (h[1] + b) | 0;
		h[2] = (h[2] + c) | 0;
		h[3] = (h[3] + d) | 0;
		h[4] = (h[4] + e) | 0;
	}
};

/** @fileOverview Low-level AES implementation.
 *
 * This file contains a low-level implementation of AES, optimized for
 * size and for efficiency on several browsers.  It is based on
 * OpenSSL's aes_core.c, a public-domain implementation by Vincent
 * Rijmen, Antoon Bosselaers and Paulo Barreto.
 *
 * An older version of this implementation is available in the public
 * domain, but this one is (c) Emily Stark, Mike Hamburg, Dan Boneh,
 * Stanford University 2008-2010 and BSD-licensed for liability
 * reasons.
 *
 * @author Emily Stark
 * @author Mike Hamburg
 * @author Dan Boneh
 */

const cipher = {};

/**
 * Schedule out an AES key for both encryption and decryption.  This
 * is a low-level class.  Use a cipher mode to do bulk encryption.
 *
 * @constructor
 * @param {Array} key The key as an array of 4, 6 or 8 words.
 */
cipher.aes = class {
	constructor(key) {
		/**
		 * The expanded S-box and inverse S-box tables.  These will be computed
		 * on the client so that we don't have to send them down the wire.
		 *
		 * There are two tables, _tables[0] is for encryption and
		 * _tables[1] is for decryption.
		 *
		 * The first 4 sub-tables are the expanded S-box with MixColumns.  The
		 * last (_tables[01][4]) is the S-box itself.
		 *
		 * @private
		 */
		const aes = this;
		aes._tables = [[[], [], [], [], []], [[], [], [], [], []]];

		if (!aes._tables[0][0][0]) {
			aes._precompute();
		}

		const sbox = aes._tables[0][4];
		const decTable = aes._tables[1];
		const keyLen = key.length;

		let i, encKey, decKey, rcon = 1;

		if (keyLen !== 4 && keyLen !== 6 && keyLen !== 8) {
			throw new Error("invalid aes key size");
		}

		aes._key = [encKey = key.slice(0), decKey = []];

		// schedule encryption keys
		for (i = keyLen; i < 4 * keyLen + 28; i++) {
			let tmp = encKey[i - 1];

			// apply sbox
			if (i % keyLen === 0 || (keyLen === 8 && i % keyLen === 4)) {
				tmp = sbox[tmp >>> 24] << 24 ^ sbox[tmp >> 16 & 255] << 16 ^ sbox[tmp >> 8 & 255] << 8 ^ sbox[tmp & 255];

				// shift rows and add rcon
				if (i % keyLen === 0) {
					tmp = tmp << 8 ^ tmp >>> 24 ^ rcon << 24;
					rcon = rcon << 1 ^ (rcon >> 7) * 283;
				}
			}

			encKey[i] = encKey[i - keyLen] ^ tmp;
		}

		// schedule decryption keys
		for (let j = 0; i; j++, i--) {
			const tmp = encKey[j & 3 ? i : i - 4];
			if (i <= 4 || j < 4) {
				decKey[j] = tmp;
			} else {
				decKey[j] = decTable[0][sbox[tmp >>> 24]] ^
					decTable[1][sbox[tmp >> 16 & 255]] ^
					decTable[2][sbox[tmp >> 8 & 255]] ^
					decTable[3][sbox[tmp & 255]];
			}
		}
	}
	// public
	/* Something like this might appear here eventually
	name: "AES",
	blockSize: 4,
	keySizes: [4,6,8],
	*/

	/**
	 * Encrypt an array of 4 big-endian words.
	 * @param {Array} data The plaintext.
	 * @return {Array} The ciphertext.
	 */
	encrypt(data) {
		return this._crypt(data, 0);
	}

	/**
	 * Decrypt an array of 4 big-endian words.
	 * @param {Array} data The ciphertext.
	 * @return {Array} The plaintext.
	 */
	decrypt(data) {
		return this._crypt(data, 1);
	}

	/**
	 * Expand the S-box tables.
	 *
	 * @private
	 */
	_precompute() {
		const encTable = this._tables[0];
		const decTable = this._tables[1];
		const sbox = encTable[4];
		const sboxInv = decTable[4];
		const d = [];
		const th = [];
		let xInv, x2, x4, x8;

		// Compute double and third tables
		for (let i = 0; i < 256; i++) {
			th[(d[i] = i << 1 ^ (i >> 7) * 283) ^ i] = i;
		}

		for (let x = xInv = 0; !sbox[x]; x ^= x2 || 1, xInv = th[xInv] || 1) {
			// Compute sbox
			let s = xInv ^ xInv << 1 ^ xInv << 2 ^ xInv << 3 ^ xInv << 4;
			s = s >> 8 ^ s & 255 ^ 99;
			sbox[x] = s;
			sboxInv[s] = x;

			// Compute MixColumns
			x8 = d[x4 = d[x2 = d[x]]];
			let tDec = x8 * 0x1010101 ^ x4 * 0x10001 ^ x2 * 0x101 ^ x * 0x1010100;
			let tEnc = d[s] * 0x101 ^ s * 0x1010100;

			for (let i = 0; i < 4; i++) {
				encTable[i][x] = tEnc = tEnc << 24 ^ tEnc >>> 8;
				decTable[i][s] = tDec = tDec << 24 ^ tDec >>> 8;
			}
		}

		// Compactify.  Considerable speedup on Firefox.
		for (let i = 0; i < 5; i++) {
			encTable[i] = encTable[i].slice(0);
			decTable[i] = decTable[i].slice(0);
		}
	}

	/**
	 * Encryption and decryption core.
	 * @param {Array} input Four words to be encrypted or decrypted.
	 * @param dir The direction, 0 for encrypt and 1 for decrypt.
	 * @return {Array} The four encrypted or decrypted words.
	 * @private
	 */
	_crypt(input, dir) {
		if (input.length !== 4) {
			throw new Error("invalid aes block size");
		}

		const key = this._key[dir];

		const nInnerRounds = key.length / 4 - 2;
		const out = [0, 0, 0, 0];
		const table = this._tables[dir];

		// load up the tables
		const t0 = table[0];
		const t1 = table[1];
		const t2 = table[2];
		const t3 = table[3];
		const sbox = table[4];

		// state variables a,b,c,d are loaded with pre-whitened data
		let a = input[0] ^ key[0];
		let b = input[dir ? 3 : 1] ^ key[1];
		let c = input[2] ^ key[2];
		let d = input[dir ? 1 : 3] ^ key[3];
		let kIndex = 4;
		let a2, b2, c2;

		// Inner rounds.  Cribbed from OpenSSL.
		for (let i = 0; i < nInnerRounds; i++) {
			a2 = t0[a >>> 24] ^ t1[b >> 16 & 255] ^ t2[c >> 8 & 255] ^ t3[d & 255] ^ key[kIndex];
			b2 = t0[b >>> 24] ^ t1[c >> 16 & 255] ^ t2[d >> 8 & 255] ^ t3[a & 255] ^ key[kIndex + 1];
			c2 = t0[c >>> 24] ^ t1[d >> 16 & 255] ^ t2[a >> 8 & 255] ^ t3[b & 255] ^ key[kIndex + 2];
			d = t0[d >>> 24] ^ t1[a >> 16 & 255] ^ t2[b >> 8 & 255] ^ t3[c & 255] ^ key[kIndex + 3];
			kIndex += 4;
			a = a2; b = b2; c = c2;
		}

		// Last round.
		for (let i = 0; i < 4; i++) {
			out[dir ? 3 & -i : i] =
				sbox[a >>> 24] << 24 ^
				sbox[b >> 16 & 255] << 16 ^
				sbox[c >> 8 & 255] << 8 ^
				sbox[d & 255] ^
				key[kIndex++];
			a2 = a; a = b; b = c; c = d; d = a2;
		}

		return out;
	}
};

/**
 * Random values
 * @namespace
 */
const random = {
	/** 
	 * Generate random words with pure js, cryptographically not as strong & safe as native implementation.
	 * @param {TypedArray} typedArray The array to fill.
	 * @return {TypedArray} The random values.
	 */
	getRandomValues(typedArray) {
		const words = new Uint32Array(typedArray.buffer);
		const r = (m_w) => {
			let m_z = 0x3ade68b1;
			const mask = 0xffffffff;
			return function () {
				m_z = (0x9069 * (m_z & 0xFFFF) + (m_z >> 0x10)) & mask;
				m_w = (0x4650 * (m_w & 0xFFFF) + (m_w >> 0x10)) & mask;
				const result = ((((m_z << 0x10) + m_w) & mask) / 0x100000000) + .5;
				return result * (Math.random() > .5 ? 1 : -1);
			};
		};
		for (let i = 0, rcache; i < typedArray.length; i += 4) {
			const _r = r((rcache || Math.random()) * 0x100000000);
			rcache = _r() * 0x3ade67b7;
			words[i / 4] = (_r() * 0x100000000) | 0;
		}
		return typedArray;
	}
};

/** @fileOverview CTR mode implementation.
 *
 * Special thanks to Roy Nicholson for pointing out a bug in our
 * implementation.
 *
 * @author Emily Stark
 * @author Mike Hamburg
 * @author Dan Boneh
 */

/** Brian Gladman's CTR Mode.
* @constructor
* @param {Object} _prf The aes instance to generate key.
* @param {bitArray} _iv The iv for ctr mode, it must be 128 bits.
*/

const mode = {};

/**
 * Brian Gladman's CTR Mode.
 * @namespace
 */
mode.ctrGladman = class {
	constructor(prf, iv) {
		this._prf = prf;
		this._initIv = iv;
		this._iv = iv;
	}

	reset() {
		this._iv = this._initIv;
	}

	/** Input some data to calculate.
	 * @param {bitArray} data the data to process, it must be intergral multiple of 128 bits unless it's the last.
	 */
	update(data) {
		return this.calculate(this._prf, data, this._iv);
	}

	incWord(word) {
		if (((word >> 24) & 0xff) === 0xff) { //overflow
			let b1 = (word >> 16) & 0xff;
			let b2 = (word >> 8) & 0xff;
			let b3 = word & 0xff;

			if (b1 === 0xff) { // overflow b1   
				b1 = 0;
				if (b2 === 0xff) {
					b2 = 0;
					if (b3 === 0xff) {
						b3 = 0;
					} else {
						++b3;
					}
				} else {
					++b2;
				}
			} else {
				++b1;
			}

			word = 0;
			word += (b1 << 16);
			word += (b2 << 8);
			word += b3;
		} else {
			word += (0x01 << 24);
		}
		return word;
	}

	incCounter(counter) {
		if ((counter[0] = this.incWord(counter[0])) === 0) {
			// encr_data in fileenc.c from  Dr Brian Gladman's counts only with DWORD j < 8
			counter[1] = this.incWord(counter[1]);
		}
	}

	calculate(prf, data, iv) {
		let l;
		if (!(l = data.length)) {
			return [];
		}
		const bl = bitArray.bitLength(data);
		for (let i = 0; i < l; i += 4) {
			this.incCounter(iv);
			const e = prf.encrypt(iv);
			data[i] ^= e[0];
			data[i + 1] ^= e[1];
			data[i + 2] ^= e[2];
			data[i + 3] ^= e[3];
		}
		return bitArray.clamp(data, bl);
	}
};

const misc = {
	importKey(password) {
		return new misc.hmacSha1(codec.bytes.toBits(password));
	},
	pbkdf2(prf, salt, count, length) {
		count = count || 10000;
		if (length < 0 || count < 0) {
			throw new Error("invalid params to pbkdf2");
		}
		const byteLength = ((length >> 5) + 1) << 2;
		let u, ui, i, j, k;
		const arrayBuffer = new ArrayBuffer(byteLength);
		const out = new DataView(arrayBuffer);
		let outLength = 0;
		const b = bitArray;
		salt = codec.bytes.toBits(salt);
		for (k = 1; outLength < (byteLength || 1); k++) {
			u = ui = prf.encrypt(b.concat(salt, [k]));
			for (i = 1; i < count; i++) {
				ui = prf.encrypt(ui);
				for (j = 0; j < ui.length; j++) {
					u[j] ^= ui[j];
				}
			}
			for (i = 0; outLength < (byteLength || 1) && i < u.length; i++) {
				out.setInt32(outLength, u[i]);
				outLength += 4;
			}
		}
		return arrayBuffer.slice(0, length / 8);
	}
};

/** @fileOverview HMAC implementation.
 *
 * @author Emily Stark
 * @author Mike Hamburg
 * @author Dan Boneh
 */

/** HMAC with the specified hash function.
 * @constructor
 * @param {bitArray} key the key for HMAC.
 * @param {Object} [Hash=hash.sha1] The hash function to use.
 */
misc.hmacSha1 = class {

	constructor(key) {
		const hmac = this;
		const Hash = hmac._hash = hash.sha1;
		const exKey = [[], []];
		const bs = Hash.prototype.blockSize / 32;
		hmac._baseHash = [new Hash(), new Hash()];

		if (key.length > bs) {
			key = Hash.hash(key);
		}

		for (let i = 0; i < bs; i++) {
			exKey[0][i] = key[i] ^ 0x36363636;
			exKey[1][i] = key[i] ^ 0x5C5C5C5C;
		}

		hmac._baseHash[0].update(exKey[0]);
		hmac._baseHash[1].update(exKey[1]);
		hmac._resultHash = new Hash(hmac._baseHash[0]);
	}
	reset() {
		const hmac = this;
		hmac._resultHash = new hmac._hash(hmac._baseHash[0]);
		hmac._updated = false;
	}

	update(data) {
		const hmac = this;
		hmac._updated = true;
		hmac._resultHash.update(data);
	}

	digest() {
		const hmac = this;
		const w = hmac._resultHash.finalize();
		const result = new (hmac._hash)(hmac._baseHash[1]).update(w).finalize();

		hmac.reset();

		return result;
	}

	encrypt(data) {
		if (!this._updated) {
			this.update(data);
			return this.digest(data);
		} else {
			throw new Error("encrypt on already updated hmac called!");
		}
	}
};

/*
 Copyright (c) 2022 Gildas Lormeau. All rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 1. Redistributions of source code must retain the above copyright notice,
 this list of conditions and the following disclaimer.

 2. Redistributions in binary form must reproduce the above copyright 
 notice, this list of conditions and the following disclaimer in 
 the documentation and/or other materials provided with the distribution.

 3. The names of the authors may not be used to endorse or promote products
 derived from this software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED ''AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
 INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
 INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
 INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
 OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

const ERR_INVALID_PASSWORD = "Invalid pasword";
const BLOCK_LENGTH = 16;
const RAW_FORMAT = "raw";
const PBKDF2_ALGORITHM = { name: "PBKDF2" };
const HASH_ALGORITHM = { name: "HMAC" };
const HASH_FUNCTION = "SHA-1";
const BASE_KEY_ALGORITHM = Object.assign({ hash: HASH_ALGORITHM }, PBKDF2_ALGORITHM);
const DERIVED_BITS_ALGORITHM = Object.assign({ iterations: 1000, hash: { name: HASH_FUNCTION } }, PBKDF2_ALGORITHM);
const DERIVED_BITS_USAGE = ["deriveBits"];
const SALT_LENGTH = [8, 12, 16];
const KEY_LENGTH = [16, 24, 32];
const SIGNATURE_LENGTH = 10;
const COUNTER_DEFAULT_VALUE = [0, 0, 0, 0];
const CRYPTO_API_SUPPORTED = typeof crypto != "undefined";
const SUBTLE_API_SUPPORTED = CRYPTO_API_SUPPORTED && typeof crypto.subtle != "undefined";
const codecBytes = codec.bytes;
const Aes = cipher.aes;
const CtrGladman = mode.ctrGladman;
const HmacSha1 = misc.hmacSha1;
class AESDecrypt {

	constructor(password, signed, strength) {
		Object.assign(this, {
			password,
			signed,
			strength: strength - 1,
			pendingInput: new Uint8Array(0)
		});
	}

	async append(input) {
		const aesCrypto = this;
		if (aesCrypto.password) {
			const preamble = subarray(input, 0, SALT_LENGTH[aesCrypto.strength] + 2);
			await createDecryptionKeys(aesCrypto, preamble, aesCrypto.password);
			aesCrypto.password = null;
			aesCrypto.aesCtrGladman = new CtrGladman(new Aes(aesCrypto.keys.key), Array.from(COUNTER_DEFAULT_VALUE));
			aesCrypto.hmac = new HmacSha1(aesCrypto.keys.authentication);
			input = subarray(input, SALT_LENGTH[aesCrypto.strength] + 2);
		}
		const output = new Uint8Array(input.length - SIGNATURE_LENGTH - ((input.length - SIGNATURE_LENGTH) % BLOCK_LENGTH));
		return append(aesCrypto, input, output, 0, SIGNATURE_LENGTH, true);
	}

	flush() {
		const aesCrypto = this;
		const pendingInput = aesCrypto.pendingInput;
		const chunkToDecrypt = subarray(pendingInput, 0, pendingInput.length - SIGNATURE_LENGTH);
		const originalSignature = subarray(pendingInput, pendingInput.length - SIGNATURE_LENGTH);
		let decryptedChunkArray = new Uint8Array(0);
		if (chunkToDecrypt.length) {
			const encryptedChunk = codecBytes.toBits(chunkToDecrypt);
			aesCrypto.hmac.update(encryptedChunk);
			const decryptedChunk = aesCrypto.aesCtrGladman.update(encryptedChunk);
			decryptedChunkArray = codecBytes.fromBits(decryptedChunk);
		}
		let valid = true;
		if (aesCrypto.signed) {
			const signature = subarray(codecBytes.fromBits(aesCrypto.hmac.digest()), 0, SIGNATURE_LENGTH);
			for (let indexSignature = 0; indexSignature < SIGNATURE_LENGTH; indexSignature++) {
				if (signature[indexSignature] != originalSignature[indexSignature]) {
					valid = false;
				}
			}
		}
		return {
			valid,
			data: decryptedChunkArray
		};
	}
}

class AESEncrypt {

	constructor(password, strength) {
		Object.assign(this, {
			password,
			strength: strength - 1,
			pendingInput: new Uint8Array(0)
		});
	}

	async append(input) {
		const aesCrypto = this;
		let preamble = new Uint8Array(0);
		if (aesCrypto.password) {
			preamble = await createEncryptionKeys(aesCrypto, aesCrypto.password);
			aesCrypto.password = null;
			aesCrypto.aesCtrGladman = new CtrGladman(new Aes(aesCrypto.keys.key), Array.from(COUNTER_DEFAULT_VALUE));
			aesCrypto.hmac = new HmacSha1(aesCrypto.keys.authentication);
		}
		const output = new Uint8Array(preamble.length + input.length - (input.length % BLOCK_LENGTH));
		output.set(preamble, 0);
		return append(aesCrypto, input, output, preamble.length, 0);
	}

	flush() {
		const aesCrypto = this;
		let encryptedChunkArray = new Uint8Array(0);
		if (aesCrypto.pendingInput.length) {
			const encryptedChunk = aesCrypto.aesCtrGladman.update(codecBytes.toBits(aesCrypto.pendingInput));
			aesCrypto.hmac.update(encryptedChunk);
			encryptedChunkArray = codecBytes.fromBits(encryptedChunk);
		}
		const signature = subarray(codecBytes.fromBits(aesCrypto.hmac.digest()), 0, SIGNATURE_LENGTH);
		return {
			data: concat(encryptedChunkArray, signature),
			signature
		};
	}
}

function append(aesCrypto, input, output, paddingStart, paddingEnd, verifySignature) {
	const inputLength = input.length - paddingEnd;
	if (aesCrypto.pendingInput.length) {
		input = concat(aesCrypto.pendingInput, input);
		output = expand(output, inputLength - (inputLength % BLOCK_LENGTH));
	}
	let offset;
	for (offset = 0; offset <= inputLength - BLOCK_LENGTH; offset += BLOCK_LENGTH) {
		const inputChunk = codecBytes.toBits(subarray(input, offset, offset + BLOCK_LENGTH));
		if (verifySignature) {
			aesCrypto.hmac.update(inputChunk);
		}
		const outputChunk = aesCrypto.aesCtrGladman.update(inputChunk);
		if (!verifySignature) {
			aesCrypto.hmac.update(outputChunk);
		}
		output.set(codecBytes.fromBits(outputChunk), offset + paddingStart);
	}
	aesCrypto.pendingInput = subarray(input, offset);
	return output;
}

async function createDecryptionKeys(decrypt, preambleArray, password) {
	await createKeys$1(decrypt, password, subarray(preambleArray, 0, SALT_LENGTH[decrypt.strength]));
	const passwordVerification = subarray(preambleArray, SALT_LENGTH[decrypt.strength]);
	const passwordVerificationKey = decrypt.keys.passwordVerification;
	if (passwordVerificationKey[0] != passwordVerification[0] || passwordVerificationKey[1] != passwordVerification[1]) {
		throw new Error(ERR_INVALID_PASSWORD);
	}
}

async function createEncryptionKeys(encrypt, password) {
	const salt = getRandomValues(new Uint8Array(SALT_LENGTH[encrypt.strength]));
	await createKeys$1(encrypt, password, salt);
	return concat(salt, encrypt.keys.passwordVerification);
}

async function createKeys$1(target, password, salt) {
	const encodedPassword = encodeText(password);
	const basekey = await importKey(RAW_FORMAT, encodedPassword, BASE_KEY_ALGORITHM, false, DERIVED_BITS_USAGE);
	const derivedBits = await deriveBits(Object.assign({ salt }, DERIVED_BITS_ALGORITHM), basekey, 8 * ((KEY_LENGTH[target.strength] * 2) + 2));
	const compositeKey = new Uint8Array(derivedBits);
	target.keys = {
		key: codecBytes.toBits(subarray(compositeKey, 0, KEY_LENGTH[target.strength])),
		authentication: codecBytes.toBits(subarray(compositeKey, KEY_LENGTH[target.strength], KEY_LENGTH[target.strength] * 2)),
		passwordVerification: subarray(compositeKey, KEY_LENGTH[target.strength] * 2)
	};
}

function getRandomValues(array) {
	if (CRYPTO_API_SUPPORTED && typeof crypto.getRandomValues == "function") {
		return crypto.getRandomValues(array);
	} else {
		return random.getRandomValues(array);
	}
}

function importKey(format, password, algorithm, extractable, keyUsages) {
	if (CRYPTO_API_SUPPORTED && SUBTLE_API_SUPPORTED && typeof crypto.subtle.importKey == "function") {
		return crypto.subtle.importKey(format, password, algorithm, extractable, keyUsages);
	} else {
		return misc.importKey(password);
	}
}

async function deriveBits(algorithm, baseKey, length) {
	if (CRYPTO_API_SUPPORTED && SUBTLE_API_SUPPORTED && typeof crypto.subtle.deriveBits == "function") {
		return await crypto.subtle.deriveBits(algorithm, baseKey, length);
	} else {
		return misc.pbkdf2(baseKey, algorithm.salt, DERIVED_BITS_ALGORITHM.iterations, length);
	}
}

function concat(leftArray, rightArray) {
	let array = leftArray;
	if (leftArray.length + rightArray.length) {
		array = new Uint8Array(leftArray.length + rightArray.length);
		array.set(leftArray, 0);
		array.set(rightArray, leftArray.length);
	}
	return array;
}

function expand(inputArray, length) {
	if (length && length > inputArray.length) {
		const array = inputArray;
		inputArray = new Uint8Array(length);
		inputArray.set(array, 0);
	}
	return inputArray;
}

function subarray(array, begin, end) {
	return array.subarray(begin, end);
}

/*
 Copyright (c) 2022 Gildas Lormeau. All rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 1. Redistributions of source code must retain the above copyright notice,
 this list of conditions and the following disclaimer.

 2. Redistributions in binary form must reproduce the above copyright 
 notice, this list of conditions and the following disclaimer in 
 the documentation and/or other materials provided with the distribution.

 3. The names of the authors may not be used to endorse or promote products
 derived from this software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED ''AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
 INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
 INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
 INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
 OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

const HEADER_LENGTH = 12;

class ZipCryptoDecrypt {

	constructor(password, passwordVerification) {
		const zipCrypto = this;
		Object.assign(zipCrypto, {
			password,
			passwordVerification
		});
		createKeys(zipCrypto, password);
	}

	append(input) {
		const zipCrypto = this;
		if (zipCrypto.password) {
			const decryptedHeader = decrypt(zipCrypto, input.subarray(0, HEADER_LENGTH));
			zipCrypto.password = null;
			if (decryptedHeader[HEADER_LENGTH - 1] != zipCrypto.passwordVerification) {
				throw new Error(ERR_INVALID_PASSWORD);
			}
			input = input.subarray(HEADER_LENGTH);
		}
		return decrypt(zipCrypto, input);
	}

	flush() {
		return {
			valid: true,
			data: new Uint8Array(0)
		};
	}
}

class ZipCryptoEncrypt {

	constructor(password, passwordVerification) {
		const zipCrypto = this;
		Object.assign(zipCrypto, {
			password,
			passwordVerification
		});
		createKeys(zipCrypto, password);
	}

	append(input) {
		const zipCrypto = this;
		let output;
		let offset;
		if (zipCrypto.password) {
			zipCrypto.password = null;
			const header = crypto.getRandomValues(new Uint8Array(HEADER_LENGTH));
			header[HEADER_LENGTH - 1] = zipCrypto.passwordVerification;
			output = new Uint8Array(input.length + header.length);
			output.set(encrypt(zipCrypto, header), 0);
			offset = HEADER_LENGTH;
		} else {
			output = new Uint8Array(input.length);
			offset = 0;
		}
		output.set(encrypt(zipCrypto, input), offset);
		return output;
	}

	flush() {
		return {
			data: new Uint8Array(0)
		};
	}
}

function decrypt(target, input) {
	const output = new Uint8Array(input.length);
	for (let index = 0; index < input.length; index++) {
		output[index] = getByte(target) ^ input[index];
		updateKeys(target, output[index]);
	}
	return output;
}

function encrypt(target, input) {
	const output = new Uint8Array(input.length);
	for (let index = 0; index < input.length; index++) {
		output[index] = getByte(target) ^ input[index];
		updateKeys(target, input[index]);
	}
	return output;
}

function createKeys(target, password) {
	target.keys = [0x12345678, 0x23456789, 0x34567890];
	target.crcKey0 = new Crc32(target.keys[0]);
	target.crcKey2 = new Crc32(target.keys[2]);
	for (let index = 0; index < password.length; index++) {
		updateKeys(target, password.charCodeAt(index));
	}
}

function updateKeys(target, byte) {
	target.crcKey0.append([byte]);
	target.keys[0] = ~target.crcKey0.get();
	target.keys[1] = getInt32(target.keys[1] + getInt8(target.keys[0]));
	target.keys[1] = getInt32(Math.imul(target.keys[1], 134775813) + 1);
	target.crcKey2.append([target.keys[1] >>> 24]);
	target.keys[2] = ~target.crcKey2.get();
}

function getByte(target) {
	const temp = target.keys[2] | 2;
	return getInt8(Math.imul(temp, (temp ^ 1)) >>> 8);
}

function getInt8(number) {
	return number & 0xFF;
}

function getInt32(number) {
	return number & 0xFFFFFFFF;
}

/*
 Copyright (c) 2022 Gildas Lormeau. All rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 1. Redistributions of source code must retain the above copyright notice,
 this list of conditions and the following disclaimer.

 2. Redistributions in binary form must reproduce the above copyright 
 notice, this list of conditions and the following disclaimer in 
 the documentation and/or other materials provided with the distribution.

 3. The names of the authors may not be used to endorse or promote products
 derived from this software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED ''AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
 INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
 INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
 INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
 OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

const CODEC_DEFLATE = "deflate";
const CODEC_INFLATE = "inflate";
const ERR_INVALID_SIGNATURE = "Invalid signature";

class Inflate {

	constructor(codecConstructor, {
		signature,
		password,
		signed,
		compressed,
		zipCrypto,
		passwordVerification,
		encryptionStrength
	}, { chunkSize }) {
		const encrypted = Boolean(password);
		Object.assign(this, {
			signature,
			encrypted,
			signed,
			compressed,
			inflate: compressed && new codecConstructor({ chunkSize }),
			crc32: signed && new Crc32(),
			zipCrypto,
			decrypt: encrypted && zipCrypto ?
				new ZipCryptoDecrypt(password, passwordVerification) :
				new AESDecrypt(password, signed, encryptionStrength)
		});
	}

	async append(data) {
		const codec = this;
		if (codec.encrypted && data.length) {
			data = await codec.decrypt.append(data);
		}
		if (codec.compressed && data.length) {
			data = await codec.inflate.append(data);
		}
		if ((!codec.encrypted || codec.zipCrypto) && codec.signed && data.length) {
			codec.crc32.append(data);
		}
		return data;
	}

	async flush() {
		const codec = this;
		let signature;
		let data = new Uint8Array(0);
		if (codec.encrypted) {
			const result = codec.decrypt.flush();
			if (!result.valid) {
				throw new Error(ERR_INVALID_SIGNATURE);
			}
			data = result.data;
		}
		if ((!codec.encrypted || codec.zipCrypto) && codec.signed) {
			const dataViewSignature = new DataView(new Uint8Array(4).buffer);
			signature = codec.crc32.get();
			dataViewSignature.setUint32(0, signature);
			if (codec.signature != dataViewSignature.getUint32(0, false)) {
				throw new Error(ERR_INVALID_SIGNATURE);
			}
		}
		if (codec.compressed) {
			data = (await codec.inflate.append(data)) || new Uint8Array(0);
			await codec.inflate.flush();
		}
		return { data, signature };
	}
}

class Deflate {

	constructor(codecConstructor, {
		encrypted,
		signed,
		compressed,
		level,
		zipCrypto,
		password,
		passwordVerification,
		encryptionStrength
	}, { chunkSize }) {
		Object.assign(this, {
			encrypted,
			signed,
			compressed,
			deflate: compressed && new codecConstructor({ level: level || 5, chunkSize }),
			crc32: signed && new Crc32(),
			zipCrypto,
			encrypt: encrypted && zipCrypto ?
				new ZipCryptoEncrypt(password, passwordVerification) :
				new AESEncrypt(password, encryptionStrength)
		});
	}

	async append(inputData) {
		const codec = this;
		let data = inputData;
		if (codec.compressed && inputData.length) {
			data = await codec.deflate.append(inputData);
		}
		if (codec.encrypted && data.length) {
			data = await codec.encrypt.append(data);
		}
		if ((!codec.encrypted || codec.zipCrypto) && codec.signed && inputData.length) {
			codec.crc32.append(inputData);
		}
		return data;
	}

	async flush() {
		const codec = this;
		let signature;
		let data = new Uint8Array(0);
		if (codec.compressed) {
			data = (await codec.deflate.flush()) || new Uint8Array(0);
		}
		if (codec.encrypted) {
			data = await codec.encrypt.append(data);
			const result = codec.encrypt.flush();
			signature = result.signature;
			const newData = new Uint8Array(data.length + result.data.length);
			newData.set(data, 0);
			newData.set(result.data, data.length);
			data = newData;
		}
		if ((!codec.encrypted || codec.zipCrypto) && codec.signed) {
			signature = codec.crc32.get();
		}
		return { data, signature };
	}
}

function createCodec$1(codecConstructor, options, config) {
	if (options.codecType.startsWith(CODEC_DEFLATE)) {
		return new Deflate(codecConstructor, options, config);
	} else if (options.codecType.startsWith(CODEC_INFLATE)) {
		return new Inflate(codecConstructor, options, config);
	}
}

/*
 Copyright (c) 2022 Gildas Lormeau. All rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 1. Redistributions of source code must retain the above copyright notice,
 this list of conditions and the following disclaimer.

 2. Redistributions in binary form must reproduce the above copyright 
 notice, this list of conditions and the following disclaimer in 
 the documentation and/or other materials provided with the distribution.

 3. The names of the authors may not be used to endorse or promote products
 derived from this software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED ''AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
 INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
 INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
 INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
 OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

const MESSAGE_INIT = "init";
const MESSAGE_APPEND = "append";
const MESSAGE_FLUSH = "flush";
const MESSAGE_EVENT_TYPE = "message";

let classicWorkersSupported = true;

var getWorker = (workerData, codecConstructor, options, config, onTaskFinished, webWorker, scripts) => {
	Object.assign(workerData, {
		busy: true,
		codecConstructor,
		options: Object.assign({}, options),
		scripts,
		terminate() {
			if (workerData.worker && !workerData.busy) {
				workerData.worker.terminate();
				workerData.interface = null;
			}
		},
		onTaskFinished() {
			workerData.busy = false;
			onTaskFinished(workerData);
		}
	});
	return webWorker ? createWebWorkerInterface(workerData, config) : createWorkerInterface(workerData, config);
};

function createWorkerInterface(workerData, config) {
	const interfaceCodec = createCodec$1(workerData.codecConstructor, workerData.options, config);
	return {
		async append(data) {
			try {
				return await interfaceCodec.append(data);
			} catch (error) {
				workerData.onTaskFinished();
				throw error;
			}
		},
		async flush() {
			try {
				return await interfaceCodec.flush();
			} finally {
				workerData.onTaskFinished();
			}
		},
		abort() {
			workerData.onTaskFinished();
		}
	};
}

function createWebWorkerInterface(workerData, config) {
	let messageTask;
	const workerOptions = { type: "module" };
	if (!workerData.interface) {
		if (!classicWorkersSupported) {
			workerData.worker = getWorker(workerOptions, config.baseURL);
		} else {
			try {
				workerData.worker = getWorker({}, config.baseURL);
			} catch (_error) {
				classicWorkersSupported = false;
				workerData.worker = getWorker(workerOptions, config.baseURL);
			}
		}
		workerData.worker.addEventListener(MESSAGE_EVENT_TYPE, onMessage, false);
		workerData.interface = {
			append(data) {
				return initAndSendMessage({ type: MESSAGE_APPEND, data });
			},
			flush() {
				return initAndSendMessage({ type: MESSAGE_FLUSH });
			},
			abort() {
				workerData.onTaskFinished();
			}
		};
	}
	return workerData.interface;

	function getWorker(options, baseURL) {
		let url, scriptUrl;
		url = workerData.scripts[0];
		if (typeof url == "function") {
			url = url();
		}
		try {
			scriptUrl = new URL(url, baseURL).href;
		} catch (_error) {
			scriptUrl = url;
		}
		return new Worker(scriptUrl, options);
	}

	async function initAndSendMessage(message) {
		if (!messageTask) {
			const options = workerData.options;
			const scripts = workerData.scripts.slice(1);
			await sendMessage({ scripts, type: MESSAGE_INIT, options, config: { chunkSize: config.chunkSize } });
		}
		return sendMessage(message);
	}

	function sendMessage(message) {
		const worker = workerData.worker;
		const result = new Promise((resolve, reject) => messageTask = { resolve, reject });
		try {
			if (message.data) {
				try {
					message.data = message.data.buffer;
					worker.postMessage(message, [message.data]);
				} catch (_error) {
					worker.postMessage(message);
				}
			} else {
				worker.postMessage(message);
			}
		} catch (error) {
			messageTask.reject(error);
			messageTask = null;
			workerData.onTaskFinished();
		}
		return result;
	}

	function onMessage(event) {
		const message = event.data;
		if (messageTask) {
			const reponseError = message.error;
			const type = message.type;
			if (reponseError) {
				const error = new Error(reponseError.message);
				error.stack = reponseError.stack;
				messageTask.reject(error);
				messageTask = null;
				workerData.onTaskFinished();
			} else if (type == MESSAGE_INIT || type == MESSAGE_FLUSH || type == MESSAGE_APPEND) {
				const data = message.data;
				if (type == MESSAGE_FLUSH) {
					messageTask.resolve({ data: new Uint8Array(data), signature: message.signature });
					messageTask = null;
					workerData.onTaskFinished();
				} else {
					messageTask.resolve(data && new Uint8Array(data));
				}
			}
		}
	}
}

/*
 Copyright (c) 2022 Gildas Lormeau. All rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 1. Redistributions of source code must retain the above copyright notice,
 this list of conditions and the following disclaimer.

 2. Redistributions in binary form must reproduce the above copyright 
 notice, this list of conditions and the following disclaimer in 
 the documentation and/or other materials provided with the distribution.

 3. The names of the authors may not be used to endorse or promote products
 derived from this software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED ''AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
 INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
 INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
 INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
 OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

let pool = [];
const pendingRequests = [];

function createCodec(codecConstructor, options, config) {
	const streamCopy = !options.compressed && !options.signed && !options.encrypted;
	const webWorker = !streamCopy && (options.useWebWorkers || (options.useWebWorkers === undefined && config.useWebWorkers));
	const scripts = webWorker && config.workerScripts ? config.workerScripts[options.codecType] : [];
	if (pool.length < config.maxWorkers) {
		const workerData = {};
		pool.push(workerData);
		return getWorker(workerData, codecConstructor, options, config, onTaskFinished, webWorker, scripts);
	} else {
		const workerData = pool.find(workerData => !workerData.busy);
		if (workerData) {
			clearTerminateTimeout(workerData);
			return getWorker(workerData, codecConstructor, options, config, onTaskFinished, webWorker, scripts);
		} else {
			return new Promise(resolve => pendingRequests.push({ resolve, codecConstructor, options, webWorker, scripts }));
		}
	}

	function onTaskFinished(workerData) {
		if (pendingRequests.length) {
			const [{ resolve, codecConstructor, options, webWorker, scripts }] = pendingRequests.splice(0, 1);
			resolve(getWorker(workerData, codecConstructor, options, config, onTaskFinished, webWorker, scripts));
		} else if (workerData.worker) {
			clearTerminateTimeout(workerData);
			if (Number.isFinite(config.terminateWorkerTimeout) && config.terminateWorkerTimeout >= 0) {
				workerData.terminateTimeout = setTimeout(() => {
					pool = pool.filter(data => data != workerData);
					workerData.terminate();
				}, config.terminateWorkerTimeout);
			}
		} else {
			pool = pool.filter(data => data != workerData);
		}
	}
}

function clearTerminateTimeout(workerData) {
	if (workerData.terminateTimeout) {
		clearTimeout(workerData.terminateTimeout);
		workerData.terminateTimeout = null;
	}
}

function terminateWorkers() {
	pool.forEach(workerData => {
		clearTerminateTimeout(workerData);
		workerData.terminate();
	});
}

/*
 Copyright (c) 2022 Gildas Lormeau. All rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 1. Redistributions of source code must retain the above copyright notice,
 this list of conditions and the following disclaimer.

 2. Redistributions in binary form must reproduce the above copyright 
 notice, this list of conditions and the following disclaimer in 
 the documentation and/or other materials provided with the distribution.

 3. The names of the authors may not be used to endorse or promote products
 derived from this software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED ''AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
 INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
 INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
 INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
 OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

const MINIMUM_CHUNK_SIZE = 64;
const ERR_ABORT = "Abort error";

async function processData(codec, reader, writer, offset, inputLengthGetter, config, options) {
	const chunkSize = Math.max(config.chunkSize, MINIMUM_CHUNK_SIZE);
	return processChunk();

	async function processChunk(chunkOffset = 0, outputLength = 0) {
		const signal = options.signal;
		const inputLength = inputLengthGetter();
		if (chunkOffset < inputLength) {
			testAborted(signal, codec);
			const inputData = await reader.readUint8Array(chunkOffset + offset, Math.min(chunkSize, inputLength - chunkOffset));
			const chunkLength = inputData.length;
			testAborted(signal, codec);
			const data = await codec.append(inputData);
			testAborted(signal, codec);
			outputLength += await writeData(writer, data);
			if (options.onprogress) {
				try {
					options.onprogress(chunkOffset + chunkLength, inputLength);
				} catch (error) {
					// ignored
				}
			}
			return processChunk(chunkOffset + chunkSize, outputLength);
		} else {
			const result = await codec.flush();
			outputLength += await writeData(writer, result.data);
			return { signature: result.signature, length: outputLength };
		}
	}
}

function testAborted(signal, codec) {
	if (signal && signal.aborted) {
		codec.abort();
		throw new Error(ERR_ABORT);
	}
}

async function writeData(writer, data) {
	if (data.length) {
		await writer.writeUint8Array(data);
	}
	return data.length;
}

/*
 Copyright (c) 2022 Gildas Lormeau. All rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 1. Redistributions of source code must retain the above copyright notice,
 this list of conditions and the following disclaimer.

 2. Redistributions in binary form must reproduce the above copyright 
 notice, this list of conditions and the following disclaimer in 
 the documentation and/or other materials provided with the distribution.

 3. The names of the authors may not be used to endorse or promote products
 derived from this software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED ''AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
 INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
 INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
 INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
 OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/* global Blob, FileReader, atob, btoa, XMLHttpRequest, document, fetch */

const ERR_HTTP_STATUS = "HTTP error ";
const ERR_HTTP_RANGE = "HTTP Range not supported";
const ERR_NOT_SEEKABLE_READER = "Reader is not seekable";

const CONTENT_TYPE_TEXT_PLAIN = "text/plain";
const HTTP_HEADER_CONTENT_LENGTH = "Content-Length";
const HTTP_HEADER_CONTENT_RANGE = "Content-Range";
const HTTP_HEADER_ACCEPT_RANGES = "Accept-Ranges";
const HTTP_HEADER_RANGE = "Range";
const HTTP_METHOD_HEAD = "HEAD";
const HTTP_METHOD_GET = "GET";
const HTTP_RANGE_UNIT = "bytes";

class Stream {

	constructor() {
		this.size = 0;
	}

	init() {
		this.initialized = true;
	}
}

class Reader extends Stream {
}

class Writer extends Stream {

	writeUint8Array(array) {
		this.size += array.length;
	}
}

class TextReader extends Reader {

	constructor(text) {
		super();
		this.blobReader = new BlobReader(new Blob([text], { type: CONTENT_TYPE_TEXT_PLAIN }));
	}

	init() {
		super.init();
		this.blobReader.init();
		this.size = this.blobReader.size;
	}

	readUint8Array(offset, length) {
		return this.blobReader.readUint8Array(offset, length);
	}
}

class TextWriter extends Writer {

	constructor(encoding) {
		super();
		this.encoding = encoding;
		this.blob = new Blob([], { type: CONTENT_TYPE_TEXT_PLAIN });
	}

	writeUint8Array(array) {
		super.writeUint8Array(array);
		this.blob = new Blob([this.blob, array.buffer], { type: CONTENT_TYPE_TEXT_PLAIN });
	}

	getData() {
		if (this.blob.text) {
			return this.blob.text();
		} else {
			const reader = new FileReader();
			return new Promise((resolve, reject) => {
				reader.onload = event => resolve(event.target.result);
				reader.onerror = () => reject(reader.error);
				reader.readAsText(this.blob, this.encoding);
			});
		}
	}
}

class Data64URIReader extends Reader {

	constructor(dataURI) {
		super();
		this.dataURI = dataURI;
		let dataEnd = dataURI.length;
		while (dataURI.charAt(dataEnd - 1) == "=") {
			dataEnd--;
		}
		this.dataStart = dataURI.indexOf(",") + 1;
		this.size = Math.floor((dataEnd - this.dataStart) * 0.75);
	}

	readUint8Array(offset, length) {
		const dataArray = new Uint8Array(length);
		const start = Math.floor(offset / 3) * 4;
		const bytes = atob(this.dataURI.substring(start + this.dataStart, Math.ceil((offset + length) / 3) * 4 + this.dataStart));
		const delta = offset - Math.floor(start / 4) * 3;
		for (let indexByte = delta; indexByte < delta + length; indexByte++) {
			dataArray[indexByte - delta] = bytes.charCodeAt(indexByte);
		}
		return dataArray;
	}
}

class Data64URIWriter extends Writer {

	constructor(contentType) {
		super();
		this.data = "data:" + (contentType || "") + ";base64,";
		this.pending = [];
	}

	writeUint8Array(array) {
		super.writeUint8Array(array);
		let indexArray = 0;
		let dataString = this.pending;
		const delta = this.pending.length;
		this.pending = "";
		for (indexArray = 0; indexArray < (Math.floor((delta + array.length) / 3) * 3) - delta; indexArray++) {
			dataString += String.fromCharCode(array[indexArray]);
		}
		for (; indexArray < array.length; indexArray++) {
			this.pending += String.fromCharCode(array[indexArray]);
		}
		if (dataString.length > 2) {
			this.data += btoa(dataString);
		} else {
			this.pending = dataString;
		}
	}

	getData() {
		return this.data + btoa(this.pending);
	}
}

class BlobReader extends Reader {

	constructor(blob) {
		super();
		this.blob = blob;
		this.size = blob.size;
	}

	async readUint8Array(offset, length) {
		if (this.blob.arrayBuffer) {
			return new Uint8Array(await this.blob.slice(offset, offset + length).arrayBuffer());
		} else {
			const reader = new FileReader();
			return new Promise((resolve, reject) => {
				reader.onload = event => resolve(new Uint8Array(event.target.result));
				reader.onerror = () => reject(reader.error);
				reader.readAsArrayBuffer(this.blob.slice(offset, offset + length));
			});
		}
	}
}

class BlobWriter extends Writer {

	constructor(contentType) {
		super();
		this.contentType = contentType;
		this.arrayBuffersMaxlength = 8;
		initArrayBuffers(this);
	}

	writeUint8Array(array) {
		super.writeUint8Array(array);
		if (this.arrayBuffers.length == this.arrayBuffersMaxlength) {
			flushArrayBuffers(this);
		}
		this.arrayBuffers.push(array.buffer);
	}

	getData() {
		if (!this.blob) {
			if (this.arrayBuffers.length) {
				flushArrayBuffers(this);
			}
			this.blob = this.pendingBlob;
			initArrayBuffers(this);
		}
		return this.blob;
	}
}

function initArrayBuffers(blobWriter) {
	blobWriter.pendingBlob = new Blob([], { type: blobWriter.contentType });
	blobWriter.arrayBuffers = [];
}

function flushArrayBuffers(blobWriter) {
	blobWriter.pendingBlob = new Blob([blobWriter.pendingBlob, ...blobWriter.arrayBuffers], { type: blobWriter.contentType });
	blobWriter.arrayBuffers = [];
}

class ReadableStreamReader {

	constructor(readableStream) {
		this.readableStream = readableStream;
		this.reader = readableStream.getReader();
		this.size = Infinity;
		this.index = 0;
		this.currentSize = 0;
		this.pendingValue = new Uint8Array();
	}

	init() {
		this.initialized = true;
	}

	async readUint8Array(index, length) {
		if (this.index != index) {
			throw new Error(ERR_NOT_SEEKABLE_READER);
		}
		let data = new Uint8Array(length);
		let size = 0, done;
		do {
			const result = await this.reader.read();
			let { value } = result;
			done = result.done;
			if (value) {
				this.currentSize += value.length;
			} else {
				value = this.pendingValue;
				this.pendingValue = new Uint8Array();
			}
			if (this.pendingValue.length) {
				const newValue = new Uint8Array(this.pendingValue.length + value.length);
				newValue.set(this.pendingValue);
				newValue.set(value, this.pendingValue.length);
				this.pendingValue = new Uint8Array();
				value = newValue;
			}
			if (size + value.length > length) {
				data.set(value.subarray(0, length), size);
				this.pendingValue = value.subarray(length);
				size += length;
			} else {
				data.set(value, size);
				size += value.length;
			}
		} while (size < length && !done);
		if (done && this.size == Infinity) {
			this.size = this.currentSize;
		}
		if (this.size < length) {
			data = data.slice(0, this.size);
			length = this.size;
		}
		this.index += length;
		return data;
	}
}

class WritableStreamWriter extends Writer {

	constructor(writableStream) {
		super();
		this.writableStream = writableStream;
		this.writer = writableStream.getWriter();
	}

	async writeUint8Array(array) {
		await this.writer.ready;
		return this.writer.write(array);
	}

	async getData() {
		await this.writer.ready;
		await this.writer.close();
		return this.writableStream;
	}
}

class FetchReader extends Reader {

	constructor(url, options) {
		super();
		this.url = url;
		this.preventHeadRequest = options.preventHeadRequest;
		this.useRangeHeader = options.useRangeHeader;
		this.forceRangeRequests = options.forceRangeRequests;
		this.options = Object.assign({}, options);
		delete this.options.preventHeadRequest;
		delete this.options.useRangeHeader;
		delete this.options.forceRangeRequests;
		delete this.options.useXHR;
	}

	async init() {
		super.init();
		await initHttpReader(this, sendFetchRequest, getFetchRequestData);
	}

	readUint8Array(index, length) {
		return readUint8ArrayHttpReader(this, index, length, sendFetchRequest, getFetchRequestData);
	}
}

class XHRReader extends Reader {

	constructor(url, options) {
		super();
		this.url = url;
		this.preventHeadRequest = options.preventHeadRequest;
		this.useRangeHeader = options.useRangeHeader;
		this.forceRangeRequests = options.forceRangeRequests;
		this.options = options;
	}

	async init() {
		super.init();
		await initHttpReader(this, sendXMLHttpRequest, getXMLHttpRequestData);
	}

	readUint8Array(index, length) {
		return readUint8ArrayHttpReader(this, index, length, sendXMLHttpRequest, getXMLHttpRequestData);
	}
}

async function initHttpReader(httpReader, sendRequest, getRequestData) {
	if (isHttpFamily(httpReader.url) && (httpReader.useRangeHeader || httpReader.forceRangeRequests)) {
		const response = await sendRequest(HTTP_METHOD_GET, httpReader, getRangeHeaders(httpReader));
		if (!httpReader.forceRangeRequests && response.headers.get(HTTP_HEADER_ACCEPT_RANGES) != HTTP_RANGE_UNIT) {
			throw new Error(ERR_HTTP_RANGE);
		} else {
			let contentSize;
			const contentRangeHeader = response.headers.get(HTTP_HEADER_CONTENT_RANGE);
			if (contentRangeHeader) {
				const splitHeader = contentRangeHeader.trim().split(/\s*\/\s*/);
				if (splitHeader.length) {
					const headerValue = splitHeader[1];
					if (headerValue && headerValue != "*") {
						contentSize = Number(headerValue);
					}
				}
			}
			if (contentSize === undefined) {
				await getContentLength(httpReader, sendRequest, getRequestData);
			} else {
				httpReader.size = contentSize;
			}
		}
	} else {
		await getContentLength(httpReader, sendRequest, getRequestData);
	}
}

async function readUint8ArrayHttpReader(httpReader, index, length, sendRequest, getRequestData) {
	if (httpReader.useRangeHeader || httpReader.forceRangeRequests) {
		const response = await sendRequest(HTTP_METHOD_GET, httpReader, getRangeHeaders(httpReader, index, length));
		if (response.status != 206) {
			throw new Error(ERR_HTTP_RANGE);
		}
		return new Uint8Array(await response.arrayBuffer());
	} else {
		if (!httpReader.data) {
			await getRequestData(httpReader, httpReader.options);
		}
		return new Uint8Array(httpReader.data.subarray(index, index + length));
	}
}

function getRangeHeaders(httpReader, index = 0, length = 1) {
	return Object.assign({}, getHeaders(httpReader), { [HTTP_HEADER_RANGE]: HTTP_RANGE_UNIT + "=" + index + "-" + (index + length - 1) });
}

function getHeaders(httpReader) {
	const headers = httpReader.options.headers;
	if (headers) {
		if (Symbol.iterator in headers) {
			return Object.fromEntries(headers);
		} else {
			return headers;
		}
	}
}

async function getFetchRequestData(httpReader) {
	await getRequestData(httpReader, sendFetchRequest);
}

async function getXMLHttpRequestData(httpReader) {
	await getRequestData(httpReader, sendXMLHttpRequest);
}

async function getRequestData(httpReader, sendRequest) {
	const response = await sendRequest(HTTP_METHOD_GET, httpReader, getHeaders(httpReader));
	httpReader.data = new Uint8Array(await response.arrayBuffer());
	if (!httpReader.size) {
		httpReader.size = httpReader.data.length;
	}
}

async function getContentLength(httpReader, sendRequest, getRequestData) {
	if (httpReader.preventHeadRequest) {
		await getRequestData(httpReader, httpReader.options);
	} else {
		const response = await sendRequest(HTTP_METHOD_HEAD, httpReader, getHeaders(httpReader));
		const contentLength = response.headers.get(HTTP_HEADER_CONTENT_LENGTH);
		if (contentLength) {
			httpReader.size = Number(contentLength);
		} else {
			await getRequestData(httpReader, httpReader.options);
		}
	}
}

async function sendFetchRequest(method, { options, url }, headers) {
	const response = await fetch(url, Object.assign({}, options, { method, headers }));
	if (response.status < 400) {
		return response;
	} else {
		throw new Error(ERR_HTTP_STATUS + (response.statusText || response.status));
	}
}

function sendXMLHttpRequest(method, { url }, headers) {
	return new Promise((resolve, reject) => {
		const request = new XMLHttpRequest();
		request.addEventListener("load", () => {
			if (request.status < 400) {
				const headers = [];
				request.getAllResponseHeaders().trim().split(/[\r\n]+/).forEach(header => {
					const splitHeader = header.trim().split(/\s*:\s*/);
					splitHeader[0] = splitHeader[0].trim().replace(/^[a-z]|-[a-z]/g, value => value.toUpperCase());
					headers.push(splitHeader);
				});
				resolve({
					status: request.status,
					arrayBuffer: () => request.response,
					headers: new Map(headers)
				});
			} else {
				reject(new Error(ERR_HTTP_STATUS + (request.statusText || request.status)));
			}
		}, false);
		request.addEventListener("error", event => reject(event.detail.error), false);
		request.open(method, url);
		if (headers) {
			for (const entry of Object.entries(headers)) {
				request.setRequestHeader(entry[0], entry[1]);
			}
		}
		request.responseType = "arraybuffer";
		request.send();
	});
}

class HttpReader extends Reader {

	constructor(url, options = {}) {
		super();
		this.url = url;
		if (options.useXHR) {
			this.reader = new XHRReader(url, options);
		} else {
			this.reader = new FetchReader(url, options);
		}
	}

	set size(value) {
		// ignored
	}

	get size() {
		return this.reader.size;
	}

	async init() {
		super.init();
		await this.reader.init();
	}

	readUint8Array(index, length) {
		return this.reader.readUint8Array(index, length);
	}
}

class HttpRangeReader extends HttpReader {

	constructor(url, options = {}) {
		options.useRangeHeader = true;
		super(url, options);
	}
}


class Uint8ArrayReader extends Reader {

	constructor(array) {
		super();
		this.array = array;
		this.size = array.length;
	}

	readUint8Array(index, length) {
		return this.array.slice(index, index + length);
	}
}

class Uint8ArrayWriter extends Writer {

	constructor() {
		super();
		this.array = new Uint8Array(0);
	}

	writeUint8Array(array) {
		super.writeUint8Array(array);
		const previousArray = this.array;
		this.array = new Uint8Array(previousArray.length + array.length);
		this.array.set(previousArray);
		this.array.set(array, previousArray.length);
	}

	getData() {
		return this.array;
	}
}

function isHttpFamily(url) {
	if (typeof document != "undefined") {
		const anchor = document.createElement("a");
		anchor.href = url;
		return anchor.protocol == "http:" || anchor.protocol == "https:";
	} else {
		return /^https?:\/\//i.test(url);
	}
}

/*
 Copyright (c) 2022 Gildas Lormeau. All rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 1. Redistributions of source code must retain the above copyright notice,
 this list of conditions and the following disclaimer.

 2. Redistributions in binary form must reproduce the above copyright 
 notice, this list of conditions and the following disclaimer in 
 the documentation and/or other materials provided with the distribution.

 3. The names of the authors may not be used to endorse or promote products
 derived from this software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED ''AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
 INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
 INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
 INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
 OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

const MAX_32_BITS = 0xffffffff;
const MAX_16_BITS = 0xffff;
const COMPRESSION_METHOD_DEFLATE = 0x08;
const COMPRESSION_METHOD_STORE = 0x00;
const COMPRESSION_METHOD_AES = 0x63;

const LOCAL_FILE_HEADER_SIGNATURE = 0x04034b50;
const DATA_DESCRIPTOR_RECORD_SIGNATURE = 0x08074b50;
const CENTRAL_FILE_HEADER_SIGNATURE = 0x02014b50;
const END_OF_CENTRAL_DIR_SIGNATURE = 0x06054b50;
const ZIP64_END_OF_CENTRAL_DIR_SIGNATURE = 0x06064b50;
const ZIP64_END_OF_CENTRAL_DIR_LOCATOR_SIGNATURE = 0x07064b50;
const END_OF_CENTRAL_DIR_LENGTH = 22;
const ZIP64_END_OF_CENTRAL_DIR_LOCATOR_LENGTH = 20;
const ZIP64_END_OF_CENTRAL_DIR_LENGTH = 56;
const ZIP64_END_OF_CENTRAL_DIR_TOTAL_LENGTH = END_OF_CENTRAL_DIR_LENGTH + ZIP64_END_OF_CENTRAL_DIR_LOCATOR_LENGTH + ZIP64_END_OF_CENTRAL_DIR_LENGTH;

const ZIP64_TOTAL_NUMBER_OF_DISKS = 1;

const EXTRAFIELD_TYPE_ZIP64 = 0x0001;
const EXTRAFIELD_TYPE_AES = 0x9901;
const EXTRAFIELD_TYPE_NTFS = 0x000a;
const EXTRAFIELD_TYPE_NTFS_TAG1 = 0x0001;
const EXTRAFIELD_TYPE_EXTENDED_TIMESTAMP = 0x5455;
const EXTRAFIELD_TYPE_UNICODE_PATH = 0x7075;
const EXTRAFIELD_TYPE_UNICODE_COMMENT = 0x6375;

const BITFLAG_ENCRYPTED = 0x01;
const BITFLAG_LEVEL = 0x06;
const BITFLAG_DATA_DESCRIPTOR = 0x0008;
const BITFLAG_LANG_ENCODING_FLAG = 0x0800;
const FILE_ATTR_MSDOS_DIR_MASK = 0x10;

const VERSION_DEFLATE = 0x14;
const VERSION_ZIP64 = 0x2D;
const VERSION_AES = 0x33;

const DIRECTORY_SIGNATURE = "/";

const MAX_DATE = new Date(2107, 11, 31);
const MIN_DATE = new Date(1980, 0, 1);

/*
 Copyright (c) 2022 Gildas Lormeau. All rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 1. Redistributions of source code must retain the above copyright notice,
 this list of conditions and the following disclaimer.

 2. Redistributions in binary form must reproduce the above copyright 
 notice, this list of conditions and the following disclaimer in 
 the documentation and/or other materials provided with the distribution.

 3. The names of the authors may not be used to endorse or promote products
 derived from this software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED ''AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
 INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
 INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
 INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
 OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

const CP437 = "\0☺☻♥♦♣♠•◘○◙♂♀♪♫☼►◄↕‼¶§▬↨↑↓→←∟↔▲▼ !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~⌂ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜ¢£¥₧ƒáíóúñÑªº¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ ".split("");

var decodeCP437 = stringValue => {
	let result = "";
	for (let indexCharacter = 0; indexCharacter < stringValue.length; indexCharacter++) {
		result += CP437[stringValue[indexCharacter]];
	}
	return result;
};

/*
 Copyright (c) 2022 Gildas Lormeau. All rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 1. Redistributions of source code must retain the above copyright notice,
 this list of conditions and the following disclaimer.

 2. Redistributions in binary form must reproduce the above copyright 
 notice, this list of conditions and the following disclaimer in 
 the documentation and/or other materials provided with the distribution.

 3. The names of the authors may not be used to endorse or promote products
 derived from this software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED ''AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
 INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
 INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
 INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
 OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

function decodeText(value, encoding) {
	if (encoding && encoding.trim().toLowerCase() == "cp437") {
		return decodeCP437(value);
	} else if (typeof TextDecoder == "undefined") {
		const fileReader = new FileReader();
		return new Promise((resolve, reject) => {
			fileReader.onload = event => resolve(event.target.result);
			fileReader.onerror = () => reject(fileReader.error);
			fileReader.readAsText(new Blob([value]));
		});
	} else {
		return new TextDecoder(encoding).decode(value);
	}
}

/*
 Copyright (c) 2022 Gildas Lormeau. All rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 1. Redistributions of source code must retain the above copyright notice,
 this list of conditions and the following disclaimer.

 2. Redistributions in binary form must reproduce the above copyright 
 notice, this list of conditions and the following disclaimer in 
 the documentation and/or other materials provided with the distribution.

 3. The names of the authors may not be used to endorse or promote products
 derived from this software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED ''AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
 INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
 INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
 INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
 OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

const PROPERTY_NAMES = [
	"filename", "rawFilename", "directory", "encrypted", "compressedSize", "uncompressedSize",
	"lastModDate", "rawLastModDate", "comment", "rawComment", "signature", "extraField",
	"rawExtraField", "bitFlag", "extraFieldZip64", "extraFieldUnicodePath", "extraFieldUnicodeComment",
	"extraFieldAES", "filenameUTF8", "commentUTF8", "offset", "zip64", "compressionMethod",
	"extraFieldNTFS", "lastAccessDate", "creationDate", "extraFieldExtendedTimestamp",
	"version", "versionMadeBy", "msDosCompatible", "internalFileAttribute", "externalFileAttribute"];

class Entry {

	constructor(data) {
		PROPERTY_NAMES.forEach(name => this[name] = data[name]);
	}

}

/*
 Copyright (c) 2022 Gildas Lormeau. All rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 1. Redistributions of source code must retain the above copyright notice,
 this list of conditions and the following disclaimer.

 2. Redistributions in binary form must reproduce the above copyright 
 notice, this list of conditions and the following disclaimer in 
 the documentation and/or other materials provided with the distribution.

 3. The names of the authors may not be used to endorse or promote products
 derived from this software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED ''AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
 INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
 INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
 INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
 OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

const ERR_BAD_FORMAT = "File format is not recognized";
const ERR_EOCDR_NOT_FOUND = "End of central directory not found";
const ERR_EOCDR_ZIP64_NOT_FOUND = "End of Zip64 central directory not found";
const ERR_EOCDR_LOCATOR_ZIP64_NOT_FOUND = "End of Zip64 central directory locator not found";
const ERR_CENTRAL_DIRECTORY_NOT_FOUND = "Central directory header not found";
const ERR_LOCAL_FILE_HEADER_NOT_FOUND = "Local file header not found";
const ERR_EXTRAFIELD_ZIP64_NOT_FOUND = "Zip64 extra field not found";
const ERR_ENCRYPTED = "File contains encrypted entry";
const ERR_UNSUPPORTED_ENCRYPTION = "Encryption method not supported";
const ERR_UNSUPPORTED_COMPRESSION = "Compression method not supported";
const CHARSET_UTF8 = "utf-8";
const CHARSET_CP437 = "cp437";
const ZIP64_PROPERTIES = ["uncompressedSize", "compressedSize", "offset"];

class ZipReader {

	constructor(reader, options = {}) {
		Object.assign(this, {
			reader,
			options,
			config: getConfiguration()
		});
	}

	async* getEntriesGenerator(options = {}) {
		const zipReader = this;
		const reader = zipReader.reader;
		if (!reader.initialized) {
			await reader.init();
		}
		if (reader.size < END_OF_CENTRAL_DIR_LENGTH) {
			throw new Error(ERR_BAD_FORMAT);
		}
		const endOfDirectoryInfo = await seekSignature(reader, END_OF_CENTRAL_DIR_SIGNATURE, reader.size, END_OF_CENTRAL_DIR_LENGTH, MAX_16_BITS * 16);
		if (!endOfDirectoryInfo) {
			throw new Error(ERR_EOCDR_NOT_FOUND);
		}
		const endOfDirectoryView = getDataView$1(endOfDirectoryInfo);
		let directoryDataLength = getUint32(endOfDirectoryView, 12);
		let directoryDataOffset = getUint32(endOfDirectoryView, 16);
		let filesLength = getUint16(endOfDirectoryView, 8);
		let prependedDataLength = 0;
		if (directoryDataOffset == MAX_32_BITS || directoryDataLength == MAX_32_BITS || filesLength == MAX_16_BITS) {
			const endOfDirectoryLocatorArray = await readUint8Array(reader, endOfDirectoryInfo.offset - ZIP64_END_OF_CENTRAL_DIR_LOCATOR_LENGTH, ZIP64_END_OF_CENTRAL_DIR_LOCATOR_LENGTH);
			const endOfDirectoryLocatorView = getDataView$1(endOfDirectoryLocatorArray);
			if (getUint32(endOfDirectoryLocatorView, 0) != ZIP64_END_OF_CENTRAL_DIR_LOCATOR_SIGNATURE) {
				throw new Error(ERR_EOCDR_ZIP64_NOT_FOUND);
			}
			directoryDataOffset = getBigUint64(endOfDirectoryLocatorView, 8);
			let endOfDirectoryArray = await readUint8Array(reader, directoryDataOffset, ZIP64_END_OF_CENTRAL_DIR_LENGTH);
			let endOfDirectoryView = getDataView$1(endOfDirectoryArray);
			const expectedDirectoryDataOffset = endOfDirectoryInfo.offset - ZIP64_END_OF_CENTRAL_DIR_LOCATOR_LENGTH - ZIP64_END_OF_CENTRAL_DIR_LENGTH;
			if (getUint32(endOfDirectoryView, 0) != ZIP64_END_OF_CENTRAL_DIR_SIGNATURE && directoryDataOffset != expectedDirectoryDataOffset) {
				const originalDirectoryDataOffset = directoryDataOffset;
				directoryDataOffset = expectedDirectoryDataOffset;
				prependedDataLength = directoryDataOffset - originalDirectoryDataOffset;
				endOfDirectoryArray = await readUint8Array(reader, directoryDataOffset, ZIP64_END_OF_CENTRAL_DIR_LENGTH);
				endOfDirectoryView = getDataView$1(endOfDirectoryArray);
			}
			if (getUint32(endOfDirectoryView, 0) != ZIP64_END_OF_CENTRAL_DIR_SIGNATURE) {
				throw new Error(ERR_EOCDR_LOCATOR_ZIP64_NOT_FOUND);
			}
			filesLength = getBigUint64(endOfDirectoryView, 32);
			directoryDataLength = getBigUint64(endOfDirectoryView, 40);
			directoryDataOffset -= directoryDataLength;
		}
		if (directoryDataOffset < 0 || directoryDataOffset >= reader.size) {
			throw new Error(ERR_BAD_FORMAT);
		}
		let offset = 0;
		let directoryArray = await readUint8Array(reader, directoryDataOffset, directoryDataLength);
		let directoryView = getDataView$1(directoryArray);
		if (directoryDataLength) {
			const expectedDirectoryDataOffset = endOfDirectoryInfo.offset - directoryDataLength;
			if (getUint32(directoryView, offset) != CENTRAL_FILE_HEADER_SIGNATURE && directoryDataOffset != expectedDirectoryDataOffset) {
				const originalDirectoryDataOffset = directoryDataOffset;
				directoryDataOffset = expectedDirectoryDataOffset;
				prependedDataLength = directoryDataOffset - originalDirectoryDataOffset;
				directoryArray = await readUint8Array(reader, directoryDataOffset, directoryDataLength);
				directoryView = getDataView$1(directoryArray);
			}
		}
		if (directoryDataOffset < 0 || directoryDataOffset >= reader.size) {
			throw new Error(ERR_BAD_FORMAT);
		}
		for (let indexFile = 0; indexFile < filesLength; indexFile++) {
			const fileEntry = new ZipEntry(reader, zipReader.config, zipReader.options);
			if (getUint32(directoryView, offset) != CENTRAL_FILE_HEADER_SIGNATURE) {
				throw new Error(ERR_CENTRAL_DIRECTORY_NOT_FOUND);
			}
			readCommonHeader(fileEntry, directoryView, offset + 6);
			const languageEncodingFlag = Boolean(fileEntry.bitFlag.languageEncodingFlag);
			const filenameOffset = offset + 46;
			const extraFieldOffset = filenameOffset + fileEntry.filenameLength;
			const commentOffset = extraFieldOffset + fileEntry.extraFieldLength;
			const versionMadeBy = getUint16(directoryView, offset + 4);
			const msDosCompatible = (versionMadeBy & 0) == 0;
			Object.assign(fileEntry, {
				versionMadeBy,
				msDosCompatible,
				compressedSize: 0,
				uncompressedSize: 0,
				commentLength: getUint16(directoryView, offset + 32),
				directory: msDosCompatible && ((getUint8(directoryView, offset + 38) & FILE_ATTR_MSDOS_DIR_MASK) == FILE_ATTR_MSDOS_DIR_MASK),
				offset: getUint32(directoryView, offset + 42) + prependedDataLength,
				internalFileAttribute: getUint32(directoryView, offset + 34),
				externalFileAttribute: getUint32(directoryView, offset + 38),
				rawFilename: directoryArray.subarray(filenameOffset, extraFieldOffset),
				filenameUTF8: languageEncodingFlag,
				commentUTF8: languageEncodingFlag,
				rawExtraField: directoryArray.subarray(extraFieldOffset, commentOffset)
			});
			const endOffset = commentOffset + fileEntry.commentLength;
			fileEntry.rawComment = directoryArray.subarray(commentOffset, endOffset);
			const filenameEncoding = getOptionValue$1(zipReader, options, "filenameEncoding");
			const commentEncoding = getOptionValue$1(zipReader, options, "commentEncoding");
			const [filename, comment] = await Promise.all([
				decodeText(fileEntry.rawFilename, fileEntry.filenameUTF8 ? CHARSET_UTF8 : filenameEncoding || CHARSET_CP437),
				decodeText(fileEntry.rawComment, fileEntry.commentUTF8 ? CHARSET_UTF8 : commentEncoding || CHARSET_CP437)
			]);
			fileEntry.filename = filename;
			fileEntry.comment = comment;
			if (!fileEntry.directory && fileEntry.filename.endsWith(DIRECTORY_SIGNATURE)) {
				fileEntry.directory = true;
			}
			await readCommonFooter(fileEntry, fileEntry, directoryView, offset + 6);
			const entry = new Entry(fileEntry);
			entry.getData = (writer, options) => fileEntry.getData(writer, entry, options);
			offset = endOffset;
			if (options.onprogress) {
				try {
					options.onprogress(indexFile + 1, filesLength, new Entry(fileEntry));
				} catch (_error) {
					// ignored
				}
			}
			yield entry;
		}
		return true;
	}

	async getEntries(options = {}) {
		const entries = [];
		const iter = this.getEntriesGenerator(options);
		let curr = iter.next();
		while(!(await curr).done) {
			entries.push((await curr).value);
			curr = iter.next();
		}
		return entries;
	}

	async close() {
	}
}

class ZipEntry {

	constructor(reader, config, options) {
		Object.assign(this, {
			reader,
			config,
			options
		});
	}

	async getData(writer, fileEntry, options = {}) {
		const zipEntry = this;
		const {
			reader,
			offset,
			extraFieldAES,
			compressionMethod,
			config,
			bitFlag,
			signature,
			rawLastModDate,
			compressedSize
		} = zipEntry;
		const localDirectory = zipEntry.localDirectory = {};
		if (!reader.initialized) {
			await reader.init();
		}
		let dataArray = await readUint8Array(reader, offset, 30);
		const dataView = getDataView$1(dataArray);
		let password = getOptionValue$1(zipEntry, options, "password");
		password = password && password.length && password;
		if (extraFieldAES) {
			if (extraFieldAES.originalCompressionMethod != COMPRESSION_METHOD_AES) {
				throw new Error(ERR_UNSUPPORTED_COMPRESSION);
			}
		}
		if (compressionMethod != COMPRESSION_METHOD_STORE && compressionMethod != COMPRESSION_METHOD_DEFLATE) {
			throw new Error(ERR_UNSUPPORTED_COMPRESSION);
		}
		if (getUint32(dataView, 0) != LOCAL_FILE_HEADER_SIGNATURE) {
			throw new Error(ERR_LOCAL_FILE_HEADER_NOT_FOUND);
		}
		readCommonHeader(localDirectory, dataView, 4);
		dataArray = await readUint8Array(reader, offset, 30 + localDirectory.filenameLength + localDirectory.extraFieldLength);
		localDirectory.rawExtraField = dataArray.subarray(30 + localDirectory.filenameLength);
		await readCommonFooter(zipEntry, localDirectory, dataView, 4);
		fileEntry.lastAccessDate = localDirectory.lastAccessDate;
		fileEntry.creationDate = localDirectory.creationDate;
		const encrypted = zipEntry.encrypted && localDirectory.encrypted;
		const zipCrypto = encrypted && !extraFieldAES;
		if (encrypted) {
			if (!zipCrypto && extraFieldAES.strength === undefined) {
				throw new Error(ERR_UNSUPPORTED_ENCRYPTION);
			} else if (!password) {
				throw new Error(ERR_ENCRYPTED);
			}
		}
		const codec = await createCodec(config.Inflate, {
			codecType: CODEC_INFLATE,
			password,
			zipCrypto,
			encryptionStrength: extraFieldAES && extraFieldAES.strength,
			signed: getOptionValue$1(zipEntry, options, "checkSignature"),
			passwordVerification: zipCrypto && (bitFlag.dataDescriptor ? ((rawLastModDate >>> 8) & 0xFF) : ((signature >>> 24) & 0xFF)),
			signature,
			compressed: compressionMethod != 0,
			encrypted,
			useWebWorkers: getOptionValue$1(zipEntry, options, "useWebWorkers")
		}, config);
		if (!writer.initialized) {
			await writer.init();
		}
		const signal = getOptionValue$1(zipEntry, options, "signal");
		const dataOffset = offset + 30 + localDirectory.filenameLength + localDirectory.extraFieldLength;
		await processData(codec, reader, writer, dataOffset, () => compressedSize, config, { onprogress: options.onprogress, signal });
		return writer.getData();
	}
}

function readCommonHeader(directory, dataView, offset) {
	const rawBitFlag = directory.rawBitFlag = getUint16(dataView, offset + 2);
	const encrypted = (rawBitFlag & BITFLAG_ENCRYPTED) == BITFLAG_ENCRYPTED;
	const rawLastModDate = getUint32(dataView, offset + 6);
	Object.assign(directory, {
		encrypted,
		version: getUint16(dataView, offset),
		bitFlag: {
			level: (rawBitFlag & BITFLAG_LEVEL) >> 1,
			dataDescriptor: (rawBitFlag & BITFLAG_DATA_DESCRIPTOR) == BITFLAG_DATA_DESCRIPTOR,
			languageEncodingFlag: (rawBitFlag & BITFLAG_LANG_ENCODING_FLAG) == BITFLAG_LANG_ENCODING_FLAG
		},
		rawLastModDate,
		lastModDate: getDate(rawLastModDate),
		filenameLength: getUint16(dataView, offset + 22),
		extraFieldLength: getUint16(dataView, offset + 24)
	});
}

async function readCommonFooter(fileEntry, directory, dataView, offset) {
	const rawExtraField = directory.rawExtraField;
	const extraField = directory.extraField = new Map();
	const rawExtraFieldView = getDataView$1(new Uint8Array(rawExtraField));
	let offsetExtraField = 0;
	try {
		while (offsetExtraField < rawExtraField.length) {
			const type = getUint16(rawExtraFieldView, offsetExtraField);
			const size = getUint16(rawExtraFieldView, offsetExtraField + 2);
			extraField.set(type, {
				type,
				data: rawExtraField.slice(offsetExtraField + 4, offsetExtraField + 4 + size)
			});
			offsetExtraField += 4 + size;
		}
	} catch (_error) {
		// ignored
	}
	const compressionMethod = getUint16(dataView, offset + 4);
	directory.signature = getUint32(dataView, offset + 10);
	directory.uncompressedSize = getUint32(dataView, offset + 18);
	directory.compressedSize = getUint32(dataView, offset + 14);
	const extraFieldZip64 = extraField.get(EXTRAFIELD_TYPE_ZIP64);
	if (extraFieldZip64) {
		readExtraFieldZip64(extraFieldZip64, directory);
		directory.extraFieldZip64 = extraFieldZip64;
	}
	const extraFieldUnicodePath = extraField.get(EXTRAFIELD_TYPE_UNICODE_PATH);
	if (extraFieldUnicodePath) {
		await readExtraFieldUnicode(extraFieldUnicodePath, "filename", "rawFilename", directory, fileEntry);
		directory.extraFieldUnicodePath = extraFieldUnicodePath;
	}
	const extraFieldUnicodeComment = extraField.get(EXTRAFIELD_TYPE_UNICODE_COMMENT);
	if (extraFieldUnicodeComment) {
		await readExtraFieldUnicode(extraFieldUnicodeComment, "comment", "rawComment", directory, fileEntry);
		directory.extraFieldUnicodeComment = extraFieldUnicodeComment;
	}
	const extraFieldAES = extraField.get(EXTRAFIELD_TYPE_AES);
	if (extraFieldAES) {
		readExtraFieldAES(extraFieldAES, directory, compressionMethod);
		directory.extraFieldAES = extraFieldAES;
	} else {
		directory.compressionMethod = compressionMethod;
	}
	const extraFieldNTFS = extraField.get(EXTRAFIELD_TYPE_NTFS);
	if (extraFieldNTFS) {
		readExtraFieldNTFS(extraFieldNTFS, directory);
		directory.extraFieldNTFS = extraFieldNTFS;
	}
	const extraFieldExtendedTimestamp = extraField.get(EXTRAFIELD_TYPE_EXTENDED_TIMESTAMP);
	if (extraFieldExtendedTimestamp) {
		readExtraFieldExtendedTimestamp(extraFieldExtendedTimestamp, directory);
		directory.extraFieldExtendedTimestamp = extraFieldExtendedTimestamp;
	}
}

function readExtraFieldZip64(extraFieldZip64, directory) {
	directory.zip64 = true;
	const extraFieldView = getDataView$1(extraFieldZip64.data);
	extraFieldZip64.values = [];
	for (let indexValue = 0; indexValue < Math.floor(extraFieldZip64.data.length / 8); indexValue++) {
		extraFieldZip64.values.push(getBigUint64(extraFieldView, 0 + indexValue * 8));
	}
	const missingProperties = ZIP64_PROPERTIES.filter(propertyName => directory[propertyName] == MAX_32_BITS);
	for (let indexMissingProperty = 0; indexMissingProperty < missingProperties.length; indexMissingProperty++) {
		extraFieldZip64[missingProperties[indexMissingProperty]] = extraFieldZip64.values[indexMissingProperty];
	}
	ZIP64_PROPERTIES.forEach(propertyName => {
		if (directory[propertyName] == MAX_32_BITS) {
			if (extraFieldZip64[propertyName] !== undefined) {
				directory[propertyName] = extraFieldZip64[propertyName];
			} else {
				throw new Error(ERR_EXTRAFIELD_ZIP64_NOT_FOUND);
			}
		}
	});
}

async function readExtraFieldUnicode(extraFieldUnicode, propertyName, rawPropertyName, directory, fileEntry) {
	const extraFieldView = getDataView$1(extraFieldUnicode.data);
	extraFieldUnicode.version = getUint8(extraFieldView, 0);
	extraFieldUnicode.signature = getUint32(extraFieldView, 1);
	const crc32 = new Crc32();
	crc32.append(fileEntry[rawPropertyName]);
	const dataViewSignature = getDataView$1(new Uint8Array(4));
	dataViewSignature.setUint32(0, crc32.get(), true);
	extraFieldUnicode[propertyName] = await decodeText(extraFieldUnicode.data.subarray(5));
	extraFieldUnicode.valid = !fileEntry.bitFlag.languageEncodingFlag && extraFieldUnicode.signature == getUint32(dataViewSignature, 0);
	if (extraFieldUnicode.valid) {
		directory[propertyName] = extraFieldUnicode[propertyName];
		directory[propertyName + "UTF8"] = true;
	}
}

function readExtraFieldAES(extraFieldAES, directory, compressionMethod) {
	const extraFieldView = getDataView$1(extraFieldAES.data);
	extraFieldAES.vendorVersion = getUint8(extraFieldView, 0);
	extraFieldAES.vendorId = getUint8(extraFieldView, 2);
	const strength = getUint8(extraFieldView, 4);
	extraFieldAES.strength = strength;
	extraFieldAES.originalCompressionMethod = compressionMethod;
	directory.compressionMethod = extraFieldAES.compressionMethod = getUint16(extraFieldView, 5);
}

function readExtraFieldNTFS(extraFieldNTFS, directory) {
	const extraFieldView = getDataView$1(extraFieldNTFS.data);
	let offsetExtraField = 4;
	let tag1Data;
	try {
		while (offsetExtraField < extraFieldNTFS.data.length && !tag1Data) {
			const tagValue = getUint16(extraFieldView, offsetExtraField);
			const attributeSize = getUint16(extraFieldView, offsetExtraField + 2);
			if (tagValue == EXTRAFIELD_TYPE_NTFS_TAG1) {
				tag1Data = extraFieldNTFS.data.slice(offsetExtraField + 4, offsetExtraField + 4 + attributeSize);
			}
			offsetExtraField += 4 + attributeSize;
		}
	} catch (_error) {
		// ignored
	}
	try {
		if (tag1Data && tag1Data.length == 24) {
			const tag1View = getDataView$1(tag1Data);
			const rawLastModDate = tag1View.getBigUint64(0, true);
			const rawLastAccessDate = tag1View.getBigUint64(8, true);
			const rawCreationDate = tag1View.getBigUint64(16, true);
			Object.assign(extraFieldNTFS, {
				rawLastModDate,
				rawLastAccessDate,
				rawCreationDate
			});
			const lastModDate = getDateNTFS(rawLastModDate);
			const lastAccessDate = getDateNTFS(rawLastAccessDate);
			const creationDate = getDateNTFS(rawCreationDate);
			const extraFieldData = { lastModDate, lastAccessDate, creationDate };
			Object.assign(extraFieldNTFS, extraFieldData);
			Object.assign(directory, extraFieldData);
		}
	} catch (_error) {
		// ignored
	}
}

function readExtraFieldExtendedTimestamp(extraFieldExtendedTimestamp, directory) {
	const extraFieldView = getDataView$1(extraFieldExtendedTimestamp.data);
	const flags = getUint8(extraFieldView, 0);
	const timeProperties = [];
	const timeRawProperties = [];
	if ((flags & 0x1) == 0x1) {
		timeProperties.push("lastModDate");
		timeRawProperties.push("rawLastModDate");
	}
	if ((flags & 0x2) == 0x2) {
		timeProperties.push("lastAccessDate");
		timeRawProperties.push("rawLastAccessDate");
	}
	if ((flags & 0x4) == 0x4) {
		timeProperties.push("creationDate");
		timeRawProperties.push("rawCreationDate");
	}
	let offset = 1;
	timeProperties.forEach((propertyName, indexProperty) => {
		if (extraFieldExtendedTimestamp.data.length >= offset + 4) {
			const time = getUint32(extraFieldView, offset);
			directory[propertyName] = extraFieldExtendedTimestamp[propertyName] = new Date(time * 1000);
			const rawPropertyName = timeRawProperties[indexProperty];
			extraFieldExtendedTimestamp[rawPropertyName] = time;
		}
		offset += 4;
	});
}

async function seekSignature(reader, signature, startOffset, minimumBytes, maximumLength) {
	const signatureArray = new Uint8Array(4);
	const signatureView = getDataView$1(signatureArray);
	setUint32$1(signatureView, 0, signature);
	const maximumBytes = minimumBytes + maximumLength;
	return (await seek(minimumBytes)) || await seek(Math.min(maximumBytes, startOffset));

	async function seek(length) {
		const offset = startOffset - length;
		const bytes = await readUint8Array(reader, offset, length);
		for (let indexByte = bytes.length - minimumBytes; indexByte >= 0; indexByte--) {
			if (bytes[indexByte] == signatureArray[0] && bytes[indexByte + 1] == signatureArray[1] &&
				bytes[indexByte + 2] == signatureArray[2] && bytes[indexByte + 3] == signatureArray[3]) {
				return {
					offset: offset + indexByte,
					buffer: bytes.slice(indexByte, indexByte + minimumBytes).buffer
				};
			}
		}
	}
}

function getOptionValue$1(zipReader, options, name) {
	return options[name] === undefined ? zipReader.options[name] : options[name];
}

function getDate(timeRaw) {
	const date = (timeRaw & 0xffff0000) >> 16, time = timeRaw & 0x0000ffff;
	try {
		return new Date(1980 + ((date & 0xFE00) >> 9), ((date & 0x01E0) >> 5) - 1, date & 0x001F, (time & 0xF800) >> 11, (time & 0x07E0) >> 5, (time & 0x001F) * 2, 0);
	} catch (_error) {
		// ignored
	}
}

function getDateNTFS(timeRaw) {
	return new Date((Number((timeRaw / BigInt(10000)) - BigInt(11644473600000))));
}

function getUint8(view, offset) {
	return view.getUint8(offset);
}

function getUint16(view, offset) {
	return view.getUint16(offset, true);
}

function getUint32(view, offset) {
	return view.getUint32(offset, true);
}

function getBigUint64(view, offset) {
	return Number(view.getBigUint64(offset, true));
}

function setUint32$1(view, offset, value) {
	view.setUint32(offset, value, true);
}

function getDataView$1(array) {
	return new DataView(array.buffer);
}

function readUint8Array(reader, offset, size) {
	return reader.readUint8Array(offset, size);
}

/*
 Copyright (c) 2022 Gildas Lormeau. All rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 1. Redistributions of source code must retain the above copyright notice,
 this list of conditions and the following disclaimer.

 2. Redistributions in binary form must reproduce the above copyright 
 notice, this list of conditions and the following disclaimer in 
 the documentation and/or other materials provided with the distribution.

 3. The names of the authors may not be used to endorse or promote products
 derived from this software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED ''AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
 INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
 INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
 INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
 OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

const ERR_DUPLICATED_NAME = "File already exists";
const ERR_INVALID_COMMENT = "Zip file comment exceeds 64KB";
const ERR_INVALID_ENTRY_COMMENT = "File entry comment exceeds 64KB";
const ERR_INVALID_ENTRY_NAME = "File entry name exceeds 64KB";
const ERR_INVALID_VERSION = "Version exceeds 65535";
const ERR_INVALID_ENCRYPTION_STRENGTH = "The strength must equal 1, 2, or 3";
const ERR_INVALID_EXTRAFIELD_TYPE = "Extra field type exceeds 65535";
const ERR_INVALID_EXTRAFIELD_DATA = "Extra field data exceeds 64KB";
const ERR_UNSUPPORTED_FORMAT = "Zip64 is not supported";

const EXTRAFIELD_DATA_AES = new Uint8Array([0x07, 0x00, 0x02, 0x00, 0x41, 0x45, 0x03, 0x00, 0x00]);
const EXTRAFIELD_LENGTH_ZIP64 = 24;

let workers = 0;

class ZipWriter {

	constructor(writer, options = {}) {
		Object.assign(this, {
			writer,
			options,
			config: getConfiguration(),
			files: new Map(),
			offset: writer.size,
			pendingCompressedSize: 0,
			pendingEntries: [],
			pendingAddFileCalls: new Set()
		});
	}

	async add(name = "", reader, options = {}) {
		const zipWriter = this;
		if (workers < zipWriter.config.maxWorkers) {
			workers++;
			let promiseAddFile;
			try {
				promiseAddFile = addFile(zipWriter, name, reader, options);
				this.pendingAddFileCalls.add(promiseAddFile);
				return await promiseAddFile;
			} finally {
				this.pendingAddFileCalls.delete(promiseAddFile);
				workers--;
				const pendingEntry = zipWriter.pendingEntries.shift();
				if (pendingEntry) {
					zipWriter.add(pendingEntry.name, pendingEntry.reader, pendingEntry.options)
						.then(pendingEntry.resolve)
						.catch(pendingEntry.reject);
				}
			}
		} else {
			return new Promise((resolve, reject) => zipWriter.pendingEntries.push({ name, reader, options, resolve, reject }));
		}
	}

	async close(comment = new Uint8Array(0), options = {}) {
		while (this.pendingAddFileCalls.size) {
			await Promise.all(Array.from(this.pendingAddFileCalls));
		}
		await closeFile(this, comment, options);
		return this.writer.getData();
	}
}

async function addFile(zipWriter, name, reader, options) {
	name = name.trim();
	if (options.directory && (!name.endsWith(DIRECTORY_SIGNATURE))) {
		name += DIRECTORY_SIGNATURE;
	} else {
		options.directory = name.endsWith(DIRECTORY_SIGNATURE);
	}
	if (zipWriter.files.has(name)) {
		throw new Error(ERR_DUPLICATED_NAME);
	}
	const rawFilename = encodeText(name);
	if (rawFilename.length > MAX_16_BITS) {
		throw new Error(ERR_INVALID_ENTRY_NAME);
	}
	const comment = options.comment || "";
	const rawComment = encodeText(comment);
	if (rawComment.length > MAX_16_BITS) {
		throw new Error(ERR_INVALID_ENTRY_COMMENT);
	}
	const version = zipWriter.options.version || options.version || 0;
	if (version > MAX_16_BITS) {
		throw new Error(ERR_INVALID_VERSION);
	}
	const versionMadeBy = zipWriter.options.versionMadeBy || options.versionMadeBy || 20;
	if (versionMadeBy > MAX_16_BITS) {
		throw new Error(ERR_INVALID_VERSION);
	}
	const lastModDate = getOptionValue(zipWriter, options, "lastModDate") || new Date();
	const lastAccessDate = getOptionValue(zipWriter, options, "lastAccessDate");
	const creationDate = getOptionValue(zipWriter, options, "creationDate");
	const password = getOptionValue(zipWriter, options, "password");
	const encryptionStrength = getOptionValue(zipWriter, options, "encryptionStrength") || 3;
	const zipCrypto = getOptionValue(zipWriter, options, "zipCrypto");
	if (password !== undefined && encryptionStrength !== undefined && (encryptionStrength < 1 || encryptionStrength > 3)) {
		throw new Error(ERR_INVALID_ENCRYPTION_STRENGTH);
	}
	let rawExtraField = new Uint8Array(0);
	const extraField = options.extraField;
	if (extraField) {
		let extraFieldSize = 0;
		let offset = 0;
		extraField.forEach(data => extraFieldSize += 4 + data.length);
		rawExtraField = new Uint8Array(extraFieldSize);
		extraField.forEach((data, type) => {
			if (type > MAX_16_BITS) {
				throw new Error(ERR_INVALID_EXTRAFIELD_TYPE);
			}
			if (data.length > MAX_16_BITS) {
				throw new Error(ERR_INVALID_EXTRAFIELD_DATA);
			}
			arraySet(rawExtraField, new Uint16Array([type]), offset);
			arraySet(rawExtraField, new Uint16Array([data.length]), offset + 2);
			arraySet(rawExtraField, data, offset + 4);
			offset += 4 + data.length;
		});
	}
	let extendedTimestamp = getOptionValue(zipWriter, options, "extendedTimestamp");
	if (extendedTimestamp === undefined) {
		extendedTimestamp = true;
	}
	let maximumCompressedSize = 0;
	let keepOrder = getOptionValue(zipWriter, options, "keepOrder");
	if (keepOrder === undefined) {
		keepOrder = true;
	}
	let uncompressedSize = 0;
	let msDosCompatible = getOptionValue(zipWriter, options, "msDosCompatible");
	if (msDosCompatible === undefined) {
		msDosCompatible = true;
	}
	const internalFileAttribute = getOptionValue(zipWriter, options, "internalFileAttribute") || 0;
	const externalFileAttribute = getOptionValue(zipWriter, options, "externalFileAttribute") || 0;
	if (reader) {
		if (!reader.initialized) {
			await reader.init();
		}
		uncompressedSize = reader.size;
		maximumCompressedSize = getMaximumCompressedSize(uncompressedSize);
	}
	let zip64 = options.zip64 || zipWriter.options.zip64 || false;
	if (zipWriter.offset + zipWriter.pendingCompressedSize >= MAX_32_BITS ||
		uncompressedSize >= MAX_32_BITS ||
		maximumCompressedSize >= MAX_32_BITS) {
		if (options.zip64 === false || zipWriter.options.zip64 === false || !keepOrder) {
			throw new Error(ERR_UNSUPPORTED_FORMAT);
		} else {
			zip64 = true;
		}
	}
	zipWriter.pendingCompressedSize += maximumCompressedSize;
	await Promise.resolve();
	const level = getOptionValue(zipWriter, options, "level");
	const useWebWorkers = getOptionValue(zipWriter, options, "useWebWorkers");
	const bufferedWrite = getOptionValue(zipWriter, options, "bufferedWrite");
	let dataDescriptor = getOptionValue(zipWriter, options, "dataDescriptor");
	let dataDescriptorSignature = getOptionValue(zipWriter, options, "dataDescriptorSignature");
	const signal = getOptionValue(zipWriter, options, "signal");
	if (dataDescriptor === undefined) {
		dataDescriptor = true;
	}
	if (dataDescriptor && dataDescriptorSignature === undefined) {
		dataDescriptorSignature = false;
	}
	const fileEntry = await getFileEntry(zipWriter, name, reader, Object.assign({}, options, {
		rawFilename,
		rawComment,
		version,
		versionMadeBy,
		lastModDate,
		lastAccessDate,
		creationDate,
		rawExtraField,
		zip64,
		password,
		level,
		useWebWorkers,
		encryptionStrength,
		extendedTimestamp,
		zipCrypto,
		bufferedWrite,
		keepOrder,
		dataDescriptor,
		dataDescriptorSignature,
		signal,
		msDosCompatible,
		internalFileAttribute,
		externalFileAttribute
	}));
	if (maximumCompressedSize) {
		zipWriter.pendingCompressedSize -= maximumCompressedSize;
	}
	Object.assign(fileEntry, { name, comment, extraField });
	return new Entry(fileEntry);
}

async function getFileEntry(zipWriter, name, reader, options) {
	const files = zipWriter.files;
	const writer = zipWriter.writer;
	const previousFileEntry = Array.from(files.values()).pop();
	let fileEntry = {};
	let bufferedWrite;
	let resolveLockUnbufferedWrite;
	let resolveLockCurrentFileEntry;
	files.set(name, fileEntry);
	try {
		let lockPreviousFileEntry;
		let fileWriter;
		let lockCurrentFileEntry;
		if (options.keepOrder) {
			lockPreviousFileEntry = previousFileEntry && previousFileEntry.lock;
		}
		fileEntry.lock = lockCurrentFileEntry = new Promise(resolve => resolveLockCurrentFileEntry = resolve);
		if (options.bufferedWrite || zipWriter.lockWrite || !options.dataDescriptor) {
			fileWriter = new BlobWriter();
			fileWriter.init();
			bufferedWrite = true;
		} else {
			zipWriter.lockWrite = new Promise(resolve => resolveLockUnbufferedWrite = resolve);
			if (!writer.initialized) {
				await writer.init();
			}
			fileWriter = writer;
		}
		fileEntry = await createFileEntry(reader, fileWriter, zipWriter.config, options);
		fileEntry.lock = lockCurrentFileEntry;
		files.set(name, fileEntry);
		fileEntry.filename = name;
		if (bufferedWrite) {
			let indexWrittenData = 0;
			const blob = fileWriter.getData();
			await Promise.all([zipWriter.lockWrite, lockPreviousFileEntry]);
			let pendingFileEntry;
			do {
				pendingFileEntry = Array.from(files.values()).find(fileEntry => fileEntry.writingBufferedData);
				if (pendingFileEntry) {
					await pendingFileEntry.lock;
				}
			} while (pendingFileEntry && pendingFileEntry.lock);
			fileEntry.writingBufferedData = true;
			if (!options.dataDescriptor) {
				const headerLength = 26;
				const arrayBuffer = await sliceAsArrayBuffer(blob, 0, headerLength);
				const arrayBufferView = new DataView(arrayBuffer);
				if (!fileEntry.encrypted || options.zipCrypto) {
					setUint32(arrayBufferView, 14, fileEntry.signature);
				}
				if (fileEntry.zip64) {
					setUint32(arrayBufferView, 18, MAX_32_BITS);
					setUint32(arrayBufferView, 22, MAX_32_BITS);
				} else {
					setUint32(arrayBufferView, 18, fileEntry.compressedSize);
					setUint32(arrayBufferView, 22, fileEntry.uncompressedSize);
				}
				await writer.writeUint8Array(new Uint8Array(arrayBuffer));
				indexWrittenData = headerLength;
			}
			await writeBlob(writer, blob, indexWrittenData);
			delete fileEntry.writingBufferedData;
		}
		fileEntry.offset = zipWriter.offset;
		if (fileEntry.zip64) {
			const rawExtraFieldZip64View = getDataView(fileEntry.rawExtraFieldZip64);
			setBigUint64(rawExtraFieldZip64View, 20, BigInt(fileEntry.offset));
		} else if (fileEntry.offset >= MAX_32_BITS) {
			throw new Error(ERR_UNSUPPORTED_FORMAT);
		}
		zipWriter.offset += fileEntry.length;
		return fileEntry;
	} catch (error) {
		if ((bufferedWrite && fileEntry.writingBufferedData) || (!bufferedWrite && fileEntry.dataWritten)) {
			error.corruptedEntry = zipWriter.hasCorruptedEntries = true;
			if (fileEntry.uncompressedSize) {
				zipWriter.offset += fileEntry.uncompressedSize;
			}
		}
		files.delete(name);
		throw error;
	} finally {
		resolveLockCurrentFileEntry();
		if (resolveLockUnbufferedWrite) {
			resolveLockUnbufferedWrite();
		}
	}
}

async function createFileEntry(reader, writer, config, options) {
	const {
		rawFilename,
		lastAccessDate,
		creationDate,
		password,
		level,
		zip64,
		zipCrypto,
		dataDescriptor,
		dataDescriptorSignature,
		directory,
		version,
		versionMadeBy,
		rawComment,
		rawExtraField,
		useWebWorkers,
		onprogress,
		signal,
		encryptionStrength,
		extendedTimestamp,
		msDosCompatible,
		internalFileAttribute,
		externalFileAttribute
	} = options;
	const encrypted = Boolean(password && password.length);
	const compressed = level !== 0 && !directory;
	let rawExtraFieldAES;
	if (encrypted && !zipCrypto) {
		rawExtraFieldAES = new Uint8Array(EXTRAFIELD_DATA_AES.length + 2);
		const extraFieldAESView = getDataView(rawExtraFieldAES);
		setUint16(extraFieldAESView, 0, EXTRAFIELD_TYPE_AES);
		arraySet(rawExtraFieldAES, EXTRAFIELD_DATA_AES, 2);
		setUint8(extraFieldAESView, 8, encryptionStrength);
	} else {
		rawExtraFieldAES = new Uint8Array(0);
	}
	let rawExtraFieldNTFS;
	let rawExtraFieldExtendedTimestamp;
	if (extendedTimestamp) {
		rawExtraFieldExtendedTimestamp = new Uint8Array(9 + (lastAccessDate ? 4 : 0) + (creationDate ? 4 : 0));
		const extraFieldExtendedTimestampView = getDataView(rawExtraFieldExtendedTimestamp);
		setUint16(extraFieldExtendedTimestampView, 0, EXTRAFIELD_TYPE_EXTENDED_TIMESTAMP);
		setUint16(extraFieldExtendedTimestampView, 2, rawExtraFieldExtendedTimestamp.length - 4);
		const extraFieldExtendedTimestampFlag = 0x1 + (lastAccessDate ? 0x2 : 0) + (creationDate ? 0x4 : 0);
		setUint8(extraFieldExtendedTimestampView, 4, extraFieldExtendedTimestampFlag);
		setUint32(extraFieldExtendedTimestampView, 5, Math.floor(options.lastModDate.getTime() / 1000));
		if (lastAccessDate) {
			setUint32(extraFieldExtendedTimestampView, 9, Math.floor(lastAccessDate.getTime() / 1000));
		}
		if (creationDate) {
			setUint32(extraFieldExtendedTimestampView, 13, Math.floor(creationDate.getTime() / 1000));
		}
		try {
			rawExtraFieldNTFS = new Uint8Array(36);
			const extraFieldNTFSView = getDataView(rawExtraFieldNTFS);
			const lastModTimeNTFS = getTimeNTFS(options.lastModDate);
			setUint16(extraFieldNTFSView, 0, EXTRAFIELD_TYPE_NTFS);
			setUint16(extraFieldNTFSView, 2, 32);
			setUint16(extraFieldNTFSView, 8, EXTRAFIELD_TYPE_NTFS_TAG1);
			setUint16(extraFieldNTFSView, 10, 24);
			setBigUint64(extraFieldNTFSView, 12, lastModTimeNTFS);
			setBigUint64(extraFieldNTFSView, 20, getTimeNTFS(lastAccessDate) || lastModTimeNTFS);
			setBigUint64(extraFieldNTFSView, 28, getTimeNTFS(creationDate) || lastModTimeNTFS);
		} catch (_error) {
			rawExtraFieldNTFS = new Uint8Array(0);
		}
	} else {
		rawExtraFieldNTFS = rawExtraFieldExtendedTimestamp = new Uint8Array(0);
	}
	const fileEntry = {
		version: version || VERSION_DEFLATE,
		versionMadeBy,
		zip64,
		directory: Boolean(directory),
		filenameUTF8: true,
		rawFilename,
		commentUTF8: true,
		rawComment,
		rawExtraFieldZip64: zip64 ? new Uint8Array(EXTRAFIELD_LENGTH_ZIP64 + 4) : new Uint8Array(0),
		rawExtraFieldExtendedTimestamp,
		rawExtraFieldNTFS,
		rawExtraFieldAES,
		rawExtraField,
		extendedTimestamp,
		msDosCompatible,
		internalFileAttribute,
		externalFileAttribute
	};
	let uncompressedSize = fileEntry.uncompressedSize = 0;
	let bitFlag = BITFLAG_LANG_ENCODING_FLAG;
	if (dataDescriptor) {
		bitFlag = bitFlag | BITFLAG_DATA_DESCRIPTOR;
	}
	let compressionMethod = COMPRESSION_METHOD_STORE;
	if (compressed) {
		compressionMethod = COMPRESSION_METHOD_DEFLATE;
	}
	if (zip64) {
		fileEntry.version = fileEntry.version > VERSION_ZIP64 ? fileEntry.version : VERSION_ZIP64;
	}
	if (encrypted) {
		bitFlag = bitFlag | BITFLAG_ENCRYPTED;
		if (!zipCrypto) {
			fileEntry.version = fileEntry.version > VERSION_AES ? fileEntry.version : VERSION_AES;
			compressionMethod = COMPRESSION_METHOD_AES;
			if (compressed) {
				fileEntry.rawExtraFieldAES[9] = COMPRESSION_METHOD_DEFLATE;
			}
		}
	}
	fileEntry.compressionMethod = compressionMethod;
	const headerArray = fileEntry.headerArray = new Uint8Array(26);
	const headerView = getDataView(headerArray);
	setUint16(headerView, 0, fileEntry.version);
	setUint16(headerView, 2, bitFlag);
	setUint16(headerView, 4, compressionMethod);
	const dateArray = new Uint32Array(1);
	const dateView = getDataView(dateArray);
	let lastModDate;
	if (options.lastModDate < MIN_DATE) {
		lastModDate = MIN_DATE;
	} else if (options.lastModDate > MAX_DATE) {
		lastModDate = MAX_DATE;
	} else {
		lastModDate = options.lastModDate;
	}
	setUint16(dateView, 0, (((lastModDate.getHours() << 6) | lastModDate.getMinutes()) << 5) | lastModDate.getSeconds() / 2);
	setUint16(dateView, 2, ((((lastModDate.getFullYear() - 1980) << 4) | (lastModDate.getMonth() + 1)) << 5) | lastModDate.getDate());
	const rawLastModDate = dateArray[0];
	setUint32(headerView, 6, rawLastModDate);
	setUint16(headerView, 22, rawFilename.length);
	const extraFieldLength = rawExtraFieldAES.length + rawExtraFieldExtendedTimestamp.length + rawExtraFieldNTFS.length + fileEntry.rawExtraField.length;
	setUint16(headerView, 24, extraFieldLength);
	const localHeaderArray = new Uint8Array(30 + rawFilename.length + extraFieldLength);
	const localHeaderView = getDataView(localHeaderArray);
	setUint32(localHeaderView, 0, LOCAL_FILE_HEADER_SIGNATURE);
	arraySet(localHeaderArray, headerArray, 4);
	arraySet(localHeaderArray, rawFilename, 30);
	arraySet(localHeaderArray, rawExtraFieldAES, 30 + rawFilename.length);
	arraySet(localHeaderArray, rawExtraFieldExtendedTimestamp, 30 + rawFilename.length + rawExtraFieldAES.length);
	arraySet(localHeaderArray, rawExtraFieldNTFS, 30 + rawFilename.length + rawExtraFieldAES.length + rawExtraFieldExtendedTimestamp.length);
	arraySet(localHeaderArray, fileEntry.rawExtraField, 30 + rawFilename.length + rawExtraFieldAES.length + rawExtraFieldExtendedTimestamp.length + rawExtraFieldNTFS.length);
	let result;
	let compressedSize = 0;
	if (reader) {
		const codec = await createCodec(config.Deflate, {
			codecType: CODEC_DEFLATE,
			level,
			password,
			encryptionStrength,
			zipCrypto: encrypted && zipCrypto,
			passwordVerification: encrypted && zipCrypto && (rawLastModDate >> 8) & 0xFF,
			signed: true,
			compressed,
			encrypted,
			useWebWorkers
		}, config);
		await writer.writeUint8Array(localHeaderArray);
		fileEntry.dataWritten = true;
		result = await processData(codec, reader, writer, 0, () => reader.size, config, { onprogress, signal });
		uncompressedSize = fileEntry.uncompressedSize = reader.size;
		compressedSize = result.length;
	} else {
		await writer.writeUint8Array(localHeaderArray);
		fileEntry.dataWritten = true;
	}
	let dataDescriptorArray = new Uint8Array(0);
	let dataDescriptorView, dataDescriptorOffset = 0;
	if (dataDescriptor) {
		dataDescriptorArray = new Uint8Array(zip64 ? (dataDescriptorSignature ? 24 : 20) : (dataDescriptorSignature ? 16 : 12));
		dataDescriptorView = getDataView(dataDescriptorArray);
		if (dataDescriptorSignature) {
			dataDescriptorOffset = 4;
			setUint32(dataDescriptorView, 0, DATA_DESCRIPTOR_RECORD_SIGNATURE);
		}
	}
	if (reader) {
		const signature = result.signature;
		if ((!encrypted || zipCrypto) && signature !== undefined) {
			setUint32(headerView, 10, signature);
			fileEntry.signature = signature;
			if (dataDescriptor) {
				setUint32(dataDescriptorView, dataDescriptorOffset, signature);
			}
		}
		if (zip64) {
			const rawExtraFieldZip64View = getDataView(fileEntry.rawExtraFieldZip64);
			setUint16(rawExtraFieldZip64View, 0, EXTRAFIELD_TYPE_ZIP64);
			setUint16(rawExtraFieldZip64View, 2, EXTRAFIELD_LENGTH_ZIP64);
			setUint32(headerView, 14, MAX_32_BITS);
			setBigUint64(rawExtraFieldZip64View, 12, BigInt(compressedSize));
			setUint32(headerView, 18, MAX_32_BITS);
			setBigUint64(rawExtraFieldZip64View, 4, BigInt(uncompressedSize));
			if (dataDescriptor) {
				setBigUint64(dataDescriptorView, dataDescriptorOffset + 4, BigInt(compressedSize));
				setBigUint64(dataDescriptorView, dataDescriptorOffset + 12, BigInt(uncompressedSize));
			}
		} else {
			setUint32(headerView, 14, compressedSize);
			setUint32(headerView, 18, uncompressedSize);
			if (dataDescriptor) {
				setUint32(dataDescriptorView, dataDescriptorOffset + 4, compressedSize);
				setUint32(dataDescriptorView, dataDescriptorOffset + 8, uncompressedSize);
			}
		}
	}
	if (dataDescriptor) {
		await writer.writeUint8Array(dataDescriptorArray);
	}
	const length = localHeaderArray.length + compressedSize + dataDescriptorArray.length;
	Object.assign(fileEntry, { compressedSize, lastModDate, rawLastModDate, creationDate, lastAccessDate, encrypted, length });
	return fileEntry;
}

async function closeFile(zipWriter, comment, options) {
	const writer = zipWriter.writer;
	const files = zipWriter.files;
	let offset = 0;
	let directoryDataLength = 0;
	let directoryOffset = zipWriter.offset;
	let filesLength = files.size;
	for (const [, fileEntry] of files) {
		directoryDataLength += 46 +
			fileEntry.rawFilename.length +
			fileEntry.rawComment.length +
			fileEntry.rawExtraFieldZip64.length +
			fileEntry.rawExtraFieldAES.length +
			fileEntry.rawExtraFieldExtendedTimestamp.length +
			fileEntry.rawExtraFieldNTFS.length +
			fileEntry.rawExtraField.length;
	}
	let zip64 = options.zip64 || zipWriter.options.zip64 || false;
	if (directoryOffset >= MAX_32_BITS || directoryDataLength >= MAX_32_BITS || filesLength >= MAX_16_BITS) {
		if (options.zip64 === false || zipWriter.options.zip64 === false) {
			throw new Error(ERR_UNSUPPORTED_FORMAT);
		} else {
			zip64 = true;
		}
	}
	const directoryArray = new Uint8Array(directoryDataLength + (zip64 ? ZIP64_END_OF_CENTRAL_DIR_TOTAL_LENGTH : END_OF_CENTRAL_DIR_LENGTH));
	const directoryView = getDataView(directoryArray);
	for (const [indexFileEntry, fileEntry] of Array.from(files.values()).entries()) {
		const {
			rawFilename,
			rawExtraFieldZip64,
			rawExtraFieldAES,
			rawExtraField,
			rawComment,
			versionMadeBy,
			headerArray,
			directory,
			zip64,
			msDosCompatible,
			internalFileAttribute,
			externalFileAttribute
		} = fileEntry;
		let rawExtraFieldExtendedTimestamp;
		let rawExtraFieldNTFS;
		if (fileEntry.extendedTimestamp) {
			rawExtraFieldNTFS = fileEntry.rawExtraFieldNTFS;
			rawExtraFieldExtendedTimestamp = new Uint8Array(9);
			const extraFieldExtendedTimestampView = getDataView(rawExtraFieldExtendedTimestamp);
			setUint16(extraFieldExtendedTimestampView, 0, EXTRAFIELD_TYPE_EXTENDED_TIMESTAMP);
			setUint16(extraFieldExtendedTimestampView, 2, rawExtraFieldExtendedTimestamp.length - 4);
			setUint8(extraFieldExtendedTimestampView, 4, 0x1);
			setUint32(extraFieldExtendedTimestampView, 5, Math.floor(fileEntry.lastModDate.getTime() / 1000));
		} else {
			rawExtraFieldNTFS = rawExtraFieldExtendedTimestamp = new Uint8Array(0);
		}
		const extraFieldLength = rawExtraFieldZip64.length + rawExtraFieldAES.length + rawExtraFieldExtendedTimestamp.length + rawExtraFieldNTFS.length + rawExtraField.length;
		setUint32(directoryView, offset, CENTRAL_FILE_HEADER_SIGNATURE);
		setUint16(directoryView, offset + 4, versionMadeBy);
		arraySet(directoryArray, headerArray, offset + 6);
		setUint16(directoryView, offset + 30, extraFieldLength);
		setUint16(directoryView, offset + 32, rawComment.length);
		setUint32(directoryView, offset + 34, internalFileAttribute);
		if (externalFileAttribute) {
			setUint32(directoryView, offset + 38, externalFileAttribute);
		} else if (directory && msDosCompatible) {
			setUint8(directoryView, offset + 38, FILE_ATTR_MSDOS_DIR_MASK);
		}
		if (zip64) {
			setUint32(directoryView, offset + 42, MAX_32_BITS);
		} else {
			setUint32(directoryView, offset + 42, fileEntry.offset);
		}
		arraySet(directoryArray, rawFilename, offset + 46);
		arraySet(directoryArray, rawExtraFieldZip64, offset + 46 + rawFilename.length);
		arraySet(directoryArray, rawExtraFieldAES, offset + 46 + rawFilename.length + rawExtraFieldZip64.length);
		arraySet(directoryArray, rawExtraFieldExtendedTimestamp, offset + 46 + rawFilename.length + rawExtraFieldZip64.length + rawExtraFieldAES.length);
		arraySet(directoryArray, rawExtraFieldNTFS, offset + 46 + rawFilename.length + rawExtraFieldZip64.length + rawExtraFieldAES.length + rawExtraFieldExtendedTimestamp.length);
		arraySet(directoryArray, rawExtraField, offset + 46 + rawFilename.length + rawExtraFieldZip64.length + rawExtraFieldAES.length + rawExtraFieldExtendedTimestamp.length + rawExtraFieldNTFS.length);
		arraySet(directoryArray, rawComment, offset + 46 + rawFilename.length + extraFieldLength);
		offset += 46 + rawFilename.length + extraFieldLength + rawComment.length;
		if (options.onprogress) {
			try {
				options.onprogress(indexFileEntry + 1, files.size, new Entry(fileEntry));
			} catch (_error) {
				// ignored
			}
		}
	}
	if (zip64) {
		setUint32(directoryView, offset, ZIP64_END_OF_CENTRAL_DIR_SIGNATURE);
		setBigUint64(directoryView, offset + 4, BigInt(44));
		setUint16(directoryView, offset + 12, 45);
		setUint16(directoryView, offset + 14, 45);
		setBigUint64(directoryView, offset + 24, BigInt(filesLength));
		setBigUint64(directoryView, offset + 32, BigInt(filesLength));
		setBigUint64(directoryView, offset + 40, BigInt(directoryDataLength));
		setBigUint64(directoryView, offset + 48, BigInt(directoryOffset));
		setUint32(directoryView, offset + 56, ZIP64_END_OF_CENTRAL_DIR_LOCATOR_SIGNATURE);
		setBigUint64(directoryView, offset + 64, BigInt(directoryOffset) + BigInt(directoryDataLength));
		setUint32(directoryView, offset + 72, ZIP64_TOTAL_NUMBER_OF_DISKS);
		filesLength = MAX_16_BITS;
		directoryOffset = MAX_32_BITS;
		directoryDataLength = MAX_32_BITS;
		offset += 76;
	}
	setUint32(directoryView, offset, END_OF_CENTRAL_DIR_SIGNATURE);
	setUint16(directoryView, offset + 8, filesLength);
	setUint16(directoryView, offset + 10, filesLength);
	setUint32(directoryView, offset + 12, directoryDataLength);
	setUint32(directoryView, offset + 16, directoryOffset);
	if (comment && comment.length) {
		if (comment.length <= MAX_16_BITS) {
			setUint16(directoryView, offset + 20, comment.length);
		} else {
			throw new Error(ERR_INVALID_COMMENT);
		}
	}
	await writer.writeUint8Array(directoryArray);
	if (comment && comment.length) {
		await writer.writeUint8Array(comment);
	}
}

function sliceAsArrayBuffer(blob, start, end) {
	if (blob.arrayBuffer) {
		if (start || end) {
			return blob.slice(start, end).arrayBuffer();
		} else {
			return blob.arrayBuffer();
		}
	} else {
		const fileReader = new FileReader();
		return new Promise((resolve, reject) => {
			fileReader.onload = event => resolve(event.target.result);
			fileReader.onerror = () => reject(fileReader.error);
			fileReader.readAsArrayBuffer(start || end ? blob.slice(start, end) : blob);
		});
	}
}

async function writeBlob(writer, blob, start = 0) {
	const blockSize = 512 * 1024 * 1024;
	await writeSlice();

	async function writeSlice() {
		if (start < blob.size) {
			const arrayBuffer = await sliceAsArrayBuffer(blob, start, start + blockSize);
			await writer.writeUint8Array(new Uint8Array(arrayBuffer));
			start += blockSize;
			await writeSlice();
		}
	}
}

function getTimeNTFS(date) {
	if (date) {
		return ((BigInt(date.getTime()) + BigInt(11644473600000)) * BigInt(10000));
	}
}

function getOptionValue(zipWriter, options, name) {
	return options[name] === undefined ? zipWriter.options[name] : options[name];
}

function getMaximumCompressedSize(uncompressedSize) {
	return uncompressedSize + (5 * (Math.floor(uncompressedSize / 16383) + 1));
}

function setUint8(view, offset, value) {
	view.setUint8(offset, value);
}

function setUint16(view, offset, value) {
	view.setUint16(offset, value, true);
}

function setUint32(view, offset, value) {
	view.setUint32(offset, value, true);
}

function setBigUint64(view, offset, value) {
	view.setBigUint64(offset, value, true);
}

function arraySet(array, typedArray, offset) {
	array.set(typedArray, offset);
}

function getDataView(array) {
	return new DataView(array.buffer);
}

/*
 Copyright (c) 2022 Gildas Lormeau. All rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 1. Redistributions of source code must retain the above copyright notice,
 this list of conditions and the following disclaimer.

 2. Redistributions in binary form must reproduce the above copyright 
 notice, this list of conditions and the following disclaimer in 
 the documentation and/or other materials provided with the distribution.

 3. The names of the authors may not be used to endorse or promote products
 derived from this software without specific prior written permission.

 THIS SOFTWARE IS PROVIDED ''AS IS'' AND ANY EXPRESSED OR IMPLIED WARRANTIES,
 INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
 FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL JCRAFT,
 INC. OR ANY CONTRIBUTORS TO THIS SOFTWARE BE LIABLE FOR ANY DIRECT, INDIRECT,
 INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA,
 OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

let baseURL;
try {
	baseURL = import.meta.url;
} catch (error) {
	// ignored
}
configure({ baseURL });
t(configure);

export { BlobReader, BlobWriter, Data64URIReader, Data64URIWriter, ERR_ABORT, ERR_BAD_FORMAT, ERR_CENTRAL_DIRECTORY_NOT_FOUND, ERR_DUPLICATED_NAME, ERR_ENCRYPTED, ERR_EOCDR_LOCATOR_ZIP64_NOT_FOUND, ERR_EOCDR_NOT_FOUND, ERR_EOCDR_ZIP64_NOT_FOUND, ERR_EXTRAFIELD_ZIP64_NOT_FOUND, ERR_HTTP_RANGE, ERR_INVALID_COMMENT, ERR_INVALID_ENCRYPTION_STRENGTH, ERR_INVALID_ENTRY_COMMENT, ERR_INVALID_ENTRY_NAME, ERR_INVALID_EXTRAFIELD_DATA, ERR_INVALID_EXTRAFIELD_TYPE, ERR_INVALID_PASSWORD, ERR_INVALID_SIGNATURE, ERR_INVALID_VERSION, ERR_LOCAL_FILE_HEADER_NOT_FOUND, ERR_NOT_SEEKABLE_READER, ERR_UNSUPPORTED_COMPRESSION, ERR_UNSUPPORTED_ENCRYPTION, ERR_UNSUPPORTED_FORMAT, HttpRangeReader, HttpReader, ReadableStreamReader, Reader, TextReader, TextWriter, Uint8ArrayReader, Uint8ArrayWriter, WritableStreamWriter, Writer, ZipReader, ZipWriter, configure, getMimeType, streamCodecShim as initShimAsyncCodec, terminateWorkers };
