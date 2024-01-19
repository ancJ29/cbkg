import{f as C,u as w,R as r,B as E,j as _,l as $,a as O,g as k,m as S,t as s}from"./index-db117989.js";import{u as L}from"./useTranslation-d9fa93c2.js";import{i as Q,c as H}from"./index-71492496.js";import{S as X}from"./index-4fa6584e.js";import{c as Y}from"./Card-23a5932e.js";import{b as Z}from"./index-4ee7a327.js";const[ee,te]=Y("Table component was not found in the tree");var f={table:"m-b23fa0ef",th:"m-4e7aa4f3",tr:"m-4e7aa4fd",td:"m-4e7aa4ef",tbody:"m-b2404537",thead:"m-b242d975",caption:"m-9e5a3ac7",scrollContainer:"m-a100c15",scrollContainerInner:"m-62259741"};function ae(e,t){if(!t)return;const a={};return t.columnBorder&&e.withColumnBorders&&(a["data-with-column-border"]=!0),t.rowBorder&&e.withRowBorders&&(a["data-with-row-border"]=!0),t.striped&&e.striped&&(a["data-striped"]=e.striped),t.highlightOnHover&&e.highlightOnHover&&(a["data-hover"]=!0),t.captionSide&&e.captionSide&&(a["data-side"]=e.captionSide),t.stickyHeader&&e.stickyHeader&&(a["data-sticky"]=!0),a}function u(e,t){const a=`Table${e.charAt(0).toUpperCase()}${e.slice(1)}`,l=C((n,i)=>{const c=w(a,{},n),{classNames:d,className:p,style:b,styles:h,...m}=c,T=te();return r.createElement(E,{component:e,ref:i,...ae(T,t),...T.getStyles(e,{className:p,classNames:d,style:b,styles:h,props:c}),...m})});return l.displayName=`@mantine/core/${a}`,l.classes=f,l}const g=u("th",{columnBorder:!0}),D=u("td",{columnBorder:!0}),y=u("tr",{rowBorder:!0,striped:!0,highlightOnHover:!0}),P=u("thead",{stickyHeader:!0}),A=u("tbody"),F=u("tfoot"),z=u("caption",{captionSide:!0});function x({data:e}){return r.createElement(r.Fragment,null,e.caption&&r.createElement(z,null,e.caption),e.head&&r.createElement(P,null,r.createElement(y,null,e.head.map((t,a)=>r.createElement(g,{key:a},t)))),e.body&&r.createElement(A,null,e.body.map((t,a)=>r.createElement(y,{key:a},t.map((l,n)=>r.createElement(D,{key:n},l))))),e.foot&&r.createElement(F,null,r.createElement(y,null,e.foot.map((t,a)=>r.createElement(g,{key:a},t)))))}x.displayName="@mantine/core/TableDataRenderer";const re={type:"scrollarea"},oe=$((e,{minWidth:t,type:a})=>({scrollContainer:{"--table-min-width":O(t),"--table-overflow":a==="native"?"auto":void 0}})),j=C((e,t)=>{const a=w("TableScrollContainer",re,e),{classNames:l,className:n,style:i,styles:c,unstyled:d,vars:p,children:b,minWidth:h,type:m,...T}=a,v=_({name:"TableScrollContainer",classes:f,props:a,className:n,style:i,classNames:l,styles:c,unstyled:d,vars:p,varsResolver:oe,rootSelector:"scrollContainer"});return r.createElement(E,{component:m==="scrollarea"?Z:"div",...m==="scrollarea"?{offsetScrollbars:"x"}:{},ref:t,...v("scrollContainer"),...T},r.createElement("div",{...v("scrollContainerInner")},b))});j.classes=f;j.displayName="@mantine/core/TableScrollContainer";const le={withRowBorders:!0,verticalSpacing:7},se=$((e,{layout:t,captionSide:a,horizontalSpacing:l,verticalSpacing:n,borderColor:i,stripedColor:c,highlightOnHoverColor:d,striped:p,highlightOnHover:b,stickyHeaderOffset:h,stickyHeader:m})=>({table:{"--table-layout":t,"--table-caption-side":a,"--table-horizontal-spacing":k(l),"--table-vertical-spacing":k(n),"--table-border-color":i?S(i,e):void 0,"--table-striped-color":p&&c?S(c,e):void 0,"--table-highlight-on-hover-color":b&&d?S(d,e):void 0,"--table-sticky-header-offset":m?O(h):void 0}})),o=C((e,t)=>{const a=w("Table",le,e),{classNames:l,className:n,style:i,styles:c,unstyled:d,vars:p,horizontalSpacing:b,verticalSpacing:h,captionSide:m,stripedColor:T,highlightOnHoverColor:v,striped:B,highlightOnHover:I,withColumnBorders:M,withRowBorders:U,withTableBorder:V,borderColor:de,layout:me,variant:q,data:N,children:G,stickyHeader:J,stickyHeaderOffset:pe,...K}=a,R=_({name:"Table",props:a,className:n,style:i,classes:f,classNames:l,styles:c,unstyled:d,rootSelector:"table",vars:p,varsResolver:se});return r.createElement(ee,{value:{getStyles:R,stickyHeader:J,striped:B===!0?"odd":B||void 0,highlightOnHover:I,withColumnBorders:M,withRowBorders:U,captionSide:m||"bottom"}},r.createElement(E,{component:"table",variant:q,ref:t,mod:{"data-with-table-border":V},...R("table"),...K},G||!!N&&r.createElement(x,{data:N})))});o.classes=f;o.displayName="@mantine/core/Table";o.Td=D;o.Th=g;o.Tr=y;o.Thead=P;o.Tbody=A;o.Tfoot=F;o.Caption=z;o.ScrollContainer=j;o.DataRenderer=x;const ne="_tableWrapper_1iuf6_1",ce="_header_1iuf6_7",W={tableWrapper:ne,header:ce},ie=({tableWrapperClassName:e,children:t})=>s.jsx(s.Fragment,{children:Q?s.jsx(s.Fragment,{children:t}):s.jsx(o.ScrollContainer,{minWidth:500,className:e,p:0,mt:20,w:"100%",children:t})}),ve=({headers:e,dataLength:t,rows:a,hasMore:l,handleScroll:n,headerClassName:i,tableWrapperClassName:c,haveAction:d=!0})=>{const p=L();return s.jsx(ie,{tableWrapperClassName:H(W.tableWrapper,c),children:s.jsxs(o,{pos:"relative",children:[s.jsx(o.Thead,{pos:"sticky",top:0,children:s.jsxs(o.Tr,{className:H(W.header,i),children:[e==null?void 0:e.map(({style:b,label:h},m)=>s.jsx(o.Th,{style:b,px:0,children:p(h)},m)),d&&s.jsx(o.Th,{style:{flex:1},children:" "})]})}),s.jsx(o.Tbody,{children:s.jsx(X,{dataLength:t,hasMore:l,handleScroll:n,rows:a})})]})})};export{ve as T};
