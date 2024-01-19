import{r as i,t,C as y,B as _,F as T,x as h,G as f}from"./index-db117989.js";import{E as S,u as V,A,C as L,a as P}from"./useToggleEditModal-19687ec9.js";import{T as I}from"./index-a90a0539.js";import{S as R}from"./index-28f715c5.js";import{u as j}from"./useTranslation-d9fa93c2.js";import{T as k}from"./index-83819ef0.js";import{u as v}from"./use-form-b89b14d2.js";import{S as w}from"./Stack-0cc441d2.js";import{T as p,B,C as E}from"./Card-23a5932e.js";import{M as W,a as z}from"./Modal-27160204.js";import"./index-4ee7a327.js";import"./CloseButton-9718e38f.js";import"./CheckIcon-ad231d07.js";import"./Group-29bf32ec.js";import"./Collapse-ccc789cf.js";import"./index-71492496.js";import"./index-4fa6584e.js";const G="_inputContainer_l9p3s_1",Q="_input_l9p3s_1",q="_classNameBox_l9p3s_6",H="_btn_l9p3s_23",C={inputContainer:G,input:Q,classNameBox:q,btn:H},J=({chain:e,onClose:s,updateChain:l})=>{const a=j(),[r,c]=i.useState(),o=v({initialValues:{id:(e==null?void 0:e.id)||"",name:(e==null?void 0:e.name)||""},transformValues:K,validate:{name:m=>!m&&a("Please enter name")}}),n=i.useCallback(async()=>{c(void 0);const m=await l(o.values);m?c(m):s&&s()},[l,o.values,s]);return t.jsx(t.Fragment,{children:t.jsxs(w,{gap:10,px:10,mt:10,children:[t.jsxs("div",{className:C.inputContainer,children:[t.jsxs(p,{children:[a("Name"),":"]}),t.jsx(k,{className:C.input,withAsterisk:!0,placeholder:a("Name"),onEnter:n,...o.getInputProps("name")})]}),t.jsx(S,{message:r}),t.jsx(y,{children:t.jsx(B,{onClick:n,className:C.btn,disabled:!o.values.name,type:"submit",children:a("Edit")})})]})})};function K(e){return{id:e.id.trim(),name:e.name.toString().trim()}}const O="_container_mow10_1",U="_tableWrapper_mow10_7",X="_header_mow10_11",Y="_item_mow10_18",Z="_label_mow10_28",ee="_itemDetail_mow10_32",x={container:O,tableWrapper:U,header:X,item:Y,label:Z,itemDetail:ee},te=({chains:e,deleteChain:s,updateChain:l})=>{const a=j(),[r,c]=i.useState({}),{close:o,opened:n,record:m,toggleEditModal:d}=V(),u=i.useMemo(()=>{var N;const g=((N=r.keyword)==null?void 0:N.toLocaleLowerCase())||"";return e.filter(F=>g?F.name.toLocaleLowerCase().includes(g):!0)},[e,r.keyword]),$=i.useMemo(()=>t.jsx(t.Fragment,{children:se(u,s,d,a)}),[u,s,a,d]),D=i.useMemo(M,[]);return t.jsxs(E,{withBorder:!0,shadow:"md",w:"100%",children:[t.jsx(p,{fz:16,fw:"bold",pb:5,className:"bdr-b",children:a("Chain list")}),t.jsx(R,{filter:r,setFilter:c,keys:[]}),t.jsx(I,{headers:D,dataLength:(u==null?void 0:u.length)||0,rows:$}),t.jsxs(W,{opened:n,onClose:o,title:a("Edit Chain"),centered:!0,size:"lg",classNames:{title:"font-bold"},children:[t.jsx("div",{className:"bdr-t"}),t.jsx(J,{chain:m,onClose:o,updateChain:l})]})]})},M=e=>[{style:{flex:2},label:"Name",value:e?t.jsxs(p,{children:[" ",e.name||"-"]}):""},{style:{flex:1},label:"Quantity",value:e?t.jsxs(p,{children:[" ",e.totalBranches||0]}):""}];function se(e,s,l,a){return e==null?void 0:e.map((r,c)=>t.jsxs(_,{className:x.item,children:[M(r).map(({label:o,style:n,value:m},d)=>t.jsxs(_,{className:x.itemDetail,style:n,children:[t.jsx(p,{className:x.label,children:a(o||"")}),m]},d)),t.jsxs(_,{className:x.itemDetail,children:[t.jsx(p,{className:x.label}),t.jsx(A,{title:a("Confirm"),description:`${a("Delete chain")} "${r.name}"`,onDelete:()=>s(r.id||""),onEdit:()=>l(r)})]})]},c))}const ae="_inputContainer_l9p3s_1",ne="_input_l9p3s_1",re="_classNameBox_l9p3s_6",oe="_btn_l9p3s_23",b={inputContainer:ae,input:ne,classNameBox:re,btn:oe},ie=({addChain:e})=>{const s=j(),[l,{close:a,open:r}]=z(!1),[c,o]=i.useState(),n=v({initialValues:{id:"",name:""},transformValues:le,validate:{name:d=>!d&&s("Please enter name")}}),m=i.useCallback(async d=>{o(void 0);const u=await e(d.name);u?o(u):n.reset()},[e,n]);return t.jsx(E,{withBorder:!0,shadow:"md",w:"100%",style:{overflow:"visible"},children:t.jsx(L,{title:s("Create chain"),children:t.jsxs("form",{onSubmit:n.onSubmit(r),children:[t.jsxs(w,{gap:10,px:10,mt:10,children:[t.jsxs("div",{className:b.inputContainer,children:[t.jsxs(p,{children:[s("Name"),":"]}),t.jsx(k,{className:b.input,withAsterisk:!0,placeholder:s("Name"),...n.getInputProps("name")})]}),t.jsx(S,{message:c}),t.jsx(y,{children:t.jsx(B,{type:"submit",className:b.btn,disabled:!n.isValid(),onClick:r,children:s("Create")})})]}),t.jsx(P,{title:s("Confirm"),description:`${s("Add Chain")} "${n.values.name}"`,open:n.isValid()&&l,onClose:a,onSave:()=>m(n.values)})]})})})};function le(e){return{id:e.id.trim(),name:e.name.toString().trim()}}const Me=()=>{const[e,s]=i.useState([]),{loadMetaData:l}=T(),a=i.useCallback((n=!1)=>{ce(n).then(s),l()},[l]),r=i.useCallback(n=>me(n,a),[a]),c=i.useCallback(n=>de(n,a),[a]),o=i.useCallback(n=>ue(n,a),[a]);return i.useEffect(()=>{a()},[a]),t.jsxs(w,{gap:10,bg:"gray.1",w:"100%",h:"100%",p:10,children:[t.jsx(ie,{addChain:r}),t.jsx(te,{chains:e,updateChain:c,deleteChain:o})]})};async function ce(e){const s=await h({action:"get-chains",params:{},options:{forceReload:e}});return(s==null?void 0:s.chains)||[]}async function me(e,s){return await h({action:"add-chain",params:{name:e.trim()}}).catch(()=>{f.error("Failed to add chain",{name:e})}),s(!1),""}async function de(e,s){return await h({action:"update-chain",params:e}).catch(()=>{f.error("Failed to update chain",e)}),s(!1),""}async function ue(e,s){await h({action:"delete-chain",params:{id:e}}).catch(()=>{f.error("Failed to delete chain",{id:e})}),s(!0)}export{Me as default};
