import{t as a,E as s,F as I,r as h,B as i}from"./index-db117989.js";import{T as C,A as g}from"./index-00ddd9cb.js";import{T as p}from"./index-83819ef0.js";import{u as f}from"./useTranslation-d9fa93c2.js";import{u as b}from"./use-form-b89b14d2.js";import{S as x,F as l}from"./Stack-0cc441d2.js";import{B as j,C as N}from"./Card-23a5932e.js";import{P as S}from"./index-94ada444.js";import{S as m}from"./index-4ee7a327.js";import{i as $,c as y}from"./phone-number-949134fe.js";import{N as u,T as P,D as V,b as D}from"./DatePickerInput-19664968.js";import{c as Y,d as B}from"./index-182cb779.js";import"./Title-cb60633e.js";import"./CloseButton-9718e38f.js";import"./CheckIcon-ad231d07.js";import"./Modal-27160204.js";import"./AccordionChevron-4b7e97f1.js";const F=({onSubmit:e})=>{const n=f(),t=b({initialValues:T,validate:v,transformValues:w});return a.jsx("form",{onSubmit:t.onSubmit(e),children:a.jsxs(x,{gap:20,children:[a.jsx(C,{fz:20,className:"font-600",children:n("Please enter code")}),a.jsx(p,{label:`${n("Code")}:`,min:0,type:"number",...t.getInputProps("reservationCode")}),a.jsx(l,{fz:"0.8rem",justify:"space-between",children:a.jsx(j,{type:"submit",className:"w-full",disabled:!t.isValid(),children:"OK"})})]})})},T={reservationCode:""};function v(e){return{reservationCode:!e.reservationCode}}function w(e){var n;return{reservationCode:(n=e.reservationCode)==null?void 0:n.toString().trim()}}const M=({onSubmit:e})=>{const n=f(),t=b({initialValues:O,validate:R,transformValues:E}),{chainOptions:o,branchOptionsByChainId:c}=I(),d=h.useMemo(()=>c[t.values.chainId||""]||[],[c,t.values.chainId]);return a.jsx("form",{onSubmit:t.onSubmit(e),children:a.jsxs(x,{gap:20,children:[a.jsx(i,{children:a.jsx(m,{label:`${n("Select chains")}:`,placeholder:n("Select chains"),options:o,value:t.values.chainId||null,onChange:r=>t.setFieldValue("chainId",r)})}),a.jsx(i,{children:a.jsx(m,{disabled:d.length===0,placeholder:n("Select branches"),label:`${n("Select branches")}:`,options:d,value:t.values.branchId||null,onChange:r=>t.setFieldValue("branchId",r)})}),a.jsx(i,{children:a.jsx(S,{labelClassName:"font-600",label:`${n("Phone")}:`,placeholder:n("Phone"),value:t.values.phone,onChangeValue:r=>t.setFieldValue("phone",r)})}),a.jsx(i,{children:a.jsx(p,{label:`${n("Customer Name")}:`,placeholder:n("Customer Name"),labelClassName:"font-600",...t.getInputProps("contact")})}),a.jsxs(l,{gap:10,className:"w-full",children:[a.jsx(u,{label:`${n("Adult")}:`,min:0,max:100,classNames:{label:"text-16"},...t.getInputProps("adults")}),a.jsx(u,{label:`${n("Child")}:`,min:0,max:100,classNames:{label:"text-16"},...t.getInputProps("children")})]}),a.jsxs(l,{gap:10,className:"w-full",children:[a.jsx(P,{className:"w-full",label:n("Time"),placeholder:n("Time"),...t.getInputProps("time")}),a.jsx(V,{valueFormat:"DD/MM/YYYY",className:"w-full",label:n("Date"),...t.getInputProps("date"),minDate:s().toDate()})]}),a.jsx(D,{label:`${n("Note")}:`,placeholder:`${n("Note")}:`,...t.getInputProps("note")}),a.jsx(l,{fz:"0.8rem",justify:"space-between",children:a.jsx(j,{type:"submit",className:"w-full",disabled:!t.isValid(),children:"OK"})})]})})},O={contact:"",chainId:null,branchId:null,phone:"",children:void 0,adults:0,time:"",date:s(),note:""};function R(e){return{contact:!e.contact,phone:!$(e.phone),chainId:!e.chainId,branchId:!e.branchId,adults:!e.adults||e.adults===0,from:s(`${s(e.date).format("YYYY-MM-DD")} ${e.time}`).isBefore(s())}}function E(e){var n,t;return{branchId:e.branchId,contact:(n=e.contact)==null?void 0:n.toString().trim(),phone:y(e.phone),time:e.time,date:e.date,children:e.children||void 0,adults:e.adults||0,from:`${s(e.date).format("YYYY-MM-DD")} ${e.time}`,note:(t=e.note)==null?void 0:t.trim()}}const ae=()=>{const[e,n]=h.useState({});return a.jsx(g,{title:"BOOKING",children:a.jsx(N,{children:Object.keys(e).length===0?a.jsx(M,{onSubmit:async t=>{const o=await Y(t);o&&n({code:o.code,contact:t.contact,note:t.note})}}):a.jsx(F,{onSubmit:async t=>{const o={...e,reservationCode:t.reservationCode};await B(o)&&n({})}})})})};export{ae as default};