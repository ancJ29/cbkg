import{r as u}from"./index-c7e6a1d0.js";function i({value:t,defaultValue:r,finalValue:n,onChange:o=()=>{}}){const[l,s]=u.useState(r!==void 0?r:n),c=e=>{s(e),o==null||o(e)};return t!==void 0?[t,o,!0]:[l,c,!1]}export{i as u};