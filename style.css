:root{--navy:#0a2a57;--blue:#1573c4;--sky:#e8f2fb;--red:#e32a30;--ink:#16304f;--mut:#5b6f88;--chat:400px;--banner:clamp(170px,30vh,330px)}
*{box-sizing:border-box;margin:0}
html,body{height:100%}
body{font-family:'Poppins',system-ui,sans-serif;color:var(--ink);background:#dbe9f6;overflow:hidden}
button{font:inherit;cursor:pointer;border:0;background:none;color:inherit}
:focus-visible{outline:3px solid #ffb400;outline-offset:2px}
.app{height:100%;display:grid;grid-template-rows:76px 1fr;grid-template-columns:1fr var(--chat);transition:grid-template-columns .45s ease}
.app.chat-closed{grid-template-columns:1fr 0}
.topbar{grid-column:1/-1;display:flex;align-items:center;gap:28px;padding:0 24px;background:#fff;box-shadow:0 2px 12px rgba(10,42,87,.12);position:relative;z-index:5}
.logo-btn{position:relative;display:flex;align-items:center;border-radius:12px;padding:4px}
.logo-btn img{height:56px;width:auto;display:block}
.topbar .logo-btn{animation:ring 2.4s ease-out 1.2s 2}
@keyframes ring{0%{box-shadow:0 0 0 0 rgba(21,115,196,.5)}100%{box-shadow:0 0 0 18px rgba(21,115,196,0)}}
.tip{position:absolute;left:0;top:calc(100% + 8px);white-space:nowrap;background:var(--navy);color:#fff;font-size:12px;padding:6px 12px;border-radius:8px;opacity:0;transform:translateY(-4px);pointer-events:none;transition:.25s}
.tip.show{opacity:1;transform:none}
.info{display:flex;gap:34px;margin-inline:auto}
.info>*{display:flex;align-items:center;gap:10px;text-decoration:none;color:inherit}
.info i{font-style:normal;width:34px;height:34px;border:1.5px solid #9db6d3;border-radius:50%;display:grid;place-items:center;font-size:15px}
.info b{display:block;font-size:13px;font-weight:600}.info small{font-size:11px;color:var(--mut)}
.sos{display:flex;align-items:center;gap:10px;background:linear-gradient(#f0383d,#d41f26);color:#fff;text-decoration:none;padding:9px 20px;border-radius:12px;font-size:13px;box-shadow:0 4px 12px rgba(227,42,48,.4)}
.sos i{font-style:normal;font-size:24px}.sos b{display:block;font-size:14px;letter-spacing:.04em}
.portal{position:relative;overflow:hidden;background:#0a2a57}
.portal::before{content:'';position:absolute;inset:0 0 auto 0;height:var(--banner);background:var(--hero,none) center 35%/cover no-repeat,#3a82c6}
.portal::after{content:'';position:absolute;left:0;right:0;top:calc(var(--banner) - 80px);height:80px;background:linear-gradient(180deg,rgba(10,42,87,0),#0a2a57)}
.hero{height:100%;display:flex;flex-direction:column;justify-content:flex-end;gap:16px;padding:24px 28px 22px;max-width:980px}
.hero-text{color:#fff;text-shadow:0 2px 10px rgba(0,0,0,.35)}
.w{font-size:clamp(20px,2.2vw,28px);font-weight:500}
h1{font-size:clamp(38px,5vw,64px);font-weight:800;line-height:1;letter-spacing:.01em}
h1 em{font-style:normal;color:#4fa8f0}
h2{font-size:clamp(18px,2vw,26px);font-weight:600;margin:6px 0 14px}
.sub{font-size:14px;line-height:1.5;max-width:520px}.sub b{display:block;font-size:16px;font-weight:600;margin-bottom:2px}
.actions{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
.card{display:flex;align-items:center;gap:12px;background:rgba(255,255,255,.96);border-radius:14px;padding:12px 14px;text-align:left;min-height:84px;box-shadow:0 6px 18px rgba(6,30,70,.22);transition:transform .2s,box-shadow .2s}
.card:hover{transform:translateY(-3px);box-shadow:0 10px 24px rgba(6,30,70,.3)}
.card i{flex:none;width:46px;height:46px;border-radius:12px;background:var(--sky);display:grid;place-items:center;font-size:24px;font-style:normal}
.card span{flex:1}.card b{display:block;font-size:14px;font-weight:600;color:var(--navy);line-height:1.2}.card small{font-size:11px;color:var(--mut);line-height:1.3;display:block;margin-top:2px}
.card u{text-decoration:none;flex:none;width:24px;height:24px;border-radius:50%;background:var(--sky);color:var(--blue);display:grid;place-items:center;font-size:18px;line-height:1}
.card.emergency i,.card.emergency u{background:#fde4e5;color:var(--red)}
.strip{list-style:none;display:flex;background:rgba(10,42,87,.92);border-radius:18px;padding:12px 6px;color:#fff;font-size:11px;line-height:1.3}
.strip li{flex:1;display:flex;align-items:center;justify-content:center;gap:10px;border-inline-end:1px solid rgba(255,255,255,.2)}
.strip li:last-child{border:0}.strip i{font-style:normal;font-size:20px}
.chat{background:#fff;display:flex;flex-direction:column;overflow:hidden;min-width:0;box-shadow:-6px 0 24px rgba(6,30,70,.2);visibility:hidden;transition:visibility 0s .45s}
.app:not(.chat-closed) .chat{visibility:visible;transition:none}
.chat-head{display:flex;align-items:center;gap:12px;padding:12px 16px;background:var(--navy);color:#fff}
.chat-head .logo-btn{background:#fff;border-radius:50%;padding:5px}.chat-head img{height:38px;width:38px;object-fit:contain}
.chat-head div{flex:1;line-height:1.2}.chat-head strong{font-size:15px;letter-spacing:.03em}.chat-head small{display:block;font-size:12px;opacity:.8}
.lang{display:flex;align-items:center;gap:4px;border:1px solid rgba(255,255,255,.5);border-radius:20px;padding:4px 8px;font-size:13px}
.lang select{background:none;border:0;color:#fff;font:inherit;font-weight:600}.lang option{color:#000}
.x{font-size:16px;padding:6px;opacity:.85}
.alert{background:#fde4e5;color:#9b1218;padding:10px 16px;font-size:13px}.alert a{color:inherit;font-weight:700}
.embed{flex:1;min-height:0;position:relative}
.embed>:not(.feed):not(.chips2):not(.comp){width:100%!important;height:100%!important}
.voice{display:flex;align-items:center;gap:10px;padding:10px 14px;border-top:1px solid #e3ebf4;font-size:12px;color:var(--mut)}
.voice label{margin-inline-start:auto;display:flex;gap:4px;align-items:center;cursor:pointer}
.mic{width:44px;height:44px;border-radius:50%;background:var(--blue);color:#fff;font-size:20px;box-shadow:0 4px 12px rgba(21,115,196,.45)}
.mic.on{background:var(--red);animation:ring 1.2s infinite}
[dir=rtl] .card{text-align:right}[dir=rtl] .card u{transform:scaleX(-1)}[dir=rtl] body,[dir=rtl] h1,[dir=rtl] h2{font-family:'Tajawal','Poppins',sans-serif}
@media(max-width:1100px){.info{display:none}.topbar{justify-content:space-between}:root{--chat:360px}}
@media(max-width:820px){body{overflow:auto}.app{display:block;height:auto}.topbar{height:68px}.portal{min-height:calc(100vh - 68px)}.actions{grid-template-columns:1fr 1fr}.strip{flex-wrap:wrap;row-gap:10px}.strip li{flex:1 1 45%;border:0}
.chat{position:fixed;inset:68px 0 0 0;z-index:9}.app.chat-closed .chat{display:none}.sos span{font-size:0}.sos b{font-size:12px}}
@media(max-width:520px){.actions{grid-template-columns:1fr}}
@media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}

.embed{display:flex;flex-direction:column}
.feed{flex:1;overflow:auto;padding:16px;display:flex;flex-direction:column;gap:10px;background:#f6f9fd}
.m{max-width:85%;padding:10px 14px;border-radius:16px;font-size:14px;line-height:1.5;white-space:pre-line}
.m.bot{background:#fff;border:1px solid #dde7f2;border-end-start-radius:4px;align-self:flex-start}
.m.me{background:#e3efff;align-self:flex-end;border-end-end-radius:4px}
.m.dots{color:var(--mut);letter-spacing:2px}
.chips2{display:flex;flex-wrap:wrap;gap:8px;padding:8px 14px;background:#f6f9fd}
.chips2 button{border:1px solid #bcd3ea;background:#fff;color:var(--navy);border-radius:20px;padding:6px 12px;font-size:12px;font-weight:500}
.chips2 button:hover{background:var(--sky)}
.comp{display:flex;gap:8px;padding:10px 14px;border-top:1px solid #e3ebf4}
.comp input{flex:1;border:1px solid #cfdceb;border-radius:22px;padding:10px 16px;font:inherit;font-size:14px}
.comp button{width:44px;height:44px;border-radius:50%;background:var(--blue);color:#fff;font-size:18px}

.brand{display:flex;flex-direction:column;margin-inline-start:10px;text-align:start;line-height:1.15}.brand strong{font-size:22px;font-weight:800;color:var(--navy);letter-spacing:.01em}.brand em{font-style:normal;color:var(--blue)}.brand small{font-size:11px;color:var(--mut)}.topbar .logo-btn img{height:58px;width:58px;border-radius:50%}@media(max-width:520px){.brand small{display:none}.brand strong{font-size:17px}}

[hidden]{display:none!important}
.ar{font-family:'Tajawal','Poppins',sans-serif;direction:rtl;unicode-bidi:isolate}
small.ar,.info small.ar{display:block;font-size:11px;color:var(--mut)}
.hero{position:relative;z-index:1;justify-content:flex-start;gap:12px;padding:calc(var(--banner) + 4px) 28px 16px;max-width:1040px;overflow-y:auto;scrollbar-width:thin}
.hero-text{display:flex;flex-direction:column;gap:2px}
.w{font-size:15px;font-weight:500;display:flex;gap:10px;align-items:baseline}.w .ar{font-size:15px;opacity:.9}
.name{display:flex;flex-direction:column;line-height:1.05;margin:2px 0 4px}
.name .ar{font-size:clamp(22px,2.4vw,32px);font-weight:800}
h1{font-size:clamp(32px,3.8vw,52px);font-weight:800;letter-spacing:.02em}
h2{font-size:clamp(15px,1.5vw,19px);font-weight:600;margin:0 0 6px;display:flex;gap:12px;align-items:baseline;flex-wrap:wrap}h2 .ar{font-size:.9em;font-weight:500;opacity:.9}
.sub{font-size:13px;line-height:1.45;max-width:720px}.sub b{font-size:14px}.sub .ar{display:block;margin-top:2px;font-size:13px;opacity:.9}
.card{min-height:0;padding:10px 12px}.card i{width:44px;height:44px}
.card b{font-size:14px;line-height:1.25}.card b.ar{font-size:13px;font-weight:700;color:var(--blue)}
.card small{font-size:11px;line-height:1.3}.card small.ar{font-size:11px;color:var(--mut)}
.strip{padding:10px 6px}.strip span{display:block}.strip small.ar{font-size:11px;opacity:.85;margin-top:1px;color:#fff}
.sos em{display:block;font-style:normal;font-size:12px;line-height:1.1}.sos{line-height:1.2}
.topbar .info small.ar{line-height:1.2}.info b{line-height:1.2}
.chat-head small.ar{font-size:11px;opacity:.75}
.alert{display:flex;gap:10px;align-items:flex-start;justify-content:space-between}.alert button{font-size:14px;color:#9b1218;padding:2px 4px}.alert .ar{font-size:12px}
.voice label span{opacity:.8}
.comp input{background:#fff;color:var(--ink);height:44px}
.feed{min-height:0}
.launcher{position:fixed;right:max(20px,env(safe-area-inset-right));bottom:max(20px,env(safe-area-inset-bottom));z-index:20;background:#fff;border-radius:40px;padding:8px 20px;box-shadow:0 10px 30px rgba(6,30,70,.35),0 0 0 1.5px rgba(21,115,196,.25);display:flex;align-items:center;transition:transform .2s,box-shadow .2s}
.launcher:hover{transform:translateY(-3px);box-shadow:0 14px 34px rgba(6,30,70,.45),0 0 0 2px rgba(21,115,196,.5)}
.launcher img{height:46px;width:auto;display:block}
.launcher .dot{position:absolute;top:2px;right:6px;width:13px;height:13px;border-radius:50%;background:#22b35b;border:2px solid #fff}
.launcher .tip{top:auto;bottom:calc(100% + 10px);left:auto;right:0}
.app:not(.chat-closed) .launcher{display:none}
@media(max-width:520px){.launcher img{height:38px}.launcher{padding:6px 14px}}
.name .ar{align-self:flex-start;text-align:left}
.sub .ar,.w .ar,h2 .ar{text-align:left}
.voice{gap:8px;font-size:11.5px}.voice label{white-space:nowrap}.voice #status{flex:1;min-width:0}

/* --- round 3: robot kiosk tweaks --- */
:root{--banner:clamp(200px,37vh,420px)}
.topbar .logo-btn{cursor:default;animation:none}
.chat-head .logo-btn{cursor:default}
.portal::before{background-position:center 40%;filter:saturate(1.08) contrast(1.04)}
.portal::after{top:calc(var(--banner) - 36px);height:36px}
.hero{scrollbar-width:none}.hero::-webkit-scrollbar{display:none}
.sos{gap:8px;padding:6px 14px;border-radius:10px;background:#d92b31;box-shadow:0 2px 8px rgba(217,43,49,.3);line-height:1.15}
.sos i{font-size:18px}
.sos b{display:flex;gap:6px;align-items:baseline;font-size:11px;letter-spacing:.06em}
.sos em{display:inline;font-size:11px;letter-spacing:0}
.sos small{display:block;font-size:14px;font-weight:700;letter-spacing:.02em}
.sub b{display:flex;gap:12px;align-items:baseline;flex-wrap:wrap}
.sub b .ar{display:inline;font-weight:500}
.sub .desc{display:block}.sub .desc .ar{display:block;margin-top:2px}
@media(max-height:900px){.sub .desc{display:none}}
@media(max-height:800px){.card small{display:none}.card{padding:8px 12px}.strip small.ar{display:none}}
@media(max-height:680px){:root{--banner:clamp(150px,30vh,300px)}.name .ar,h2 .ar{display:none}}
.chat-head .logo-btn{flex:none;width:50px;height:50px;padding:5px;display:grid;place-items:center}
.chat-head .logo-btn img{width:40px;height:40px}

/* --- round 4: corporate polish --- */
.ic{width:1em;height:1em;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;display:block}
.info i{color:var(--blue);background:#f2f7fd;border-color:#c9daee}.info i svg{width:17px;height:17px}
.card i{color:var(--blue)}.card i svg{width:24px;height:24px}.card.emergency i{color:var(--red)}
.strip i svg{width:20px;height:20px;color:#8ccbff}
.sos{background:#fff;border:1.5px solid #ecb4b7;color:#b3171d;box-shadow:none;padding:5px 14px 5px 6px;border-radius:12px;transition:.2s}
.sos:hover{background:#fdf1f1;border-color:#d92b31}
.sos i{width:34px;height:34px;border-radius:50%;background:#fde6e7;color:#d92b31;display:grid;place-items:center}.sos i svg{width:19px;height:19px}
.sos b{color:#b3171d}.sos small{color:var(--navy)}
.chat-head{gap:12px}.chat-head small{display:block;font-size:11px;opacity:.85;line-height:1.35}
.chat-head small.on{display:flex;align-items:center;gap:6px;opacity:1;color:#9df0bf}
.pulse{width:8px;height:8px;border-radius:50%;background:#2fd27a;box-shadow:0 0 0 0 rgba(47,210,122,.6);animation:pl 1.8s infinite}
@keyframes pl{70%{box-shadow:0 0 0 7px rgba(47,210,122,0)}100%{box-shadow:0 0 0 0 rgba(47,210,122,0)}}
.x svg{width:18px;height:18px}.alert button svg{width:14px;height:14px}
.feed{flex:1;min-height:0;overflow:auto;padding:16px;display:flex;flex-direction:column;gap:12px;background:#f4f8fc}
.row{display:flex;gap:8px;align-items:flex-end;max-width:92%}.row.me{align-self:flex-end}.row.bot{align-self:flex-start}
.av{width:30px;height:30px;border-radius:50%;background:#fff;border:1px solid #dbe6f2;flex:none;object-fit:contain}
.row time{display:block;font-size:10px;color:var(--mut);margin:3px 6px 0}.row.me time{text-align:right}
.m{max-width:none;border-radius:16px;padding:10px 14px;font-size:14px;line-height:1.55;white-space:pre-line}
.m.bot{background:#fff;border:1px solid #dde7f2;border-end-start-radius:4px;box-shadow:0 1px 3px rgba(10,42,87,.06)}
.m.me{background:var(--blue);color:#fff;border-end-end-radius:4px}
.m.dots{display:flex;gap:4px;padding:14px 16px}.m.dots b{width:7px;height:7px;border-radius:50%;background:#9db6d3;animation:bn 1.1s infinite}.m.dots b:nth-child(2){animation-delay:.15s}.m.dots b:nth-child(3){animation-delay:.3s}
@keyframes bn{0%,60%,100%{transform:none;opacity:.5}30%{transform:translateY(-4px);opacity:1}}
.listen{display:flex;align-items:center;gap:10px;padding:8px 16px;background:#eaf3fd;color:var(--navy);font-size:12.5px;border-top:1px solid #d5e5f7}
.wave{display:flex;gap:3px;align-items:center;height:16px}.wave i{width:3px;height:100%;background:var(--blue);border-radius:2px;animation:wv 1s ease-in-out infinite}.wave i:nth-child(2){animation-delay:.15s}.wave i:nth-child(3){animation-delay:.3s}.wave i:nth-child(4){animation-delay:.45s}
@keyframes wv{0%,100%{transform:scaleY(.3)}50%{transform:scaleY(1)}}
.comp{display:flex;gap:8px;align-items:center;padding:12px 14px calc(12px + env(safe-area-inset-bottom,0px));border-top:1px solid #e3ebf4;background:#fff}
.comp input{flex:1;min-width:0;height:46px;border:1px solid #cfdceb;border-radius:24px;padding:0 18px;font:inherit;font-size:14px;background:#fff;color:var(--ink)}
.comp input:focus{outline:0;border-color:var(--blue);box-shadow:0 0 0 3px rgba(21,115,196,.15)}
.mic,.send{flex:none;width:46px;height:46px;border-radius:50%;display:grid;place-items:center;color:#fff}
.mic{background:var(--blue)}.send{background:var(--navy)}.mic svg,.send svg{width:20px;height:20px}
.mic.on{background:var(--red);animation:ring 1.2s infinite}

/* --- round 5: lighter hospital background + embedded brain --- */
.portal::after{content:'';position:absolute;inset:0;height:auto;z-index:0;background:linear-gradient(180deg,rgba(12,52,104,.4),rgba(10,42,87,.66)),var(--hero,none) center bottom/cover no-repeat;filter:blur(18px) saturate(1.1);transform:scale(1.12)}
.portal::before{z-index:1;-webkit-mask-image:linear-gradient(180deg,#000 76%,transparent);mask-image:linear-gradient(180deg,#000 76%,transparent)}
.hero{z-index:2}
.embed{flex:1;min-height:0;position:relative;display:none}
.bpmode .embed{display:block}.bpmode .feed{display:none}
.bpmode .comp input,.bpmode .comp .send{display:none}
.comp .hint{display:none;flex:1;font-size:12.5px;color:var(--mut)}.bpmode .comp .hint{display:block}
.chat-head small.on.off{color:#ffd27a}.off .pulse{background:#f5a524;animation:none}
