import{r as _,b as v,ae as A,af as I,p as T,u as x,j as N,K as U,ag as $,R as c,I as b,B as P,J as B,f as C,l as D,g as L}from"./index-db117989.js";function W({value:a,defaultValue:t,finalValue:e,onChange:s=()=>{}}){const[r,l]=_.useState(t!==void 0?t:e),n=o=>{l(o),s==null||s(o)};return a!==void 0?[a,s,!0]:[r,n,!1]}function X({classNames:a,styles:t,props:e,stylesCtx:s}){const r=v();return{resolvedClassNames:A({theme:r,classNames:a,props:e,stylesCtx:s||void 0}),resolvedStyles:I({theme:r,styles:t,props:e,stylesCtx:s||void 0})}}const V={gap:{type:"spacing",property:"gap"},rowGap:{type:"spacing",property:"rowGap"},columnGap:{type:"spacing",property:"columnGap"},align:{type:"identity",property:"alignItems"},justify:{type:"identity",property:"justifyContent"},wrap:{type:"identity",property:"flexWrap"},direction:{type:"identity",property:"flexDirection"}};var F={root:"m-8bffd616"};const J={},R=T((a,t)=>{const e=x("Flex",J,a),{classNames:s,className:r,style:l,styles:n,unstyled:o,vars:i,gap:u,rowGap:f,columnGap:S,align:y,justify:m,wrap:d,direction:E,...G}=e,h=N({name:"Flex",classes:F,props:e,className:r,style:l,classNames:s,styles:n,unstyled:o,vars:i}),w=v(),g=U(),p=$({styleProps:{gap:u,rowGap:f,columnGap:S,align:y,justify:m,wrap:d,direction:E},theme:w,data:V});return c.createElement(c.Fragment,null,p.hasResponsiveStyles&&c.createElement(b,{selector:`.${g}`,styles:p.styles,media:p.media}),c.createElement(P,{ref:t,...h("root",{className:g,style:B(p.inlineStyles)}),...G}))});R.classes=F;R.displayName="@mantine/core/Flex";var j={root:"m-6d731127"};const K={gap:"md",align:"stretch",justify:"flex-start"},M=D((a,{gap:t,align:e,justify:s})=>({root:{"--stack-gap":L(t),"--stack-align":e,"--stack-justify":s}})),k=C((a,t)=>{const e=x("Stack",K,a),{classNames:s,className:r,style:l,styles:n,unstyled:o,vars:i,align:u,justify:f,gap:S,variant:y,...m}=e,d=N({name:"Stack",props:e,classes:j,className:r,style:l,classNames:s,styles:n,unstyled:o,vars:i,varsResolver:M});return c.createElement(P,{ref:t,...d("root"),variant:y,...m})});k.classes=j;k.displayName="@mantine/core/Stack";export{R as F,k as S,X as a,W as u};
