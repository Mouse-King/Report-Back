(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[609],{356:function(e,r,s){(window.__NEXT_P=window.__NEXT_P||[]).push(["/ecrs/NewReportDialog",function(){return s(3921)}])},3921:function(e,r,s){"use strict";s.r(r);var n=s(5893),t=s(7294),i=s(657),l=s(7645),a=s(5861),o=s(3946),c=s(6580),u=s(6886),d=s(4054),h=s(1903),x=s(1425),Z=s(3321),p=s(9878),m=s(6501),j=s(1566);let f=e=>{let{open:r,handleClose:s,initialize:f}=e,[_,P]=(0,t.useState)(""),[g,v]=(0,t.useState)("");(0,t.useEffect)(()=>{r&&w()},[r]);let w=async()=>{P(""),v("")},C=async()=>{if(""===_.trim())m.ZP.error("Please enter a report name.");else if(""===g.trim())m.ZP.error("Please enter a report url.");else{let{data:e}=await j.Z.post("admin/report",{name:_,url:g});e.status?(m.ZP.success(e.msg),s(),f()):m.ZP.error(e.msg)}};return(0,n.jsxs)(i.Z,{fullWidth:!0,maxWidth:"sm",open:r,children:[(0,n.jsxs)(l.Z,{sx:{mb:3},children:[(0,n.jsx)(a.Z,{component:"span",variant:"h5",children:"New Report"}),(0,n.jsx)(o.Z,{onClick:s,sx:{position:"absolute",right:12,top:10,color:"#aaa"},children:(0,n.jsx)(p.Z,{icon:"mdi:close"})})]}),(0,n.jsx)(c.Z,{dividers:!0,children:(0,n.jsxs)(u.ZP,{container:!0,spacing:5,children:[(0,n.jsx)(u.ZP,{item:!0,md:12,xs:12,children:(0,n.jsx)(d.Z,{fullWidth:!0,children:(0,n.jsx)(h.Z,{label:"Report Name",size:"small",value:_,onChange:e=>P(e.target.value)})})}),(0,n.jsx)(u.ZP,{item:!0,xs:12,children:(0,n.jsx)(d.Z,{fullWidth:!0,children:(0,n.jsx)(h.Z,{label:"Report URL",size:"small",value:g,onChange:e=>v(e.target.value)})})})]})}),(0,n.jsxs)(x.Z,{sx:{pt:5},children:[(0,n.jsx)(Z.Z,{variant:"contained",onClick:C,children:"Create"}),(0,n.jsx)(Z.Z,{variant:"contained",color:"error",onClick:s,children:"Cancel"})]})]})};r.default=f}},function(e){e.O(0,[502,72,886,792,774,888,179],function(){return e(e.s=356)}),_N_E=e.O()}]);