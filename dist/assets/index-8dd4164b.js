import{D as i,r as l,x as r,B as m,C as c,A as t}from"./index-c7e6a1d0.js";import{c as u,P as d}from"./index-a8638e9f.js";import{a as p,A as x,b as h,T as w,G as g}from"./index-873d9018.js";import{u as j}from"./useTranslation-ee46f7e0.js";import{C as f,B as b,A as P}from"./Title-87b3dd82.js";import"./use-uncontrolled-20bccd72.js";const S=()=>{const s=j(),n=i(),a=p({initialValues:{username:"",password:""},validate:{username:e=>e.length<1?s("Please enter Username"):null,password:e=>e.length<1?s("Please enter Password"):null}}),o=l.useCallback(async e=>{try{await u({params:e,action:"register"}),n("/login")}catch{a.setErrors({name:"Email or password is incorrect.",password:"Email or password is incorrect."})}},[a,n]);return r.jsx(x,{children:r.jsxs(m,{children:[r.jsx(h,{children:s("Get your free c-booking account now")}),r.jsx(f,{withBorder:!0,shadow:"md",radius:10,p:"2rem",mt:"1rem",children:r.jsxs("form",{onSubmit:a.onSubmit(e=>o(e)),children:[r.jsx(w,{label:s("Username"),placeholder:s("Enter Username"),...a.getInputProps("username")}),r.jsx(d,{label:s("Password"),placeholder:s("Enter Password"),...a.getInputProps("password")}),r.jsx(g,{justify:"flex-start",mt:"xl",children:r.jsx(b,{w:"100%",type:"submit",children:s("Register")})})]})}),r.jsxs(c,{mt:"2rem",children:[s("Already have an account")," ? ",r.jsx(P,{href:"/login",underline:"never",children:s("Sign in")})]})]})})};t.object({username:t.string(),password:t.string()});export{S as default};
