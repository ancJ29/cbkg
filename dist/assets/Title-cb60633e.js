import{a as d,f as y,u as z,j as S,R as $,B as T,l as R}from"./index-db117989.js";const b=["h1","h2","h3","h4","h5","h6"];function w(t,n){const e=n!==void 0?n:`h${t}`;return b.includes(e)?{fontSize:`var(--mantine-${e}-font-size)`,fontWeight:`var(--mantine-${e}-font-weight)`,lineHeight:`var(--mantine-${e}-line-height)`}:{fontSize:d(e),fontWeight:`var(--mantine-h${t}-font-weight)`,lineHeight:`var(--mantine-h${t}-line-height)`}}var o={root:"m-8a5d1357"};const H={order:1},N=R((t,{order:n,size:e,lineClamp:s})=>{const i=w(n,e);return{root:{"--title-fw":i.fontWeight,"--title-lh":i.lineHeight,"--title-fz":i.fontSize,"--title-line-clamp":typeof s=="number"?s.toString():void 0}}}),r=y((t,n)=>{const e=z("Title",H,t),{classNames:s,className:i,style:l,styles:h,unstyled:c,order:a,vars:m,size:f,variant:u,lineClamp:g,...v}=e,p=S({name:"Title",props:e,classes:o,className:i,style:l,classNames:s,styles:h,unstyled:c,vars:m,varsResolver:N});return[1,2,3,4,5,6].includes(a)?$.createElement(T,{...p("root"),component:`h${a}`,variant:u,ref:n,mod:{order:a,"data-line-clamp":typeof g=="number"},size:f,...v}):null});r.classes=o;r.displayName="@mantine/core/Title";export{r as T};