import{r,L as t}from"./index-c7e6a1d0.js";const s={error:(...n)=>{console.error(...n)},warn:(...n)=>{console.warn(...n)},info:(...n)=>{console.info(...n)},debug:(...n)=>{console.info(...n)}};function i(){const{dictionary:n}=r.useContext(t);return r.useCallback(o=>n[o]?n[o]:(s.warn("Missing translation",o),o),[n])}export{s as l,i as u};
