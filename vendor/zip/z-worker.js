!function(){"use strict";const{Array:e,Object:t,Math:n,Error:r,Uint8Array:s,Uint16Array:a,Uint32Array:i,Int32Array:o,DataView:l,Promise:c,TextEncoder:h,crypto:f,postMessage:u,TransformStream:p,ReadableStream:d,WritableStream:g,CompressionStream:w,DecompressionStream:y}=globalThis,v=[];for(let e=0;256>e;e++){let t=e;for(let e=0;8>e;e++)1&t?t=t>>>1^3988292384:t>>>=1;v[e]=t}class m{constructor(e){this.crc=e||-1}append(e){let t=0|this.crc;for(let n=0,r=0|e.length;r>n;n++)t=t>>>8^v[255&(t^e[n])];this.crc=t}get(){return~this.crc}}class b extends p{constructor(){super({start(){this.crc32=new m},transform(e){this.crc32.append(e)},flush(e){const t=new s(4);new l(t.buffer).setUint32(0,this.crc32.get()),e.enqueue(t)}})}}const _={concat(e,t){if(0===e.length||0===t.length)return e.concat(t);const n=e[e.length-1],r=_.getPartial(n);return 32===r?e.concat(t):_._shiftRight(t,r,0|n,e.slice(0,e.length-1))},bitLength(e){const t=e.length;if(0===t)return 0;const n=e[t-1];return 32*(t-1)+_.getPartial(n)},clamp(e,t){if(32*e.length<t)return e;const r=(e=e.slice(0,n.ceil(t/32))).length;return t&=31,r>0&&t&&(e[r-1]=_.partial(t,e[r-1]&2147483648>>t-1,1)),e},partial:(e,t,n)=>32===e?t:(n?0|t:t<<32-e)+1099511627776*e,getPartial:e=>n.round(e/1099511627776)||32,_shiftRight(e,t,n,r){for(void 0===r&&(r=[]);t>=32;t-=32)r.push(n),n=0;if(0===t)return r.concat(e);for(let s=0;s<e.length;s++)r.push(n|e[s]>>>t),n=e[s]<<32-t;const s=e.length?e[e.length-1]:0,a=_.getPartial(s);return r.push(_.partial(t+a&31,t+a>32?n:r.pop(),1)),r}},k={bytes:{fromBits(e){const t=_.bitLength(e)/8,n=new s(t);let r;for(let s=0;t>s;s++)0==(3&s)&&(r=e[s/4]),n[s]=r>>>24,r<<=8;return n},toBits(e){const t=[];let n,r=0;for(n=0;n<e.length;n++)r=r<<8|e[n],3==(3&n)&&(t.push(r),r=0);return 3&n&&t.push(_.partial(8*(3&n),r)),t}}},S={sha1:function(e){e?(this._h=e._h.slice(0),this._buffer=e._buffer.slice(0),this._length=e._length):this.reset()}};S.sha1.prototype={blockSize:512,reset(){const e=this;return e._h=this._init.slice(0),e._buffer=[],e._length=0,e},update(e){const t=this;"string"==typeof e&&(e=k.utf8String.toBits(e));const n=t._buffer=_.concat(t._buffer,e),s=t._length,a=t._length=s+_.bitLength(e);if(a>9007199254740991)throw new r("Cannot hash more than 2^53 - 1 bits");const o=new i(n);let l=0;for(let e=t.blockSize+s-(t.blockSize+s&t.blockSize-1);a>=e;e+=t.blockSize)t._block(o.subarray(16*l,16*(l+1))),l+=1;return n.splice(0,16*l),t},finalize(){const e=this;let t=e._buffer;const r=e._h;t=_.concat(t,[_.partial(1,1)]);for(let e=t.length+2;15&e;e++)t.push(0);for(t.push(n.floor(e._length/4294967296)),t.push(0|e._length);t.length;)e._block(t.splice(0,16));return e.reset(),r},_init:[1732584193,4023233417,2562383102,271733878,3285377520],_key:[1518500249,1859775393,2400959708,3395469782],_f:(e,t,n,r)=>e>19?e>39?e>59?e>79?void 0:t^n^r:t&n|t&r|n&r:t^n^r:t&n|~t&r,_S:(e,t)=>t<<e|t>>>32-e,_block(t){const r=this,s=r._h,a=e(80);for(let e=0;16>e;e++)a[e]=t[e];let i=s[0],o=s[1],l=s[2],c=s[3],h=s[4];for(let e=0;79>=e;e++){16>e||(a[e]=r._S(1,a[e-3]^a[e-8]^a[e-14]^a[e-16]));const t=r._S(5,i)+r._f(e,o,l,c)+h+a[e]+r._key[n.floor(e/20)]|0;h=c,c=l,l=r._S(30,o),o=i,i=t}s[0]=s[0]+i|0,s[1]=s[1]+o|0,s[2]=s[2]+l|0,s[3]=s[3]+c|0,s[4]=s[4]+h|0}};const T={getRandomValues(e){const t=new i(e.buffer),r=e=>{let t=987654321;const r=4294967295;return()=>(t=36969*(65535&t)+(t>>16)&r,(((t<<16)+(e=18e3*(65535&e)+(e>>16)&r)&r)/4294967296+.5)*(n.random()>.5?1:-1))};for(let s,a=0;a<e.length;a+=4){const e=r(4294967296*(s||n.random()));s=987654071*e(),t[a/4]=4294967296*e()|0}return e}},D={importKey:e=>new D.hmacSha1(k.bytes.toBits(e)),pbkdf2(e,t,n,s){if(n=n||1e4,0>s||0>n)throw new r("invalid params to pbkdf2");const a=1+(s>>5)<<2;let i,o,c,h,f;const u=new ArrayBuffer(a),p=new l(u);let d=0;const g=_;for(t=k.bytes.toBits(t),f=1;(a||1)>d;f++){for(i=o=e.encrypt(g.concat(t,[f])),c=1;n>c;c++)for(o=e.encrypt(o),h=0;h<o.length;h++)i[h]^=o[h];for(c=0;(a||1)>d&&c<i.length;c++)p.setInt32(d,i[c]),d+=4}return u.slice(0,s/8)},hmacSha1:class{constructor(e){const t=this,n=t._hash=S.sha1,r=[[],[]],s=n.prototype.blockSize/32;t._baseHash=[new n,new n],e.length>s&&(e=n.hash(e));for(let t=0;s>t;t++)r[0][t]=909522486^e[t],r[1][t]=1549556828^e[t];t._baseHash[0].update(r[0]),t._baseHash[1].update(r[1]),t._resultHash=new n(t._baseHash[0])}reset(){const e=this;e._resultHash=new e._hash(e._baseHash[0]),e._updated=!1}update(e){this._updated=!0,this._resultHash.update(e)}digest(){const e=this,t=e._resultHash.finalize(),n=new e._hash(e._baseHash[1]).update(t).finalize();return e.reset(),n}encrypt(e){if(this._updated)throw new r("encrypt on already updated hmac called!");return this.update(e),this.digest(e)}}},z="Invalid pasword",R=16,E={name:"PBKDF2"},x=t.assign({hash:{name:"HMAC"}},E),C=t.assign({iterations:1e3,hash:{name:"SHA-1"}},E),I=["deriveBits"],V=[8,12,16],B=[16,24,32],q=10,A=[0,0,0,0],H="undefined",K="function",P=typeof f!=H,W=P&&typeof f.subtle!=H,L=P&&typeof f.getRandomValues==K,M=P&&W&&typeof f.subtle.importKey==K,U=P&&W&&typeof f.subtle.deriveBits==K,F=k.bytes,N=class{constructor(e){const t=this;t._tables=[[[],[],[],[],[]],[[],[],[],[],[]]],t._tables[0][0][0]||t._precompute();const n=t._tables[0][4],s=t._tables[1],a=e.length;let i,o,l,c=1;if(4!==a&&6!==a&&8!==a)throw new r("invalid aes key size");for(t._key=[o=e.slice(0),l=[]],i=a;4*a+28>i;i++){let e=o[i-1];(i%a==0||8===a&&i%a==4)&&(e=n[e>>>24]<<24^n[e>>16&255]<<16^n[e>>8&255]<<8^n[255&e],i%a==0&&(e=e<<8^e>>>24^c<<24,c=c<<1^283*(c>>7))),o[i]=o[i-a]^e}for(let e=0;i;e++,i--){const t=o[3&e?i:i-4];l[e]=4>=i||4>e?t:s[0][n[t>>>24]]^s[1][n[t>>16&255]]^s[2][n[t>>8&255]]^s[3][n[255&t]]}}encrypt(e){return this._crypt(e,0)}decrypt(e){return this._crypt(e,1)}_precompute(){const e=this._tables[0],t=this._tables[1],n=e[4],r=t[4],s=[],a=[];let i,o,l,c;for(let e=0;256>e;e++)a[(s[e]=e<<1^283*(e>>7))^e]=e;for(let h=i=0;!n[h];h^=o||1,i=a[i]||1){let a=i^i<<1^i<<2^i<<3^i<<4;a=a>>8^255&a^99,n[h]=a,r[a]=h,c=s[l=s[o=s[h]]];let f=16843009*c^65537*l^257*o^16843008*h,u=257*s[a]^16843008*a;for(let n=0;4>n;n++)e[n][h]=u=u<<24^u>>>8,t[n][a]=f=f<<24^f>>>8}for(let n=0;5>n;n++)e[n]=e[n].slice(0),t[n]=t[n].slice(0)}_crypt(e,t){if(4!==e.length)throw new r("invalid aes block size");const n=this._key[t],s=n.length/4-2,a=[0,0,0,0],i=this._tables[t],o=i[0],l=i[1],c=i[2],h=i[3],f=i[4];let u,p,d,g=e[0]^n[0],w=e[t?3:1]^n[1],y=e[2]^n[2],v=e[t?1:3]^n[3],m=4;for(let e=0;s>e;e++)u=o[g>>>24]^l[w>>16&255]^c[y>>8&255]^h[255&v]^n[m],p=o[w>>>24]^l[y>>16&255]^c[v>>8&255]^h[255&g]^n[m+1],d=o[y>>>24]^l[v>>16&255]^c[g>>8&255]^h[255&w]^n[m+2],v=o[v>>>24]^l[g>>16&255]^c[w>>8&255]^h[255&y]^n[m+3],m+=4,g=u,w=p,y=d;for(let e=0;4>e;e++)a[t?3&-e:e]=f[g>>>24]<<24^f[w>>16&255]<<16^f[y>>8&255]<<8^f[255&v]^n[m++],u=g,g=w,w=y,y=v,v=u;return a}},O=class{constructor(e,t){this._prf=e,this._initIv=t,this._iv=t}reset(){this._iv=this._initIv}update(e){return this.calculate(this._prf,e,this._iv)}incWord(e){if(255==(e>>24&255)){let t=e>>16&255,n=e>>8&255,r=255&e;255===t?(t=0,255===n?(n=0,255===r?r=0:++r):++n):++t,e=0,e+=t<<16,e+=n<<8,e+=r}else e+=1<<24;return e}incCounter(e){0===(e[0]=this.incWord(e[0]))&&(e[1]=this.incWord(e[1]))}calculate(e,t,n){let r;if(!(r=t.length))return[];const s=_.bitLength(t);for(let s=0;r>s;s+=4){this.incCounter(n);const r=e.encrypt(n);t[s]^=r[0],t[s+1]^=r[1],t[s+2]^=r[2],t[s+3]^=r[3]}return _.clamp(t,s)}},j=D.hmacSha1;class Y extends p{constructor(n,a,i){let o;super({start(){t.assign(this,{ready:new c((e=>this.resolveReady=e)),password:n,signed:a,strength:i-1,pending:new s})},async transform(t,n){const a=this;if(a.password){const n=a.password;a.password=null;const s=Z(t,0,V[a.strength]+2);await(async(e,t,n)=>{await J(e,n,Z(t,0,V[e.strength]));const s=Z(t,V[e.strength]),a=e.keys.passwordVerification;if(a[0]!=s[0]||a[1]!=s[1])throw new r(z)})(a,s,n),a.ctr=new O(new N(a.keys.key),e.from(A)),a.hmac=new j(a.keys.authentication),t=Z(t,V[a.strength]+2),a.resolveReady()}else await a.ready;const i=new s(t.length-q-(t.length-q)%R);n.enqueue(X(a,t,i,0,q,!0))},async flush(e){const t=this;await t.ready;const n=t.pending,r=Z(n,0,n.length-q),a=Z(n,n.length-q);let i=new s;if(r.length){const e=ee(F,r);t.hmac.update(e);const n=t.ctr.update(e);i=$(F,n)}if(o.valid=!0,t.signed){const e=Z($(F,t.hmac.digest()),0,q);for(let t=0;q>t;t++)e[t]!=a[t]&&(o.valid=!1)}e.enqueue(i)}}),o=this}}class G extends p{constructor(n,r){let a;super({start(){t.assign(this,{ready:new c((e=>this.resolveReady=e)),password:n,strength:r-1,pending:new s})},async transform(t,n){const r=this;let a=new s;if(r.password){const t=r.password;r.password=null,a=await(async(e,t)=>{const n=(r=new s(V[e.strength]),L?f.getRandomValues(r):T.getRandomValues(r));var r;return await J(e,t,n),Q(n,e.keys.passwordVerification)})(r,t),r.ctr=new O(new N(r.keys.key),e.from(A)),r.hmac=new j(r.keys.authentication),r.resolveReady()}else await r.ready;const i=new s(a.length+t.length-t.length%R);i.set(a,0),n.enqueue(X(r,t,i,a.length,0))},async flush(e){const t=this;await t.ready;let n=new s;if(t.pending.length){const e=t.ctr.update(ee(F,t.pending));t.hmac.update(e),n=$(F,e)}a.signature=$(F,t.hmac.digest()).slice(0,q),e.enqueue(Q(n,a.signature))}}),a=this}}function X(e,t,n,r,a,i){const o=t.length-a;let l;for(e.pending.length&&(t=Q(e.pending,t),n=((e,t)=>{if(t&&t>e.length){const n=e;(e=new s(t)).set(n,0)}return e})(n,o-o%R)),l=0;o-R>=l;l+=R){const s=ee(F,Z(t,l,l+R));i&&e.hmac.update(s);const a=e.ctr.update(s);i||e.hmac.update(a),n.set($(F,a),l+r)}return e.pending=Z(t,l),n}async function J(e,n,r){const a=(e=>{if(void 0===h){const t=new s((e=unescape(encodeURIComponent(e))).length);for(let n=0;n<t.length;n++)t[n]=e.charCodeAt(n);return t}return(new h).encode(e)})(n),i=await((e,t,n,r,s)=>M?f.subtle.importKey("raw",t,n,!1,s):D.importKey(t))(0,a,x,0,I),o=await(async(e,t,n)=>U?await f.subtle.deriveBits(e,t,n):D.pbkdf2(t,e.salt,C.iterations,n))(t.assign({salt:r},C),i,8*(2*B[e.strength]+2)),l=new s(o);e.keys={key:ee(F,Z(l,0,B[e.strength])),authentication:ee(F,Z(l,B[e.strength],2*B[e.strength])),passwordVerification:Z(l,2*B[e.strength])}}function Q(e,t){let n=e;return e.length+t.length&&(n=new s(e.length+t.length),n.set(e,0),n.set(t,e.length)),n}function Z(e,t,n){return e.subarray(t,n)}function $(e,t){return e.fromBits(t)}function ee(e,t){return e.toBits(t)}class te extends p{constructor(e,n){let s;super({start(){t.assign(this,{password:e,passwordVerification:n}),ae(this,e)},transform(e,t){const n=this;if(n.password){const t=re(n,e.subarray(0,12));if(n.password=null,t[11]!=n.passwordVerification)throw new r(z);e=e.subarray(12)}t.enqueue(re(n,e))},flush(){s.valid=!0}}),s=this}}class ne extends p{constructor(e,n){super({start(){t.assign(this,{password:e,passwordVerification:n}),ae(this,e)},transform(e,t){const n=this;let r,a;if(n.password){n.password=null;const t=f.getRandomValues(new s(12));t[11]=n.passwordVerification,r=new s(e.length+t.length),r.set(se(n,t),0),a=12}else r=new s(e.length),a=0;r.set(se(n,e),a),t.enqueue(r)},flush(){}})}}function re(e,t){const n=new s(t.length);for(let r=0;r<t.length;r++)n[r]=oe(e)^t[r],ie(e,n[r]);return n}function se(e,t){const n=new s(t.length);for(let r=0;r<t.length;r++)n[r]=oe(e)^t[r],ie(e,t[r]);return n}function ae(e,t){e.keys=[305419896,591751049,878082192],e.crcKey0=new m(e.keys[0]),e.crcKey2=new m(e.keys[2]);for(let n=0;n<t.length;n++)ie(e,t.charCodeAt(n))}function ie(e,t){e.crcKey0.append([t]),e.keys[0]=~e.crcKey0.get(),e.keys[1]=ce(e.keys[1]+le(e.keys[0])),e.keys[1]=ce(n.imul(e.keys[1],134775813)+1),e.crcKey2.append([e.keys[1]>>>24]),e.keys[2]=~e.crcKey2.get()}function oe(e){const t=2|e.keys[2];return le(n.imul(t,1^t)>>>8)}function le(e){return 255&e}function ce(e){return 4294967295&e}class he extends p{constructor(e,t){let n;super({start(){n=new e(t)},transform(e,t){e=n.append(e),t.enqueue(e)},flush(e){const t=n.flush();t&&e.enqueue(t)}})}}const fe="Invalid signature",ue="deflate-raw",pe="undefined",de=typeof w==pe,ge=typeof y==pe;let we=!0,ye=!0;class ve extends p{constructor(e,t,{chunkSize:n},...r){super({},...r);const{compressed:s,encrypted:a,useCompressionStream:i,password:o,passwordVerification:c,encryptionStrength:h,zipCrypto:f,signed:u}=t,p=this;let d,g,y=_e(super.readable);if(a&&!f||!u||([y,d]=y.tee(),d=d.pipeThrough(new b)),s)if(void 0!==i&&!i||de&&!ye)y=be(e,y,n);else try{y=y.pipeThrough(new w(ue))}catch(t){ye=!1,y=be(e,y,n)}a&&(f?y=y.pipeThrough(new ne(o,c)):(g=new G(o,h),y=y.pipeThrough(g))),ke(p,y,(async()=>{let e;a&&!f&&(e=g.signature),a&&!f||!u||(e=await d.getReader().read(),e=new l(e.value.buffer).getUint32(0)),p.signature=e}))}}class me extends p{constructor(e,t,{chunkSize:n},...s){super({},...s);const{zipCrypto:a,encrypted:i,password:o,passwordVerification:c,signed:h,encryptionStrength:f,compressed:u,useCompressionStream:p}=t;let d,g,w=_e(super.readable);if(i&&(a?w=w.pipeThrough(new te(o,c)):(g=new Y(o,h,f),w=w.pipeThrough(g))),u)if(void 0!==p&&!p||ge&&!we)w=be(e,w,n);else try{w=w.pipeThrough(new y(ue))}catch(t){we=!1,w=be(e,w,n)}i&&!a||!h||([w,d]=w.tee(),d=d.pipeThrough(new b)),ke(this,w,(async()=>{if(i&&!a&&!g.valid)throw new r(fe);if((!i||a)&&h){const e=await d.getReader().read();if(e!=new l(e.value.buffer).getUint32(0,!1))throw new r(fe)}}))}}function be(e,t,n){return t.pipeThrough(new he(e,{chunkSize:n}))}function _e(e){return e.pipeThrough(new p({transform(e,t){e&&e.length&&t.enqueue(e)}}))}function ke(e,n,r){e.length=0,n=n.pipeThrough(new p({transform(t,n){t&&t.length&&(e.length+=t.length,n.enqueue(t))},flush:r})),t.defineProperty(e,"readable",{get:()=>n})}const Se="deflate",Te="inflate",De="data";class ze{constructor(e,t,n,r,s){const{codecType:a}=r;async function i(a){const i=new a(e,r,s);await t.pipeThrough(i).pipeTo(n,{preventClose:!0});const{length:o,signature:l}=i;return{length:o,signature:l}}a.startsWith(Se)?this.run=()=>i(ve):a.startsWith(Te)&&(this.run=()=>i(me))}}const Re=new Map;let Ee,xe=0;async function Ce(e){try{const{options:t,scripts:n,config:r}=e,{codecType:s}=t;let a;n&&n.length&&importScripts.apply(void 0,n),self.initCodec&&self.initCodec(),s.startsWith(Se)?a=self.Deflate:s.startsWith(Te)&&(a=self.Inflate);const i={highWaterMark:1,size:()=>r.chunkSize},o=new d({async pull(e){let t=new c(((e,t)=>Re.set(xe,{resolve:e,reject:t})));Ie({type:"pull",messageId:xe}),xe=(xe+1)%Number.MAX_SAFE_INTEGER;const{value:n,done:r}=await t;e.enqueue(n),r&&e.close()}},i),l=new g({write(e){Ie({type:De,data:e})}},i);Ee=new ze(a,o,l,t,r),Ie({type:"close",result:await Ee.run()})}catch(e){const{message:t,stack:n}=e;u({error:{message:t,stack:n}})}}function Ie(e){if(e.data){let{data:t}=e;if(t&&t.length)try{t.length!=t.buffer.byteLength&&(t=new s(t)),e.data=t.buffer,u(e,[e.data])}catch(t){u(e)}else u(e)}else u(e)}addEventListener("message",(async e=>{const t=e.data,{type:n,messageId:r,data:a,done:i}=t;try{if("start"==n&&Ce(t),n==De){const{resolve:e}=Re.get(r);Re.delete(r),e({value:new s(a),done:i})}}catch(e){u({error:{message:e.message,stack:e.stack}})}}));var Ve=s,Be=a,qe=i,Ae=new Ve([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),He=new Ve([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),Ke=new Ve([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),Pe=(e,t)=>{for(var n=new Be(31),r=0;31>r;++r)n[r]=t+=1<<e[r-1];var s=new qe(n[30]);for(r=1;30>r;++r)for(var a=n[r];a<n[r+1];++a)s[a]=a-n[r]<<5|r;return[n,s]},We=Pe(Ae,2),Le=We[0],Me=We[1];Le[28]=258,Me[258]=28;for(var Ue=Pe(He,0),Fe=Ue[0],Ne=Ue[1],Oe=new Be(32768),je=0;32768>je;++je){var Ye=(43690&je)>>>1|(21845&je)<<1;Ye=(61680&(Ye=(52428&Ye)>>>2|(13107&Ye)<<2))>>>4|(3855&Ye)<<4,Oe[je]=((65280&Ye)>>>8|(255&Ye)<<8)>>>1}var Ge=(e,t,n)=>{for(var r=e.length,s=0,a=new Be(t);r>s;++s)e[s]&&++a[e[s]-1];var i,o=new Be(t);for(s=0;t>s;++s)o[s]=o[s-1]+a[s-1]<<1;if(n){i=new Be(1<<t);var l=15-t;for(s=0;r>s;++s)if(e[s])for(var c=s<<4|e[s],h=t-e[s],f=o[e[s]-1]++<<h,u=f|(1<<h)-1;u>=f;++f)i[Oe[f]>>>l]=c}else for(i=new Be(r),s=0;r>s;++s)e[s]&&(i[s]=Oe[o[e[s]-1]++]>>>15-e[s]);return i},Xe=new Ve(288);for(je=0;144>je;++je)Xe[je]=8;for(je=144;256>je;++je)Xe[je]=9;for(je=256;280>je;++je)Xe[je]=7;for(je=280;288>je;++je)Xe[je]=8;var Je=new Ve(32);for(je=0;32>je;++je)Je[je]=5;var Qe=Ge(Xe,9,0),Ze=Ge(Xe,9,1),$e=Ge(Je,5,0),et=Ge(Je,5,1),tt=e=>{for(var t=e[0],n=1;n<e.length;++n)e[n]>t&&(t=e[n]);return t},nt=(e,t,n)=>{var r=t/8|0;return(e[r]|e[r+1]<<8)>>(7&t)&n},rt=(e,t)=>{var n=t/8|0;return(e[n]|e[n+1]<<8|e[n+2]<<16)>>(7&t)},st=e=>(e+7)/8|0,at=(e,t,n)=>{(null==t||0>t)&&(t=0),(null==n||n>e.length)&&(n=e.length);var r=new(2==e.BYTES_PER_ELEMENT?Be:4==e.BYTES_PER_ELEMENT?qe:Ve)(n-t);return r.set(e.subarray(t,n)),r},it=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],ot=(e,t,n)=>{var s=new r(t||it[e]);if(s.code=e,r.captureStackTrace&&r.captureStackTrace(s,ot),!n)throw s;return s},lt=(e,t,n)=>{n<<=7&t;var r=t/8|0;e[r]|=n,e[r+1]|=n>>>8},ct=(e,t,n)=>{n<<=7&t;var r=t/8|0;e[r]|=n,e[r+1]|=n>>>8,e[r+2]|=n>>>16},ht=(e,t)=>{for(var n=[],r=0;r<e.length;++r)e[r]&&n.push({s:r,f:e[r]});var s=n.length,a=n.slice();if(!s)return[yt,0];if(1==s){var i=new Ve(n[0].s+1);return i[n[0].s]=1,[i,1]}n.sort(((e,t)=>e.f-t.f)),n.push({s:-1,f:25001});var o=n[0],l=n[1],c=0,h=1,f=2;for(n[0]={s:-1,f:o.f+l.f,l:o,r:l};h!=s-1;)o=n[n[c].f<n[f].f?c++:f++],l=n[c!=h&&n[c].f<n[f].f?c++:f++],n[h++]={s:-1,f:o.f+l.f,l:o,r:l};var u=a[0].s;for(r=1;s>r;++r)a[r].s>u&&(u=a[r].s);var p=new Be(u+1),d=ft(n[h-1],p,0);if(d>t){r=0;var g=0,w=d-t,y=1<<w;for(a.sort(((e,t)=>p[t.s]-p[e.s]||e.f-t.f));s>r;++r){var v=a[r].s;if(p[v]<=t)break;g+=y-(1<<d-p[v]),p[v]=t}for(g>>>=w;g>0;){var m=a[r].s;p[m]<t?g-=1<<t-p[m]++-1:++r}for(;r>=0&&g;--r){var b=a[r].s;p[b]==t&&(--p[b],++g)}d=t}return[new Ve(p),d]},ft=(e,t,r)=>-1==e.s?n.max(ft(e.l,t,r+1),ft(e.r,t,r+1)):t[e.s]=r,ut=e=>{for(var t=e.length;t&&!e[--t];);for(var n=new Be(++t),r=0,s=e[0],a=1,i=e=>{n[r++]=e},o=1;t>=o;++o)if(e[o]==s&&o!=t)++a;else{if(!s&&a>2){for(;a>138;a-=138)i(32754);a>2&&(i(a>10?a-11<<5|28690:a-3<<5|12305),a=0)}else if(a>3){for(i(s),--a;a>6;a-=6)i(8304);a>2&&(i(a-3<<5|8208),a=0)}for(;a--;)i(s);a=1,s=e[o]}return[n.subarray(0,r),t]},pt=(e,t)=>{for(var n=0,r=0;r<t.length;++r)n+=e[r]*t[r];return n},dt=(e,t,n)=>{var r=n.length,s=st(t+2);e[s]=255&r,e[s+1]=r>>>8,e[s+2]=255^e[s],e[s+3]=255^e[s+1];for(var a=0;r>a;++a)e[s+a+4]=n[a];return 8*(s+4+r)},gt=(e,t,n,r,s,a,i,o,l,c,h)=>{lt(t,h++,n),++s[256];for(var f=ht(s,15),u=f[0],p=f[1],d=ht(a,15),g=d[0],w=d[1],y=ut(u),v=y[0],m=y[1],b=ut(g),_=b[0],k=b[1],S=new Be(19),T=0;T<v.length;++T)S[31&v[T]]++;for(T=0;T<_.length;++T)S[31&_[T]]++;for(var D=ht(S,7),z=D[0],R=D[1],E=19;E>4&&!z[Ke[E-1]];--E);var x,C,I,V,B=c+5<<3,q=pt(s,Xe)+pt(a,Je)+i,A=pt(s,u)+pt(a,g)+i+14+3*E+pt(S,z)+(2*S[16]+3*S[17]+7*S[18]);if(q>=B&&A>=B)return dt(t,h,e.subarray(l,l+c));if(lt(t,h,1+(q>A)),h+=2,q>A){x=Ge(u,p,0),C=u,I=Ge(g,w,0),V=g;var H=Ge(z,R,0);for(lt(t,h,m-257),lt(t,h+5,k-1),lt(t,h+10,E-4),h+=14,T=0;E>T;++T)lt(t,h+3*T,z[Ke[T]]);h+=3*E;for(var K=[v,_],P=0;2>P;++P){var W=K[P];for(T=0;T<W.length;++T){var L=31&W[T];lt(t,h,H[L]),h+=z[L],L>15&&(lt(t,h,W[T]>>>5&127),h+=W[T]>>>12)}}}else x=Qe,C=Xe,I=$e,V=Je;for(T=0;o>T;++T)if(r[T]>255){L=r[T]>>>18&31,ct(t,h,x[L+257]),h+=C[L+257],L>7&&(lt(t,h,r[T]>>>23&31),h+=Ae[L]);var M=31&r[T];ct(t,h,I[M]),h+=V[M],M>3&&(ct(t,h,r[T]>>>5&8191),h+=He[M])}else ct(t,h,x[r[T]]),h+=C[r[T]];return ct(t,h,x[256]),h+C[256]},wt=new qe([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),yt=new Ve(0),vt=function(){function e(e,t){t||"function"!=typeof e||(t=e,e={}),this.ondata=t,this.o=e||{}}return e.prototype.p=function(e,t){var r,s,a;this.ondata((a=!t,((e,t,r,s,a,i)=>{var o=e.length,l=new Ve(0+o+5*(1+n.ceil(o/7e3))+0),c=l.subarray(0,l.length-0),h=0;if(!t||8>o)for(var f=0;o>=f;f+=65535){var u=f+65535;o>u||(c[h>>3]=i),h=dt(c,h+1,e.subarray(f,u))}else{for(var p=wt[t-1],d=p>>>13,g=8191&p,w=(1<<r)-1,y=new Be(32768),v=new Be(w+1),m=n.ceil(r/3),b=2*m,_=t=>(e[t]^e[t+1]<<m^e[t+2]<<b)&w,k=new qe(25e3),S=new Be(288),T=new Be(32),D=0,z=0,R=(f=0,0),E=0,x=0;o>f;++f){var C=_(f),I=32767&f,V=v[C];if(y[I]=V,v[C]=I,f>=E){var B=o-f;if((D>7e3||R>24576)&&B>423){h=gt(e,c,0,k,S,T,z,R,x,f-x,h),R=D=z=0,x=f;for(var q=0;286>q;++q)S[q]=0;for(q=0;30>q;++q)T[q]=0}var A=2,H=0,K=g,P=I-V&32767;if(B>2&&C==_(f-P))for(var W=n.min(d,B)-1,L=n.min(32767,f),M=n.min(258,B);L>=P&&--K&&I!=V;){if(e[f+A]==e[f+A-P]){for(var U=0;M>U&&e[f+U]==e[f+U-P];++U);if(U>A){if(A=U,H=P,U>W)break;var F=n.min(P,U-2),N=0;for(q=0;F>q;++q){var O=f-P+q+32768&32767,j=O-y[O]+32768&32767;j>N&&(N=j,V=O)}}}P+=(I=V)-(V=y[I])+32768&32767}if(H){k[R++]=268435456|Me[A]<<18|Ne[H];var Y=31&Me[A],G=31&Ne[H];z+=Ae[Y]+He[G],++S[257+Y],++T[G],E=f+A,++D}else k[R++]=e[f],++S[e[f]]}}h=gt(e,c,i,k,S,T,z,R,x,f-x,h),!i&&7&h&&(h=dt(c,h+1,yt))}return at(l,0,0+st(h)+0)})(r=e,null==(s=this.o).level?6:s.level,null==s.mem?n.ceil(1.5*n.max(8,n.min(13,n.log(r.length)))):12+s.mem,0,0,!a)),t)},e.prototype.push=function(e,t){this.ondata||ot(5),this.d&&ot(4),this.d=t,this.p(e,t||!1)},e}(),mt=function(){function e(e){this.s={},this.p=new Ve(0),this.ondata=e}return e.prototype.e=function(e){this.ondata||ot(5),this.d&&ot(4);var t=this.p.length,n=new Ve(t+e.length);n.set(this.p),n.set(e,t),this.p=n},e.prototype.c=function(e){this.d=this.s.i=e||!1;var t=this.s.b,r=((e,t,r)=>{var s=e.length;if(!s||r&&r.f&&!r.l)return t||new Ve(0);var a=!t||r,i=!r||r.i;r||(r={}),t||(t=new Ve(3*s));var o=e=>{var r=t.length;if(e>r){var s=new Ve(n.max(2*r,e));s.set(t),t=s}},l=r.f||0,c=r.p||0,h=r.b||0,f=r.l,u=r.d,p=r.m,d=r.n,g=8*s;do{if(!f){l=nt(e,c,1);var w=nt(e,c+1,3);if(c+=3,!w){var y=e[(E=st(c)+4)-4]|e[E-3]<<8,v=E+y;if(v>s){i&&ot(0);break}a&&o(h+y),t.set(e.subarray(E,v),h),r.b=h+=y,r.p=c=8*v,r.f=l;continue}if(1==w)f=Ze,u=et,p=9,d=5;else if(2==w){var m=nt(e,c,31)+257,b=nt(e,c+10,15)+4,_=m+nt(e,c+5,31)+1;c+=14;for(var k=new Ve(_),S=new Ve(19),T=0;b>T;++T)S[Ke[T]]=nt(e,c+3*T,7);c+=3*b;var D=tt(S),z=(1<<D)-1,R=Ge(S,D,1);for(T=0;_>T;){var E,x=R[nt(e,c,z)];if(c+=15&x,16>(E=x>>>4))k[T++]=E;else{var C=0,I=0;for(16==E?(I=3+nt(e,c,3),c+=2,C=k[T-1]):17==E?(I=3+nt(e,c,7),c+=3):18==E&&(I=11+nt(e,c,127),c+=7);I--;)k[T++]=C}}var V=k.subarray(0,m),B=k.subarray(m);p=tt(V),d=tt(B),f=Ge(V,p,1),u=Ge(B,d,1)}else ot(1);if(c>g){i&&ot(0);break}}a&&o(h+131072);for(var q=(1<<p)-1,A=(1<<d)-1,H=c;;H=c){var K=(C=f[rt(e,c)&q])>>>4;if((c+=15&C)>g){i&&ot(0);break}if(C||ot(2),256>K)t[h++]=K;else{if(256==K){H=c,f=null;break}var P=K-254;if(K>264){var W=Ae[T=K-257];P=nt(e,c,(1<<W)-1)+Le[T],c+=W}var L=u[rt(e,c)&A],M=L>>>4;if(L||ot(3),c+=15&L,B=Fe[M],M>3&&(W=He[M],B+=rt(e,c)&(1<<W)-1,c+=W),c>g){i&&ot(0);break}a&&o(h+131072);for(var U=h+P;U>h;h+=4)t[h]=t[h-B],t[h+1]=t[h+1-B],t[h+2]=t[h+2-B],t[h+3]=t[h+3-B];h=U}}r.l=f,r.p=H,r.b=h,r.f=l,f&&(l=1,r.m=p,r.d=u,r.n=d)}while(!l);return h==t.length?t:at(t,0,h)})(this.p,this.o,this.s);this.ondata(at(r,t,this.s.b),this.d),this.o=at(r,this.s.b-32768),this.s.b=this.o.length,this.p=at(this.p,this.s.p/8|0),this.s.p&=7},e.prototype.push=function(e,t){this.e(e),this.c(t)},e}(),bt="undefined"!=typeof TextDecoder&&new TextDecoder;try{bt.decode(yt,{stream:!0})}catch(e){}function _t(e,n,r){return class{constructor(a){const i=this;a.hasOwnProperty("level")&&void 0===a.level&&delete a.level,i.codec=new e(t.assign({},n,a)),r(i.codec,(e=>{if(i.pendingData){const{pendingData:t}=i;i.pendingData=new s(t.length+e.length),i.pendingData.set(t,0),i.pendingData.set(e,t.length)}else i.pendingData=new s(e)}))}append(e){return this.codec.push(e),a(this)}flush(){return this.codec.push(new s,!0),a(this)}};function a(e){if(e.pendingData){const t=e.pendingData;return e.pendingData=null,t}return new s}}const{Deflate:kt,Inflate:St}=((e,t={},n)=>({Deflate:_t(e.Deflate,t.deflate,n),Inflate:_t(e.Inflate,t.inflate,n)}))({Deflate:vt,Inflate:mt},void 0,((e,t)=>e.ondata=t));self.initCodec=()=>{self.Deflate=kt,self.Inflate=St}}();
