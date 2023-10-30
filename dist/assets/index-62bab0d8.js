import{z as a,u as c,a as m,j as e}from"./index-83d751bd.js";import{c as d,P as p}from"./index-560aebf1.js";import{e as u,C as t,S as i,T as h,G as x,B as g,A as j,z as w}from"./zod-resolver-cb0ecd75.js";import{C as n}from"./Center-aaf3177a.js";const b=a.object({username:a.string().min(1,{message:"Please enter Username"}),password:a.string().min(1,{message:"Please enter Password"})}),f=w(b),R=()=>{const o=c(),s=u({initialValues:{username:"",password:""},validate:f}),l=m.useCallback(async r=>{try{await d({params:r,action:"register"}),o("/login")}catch{s.setErrors({name:"Email or password is incorrect.",password:"Email or password is incorrect."})}},[s,o]);return e.jsxs(t,{h:"100vh",size:"",bg:"var(--mantine-color-gray-light)",children:[e.jsx(t,{pt:"5rem",children:e.jsxs(t,{size:"xs",p:0,bg:"white",style:{borderRadius:"4px"},children:[e.jsx(n,{children:e.jsxs(i,{gap:"1rem",p:"2rem",children:[e.jsx(n,{fz:"1.4rem",children:"Free Register"}),e.jsx("div",{children:"Get your free c-booking account now"})]})}),e.jsx(i,{p:"2rem",children:e.jsxs("form",{onSubmit:s.onSubmit(r=>l(r)),children:[e.jsx(h,{label:"Username",placeholder:"Enter Username",...s.getInputProps("username")}),e.jsx(p,{label:"Password",placeholder:"Enter Password",...s.getInputProps("password")}),e.jsx(x,{justify:"flex-start",mt:"xl",children:e.jsx(g,{w:"100%",type:"submit",children:"Register"})})]})})]})}),e.jsxs(n,{mt:"2rem",children:["Already have an account ? ",e.jsx(j,{href:"/login",underline:"never",children:"Login"})]})]})};export{R as default};
