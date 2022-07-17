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

const MINIMUM_CHUNK_SIZE = 64;
const UNDEFINED_TYPE$2 = undefined;
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

function getChunkSize(config) {
	return Math.max(config.chunkSize, MINIMUM_CHUNK_SIZE);
}

function configure(configuration) {
	const {
		baseURL,
		chunkSize,
		maxWorkers,
		terminateWorkerTimeout,
		useCompressionStream,
		useWebWorkers,
		Deflate,
		Inflate,
		workerScripts
	} = configuration;
	if (baseURL !== UNDEFINED_TYPE$2) {
		config.baseURL = baseURL;
	}
	if (chunkSize !== UNDEFINED_TYPE$2) {
		config.chunkSize = chunkSize;
	}
	if (maxWorkers !== UNDEFINED_TYPE$2) {
		config.maxWorkers = maxWorkers;
	}
	if (terminateWorkerTimeout !== UNDEFINED_TYPE$2) {
		config.terminateWorkerTimeout = terminateWorkerTimeout;
	}
	if (useCompressionStream !== UNDEFINED_TYPE$2) {
		config.useCompressionStream = useCompressionStream;
	}
	if (useWebWorkers !== UNDEFINED_TYPE$2) {
		config.useWebWorkers = useWebWorkers;
	}
	if (Deflate !== UNDEFINED_TYPE$2) {
		config.Deflate = Deflate;
	}
	if (Inflate !== UNDEFINED_TYPE$2) {
		config.Inflate = Inflate;
	}
	if (workerScripts !== UNDEFINED_TYPE$2) {
		const { deflate, inflate } = workerScripts;
		if (deflate || inflate) {
			if (!config.workerScripts) {
				config.workerScripts = {};
			}
		}
		if (deflate) {
			if (!Array.isArray(deflate)) {
				throw new Error("workerScripts.deflate must be an array");
			}
			config.workerScripts.deflate = deflate;
		}
		if (inflate) {
			if (!Array.isArray(inflate)) {
				throw new Error("workerScripts.inflate must be an array");
			}
			config.workerScripts.inflate = inflate;
		}
	}
}

var e=e=>{if("function"==typeof URL.createObjectURL){const t=()=>URL.createObjectURL(new Blob(['const{Array:e,Object:t,Math:n,Error:r,Uint8Array:s,Uint16Array:a,Uint32Array:i,Int32Array:o,DataView:l,Promise:c,TextEncoder:h,crypto:f,postMessage:u,TransformStream:p,ReadableStream:d,WritableStream:g,CompressionStream:w,DecompressionStream:v}=globalThis,y=[];for(let e=0;256>e;e++){let t=e;for(let e=0;8>e;e++)1&t?t=t>>>1^3988292384:t>>>=1;y[e]=t}class m{constructor(e){this.crc=e||-1}append(e){let t=0|this.crc;for(let n=0,r=0|e.length;r>n;n++)t=t>>>8^y[255&(t^e[n])];this.crc=t}get(){return~this.crc}}class b extends p{constructor(){super({start(){this.crc32=new m},transform(e){this.crc32.append(e)},flush(e){const t=new s(4);new l(t.buffer).setUint32(0,this.crc32.get()),e.enqueue(t)}})}}const _={concat(e,t){if(0===e.length||0===t.length)return e.concat(t);const n=e[e.length-1],r=_.getPartial(n);return 32===r?e.concat(t):_._shiftRight(t,r,0|n,e.slice(0,e.length-1))},bitLength(e){const t=e.length;if(0===t)return 0;const n=e[t-1];return 32*(t-1)+_.getPartial(n)},clamp(e,t){if(32*e.length<t)return e;const r=(e=e.slice(0,n.ceil(t/32))).length;return t&=31,r>0&&t&&(e[r-1]=_.partial(t,e[r-1]&2147483648>>t-1,1)),e},partial:(e,t,n)=>32===e?t:(n?0|t:t<<32-e)+1099511627776*e,getPartial:e=>n.round(e/1099511627776)||32,_shiftRight(e,t,n,r){for(void 0===r&&(r=[]);t>=32;t-=32)r.push(n),n=0;if(0===t)return r.concat(e);for(let s=0;s<e.length;s++)r.push(n|e[s]>>>t),n=e[s]<<32-t;const s=e.length?e[e.length-1]:0,a=_.getPartial(s);return r.push(_.partial(t+a&31,t+a>32?n:r.pop(),1)),r}},k={bytes:{fromBits(e){const t=_.bitLength(e)/8,n=new s(t);let r;for(let s=0;t>s;s++)0==(3&s)&&(r=e[s/4]),n[s]=r>>>24,r<<=8;return n},toBits(e){const t=[];let n,r=0;for(n=0;n<e.length;n++)r=r<<8|e[n],3==(3&n)&&(t.push(r),r=0);return 3&n&&t.push(_.partial(8*(3&n),r)),t}}},S={sha1:function(e){e?(this._h=e._h.slice(0),this._buffer=e._buffer.slice(0),this._length=e._length):this.reset()}};S.sha1.prototype={blockSize:512,reset(){const e=this;return e._h=this._init.slice(0),e._buffer=[],e._length=0,e},update(e){const t=this;"string"==typeof e&&(e=k.utf8String.toBits(e));const n=t._buffer=_.concat(t._buffer,e),s=t._length,a=t._length=s+_.bitLength(e);if(a>9007199254740991)throw new r("Cannot hash more than 2^53 - 1 bits");const o=new i(n);let l=0;for(let e=t.blockSize+s-(t.blockSize+s&t.blockSize-1);a>=e;e+=t.blockSize)t._block(o.subarray(16*l,16*(l+1))),l+=1;return n.splice(0,16*l),t},finalize(){const e=this;let t=e._buffer;const r=e._h;t=_.concat(t,[_.partial(1,1)]);for(let e=t.length+2;15&e;e++)t.push(0);for(t.push(n.floor(e._length/4294967296)),t.push(0|e._length);t.length;)e._block(t.splice(0,16));return e.reset(),r},_init:[1732584193,4023233417,2562383102,271733878,3285377520],_key:[1518500249,1859775393,2400959708,3395469782],_f:(e,t,n,r)=>e>19?e>39?e>59?e>79?void 0:t^n^r:t&n|t&r|n&r:t^n^r:t&n|~t&r,_S:(e,t)=>t<<e|t>>>32-e,_block(t){const r=this,s=r._h,a=e(80);for(let e=0;16>e;e++)a[e]=t[e];let i=s[0],o=s[1],l=s[2],c=s[3],h=s[4];for(let e=0;79>=e;e++){16>e||(a[e]=r._S(1,a[e-3]^a[e-8]^a[e-14]^a[e-16]));const t=r._S(5,i)+r._f(e,o,l,c)+h+a[e]+r._key[n.floor(e/20)]|0;h=c,c=l,l=r._S(30,o),o=i,i=t}s[0]=s[0]+i|0,s[1]=s[1]+o|0,s[2]=s[2]+l|0,s[3]=s[3]+c|0,s[4]=s[4]+h|0}};const T={getRandomValues(e){const t=new i(e.buffer),r=e=>{let t=987654321;const r=4294967295;return()=>(t=36969*(65535&t)+(t>>16)&r,(((t<<16)+(e=18e3*(65535&e)+(e>>16)&r)&r)/4294967296+.5)*(n.random()>.5?1:-1))};for(let s,a=0;a<e.length;a+=4){const e=r(4294967296*(s||n.random()));s=987654071*e(),t[a/4]=4294967296*e()|0}return e}},D={importKey:e=>new D.hmacSha1(k.bytes.toBits(e)),pbkdf2(e,t,n,s){if(n=n||1e4,0>s||0>n)throw new r("invalid params to pbkdf2");const a=1+(s>>5)<<2;let i,o,c,h,f;const u=new ArrayBuffer(a),p=new l(u);let d=0;const g=_;for(t=k.bytes.toBits(t),f=1;(a||1)>d;f++){for(i=o=e.encrypt(g.concat(t,[f])),c=1;n>c;c++)for(o=e.encrypt(o),h=0;h<o.length;h++)i[h]^=o[h];for(c=0;(a||1)>d&&c<i.length;c++)p.setInt32(d,i[c]),d+=4}return u.slice(0,s/8)},hmacSha1:class{constructor(e){const t=this,n=t._hash=S.sha1,r=[[],[]],s=n.prototype.blockSize/32;t._baseHash=[new n,new n],e.length>s&&(e=n.hash(e));for(let t=0;s>t;t++)r[0][t]=909522486^e[t],r[1][t]=1549556828^e[t];t._baseHash[0].update(r[0]),t._baseHash[1].update(r[1]),t._resultHash=new n(t._baseHash[0])}reset(){const e=this;e._resultHash=new e._hash(e._baseHash[0]),e._updated=!1}update(e){this._updated=!0,this._resultHash.update(e)}digest(){const e=this,t=e._resultHash.finalize(),n=new e._hash(e._baseHash[1]).update(t).finalize();return e.reset(),n}encrypt(e){if(this._updated)throw new r("encrypt on already updated hmac called!");return this.update(e),this.digest(e)}}},z={name:"PBKDF2"},I=t.assign({hash:{name:"HMAC"}},z),R=t.assign({iterations:1e3,hash:{name:"SHA-1"}},z),E=["deriveBits"],x=[8,12,16],C=[16,24,32],V=[0,0,0,0],B=void 0!==f,q=B&&void 0!==f.subtle,A=B&&"function"==typeof f.getRandomValues,H=B&&q&&"function"==typeof f.subtle.importKey,K=B&&q&&"function"==typeof f.subtle.deriveBits,P=k.bytes,W=class{constructor(e){const t=this;t._tables=[[[],[],[],[],[]],[[],[],[],[],[]]],t._tables[0][0][0]||t._precompute();const n=t._tables[0][4],s=t._tables[1],a=e.length;let i,o,l,c=1;if(4!==a&&6!==a&&8!==a)throw new r("invalid aes key size");for(t._key=[o=e.slice(0),l=[]],i=a;4*a+28>i;i++){let e=o[i-1];(i%a==0||8===a&&i%a==4)&&(e=n[e>>>24]<<24^n[e>>16&255]<<16^n[e>>8&255]<<8^n[255&e],i%a==0&&(e=e<<8^e>>>24^c<<24,c=c<<1^283*(c>>7))),o[i]=o[i-a]^e}for(let e=0;i;e++,i--){const t=o[3&e?i:i-4];l[e]=4>=i||4>e?t:s[0][n[t>>>24]]^s[1][n[t>>16&255]]^s[2][n[t>>8&255]]^s[3][n[255&t]]}}encrypt(e){return this._crypt(e,0)}decrypt(e){return this._crypt(e,1)}_precompute(){const e=this._tables[0],t=this._tables[1],n=e[4],r=t[4],s=[],a=[];let i,o,l,c;for(let e=0;256>e;e++)a[(s[e]=e<<1^283*(e>>7))^e]=e;for(let h=i=0;!n[h];h^=o||1,i=a[i]||1){let a=i^i<<1^i<<2^i<<3^i<<4;a=a>>8^255&a^99,n[h]=a,r[a]=h,c=s[l=s[o=s[h]]];let f=16843009*c^65537*l^257*o^16843008*h,u=257*s[a]^16843008*a;for(let n=0;4>n;n++)e[n][h]=u=u<<24^u>>>8,t[n][a]=f=f<<24^f>>>8}for(let n=0;5>n;n++)e[n]=e[n].slice(0),t[n]=t[n].slice(0)}_crypt(e,t){if(4!==e.length)throw new r("invalid aes block size");const n=this._key[t],s=n.length/4-2,a=[0,0,0,0],i=this._tables[t],o=i[0],l=i[1],c=i[2],h=i[3],f=i[4];let u,p,d,g=e[0]^n[0],w=e[t?3:1]^n[1],v=e[2]^n[2],y=e[t?1:3]^n[3],m=4;for(let e=0;s>e;e++)u=o[g>>>24]^l[w>>16&255]^c[v>>8&255]^h[255&y]^n[m],p=o[w>>>24]^l[v>>16&255]^c[y>>8&255]^h[255&g]^n[m+1],d=o[v>>>24]^l[y>>16&255]^c[g>>8&255]^h[255&w]^n[m+2],y=o[y>>>24]^l[g>>16&255]^c[w>>8&255]^h[255&v]^n[m+3],m+=4,g=u,w=p,v=d;for(let e=0;4>e;e++)a[t?3&-e:e]=f[g>>>24]<<24^f[w>>16&255]<<16^f[v>>8&255]<<8^f[255&y]^n[m++],u=g,g=w,w=v,v=y,y=u;return a}},L=class{constructor(e,t){this._prf=e,this._initIv=t,this._iv=t}reset(){this._iv=this._initIv}update(e){return this.calculate(this._prf,e,this._iv)}incWord(e){if(255==(e>>24&255)){let t=e>>16&255,n=e>>8&255,r=255&e;255===t?(t=0,255===n?(n=0,255===r?r=0:++r):++n):++t,e=0,e+=t<<16,e+=n<<8,e+=r}else e+=1<<24;return e}incCounter(e){0===(e[0]=this.incWord(e[0]))&&(e[1]=this.incWord(e[1]))}calculate(e,t,n){let r;if(!(r=t.length))return[];const s=_.bitLength(t);for(let s=0;r>s;s+=4){this.incCounter(n);const r=e.encrypt(n);t[s]^=r[0],t[s+1]^=r[1],t[s+2]^=r[2],t[s+3]^=r[3]}return _.clamp(t,s)}},M=D.hmacSha1;class U extends p{constructor(n,a,i){let o;super({start(){t.assign(this,{ready:new c((e=>this.resolveReady=e)),password:n,signed:a,strength:i-1,pending:new s})},async transform(t,n){const a=this;if(a.password){const n=a.password;a.password=null;const s=Y(t,0,x[a.strength]+2);await(async(e,t,n)=>{await O(e,n,Y(t,0,x[e.strength]));const s=Y(t,x[e.strength]),a=e.keys.passwordVerification;if(a[0]!=s[0]||a[1]!=s[1])throw new r("Invalid pasword")})(a,s,n),a.ctr=new L(new W(a.keys.key),e.from(V)),a.hmac=new M(a.keys.authentication),t=Y(t,x[a.strength]+2),a.resolveReady()}else await a.ready;const i=new s(t.length-10-(t.length-10)%16);n.enqueue(N(a,t,i,0,10,!0))},async flush(e){const t=this;await t.ready;const n=t.pending,r=Y(n,0,n.length-10),a=Y(n,n.length-10);let i=new s;if(r.length){const e=X(P,r);t.hmac.update(e);const n=t.ctr.update(e);i=G(P,n)}if(o.valid=!0,t.signed){const e=Y(G(P,t.hmac.digest()),0,10);for(let t=0;10>t;t++)e[t]!=a[t]&&(o.valid=!1)}e.enqueue(i)}}),o=this}}class F extends p{constructor(n,r){let a;super({start(){t.assign(this,{ready:new c((e=>this.resolveReady=e)),password:n,strength:r-1,pending:new s})},async transform(t,n){const r=this;let a=new s;if(r.password){const t=r.password;r.password=null,a=await(async(e,t)=>{const n=(r=new s(x[e.strength]),A?f.getRandomValues(r):T.getRandomValues(r));var r;return await O(e,t,n),j(n,e.keys.passwordVerification)})(r,t),r.ctr=new L(new W(r.keys.key),e.from(V)),r.hmac=new M(r.keys.authentication),r.resolveReady()}else await r.ready;const i=new s(a.length+t.length-t.length%16);i.set(a,0),n.enqueue(N(r,t,i,a.length,0))},async flush(e){const t=this;await t.ready;let n=new s;if(t.pending.length){const e=t.ctr.update(X(P,t.pending));t.hmac.update(e),n=G(P,e)}a.signature=G(P,t.hmac.digest()).slice(0,10),e.enqueue(j(n,a.signature))}}),a=this}}function N(e,t,n,r,a,i){const o=t.length-a;let l;for(e.pending.length&&(t=j(e.pending,t),n=((e,t)=>{if(t&&t>e.length){const n=e;(e=new s(t)).set(n,0)}return e})(n,o-o%16)),l=0;o-16>=l;l+=16){const s=X(P,Y(t,l,l+16));i&&e.hmac.update(s);const a=e.ctr.update(s);i||e.hmac.update(a),n.set(G(P,a),l+r)}return e.pending=Y(t,l),n}async function O(e,n,r){const a=(e=>{if(void 0===h){const t=new s((e=unescape(encodeURIComponent(e))).length);for(let n=0;n<t.length;n++)t[n]=e.charCodeAt(n);return t}return(new h).encode(e)})(n),i=await((e,t,n,r,s)=>H?f.subtle.importKey("raw",t,n,!1,s):D.importKey(t))(0,a,I,0,E),o=await(async(e,t,n)=>K?await f.subtle.deriveBits(e,t,n):D.pbkdf2(t,e.salt,R.iterations,n))(t.assign({salt:r},R),i,8*(2*C[e.strength]+2)),l=new s(o);e.keys={key:X(P,Y(l,0,C[e.strength])),authentication:X(P,Y(l,C[e.strength],2*C[e.strength])),passwordVerification:Y(l,2*C[e.strength])}}function j(e,t){let n=e;return e.length+t.length&&(n=new s(e.length+t.length),n.set(e,0),n.set(t,e.length)),n}function Y(e,t,n){return e.subarray(t,n)}function G(e,t){return e.fromBits(t)}function X(e,t){return e.toBits(t)}class J extends p{constructor(e,n){let s;super({start(){t.assign(this,{password:e,passwordVerification:n}),ee(this,e)},transform(e,t){const n=this;if(n.password){const t=Z(n,e.subarray(0,12));if(n.password=null,t[11]!=n.passwordVerification)throw new r("Invalid pasword");e=e.subarray(12)}t.enqueue(Z(n,e))},flush(){s.valid=!0}}),s=this}}class Q extends p{constructor(e,n){super({start(){t.assign(this,{password:e,passwordVerification:n}),ee(this,e)},transform(e,t){const n=this;let r,a;if(n.password){n.password=null;const t=f.getRandomValues(new s(12));t[11]=n.passwordVerification,r=new s(e.length+t.length),r.set($(n,t),0),a=12}else r=new s(e.length),a=0;r.set($(n,e),a),t.enqueue(r)},flush(){}})}}function Z(e,t){const n=new s(t.length);for(let r=0;r<t.length;r++)n[r]=ne(e)^t[r],te(e,n[r]);return n}function $(e,t){const n=new s(t.length);for(let r=0;r<t.length;r++)n[r]=ne(e)^t[r],te(e,t[r]);return n}function ee(e,t){e.keys=[305419896,591751049,878082192],e.crcKey0=new m(e.keys[0]),e.crcKey2=new m(e.keys[2]);for(let n=0;n<t.length;n++)te(e,t.charCodeAt(n))}function te(e,t){e.crcKey0.append([t]),e.keys[0]=~e.crcKey0.get(),e.keys[1]=se(e.keys[1]+re(e.keys[0])),e.keys[1]=se(n.imul(e.keys[1],134775813)+1),e.crcKey2.append([e.keys[1]>>>24]),e.keys[2]=~e.crcKey2.get()}function ne(e){const t=2|e.keys[2];return re(n.imul(t,1^t)>>>8)}function re(e){return 255&e}function se(e){return 4294967295&e}class ae extends p{constructor(e,t){let n;super({start(){n=new e(t)},transform(e,t){e=n.append(e),t.enqueue(e)},flush(e){const t=n.flush();t&&e.enqueue(t)}})}}const ie=void 0===w,oe=void 0===v;let le=!0,ce=!0;class he extends p{constructor(e,t,{chunkSize:n},...r){super({},...r);const{compressed:s,encrypted:a,useCompressionStream:i,password:o,passwordVerification:c,encryptionStrength:h,zipCrypto:f,signed:u}=t,p=this;let d,g,v=pe(super.readable);if(a&&!f||!u||([v,d]=v.tee(),d=d.pipeThrough(new b)),s)if(void 0!==i&&!i||ie&&!ce)v=ue(e,v,n);else try{v=v.pipeThrough(new w("deflate-raw"))}catch(t){ce=!1,v=ue(e,v,n)}a&&(f?v=v.pipeThrough(new Q(o,c)):(g=new F(o,h),v=v.pipeThrough(g))),de(p,v,(async()=>{let e;a&&!f&&(e=g.signature),a&&!f||!u||(e=await d.getReader().read(),e=new l(e.value.buffer).getUint32(0)),p.signature=e}))}}class fe extends p{constructor(e,t,{chunkSize:n},...s){super({},...s);const{zipCrypto:a,encrypted:i,password:o,passwordVerification:c,signed:h,encryptionStrength:f,compressed:u,useCompressionStream:p}=t;let d,g,w=pe(super.readable);if(i&&(a?w=w.pipeThrough(new J(o,c)):(g=new U(o,h,f),w=w.pipeThrough(g))),u)if(void 0!==p&&!p||oe&&!le)w=ue(e,w,n);else try{w=w.pipeThrough(new v("deflate-raw"))}catch(t){le=!1,w=ue(e,w,n)}i&&!a||!h||([w,d]=w.tee(),d=d.pipeThrough(new b)),de(this,w,(async()=>{if(i&&!a&&!g.valid)throw new r("Invalid signature");if((!i||a)&&h){const e=await d.getReader().read();if(e!=new l(e.value.buffer).getUint32(0,!1))throw new r("Invalid signature")}}))}}function ue(e,t,n){return t.pipeThrough(new ae(e,{chunkSize:n}))}function pe(e){return e.pipeThrough(new p({transform(e,t){e&&e.length&&t.enqueue(e)}}))}function de(e,n,r){e.length=0,n=n.pipeThrough(new p({transform(t,n){t&&t.length&&(e.length+=t.length,n.enqueue(t))},flush:r})),t.defineProperty(e,"readable",{get:()=>n})}class ge{constructor(e,t,n,r,s){const{codecType:a}=r;async function i(a){const i=new a(e,r,s);await t.pipeThrough(i).pipeTo(n,{preventClose:!0});const{length:o,signature:l}=i;return{length:o,signature:l}}a.startsWith("deflate")?this.run=()=>i(he):a.startsWith("inflate")&&(this.run=()=>i(fe))}}const we=new Map;let ve,ye=0;async function me(e){try{const{options:t,scripts:n,config:r}=e,{codecType:s}=t;let a;n&&n.length&&importScripts.apply(void 0,n),self.initCodec&&self.initCodec(),s.startsWith("deflate")?a=self.Deflate:s.startsWith("inflate")&&(a=self.Inflate);const i={highWaterMark:1,size:()=>r.chunkSize},o=new d({async pull(e){let t=new c(((e,t)=>we.set(ye,{resolve:e,reject:t})));be({type:"pull",messageId:ye}),ye=(ye+1)%Number.MAX_SAFE_INTEGER;const{value:n,done:r}=await t;e.enqueue(n),r&&e.close()}},i),l=new g({write(e){be({type:"data",data:e})}},i);ve=new ge(a,o,l,t,r),be({type:"close",result:await ve.run()})}catch(e){const{message:t,stack:n}=e;u({error:{message:t,stack:n}})}}function be(e){if(e.data){let{data:t}=e;if(t&&t.length)try{t.length!=t.buffer.byteLength&&(t=new s(t)),e.data=t.buffer,u(e,[e.data])}catch(t){u(e)}else u(e)}else u(e)}addEventListener("message",(async e=>{const t=e.data,{type:n,messageId:r,data:a,done:i}=t;try{if("start"==n&&me(t),"data"==n){const{resolve:e}=we.get(r);we.delete(r),e({value:new s(a),done:i})}}catch(e){u({error:{message:e.message,stack:e.stack}})}}));var _e=s,ke=a,Se=i,Te=new _e([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),De=new _e([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),ze=new _e([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),Ie=(e,t)=>{for(var n=new ke(31),r=0;31>r;++r)n[r]=t+=1<<e[r-1];var s=new Se(n[30]);for(r=1;30>r;++r)for(var a=n[r];a<n[r+1];++a)s[a]=a-n[r]<<5|r;return[n,s]},Re=Ie(Te,2),Ee=Re[0],xe=Re[1];Ee[28]=258,xe[258]=28;for(var Ce=Ie(De,0),Ve=Ce[0],Be=Ce[1],qe=new ke(32768),Ae=0;32768>Ae;++Ae){var He=(43690&Ae)>>>1|(21845&Ae)<<1;He=(61680&(He=(52428&He)>>>2|(13107&He)<<2))>>>4|(3855&He)<<4,qe[Ae]=((65280&He)>>>8|(255&He)<<8)>>>1}var Ke=(e,t,n)=>{for(var r=e.length,s=0,a=new ke(t);r>s;++s)e[s]&&++a[e[s]-1];var i,o=new ke(t);for(s=0;t>s;++s)o[s]=o[s-1]+a[s-1]<<1;if(n){i=new ke(1<<t);var l=15-t;for(s=0;r>s;++s)if(e[s])for(var c=s<<4|e[s],h=t-e[s],f=o[e[s]-1]++<<h,u=f|(1<<h)-1;u>=f;++f)i[qe[f]>>>l]=c}else for(i=new ke(r),s=0;r>s;++s)e[s]&&(i[s]=qe[o[e[s]-1]++]>>>15-e[s]);return i},Pe=new _e(288);for(Ae=0;144>Ae;++Ae)Pe[Ae]=8;for(Ae=144;256>Ae;++Ae)Pe[Ae]=9;for(Ae=256;280>Ae;++Ae)Pe[Ae]=7;for(Ae=280;288>Ae;++Ae)Pe[Ae]=8;var We=new _e(32);for(Ae=0;32>Ae;++Ae)We[Ae]=5;var Le=Ke(Pe,9,0),Me=Ke(Pe,9,1),Ue=Ke(We,5,0),Fe=Ke(We,5,1),Ne=e=>{for(var t=e[0],n=1;n<e.length;++n)e[n]>t&&(t=e[n]);return t},Oe=(e,t,n)=>{var r=t/8|0;return(e[r]|e[r+1]<<8)>>(7&t)&n},je=(e,t)=>{var n=t/8|0;return(e[n]|e[n+1]<<8|e[n+2]<<16)>>(7&t)},Ye=e=>(e+7)/8|0,Ge=(e,t,n)=>{(null==t||0>t)&&(t=0),(null==n||n>e.length)&&(n=e.length);var r=new(2==e.BYTES_PER_ELEMENT?ke:4==e.BYTES_PER_ELEMENT?Se:_e)(n-t);return r.set(e.subarray(t,n)),r},Xe=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],Je=(e,t,n)=>{var s=new r(t||Xe[e]);if(s.code=e,r.captureStackTrace&&r.captureStackTrace(s,Je),!n)throw s;return s},Qe=(e,t,n)=>{n<<=7&t;var r=t/8|0;e[r]|=n,e[r+1]|=n>>>8},Ze=(e,t,n)=>{n<<=7&t;var r=t/8|0;e[r]|=n,e[r+1]|=n>>>8,e[r+2]|=n>>>16},$e=(e,t)=>{for(var n=[],r=0;r<e.length;++r)e[r]&&n.push({s:r,f:e[r]});var s=n.length,a=n.slice();if(!s)return[it,0];if(1==s){var i=new _e(n[0].s+1);return i[n[0].s]=1,[i,1]}n.sort(((e,t)=>e.f-t.f)),n.push({s:-1,f:25001});var o=n[0],l=n[1],c=0,h=1,f=2;for(n[0]={s:-1,f:o.f+l.f,l:o,r:l};h!=s-1;)o=n[n[c].f<n[f].f?c++:f++],l=n[c!=h&&n[c].f<n[f].f?c++:f++],n[h++]={s:-1,f:o.f+l.f,l:o,r:l};var u=a[0].s;for(r=1;s>r;++r)a[r].s>u&&(u=a[r].s);var p=new ke(u+1),d=et(n[h-1],p,0);if(d>t){r=0;var g=0,w=d-t,v=1<<w;for(a.sort(((e,t)=>p[t.s]-p[e.s]||e.f-t.f));s>r;++r){var y=a[r].s;if(p[y]<=t)break;g+=v-(1<<d-p[y]),p[y]=t}for(g>>>=w;g>0;){var m=a[r].s;p[m]<t?g-=1<<t-p[m]++-1:++r}for(;r>=0&&g;--r){var b=a[r].s;p[b]==t&&(--p[b],++g)}d=t}return[new _e(p),d]},et=(e,t,r)=>-1==e.s?n.max(et(e.l,t,r+1),et(e.r,t,r+1)):t[e.s]=r,tt=e=>{for(var t=e.length;t&&!e[--t];);for(var n=new ke(++t),r=0,s=e[0],a=1,i=e=>{n[r++]=e},o=1;t>=o;++o)if(e[o]==s&&o!=t)++a;else{if(!s&&a>2){for(;a>138;a-=138)i(32754);a>2&&(i(a>10?a-11<<5|28690:a-3<<5|12305),a=0)}else if(a>3){for(i(s),--a;a>6;a-=6)i(8304);a>2&&(i(a-3<<5|8208),a=0)}for(;a--;)i(s);a=1,s=e[o]}return[n.subarray(0,r),t]},nt=(e,t)=>{for(var n=0,r=0;r<t.length;++r)n+=e[r]*t[r];return n},rt=(e,t,n)=>{var r=n.length,s=Ye(t+2);e[s]=255&r,e[s+1]=r>>>8,e[s+2]=255^e[s],e[s+3]=255^e[s+1];for(var a=0;r>a;++a)e[s+a+4]=n[a];return 8*(s+4+r)},st=(e,t,n,r,s,a,i,o,l,c,h)=>{Qe(t,h++,n),++s[256];for(var f=$e(s,15),u=f[0],p=f[1],d=$e(a,15),g=d[0],w=d[1],v=tt(u),y=v[0],m=v[1],b=tt(g),_=b[0],k=b[1],S=new ke(19),T=0;T<y.length;++T)S[31&y[T]]++;for(T=0;T<_.length;++T)S[31&_[T]]++;for(var D=$e(S,7),z=D[0],I=D[1],R=19;R>4&&!z[ze[R-1]];--R);var E,x,C,V,B=c+5<<3,q=nt(s,Pe)+nt(a,We)+i,A=nt(s,u)+nt(a,g)+i+14+3*R+nt(S,z)+(2*S[16]+3*S[17]+7*S[18]);if(q>=B&&A>=B)return rt(t,h,e.subarray(l,l+c));if(Qe(t,h,1+(q>A)),h+=2,q>A){E=Ke(u,p,0),x=u,C=Ke(g,w,0),V=g;var H=Ke(z,I,0);for(Qe(t,h,m-257),Qe(t,h+5,k-1),Qe(t,h+10,R-4),h+=14,T=0;R>T;++T)Qe(t,h+3*T,z[ze[T]]);h+=3*R;for(var K=[y,_],P=0;2>P;++P){var W=K[P];for(T=0;T<W.length;++T){var L=31&W[T];Qe(t,h,H[L]),h+=z[L],L>15&&(Qe(t,h,W[T]>>>5&127),h+=W[T]>>>12)}}}else E=Le,x=Pe,C=Ue,V=We;for(T=0;o>T;++T)if(r[T]>255){L=r[T]>>>18&31,Ze(t,h,E[L+257]),h+=x[L+257],L>7&&(Qe(t,h,r[T]>>>23&31),h+=Te[L]);var M=31&r[T];Ze(t,h,C[M]),h+=V[M],M>3&&(Ze(t,h,r[T]>>>5&8191),h+=De[M])}else Ze(t,h,E[r[T]]),h+=x[r[T]];return Ze(t,h,E[256]),h+x[256]},at=new Se([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),it=new _e(0),ot=function(){function e(e,t){t||"function"!=typeof e||(t=e,e={}),this.ondata=t,this.o=e||{}}return e.prototype.p=function(e,t){var r,s,a;this.ondata((a=!t,((e,t,r,s,a,i)=>{var o=e.length,l=new _e(0+o+5*(1+n.ceil(o/7e3))+0),c=l.subarray(0,l.length-0),h=0;if(!t||8>o)for(var f=0;o>=f;f+=65535){var u=f+65535;o>u||(c[h>>3]=i),h=rt(c,h+1,e.subarray(f,u))}else{for(var p=at[t-1],d=p>>>13,g=8191&p,w=(1<<r)-1,v=new ke(32768),y=new ke(w+1),m=n.ceil(r/3),b=2*m,_=t=>(e[t]^e[t+1]<<m^e[t+2]<<b)&w,k=new Se(25e3),S=new ke(288),T=new ke(32),D=0,z=0,I=(f=0,0),R=0,E=0;o>f;++f){var x=_(f),C=32767&f,V=y[x];if(v[C]=V,y[x]=C,f>=R){var B=o-f;if((D>7e3||I>24576)&&B>423){h=st(e,c,0,k,S,T,z,I,E,f-E,h),I=D=z=0,E=f;for(var q=0;286>q;++q)S[q]=0;for(q=0;30>q;++q)T[q]=0}var A=2,H=0,K=g,P=C-V&32767;if(B>2&&x==_(f-P))for(var W=n.min(d,B)-1,L=n.min(32767,f),M=n.min(258,B);L>=P&&--K&&C!=V;){if(e[f+A]==e[f+A-P]){for(var U=0;M>U&&e[f+U]==e[f+U-P];++U);if(U>A){if(A=U,H=P,U>W)break;var F=n.min(P,U-2),N=0;for(q=0;F>q;++q){var O=f-P+q+32768&32767,j=O-v[O]+32768&32767;j>N&&(N=j,V=O)}}}P+=(C=V)-(V=v[C])+32768&32767}if(H){k[I++]=268435456|xe[A]<<18|Be[H];var Y=31&xe[A],G=31&Be[H];z+=Te[Y]+De[G],++S[257+Y],++T[G],R=f+A,++D}else k[I++]=e[f],++S[e[f]]}}h=st(e,c,i,k,S,T,z,I,E,f-E,h),!i&&7&h&&(h=rt(c,h+1,it))}return Ge(l,0,0+Ye(h)+0)})(r=e,null==(s=this.o).level?6:s.level,null==s.mem?n.ceil(1.5*n.max(8,n.min(13,n.log(r.length)))):12+s.mem,0,0,!a)),t)},e.prototype.push=function(e,t){this.ondata||Je(5),this.d&&Je(4),this.d=t,this.p(e,t||!1)},e}(),lt=function(){function e(e){this.s={},this.p=new _e(0),this.ondata=e}return e.prototype.e=function(e){this.ondata||Je(5),this.d&&Je(4);var t=this.p.length,n=new _e(t+e.length);n.set(this.p),n.set(e,t),this.p=n},e.prototype.c=function(e){this.d=this.s.i=e||!1;var t=this.s.b,r=((e,t,r)=>{var s=e.length;if(!s||r&&r.f&&!r.l)return t||new _e(0);var a=!t||r,i=!r||r.i;r||(r={}),t||(t=new _e(3*s));var o=e=>{var r=t.length;if(e>r){var s=new _e(n.max(2*r,e));s.set(t),t=s}},l=r.f||0,c=r.p||0,h=r.b||0,f=r.l,u=r.d,p=r.m,d=r.n,g=8*s;do{if(!f){l=Oe(e,c,1);var w=Oe(e,c+1,3);if(c+=3,!w){var v=e[(R=Ye(c)+4)-4]|e[R-3]<<8,y=R+v;if(y>s){i&&Je(0);break}a&&o(h+v),t.set(e.subarray(R,y),h),r.b=h+=v,r.p=c=8*y,r.f=l;continue}if(1==w)f=Me,u=Fe,p=9,d=5;else if(2==w){var m=Oe(e,c,31)+257,b=Oe(e,c+10,15)+4,_=m+Oe(e,c+5,31)+1;c+=14;for(var k=new _e(_),S=new _e(19),T=0;b>T;++T)S[ze[T]]=Oe(e,c+3*T,7);c+=3*b;var D=Ne(S),z=(1<<D)-1,I=Ke(S,D,1);for(T=0;_>T;){var R,E=I[Oe(e,c,z)];if(c+=15&E,16>(R=E>>>4))k[T++]=R;else{var x=0,C=0;for(16==R?(C=3+Oe(e,c,3),c+=2,x=k[T-1]):17==R?(C=3+Oe(e,c,7),c+=3):18==R&&(C=11+Oe(e,c,127),c+=7);C--;)k[T++]=x}}var V=k.subarray(0,m),B=k.subarray(m);p=Ne(V),d=Ne(B),f=Ke(V,p,1),u=Ke(B,d,1)}else Je(1);if(c>g){i&&Je(0);break}}a&&o(h+131072);for(var q=(1<<p)-1,A=(1<<d)-1,H=c;;H=c){var K=(x=f[je(e,c)&q])>>>4;if((c+=15&x)>g){i&&Je(0);break}if(x||Je(2),256>K)t[h++]=K;else{if(256==K){H=c,f=null;break}var P=K-254;if(K>264){var W=Te[T=K-257];P=Oe(e,c,(1<<W)-1)+Ee[T],c+=W}var L=u[je(e,c)&A],M=L>>>4;if(L||Je(3),c+=15&L,B=Ve[M],M>3&&(W=De[M],B+=je(e,c)&(1<<W)-1,c+=W),c>g){i&&Je(0);break}a&&o(h+131072);for(var U=h+P;U>h;h+=4)t[h]=t[h-B],t[h+1]=t[h+1-B],t[h+2]=t[h+2-B],t[h+3]=t[h+3-B];h=U}}r.l=f,r.p=H,r.b=h,r.f=l,f&&(l=1,r.m=p,r.d=u,r.n=d)}while(!l);return h==t.length?t:Ge(t,0,h)})(this.p,this.o,this.s);this.ondata(Ge(r,t,this.s.b),this.d),this.o=Ge(r,this.s.b-32768),this.s.b=this.o.length,this.p=Ge(this.p,this.s.p/8|0),this.s.p&=7},e.prototype.push=function(e,t){this.e(e),this.c(t)},e}(),ct="undefined"!=typeof TextDecoder&&new TextDecoder;try{ct.decode(it,{stream:!0})}catch(e){}function ht(e,n,r){return class{constructor(a){const i=this;a.hasOwnProperty("level")&&void 0===a.level&&delete a.level,i.codec=new e(t.assign({},n,a)),r(i.codec,(e=>{if(i.pendingData){const{pendingData:t}=i;i.pendingData=new s(t.length+e.length),i.pendingData.set(t,0),i.pendingData.set(e,t.length)}else i.pendingData=new s(e)}))}append(e){return this.codec.push(e),a(this)}flush(){return this.codec.push(new s,!0),a(this)}};function a(e){if(e.pendingData){const t=e.pendingData;return e.pendingData=null,t}return new s}}const{Deflate:ft,Inflate:ut}=((e,t={},n)=>({Deflate:ht(e.Deflate,t.deflate,n),Inflate:ht(e.Inflate,t.inflate,n)}))({Deflate:ot,Inflate:lt},void 0,((e,t)=>e.ondata=t));self.initCodec=()=>{self.Deflate=ft,self.Inflate=ut};\n'],{type:"text/javascript"}));e({workerScripts:{inflate:[t],deflate:[t]}});}};

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
					const { pendingData } = codecAdapter;
					codecAdapter.pendingData = new Uint8Array(pendingData.length + data.length);
					codecAdapter.pendingData.set(pendingData, 0);
					codecAdapter.pendingData.set(data, pendingData.length);
				} else {
					codecAdapter.pendingData = new Uint8Array(data);
				}
			};
			// eslint-disable-next-line no-prototype-builtins
			if (options.hasOwnProperty("level") && options.level === undefined) {
				delete options.level;
			}
			codecAdapter.codec = new constructor(Object.assign({}, constructorOptions, options));
			registerDataHandler(codecAdapter.codec, onData);
		}
		append(data) {
			this.codec.push(data);
			return getResponse(this);
		}
		flush() {
			this.codec.push(new Uint8Array(), true);
			return getResponse(this);
		}
	};

	function getResponse(codec) {
		if (codec.pendingData) {
			const output = codec.pendingData;
			codec.pendingData = null;
			return output;
		} else {
			return new Uint8Array();
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

class Crc32Stream extends TransformStream {

	constructor() {
		super({
			start() {
				this.crc32 = new Crc32();
			},
			transform(chunk) {
				this.crc32.append(chunk);
			},
			flush(controller) {
				const value = new Uint8Array(4);
				const dataView = new DataView(value.buffer);
				dataView.setUint32(0, this.crc32.get());
				controller.enqueue(value);
			}
		});
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
	reset() {
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
	update(data) {
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
	finalize() {
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
	_f(t, b, c, d) {
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
	_S(n, x) {
		return (x << n) | (x >>> 32 - n);
	},

	/**
	 * Perform one cycle of SHA-1.
	 * @param {Uint32Array|bitArray} words one block of words.
	 * @private
	 */
	_block(words) {
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
const UNDEFINED_TYPE$1 = "undefined";
const FUNCTION_TYPE = "function";
const CRYPTO_API_SUPPORTED = typeof crypto != UNDEFINED_TYPE$1;
const SUBTLE_API_SUPPORTED = CRYPTO_API_SUPPORTED && typeof crypto.subtle != UNDEFINED_TYPE$1;
const GET_RANDOM_VALUES_SUPPORTED = CRYPTO_API_SUPPORTED && typeof crypto.getRandomValues == FUNCTION_TYPE;
const IMPORT_KEY_SUPPORTED = CRYPTO_API_SUPPORTED && SUBTLE_API_SUPPORTED && typeof crypto.subtle.importKey == FUNCTION_TYPE;
const DERIVE_BITS_SUPPORTED = CRYPTO_API_SUPPORTED && SUBTLE_API_SUPPORTED && typeof crypto.subtle.deriveBits == FUNCTION_TYPE;
const codecBytes = codec.bytes;
const Aes = cipher.aes;
const CtrGladman = mode.ctrGladman;
const HmacSha1 = misc.hmacSha1;

class AESDecryptionStream extends TransformStream {

	constructor(password, signed, strength) {
		let stream;
		super({
			start() {
				Object.assign(this, {
					ready: new Promise(resolve => this.resolveReady = resolve),
					password,
					signed,
					strength: strength - 1,
					pending: new Uint8Array()
				});
			},
			async transform(chunk, controller) {
				const aesCrypto = this;
				if (aesCrypto.password) {
					const password = aesCrypto.password;
					aesCrypto.password = null;
					const preamble = subarray(chunk, 0, SALT_LENGTH[aesCrypto.strength] + 2);
					await createDecryptionKeys(aesCrypto, preamble, password);
					aesCrypto.ctr = new CtrGladman(new Aes(aesCrypto.keys.key), Array.from(COUNTER_DEFAULT_VALUE));
					aesCrypto.hmac = new HmacSha1(aesCrypto.keys.authentication);
					chunk = subarray(chunk, SALT_LENGTH[aesCrypto.strength] + 2);
					aesCrypto.resolveReady();
				} else {
					await aesCrypto.ready;
				}
				const output = new Uint8Array(chunk.length - SIGNATURE_LENGTH - ((chunk.length - SIGNATURE_LENGTH) % BLOCK_LENGTH));
				controller.enqueue(append(aesCrypto, chunk, output, 0, SIGNATURE_LENGTH, true));
			},
			async flush(controller) {
				const aesCrypto = this;
				await aesCrypto.ready;
				const pending = aesCrypto.pending;
				const chunkToDecrypt = subarray(pending, 0, pending.length - SIGNATURE_LENGTH);
				const originalSignature = subarray(pending, pending.length - SIGNATURE_LENGTH);
				let decryptedChunkArray = new Uint8Array();
				if (chunkToDecrypt.length) {
					const encryptedChunk = toBits(codecBytes, chunkToDecrypt);
					aesCrypto.hmac.update(encryptedChunk);
					const decryptedChunk = aesCrypto.ctr.update(encryptedChunk);
					decryptedChunkArray = fromBits(codecBytes, decryptedChunk);
				}
				stream.valid = true;
				if (aesCrypto.signed) {
					const signature = subarray(fromBits(codecBytes, aesCrypto.hmac.digest()), 0, SIGNATURE_LENGTH);
					for (let indexSignature = 0; indexSignature < SIGNATURE_LENGTH; indexSignature++) {
						if (signature[indexSignature] != originalSignature[indexSignature]) {
							stream.valid = false;
						}
					}
				}
				controller.enqueue(decryptedChunkArray);
			}
		});
		stream = this;
	}
}

class AESEncryptionStream extends TransformStream {

	constructor(password, strength) {
		let stream;
		super({
			start() {
				Object.assign(this, {
					ready: new Promise(resolve => this.resolveReady = resolve),
					password,
					strength: strength - 1,
					pending: new Uint8Array()
				});
			},
			async transform(chunk, controller) {
				const aesCrypto = this;
				let preamble = new Uint8Array();
				if (aesCrypto.password) {
					const password = aesCrypto.password;
					aesCrypto.password = null;
					preamble = await createEncryptionKeys(aesCrypto, password);
					aesCrypto.ctr = new CtrGladman(new Aes(aesCrypto.keys.key), Array.from(COUNTER_DEFAULT_VALUE));
					aesCrypto.hmac = new HmacSha1(aesCrypto.keys.authentication);
					aesCrypto.resolveReady();
				} else {
					await aesCrypto.ready;
				}
				const output = new Uint8Array(preamble.length + chunk.length - (chunk.length % BLOCK_LENGTH));
				output.set(preamble, 0);
				controller.enqueue(append(aesCrypto, chunk, output, preamble.length, 0));
			},
			async flush(controller) {
				const aesCrypto = this;
				await aesCrypto.ready;
				let encryptedChunkArray = new Uint8Array();
				if (aesCrypto.pending.length) {
					const encryptedChunk = aesCrypto.ctr.update(toBits(codecBytes, aesCrypto.pending));
					aesCrypto.hmac.update(encryptedChunk);
					encryptedChunkArray = fromBits(codecBytes, encryptedChunk);
				}
				stream.signature = fromBits(codecBytes, aesCrypto.hmac.digest()).slice(0, SIGNATURE_LENGTH);
				controller.enqueue(concat(encryptedChunkArray, stream.signature));
			}
		});
		stream = this;
	}
}

function append(aesCrypto, input, output, paddingStart, paddingEnd, verifySignature) {
	const inputLength = input.length - paddingEnd;
	if (aesCrypto.pending.length) {
		input = concat(aesCrypto.pending, input);
		output = expand(output, inputLength - (inputLength % BLOCK_LENGTH));
	}
	let offset;
	for (offset = 0; offset <= inputLength - BLOCK_LENGTH; offset += BLOCK_LENGTH) {
		const inputChunk = toBits(codecBytes, subarray(input, offset, offset + BLOCK_LENGTH));
		if (verifySignature) {
			aesCrypto.hmac.update(inputChunk);
		}
		const outputChunk = aesCrypto.ctr.update(inputChunk);
		if (!verifySignature) {
			aesCrypto.hmac.update(outputChunk);
		}
		output.set(fromBits(codecBytes, outputChunk), offset + paddingStart);
	}
	aesCrypto.pending = subarray(input, offset);
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
		key: toBits(codecBytes, subarray(compositeKey, 0, KEY_LENGTH[target.strength])),
		authentication: toBits(codecBytes, subarray(compositeKey, KEY_LENGTH[target.strength], KEY_LENGTH[target.strength] * 2)),
		passwordVerification: subarray(compositeKey, KEY_LENGTH[target.strength] * 2)
	};
}

function getRandomValues(array) {
	if (GET_RANDOM_VALUES_SUPPORTED) {
		return crypto.getRandomValues(array);
	} else {
		return random.getRandomValues(array);
	}
}

function importKey(format, password, algorithm, extractable, keyUsages) {
	if (IMPORT_KEY_SUPPORTED) {
		return crypto.subtle.importKey(format, password, algorithm, extractable, keyUsages);
	} else {
		return misc.importKey(password);
	}
}

async function deriveBits(algorithm, baseKey, length) {
	if (DERIVE_BITS_SUPPORTED) {
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

function fromBits(codecBytes, chunk) {
	return codecBytes.fromBits(chunk);
}
function toBits(codecBytes, chunk) {
	return codecBytes.toBits(chunk);
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

class ZipCryptoDecryptionStream extends TransformStream {

	constructor(password, passwordVerification) {
		let stream;
		super({
			start() {
				Object.assign(this, {
					password,
					passwordVerification
				});
				createKeys(this, password);
			},
			transform(chunk, controller) {
				const zipCrypto = this;
				if (zipCrypto.password) {
					const decryptedHeader = decrypt(zipCrypto, chunk.subarray(0, HEADER_LENGTH));
					zipCrypto.password = null;
					if (decryptedHeader[HEADER_LENGTH - 1] != zipCrypto.passwordVerification) {
						throw new Error(ERR_INVALID_PASSWORD);
					}
					chunk = chunk.subarray(HEADER_LENGTH);
				}
				controller.enqueue(decrypt(zipCrypto, chunk));
			},
			flush() {
				stream.valid = true;
			}
		});
		stream = this;
	}
}

class ZipCryptoEncryptionStream extends TransformStream {

	constructor(password, passwordVerification) {
		super({
			start() {
				Object.assign(this, {
					password,
					passwordVerification
				});
				createKeys(this, password);
			},
			transform(chunk, controller) {
				const zipCrypto = this;
				let output;
				let offset;
				if (zipCrypto.password) {
					zipCrypto.password = null;
					const header = crypto.getRandomValues(new Uint8Array(HEADER_LENGTH));
					header[HEADER_LENGTH - 1] = zipCrypto.passwordVerification;
					output = new Uint8Array(chunk.length + header.length);
					output.set(encrypt(zipCrypto, header), 0);
					offset = HEADER_LENGTH;
				} else {
					output = new Uint8Array(chunk.length);
					offset = 0;
				}
				output.set(encrypt(zipCrypto, chunk), offset);
				controller.enqueue(output);
			},
			flush() {
			}
		});
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

/*
 * This program is based on JZlib 1.0.2 ymnk, JCraft,Inc.
 * JZlib is based on zlib-1.1.3, so all credit should go authors
 * Jean-loup Gailly(jloup@gzip.org) and Mark Adler(madler@alumni.caltech.edu)
 * and contributors of zlib.
 */

/* global TransformStream */

class CodecStream extends TransformStream {

	constructor(Codec, options) {
		let codec;
		super({
			start() {
				codec = new Codec(options);
			},
			transform(chunk, controller) {
				chunk = codec.append(chunk);
				controller.enqueue(chunk);
			},
			flush(controller) {
				const chunk = codec.flush();
				if (chunk) {
					controller.enqueue(chunk);
				}
			}
		});
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

const ERR_INVALID_SIGNATURE = "Invalid signature";
const COMPRESSION_FORMAT = "deflate-raw";
const UNDEFINED_TYPE = "undefined";
const COMPRESSION_STREAM_API_SUPPORTED = typeof CompressionStream == UNDEFINED_TYPE;
const DECOMPRESSION_STREAM_API_SUPPORTED = typeof DecompressionStream == UNDEFINED_TYPE;
let INFLATE_RAW_SUPPORTED = true;
let DEFLATE_RAW_SUPPORTED = true;

class DeflateStream extends TransformStream {

	constructor(codecConstructor, options, { chunkSize }, ...strategies) {
		super({}, ...strategies);
		const { compressed, encrypted, useCompressionStream, password, passwordVerification, encryptionStrength, zipCrypto, signed } = options;
		const stream = this;
		let crc32Stream, encryptionStream;
		let readable = filterEmptyChunks(super.readable);
		if ((!encrypted || zipCrypto) && signed) {
			[readable, crc32Stream] = readable.tee();
			crc32Stream = crc32Stream.pipeThrough(new Crc32Stream());
		}
		if (compressed) {
			if ((useCompressionStream !== undefined && !useCompressionStream) || (COMPRESSION_STREAM_API_SUPPORTED && !DEFLATE_RAW_SUPPORTED)) {
				readable = pipeCodecStream(codecConstructor, readable, chunkSize);
			} else {
				try {
					readable = readable.pipeThrough(new CompressionStream(COMPRESSION_FORMAT));
				} catch (_error) {
					DEFLATE_RAW_SUPPORTED = false;
					readable = pipeCodecStream(codecConstructor, readable, chunkSize);
				}
			}
		}
		if (encrypted) {
			if (zipCrypto) {
				readable = readable.pipeThrough(new ZipCryptoEncryptionStream(password, passwordVerification));
			} else {
				encryptionStream = new AESEncryptionStream(password, encryptionStrength);
				readable = readable.pipeThrough(encryptionStream);
			}
		}
		setReadable(stream, readable, async () => {
			let signature;
			if (encrypted && !zipCrypto) {
				signature = encryptionStream.signature;
			}
			if ((!encrypted || zipCrypto) && signed) {
				signature = await crc32Stream.getReader().read();
				signature = new DataView(signature.value.buffer).getUint32(0);
			}
			stream.signature = signature;
		});
	}
}

class InflateStream extends TransformStream {

	constructor(codecConstructor, options, { chunkSize }, ...strategies) {
		super({}, ...strategies);
		const { zipCrypto, encrypted, password, passwordVerification, signed, encryptionStrength, compressed, useCompressionStream } = options;
		const stream = this;
		let crc32Stream, decryptionStream;
		let readable = filterEmptyChunks(super.readable);
		if (encrypted) {
			if (zipCrypto) {
				readable = readable.pipeThrough(new ZipCryptoDecryptionStream(password, passwordVerification));
			} else {
				decryptionStream = new AESDecryptionStream(password, signed, encryptionStrength);
				readable = readable.pipeThrough(decryptionStream);
			}
		}
		if (compressed) {
			if ((useCompressionStream !== undefined && !useCompressionStream) || (DECOMPRESSION_STREAM_API_SUPPORTED && !INFLATE_RAW_SUPPORTED)) {
				readable = pipeCodecStream(codecConstructor, readable, chunkSize);
			} else {
				try {
					readable = readable.pipeThrough(new DecompressionStream(COMPRESSION_FORMAT));
				} catch (_error) {
					INFLATE_RAW_SUPPORTED = false;
					readable = pipeCodecStream(codecConstructor, readable, chunkSize);
				}
			}
		}
		if ((!encrypted || zipCrypto) && signed) {
			[readable, crc32Stream] = readable.tee();
			crc32Stream = crc32Stream.pipeThrough(new Crc32Stream());
		}
		setReadable(stream, readable, async () => {
			if (encrypted && !zipCrypto) {
				if (!decryptionStream.valid) {
					throw new Error(ERR_INVALID_SIGNATURE);
				}
			}
			if ((!encrypted || zipCrypto) && signed) {
				const signature = await crc32Stream.getReader().read();
				const dataViewSignature = new DataView(signature.value.buffer);
				if (signature != dataViewSignature.getUint32(0, false)) {
					throw new Error(ERR_INVALID_SIGNATURE);
				}
			}
		});
	}
}

function pipeCodecStream(codecConstructor, readable, chunkSize) {
	return readable.pipeThrough(new CodecStream(codecConstructor, { chunkSize }));
}

function filterEmptyChunks(readable) {
	return readable.pipeThrough(new TransformStream({
		transform(chunk, controller) {
			if (chunk && chunk.length) {
				controller.enqueue(chunk);
			}
		}
	}));
}

function setReadable(stream, readable, flush) {
	stream.length = 0;
	readable = readable.pipeThrough(new TransformStream({
		transform(chunk, controller) {
			if (chunk && chunk.length) {
				stream.length += chunk.length;
				controller.enqueue(chunk);
			}
		}, flush
	}));
	Object.defineProperty(stream, "readable", {
		get() {
			return readable;
		}
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

const CODEC_DEFLATE = "deflate";
const CODEC_INFLATE = "inflate";
const MESSAGE_EVENT_TYPE = "message";
const MESSAGE_START = "start";
const MESSAGE_PULL = "pull";
const MESSAGE_DATA = "data";
const MESSAGE_CLOSE = "close";
const ERR_ABORT = "AbortError";

class Codec {

	constructor(codecConstructor, readable, writable, options, config) {
		const { codecType } = options;
		if (codecType.startsWith(CODEC_DEFLATE)) {
			this.run = () => run(DeflateStream);
		} else if (codecType.startsWith(CODEC_INFLATE)) {
			this.run = () => run(InflateStream);
		}

		async function run(StreamConstructor) {
			const stream = new StreamConstructor(codecConstructor, options, config);
			await readable.pipeThrough(stream).pipeTo(writable, { preventClose: true });
			const { length, signature } = stream;
			return { length, signature };
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

let classicWorkersSupported = true;

class CodecWorker {

	constructor(workerData, stream, workerOptions, onTaskFinished) {
		const { readable, writable } = stream;
		const { options, config, streamOptions, webWorker, scripts, codecConstructor } = workerOptions;
		Object.assign(workerData, {
			busy: true,
			codecConstructor,
			readable,
			writable,
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
		const { signal, onstart, onprogress, size, onend } = streamOptions;
		let chunkOffset = 0;
		const transformer = {};
		if (onstart) {
			transformer.start = () => callHandler(onstart, size());
		}
		transformer.transform = async (chunk, controller) => {
			chunkOffset += chunk.length;
			if (onprogress) {
				await callHandler(onprogress, chunkOffset, size());
			}
			controller.enqueue(chunk);
		};
		transformer.flush = () => {
			readable.size = () => chunkOffset;
			if (onend) {
				callHandler(onend, chunkOffset);
			}
		};
		workerData.readable = readable.pipeThrough(new TransformStream(transformer, { highWaterMark: 1, size: () => config.chunkSize }), { signal });
		return webWorker ? createWebWorkerInterface(workerData, config) : createWorkerInterface(workerData, config);
	}
}

async function callHandler(handler, ...parameters) {
	try {
		await handler(...parameters);
	} catch (_error) {
		// ignored
	}
}

function createWorkerInterface(workerData, config) {
	const interfaceCodec = new Codec(workerData.codecConstructor, workerData.readable, workerData.writable, workerData.options, config);
	const { onTaskFinished } = workerData;
	const codec = {
		async run() {
			try {
				return await interfaceCodec.run();
			} finally {
				onTaskFinished();
			}
		}
	};
	return codec;
}

function createWebWorkerInterface(workerData, { baseURL, chunkSize }) {
	const workerOptions = { type: "module" };
	const { readable, writable } = workerData;
	Object.assign(workerData, {
		reader: readable.getReader(),
		writer: writable.getWriter(),
		result: new Promise((resolve, reject) => {
			workerData.resolveResult = resolve;
			workerData.rejectResult = reject;
		})
	});
	if (!workerData.interface) {
		if (!classicWorkersSupported) {
			workerData.worker = getWorker(workerOptions);
		} else {
			try {
				workerData.worker = getWorker({});
			} catch (_error) {
				classicWorkersSupported = false;
				workerData.worker = getWorker(workerOptions);
			}
		}
		workerData.worker.addEventListener(MESSAGE_EVENT_TYPE, onMessage, false);
		workerData.interface = {
			run() {
				const { options } = workerData;
				const scripts = workerData.scripts.slice(1);
				sendMessage({ type: MESSAGE_START, scripts, options, config: { chunkSize } });
				return workerData.result;
			}
		};
	}
	return workerData.interface;

	function getWorker(options) {
		let url, scriptUrl;
		url = workerData.scripts[0];
		if (typeof url == "function") {
			url = url();
		}
		try {
			scriptUrl = new URL(url, baseURL);
		} catch (_error) {
			scriptUrl = url;
		}
		return new Worker(scriptUrl, options);
	}

	function sendMessage(message) {
		const { worker, writer, onTaskFinished } = workerData;
		try {
			let { data } = message;
			if (data) {
				try {
					const { buffer, length } = data;
					if (length != buffer.byteLength) {
						data = new Uint8Array(data);
					}
					message.data = data.buffer;
					worker.postMessage(message, [message.data]);
				} catch (_error) {
					worker.postMessage(message);
				}
			} else {
				worker.postMessage(message);
			}
		} catch (error) {
			writer.releaseLock();
			onTaskFinished();
			throw error;
		}
	}

	async function onMessage(event) {
		const message = event.data;
		const { reader, writer, resolveResult, rejectResult, onTaskFinished } = workerData;
		const { type, data, messageId, result } = message;
		const reponseError = message.error;
		try {
			if (reponseError) {
				const { message, stack } = reponseError;
				const error = new Error(message);
				error.stack = stack;
				close(error);
			} else {
				if (type == MESSAGE_PULL) {
					const { value, done } = await reader.read();
					sendMessage({ type: MESSAGE_DATA, data: value, done, messageId });
				}
				if (type == MESSAGE_DATA) {
					await writer.ready;
					await writer.write(new Uint8Array(data));
				}
				if (type == MESSAGE_CLOSE) {
					close(null, result);
				}
			}
		} catch (error) {
			close(error);
		}

		function close(error, result) {
			if (error) {
				rejectResult(error);
			} else {
				resolveResult(result);
			}
			writer.releaseLock();
			onTaskFinished();
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

let indexWorker = 0;

async function runWorker(stream, workerOptions) {
	const { options, config, streamOptions } = workerOptions;
	const streamCopy = !options.compressed && !options.signed && !options.encrypted;
	const { useWebWorkers, useCompressionStream, codecType } = options;
	const { workerScripts } = config;
	workerOptions.webWorker = !streamCopy && (useWebWorkers || (useWebWorkers === undefined && config.useWebWorkers));
	workerOptions.scripts = workerOptions.webWorker && workerScripts ? workerScripts[codecType] : [];
	options.useCompressionStream = useCompressionStream === undefined ? config.useCompressionStream : useCompressionStream;
	let worker;
	if (pool.length < config.maxWorkers) {
		const workerData = { indexWorker };
		indexWorker++;
		pool.push(workerData);
		worker = new CodecWorker(workerData, stream, workerOptions, onTaskFinished);
	} else {
		const workerData = pool.find(workerData => !workerData.busy);
		if (workerData) {
			clearTerminateTimeout(workerData);
			worker = new CodecWorker(workerData, stream, workerOptions, onTaskFinished);
		} else {
			worker = await new Promise(resolve => pendingRequests.push({ resolve, stream, workerOptions }));
		}
	}
	try {
		return await worker.run();
	} catch (error) {
		const { signal } = streamOptions;
		if (signal && signal.aborted && (signal.reason == error || error.name == ERR_ABORT)) {
			throw new Error(ERR_ABORT);
		} else {
			throw error;
		}
	}

	function onTaskFinished(workerData) {
		if (pendingRequests.length) {
			const [{ resolve, stream, workerOptions }] = pendingRequests.splice(0, 1);
			resolve(new CodecWorker(workerData, stream, workerOptions, onTaskFinished));
		} else if (workerData.worker) {
			const { terminateWorkerTimeout } = config;
			clearTerminateTimeout(workerData);
			if (Number.isFinite(terminateWorkerTimeout) && terminateWorkerTimeout >= 0) {
				workerData.terminateTimeout = setTimeout(() => {
					pool = pool.filter(data => data != workerData);
					workerData.terminate();
				}, terminateWorkerTimeout);
			}
		} else {
			pool = pool.filter(data => data != workerData);
		}
	}
}

function clearTerminateTimeout(workerData) {
	const { terminateTimeout } = workerData;
	if (terminateTimeout) {
		clearTimeout(terminateTimeout);
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

/* global Blob, atob, btoa, XMLHttpRequest, URL, fetch, ReadableStream, WritableStream */

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
const DEFAULT_CHUNK_SIZE = 64 * 1024;

class Stream {

	constructor() {
		this.size = 0;
	}

	init() {
		this.initialized = true;
	}
}

class Reader extends Stream {

	get readable() {
		const reader = this;
		const readable = new ReadableStream({
			start() {
				this.chunkOffset = 0;
			},
			async pull(controller) {
				const { offset = 0, chunkSize = DEFAULT_CHUNK_SIZE, size } = readable;
				const { chunkOffset } = this;
				controller.enqueue(await reader.readUint8Array(offset + chunkOffset, Math.min(chunkSize, size() - chunkOffset)));
				if (chunkOffset + chunkSize > size()) {
					controller.close();
				} else {
					this.chunkOffset += chunkSize;
				}
			}
		});
		return readable;
	}
}

class WriterStream extends Stream {

	constructor() {
		super();
		const writer = this;
		const writable = new WritableStream({
			write(chunk) {
				return writer.writeUint8Array(chunk);
			}
		});
		Object.defineProperty(this, "writable", {
			get() {
				return writable;
			}
		});
	}
}

class Writer extends WriterStream {

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
		const reader = this;
		super.init();
		reader.blobReader.init();
		reader.size = reader.blobReader.size;
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
		const writer = this;
		return writer.blob.text();
	}
}

class Data64URIReader extends Reader {

	constructor(dataURI) {
		super();
		const reader = this;
		reader.dataURI = dataURI;
		let dataEnd = dataURI.length;
		while (dataURI.charAt(dataEnd - 1) == "=") {
			dataEnd--;
		}
		reader.dataStart = dataURI.indexOf(",") + 1;
		reader.size = Math.floor((dataEnd - reader.dataStart) * 0.75);
	}

	readUint8Array(offset, length) {
		const dataArray = new Uint8Array(length);
		const start = Math.floor(offset / 3) * 4;
		const dataStart = this.dataStart;
		const bytes = atob(this.dataURI.substring(start + dataStart, Math.ceil((offset + length) / 3) * 4 + dataStart));
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
		const writer = this;
		let indexArray = 0;
		let dataString = writer.pending;
		const delta = writer.pending.length;
		writer.pending = "";
		for (indexArray = 0; indexArray < (Math.floor((delta + array.length) / 3) * 3) - delta; indexArray++) {
			dataString += String.fromCharCode(array[indexArray]);
		}
		for (; indexArray < array.length; indexArray++) {
			writer.pending += String.fromCharCode(array[indexArray]);
		}
		if (dataString.length > 2) {
			writer.data += btoa(dataString);
		} else {
			writer.pending = dataString;
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
		const reader = this;
		return new Uint8Array(await reader.blob.slice(offset, offset + length).arrayBuffer());
	}
}

class BlobWriter extends Writer {

	constructor(contentType) {
		super();
		const writer = this;
		writer.contentType = contentType;
		writer.arrayBuffersMaxlength = 8;
		initArrayBuffers(writer);
	}

	writeUint8Array(array) {
		super.writeUint8Array(array);
		const writer = this;
		if (writer.arrayBuffers.length == writer.arrayBuffersMaxlength) {
			flushArrayBuffers(writer);
		}
		writer.arrayBuffers.push(array.buffer);
	}

	getData() {
		const writer = this;
		if (!writer.blob) {
			if (writer.arrayBuffers.length) {
				flushArrayBuffers(writer);
			}
			writer.blob = writer.pendingBlob;
			initArrayBuffers(writer);
		}
		return writer.blob;
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

class ReadableStreamReader extends Stream {

	constructor(readable) {
		super();
		if (!readable) {
			this.readable = new ReadableStream({});
		}
	}
}

class WritableStreamWriter extends Writer {

	constructor(writable, { preventClose } = {}) {
		super();
		this.preventClose = preventClose;
		if (!writable) {
			writable = new WritableStream({});
		}
		Object.defineProperty(this, "writable", {
			get() {
				return writable;
			}
		});
	}
}

class FetchReader extends Reader {

	constructor(url, options) {
		super();
		const reader = this;
		reader.url = url;
		reader.preventHeadRequest = options.preventHeadRequest;
		reader.useRangeHeader = options.useRangeHeader;
		reader.forceRangeRequests = options.forceRangeRequests;
		reader.options = options = Object.assign({}, options);
		delete options.preventHeadRequest;
		delete options.useRangeHeader;
		delete options.forceRangeRequests;
		delete options.useXHR;
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
		const reader = this;
		reader.url = url;
		reader.preventHeadRequest = options.preventHeadRequest;
		reader.useRangeHeader = options.useRangeHeader;
		reader.forceRangeRequests = options.forceRangeRequests;
		reader.options = options;
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
		const reader = this;
		reader.url = url;
		reader.reader = options.useXHR ? new XHRReader(url, options) : new FetchReader(url, options);
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
		this.array = new Uint8Array();
	}

	writeUint8Array(array) {
		super.writeUint8Array(array);
		const writer = this;
		const previousArray = writer.array;
		writer.array = new Uint8Array(previousArray.length + array.length);
		writer.array.set(previousArray);
		writer.array.set(array, previousArray.length);
	}

	getData() {
		return this.array;
	}
}

function isHttpFamily(url) {
	const { baseURL } = getConfiguration();
	const { protocol } = new URL(url, baseURL);
	return protocol == "http:" || protocol == "https:";
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
		const { reader, config } = zipReader;
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
		const commentOffset = endOfDirectoryInfo.offset;
		const commentLength = getUint16(endOfDirectoryView, 20);
		const appendedDataOffset = commentOffset + END_OF_CENTRAL_DIR_LENGTH + commentLength;
		let filesLength = getUint16(endOfDirectoryView, 8);
		let prependedDataLength = 0;
		let startOffset = 0;
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
			const fileEntry = new ZipEntry(reader, config, zipReader.options);
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
			startOffset = Math.max(fileEntry.offset, startOffset);
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
					await options.onprogress(indexFile + 1, filesLength, new Entry(fileEntry));
				} catch (_error) {
					// ignored
				}
			}
			yield entry;
		}
		const extractPrependedData = getOptionValue$1(zipReader, options, "extractPrependedData");
		const extractAppendedData = getOptionValue$1(zipReader, options, "extractAppendedData");
		if (extractPrependedData) {
			zipReader.prependedData = await readUint8Array(reader, 0, startOffset);
		}
		zipReader.comment = await readUint8Array(reader, commentOffset + END_OF_CENTRAL_DIR_LENGTH, commentLength);
		if (extractAppendedData) {
			zipReader.appendedData = appendedDataOffset < reader.size ? await readUint8Array(reader, appendedDataOffset, reader.size - appendedDataOffset) : new Uint8Array();
		}
		return true;
	}

	async getEntries(options = {}) {
		const entries = [];
		for await (const entry of this.getEntriesGenerator(options)) {
			entries.push(entry);
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
		const dataOffset = offset + 30 + localDirectory.filenameLength + localDirectory.extraFieldLength;
		const size = () => compressedSize;
		const readable = reader.readable;
		readable.offset = dataOffset;
		readable.size = size;
		readable.chunkSize = getChunkSize(config);
		const { writable } = writer;
		const signal = getOptionValue$1(zipEntry, options, "signal");
		if (writer.init && !writer.initialized) {
			await writer.init();
		}
		const { onstart, onprogress, onend } = options;
		const workerOptions = {
			options: {
				codecType: CODEC_INFLATE,
				password,
				zipCrypto,
				encryptionStrength: extraFieldAES && extraFieldAES.strength,
				signed: getOptionValue$1(zipEntry, options, "checkSignature"),
				passwordVerification: zipCrypto && (bitFlag.dataDescriptor ? ((rawLastModDate >>> 8) & 0xFF) : ((signature >>> 24) & 0xFF)),
				signature,
				compressed: compressionMethod != 0,
				encrypted,
				useWebWorkers: getOptionValue$1(zipEntry, options, "useWebWorkers"),
				useCompressionStream: getOptionValue$1(zipEntry, options, "useCompressionStream")
			},
			config,
			streamOptions: { signal, size, onstart, onprogress, onend },
			codecConstructor: config.Inflate
		};
		await runWorker({ readable, writable }, workerOptions);
		if (!writer.preventClose) {
			await writable.getWriter().close();
		}
		return writer.getData ? writer.getData() : writable;
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
	const { rawExtraField } = directory;
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
const ERR_UNSUPPORTED_FORMAT = "Zip64 is not supported (make sure 'keepOrder' is set to 'true')";

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
			offset: writer.size || 0,
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

	async close(comment = new Uint8Array(), options = {}) {
		const { pendingAddFileCalls, writer } = this;
		const { writable } = writer;
		while (pendingAddFileCalls.size) {
			await Promise.all(Array.from(pendingAddFileCalls));
		}
		await closeFile(this, comment, options);
		if (!writer.preventClose && !options.preventClose) {
			await writable.getWriter().close();
		}
		return writer.getData ? writer.getData() : writable;
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
	let rawExtraField = new Uint8Array();
	const { extraField } = options;
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
		if (reader.init && !reader.initialized) {
			await reader.init();
		}
		if (reader.size === undefined) {
			options.dataDescriptor = true;
		} else {
			uncompressedSize = reader.size;
		}
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
	const useCompressionStream = getOptionValue(zipWriter, options, "useCompressionStream");
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
		externalFileAttribute,
		useCompressionStream
	}));
	if (maximumCompressedSize) {
		zipWriter.pendingCompressedSize -= maximumCompressedSize;
	}
	Object.assign(fileEntry, { name, comment, extraField });
	return new Entry(fileEntry);
}

async function getFileEntry(zipWriter, name, reader, options) {
	const { files, writer } = zipWriter;
	const previousFileEntry = Array.from(files.values()).pop();
	let fileEntry = {};
	let bufferedWrite;
	let releaseLockWriter;
	let resolveLockCurrentFileEntry;
	let writingBufferedData;
	let fileWriter;
	files.set(name, fileEntry);
	try {
		let lockPreviousFileEntry;
		if (options.keepOrder) {
			lockPreviousFileEntry = previousFileEntry && previousFileEntry.lock;
		}
		fileEntry.lock = new Promise(resolve => resolveLockCurrentFileEntry = resolve);
		if (options.bufferedWrite || zipWriter.lockWriter || !options.dataDescriptor) {
			fileWriter = new BlobWriter();
			fileWriter.init();
			bufferedWrite = true;
		} else {
			zipWriter.lockWriter = Promise.resolve();
			if (writer.init && !writer.initialized) {
				await writer.init();
			}
			fileWriter = writer;
		}
		fileEntry = await createFileEntry(reader, fileEntry, fileWriter.writable, zipWriter.config, options);
		files.set(name, fileEntry);
		fileEntry.filename = name;
		if (bufferedWrite) {
			let blob = fileWriter.getData();
			await lockPreviousFileEntry;
			await lockWriter();
			writingBufferedData = true;
			const { writable } = writer;
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
				await writeUint8Array(writable, new Uint8Array(arrayBuffer));
				blob = blob.slice(headerLength);
			}
			await blob.stream().pipeTo(writable, { preventClose: true });
			writingBufferedData = false;
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
		if ((bufferedWrite && writingBufferedData) || (!bufferedWrite && fileEntry.dataWritten)) {
			error.corruptedEntry = zipWriter.hasCorruptedEntries = true;
			zipWriter.offset += fileWriter.size;
		}
		files.delete(name);
		throw error;
	} finally {
		resolveLockCurrentFileEntry();
		if (releaseLockWriter) {
			releaseLockWriter();
		}
	}

	async function lockWriter() {
		if (zipWriter.lockWriter) {
			await zipWriter.lockWriter.then(() => delete zipWriter.lockWriter);
			await lockWriter();
		} else {
			zipWriter.lockWriter = new Promise(resolve => releaseLockWriter = resolve);
		}
	}
}

async function createFileEntry(reader, pendingFileEntry, writable, config, options) {
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
		onstart,
		onprogress,
		onend,
		signal,
		encryptionStrength,
		extendedTimestamp,
		msDosCompatible,
		internalFileAttribute,
		externalFileAttribute,
		useCompressionStream
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
		rawExtraFieldAES = new Uint8Array();
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
			rawExtraFieldNTFS = new Uint8Array();
		}
	} else {
		rawExtraFieldNTFS = rawExtraFieldExtendedTimestamp = new Uint8Array();
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
		rawExtraFieldZip64: zip64 ? new Uint8Array(EXTRAFIELD_LENGTH_ZIP64 + 4) : new Uint8Array(),
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
		await writeUint8Array(writable, localHeaderArray);
		fileEntry.dataWritten = pendingFileEntry.dataWritten = true;
		const size = () => reader.size;
		const readable = reader.readable;
		readable.size = size;
		readable.chunkSize = getChunkSize(config);
		const workerOptions = {
			options: {
				codecType: CODEC_DEFLATE,
				level,
				password,
				encryptionStrength,
				zipCrypto: encrypted && zipCrypto,
				passwordVerification: encrypted && zipCrypto && (rawLastModDate >> 8) & 0xFF,
				signed: true,
				compressed,
				encrypted,
				useWebWorkers,
				useCompressionStream
			},
			config,
			streamOptions: { signal, size, onstart, onprogress, onend },
			codecConstructor: config.Deflate
		};
		result = await runWorker({ readable, writable }, workerOptions);
		uncompressedSize = fileEntry.uncompressedSize = reader.size = readable.size();
		compressedSize = result.length;
	} else {
		await writeUint8Array(writable, localHeaderArray);
		fileEntry.dataWritten = pendingFileEntry.dataWritten = true;
	}
	let dataDescriptorArray = new Uint8Array();
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
		const { signature } = result;
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
		await writeUint8Array(writable, dataDescriptorArray);
	}
	const length = localHeaderArray.length + compressedSize + dataDescriptorArray.length;
	Object.assign(fileEntry, { compressedSize, lastModDate, rawLastModDate, creationDate, lastAccessDate, encrypted, length });
	return fileEntry;
}

async function closeFile(zipWriter, comment, options) {
	const { files } = zipWriter;
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
			rawExtraFieldNTFS = rawExtraFieldExtendedTimestamp = new Uint8Array();
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
				await options.onprogress(indexFileEntry + 1, files.size, new Entry(fileEntry));
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
	const { writable } = zipWriter.writer;
	await writeUint8Array(writable, directoryArray);
	if (comment && comment.length) {
		await writeUint8Array(writable, comment);
	}
}

function sliceAsArrayBuffer(blob, start, end) {
	if (start || end) {
		return blob.slice(start, end).arrayBuffer();
	} else {
		return blob.arrayBuffer();
	}
}

async function writeUint8Array(writable, array) {
	const streamWriter = writable.getWriter();
	await streamWriter.ready;
	await streamWriter.write(array);
	streamWriter.releaseLock();
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
e(configure);

export { BlobReader, BlobWriter, Data64URIReader, Data64URIWriter, ERR_ABORT, ERR_BAD_FORMAT, ERR_CENTRAL_DIRECTORY_NOT_FOUND, ERR_DUPLICATED_NAME, ERR_ENCRYPTED, ERR_EOCDR_LOCATOR_ZIP64_NOT_FOUND, ERR_EOCDR_NOT_FOUND, ERR_EOCDR_ZIP64_NOT_FOUND, ERR_EXTRAFIELD_ZIP64_NOT_FOUND, ERR_HTTP_RANGE, ERR_INVALID_COMMENT, ERR_INVALID_ENCRYPTION_STRENGTH, ERR_INVALID_ENTRY_COMMENT, ERR_INVALID_ENTRY_NAME, ERR_INVALID_EXTRAFIELD_DATA, ERR_INVALID_EXTRAFIELD_TYPE, ERR_INVALID_PASSWORD, ERR_INVALID_SIGNATURE, ERR_INVALID_VERSION, ERR_LOCAL_FILE_HEADER_NOT_FOUND, ERR_NOT_SEEKABLE_READER, ERR_UNSUPPORTED_COMPRESSION, ERR_UNSUPPORTED_ENCRYPTION, ERR_UNSUPPORTED_FORMAT, HttpRangeReader, HttpReader, ReadableStreamReader, Reader, TextReader, TextWriter, Uint8ArrayReader, Uint8ArrayWriter, WritableStreamWriter, Writer, ZipReader, ZipWriter, configure, getMimeType, streamCodecShim as initShimAsyncCodec, terminateWorkers };
