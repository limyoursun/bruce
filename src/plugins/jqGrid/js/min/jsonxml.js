!function(t,n){"use strict";"function"==typeof define&&define.amd?define(["jquery"],function(e){return n(e,t)}):"object"==typeof module&&module.exports?module.exports=function(e,t){return e||(e=window),void 0===t&&(t="undefined"!=typeof window?require("jquery"):require("jquery")(e)),n(t,e)}:n(jQuery,t)}("undefined"!=typeof window?window:this,function(a,e){"use strict";var t={xml2json:function(e,t){9===e.nodeType&&(e=e.documentElement);var n=this.removeWhite(e),i=this.toObj(n),r=this.toJson(i,e.nodeName,"\t");return"{\n"+t+(t?r.replace(/\t/g,t):r.replace(/\t|\n/g,""))+"\n}"},json2xml:function(e,t){var n,a=function(e,t,n){var i,r,o,l,s="";if(e instanceof Array)if(0===e.length)s+=n+"<"+t+">__EMPTY_ARRAY_</"+t+">\n";else for(i=0,r=e.length;i<r;i+=1)s+=n+a(e[i],t,n+"\t")+"\n";else if("object"==typeof e){for(l in o=!1,s+=n+"<"+t,e)e.hasOwnProperty(l)&&("@"===l.charAt(0)?s+=" "+l.substr(1)+'="'+e[l].toString()+'"':o=!0);if(s+=o?">":"/>",o){for(l in e)e.hasOwnProperty(l)&&("#text"===l?s+=e[l]:"#cdata"===l?s+="<![CDATA["+e[l]+"]]>":"@"!==l.charAt(0)&&(s+=a(e[l],l,n+"\t")));s+=("\n"===s.charAt(s.length-1)?n:"")+"</"+t+">"}}else"function"==typeof e?s+=n+"<"+t+"><![CDATA["+e+"]]></"+t+">":(void 0===e&&(e=""),'""'===e.toString()||0===e.toString().length?s+=n+"<"+t+">__EMPTY_STRING_</"+t+">":s+=n+"<"+t+">"+e.toString()+"</"+t+">");return s},i="";for(n in e)e.hasOwnProperty(n)&&(i+=a(e[n],n,""));return t?i.replace(/\t/g,t):i.replace(/\t|\n/g,"")},toObj:function(e){var t,n,i={},r=/function/i,o=0,l=0,s=!1;if(1===e.nodeType){if(e.attributes.length)for(t=0;t<e.attributes.length;t+=1)i["@"+e.attributes[t].nodeName]=(e.attributes[t].nodeValue||"").toString();if(e.firstChild){for(n=e.firstChild;n;n=n.nextSibling)1===n.nodeType?s=!0:3===n.nodeType&&n.nodeValue.match(/[^ \f\n\r\t\v]/)?o+=1:4===n.nodeType&&(l+=1);if(s)if(o<2&&l<2)for(this.removeWhite(e),n=e.firstChild;n;n=n.nextSibling)3===n.nodeType?i["#text"]=this.escape(n.nodeValue):4===n.nodeType?r.test(n.nodeValue)?i[n.nodeName]=[i[n.nodeName],n.nodeValue]:i["#cdata"]=this.escape(n.nodeValue):i[n.nodeName]?i[n.nodeName]instanceof Array?i[n.nodeName][i[n.nodeName].length]=this.toObj(n):i[n.nodeName]=[i[n.nodeName],this.toObj(n)]:i[n.nodeName]=this.toObj(n);else e.attributes.length?i["#text"]=this.escape(this.innerXml(e)):i=this.escape(this.innerXml(e));else if(o)e.attributes.length?i["#text"]=this.escape(this.innerXml(e)):"__EMPTY_ARRAY_"===(i=this.escape(this.innerXml(e)))?i="[]":"__EMPTY_STRING_"===i&&(i="");else if(l)if(1<l)i=this.escape(this.innerXml(e));else for(n=e.firstChild;n;n=n.nextSibling){if(r.test(e.firstChild.nodeValue)){i=e.firstChild.nodeValue;break}i["#cdata"]=this.escape(n.nodeValue)}}e.attributes.length||e.firstChild||(i=null)}else 9===e.nodeType?i=this.toObj(e.documentElement):(null!=a.jgrid&&null!=a.jgrid.defaults&&a.isFunction(a.jgrid.defaults.fatalError)?a.jgrid.defaults.fatalError:alert)("unhandled node type: "+e.nodeType);return i},toJson:function(e,t,n,i){void 0===i&&(i=!0);var r,o,l,s=t?'"'+t+'"':"",a="\t",d="\n",f=[],u=[];if(i||(d=a=""),"[]"===e)s+=t?":[]":"[]";else if(e instanceof Array){for(o=0,r=e.length;o<r;o+=1)f[o]=this.toJson(e[o],"",n+a,i);s+=(t?":[":"[")+(1<f.length?d+n+a+f.join(","+d+n+a)+d+n:f.join(""))+"]"}else if(null===e)s+=(t&&":")+"null";else if("object"==typeof e){for(l in e)e.hasOwnProperty(l)&&(u[u.length]=this.toJson(e[l],l,n+a,i));s+=(t?":{":"{")+(1<u.length?d+n+a+u.join(","+d+n+a)+d+n:u.join(""))+"}"}else s+="string"==typeof e?(t&&":")+'"'+e.replace(/\\/g,"\\\\").replace(/\"/g,'\\"')+'"':(t&&":")+e.toString();return s},innerXml:function(e){var t,n="",r=function(e){var t,n,i="";if(1===e.nodeType){for(i+="<"+e.nodeName,t=0;t<e.attributes.length;t+=1)i+=" "+e.attributes[t].nodeName+'="'+(e.attributes[t].nodeValue||"").toString()+'"';if(e.firstChild){for(i+=">",n=e.firstChild;n;n=n.nextSibling)i+=r(n);i+="</"+e.nodeName+">"}else i+="/>"}else 3===e.nodeType?i+=e.nodeValue:4===e.nodeType&&(i+="<![CDATA["+e.nodeValue+"]]>");return i};if(e.hasOwnProperty("innerHTML"))n=e.innerHTML;else for(t=e.firstChild;t;t=t.nextSibling)n+=r(t);return n},escape:function(e){return e.replace(/[\\]/g,"\\\\").replace(/[\"]/g,'\\"').replace(/[\n]/g,"\\n").replace(/[\r]/g,"\\r")},removeWhite:function(e){e.normalize();for(var t,n=e.firstChild;n;)n=3===n.nodeType?n.nodeValue.match(/[^ \f\n\r\t\v]/)?n.nextSibling:(t=n.nextSibling,e.removeChild(n),t):(1===n.nodeType&&this.removeWhite(n),n.nextSibling);return e}};return e.xmlJsonClass=t});
//# sourceMappingURL=jsonxml.js.map