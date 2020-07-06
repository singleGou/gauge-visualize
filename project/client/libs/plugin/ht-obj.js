!function(Y,j,N){"use strict";var f="ht",z=Y[f],J=null,G=Math,o=G.abs,s=G.max,d=Number.MAX_VALUE,H=z.Default,F=H.getInternal(),r=H.clone,M=F.vec3TransformMat4,c=F.appendArray,v=function(){var X=/v( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)/,i=/vt( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)/,Y=/vn( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)( +[\d|\.|\+|\-|e|E]+)/,h=function(Z,_){return _=parseInt(_),_>=0?Z[_-1]:Z[_+Z.length]},v=function(p,w,B,Z,b,$){if(p.vs){var G=h(w,Z),e=h(w,b),f=h(w,$),d=B.matrix,I=p.vs;if(B.flipFace){var z=e;e=f,f=z}d?(c(I,M(r(G),d)),c(I,M(r(e),d)),c(I,M(r(f),d))):(c(I,G),c(I,e),c(I,f))}},C=function(O,y,B,$,f,F){if(O.vs){var T=h(y,$),i=h(y,f),s=h(y,F),_=B.flipY;if(B.flipFace){var I=i;i=s,s=I}O.uv.push(T[0],_?1-T[1]:T[1],i[0],_?1-i[1]:i[1],s[0],_?1-s[1]:s[1])}},$=function(s,B,F,$,i,P){if(s.vs){var p=h(B,$),S=h(B,i),G=h(B,P),q=F.normalMatrix,x=s.ns;if(F.flipFace){var D=S;S=G,G=D}q?(c(x,M(r(p),q)),c(x,M(r(S),q)),c(x,M(r(G),q))):(c(x,p),c(x,S),c(x,G))}},L=function(_,b,y,X,W,k,n,q){var L=X&&X.length&&q;k[3]===N?(v(_,b,W,k[0],k[1],k[2]),n&&C(_,y,W,n[0],n[1],n[2]),L&&$(_,X,W,q[0],q[1],q[2])):(v(_,b,W,k[0],k[1],k[3]),v(_,b,W,k[1],k[2],k[3]),n&&(C(_,y,W,n[0],n[1],n[3]),C(_,y,W,n[1],n[2],n[3])),L&&($(_,X,W,q[0],q[1],q[3]),$(_,X,W,q[1],q[2],q[3])))},b=function(L,b,k,S){var Y,u,Q,P,E,B,Z,m=d,t=d,w=d,O=-d,X=-d,H=-d;for(Y in L)for(B=L[Y].vs,Z=B.length,u=0;Z>u;u+=3)Q=B[u+0],P=B[u+1],E=B[u+2],m>Q&&(m=Q),t>P&&(t=P),w>E&&(w=E),Q>O&&(O=Q),P>X&&(X=P),E>H&&(H=E);if(k){var i=m+(O-m)/2,M=t+(X-t)/2,A=w+(H-w)/2;for(Y in L)for(B=L[Y].vs,Z=B.length,u=0;Z>u;u+=3)B[u+0]-=i,B[u+1]-=M,B[u+2]-=A}var v,x,e;k?(v=O-m,x=X-t,e=H-w):(v=2*s(o(m),o(O)),x=2*s(o(t),o(X)),e=2*s(o(w),o(H))),0===v&&(v=Math.min(x,e)/1e3||.001),0===x&&(x=Math.min(v,e)/1e3||.001),0===e&&(e=Math.min(v,x)/1e3||.001),S.rawS3=[v,x,e];for(Y in L){if(B=L[Y].vs,b)for(Z=B.length,u=0;Z>u;u+=3)v&&(B[u+0]/=v),x&&(B[u+1]/=x),e&&(B[u+2]/=e);L[Y].rawS3=S.rawS3}};return function(O,o,R){if(!O)return J;(F.isString(o)||o instanceof ArrayBuffer)&&(o=m(o)),R||(R={}),R.flipY==J&&(R.flipY=!0),(R.s3||R.r3||R.t3||R.mat)&&(R.matrix=F.createWorldMatrix(R.mat,R.s3,R.r3,R.rotationMode,R.t3));var V,T,c,u,$,h,g=[],v=[],_=R.ignoreNormal?J:[],d=R.reverseFlipMtls,D={vs:[],uv:[],ns:_?[]:J},B={htdefault:D},f=new p(O);for(_&&R.matrix&&(R.normalMatrix=F.createNormalMatrix(R.matrix));null!=(T=f.stepNext());)if(T=T.trim(),0!==T.length&&"#"!==T.charAt(0))if(T.indexOf("#QNAN0")>=0&&(T=T.replace(/#QNAN0/gi,"0")),c=X.exec(T))g.push([parseFloat(c[1]),parseFloat(c[2]),parseFloat(c[3])]);else if(c=i.exec(T))v.push([parseFloat(c[1]),parseFloat(c[2])]);else if(_&&(c=Y.exec(T)))R.flipFace?_.push([parseFloat(-c[1]),parseFloat(-c[2]),parseFloat(-c[3])]):_.push([parseFloat(c[1]),parseFloat(c[2]),parseFloat(c[3])]);else if("f"===T[0]){var y=T.split(/\s+/);if(y.length<4)continue;var l,V,j,P=[],z=[],M=[];for(V=1,j=y.length;j>V;V++)l=y[V].split("/"),P.push(parseInt(l[0],10)),l.length>1&&l[1].length>0&&M.push(parseInt(l[1],10)),l.length>2&&l[2].length>0&&z.push(parseInt(l[2],10));for(V=0,j=P.length-2;j>V;V++)L(D,g,v,_,R,[P[0],P[V+1],P[V+2]],M.length?[M[0],M[V+1],M[V+2]]:J,z.length?[z[0],z[V+1],z[V+2]]:J)}else if(/^usemtl /.test(T)&&(u=T.substring(7).trim(),!(D=B[u]))){if(D={name:u,vs:[],uv:[],ns:_?[]:J},R.ignoreMtls&&R.ignoreMtls.indexOf(u)>=0&&delete D.vs,(R.reverseFlip||"*"===d||d&&d.indexOf(u)>=0)&&(D.reverseFlip=!0),o&&($=o[u],$&&(R.ignoreColor||(D.color=$.kd),!R.ignoreTransparent&&$.d>0&&$.d<1&&(D.transparent=!0,D.opacity=$.d),!R.ignoreImage&&(h=$.map_kd)))){h=h.split(" ");var s=-1;for(V=0;V<h.length;V++)"-o"===h[V]?(D.uvOffset=[parseFloat(h[V+1]),parseFloat(h[V+2])],V+=3,s=V):"-s"===h[V]&&(D.uvScale=[parseFloat(h[V+1]),parseFloat(h[V+2])],V+=3,s=V);D.image=(R.prefix||"")+h.splice(s+1).join(" ")}B[u]=D}var W=[];for(var K in B){var x=B[K].vs;x&&0!==x.length||W.push(K)}W.forEach(function(Z){delete B[Z]}),b(B,R.cube,R.center,R);var q=R.shape3d;if(q){var w=[];for(var u in B){var D=B[u];w.rawS3=D.rawS3,w.push(D)}H.setShape3dModel(q,w)}return B}}(),m=function(O){var F={};if(O)for(var x,P,H,I,R,r,u=new p(O),k=/\s+/;null!=(P=u.stepNext());)P=P.trim(),0!==P.length&&"#"!==P.charAt(0)&&(H=P.indexOf(" "),I=(H?P.substring(0,H):P).toLowerCase(),R=(H?P.substring(H+1):"").trim(),"newmtl"===I?F[R]=x={name:R}:x&&("ka"===I||"kd"===I||"ks"===I?(r=R.split(k,3),x[I]=[parseFloat(r[0]),parseFloat(r[1]),parseFloat(r[2]),1]):x[I]="ns"===I||"d"===I?parseFloat(R):R));return F},p=function(f){var F=this;if(f instanceof ArrayBuffer){F.isBuffer=!0;var L=0,A=new Uint8Array(f),N=A.length,P=A.length;F.stepNext=function(){for(var B,w,p=L;N>L;)if(B=A[L],w=B>>4,12===w||13==w)L+=2;else if(14===w)L+=3;else if(L++,10===B)return String.fromCharCode.apply(null,A.subarray(p,L));return L>p?String.fromCharCode.apply(null,A.subarray(p,L)):null}}else{F.isBuffer=!1;var g=f.split("\n"),O=0,P=g.length;F.stepNext=function(){return P>O?g[O++]:null}}};p.prototype={},p.prototype.constructor=p,F.addMethod(H,{loadObj:function(o,n,O){O=O||{};var q=!1;/(MSIE |Trident\/|Edge\/)/.test(Y.navigator.userAgent)&&(q=!0);var t=function(N){var m,w=O.finishFunc,j=O.shape3d,q=N?v(N[0],N[1],O):null;if(q){if(j)m=H.getShape3dModel(j);else{m=[];for(var G in q){var P=q[G];m.rawS3=P.rawS3,m.push(P)}}w&&w(q,m,m.rawS3)}else w&&w(null)};if(q){var V=function(C){O.responseType="arraybuffer",H.xhrLoad(o,function(x){t([x,C])},O)};n?H.xhrLoad(n,function(T){V(T)},O):V()}else H.xhrLoad(n?[o,n]:[o],t,O)},parseObj:function($,K,I){return v($,K,I)}})}("undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:(0,eval)("this"),Object);