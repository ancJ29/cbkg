import{U as Ki,r as Xi,V as Ji}from"./index-db117989.js";var d={},Te={exports:{}};(function(r,e){(function(i,n){var t="1.0.37",c="",y="?",T="function",M="undefined",Y="object",D="string",G="major",o="model",l="name",a="type",s="vendor",u="version",I="architecture",Z="console",w="mobile",p="tablet",V="smarttv",R="wearable",ve="embedded",we=500,ie="Amazon",K="Apple",ke="ASUS",Ce="BlackBerry",L="Browser",re="Chrome",Hi="Edge",ne="Firefox",te="Google",Ie="Huawei",pe="LG",fe="Microsoft",We="Motorola",ae="Opera",oe="Samsung",_e="Sharp",se="Sony",ge="Xiaomi",he="Zebra",Ne="Facebook",Ue="Chromium OS",Fe="Mac OS",Yi=function(f,h){var v={};for(var O in f)h[O]&&h[O].length%2===0?v[O]=h[O].concat(f[O]):v[O]=f[O];return v},le=function(f){for(var h={},v=0;v<f.length;v++)h[f[v].toUpperCase()]=f[v];return h},Be=function(f,h){return typeof f===D?X(h).indexOf(X(f))!==-1:!1},X=function(f){return f.toLowerCase()},Gi=function(f){return typeof f===D?f.replace(/[^\d\.]/g,c).split(".")[0]:n},ye=function(f,h){if(typeof f===D)return f=f.replace(/^\s\s*/,c),typeof h===M?f:f.substring(0,we)},J=function(f,h){for(var v=0,O,F,_,g,m,N;v<h.length&&!m;){var Ee=h[v],De=h[v+1];for(O=F=0;O<Ee.length&&!m&&Ee[O];)if(m=Ee[O++].exec(f),m)for(_=0;_<De.length;_++)N=m[++F],g=De[_],typeof g===Y&&g.length>0?g.length===2?typeof g[1]==T?this[g[0]]=g[1].call(this,N):this[g[0]]=g[1]:g.length===3?typeof g[1]===T&&!(g[1].exec&&g[1].test)?this[g[0]]=N?g[1].call(this,N,g[2]):n:this[g[0]]=N?N.replace(g[1],g[2]):n:g.length===4&&(this[g[0]]=N?g[3].call(this,N.replace(g[1],g[2])):n):this[g]=N||n;v+=2}},Oe=function(f,h){for(var v in h)if(typeof h[v]===Y&&h[v].length>0){for(var O=0;O<h[v].length;O++)if(Be(h[v][O],f))return v===y?n:v}else if(Be(h[v],f))return v===y?n:v;return f},Zi={"1.0":"/8",1.2:"/1",1.3:"/3","2.0":"/412","2.0.2":"/416","2.0.3":"/417","2.0.4":"/419","?":"/"},je={ME:"4.90","NT 3.11":"NT3.51","NT 4.0":"NT4.0",2e3:"NT 5.0",XP:["NT 5.1","NT 5.2"],Vista:"NT 6.0",7:"NT 6.1",8:"NT 6.2",8.1:"NT 6.3",10:["NT 6.4","NT 10.0"],RT:"ARM"},Le={browser:[[/\b(?:crmo|crios)\/([\w\.]+)/i],[u,[l,"Chrome"]],[/edg(?:e|ios|a)?\/([\w\.]+)/i],[u,[l,"Edge"]],[/(opera mini)\/([-\w\.]+)/i,/(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i,/(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i],[l,u],[/opios[\/ ]+([\w\.]+)/i],[u,[l,ae+" Mini"]],[/\bopr\/([\w\.]+)/i],[u,[l,ae]],[/\bb[ai]*d(?:uhd|[ub]*[aekoprswx]{5,6})[\/ ]?([\w\.]+)/i],[u,[l,"Baidu"]],[/(kindle)\/([\w\.]+)/i,/(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i,/(avant|iemobile|slim)\s?(?:browser)?[\/ ]?([\w\.]*)/i,/(?:ms|\()(ie) ([\w\.]+)/i,/(flock|rockmelt|midori|epiphany|silk|skyfire|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i,/(heytap|ovi)browser\/([\d\.]+)/i,/(weibo)__([\d\.]+)/i],[l,u],[/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i],[u,[l,"UC"+L]],[/microm.+\bqbcore\/([\w\.]+)/i,/\bqbcore\/([\w\.]+).+microm/i,/micromessenger\/([\w\.]+)/i],[u,[l,"WeChat"]],[/konqueror\/([\w\.]+)/i],[u,[l,"Konqueror"]],[/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i],[u,[l,"IE"]],[/ya(?:search)?browser\/([\w\.]+)/i],[u,[l,"Yandex"]],[/slbrowser\/([\w\.]+)/i],[u,[l,"Smart Lenovo "+L]],[/(avast|avg)\/([\w\.]+)/i],[[l,/(.+)/,"$1 Secure "+L],u],[/\bfocus\/([\w\.]+)/i],[u,[l,ne+" Focus"]],[/\bopt\/([\w\.]+)/i],[u,[l,ae+" Touch"]],[/coc_coc\w+\/([\w\.]+)/i],[u,[l,"Coc Coc"]],[/dolfin\/([\w\.]+)/i],[u,[l,"Dolphin"]],[/coast\/([\w\.]+)/i],[u,[l,ae+" Coast"]],[/miuibrowser\/([\w\.]+)/i],[u,[l,"MIUI "+L]],[/fxios\/([-\w\.]+)/i],[u,[l,ne]],[/\bqihu|(qi?ho?o?|360)browser/i],[[l,"360 "+L]],[/(oculus|sailfish|huawei|vivo)browser\/([\w\.]+)/i],[[l,/(.+)/,"$1 "+L],u],[/samsungbrowser\/([\w\.]+)/i],[u,[l,oe+" Internet"]],[/(comodo_dragon)\/([\w\.]+)/i],[[l,/_/g," "],u],[/metasr[\/ ]?([\d\.]+)/i],[u,[l,"Sogou Explorer"]],[/(sogou)mo\w+\/([\d\.]+)/i],[[l,"Sogou Mobile"],u],[/(electron)\/([\w\.]+) safari/i,/(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i,/m?(qqbrowser|2345Explorer)[\/ ]?([\w\.]+)/i],[l,u],[/(lbbrowser)/i,/\[(linkedin)app\]/i],[l],[/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i],[[l,Ne],u],[/(Klarna)\/([\w\.]+)/i,/(kakao(?:talk|story))[\/ ]([\w\.]+)/i,/(naver)\(.*?(\d+\.[\w\.]+).*\)/i,/safari (line)\/([\w\.]+)/i,/\b(line)\/([\w\.]+)\/iab/i,/(alipay)client\/([\w\.]+)/i,/(chromium|instagram|snapchat)[\/ ]([-\w\.]+)/i],[l,u],[/\bgsa\/([\w\.]+) .*safari\//i],[u,[l,"GSA"]],[/musical_ly(?:.+app_?version\/|_)([\w\.]+)/i],[u,[l,"TikTok"]],[/headlesschrome(?:\/([\w\.]+)| )/i],[u,[l,re+" Headless"]],[/ wv\).+(chrome)\/([\w\.]+)/i],[[l,re+" WebView"],u],[/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i],[u,[l,"Android "+L]],[/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i],[l,u],[/version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i],[u,[l,"Mobile Safari"]],[/version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i],[u,l],[/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i],[l,[u,Oe,Zi]],[/(webkit|khtml)\/([\w\.]+)/i],[l,u],[/(navigator|netscape\d?)\/([-\w\.]+)/i],[[l,"Netscape"],u],[/mobile vr; rv:([\w\.]+)\).+firefox/i],[u,[l,ne+" Reality"]],[/ekiohf.+(flow)\/([\w\.]+)/i,/(swiftfox)/i,/(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i,/(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i,/(firefox)\/([\w\.]+)/i,/(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i,/(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i,/(links) \(([\w\.]+)/i,/panasonic;(viera)/i],[l,u],[/(cobalt)\/([\w\.]+)/i],[l,[u,/master.|lts./,""]]],cpu:[[/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i],[[I,"amd64"]],[/(ia32(?=;))/i],[[I,X]],[/((?:i[346]|x)86)[;\)]/i],[[I,"ia32"]],[/\b(aarch64|arm(v?8e?l?|_?64))\b/i],[[I,"arm64"]],[/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i],[[I,"armhf"]],[/windows (ce|mobile); ppc;/i],[[I,"arm"]],[/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i],[[I,/ower/,c,X]],[/(sun4\w)[;\)]/i],[[I,"sparc"]],[/((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i],[[I,X]]],device:[[/\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i],[o,[s,oe],[a,p]],[/\b((?:s[cgp]h|gt|sm)-\w+|sc[g-]?[\d]+a?|galaxy nexus)/i,/samsung[- ]([-\w]+)/i,/sec-(sgh\w+)/i],[o,[s,oe],[a,w]],[/(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i],[o,[s,K],[a,w]],[/\((ipad);[-\w\),; ]+apple/i,/applecoremedia\/[\w\.]+ \((ipad)/i,/\b(ipad)\d\d?,\d\d?[;\]].+ios/i],[o,[s,K],[a,p]],[/(macintosh);/i],[o,[s,K]],[/\b(sh-?[altvz]?\d\d[a-ekm]?)/i],[o,[s,_e],[a,w]],[/\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i],[o,[s,Ie],[a,p]],[/(?:huawei|honor)([-\w ]+)[;\)]/i,/\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i],[o,[s,Ie],[a,w]],[/\b(poco[\w ]+|m2\d{3}j\d\d[a-z]{2})(?: bui|\))/i,/\b; (\w+) build\/hm\1/i,/\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i,/\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i,/oid[^\)]+; (m?[12][0-389][01]\w{3,6}[c-y])( bui|; wv|\))/i,/\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i],[[o,/_/g," "],[s,ge],[a,w]],[/oid[^\)]+; (2\d{4}(283|rpbf)[cgl])( bui|\))/i,/\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i],[[o,/_/g," "],[s,ge],[a,p]],[/; (\w+) bui.+ oppo/i,/\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i],[o,[s,"OPPO"],[a,w]],[/vivo (\w+)(?: bui|\))/i,/\b(v[12]\d{3}\w?[at])(?: bui|;)/i],[o,[s,"Vivo"],[a,w]],[/\b(rmx[1-3]\d{3})(?: bui|;|\))/i],[o,[s,"Realme"],[a,w]],[/\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i,/\bmot(?:orola)?[- ](\w*)/i,/((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i],[o,[s,We],[a,w]],[/\b(mz60\d|xoom[2 ]{0,2}) build\//i],[o,[s,We],[a,p]],[/((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i],[o,[s,pe],[a,p]],[/(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i,/\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i,/\blg-?([\d\w]+) bui/i],[o,[s,pe],[a,w]],[/(ideatab[-\w ]+)/i,/lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i],[o,[s,"Lenovo"],[a,p]],[/(?:maemo|nokia).*(n900|lumia \d+)/i,/nokia[-_ ]?([-\w\.]*)/i],[[o,/_/g," "],[s,"Nokia"],[a,w]],[/(pixel c)\b/i],[o,[s,te],[a,p]],[/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i],[o,[s,te],[a,w]],[/droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i],[o,[s,se],[a,w]],[/sony tablet [ps]/i,/\b(?:sony)?sgp\w+(?: bui|\))/i],[[o,"Xperia Tablet"],[s,se],[a,p]],[/ (kb2005|in20[12]5|be20[12][59])\b/i,/(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i],[o,[s,"OnePlus"],[a,w]],[/(alexa)webm/i,/(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i,/(kf[a-z]+)( bui|\)).+silk\//i],[o,[s,ie],[a,p]],[/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i],[[o,/(.+)/g,"Fire Phone $1"],[s,ie],[a,w]],[/(playbook);[-\w\),; ]+(rim)/i],[o,s,[a,p]],[/\b((?:bb[a-f]|st[hv])100-\d)/i,/\(bb10; (\w+)/i],[o,[s,Ce],[a,w]],[/(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i],[o,[s,ke],[a,p]],[/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i],[o,[s,ke],[a,w]],[/(nexus 9)/i],[o,[s,"HTC"],[a,p]],[/(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i,/(zte)[- ]([\w ]+?)(?: bui|\/|\))/i,/(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i],[s,[o,/_/g," "],[a,w]],[/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i],[o,[s,"Acer"],[a,p]],[/droid.+; (m[1-5] note) bui/i,/\bmz-([-\w]{2,})/i],[o,[s,"Meizu"],[a,w]],[/; ((?:power )?armor(?:[\w ]{0,8}))(?: bui|\))/i],[o,[s,"Ulefone"],[a,w]],[/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron|infinix|tecno)[-_ ]?([-\w]*)/i,/(hp) ([\w ]+\w)/i,/(asus)-?(\w+)/i,/(microsoft); (lumia[\w ]+)/i,/(lenovo)[-_ ]?([-\w]+)/i,/(jolla)/i,/(oppo) ?([\w ]+) bui/i],[s,o,[a,w]],[/(kobo)\s(ereader|touch)/i,/(archos) (gamepad2?)/i,/(hp).+(touchpad(?!.+tablet)|tablet)/i,/(kindle)\/([\w\.]+)/i,/(nook)[\w ]+build\/(\w+)/i,/(dell) (strea[kpr\d ]*[\dko])/i,/(le[- ]+pan)[- ]+(\w{1,9}) bui/i,/(trinity)[- ]*(t\d{3}) bui/i,/(gigaset)[- ]+(q\w{1,9}) bui/i,/(vodafone) ([\w ]+)(?:\)| bui)/i],[s,o,[a,p]],[/(surface duo)/i],[o,[s,fe],[a,p]],[/droid [\d\.]+; (fp\du?)(?: b|\))/i],[o,[s,"Fairphone"],[a,w]],[/(u304aa)/i],[o,[s,"AT&T"],[a,w]],[/\bsie-(\w*)/i],[o,[s,"Siemens"],[a,w]],[/\b(rct\w+) b/i],[o,[s,"RCA"],[a,p]],[/\b(venue[\d ]{2,7}) b/i],[o,[s,"Dell"],[a,p]],[/\b(q(?:mv|ta)\w+) b/i],[o,[s,"Verizon"],[a,p]],[/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i],[o,[s,"Barnes & Noble"],[a,p]],[/\b(tm\d{3}\w+) b/i],[o,[s,"NuVision"],[a,p]],[/\b(k88) b/i],[o,[s,"ZTE"],[a,p]],[/\b(nx\d{3}j) b/i],[o,[s,"ZTE"],[a,w]],[/\b(gen\d{3}) b.+49h/i],[o,[s,"Swiss"],[a,w]],[/\b(zur\d{3}) b/i],[o,[s,"Swiss"],[a,p]],[/\b((zeki)?tb.*\b) b/i],[o,[s,"Zeki"],[a,p]],[/\b([yr]\d{2}) b/i,/\b(dragon[- ]+touch |dt)(\w{5}) b/i],[[s,"Dragon Touch"],o,[a,p]],[/\b(ns-?\w{0,9}) b/i],[o,[s,"Insignia"],[a,p]],[/\b((nxa|next)-?\w{0,9}) b/i],[o,[s,"NextBook"],[a,p]],[/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i],[[s,"Voice"],o,[a,w]],[/\b(lvtel\-)?(v1[12]) b/i],[[s,"LvTel"],o,[a,w]],[/\b(ph-1) /i],[o,[s,"Essential"],[a,w]],[/\b(v(100md|700na|7011|917g).*\b) b/i],[o,[s,"Envizen"],[a,p]],[/\b(trio[-\w\. ]+) b/i],[o,[s,"MachSpeed"],[a,p]],[/\btu_(1491) b/i],[o,[s,"Rotor"],[a,p]],[/(shield[\w ]+) b/i],[o,[s,"Nvidia"],[a,p]],[/(sprint) (\w+)/i],[s,o,[a,w]],[/(kin\.[onetw]{3})/i],[[o,/\./g," "],[s,fe],[a,w]],[/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i],[o,[s,he],[a,p]],[/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i],[o,[s,he],[a,w]],[/smart-tv.+(samsung)/i],[s,[a,V]],[/hbbtv.+maple;(\d+)/i],[[o,/^/,"SmartTV"],[s,oe],[a,V]],[/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i],[[s,pe],[a,V]],[/(apple) ?tv/i],[s,[o,K+" TV"],[a,V]],[/crkey/i],[[o,re+"cast"],[s,te],[a,V]],[/droid.+aft(\w+)( bui|\))/i],[o,[s,ie],[a,V]],[/\(dtv[\);].+(aquos)/i,/(aquos-tv[\w ]+)\)/i],[o,[s,_e],[a,V]],[/(bravia[\w ]+)( bui|\))/i],[o,[s,se],[a,V]],[/(mitv-\w{5}) bui/i],[o,[s,ge],[a,V]],[/Hbbtv.*(technisat) (.*);/i],[s,o,[a,V]],[/\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i,/hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i],[[s,ye],[o,ye],[a,V]],[/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i],[[a,V]],[/(ouya)/i,/(nintendo) ([wids3utch]+)/i],[s,o,[a,Z]],[/droid.+; (shield) bui/i],[o,[s,"Nvidia"],[a,Z]],[/(playstation [345portablevi]+)/i],[o,[s,se],[a,Z]],[/\b(xbox(?: one)?(?!; xbox))[\); ]/i],[o,[s,fe],[a,Z]],[/((pebble))app/i],[s,o,[a,R]],[/(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i],[o,[s,K],[a,R]],[/droid.+; (glass) \d/i],[o,[s,te],[a,R]],[/droid.+; (wt63?0{2,3})\)/i],[o,[s,he],[a,R]],[/(quest( 2| pro)?)/i],[o,[s,Ne],[a,R]],[/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i],[s,[a,ve]],[/(aeobc)\b/i],[o,[s,ie],[a,ve]],[/droid .+?; ([^;]+?)(?: bui|; wv\)|\) applew).+? mobile safari/i],[o,[a,w]],[/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i],[o,[a,p]],[/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i],[[a,p]],[/(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i],[[a,w]],[/(android[-\w\. ]{0,9});.+buil/i],[o,[s,"Generic"]]],engine:[[/windows.+ edge\/([\w\.]+)/i],[u,[l,Hi+"HTML"]],[/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i],[u,[l,"Blink"]],[/(presto)\/([\w\.]+)/i,/(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i,/ekioh(flow)\/([\w\.]+)/i,/(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i,/(icab)[\/ ]([23]\.[\d\.]+)/i,/\b(libweb)/i],[l,u],[/rv\:([\w\.]{1,9})\b.+(gecko)/i],[u,l]],os:[[/microsoft (windows) (vista|xp)/i],[l,u],[/(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i],[l,[u,Oe,je]],[/windows nt 6\.2; (arm)/i,/windows[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i,/(?:win(?=3|9|n)|win 9x )([nt\d\.]+)/i],[[u,Oe,je],[l,"Windows"]],[/ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i,/(?:ios;fbsv\/|iphone.+ios[\/ ])([\d\.]+)/i,/cfnetwork\/.+darwin/i],[[u,/_/g,"."],[l,"iOS"]],[/(mac os x) ?([\w\. ]*)/i,/(macintosh|mac_powerpc\b)(?!.+haiku)/i],[[l,Fe],[u,/_/g,"."]],[/droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i],[u,l],[/(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i,/(blackberry)\w*\/([\w\.]*)/i,/(tizen|kaios)[\/ ]([\w\.]+)/i,/\((series40);/i],[l,u],[/\(bb(10);/i],[u,[l,Ce]],[/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i],[u,[l,"Symbian"]],[/mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i],[u,[l,ne+" OS"]],[/web0s;.+rt(tv)/i,/\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i],[u,[l,"webOS"]],[/watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i],[u,[l,"watchOS"]],[/crkey\/([\d\.]+)/i],[u,[l,re+"cast"]],[/(cros) [\w]+(?:\)| ([\w\.]+)\b)/i],[[l,Ue],u],[/panasonic;(viera)/i,/(netrange)mmh/i,/(nettv)\/(\d+\.[\w\.]+)/i,/(nintendo|playstation) ([wids345portablevuch]+)/i,/(xbox); +xbox ([^\);]+)/i,/\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i,/(mint)[\/\(\) ]?(\w*)/i,/(mageia|vectorlinux)[; ]/i,/([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i,/(hurd|linux) ?([\w\.]*)/i,/(gnu) ?([\w\.]*)/i,/\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i,/(haiku) (\w+)/i],[l,u],[/(sunos) ?([\w\.\d]*)/i],[[l,"Solaris"],u],[/((?:open)?solaris)[-\/ ]?([\w\.]*)/i,/(aix) ((\d)(?=\.|\)| )[\w\.])*/i,/\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i,/(unix) ?([\w\.]*)/i],[l,u]]},W=function(f,h){if(typeof f===Y&&(h=f,f=n),!(this instanceof W))return new W(f,h).getResult();var v=typeof i!==M&&i.navigator?i.navigator:n,O=f||(v&&v.userAgent?v.userAgent:c),F=v&&v.userAgentData?v.userAgentData:n,_=h?Yi(Le,h):Le,g=v&&v.userAgent==O;return this.getBrowser=function(){var m={};return m[l]=n,m[u]=n,J.call(m,O,_.browser),m[G]=Gi(m[u]),g&&v&&v.brave&&typeof v.brave.isBrave==T&&(m[l]="Brave"),m},this.getCPU=function(){var m={};return m[I]=n,J.call(m,O,_.cpu),m},this.getDevice=function(){var m={};return m[s]=n,m[o]=n,m[a]=n,J.call(m,O,_.device),g&&!m[a]&&F&&F.mobile&&(m[a]=w),g&&m[o]=="Macintosh"&&v&&typeof v.standalone!==M&&v.maxTouchPoints&&v.maxTouchPoints>2&&(m[o]="iPad",m[a]=p),m},this.getEngine=function(){var m={};return m[l]=n,m[u]=n,J.call(m,O,_.engine),m},this.getOS=function(){var m={};return m[l]=n,m[u]=n,J.call(m,O,_.os),g&&!m[l]&&F&&F.platform!="Unknown"&&(m[l]=F.platform.replace(/chrome os/i,Ue).replace(/macos/i,Fe)),m},this.getResult=function(){return{ua:this.getUA(),browser:this.getBrowser(),engine:this.getEngine(),os:this.getOS(),device:this.getDevice(),cpu:this.getCPU()}},this.getUA=function(){return O},this.setUA=function(m){return O=typeof m===D&&m.length>we?ye(m,we):m,this},this.setUA(O),this};W.VERSION=t,W.BROWSER=le([l,u,G]),W.CPU=le([I]),W.DEVICE=le([o,s,a,Z,w,V,p,R,ve]),W.ENGINE=W.OS=le([l,u]),r.exports&&(e=r.exports=W),e.UAParser=W;var z=typeof i!==M&&(i.jQuery||i.Zepto);if(z&&!z.ua){var ue=new W;z.ua=ue.getResult(),z.ua.get=function(){return ue.getUA()},z.ua.set=function(f){ue.setUA(f);var h=ue.getResult();for(var v in h)z.ua[v]=h[v]}}})(typeof window=="object"?window:Ki)})(Te,Te.exports);var Qi=Te.exports;Object.defineProperty(d,"__esModule",{value:!0});function $i(r){return r&&typeof r=="object"&&"default"in r?r.default:r}var x=Xi,E=$i(x),Ye=Qi,B=new Ye,A=B.getBrowser(),er=B.getCPU(),k=B.getDevice(),Pe=B.getEngine(),j=B.getOS(),$=B.getUA(),Ge=function(e){return B.setUA(e)},ee=function(e){if(!e){console.error("No userAgent string was provided");return}var i=new Ye(e);return{UA:i,browser:i.getBrowser(),cpu:i.getCPU(),device:i.getDevice(),engine:i.getEngine(),os:i.getOS(),ua:i.getUA(),setUserAgent:function(t){return i.setUA(t)}}},Ze=Object.freeze({ClientUAInstance:B,browser:A,cpu:er,device:k,engine:Pe,os:j,ua:$,setUa:Ge,parseUserAgent:ee});function Re(r,e){var i=Object.keys(r);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(r);e&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(r,t).enumerable})),i.push.apply(i,n)}return i}function ir(r){for(var e=1;e<arguments.length;e++){var i=arguments[e]!=null?arguments[e]:{};e%2?Re(Object(i),!0).forEach(function(n){tr(r,n,i[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(i)):Re(Object(i)).forEach(function(n){Object.defineProperty(r,n,Object.getOwnPropertyDescriptor(i,n))})}return r}function Q(r){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?Q=function(e){return typeof e}:Q=function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Q(r)}function rr(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")}function ze(r,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function nr(r,e,i){return e&&ze(r.prototype,e),i&&ze(r,i),r}function tr(r,e,i){return e in r?Object.defineProperty(r,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):r[e]=i,r}function Se(){return Se=Object.assign||function(r){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(r[n]=i[n])}return r},Se.apply(this,arguments)}function ar(r,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function");r.prototype=Object.create(e&&e.prototype,{constructor:{value:r,writable:!0,configurable:!0}}),e&&Ae(r,e)}function xe(r){return xe=Object.setPrototypeOf?Object.getPrototypeOf:function(i){return i.__proto__||Object.getPrototypeOf(i)},xe(r)}function Ae(r,e){return Ae=Object.setPrototypeOf||function(n,t){return n.__proto__=t,n},Ae(r,e)}function or(r,e){if(r==null)return{};var i={},n=Object.keys(r),t,c;for(c=0;c<n.length;c++)t=n[c],!(e.indexOf(t)>=0)&&(i[t]=r[t]);return i}function C(r,e){if(r==null)return{};var i=or(r,e),n,t;if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(r);for(t=0;t<c.length;t++)n=c[t],!(e.indexOf(n)>=0)&&Object.prototype.propertyIsEnumerable.call(r,n)&&(i[n]=r[n])}return i}function de(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function sr(r,e){if(e&&(typeof e=="object"||typeof e=="function"))return e;if(e!==void 0)throw new TypeError("Derived constructors may only return object or undefined");return de(r)}function lr(r,e){return ur(r)||dr(r,e)||cr(r,e)||br()}function ur(r){if(Array.isArray(r))return r}function dr(r,e){var i=r==null?null:typeof Symbol<"u"&&r[Symbol.iterator]||r["@@iterator"];if(i!=null){var n=[],t=!0,c=!1,y,T;try{for(i=i.call(r);!(t=(y=i.next()).done)&&(n.push(y.value),!(e&&n.length===e));t=!0);}catch(M){c=!0,T=M}finally{try{!t&&i.return!=null&&i.return()}finally{if(c)throw T}}return n}}function cr(r,e){if(r){if(typeof r=="string")return qe(r,e);var i=Object.prototype.toString.call(r).slice(8,-1);if(i==="Object"&&r.constructor&&(i=r.constructor.name),i==="Map"||i==="Set")return Array.from(r);if(i==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i))return qe(r,e)}}function qe(r,e){(e==null||e>r.length)&&(e=r.length);for(var i=0,n=new Array(e);i<e;i++)n[i]=r[i];return n}function br(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var S={Mobile:"mobile",Tablet:"tablet",SmartTv:"smarttv",Console:"console",Wearable:"wearable",Embedded:"embedded",Browser:void 0},P={Chrome:"Chrome",Firefox:"Firefox",Opera:"Opera",Yandex:"Yandex",Safari:"Safari",InternetExplorer:"Internet Explorer",Edge:"Edge",Chromium:"Chromium",Ie:"IE",MobileSafari:"Mobile Safari",EdgeChromium:"Edge Chromium",MIUI:"MIUI Browser",SamsungBrowser:"Samsung Browser"},H={IOS:"iOS",Android:"Android",WindowsPhone:"Windows Phone",Windows:"Windows",MAC_OS:"Mac OS"},mr={isMobile:!1,isTablet:!1,isBrowser:!1,isSmartTV:!1,isConsole:!1,isWearable:!1},vr=function(e){switch(e){case S.Mobile:return{isMobile:!0};case S.Tablet:return{isTablet:!0};case S.SmartTv:return{isSmartTV:!0};case S.Console:return{isConsole:!0};case S.Wearable:return{isWearable:!0};case S.Browser:return{isBrowser:!0};case S.Embedded:return{isEmbedded:!0};default:return mr}},wr=function(e){return Ge(e)},b=function(e){var i=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"none";return e||i},Me=function(){return typeof window<"u"&&(window.navigator||navigator)?window.navigator||navigator:!1},Ve=function(e){var i=Me();return i&&i.platform&&(i.platform.indexOf(e)!==-1||i.platform==="MacIntel"&&i.maxTouchPoints>1&&!window.MSStream)},pr=function(e,i,n,t,c){return{isBrowser:e,browserMajorVersion:b(i.major),browserFullVersion:b(i.version),browserName:b(i.name),engineName:b(n.name),engineVersion:b(n.version),osName:b(t.name),osVersion:b(t.version),userAgent:b(c)}},He=function(e,i,n,t){return ir({},e,{vendor:b(i.vendor),model:b(i.model),os:b(n.name),osVersion:b(n.version),ua:b(t)})},fr=function(e,i,n,t){return{isSmartTV:e,engineName:b(i.name),engineVersion:b(i.version),osName:b(n.name),osVersion:b(n.version),userAgent:b(t)}},gr=function(e,i,n,t){return{isConsole:e,engineName:b(i.name),engineVersion:b(i.version),osName:b(n.name),osVersion:b(n.version),userAgent:b(t)}},hr=function(e,i,n,t){return{isWearable:e,engineName:b(i.name),engineVersion:b(i.version),osName:b(n.name),osVersion:b(n.version),userAgent:b(t)}},yr=function(e,i,n,t,c){return{isEmbedded:e,vendor:b(i.vendor),model:b(i.model),engineName:b(n.name),engineVersion:b(n.version),osName:b(t.name),osVersion:b(t.version),userAgent:b(c)}};function Or(r){var e=r?ee(r):Ze,i=e.device,n=e.browser,t=e.engine,c=e.os,y=e.ua,T=vr(i.type),M=T.isBrowser,Y=T.isMobile,D=T.isTablet,G=T.isSmartTV,o=T.isConsole,l=T.isWearable,a=T.isEmbedded;if(M)return pr(M,n,t,c,y);if(G)return fr(G,t,c,y);if(o)return gr(o,t,c,y);if(Y||D)return He(T,i,c,y);if(l)return hr(l,t,c,y);if(a)return yr(a,i,t,c,y)}var Ke=function(e){var i=e.type;return i===S.Mobile},Xe=function(e){var i=e.type;return i===S.Tablet},Je=function(e){var i=e.type;return i===S.Mobile||i===S.Tablet},Qe=function(e){var i=e.type;return i===S.SmartTv},ce=function(e){var i=e.type;return i===S.Browser},$e=function(e){var i=e.type;return i===S.Wearable},ei=function(e){var i=e.type;return i===S.Console},ii=function(e){var i=e.type;return i===S.Embedded},ri=function(e){var i=e.vendor;return b(i)},ni=function(e){var i=e.model;return b(i)},ti=function(e){var i=e.type;return b(i,"browser")},ai=function(e){var i=e.name;return i===H.Android},oi=function(e){var i=e.name;return i===H.Windows},si=function(e){var i=e.name;return i===H.MAC_OS},li=function(e){var i=e.name;return i===H.WindowsPhone},ui=function(e){var i=e.name;return i===H.IOS},di=function(e){var i=e.version;return b(i)},ci=function(e){var i=e.name;return b(i)},bi=function(e){var i=e.name;return i===P.Chrome},mi=function(e){var i=e.name;return i===P.Firefox},vi=function(e){var i=e.name;return i===P.Chromium},be=function(e){var i=e.name;return i===P.Edge},wi=function(e){var i=e.name;return i===P.Yandex},pi=function(e){var i=e.name;return i===P.Safari||i===P.MobileSafari},fi=function(e){var i=e.name;return i===P.MobileSafari},gi=function(e){var i=e.name;return i===P.Opera},hi=function(e){var i=e.name;return i===P.InternetExplorer||i===P.Ie},yi=function(e){var i=e.name;return i===P.MIUI},Oi=function(e){var i=e.name;return i===P.SamsungBrowser},Ei=function(e){var i=e.version;return b(i)},Ti=function(e){var i=e.major;return b(i)},Si=function(e){var i=e.name;return b(i)},xi=function(e){var i=e.name;return b(i)},Ai=function(e){var i=e.version;return b(i)},Pi=function(){var e=Me(),i=e&&e.userAgent&&e.userAgent.toLowerCase();return typeof i=="string"?/electron/.test(i):!1},q=function(e){return typeof e=="string"&&e.indexOf("Edg/")!==-1},Mi=function(){var e=Me();return e&&(/iPad|iPhone|iPod/.test(e.platform)||e.platform==="MacIntel"&&e.maxTouchPoints>1)&&!window.MSStream},U=function(){return Ve("iPad")},Vi=function(){return Ve("iPhone")},ki=function(){return Ve("iPod")},Ci=function(e){return b(e)};function Ii(r){var e=r||Ze,i=e.device,n=e.browser,t=e.os,c=e.engine,y=e.ua;return{isSmartTV:Qe(i),isConsole:ei(i),isWearable:$e(i),isEmbedded:ii(i),isMobileSafari:fi(n)||U(),isChromium:vi(n),isMobile:Je(i)||U(),isMobileOnly:Ke(i),isTablet:Xe(i)||U(),isBrowser:ce(i),isDesktop:ce(i),isAndroid:ai(t),isWinPhone:li(t),isIOS:ui(t)||U(),isChrome:bi(n),isFirefox:mi(n),isSafari:pi(n),isOpera:gi(n),isIE:hi(n),osVersion:di(t),osName:ci(t),fullBrowserVersion:Ei(n),browserVersion:Ti(n),browserName:Si(n),mobileVendor:ri(i),mobileModel:ni(i),engineName:xi(c),engineVersion:Ai(c),getUA:Ci(y),isEdge:be(n)||q(y),isYandex:wi(n),deviceType:ti(i),isIOS13:Mi(),isIPad13:U(),isIPhone13:Vi(),isIPod13:ki(),isElectron:Pi(),isEdgeChromium:q(y),isLegacyEdge:be(n)&&!q(y),isWindows:oi(t),isMacOs:si(t),isMIUI:yi(n),isSamsungBrowser:Oi(n)}}var Wi=Qe(k),_i=ei(k),Ni=$e(k),Er=ii(k),Tr=fi(A)||U(),Sr=vi(A),me=Je(k)||U(),Ui=Ke(k),Fi=Xe(k)||U(),Bi=ce(k),xr=ce(k),ji=ai(j),Li=li(j),Di=ui(j)||U(),Ar=bi(A),Pr=mi(A),Mr=pi(A),Vr=gi(A),Ri=hi(A),kr=di(j),Cr=ci(j),Ir=Ei(A),Wr=Ti(A),_r=Si(A),Nr=ri(k),Ur=ni(k),Fr=xi(Pe),Br=Ai(Pe),jr=Ci($),Lr=be(A)||q($),Dr=wi(A),Rr=ti(k),zr=Mi(),qr=U(),Hr=Vi(),Yr=ki(),Gr=Pi(),Zr=q($),Kr=be(A)&&!q($),Xr=oi(j),Jr=si(j),Qr=yi(A),$r=Oi(A),en=function(e){if(!e||typeof e!="string"){console.error("No valid user agent string was provided");return}var i=ee(e),n=i.device,t=i.browser,c=i.os,y=i.engine,T=i.ua;return Ii({device:n,browser:t,os:c,engine:y,ua:T})},rn=function(e){var i=e.renderWithFragment,n=e.children,t=C(e,["renderWithFragment","children"]);return ji?i?E.createElement(x.Fragment,null,n):E.createElement("div",t,n):null},nn=function(e){var i=e.renderWithFragment,n=e.children,t=C(e,["renderWithFragment","children"]);return Bi?i?E.createElement(x.Fragment,null,n):E.createElement("div",t,n):null},tn=function(e){var i=e.renderWithFragment,n=e.children,t=C(e,["renderWithFragment","children"]);return Ri?i?E.createElement(x.Fragment,null,n):E.createElement("div",t,n):null},an=function(e){var i=e.renderWithFragment,n=e.children,t=C(e,["renderWithFragment","children"]);return Di?i?E.createElement(x.Fragment,null,n):E.createElement("div",t,n):null},on=function(e){var i=e.renderWithFragment,n=e.children,t=C(e,["renderWithFragment","children"]);return me?i?E.createElement(x.Fragment,null,n):E.createElement("div",t,n):null},sn=function(e){var i=e.renderWithFragment,n=e.children,t=C(e,["renderWithFragment","children"]);return Fi?i?E.createElement(x.Fragment,null,n):E.createElement("div",t,n):null},ln=function(e){var i=e.renderWithFragment,n=e.children,t=C(e,["renderWithFragment","children"]);return Li?i?E.createElement(x.Fragment,null,n):E.createElement("div",t,n):null},un=function(e){var i=e.renderWithFragment,n=e.children;e.viewClassName,e.style;var t=C(e,["renderWithFragment","children","viewClassName","style"]);return Ui?i?E.createElement(x.Fragment,null,n):E.createElement("div",t,n):null},dn=function(e){var i=e.renderWithFragment,n=e.children,t=C(e,["renderWithFragment","children"]);return Wi?i?E.createElement(x.Fragment,null,n):E.createElement("div",t,n):null},cn=function(e){var i=e.renderWithFragment,n=e.children,t=C(e,["renderWithFragment","children"]);return _i?i?E.createElement(x.Fragment,null,n):E.createElement("div",t,n):null},bn=function(e){var i=e.renderWithFragment,n=e.children,t=C(e,["renderWithFragment","children"]);return Ni?i?E.createElement(x.Fragment,null,n):E.createElement("div",t,n):null},mn=function(e){var i=e.renderWithFragment,n=e.children;e.viewClassName,e.style;var t=e.condition,c=C(e,["renderWithFragment","children","viewClassName","style","condition"]);return t?i?E.createElement(x.Fragment,null,n):E.createElement("div",c,n):null};function vn(r){return function(e){ar(i,e);function i(n){var t;return rr(this,i),t=sr(this,xe(i).call(this,n)),t.isEventListenerAdded=!1,t.handleOrientationChange=t.handleOrientationChange.bind(de(t)),t.onOrientationChange=t.onOrientationChange.bind(de(t)),t.onPageLoad=t.onPageLoad.bind(de(t)),t.state={isLandscape:!1,isPortrait:!1},t}return nr(i,[{key:"handleOrientationChange",value:function(){this.isEventListenerAdded||(this.isEventListenerAdded=!0);var t=window.innerWidth>window.innerHeight?90:0;this.setState({isPortrait:t===0,isLandscape:t===90})}},{key:"onOrientationChange",value:function(){this.handleOrientationChange()}},{key:"onPageLoad",value:function(){this.handleOrientationChange()}},{key:"componentDidMount",value:function(){(typeof window>"u"?"undefined":Q(window))!==void 0&&me&&(this.isEventListenerAdded?window.removeEventListener("load",this.onPageLoad,!1):(this.handleOrientationChange(),window.addEventListener("load",this.onPageLoad,!1)),window.addEventListener("resize",this.onOrientationChange,!1))}},{key:"componentWillUnmount",value:function(){window.removeEventListener("resize",this.onOrientationChange,!1)}},{key:"render",value:function(){return E.createElement(r,Se({},this.props,{isLandscape:this.state.isLandscape,isPortrait:this.state.isPortrait}))}}]),i}(E.Component)}function wn(){var r=x.useState(function(){var c=window.innerWidth>window.innerHeight?90:0;return{isPortrait:c===0,isLandscape:c===90,orientation:c===0?"portrait":"landscape"}}),e=lr(r,2),i=e[0],n=e[1],t=x.useCallback(function(){var c=window.innerWidth>window.innerHeight?90:0,y={isPortrait:c===0,isLandscape:c===90,orientation:c===0?"portrait":"landscape"};i.orientation!==y.orientation&&n(y)},[i.orientation]);return x.useEffect(function(){return(typeof window>"u"?"undefined":Q(window))!==void 0&&me&&(t(),window.addEventListener("load",t,!1),window.addEventListener("resize",t,!1)),function(){window.removeEventListener("resize",t,!1),window.removeEventListener("load",t,!1)}},[t]),i}function zi(r){var e=r||window.navigator.userAgent;return ee(e)}function pn(r){var e=r||window.navigator.userAgent,i=zi(e),n=Ii(i);return[n,i]}d.AndroidView=rn;d.BrowserTypes=P;var hn=d.BrowserView=nn;d.ConsoleView=cn;d.CustomView=mn;d.IEView=tn;d.IOSView=an;d.MobileOnlyView=un;var yn=d.MobileView=on;d.OsTypes=H;d.SmartTVView=dn;d.TabletView=sn;d.WearableView=bn;d.WinPhoneView=ln;d.browserName=_r;d.browserVersion=Wr;d.deviceDetect=Or;d.deviceType=Rr;d.engineName=Fr;d.engineVersion=Br;d.fullBrowserVersion=Ir;d.getSelectorsByUserAgent=en;d.getUA=jr;d.isAndroid=ji;d.isBrowser=Bi;d.isChrome=Ar;d.isChromium=Sr;d.isConsole=_i;d.isDesktop=xr;d.isEdge=Lr;d.isEdgeChromium=Zr;d.isElectron=Gr;d.isEmbedded=Er;d.isFirefox=Pr;d.isIE=Ri;d.isIOS=Di;d.isIOS13=zr;d.isIPad13=qr;d.isIPhone13=Hr;d.isIPod13=Yr;d.isLegacyEdge=Kr;d.isMIUI=Qr;d.isMacOs=Jr;var On=d.isMobile=me;d.isMobileOnly=Ui;d.isMobileSafari=Tr;d.isOpera=Vr;d.isSafari=Mr;d.isSamsungBrowser=$r;d.isSmartTV=Wi;d.isTablet=Fi;d.isWearable=Ni;d.isWinPhone=Li;d.isWindows=Xr;d.isYandex=Dr;d.mobileModel=Ur;d.mobileVendor=Nr;d.osName=Cr;d.osVersion=kr;d.parseUserAgent=ee;d.setUserAgent=wr;d.useDeviceData=zi;d.useDeviceSelectors=pn;d.useMobileOrientation=wn;d.withOrientationChange=vn;var qi={exports:{}};/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/(function(r){(function(){var e={}.hasOwnProperty;function i(){for(var n=[],t=0;t<arguments.length;t++){var c=arguments[t];if(c){var y=typeof c;if(y==="string"||y==="number")n.push(c);else if(Array.isArray(c)){if(c.length){var T=i.apply(null,c);T&&n.push(T)}}else if(y==="object"){if(c.toString!==Object.prototype.toString&&!c.toString.toString().includes("[native code]")){n.push(c.toString());continue}for(var M in c)e.call(c,M)&&c[M]&&n.push(M)}}}return n.join(" ")}r.exports?(i.default=i,r.exports=i):window.classNames=i})()})(qi);var fn=qi.exports;const En=Ji(fn);export{hn as B,yn as M,En as c,On as i};
