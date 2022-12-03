!function(){"use strict";const{Array:e,Object:t,Math:n,Error:r,Uint8Array:s,Uint16Array:a,Uint32Array:i,Int32Array:o,DataView:l,Promise:c,TextEncoder:f,crypto:h,postMessage:u,TransformStream:p,ReadableStream:d,WritableStream:g,CompressionStream:w,DecompressionStream:v}=globalThis;class y{constructor(e){return class extends p{constructor(t,n){const r=new e(n);super({transform(e,t){t.enqueue(r.append(e))},flush(e){const t=r.flush();t&&e.enqueue(t)}})}}}}const m=[];for(let e=0;256>e;e++){let t=e;for(let e=0;8>e;e++)1&t?t=t>>>1^3988292384:t>>>=1;m[e]=t}class b{constructor(e){this.crc=e||-1}append(e){let t=0|this.crc;for(let n=0,r=0|e.length;r>n;n++)t=t>>>8^m[255&(t^e[n])];this.crc=t}get(){return~this.crc}}class _ extends p{constructor(){const e=new b;super({transform(t){e.append(t)},flush(t){const n=new s(4);new l(n.buffer).setUint32(0,e.get()),t.enqueue(n)}})}}const S={concat(e,t){if(0===e.length||0===t.length)return e.concat(t);const n=e[e.length-1],r=S.getPartial(n);return 32===r?e.concat(t):S._shiftRight(t,r,0|n,e.slice(0,e.length-1))},bitLength(e){const t=e.length;if(0===t)return 0;const n=e[t-1];return 32*(t-1)+S.getPartial(n)},clamp(e,t){if(32*e.length<t)return e;const r=(e=e.slice(0,n.ceil(t/32))).length;return t&=31,r>0&&t&&(e[r-1]=S.partial(t,e[r-1]&2147483648>>t-1,1)),e},partial:(e,t,n)=>32===e?t:(n?0|t:t<<32-e)+1099511627776*e,getPartial:e=>n.round(e/1099511627776)||32,_shiftRight(e,t,n,r){for(void 0===r&&(r=[]);t>=32;t-=32)r.push(n),n=0;if(0===t)return r.concat(e);for(let s=0;s<e.length;s++)r.push(n|e[s]>>>t),n=e[s]<<32-t;const s=e.length?e[e.length-1]:0,a=S.getPartial(s);return r.push(S.partial(t+a&31,t+a>32?n:r.pop(),1)),r}},k={bytes:{fromBits(e){const t=S.bitLength(e)/8,n=new s(t);let r;for(let s=0;t>s;s++)0==(3&s)&&(r=e[s/4]),n[s]=r>>>24,r<<=8;return n},toBits(e){const t=[];let n,r=0;for(n=0;n<e.length;n++)r=r<<8|e[n],3==(3&n)&&(t.push(r),r=0);return 3&n&&t.push(S.partial(8*(3&n),r)),t}}},D={getRandomValues(e){const t=new i(e.buffer),r=e=>{let t=987654321;const r=4294967295;return()=>(t=36969*(65535&t)+(t>>16)&r,(((t<<16)+(e=18e3*(65535&e)+(e>>16)&r)&r)/4294967296+.5)*(n.random()>.5?1:-1))};for(let s,a=0;a<e.length;a+=4){const e=r(4294967296*(s||n.random()));s=987654071*e(),t[a/4]=4294967296*e()|0}return e}},z={importKey:e=>new z.hmacSha1(k.bytes.toBits(e)),pbkdf2(e,t,n,s){if(n=n||1e4,0>s||0>n)throw new r("invalid params to pbkdf2");const a=1+(s>>5)<<2;let i,o,c,f,h;const u=new ArrayBuffer(a),p=new l(u);let d=0;const g=S;for(t=k.bytes.toBits(t),h=1;(a||1)>d;h++){for(i=o=e.encrypt(g.concat(t,[h])),c=1;n>c;c++)for(o=e.encrypt(o),f=0;f<o.length;f++)i[f]^=o[f];for(c=0;(a||1)>d&&c<i.length;c++)p.setInt32(d,i[c]),d+=4}return u.slice(0,s/8)},hmacSha1:class{constructor(t){const s=this,a=s._hash=class{constructor(e){const t=this;t.blockSize=512,t._init=[1732584193,4023233417,2562383102,271733878,3285377520],t._key=[1518500249,1859775393,2400959708,3395469782],e?(t._h=e._h.slice(0),t._buffer=e._buffer.slice(0),t._length=e._length):t.reset()}reset(){const e=this;return e._h=e._init.slice(0),e._buffer=[],e._length=0,e}update(e){const t=this;"string"==typeof e&&(e=k.utf8String.toBits(e));const n=t._buffer=S.concat(t._buffer,e),s=t._length,a=t._length=s+S.bitLength(e);if(a>9007199254740991)throw new r("Cannot hash more than 2^53 - 1 bits");const o=new i(n);let l=0;for(let e=t.blockSize+s-(t.blockSize+s&t.blockSize-1);a>=e;e+=t.blockSize)t._block(o.subarray(16*l,16*(l+1))),l+=1;return n.splice(0,16*l),t}finalize(){const e=this;let t=e._buffer;const r=e._h;t=S.concat(t,[S.partial(1,1)]);for(let e=t.length+2;15&e;e++)t.push(0);for(t.push(n.floor(e._length/4294967296)),t.push(0|e._length);t.length;)e._block(t.splice(0,16));return e.reset(),r}_f(e,t,n,r){return e>19?e>39?e>59?e>79?void 0:t^n^r:t&n|t&r|n&r:t^n^r:t&n|~t&r}_S(e,t){return t<<e|t>>>32-e}_block(t){const r=this,s=r._h,a=e(80);for(let e=0;16>e;e++)a[e]=t[e];let i=s[0],o=s[1],l=s[2],c=s[3],f=s[4];for(let e=0;79>=e;e++){16>e||(a[e]=r._S(1,a[e-3]^a[e-8]^a[e-14]^a[e-16]));const t=r._S(5,i)+r._f(e,o,l,c)+f+a[e]+r._key[n.floor(e/20)]|0;f=c,c=l,l=r._S(30,o),o=i,i=t}s[0]=s[0]+i|0,s[1]=s[1]+o|0,s[2]=s[2]+l|0,s[3]=s[3]+c|0,s[4]=s[4]+f|0}},o=[[],[]];s._baseHash=[new a,new a];const l=s._baseHash[0].blockSize/32;t.length>l&&(t=a.hash(t));for(let e=0;l>e;e++)o[0][e]=909522486^t[e],o[1][e]=1549556828^t[e];s._baseHash[0].update(o[0]),s._baseHash[1].update(o[1]),s._resultHash=new a(s._baseHash[0])}reset(){const e=this;e._resultHash=new e._hash(e._baseHash[0]),e._updated=!1}update(e){this._updated=!0,this._resultHash.update(e)}digest(){const e=this,t=e._resultHash.finalize(),n=new e._hash(e._baseHash[1]).update(t).finalize();return e.reset(),n}encrypt(e){if(this._updated)throw new r("encrypt on already updated hmac called!");return this.update(e),this.digest(e)}}},C=void 0!==h&&"function"==typeof h.getRandomValues,E="Invalid password",T="Invalid signature";function I(e){return C?h.getRandomValues(e):D.getRandomValues(e)}const R=16,x={name:"PBKDF2"},A=t.assign({hash:{name:"HMAC"}},x),B=t.assign({iterations:1e3,hash:{name:"SHA-1"}},x),H=["deriveBits"],q=[8,12,16],K=[16,24,32],V=10,M=[0,0,0,0],N="undefined",P="function",U=typeof h!=N,L=U&&h.subtle,W=U&&typeof L!=N,F=k.bytes,O=class{constructor(e){const t=this;t._tables=[[[],[],[],[],[]],[[],[],[],[],[]]],t._tables[0][0][0]||t._precompute();const n=t._tables[0][4],s=t._tables[1],a=e.length;let i,o,l,c=1;if(4!==a&&6!==a&&8!==a)throw new r("invalid aes key size");for(t._key=[o=e.slice(0),l=[]],i=a;4*a+28>i;i++){let e=o[i-1];(i%a==0||8===a&&i%a==4)&&(e=n[e>>>24]<<24^n[e>>16&255]<<16^n[e>>8&255]<<8^n[255&e],i%a==0&&(e=e<<8^e>>>24^c<<24,c=c<<1^283*(c>>7))),o[i]=o[i-a]^e}for(let e=0;i;e++,i--){const t=o[3&e?i:i-4];l[e]=4>=i||4>e?t:s[0][n[t>>>24]]^s[1][n[t>>16&255]]^s[2][n[t>>8&255]]^s[3][n[255&t]]}}encrypt(e){return this._crypt(e,0)}decrypt(e){return this._crypt(e,1)}_precompute(){const e=this._tables[0],t=this._tables[1],n=e[4],r=t[4],s=[],a=[];let i,o,l,c;for(let e=0;256>e;e++)a[(s[e]=e<<1^283*(e>>7))^e]=e;for(let f=i=0;!n[f];f^=o||1,i=a[i]||1){let a=i^i<<1^i<<2^i<<3^i<<4;a=a>>8^255&a^99,n[f]=a,r[a]=f,c=s[l=s[o=s[f]]];let h=16843009*c^65537*l^257*o^16843008*f,u=257*s[a]^16843008*a;for(let n=0;4>n;n++)e[n][f]=u=u<<24^u>>>8,t[n][a]=h=h<<24^h>>>8}for(let n=0;5>n;n++)e[n]=e[n].slice(0),t[n]=t[n].slice(0)}_crypt(e,t){if(4!==e.length)throw new r("invalid aes block size");const n=this._key[t],s=n.length/4-2,a=[0,0,0,0],i=this._tables[t],o=i[0],l=i[1],c=i[2],f=i[3],h=i[4];let u,p,d,g=e[0]^n[0],w=e[t?3:1]^n[1],v=e[2]^n[2],y=e[t?1:3]^n[3],m=4;for(let e=0;s>e;e++)u=o[g>>>24]^l[w>>16&255]^c[v>>8&255]^f[255&y]^n[m],p=o[w>>>24]^l[v>>16&255]^c[y>>8&255]^f[255&g]^n[m+1],d=o[v>>>24]^l[y>>16&255]^c[g>>8&255]^f[255&w]^n[m+2],y=o[y>>>24]^l[g>>16&255]^c[w>>8&255]^f[255&v]^n[m+3],m+=4,g=u,w=p,v=d;for(let e=0;4>e;e++)a[t?3&-e:e]=h[g>>>24]<<24^h[w>>16&255]<<16^h[v>>8&255]<<8^h[255&y]^n[m++],u=g,g=w,w=v,v=y,y=u;return a}},G=class{constructor(e,t){this._prf=e,this._initIv=t,this._iv=t}reset(){this._iv=this._initIv}update(e){return this.calculate(this._prf,e,this._iv)}incWord(e){if(255==(e>>24&255)){let t=e>>16&255,n=e>>8&255,r=255&e;255===t?(t=0,255===n?(n=0,255===r?r=0:++r):++n):++t,e=0,e+=t<<16,e+=n<<8,e+=r}else e+=1<<24;return e}incCounter(e){0===(e[0]=this.incWord(e[0]))&&(e[1]=this.incWord(e[1]))}calculate(e,t,n){let r;if(!(r=t.length))return[];const s=S.bitLength(t);for(let s=0;r>s;s+=4){this.incCounter(n);const r=e.encrypt(n);t[s]^=r[0],t[s+1]^=r[1],t[s+2]^=r[2],t[s+3]^=r[3]}return S.clamp(t,s)}},X=z.hmacSha1;let Y=U&&W&&typeof L.importKey==P,j=U&&W&&typeof L.deriveBits==P;class J extends p{constructor({password:e,signed:n,encryptionStrength:a}){super({start(){t.assign(this,{ready:new c((e=>this.resolveReady=e)),password:e,signed:n,strength:a-1,pending:new s})},async transform(e,t){const n=this,{password:a,strength:i,resolveReady:o,ready:l}=n;a?(await(async(e,t,n,s)=>{const a=await $(e,t,n,te(s,0,q[t])),i=te(s,q[t]);if(a[0]!=i[0]||a[1]!=i[1])throw new r(E)})(n,i,a,te(e,0,q[i]+2)),e=te(e,q[i]+2),o()):await l;const c=new s(e.length-V-(e.length-V)%R);t.enqueue(Z(n,e,c,0,V,!0))},async flush(e){const{signed:t,ctr:n,hmac:a,pending:i,ready:o}=this;await o;const l=te(i,0,i.length-V),c=te(i,i.length-V);let f=new s;if(l.length){const e=re(F,l);a.update(e);const t=n.update(e);f=ne(F,t)}if(t){const e=te(ne(F,a.digest()),0,V);for(let t=0;V>t;t++)if(e[t]!=c[t])throw new r(T)}e.enqueue(f)}})}}class Q extends p{constructor({password:e,encryptionStrength:n}){let r;super({start(){t.assign(this,{ready:new c((e=>this.resolveReady=e)),password:e,strength:n-1,pending:new s})},async transform(e,t){const n=this,{password:r,strength:a,resolveReady:i,ready:o}=n;let l=new s;r?(l=await(async(e,t,n)=>{const r=I(new s(q[t]));return ee(r,await $(e,t,n,r))})(n,a,r),i()):await o;const c=new s(l.length+e.length-e.length%R);c.set(l,0),t.enqueue(Z(n,e,c,l.length,0))},async flush(e){const{ctr:t,hmac:n,pending:a,ready:i}=this;await i;let o=new s;if(a.length){const e=t.update(re(F,a));n.update(e),o=ne(F,e)}r.signature=ne(F,n.digest()).slice(0,V),e.enqueue(ee(o,r.signature))}}),r=this}}function Z(e,t,n,r,a,i){const{ctr:o,hmac:l,pending:c}=e,f=t.length-a;let h;for(c.length&&(t=ee(c,t),n=((e,t)=>{if(t&&t>e.length){const n=e;(e=new s(t)).set(n,0)}return e})(n,f-f%R)),h=0;f-R>=h;h+=R){const e=re(F,te(t,h,h+R));i&&l.update(e);const s=o.update(e);i||l.update(s),n.set(ne(F,s),h+r)}return e.pending=te(t,h),n}async function $(n,r,a,i){n.password=null;const o=(e=>{if(void 0===f){const t=new s((e=unescape(encodeURIComponent(e))).length);for(let n=0;n<t.length;n++)t[n]=e.charCodeAt(n);return t}return(new f).encode(e)})(a),l=await(async(e,t,n,r,s)=>{if(!Y)return z.importKey(t);try{return await L.importKey("raw",t,n,!1,s)}catch(e){return Y=!1,z.importKey(t)}})(0,o,A,0,H),c=await(async(e,t,n)=>{if(!j)return z.pbkdf2(t,e.salt,B.iterations,n);try{return await L.deriveBits(e,t,n)}catch(r){return j=!1,z.pbkdf2(t,e.salt,B.iterations,n)}})(t.assign({salt:i},B),l,8*(2*K[r]+2)),h=new s(c),u=re(F,te(h,0,K[r])),p=re(F,te(h,K[r],2*K[r])),d=te(h,2*K[r]);return t.assign(n,{keys:{key:u,authentication:p,passwordVerification:d},ctr:new G(new O(u),e.from(M)),hmac:new X(p)}),d}function ee(e,t){let n=e;return e.length+t.length&&(n=new s(e.length+t.length),n.set(e,0),n.set(t,e.length)),n}function te(e,t,n){return e.subarray(t,n)}function ne(e,t){return e.fromBits(t)}function re(e,t){return e.toBits(t)}class se extends p{constructor({password:e,passwordVerification:n}){super({start(){t.assign(this,{password:e,passwordVerification:n}),le(this,e)},transform(e,t){const n=this;if(n.password){const t=ie(n,e.subarray(0,12));if(n.password=null,t[11]!=n.passwordVerification)throw new r(E);e=e.subarray(12)}t.enqueue(ie(n,e))}})}}class ae extends p{constructor({password:e,passwordVerification:n}){super({start(){t.assign(this,{password:e,passwordVerification:n}),le(this,e)},transform(e,t){const n=this;let r,a;if(n.password){n.password=null;const t=I(new s(12));t[11]=n.passwordVerification,r=new s(e.length+t.length),r.set(oe(n,t),0),a=12}else r=new s(e.length),a=0;r.set(oe(n,e),a),t.enqueue(r)}})}}function ie(e,t){const n=new s(t.length);for(let r=0;r<t.length;r++)n[r]=fe(e)^t[r],ce(e,n[r]);return n}function oe(e,t){const n=new s(t.length);for(let r=0;r<t.length;r++)n[r]=fe(e)^t[r],ce(e,t[r]);return n}function le(e,n){const r=[305419896,591751049,878082192];t.assign(e,{keys:r,crcKey0:new b(r[0]),crcKey2:new b(r[2])});for(let t=0;t<n.length;t++)ce(e,n.charCodeAt(t))}function ce(e,t){let[r,s,a]=e.keys;e.crcKey0.append([t]),r=~e.crcKey0.get(),s=ue(n.imul(ue(s+he(r)),134775813)+1),e.crcKey2.append([s>>>24]),a=~e.crcKey2.get(),e.keys=[r,s,a]}function fe(e){const t=2|e.keys[2];return he(n.imul(t,1^t)>>>8)}function he(e){return 255&e}function ue(e){return 4294967295&e}const pe="deflate-raw";class de extends p{constructor(e,{chunkSize:t,CompressionStream:n,CompressionStreamNative:r}){super({});const{compressed:s,encrypted:a,useCompressionStream:i,zipCrypto:o,signed:c,level:f}=e,h=this;let u,p,d=we(super.readable);a&&!o||!c||([d,u]=d.tee(),u=me(u,new _)),s&&(d=ye(d,i,{level:f,chunkSize:t},r,n)),a&&(o?d=me(d,new ae(e)):(p=new Q(e),d=me(d,p))),ve(h,d,(async()=>{let e;a&&!o&&(e=p.signature),a&&!o||!c||(e=await u.getReader().read(),e=new l(e.value.buffer).getUint32(0)),h.signature=e}))}}class ge extends p{constructor(e,{chunkSize:t,DecompressionStream:n,DecompressionStreamNative:s}){super({});const{zipCrypto:a,encrypted:i,signed:o,signature:c,compressed:f,useCompressionStream:h}=e;let u,p,d=we(super.readable);i&&(a?d=me(d,new se(e)):(p=new J(e),d=me(d,p))),f&&(d=ye(d,h,{chunkSize:t},s,n)),i&&!a||!o||([d,u]=d.tee(),u=me(u,new _)),ve(this,d,(async()=>{if((!i||a)&&o){const e=await u.getReader().read(),t=new l(e.value.buffer);if(c!=t.getUint32(0,!1))throw new r(T)}}))}}function we(e){return me(e,new p({transform(e,t){e&&e.length&&t.enqueue(e)}}))}function ve(e,n,r){n=me(n,new p({flush:r})),t.defineProperty(e,"readable",{get:()=>n})}function ye(e,t,n,r,s){try{e=me(e,new(t&&r?r:s)(pe,n))}catch(r){if(!t)throw r;e=me(e,new s(pe,n))}return e}function me(e,t){return e.pipeThrough(t)}const be="data";class _e extends p{constructor(e,n){super({});const r=this,{codecType:s}=e;let a;s.startsWith("deflate")?a=de:s.startsWith("inflate")&&(a=ge);let i=0;const o=new a(e,n),l=super.readable,c=new p({transform(e,t){e&&e.length&&(i+=e.length,t.enqueue(e))},flush(){const{signature:e}=o;t.assign(r,{signature:e,size:i})}});t.defineProperty(r,"readable",{get:()=>l.pipeThrough(o).pipeThrough(c)})}}const Se=new Map,ke=new Map;let De=0;async function ze(e){try{const{options:t,scripts:n,config:r}=e;n&&n.length&&importScripts.apply(void 0,n),self.initCodec&&self.initCodec(),r.CompressionStreamNative=self.CompressionStream,r.DecompressionStreamNative=self.DecompressionStream,self.Deflate&&(r.CompressionStream=new y(self.Deflate)),self.Inflate&&(r.DecompressionStream=new y(self.Inflate));const s={highWaterMark:1,size:()=>r.chunkSize},a=e.readable||new d({async pull(e){const t=new c((e=>Se.set(De,e)));Ce({type:"pull",messageId:De}),De=(De+1)%Number.MAX_SAFE_INTEGER;const{value:n,done:r}=await t;e.enqueue(n),r&&e.close()}},s),i=e.writable||new g({async write(e){let t;const n=new c((e=>t=e));ke.set(De,t),Ce({type:be,value:e,messageId:De}),De=(De+1)%Number.MAX_SAFE_INTEGER,await n}},s),o=new _e(t,r);await a.pipeThrough(o).pipeTo(i,{preventAbort:!0});try{await i.close()}catch(e){}const{signature:l,size:f}=o;Ce({type:"close",result:{signature:l,size:f}})}catch(e){Ee(e)}}function Ce(e){let{value:t}=e;if(t)if(t.length)try{t=new s(t),e.value=t.buffer,u(e,[e.value])}catch(t){u(e)}else u(e);else u(e)}function Ee(e){const{message:t,stack:n,code:r,name:s}=e;u({error:{message:t,stack:n,code:r,name:s}})}addEventListener("message",(({data:e})=>{const{type:t,messageId:n,value:r,done:a}=e;try{if("start"==t&&ze(e),t==be){const e=Se.get(n);Se.delete(n),e({value:new s(r),done:a})}if("ack"==t){const e=ke.get(n);ke.delete(n),e()}}catch(e){Ee(e)}}));var Te=s,Ie=a,Re=i,xe=new Te([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),Ae=new Te([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),Be=new Te([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),He=(e,t)=>{for(var n=new Ie(31),r=0;31>r;++r)n[r]=t+=1<<e[r-1];var s=new Re(n[30]);for(r=1;30>r;++r)for(var a=n[r];a<n[r+1];++a)s[a]=a-n[r]<<5|r;return[n,s]},qe=He(xe,2),Ke=qe[0],Ve=qe[1];Ke[28]=258,Ve[258]=28;for(var Me=He(Ae,0),Ne=Me[0],Pe=Me[1],Ue=new Ie(32768),Le=0;32768>Le;++Le){var We=(43690&Le)>>>1|(21845&Le)<<1;We=(61680&(We=(52428&We)>>>2|(13107&We)<<2))>>>4|(3855&We)<<4,Ue[Le]=((65280&We)>>>8|(255&We)<<8)>>>1}var Fe=(e,t,n)=>{for(var r=e.length,s=0,a=new Ie(t);r>s;++s)e[s]&&++a[e[s]-1];var i,o=new Ie(t);for(s=0;t>s;++s)o[s]=o[s-1]+a[s-1]<<1;if(n){i=new Ie(1<<t);var l=15-t;for(s=0;r>s;++s)if(e[s])for(var c=s<<4|e[s],f=t-e[s],h=o[e[s]-1]++<<f,u=h|(1<<f)-1;u>=h;++h)i[Ue[h]>>>l]=c}else for(i=new Ie(r),s=0;r>s;++s)e[s]&&(i[s]=Ue[o[e[s]-1]++]>>>15-e[s]);return i},Oe=new Te(288);for(Le=0;144>Le;++Le)Oe[Le]=8;for(Le=144;256>Le;++Le)Oe[Le]=9;for(Le=256;280>Le;++Le)Oe[Le]=7;for(Le=280;288>Le;++Le)Oe[Le]=8;var Ge=new Te(32);for(Le=0;32>Le;++Le)Ge[Le]=5;var Xe=Fe(Oe,9,0),Ye=Fe(Oe,9,1),je=Fe(Ge,5,0),Je=Fe(Ge,5,1),Qe=e=>{for(var t=e[0],n=1;n<e.length;++n)e[n]>t&&(t=e[n]);return t},Ze=(e,t,n)=>{var r=t/8|0;return(e[r]|e[r+1]<<8)>>(7&t)&n},$e=(e,t)=>{var n=t/8|0;return(e[n]|e[n+1]<<8|e[n+2]<<16)>>(7&t)},et=e=>(e+7)/8|0,tt=(e,t,n)=>{(null==t||0>t)&&(t=0),(null==n||n>e.length)&&(n=e.length);var r=new(2==e.BYTES_PER_ELEMENT?Ie:4==e.BYTES_PER_ELEMENT?Re:Te)(n-t);return r.set(e.subarray(t,n)),r},nt=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],rt=(e,t,n)=>{var s=new r(t||nt[e]);if(s.code=e,r.captureStackTrace&&r.captureStackTrace(s,rt),!n)throw s;return s},st=(e,t,n)=>{n<<=7&t;var r=t/8|0;e[r]|=n,e[r+1]|=n>>>8},at=(e,t,n)=>{n<<=7&t;var r=t/8|0;e[r]|=n,e[r+1]|=n>>>8,e[r+2]|=n>>>16},it=(e,t)=>{for(var n=[],r=0;r<e.length;++r)e[r]&&n.push({s:r,f:e[r]});var s=n.length,a=n.slice();if(!s)return[pt,0];if(1==s){var i=new Te(n[0].s+1);return i[n[0].s]=1,[i,1]}n.sort(((e,t)=>e.f-t.f)),n.push({s:-1,f:25001});var o=n[0],l=n[1],c=0,f=1,h=2;for(n[0]={s:-1,f:o.f+l.f,l:o,r:l};f!=s-1;)o=n[n[c].f<n[h].f?c++:h++],l=n[c!=f&&n[c].f<n[h].f?c++:h++],n[f++]={s:-1,f:o.f+l.f,l:o,r:l};var u=a[0].s;for(r=1;s>r;++r)a[r].s>u&&(u=a[r].s);var p=new Ie(u+1),d=ot(n[f-1],p,0);if(d>t){r=0;var g=0,w=d-t,v=1<<w;for(a.sort(((e,t)=>p[t.s]-p[e.s]||e.f-t.f));s>r;++r){var y=a[r].s;if(p[y]<=t)break;g+=v-(1<<d-p[y]),p[y]=t}for(g>>>=w;g>0;){var m=a[r].s;p[m]<t?g-=1<<t-p[m]++-1:++r}for(;r>=0&&g;--r){var b=a[r].s;p[b]==t&&(--p[b],++g)}d=t}return[new Te(p),d]},ot=(e,t,r)=>-1==e.s?n.max(ot(e.l,t,r+1),ot(e.r,t,r+1)):t[e.s]=r,lt=e=>{for(var t=e.length;t&&!e[--t];);for(var n=new Ie(++t),r=0,s=e[0],a=1,i=e=>{n[r++]=e},o=1;t>=o;++o)if(e[o]==s&&o!=t)++a;else{if(!s&&a>2){for(;a>138;a-=138)i(32754);a>2&&(i(a>10?a-11<<5|28690:a-3<<5|12305),a=0)}else if(a>3){for(i(s),--a;a>6;a-=6)i(8304);a>2&&(i(a-3<<5|8208),a=0)}for(;a--;)i(s);a=1,s=e[o]}return[n.subarray(0,r),t]},ct=(e,t)=>{for(var n=0,r=0;r<t.length;++r)n+=e[r]*t[r];return n},ft=(e,t,n)=>{var r=n.length,s=et(t+2);e[s]=255&r,e[s+1]=r>>>8,e[s+2]=255^e[s],e[s+3]=255^e[s+1];for(var a=0;r>a;++a)e[s+a+4]=n[a];return 8*(s+4+r)},ht=(e,t,n,r,s,a,i,o,l,c,f)=>{st(t,f++,n),++s[256];for(var h=it(s,15),u=h[0],p=h[1],d=it(a,15),g=d[0],w=d[1],v=lt(u),y=v[0],m=v[1],b=lt(g),_=b[0],S=b[1],k=new Ie(19),D=0;D<y.length;++D)k[31&y[D]]++;for(D=0;D<_.length;++D)k[31&_[D]]++;for(var z=it(k,7),C=z[0],E=z[1],T=19;T>4&&!C[Be[T-1]];--T);var I,R,x,A,B=c+5<<3,H=ct(s,Oe)+ct(a,Ge)+i,q=ct(s,u)+ct(a,g)+i+14+3*T+ct(k,C)+(2*k[16]+3*k[17]+7*k[18]);if(H>=B&&q>=B)return ft(t,f,e.subarray(l,l+c));if(st(t,f,1+(H>q)),f+=2,H>q){I=Fe(u,p,0),R=u,x=Fe(g,w,0),A=g;var K=Fe(C,E,0);for(st(t,f,m-257),st(t,f+5,S-1),st(t,f+10,T-4),f+=14,D=0;T>D;++D)st(t,f+3*D,C[Be[D]]);f+=3*T;for(var V=[y,_],M=0;2>M;++M){var N=V[M];for(D=0;D<N.length;++D){var P=31&N[D];st(t,f,K[P]),f+=C[P],P>15&&(st(t,f,N[D]>>>5&127),f+=N[D]>>>12)}}}else I=Xe,R=Oe,x=je,A=Ge;for(D=0;o>D;++D)if(r[D]>255){P=r[D]>>>18&31,at(t,f,I[P+257]),f+=R[P+257],P>7&&(st(t,f,r[D]>>>23&31),f+=xe[P]);var U=31&r[D];at(t,f,x[U]),f+=A[U],U>3&&(at(t,f,r[D]>>>5&8191),f+=Ae[U])}else at(t,f,I[r[D]]),f+=R[r[D]];return at(t,f,I[256]),f+R[256]},ut=new Re([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),pt=new Te(0),dt=function(){function e(e,t){t||"function"!=typeof e||(t=e,e={}),this.ondata=t,this.o=e||{}}return e.prototype.p=function(e,t){var r,s,a;this.ondata((a=!t,((e,t,r,s,a,i)=>{var o=e.length,l=new Te(0+o+5*(1+n.ceil(o/7e3))+0),c=l.subarray(0,l.length-0),f=0;if(!t||8>o)for(var h=0;o>=h;h+=65535){var u=h+65535;o>u||(c[f>>3]=i),f=ft(c,f+1,e.subarray(h,u))}else{for(var p=ut[t-1],d=p>>>13,g=8191&p,w=(1<<r)-1,v=new Ie(32768),y=new Ie(w+1),m=n.ceil(r/3),b=2*m,_=t=>(e[t]^e[t+1]<<m^e[t+2]<<b)&w,S=new Re(25e3),k=new Ie(288),D=new Ie(32),z=0,C=0,E=(h=0,0),T=0,I=0;o>h;++h){var R=_(h),x=32767&h,A=y[R];if(v[x]=A,y[R]=x,h>=T){var B=o-h;if((z>7e3||E>24576)&&B>423){f=ht(e,c,0,S,k,D,C,E,I,h-I,f),E=z=C=0,I=h;for(var H=0;286>H;++H)k[H]=0;for(H=0;30>H;++H)D[H]=0}var q=2,K=0,V=g,M=x-A&32767;if(B>2&&R==_(h-M))for(var N=n.min(d,B)-1,P=n.min(32767,h),U=n.min(258,B);P>=M&&--V&&x!=A;){if(e[h+q]==e[h+q-M]){for(var L=0;U>L&&e[h+L]==e[h+L-M];++L);if(L>q){if(q=L,K=M,L>N)break;var W=n.min(M,L-2),F=0;for(H=0;W>H;++H){var O=h-M+H+32768&32767,G=O-v[O]+32768&32767;G>F&&(F=G,A=O)}}}M+=(x=A)-(A=v[x])+32768&32767}if(K){S[E++]=268435456|Ve[q]<<18|Pe[K];var X=31&Ve[q],Y=31&Pe[K];C+=xe[X]+Ae[Y],++k[257+X],++D[Y],T=h+q,++z}else S[E++]=e[h],++k[e[h]]}}f=ht(e,c,i,S,k,D,C,E,I,h-I,f),!i&&7&f&&(f=ft(c,f+1,pt))}return tt(l,0,0+et(f)+0)})(r=e,null==(s=this.o).level?6:s.level,null==s.mem?n.ceil(1.5*n.max(8,n.min(13,n.log(r.length)))):12+s.mem,0,0,!a)),t)},e.prototype.push=function(e,t){this.ondata||rt(5),this.d&&rt(4),this.d=t,this.p(e,t||!1)},e}(),gt=function(){function e(e){this.s={},this.p=new Te(0),this.ondata=e}return e.prototype.e=function(e){this.ondata||rt(5),this.d&&rt(4);var t=this.p.length,n=new Te(t+e.length);n.set(this.p),n.set(e,t),this.p=n},e.prototype.c=function(e){this.d=this.s.i=e||!1;var t=this.s.b,r=((e,t,r)=>{var s=e.length;if(!s||r&&r.f&&!r.l)return t||new Te(0);var a=!t||r,i=!r||r.i;r||(r={}),t||(t=new Te(3*s));var o=e=>{var r=t.length;if(e>r){var s=new Te(n.max(2*r,e));s.set(t),t=s}},l=r.f||0,c=r.p||0,f=r.b||0,h=r.l,u=r.d,p=r.m,d=r.n,g=8*s;do{if(!h){l=Ze(e,c,1);var w=Ze(e,c+1,3);if(c+=3,!w){var v=e[(T=et(c)+4)-4]|e[T-3]<<8,y=T+v;if(y>s){i&&rt(0);break}a&&o(f+v),t.set(e.subarray(T,y),f),r.b=f+=v,r.p=c=8*y,r.f=l;continue}if(1==w)h=Ye,u=Je,p=9,d=5;else if(2==w){var m=Ze(e,c,31)+257,b=Ze(e,c+10,15)+4,_=m+Ze(e,c+5,31)+1;c+=14;for(var S=new Te(_),k=new Te(19),D=0;b>D;++D)k[Be[D]]=Ze(e,c+3*D,7);c+=3*b;var z=Qe(k),C=(1<<z)-1,E=Fe(k,z,1);for(D=0;_>D;){var T,I=E[Ze(e,c,C)];if(c+=15&I,16>(T=I>>>4))S[D++]=T;else{var R=0,x=0;for(16==T?(x=3+Ze(e,c,3),c+=2,R=S[D-1]):17==T?(x=3+Ze(e,c,7),c+=3):18==T&&(x=11+Ze(e,c,127),c+=7);x--;)S[D++]=R}}var A=S.subarray(0,m),B=S.subarray(m);p=Qe(A),d=Qe(B),h=Fe(A,p,1),u=Fe(B,d,1)}else rt(1);if(c>g){i&&rt(0);break}}a&&o(f+131072);for(var H=(1<<p)-1,q=(1<<d)-1,K=c;;K=c){var V=(R=h[$e(e,c)&H])>>>4;if((c+=15&R)>g){i&&rt(0);break}if(R||rt(2),256>V)t[f++]=V;else{if(256==V){K=c,h=null;break}var M=V-254;if(V>264){var N=xe[D=V-257];M=Ze(e,c,(1<<N)-1)+Ke[D],c+=N}var P=u[$e(e,c)&q],U=P>>>4;if(P||rt(3),c+=15&P,B=Ne[U],U>3&&(N=Ae[U],B+=$e(e,c)&(1<<N)-1,c+=N),c>g){i&&rt(0);break}a&&o(f+131072);for(var L=f+M;L>f;f+=4)t[f]=t[f-B],t[f+1]=t[f+1-B],t[f+2]=t[f+2-B],t[f+3]=t[f+3-B];f=L}}r.l=h,r.p=K,r.b=f,r.f=l,h&&(l=1,r.m=p,r.d=u,r.n=d)}while(!l);return f==t.length?t:tt(t,0,f)})(this.p,this.o,this.s);this.ondata(tt(r,t,this.s.b),this.d),this.o=tt(r,this.s.b-32768),this.s.b=this.o.length,this.p=tt(this.p,this.s.p/8|0),this.s.p&=7},e.prototype.push=function(e,t){this.e(e),this.c(t)},e}(),wt="undefined"!=typeof TextDecoder&&new TextDecoder;try{wt.decode(pt,{stream:!0})}catch(e){}function vt(e,n,r){return class{constructor(a){const i=this;t.hasOwn(a,"level")&&void 0===a.level&&delete a.level,i.codec=new e(t.assign({},n,a)),r(i.codec,(e=>{if(i.pendingData){const t=i.pendingData;i.pendingData=new s(t.length+e.length);const{pendingData:n}=i;n.set(t,0),n.set(e,t.length)}else i.pendingData=new s(e)}))}append(e){return this.codec.push(e),a(this)}flush(){return this.codec.push(new s,!0),a(this)}};function a(e){if(e.pendingData){const t=e.pendingData;return e.pendingData=null,t}return new s}}const{Deflate:yt,Inflate:mt}=((e,t={},n)=>({Deflate:vt(e.Deflate,t.deflate,n),Inflate:vt(e.Inflate,t.inflate,n)}))({Deflate:dt,Inflate:gt},void 0,((e,t)=>e.ondata=t));self.initCodec=()=>{self.Deflate=yt,self.Inflate=mt}}();
