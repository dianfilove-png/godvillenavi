// ==UserScript==
// @name         Кладоискатель для Годвилля
// @namespace    https://godville.net/
// @version      1.25.1
// @description  Топ-3 клеток клада, прикладовые схемы двух этажей и короткий отчёт.
// @match        https://godville.net/*
// @match        https://*.godville.net/*
// @match        https://godvillegame.com/*
// @match        https://*.godvillegame.com/*
// @match        https://gv.erinome.net/duels/log/*
// @match        https://gvg.erinome.net/duels/log/*
// @match        https://gv.erinome.net/reporter/duels/log/*
// @match        https://gvg.erinome.net/reporter/duels/log/*
// @run-at       document-idle
// @grant        none
// @noframes
// ==/UserScript==

(function () {
  "use strict";
  if (globalThis.__GVTR_USERSCRIPT_1_25_1__) return;
  Object.defineProperty(globalThis, "__GVTR_USERSCRIPT_1_25_1__", { value: true });
  const module = undefined;


{
  const style = document.createElement("style");
  style.id = "gvtr-userscript-styles";
  style.textContent = 
"#gvtr-panel.gvtr-panel {\n  box-sizing: border-box;\n  width: min(100%, 680px);\n  max-width: 100%;\n  margin: 12px auto;\n  padding: 12px;\n  overflow: hidden;\n  border: 1px solid rgba(144, 100, 0, 0.42);\n  border-radius: 12px;\n  background: linear-gradient(145deg, rgba(255, 253, 238, 0.98), rgba(246, 239, 209, 0.98));\n  color: #332b1f;\n  box-shadow: 0 3px 14px rgba(70, 48, 0, 0.16);\n  font: 14px/1.3 -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, sans-serif;\n  text-align: left;\n}\n\n#gvtr-panel *,\n#gvtr-panel *::before,\n#gvtr-panel *::after {\n  box-sizing: border-box;\n}\n\n#gvtr-panel .gvtr-header {\n  display: grid;\n  grid-template-columns: auto minmax(0, 1fr) auto;\n  align-items: center;\n  gap: 8px;\n}\n\n#gvtr-panel .gvtr-title {\n  font-size: 18px;\n  color: #5b3c00;\n  white-space: nowrap;\n}\n\n#gvtr-panel .gvtr-header-actions {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n}\n\n#gvtr-panel .gvtr-refresh,\n#gvtr-panel .gvtr-collapse,\n#gvtr-panel .gvtr-voice-toggle {\n  width: 32px;\n  height: 30px;\n  padding: 0;\n  border: 1px solid rgba(110, 78, 10, 0.4);\n  border-radius: 8px;\n  background: rgba(255, 255, 255, 0.72);\n  color: #6b4a00;\n  font: 700 20px/1 sans-serif;\n  cursor: pointer;\n  touch-action: manipulation;\n  -webkit-tap-highlight-color: transparent;\n}\n\n#gvtr-panel .gvtr-voice-toggle { font-size: 17px; }\n#gvtr-panel .gvtr-voice-toggle[aria-pressed=\"true\"] { background: #d6eec5; }\n#gvtr-panel .gvtr-voice-settings {\n  margin-top: 9px;\n  border: 1px solid rgba(128, 91, 28, .3);\n  border-radius: 10px;\n  color: inherit;\n  background: rgba(140, 110, 50, .07);\n}\n#gvtr-panel .gvtr-voice-summary { padding: 10px; cursor: pointer; font-weight: 600; }\n#gvtr-panel .gvtr-voice-body { padding: 0 10px 12px; }\n#gvtr-panel .gvtr-voice-intro { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }\n#gvtr-panel .gvtr-voice-avatar { width: 46px; height: 52px; object-fit: contain; flex: 0 0 auto; }\n#gvtr-panel .gvtr-voice-note { font-size: 12px; line-height: 1.4; opacity: .85; }\n#gvtr-panel .gvtr-voice-field {\n  display: grid; grid-template-columns: 108px minmax(0, 1fr);\n  align-items: center; gap: 8px; margin: 8px 0; font-size: 13px;\n}\n#gvtr-panel .gvtr-voice-select {\n  width: 100%; min-width: 0; min-height: 38px; padding: 6px;\n  border: 1px solid #9a7d45; border-radius: 7px; background: #fff8df;\n  color: #322515; font: inherit;\n}\n#gvtr-panel .gvtr-voice-volume { width: 100%; min-width: 0; min-height: 36px; accent-color: #bc7d00; }\n#gvtr-panel .gvtr-voice-checks { display: flex; flex-wrap: wrap; gap: 4px 14px; margin: 8px 0; }\n#gvtr-panel .gvtr-voice-check { display: inline-flex; align-items: center; gap: 7px; min-height: 36px; font-size: 13px; cursor: pointer; }\n#gvtr-panel .gvtr-voice-check input { margin: 0; accent-color: #bc7d00; width: 18px; height: 18px; }\n#gvtr-panel .gvtr-voice-test {\n  min-height: 40px; padding: 8px 14px; border: 1px solid #967239;\n  border-radius: 8px; background: #6b4c22; color: #fff4d7; font: 600 14px/1.3 sans-serif;\n  cursor: pointer; touch-action: manipulation;\n}\n#gvtr-panel .gvtr-voice-status { margin-top: 8px; font-size: 12px; line-height: 1.4; overflow-wrap: anywhere; }\n#gvtr-panel .gvtr-voice-toggle:disabled,\n#gvtr-panel .gvtr-voice-test:disabled { opacity: .55; cursor: default; }\n#gvtr-panel .gvtr-voice-body :focus-visible,\n#gvtr-panel .gvtr-voice-toggle:focus-visible { outline: 2px solid #b97900; outline-offset: 2px; }\n#gvtr-panel.gvtr-speaking .gvtr-voice-avatar { animation: gvtr-voice-bob 650ms ease-in-out infinite alternate; }\n@keyframes gvtr-voice-bob { to { transform: translateY(-3px) rotate(2deg); } }\n@media (prefers-reduced-motion: reduce) {\n  #gvtr-panel.gvtr-speaking .gvtr-voice-avatar { animation: none; }\n}\n@media (max-width: 380px) {\n  #gvtr-panel .gvtr-voice-field { grid-template-columns: 1fr; gap: 3px; }\n}\n\n#gvtr-panel .gvtr-collapse {\n  font-size: 18px;\n}\n\n#gvtr-panel .gvtr-collapsed-best {\n  display: none;\n  min-width: 0;\n  overflow: hidden;\n  color: #6a5a3b;\n  font-size: 13px;\n  font-weight: 700;\n  text-align: right;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n#gvtr-panel.gvtr-collapsed {\n  padding-top: 8px;\n  padding-bottom: 8px;\n}\n\n#gvtr-panel.gvtr-collapsed > :not(.gvtr-header) {\n  display: none !important;\n}\n\n#gvtr-panel.gvtr-collapsed .gvtr-collapsed-best {\n  display: block;\n}\n\n#gvtr-panel .gvtr-meta {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px 10px;\n  margin: 7px 0 10px;\n  color: #665b47;\n  font-size: 12px;\n}\n\n#gvtr-panel.gvtr-completed {\n  border-color: rgba(54, 139, 70, 0.55);\n  background: linear-gradient(145deg, rgba(249, 255, 237, 0.98), rgba(231, 246, 207, 0.98));\n}\n\n#gvtr-panel .gvtr-success-card {\n  display: grid;\n  grid-template-columns: 82px minmax(0, 1fr);\n  align-items: center;\n  gap: 2px 10px;\n  margin-top: 9px;\n  padding: 10px;\n  border: 1px solid rgba(65, 139, 53, 0.3);\n  border-radius: 10px;\n  background: rgba(255, 255, 255, 0.62);\n  overflow: hidden;\n}\n\n#gvtr-panel .gvtr-success-icon {\n  display: none;\n  grid-row: 1 / span 2;\n  font-size: 30px;\n  text-align: center;\n}\n\n#gvtr-panel .gvtr-success-guide {\n  grid-row: 1 / span 2;\n  align-self: end;\n  width: 82px;\n  max-height: 104px;\n  object-fit: contain;\n  object-position: center bottom;\n  filter: drop-shadow(0 3px 4px rgba(74, 53, 15, 0.2));\n  animation: gvtr-treasure-guide 560ms cubic-bezier(.2, .85, .25, 1.2) both;\n}\n\n#gvtr-panel .gvtr-success-card.gvtr-success-no-guide {\n  grid-template-columns: 40px minmax(0, 1fr);\n}\n#gvtr-panel .gvtr-success-card.gvtr-success-no-guide .gvtr-success-icon { display: block; }\n\n@keyframes gvtr-treasure-guide {\n  from { opacity: 0; transform: translateY(12px) scale(.88) rotate(-3deg); }\n  to { opacity: 1; transform: translateY(0) scale(1) rotate(0); }\n}\n\n@media (prefers-reduced-motion: reduce) {\n  #gvtr-panel .gvtr-success-guide { animation: none; }\n}\n\n#gvtr-panel .gvtr-success-title { color: #2d6c31; font-size: 14px; }\n#gvtr-panel .gvtr-success-text {\n  color: #53624a;\n  font-size: 11px;\n  line-height: 1.3;\n  overflow-wrap: anywhere;\n}\n\n#gvtr-panel .gvtr-source {\n  min-width: 0;\n}\n\n#gvtr-panel .gvtr-confidence {\n  padding: 2px 7px;\n  border-radius: 99px;\n  background: #e8ddba;\n  font-weight: 700;\n}\n\n#gvtr-panel .gvtr-confidence-высокая { background: #cce8bf; color: #28551c; }\n#gvtr-panel .gvtr-confidence-средняя { background: #f3dfaa; color: #6d4b00; }\n#gvtr-panel .gvtr-confidence-низкая { background: #efc8bc; color: #762c1a; }\n\n#gvtr-panel .gvtr-pointer-note {\n  margin: -2px 0 8px;\n  padding: 5px 7px;\n  border-left: 3px solid #d98200;\n  border-radius: 5px;\n  background: rgba(255, 184, 51, 0.14);\n  color: #695329;\n  font-size: 11px;\n  line-height: 1.3;\n  overflow-wrap: anywhere;\n}\n\n#gvtr-panel .gvtr-sector-box {\n  margin: 0 0 9px;\n  padding: 8px;\n  border: 1px dashed rgba(117, 66, 170, 0.5);\n  border-radius: 9px;\n  background: linear-gradient(100deg, rgba(140, 78, 194, 0.1), rgba(255, 255, 255, 0.5));\n}\n\n#gvtr-panel .gvtr-sector-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px;\n}\n\n#gvtr-panel .gvtr-sector-title {\n  color: #593177;\n  font-size: 13px;\n}\n\n#gvtr-panel .gvtr-sector-badge {\n  padding: 2px 6px;\n  border-radius: 99px;\n  background: rgba(117, 66, 170, 0.12);\n  color: #69477f;\n  font-size: 10px;\n  font-weight: 700;\n  white-space: nowrap;\n}\n\n#gvtr-panel .gvtr-sector-text,\n#gvtr-panel .gvtr-sector-mobile-note {\n  color: #665970;\n  font-size: 10.5px;\n  line-height: 1.3;\n  overflow-wrap: anywhere;\n}\n\n#gvtr-panel .gvtr-sector-text { margin-top: 3px; }\n\n#gvtr-panel .gvtr-sector-list {\n  display: grid;\n  grid-template-columns: repeat(3, minmax(0, 1fr));\n  gap: 5px;\n  margin-top: 6px;\n}\n\n#gvtr-panel .gvtr-sector-choice {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr);\n  align-items: center;\n  gap: 1px 5px;\n  min-width: 0;\n  padding: 6px 7px;\n  border: 1px dashed rgba(117, 66, 170, 0.42);\n  border-radius: 7px;\n  background: rgba(255, 255, 255, 0.62);\n  color: inherit;\n  text-align: left;\n  cursor: pointer;\n}\n\n#gvtr-panel .gvtr-sector-choice:hover,\n#gvtr-panel .gvtr-sector-choice:focus-visible {\n  border-color: #8246ae;\n  background: rgba(255, 255, 255, 0.9);\n  outline: none;\n}\n\n#gvtr-panel .gvtr-sector-name {\n  min-width: 0;\n  overflow: hidden;\n  color: #5d3d70;\n  font-size: 11px;\n  font-weight: 700;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n#gvtr-panel .gvtr-sector-coords {\n  color: #684184;\n  font-size: 10.5px;\n  white-space: nowrap;\n}\n\n#gvtr-panel .gvtr-sector-reason {\n  color: #786b80;\n  font-size: 9.5px;\n}\n\n#gvtr-panel .gvtr-list {\n  display: grid;\n  gap: 7px;\n  margin: 0;\n  padding: 0;\n  list-style: none;\n}\n\n#gvtr-panel .gvtr-choice {\n  display: grid;\n  grid-template-columns: 28px minmax(85px, auto) auto;\n  align-items: center;\n  width: 100%;\n  gap: 2px 8px;\n  padding: 7px 9px;\n  border: 1px solid rgba(111, 79, 10, 0.22);\n  border-radius: 9px;\n  background: rgba(255, 255, 255, 0.72);\n  color: inherit;\n  text-align: left;\n  cursor: pointer;\n}\n\n#gvtr-panel .gvtr-choice:hover,\n#gvtr-panel .gvtr-choice:focus-visible,\n#gvtr-panel .gvtr-refresh:focus-visible,\n#gvtr-panel .gvtr-collapse:focus-visible {\n  border-color: #b07d00;\n  background: #fffdf4;\n  outline: none;\n}\n\n#gvtr-panel .gvtr-choice-frontier {\n  border-style: dashed;\n  border-color: rgba(129, 73, 184, 0.48);\n  background: linear-gradient(90deg, rgba(147, 91, 199, 0.09), rgba(255, 255, 255, 0.72));\n}\n\n#gvtr-panel .gvtr-number {\n  grid-row: 1 / span 2;\n  display: grid;\n  place-items: center;\n  width: 26px;\n  height: 26px;\n  border-radius: 50%;\n  background: #7b5500;\n  color: #fff;\n  font-weight: 800;\n}\n\n#gvtr-panel .gvtr-coords { min-width: 0; font-weight: 800; }\n#gvtr-panel .gvtr-score { justify-self: end; color: #725200; font-weight: 700; }\n#gvtr-panel .gvtr-reason {\n  grid-column: 2 / -1;\n  min-width: 0;\n  overflow: visible;\n  color: #6a6255;\n  font-size: 11px;\n  line-height: 1.25;\n  overflow-wrap: anywhere;\n  text-overflow: clip;\n  white-space: normal;\n}\n\n#gvtr-panel .gvtr-count,\n#gvtr-panel .gvtr-empty {\n  margin-top: 9px;\n  color: #746b5c;\n  font-size: 11px;\n}\n\n#gvtr-panel .gvtr-warning {\n  margin-top: 8px;\n  padding: 6px 8px;\n  border-left: 3px solid #ba7a00;\n  border-radius: 4px;\n  background: rgba(255, 222, 139, 0.4);\n  color: #674600;\n  font-size: 12px;\n  max-width: 100%;\n  overflow-wrap: anywhere;\n  white-space: normal !important;\n}\n\n#gvtr-panel .gvtr-mobile-more {\n  display: none;\n}\n\n#gvtr-panel .gvtr-explanations {\n  margin: 0;\n  padding: 0 0 0 20px;\n}\n\n#gvtr-panel .gvtr-explanation {\n  margin: 0 0 6px;\n  overflow-wrap: anywhere;\n}\n\n#gvtr-panel .gvtr-explanation:last-child {\n  margin-bottom: 0;\n}\n\n#gvtr-panel .gvtr-boss-journal {\n  margin-top: 9px;\n  border-top: 1px solid rgba(145, 104, 12, 0.25);\n}\n\n#gvtr-panel .gvtr-boss-summary {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) auto auto;\n  align-items: center;\n  min-height: 38px;\n  gap: 7px;\n  padding: 6px 2px 0;\n  cursor: pointer;\n  font-weight: 800;\n  list-style: none;\n  touch-action: manipulation;\n  -webkit-tap-highlight-color: transparent;\n}\n\n#gvtr-panel .gvtr-boss-summary::-webkit-details-marker { display: none; }\n#gvtr-panel .gvtr-boss-summary::after {\n  content: \"⌄\";\n  color: #a56d00;\n  font-size: 18px;\n  transition: transform 140ms ease;\n}\n#gvtr-panel .gvtr-boss-journal[open] .gvtr-boss-summary::after { transform: rotate(180deg); }\n#gvtr-panel .gvtr-boss-summary-count {\n  color: #82745c;\n  font-size: 10px;\n  font-weight: 600;\n  white-space: nowrap;\n}\n\n#gvtr-panel .gvtr-boss-list {\n  display: grid;\n  gap: 6px;\n  padding: 5px 0 1px;\n}\n\n#gvtr-panel .gvtr-boss-row {\n  display: grid;\n  grid-template-columns: minmax(110px, 1fr) auto;\n  align-items: center;\n  gap: 7px;\n  padding: 6px 7px;\n  border: 1px solid rgba(111, 79, 10, 0.2);\n  border-radius: 9px;\n  background: rgba(255, 255, 255, 0.54);\n}\n\n#gvtr-panel .gvtr-boss-info {\n  display: grid;\n  min-width: 0;\n}\n\n#gvtr-panel .gvtr-boss-coords { font-size: 13px; }\n#gvtr-panel .gvtr-boss-source {\n  overflow: hidden;\n  color: #766c5d;\n  font-size: 10px;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n#gvtr-panel .gvtr-boss-controls {\n  display: flex;\n  gap: 4px;\n}\n\n#gvtr-panel .gvtr-boss-ability,\n#gvtr-panel .gvtr-boss-clear {\n  width: 32px;\n  height: 32px;\n  padding: 0;\n  border: 1px solid rgba(111, 79, 10, 0.3);\n  border-radius: 8px;\n  background: rgba(255, 255, 255, 0.78);\n  color: #5f4a20;\n  font: 800 14px/1 sans-serif;\n  cursor: pointer;\n  touch-action: manipulation;\n}\n\n#gvtr-panel .gvtr-boss-ability.gvtr-active {\n  border-color: #c88100;\n  background: #efb943;\n  color: #2d2108;\n  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.65);\n}\n\n#gvtr-panel .gvtr-boss-ability.gvtr-manual { outline: 2px solid #e66a00; }\n#gvtr-panel .gvtr-boss-clear:disabled { cursor: default; opacity: 0.35; }\n\n#gvtr-panel .gvtr-recorder {\n  margin-top: 9px;\n  border-top: 1px solid rgba(145, 104, 12, 0.25);\n}\n\n#gvtr-panel .gvtr-recorder-summary {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) auto auto;\n  align-items: center;\n  min-height: 38px;\n  gap: 7px;\n  padding: 6px 2px 0;\n  cursor: pointer;\n  font-weight: 800;\n  list-style: none;\n  touch-action: manipulation;\n  -webkit-tap-highlight-color: transparent;\n}\n\n#gvtr-panel .gvtr-recorder-summary::-webkit-details-marker { display: none; }\n#gvtr-panel .gvtr-recorder-summary::after {\n  content: \"⌄\";\n  color: #a56d00;\n  font-size: 18px;\n  transition: transform 140ms ease;\n}\n#gvtr-panel .gvtr-recorder[open] .gvtr-recorder-summary::after { transform: rotate(180deg); }\n#gvtr-panel .gvtr-recorder-summary-count {\n  color: #82745c;\n  font-size: 10px;\n  font-weight: 600;\n  white-space: nowrap;\n}\n\n#gvtr-panel .gvtr-recorder-body {\n  display: grid;\n  gap: 7px;\n  padding: 5px 0 1px;\n}\n\n#gvtr-panel .gvtr-recorder-message {\n  color: #746b5c;\n  font-size: 11px;\n  overflow-wrap: anywhere;\n}\n\n#gvtr-panel .gvtr-recorder-actions {\n  display: grid;\n  grid-template-columns: minmax(0, 1fr) minmax(0, 0.78fr) minmax(0, 0.72fr);\n  gap: 6px;\n}\n\n#gvtr-panel .gvtr-recorder-copy,\n#gvtr-panel .gvtr-recorder-delete {\n  min-width: 0;\n  min-height: 36px;\n  padding: 6px 9px;\n  border: 1px solid rgba(111, 79, 10, 0.3);\n  border-radius: 8px;\n  background: rgba(255, 255, 255, 0.78);\n  color: #5f4a20;\n  font: 700 12px/1.15 -apple-system, BlinkMacSystemFont, \"Segoe UI\", Arial, sans-serif;\n  cursor: pointer;\n  touch-action: manipulation;\n}\n\n#gvtr-panel .gvtr-recorder-delete { color: #853b25; }\n#gvtr-panel .gvtr-recorder-copy:disabled,\n#gvtr-panel .gvtr-recorder-delete:disabled { cursor: default; opacity: 0.4; }\n\n#gvtr-panel .gvtr-recorder-output {\n  width: 100%;\n  min-height: 92px;\n  max-height: 180px;\n  padding: 6px;\n  resize: vertical;\n  border: 1px solid rgba(111, 79, 10, 0.25);\n  border-radius: 7px;\n  background: rgba(255, 255, 255, 0.72);\n  color: inherit;\n  font: 10px/1.25 monospace;\n}\n\n.dmc.gvtr-boss-noted {\n  z-index: 7 !important;\n  isolation: isolate;\n}\n\n.dmc.gvtr-boss-noted::after {\n  content: attr(data-gvtr-abilities) \"а\" !important;\n  position: absolute !important;\n  top: -7px !important;\n  right: -7px !important;\n  display: grid !important;\n  place-items: center !important;\n  min-width: 17px !important;\n  height: 17px !important;\n  padding: 0 2px !important;\n  border: 1px solid #fff !important;\n  border-radius: 9px !important;\n  background: #7d2f00 !important;\n  color: #fff !important;\n  font: 800 10px/1 Arial, sans-serif !important;\n  text-shadow: none !important;\n}\n\n.dmc.gvtr-rank-1,\n.dmc.gvtr-rank-2,\n.dmc.gvtr-rank-3 {\n  z-index: 8 !important;\n  isolation: isolate;\n}\n\n.dmc.gvtr-rank-1 { box-shadow: inset 0 0 0 3px #ffbe00, 0 0 10px 3px rgba(255, 91, 0, 0.82) !important; }\n.dmc.gvtr-rank-2 { box-shadow: inset 0 0 0 3px #d4d9df, 0 0 7px 2px rgba(70, 120, 170, 0.72) !important; }\n.dmc.gvtr-rank-3 { box-shadow: inset 0 0 0 3px #c7793d, 0 0 6px 2px rgba(151, 72, 18, 0.64) !important; }\n.dmc.gvtr-selected { box-shadow: inset 0 0 0 3px #00e4ff, 0 0 14px 5px #009cff !important; }\n.dmc.gvtr-frontier-anchor {\n  outline: 2px dashed #b35cff !important;\n  outline-offset: -2px !important;\n  box-shadow: 0 0 8px 2px rgba(165, 75, 232, 0.72) !important;\n}\n\n.dmc.gvtr-rank-1::after,\n.dmc.gvtr-rank-2::after,\n.dmc.gvtr-rank-3::after {\n  content: attr(data-gvtr-rank) !important;\n  position: absolute !important;\n  top: -7px !important;\n  right: -7px !important;\n  display: grid !important;\n  place-items: center !important;\n  width: 16px !important;\n  height: 16px !important;\n  border: 1px solid #fff !important;\n  border-radius: 50% !important;\n  background: #7a5100 !important;\n  color: #fff !important;\n  font: 800 11px/1 Arial, sans-serif !important;\n  text-shadow: none !important;\n}\n\n@media (prefers-color-scheme: dark) {\n  #gvtr-panel.gvtr-panel {\n    color-scheme: dark;\n    border-color: rgba(230, 167, 51, 0.34);\n    background: linear-gradient(145deg, rgba(43, 38, 15, 0.98), rgba(25, 27, 17, 0.98));\n    color: #f1eadb;\n    box-shadow: 0 5px 18px rgba(0, 0, 0, 0.32);\n  }\n\n  #gvtr-panel.gvtr-completed {\n    border-color: rgba(105, 202, 105, 0.38);\n    background: linear-gradient(145deg, rgba(26, 48, 25, 0.98), rgba(20, 34, 20, 0.98));\n  }\n\n  #gvtr-panel .gvtr-success-card {\n    border-color: rgba(119, 210, 110, 0.25);\n    background: rgba(8, 20, 8, 0.55);\n  }\n  #gvtr-panel .gvtr-success-title { color: #b6eda9; }\n  #gvtr-panel .gvtr-success-text { color: #c0cfb9; }\n\n  #gvtr-panel .gvtr-title,\n  #gvtr-panel .gvtr-score { color: #ffc76f; }\n  #gvtr-panel .gvtr-collapsed-best,\n  #gvtr-panel .gvtr-source,\n  #gvtr-panel .gvtr-reason,\n  #gvtr-panel .gvtr-count,\n  #gvtr-panel .gvtr-empty { color: #c3baa8; }\n  #gvtr-panel .gvtr-refresh,\n  #gvtr-panel .gvtr-collapse,\n  #gvtr-panel .gvtr-voice-toggle {\n    border-color: rgba(225, 167, 65, 0.34);\n    background: rgba(8, 9, 7, 0.52);\n    color: #ffc76f;\n  }\n  #gvtr-panel .gvtr-voice-toggle[aria-pressed=\"true\"] { background: #34572c; }\n  #gvtr-panel .gvtr-voice-select { background: #24251a; color: #f2e6c8; border-color: #7f673c; }\n  #gvtr-panel .gvtr-choice {\n    border-color: rgba(225, 167, 65, 0.18);\n    background: rgba(8, 9, 7, 0.63);\n  }\n  #gvtr-panel .gvtr-choice-frontier {\n    border-color: rgba(202, 143, 255, 0.48);\n    background: linear-gradient(90deg, rgba(147, 91, 199, 0.18), rgba(8, 9, 7, 0.63));\n  }\n  #gvtr-panel .gvtr-choice:hover,\n  #gvtr-panel .gvtr-choice:focus-visible,\n  #gvtr-panel .gvtr-refresh:focus-visible,\n  #gvtr-panel .gvtr-collapse:focus-visible { background: #292817; }\n  #gvtr-panel .gvtr-number { background: #9b6900; }\n  #gvtr-panel .gvtr-confidence { background: #4b432d; color: #eee2c7; }\n  #gvtr-panel .gvtr-confidence-высокая { background: #294c2a; color: #cbf1c8; }\n  #gvtr-panel .gvtr-confidence-средняя { background: #5a431c; color: #ffe2a1; }\n  #gvtr-panel .gvtr-confidence-низкая { background: #713a31; color: #ffd0c5; }\n  #gvtr-panel .gvtr-pointer-note { background: rgba(197, 126, 0, 0.17); color: #e1c98e; }\n  #gvtr-panel .gvtr-sector-box {\n    border-color: rgba(202, 143, 255, 0.45);\n    background: linear-gradient(100deg, rgba(147, 91, 199, 0.18), rgba(8, 9, 7, 0.42));\n  }\n  #gvtr-panel .gvtr-sector-title,\n  #gvtr-panel .gvtr-sector-coords { color: #d7a8ff; }\n  #gvtr-panel .gvtr-sector-badge {\n    background: rgba(202, 143, 255, 0.14);\n    color: #d5b2ee;\n  }\n  #gvtr-panel .gvtr-sector-text,\n  #gvtr-panel .gvtr-sector-mobile-note,\n  #gvtr-panel .gvtr-sector-name,\n  #gvtr-panel .gvtr-sector-reason { color: #c9b4d4; }\n  #gvtr-panel .gvtr-sector-choice {\n    border-color: rgba(202, 143, 255, 0.36);\n    background: rgba(8, 9, 7, 0.55);\n  }\n  #gvtr-panel .gvtr-sector-choice:hover,\n  #gvtr-panel .gvtr-sector-choice:focus-visible { background: rgba(64, 43, 76, 0.72); }\n  #gvtr-panel .gvtr-warning { background: rgba(174, 116, 0, 0.16); color: #f0cd86; }\n  #gvtr-panel .gvtr-boss-journal { border-top-color: rgba(225, 167, 65, 0.2); }\n  #gvtr-panel .gvtr-boss-summary-count,\n  #gvtr-panel .gvtr-boss-source { color: #bdb3a0; }\n  #gvtr-panel .gvtr-boss-summary::after { color: #ffc76f; }\n  #gvtr-panel .gvtr-boss-row {\n    border-color: rgba(225, 167, 65, 0.18);\n    background: rgba(8, 9, 7, 0.55);\n  }\n  #gvtr-panel .gvtr-boss-ability,\n  #gvtr-panel .gvtr-boss-clear {\n    border-color: rgba(225, 167, 65, 0.3);\n    background: rgba(8, 9, 7, 0.65);\n    color: #f0d9a7;\n  }\n  #gvtr-panel .gvtr-boss-ability.gvtr-active { background: #a86e00; color: #fff4d6; }\n  #gvtr-panel .gvtr-recorder { border-top-color: rgba(225, 167, 65, 0.2); }\n  #gvtr-panel .gvtr-recorder-summary-count,\n  #gvtr-panel .gvtr-recorder-message { color: #bdb3a0; }\n  #gvtr-panel .gvtr-recorder-summary::after { color: #ffc76f; }\n  #gvtr-panel .gvtr-recorder-copy,\n  #gvtr-panel .gvtr-recorder-delete,\n  #gvtr-panel .gvtr-recorder-output {\n    border-color: rgba(225, 167, 65, 0.3);\n    background: rgba(8, 9, 7, 0.65);\n    color: #f0d9a7;\n  }\n  #gvtr-panel .gvtr-recorder-delete { color: #ffb19b; }\n}\n\n@media (max-width: 600px) {\n  #gvtr-panel.gvtr-panel {\n    width: calc(100% - 16px);\n    margin: 8px auto;\n    padding: 8px;\n    border-radius: 12px;\n    font-size: 13px;\n  }\n\n  #gvtr-panel .gvtr-header {\n    grid-template-columns: auto minmax(0, 1fr) auto;\n    gap: 6px;\n  }\n\n  #gvtr-panel .gvtr-title { font-size: 16px; }\n  #gvtr-panel.gvtr-collapsed .gvtr-title { font-size: 14px; }\n\n  #gvtr-panel .gvtr-header-actions { gap: 5px; }\n  #gvtr-panel .gvtr-refresh,\n  #gvtr-panel .gvtr-collapse,\n  #gvtr-panel .gvtr-voice-toggle {\n    width: 38px;\n    height: 36px;\n    border-radius: 9px;\n  }\n\n  #gvtr-panel .gvtr-meta {\n    display: grid;\n    grid-template-columns: max-content minmax(0, 1fr);\n    align-items: center;\n    gap: 6px;\n    margin: 5px 0 6px;\n    font-size: 11px;\n  }\n\n  #gvtr-panel .gvtr-success-card {\n    grid-template-columns: 70px minmax(0, 1fr);\n    margin-top: 6px;\n    padding: 8px;\n  }\n  #gvtr-panel .gvtr-success-guide { width: 70px; max-height: 92px; }\n  #gvtr-panel .gvtr-success-card.gvtr-success-no-guide { grid-template-columns: 34px minmax(0, 1fr); }\n  #gvtr-panel .gvtr-success-icon { font-size: 26px; }\n  #gvtr-panel .gvtr-success-title { font-size: 13px; }\n\n  #gvtr-panel .gvtr-confidence {\n    padding: 2px 6px;\n  }\n\n  #gvtr-panel .gvtr-source {\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n\n  #gvtr-panel .gvtr-pointer-note {\n    margin-bottom: 6px;\n    font-size: 10.5px;\n  }\n\n  #gvtr-panel .gvtr-sector-box {\n    margin-bottom: 6px;\n    padding: 7px;\n  }\n  #gvtr-panel .gvtr-sector-list { grid-template-columns: 1fr; }\n  #gvtr-panel .gvtr-sector-choice {\n    min-height: 38px;\n    padding: 5px 7px;\n  }\n\n  #gvtr-panel .gvtr-desktop-only { display: none !important; }\n\n  #gvtr-panel .gvtr-list { gap: 5px; }\n  #gvtr-panel .gvtr-choice {\n    grid-template-columns: 30px minmax(0, 1fr) max-content;\n    min-height: 48px;\n    gap: 1px 7px;\n    padding: 5px 8px;\n    border-radius: 9px;\n  }\n\n  #gvtr-panel .gvtr-number {\n    width: 29px;\n    height: 29px;\n    font-size: 14px;\n  }\n\n  #gvtr-panel .gvtr-coords {\n    overflow: hidden;\n    font-size: 16px;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n\n  #gvtr-panel .gvtr-score {\n    font-size: 13px;\n    white-space: nowrap;\n  }\n\n  #gvtr-panel .gvtr-reason {\n    font-size: 10.5px;\n    line-height: 1.15;\n  }\n\n  #gvtr-panel .gvtr-mobile-more {\n    display: block;\n    margin-top: 6px;\n    border-top: 1px solid rgba(145, 104, 12, 0.22);\n  }\n\n  #gvtr-panel .gvtr-mobile-summary {\n    display: grid;\n    grid-template-columns: minmax(0, 1fr) auto auto;\n    align-items: center;\n    min-height: 36px;\n    gap: 6px;\n    padding: 5px 2px 0;\n    color: inherit;\n    cursor: pointer;\n    font-weight: 700;\n    list-style: none;\n    touch-action: manipulation;\n    -webkit-tap-highlight-color: transparent;\n  }\n\n  #gvtr-panel .gvtr-mobile-summary::-webkit-details-marker { display: none; }\n  #gvtr-panel .gvtr-mobile-summary::after {\n    content: \"⌄\";\n    color: #b17a00;\n    font-size: 18px;\n    transition: transform 140ms ease;\n  }\n  #gvtr-panel .gvtr-mobile-more[open] .gvtr-mobile-summary::after { transform: rotate(180deg); }\n  #gvtr-panel .gvtr-mobile-summary-count {\n    color: #8a806d;\n    font-size: 10px;\n    font-weight: 600;\n    white-space: nowrap;\n  }\n\n  #gvtr-panel .gvtr-mobile-details-body {\n    padding: 5px 2px 2px;\n    overflow-wrap: anywhere;\n    white-space: normal;\n  }\n\n  #gvtr-panel .gvtr-explanations {\n    font-size: 11px;\n    line-height: 1.32;\n  }\n\n  #gvtr-panel .gvtr-mobile-details-body .gvtr-detected,\n  #gvtr-panel .gvtr-mobile-details-body .gvtr-count,\n  #gvtr-panel .gvtr-mobile-details-body .gvtr-warning {\n    margin-top: 6px;\n    white-space: normal !important;\n  }\n\n  #gvtr-panel .gvtr-boss-journal { margin-top: 6px; }\n  #gvtr-panel .gvtr-boss-summary { min-height: 38px; padding-top: 4px; }\n  #gvtr-panel .gvtr-boss-row {\n    grid-template-columns: minmax(0, 1fr);\n    gap: 5px;\n    padding: 6px;\n  }\n  #gvtr-panel .gvtr-boss-controls {\n    display: grid;\n    grid-template-columns: repeat(5, 1fr);\n    gap: 5px;\n  }\n  #gvtr-panel .gvtr-boss-ability,\n  #gvtr-panel .gvtr-boss-clear {\n    width: 100%;\n    min-width: 0;\n    height: 38px;\n    font-size: 15px;\n  }\n\n  #gvtr-panel .gvtr-recorder { margin-top: 6px; }\n  #gvtr-panel .gvtr-recorder-summary { min-height: 38px; padding-top: 4px; }\n  #gvtr-panel .gvtr-recorder-actions { grid-template-columns: minmax(0, 1fr) minmax(0, 0.82fr); }\n  #gvtr-panel .gvtr-recorder-delete { grid-column: 1 / -1; }\n  #gvtr-panel .gvtr-recorder-copy,\n  #gvtr-panel .gvtr-recorder-delete { min-height: 40px; font-size: 12px; }\n}\n\n@media (max-width: 360px) {\n  #gvtr-panel.gvtr-panel { width: calc(100% - 10px); padding: 7px; }\n  #gvtr-panel .gvtr-title { font-size: 15px; }\n  #gvtr-panel .gvtr-refresh,\n  #gvtr-panel .gvtr-collapse,\n  #gvtr-panel .gvtr-voice-toggle { width: 35px; }\n  #gvtr-panel .gvtr-recorder-actions { grid-template-columns: 1fr; }\n  #gvtr-panel .gvtr-recorder-delete { grid-column: auto; }\n}\n\n@media (prefers-color-scheme: dark) and (max-width: 600px) {\n  #gvtr-panel .gvtr-mobile-more { border-top-color: rgba(225, 167, 65, 0.2); }\n  #gvtr-panel .gvtr-mobile-summary-count { color: #bdb3a0; }\n  #gvtr-panel .gvtr-mobile-summary::after { color: #ffc76f; }\n}\n"
;
  (document.head || document.documentElement).appendChild(style);
}

(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) {
    module.exports = api;
  } else {
    root.GodvilleTreasureRanker = api;
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  const ARROWS = "←→↓↑↙↘↖↗╠╣╦╩";
  const THERMOS = "✺☀♨☁❄✵";
  const ALL_MARKERS = ARROWS + THERMOS + "⌊⌋⌈⌉∨<∧>";
  const COMPOSITES = {
    "⌊": "↑→",
    "⌋": "↑←",
    "⌈": "↓→",
    "⌉": "↓←",
    "∨": "↖↗",
    "<": "↗↘",
    "∧": "↙↘",
    ">": "↖↙"
  };
  const POINTER_WORDS = {
    north_side: "╩",
    east_side: "╠",
    south_side: "╦",
    west_side: "╣",
    north_east: "↗",
    north_west: "↖",
    south_east: "↘",
    south_west: "↙",
    north: "↑",
    east: "→",
    south: "↓",
    west: "←",
    freezing: "✵",
    cold: "❄",
    mild: "☁",
    warm: "♨",
    hot: "☀",
    burning: "✺"
  };
  const THERMO_RANGES = {
    "✺": [1, 2],
    "☀": [3, 5],
    "♨": [6, 9],
    "☁": [10, 13],
    "❄": [14, 18],
    "✵": [19, Infinity]
  };

  function extractSymbols(text, pointerWords) {
    const found = [];
    const source = String(text || "");
    for (const char of source) {
      if (ALL_MARKERS.includes(char)) {
        const expanded = COMPOSITES[char] || char;
        for (const symbol of expanded) found.push(symbol);
      }
    }
    for (const word of String(pointerWords || "").split(/\s+/)) {
      if (POINTER_WORDS[word]) found.push(POINTER_WORDS[word]);
    }
    return Array.from(new Set(found));
  }

  function extractAuthoredBossName(text) {
    const match = String(text || "").match(
      /(?:^|[\s([{"'«])(?:\+|＋)\s*([^+\n]{1,64}?)\s*(?:\+|＋)(?=$|[\s)\]}"'».,:;])/u
    );
    return match ? match[1].trim() : null;
  }

  // Совпадает с современной (version 2) геометрией секторов Erinome UI+.
  function checkArrow(symbol, dy, dx) {
    let diagonal = true;
    let swap = 0;
    switch (symbol) {
      case "↗": dy = -dy; break;
      case "↖": dy = -dy;
      case "↙": dx = -dx; break;
      case "←": dx = -dx;
      case "→": diagonal = false; break;
      case "↑": swap = -dy; dy = dx; dx = swap; diagonal = false; break;
      case "↓": swap = dy; dy = dx; dx = swap; diagonal = false; break;
      case "╠": return dx > 0;
      case "╣": return dx < 0;
      case "╦": return dy > 0;
      case "╩": return dy < 0;
      case "↘": break;
      default: return false;
    }
    if (dx <= 0) return false;
    const step = 2.414;
    return dx <= Math.abs(dy) * step
      ? diagonal && dy >= 0 && dy <= dx * step
      : !diagonal;
  }

  function cellKey(x, y) {
    return x + ":" + y;
  }

  function bossAnnotationKey(point, entry) {
    if (!point) return "";
    if (!entry) return "a:" + point.x + ":" + point.y;
    return "r:" + (point.x - entry.x) + ":" + (entry.y - point.y);
  }

  function hasCellarLabel(text) {
    return /,\s*(?:2э|b)(?=$|[\s,;)\]])/i.test(String(text || ""));
  }

  function shortestPath(model, start, finish, options) {
    if (!start || !finish) return Infinity;
    const settings = options || {};
    const pathCells = settings.includeFrontier && model._frontierCells ?
      model.cells.concat(model._frontierCells) : model.cells;
    const byPosition = new Map(pathCells.map((cell) => [cellKey(cell.x, cell.y), cell]));
    const finishKey = cellKey(finish.x, finish.y);
    const queue = [{ x: start.x, y: start.y, distance: 0 }];
    const seen = new Set([cellKey(start.x, start.y)]);
    for (let index = 0; index < queue.length; index += 1) {
      const current = queue[index];
      if (current.x === finish.x && current.y === finish.y) return current.distance;
      const neighbours = [
        [current.x + 1, current.y],
        [current.x - 1, current.y],
        [current.x, current.y + 1],
        [current.x, current.y - 1]
      ];
      for (const [x, y] of neighbours) {
        const key = cellKey(x, y);
        const cell = byPosition.get(key);
        if (!cell || cell.wall || seen.has(key) ||
            (settings.knownOnly && cell.absoluteUnknown && key !== finishKey)) continue;
        seen.add(key);
        queue.push({ x, y, distance: current.distance + 1 });
      }
    }
    return Infinity;
  }

  function pathLengthScore(distance) {
    if (!Number.isFinite(distance)) return null;
    const outside = Math.max(0, 11 - distance, distance - 29);
    return Math.max(-10, 5 - outside * 3);
  }

  function markerEvidence(model, marker, candidate) {
    if (!marker.symbols || !marker.symbols.length) return { status: "none" };
    let conditional = null;
    for (const symbol of marker.symbols) {
      if (ARROWS.includes(symbol)) {
        if (checkArrow(symbol, candidate.y - marker.y, candidate.x - marker.x)) {
          return { status: "exact", symbol, kind: "arrow" };
        }
        continue;
      }
      if (THERMOS.includes(symbol)) {
        const range = THERMO_RANGES[symbol];
        const includeFrontier = Boolean(candidate.virtual);
        const distance = shortestPath(model, marker, candidate, { includeFrontier });
        if (distance >= range[0] && distance <= range[1]) {
          return {
            status: "exact", symbol, kind: "thermo", distance,
            minimum: range[0], maximum: range[1], detour: 0
          };
        }
        if (distance < range[0]) {
          const knownDistance = shortestPath(model, marker, candidate, {
            includeFrontier,
            knownOnly: true
          });
          // Как и Erinome, считаем клетку условно допустимой, если слишком
          // короткий маршрут проходит через абсолютный туман. Скрытые стены
          // могут удлинить его до нижней границы термодиапазона.
          if (!Number.isFinite(knownDistance) || knownDistance >= range[0]) {
            const evidence = {
              status: "conditional", symbol, kind: "thermo", distance,
              knownDistance, minimum: range[0], maximum: range[1],
              detour: range[0] - distance
            };
            if (!conditional || evidence.detour < conditional.detour) conditional = evidence;
          }
        }
      }
    }
    return conditional || { status: "none" };
  }

  function markerAllows(model, marker, candidate) {
    return markerEvidence(model, marker, candidate).status !== "none";
  }

  function markerStats(model, candidate) {
    const total = model.markers.length;
    let satisfied = 0;
    let exact = 0;
    let conditional = 0;
    let detour = 0;
    const evidence = [];
    for (const marker of model.markers) {
      const item = markerEvidence(model, marker, candidate);
      evidence.push(item);
      if (item.status === "none") continue;
      satisfied += 1;
      if (item.status === "conditional") {
        conditional += 1;
        detour += Number(item.detour) || 0;
      } else {
        exact += 1;
      }
    }
    return {
      satisfied, total, exact, conditional, detour, evidence,
      ratio: total ? satisfied / total : 0
    };
  }

  function mapBounds(model) {
    if (!model.cells || !model.cells.length) return null;
    return model.cells.reduce((bounds, cell) => ({
      minX: Math.min(bounds.minX, cell.x),
      maxX: Math.max(bounds.maxX, cell.x),
      minY: Math.min(bounds.minY, cell.y),
      maxY: Math.max(bounds.maxY, cell.y)
    }), { minX: Infinity, maxX: -Infinity, minY: Infinity, maxY: -Infinity });
  }

  function buildFrontierCells(model) {
    const bounds = mapBounds(model);
    if (!bounds) return [];

    // Видимая рамка не является стеной. Одного указателя достаточно для
    // проверки ограниченного кольца шириной в клетку; уверенность ограничена.
    const symbols = model.markers.flatMap((marker) => marker.symbols || []);
    const hasThermo = symbols.some((symbol) => THERMOS.includes(symbol));
    const arrowCount = symbols.filter((symbol) => ARROWS.includes(symbol)).length;
    if (!hasThermo && arrowCount < 1) return [];

    const cells = [];
    const seen = new Set();
    const add = (x, y) => {
      const key = cellKey(x, y);
      if (seen.has(key)) return;
      seen.add(key);
      cells.push({
        x, y, text: "?", wall: false, marker: false, trap: false,
        knownBoss: false, current: false, unexplored: true,
        absoluteUnknown: true, plausible: true, candidateKind: null,
        virtual: true, element: null
      });
    };

    for (let x = bounds.minX - 1; x <= bounds.maxX + 1; x += 1) {
      add(x, bounds.minY - 1);
      add(x, bounds.maxY + 1);
    }
    for (let y = bounds.minY; y <= bounds.maxY; y += 1) {
      add(bounds.minX - 1, y);
      add(bounds.maxX + 1, y);
    }
    return cells;
  }

  function frontierCandidates(model) {
    model._frontierCells = buildFrontierCells(model);
    if (model.flags && model.flags.halfTruth) return [];
    return model._frontierCells.map((cell) => {
      if (model.flags && model.flags.cellar && model.entry &&
          Math.max(Math.abs(cell.x - model.entry.x), Math.abs(cell.y - model.entry.y)) <= 1) return null;
      const stats = markerStats(model, cell);
      if (!stats.total || stats.satisfied !== stats.total) return null;
      return {
        ...cell,
        candidateKind: stats.conditional ? "thermo" : "exact",
        frontierStats: stats
      };
    }).filter(Boolean);
  }

  // На втором этаже до первого указателя сокровище нередко ещё находится за
  // рамкой показанной карты. Вместо сотен равноправных виртуальных клеток
  // создаём до трёх осторожных представителей неразведанных секторов: за
  // менее исследованной горизонтальной стороной, вертикальной и в их углу.
  function blindCellarFrontierCandidates(model) {
    const flags = model.flags || {};
    if (!flags.cellar || flags.authored || model.markers.length ||
        !model.entry || !model.current) return [];
    const bossClasses = model._bossClasses || classifyBosses(model);
    if (bossClasses.some((boss) => boss.abilityCount === 4)) return [];
    const bounds = mapBounds(model);
    if (!bounds) return [];

    const left = model.entry.x - bounds.minX;
    const right = bounds.maxX - model.entry.x;
    const up = model.entry.y - bounds.minY;
    const down = bounds.maxY - model.entry.y;
    const xImbalance = Math.abs(left - right);
    const yImbalance = Math.abs(up - down);
    const x = xImbalance ? (right < left ? bounds.maxX + 2 : bounds.minX - 2) : null;
    const y = yImbalance ? (down < up ? bounds.maxY + 2 : bounds.minY - 2) : null;
    const middleX = Math.round((model.entry.x + model.current.x) / 2);
    const middleY = Math.round((model.entry.y + model.current.y) / 2);
    const cells = [];
    const seen = new Set();
    const add = (cellX, cellY, strength, sector) => {
      if (!Number.isFinite(cellX) || !Number.isFinite(cellY)) return;
      const key = cellKey(cellX, cellY);
      if (seen.has(key)) return;
      seen.add(key);
      cells.push({
        x: cellX, y: cellY, text: "?", wall: false, marker: false,
        trap: false, knownBoss: false, current: false, unexplored: true,
        absoluteUnknown: true, plausible: true, candidateKind: null,
        virtual: true, blindFrontier: true,
        blindFrontierStrength: strength, blindFrontierSector: sector,
        element: null
      });
    };

    if (x != null) {
      add(x, middleY, 4 + Math.min(4, xImbalance), "горизонтальный");
    }
    if (y != null) {
      add(middleX, y, 4 + Math.min(4, yImbalance), "вертикальный");
    }
    if (x != null && y != null) {
      add(x, y, 6 + Math.min(4, xImbalance) + Math.min(4, yImbalance), "угловой");
    }
    return cells;
  }

  function orthogonalWallContacts(model, candidate) {
    const byPosition = model._byPosition || new Map(model.cells.map((cell) => [cellKey(cell.x, cell.y), cell]));
    return [
      [candidate.x + 1, candidate.y],
      [candidate.x - 1, candidate.y],
      [candidate.x, candidate.y + 1],
      [candidate.x, candidate.y - 1]
    ].reduce((count, pair) => {
      const neighbour = byPosition.get(cellKey(pair[0], pair[1]));
      return count + (neighbour && neighbour.wall ? 1 : 0);
    }, 0);
  }

  function nearestBoss(candidate, bosses) {
    let best = null;
    for (const boss of bosses || []) {
      const dx = Math.abs(candidate.x - boss.x);
      const dy = Math.abs(candidate.y - boss.y);
      const chebyshev = Math.max(dx, dy);
      const manhattan = dx + dy;
      if (!best || chebyshev < best.chebyshev ||
          (chebyshev === best.chebyshev && manhattan < best.manhattan)) {
        best = { boss, chebyshev, manhattan };
      }
    }
    return best;
  }

  function capitalWallKeys(model) {
    const byPosition = model._byPosition || new Map(model.cells.map((cell) => [cellKey(cell.x, cell.y), cell]));
    const queue = [];
    const connected = new Set();

    for (const cell of model.cells) {
      if (!cell.wall) continue;
      const onMapEdge = cell.x === 0 || cell.y === 0 ||
        cell.x === model.width - 1 || cell.y === model.height - 1;
      if (!onMapEdge) continue;
      const key = cellKey(cell.x, cell.y);
      connected.add(key);
      queue.push(cell);
    }

    for (let index = 0; index < queue.length; index += 1) {
      const current = queue[index];
      for (const [dx, dy] of CARDINAL_DIRECTIONS) {
        const x = current.x + dx;
        const y = current.y + dy;
        const key = cellKey(x, y);
        const neighbour = byPosition.get(key);
        if (!neighbour || !neighbour.wall || connected.has(key)) continue;
        connected.add(key);
        queue.push(neighbour);
      }
    }

    return connected;
  }

  function wallRelation(boss, capitalWalls) {
    let minimum = Infinity;
    let nearest = [];
    for (const key of capitalWalls) {
      const [x, y] = key.split(":").map(Number);
      const distance = Math.max(Math.abs(boss.x - x), Math.abs(boss.y - y));
      if (distance < minimum) {
        minimum = distance;
        nearest = [{ x, y }];
      } else if (distance === minimum) {
        nearest.push({ x, y });
      }
    }

    if (!Number.isFinite(minimum) || minimum > 2) {
      return { distance: minimum, away: null };
    }

    const vector = nearest.reduce((sum, wall) => ({
      x: sum.x + Math.sign(boss.x - wall.x),
      y: sum.y + Math.sign(boss.y - wall.y)
    }), { x: 0, y: 0 });
    const away = { x: Math.sign(vector.x), y: Math.sign(vector.y) };
    return {
      distance: minimum,
      away: away.x || away.y ? away : null
    };
  }

  function classifyBosses(model) {
    const flags = model.flags || {};
    const targetAbilities = flags.cellar ? 4 : 3;
    const capitalWalls = model._capitalWallKeys || capitalWallKeys(model);
    const unreliableLayout = flags.migration || flags.unusualLayout || flags.authored;
    const unreliableAbilities = flags.migration || flags.authored;

    return (model.bosses || []).map((boss) => {
      const relation = wallRelation(boss, capitalWalls);
      const entryDistance = model.entry ? shortestPath(model, model.entry, boss) : Infinity;
      let role = "unknown";

      if (boss.authoredFinal) {
        // В авторском подземелье личный босс автора отмечен плюсами.
        // Число его способностей и положение не подчиняются обычной лестнице боссов.
        role = "authorFinal";
      } else if (!unreliableAbilities && boss.abilityCount === targetAbilities) {
        role = "final";
      } else if (!unreliableLayout && boss.abilityCount === targetAbilities - 1) {
        role = "semifinal";
      } else if (!unreliableLayout && boss.abilityCount === targetAbilities - 2) {
        // У первого путевого босса между входом и боссом обычно остаются
        // две или три свободные клетки: это 3–4 шага по кратчайшему пути.
        const routeDistance = entryDistance === 3 || entryDistance === 4;
        const onEntryAxis = Boolean(model.entry) &&
          (boss.x === model.entry.x || boss.y === model.entry.y);
        if (routeDistance && (onEntryAxis || relation.distance > 2)) role = "route";
        else if (routeDistance) role = "ambiguous";
        else if (Number.isFinite(entryDistance) || relation.distance <= 2) role = "pristen";
      }

      return {
        ...boss,
        role,
        entryDistance,
        capitalWallDistance: relation.distance,
        awayFromWall: relation.away
      };
    });
  }

  const CARDINAL_DIRECTIONS = [
    [0, -1],
    [1, 0],
    [0, 1],
    [-1, 0]
  ];

  const EIGHT_DIRECTIONS = [
    [-1, -1], [0, -1], [1, -1],
    [-1, 0],             [1, 0],
    [-1, 1],  [0, 1],   [1, 1]
  ];

  function regularFirstFloorBossRules(model) {
    const flags = model.flags || {};
    return !flags.cellar && !flags.migration && !flags.unusualLayout &&
      !flags.authored && !flags.abandoned && !flags.mystery;
  }

  // Оси исследования «Лезем на стену» направлены от входа к предполагаемому
  // кладу. Поэтому роль однушки нельзя определить один раз на всю карту:
  // для каждого кандидата знаки обеих осей могут быть другими.
  function candidateAxisOffsets(model, boss, candidate) {
    if (!model.entry) return [];
    const offsets = [];
    if (candidate.x !== model.entry.x) {
      offsets.push((boss.x - model.entry.x) * Math.sign(candidate.x - model.entry.x));
    }
    if (candidate.y !== model.entry.y) {
      offsets.push((boss.y - model.entry.y) * Math.sign(candidate.y - model.entry.y));
    }
    return offsets;
  }

  // Практическое следствие исследования Михуза: однушка на линии -1/-2,
  // которая не подпирает капитальную стену, является путевой. Требуем уже
  // найденную капитальную стену, чтобы неизвестный край карты не превратился
  // в ложное доказательство отсутствия стены.
  function wallShiftedRouteEvidence(model, boss, candidate) {
    if (!regularFirstFloorBossRules(model) || boss.abilityCount !== 1) return null;
    const capitalWalls = model._capitalWallKeys || capitalWallKeys(model);
    if (!capitalWalls.size) return null;
    const supportsWall = CARDINAL_DIRECTIONS.some(([dx, dy]) =>
      capitalWalls.has(cellKey(boss.x + dx, boss.y + dy)));
    if (supportsWall) return null;
    const wallDistance = boss.capitalWallDistance;
    if (!Number.isFinite(wallDistance)) return null;
    const line = candidateAxisOffsets(model, boss, candidate)
      .find((offset) => offset === -1 || offset === -2);
    return line == null ? null : { line, wallDistance };
  }

  // Непутевые однушки обычного первого этажа не занимают нулевые линии,
  // проходящие через вход. Поэтому однушка на одной из этих осей может быть
  // путевой даже тогда, когда открытые стены удлинили путь и обычное правило
  // «3–4 шага от входа» её не распознало. Сам бонус всё равно выдаётся только
  // кандидату, чей кратчайший путь действительно проходит через босса.
  function entryAxisRouteEvidence(model, boss) {
    if (!regularFirstFloorBossRules(model) || !model.entry || boss.abilityCount !== 1) {
      return null;
    }
    if (boss.x === model.entry.x) return { axis: "vertical" };
    if (boss.y === model.entry.y) return { axis: "horizontal" };
    return null;
  }

  function visibleHiddenBoss(cell) {
    return Boolean(cell) && !cell.wall && !cell.trap && !cell.knownBoss &&
      (cell.visibleBossCandidate || String(cell.text || "").includes("⚠"));
  }

  // В карте Erinome червоточина хранится отдельным символом '~', а не одним
  // из классов trap*. В присланной строгой Г-схеме именно она занимает место
  // прикладовой ловушки, поэтому для архитектуры первого этажа это равноправная
  // специальная клетка. Глобально превращать её в обычную ловушку не нужно.
  function attachedTrap(cell) {
    return Boolean(cell) && (cell.trap || String(cell.text || "").trim() === "~");
  }

  // Скрытые варианты строгих Г- и Т-схем первого этажа. Число абилок не
  // наблюдается напрямую — роль финала следует из полной структуры.
  function hiddenFinalPattern(model, candidate) {
    if (!regularFirstFloorBossRules(model)) return null;
    const byPosition = model._byPosition ||
      new Map(model.cells.map((cell) => [cellKey(cell.x, cell.y), cell]));
    const neighbours = CARDINAL_DIRECTIONS.map(([dx, dy]) => ({
      dx,
      dy,
      cell: byPosition.get(cellKey(candidate.x + dx, candidate.y + dy))
    }));

    for (const bossSide of neighbours) {
      if (!visibleHiddenBoss(bossSide.cell)) continue;
      for (const trapSide of neighbours) {
        if (!attachedTrap(trapSide.cell)) continue;
        if (bossSide.dx * trapSide.dx + bossSide.dy * trapSide.dy !== 0) continue;
        const remaining = neighbours.filter((item) => item !== bossSide && item !== trapSide);
        if (!remaining.every((item) => item.cell && item.cell.wall)) continue;
        return {
          delta: 22,
          text: "строгая Г-схема: ⚠ — вероятный финал на 3 абилки; рядом ловушка и две стены"
        };
      }
    }

    // Т-схема из прикладовой таблицы: клад зажат двумя боковыми стенами,
    // а перед ним лежат три известные клетки без стен. На концах этой тройки
    // находятся прикладовая ловушка и финал, посередине — тайник/открытая
    // клетка. Повороты и зеркальные отражения равноправны.
    const knownOpen = (cell) => Boolean(cell) && !cell.wall && !cell.absoluteUnknown;
    for (const [dx, dy] of CARDINAL_DIRECTIONS) {
      const perpendicular = [-dy, dx];
      const firstWall = byPosition.get(cellKey(
        candidate.x + perpendicular[0], candidate.y + perpendicular[1]));
      const secondWall = byPosition.get(cellKey(
        candidate.x - perpendicular[0], candidate.y - perpendicular[1]));
      if (!firstWall || !firstWall.wall || !secondWall || !secondWall.wall) continue;

      const endpoints = [
        byPosition.get(cellKey(
          candidate.x + dx + perpendicular[0],
          candidate.y + dy + perpendicular[1])),
        byPosition.get(cellKey(
          candidate.x + dx - perpendicular[0],
          candidate.y + dy - perpendicular[1]))
      ];
      const centre = byPosition.get(cellKey(candidate.x + dx, candidate.y + dy));
      if (!knownOpen(centre) || attachedTrap(centre) || visibleHiddenBoss(centre) ||
          centre.knownBoss) continue;

      for (let bossIndex = 0; bossIndex < endpoints.length; bossIndex += 1) {
        const trapIndex = 1 - bossIndex;
        if (!visibleHiddenBoss(endpoints[bossIndex]) ||
            !attachedTrap(endpoints[trapIndex])) continue;
        return {
          delta: 22,
          text: "строгая Т-схема: ⚠ — вероятный финал на 3 абилки; клад зажат стенами, на другом конце приклада ловушка"
        };
      }
    }
    return null;
  }

  function architecturePattern(model, candidate) {
    const flags = model.flags || {};
    if (flags.migration || flags.unusualLayout || flags.authored) return null;

    const byPosition = model._byPosition || new Map(model.cells.map((cell) => [cellKey(cell.x, cell.y), cell]));
    const bossesByPosition = new Map((model.bosses || []).map((boss) => [cellKey(boss.x, boss.y), boss]));
    const targetAbilities = flags.cellar ? 4 : 3;
    const matches = [];
    const cellAt = (x, y) => byPosition.get(cellKey(x, y));
    const bossAt = (x, y) => bossesByPosition.get(cellKey(x, y));
    const isWall = (x, y) => Boolean(cellAt(x, y) && cellAt(x, y).wall);
    // Отсутствие известной стены ещё не означает, что проход разведан.
    const isOpen = (x, y) => Boolean(cellAt(x, y) &&
      !cellAt(x, y).wall && !cellAt(x, y).absoluteUnknown);
    const bossKind = (boss) => {
      if (!boss) return "none";
      if (boss.abilityCount === targetAbilities) return "exact";
      if (boss.abilityCount == null) return "unknown";
      return "wrong";
    };
    const addMatch = (boss, exactDelta, unknownDelta, exactText, unknownText) => {
      const kind = bossKind(boss);
      if (kind === "exact") matches.push({ delta: exactDelta, text: exactText });
      else if (kind === "unknown") matches.push({ delta: unknownDelta, text: unknownText });
    };

    const neighbours = CARDINAL_DIRECTIONS.map(([dx, dy]) => ({
      dx,
      dy,
      cell: cellAt(candidate.x + dx, candidate.y + dy),
      boss: bossAt(candidate.x + dx, candidate.y + dy)
    }));
    const wallNeighbours = neighbours.filter((item) => item.cell && item.cell.wall);

    if (flags.cellar) {
      const squareTwo = Boolean(model.entry) &&
        Math.max(Math.abs(candidate.x - model.entry.x), Math.abs(candidate.y - model.entry.y)) === 2;
      const addCellarMatch = (boss, exactDelta, unknownDelta, exactText, unknownText) => {
        const kind = bossKind(boss);
        if (kind === "none" || kind === "wrong") return;
        matches.push({
          delta: kind === "exact" ? exactDelta : unknownDelta,
          text: kind === "exact" ? exactText : unknownText
        });
      };
      const adjacentBosses = EIGHT_DIRECTIONS
        .map(([dx, dy]) => bossAt(candidate.x + dx, candidate.y + dy))
        .filter(Boolean);

      // В аномальном квадрате-2 вокруг лестницы прикладовые Т/J/Г/О-схемы
      // не действуют. Надёжно только общее правило: сфин занимает одну из
      // восьми соседних с кладом клеток. Бонус соседства начисляется отдельно
      // в scoreCandidate(), а здесь мы лишь запрещаем ложные схемные бонусы.
      if (squareTwo) {
        return {
          delta: 0,
          text: "квадрат-2: прикладовые схемы отключены; учитывается только соседство сфина"
        };
      }

      // На втором этаже ловушки и тайники не входят в формулу. Используется
      // только геометрия «сфин — клад — стены», причём сфин может стоять и по диагонали.
      if (wallNeighbours.length === 2) {
        const [first, second] = wallNeighbours;
        const formCorner = first.dx * second.dx + first.dy * second.dy === 0;
        if (formCorner) {
          for (const boss of adjacentBosses) {
            addCellarMatch(boss, 32, 12,
              "Г-схема второго этажа: сфин рядом с кладом в углу стен",
              "возможная Г-схема второго этажа; абилки босса не видны");
          }
        }
      }

      // J-схема («затычка»): клад окружён тремя стенами, сфин закрывает
      // четвёртую сторону, а обязательная диагональная стена возле сфина
      // не позволяет принять рисунок за полную Т-схему.
      if (wallNeighbours.length === 3) {
        const opening = neighbours.find((item) => !item.cell || !item.cell.wall);
        if (opening) {
          const perpendicular = [-opening.dy, opening.dx];
          const diagonalWall = isWall(
            candidate.x + opening.dx + perpendicular[0],
            candidate.y + opening.dy + perpendicular[1]
          ) || isWall(
            candidate.x + opening.dx - perpendicular[0],
            candidate.y + opening.dy - perpendicular[1]
          );
          if (diagonalWall) {
            addCellarMatch(opening.boss, 44, 18,
              "J-схема второго этажа: три стены, сфин и обязательная диагональная стена",
              "возможная J-схема второго этажа; абилки босса не видны");
          }
        }
      }

      // О-схема: сфин — клад — стена на одной оси; клад входит в квадрат
      // из четырёх клеток без стен.
      for (const neighbour of neighbours) {
        if (!neighbour.boss ||
            !isWall(candidate.x - neighbour.dx, candidate.y - neighbour.dy)) continue;
        addCellarMatch(neighbour.boss, 27, 10,
          "О-схема второго этажа: сфин, клад и стена на одной линии",
          "возможная О-схема второго этажа; абилки босса не видны");
      }

      // Т-схема: две боковые стены зажимают клад, а сфин стоит в открытой тройке.
      for (const [dx, dy] of CARDINAL_DIRECTIONS) {
        const perpendicular = [-dy, dx];
        if (!isWall(candidate.x + perpendicular[0], candidate.y + perpendicular[1]) ||
            !isWall(candidate.x - perpendicular[0], candidate.y - perpendicular[1])) continue;
        const bar = [
          [candidate.x + dx + perpendicular[0], candidate.y + dy + perpendicular[1]],
          [candidate.x + dx, candidate.y + dy],
          [candidate.x + dx - perpendicular[0], candidate.y + dy - perpendicular[1]]
        ];
        if (!bar.every(([x, y]) => isOpen(x, y))) continue;
        for (const [x, y] of bar) {
          addCellarMatch(bossAt(x, y), 30, 11,
            "Т-схема второго этажа: сфин в открытой тройке у клада",
            "возможная Т-схема второго этажа; абилки босса не видны");
        }
      }

      // Редкая Ц-схема: клад и сфин находятся в симметричных клетках хода коня
      // относительно лестницы. Простого совпадения двух «коней» недостаточно.
      const isKnightMove = (point, origin) => {
        const distances = [Math.abs(point.x - origin.x), Math.abs(point.y - origin.y)].sort((a, b) => a - b);
        return distances[0] === 1 && distances[1] === 2;
      };
      if (model.entry && isKnightMove(candidate, model.entry)) {
        const oppositeBoss = (model.bosses || []).find((boss) =>
          isKnightMove(boss, model.entry) &&
          boss.x - model.entry.x === -(candidate.x - model.entry.x) &&
          boss.y - model.entry.y === -(candidate.y - model.entry.y));
        addCellarMatch(oppositeBoss, 20, 8,
          "редкая Ц-схема: клад и сфин симметричны относительно лестницы",
          "возможная редкая Ц-схема; абилки босса не видны");
      }

      return matches.sort((a, b) => b.delta - a.delta)[0] || null;
    }

    // Схемы первого этажа. Здесь прикладовая ловушка действительно является
    // полезной частью строгих Г/Т-шаблонов.
    for (const neighbour of neighbours) {
      const kind = bossKind(neighbour.boss);
      if (kind === "none" || kind === "wrong") continue;
      if (wallNeighbours.length === 2) {
        const [first, second] = wallNeighbours;
        const formCorner = first.dx * second.dx + first.dy * second.dy === 0;
        if (formCorner) {
          addMatch(neighbour.boss, 36, 15,
            "Г-схема: финал у клада в углу стен",
            "возможная Г-схема; абилки босса не видны");
        }
      }
      // На первом этаже прикладовых схем только две: Г и Т. J-схема
      // относится ко второму этажу и здесь не должна давать бонус.
    }

    // Классическая Г-схема: две стены образуют угол, а финал и ловушка
    // занимают две оставшиеся соседние клетки. Повороты и отражения равноправны.
    for (const bossSide of neighbours) {
      for (const trapSide of neighbours) {
        if (!bossSide.boss || !attachedTrap(trapSide.cell)) continue;
        if (bossSide.dx * trapSide.dx + bossSide.dy * trapSide.dy !== 0) continue;
        const remaining = neighbours.filter((item) => item !== bossSide && item !== trapSide);
        if (!remaining.every((item) => item.cell && item.cell.wall)) continue;
        addMatch(bossSide.boss, 58, 25,
          "Г-схема: финал, клад и прикладовая ловушка",
          "Г-схема с ловушкой; абилки босса не видны");
      }
    }

    // Т-схема: клад зажат между боковыми стенами, а финал стоит на одном
    // из концов свободной тройки клеток перед ним. Ловушки в тройке необязательны.
    for (const [dx, dy] of CARDINAL_DIRECTIONS) {
      const perpendicular = [-dy, dx];
      if (!isWall(candidate.x + perpendicular[0], candidate.y + perpendicular[1]) ||
          !isWall(candidate.x - perpendicular[0], candidate.y - perpendicular[1])) continue;
      const bar = [
        [candidate.x + dx + perpendicular[0], candidate.y + dy + perpendicular[1]],
        [candidate.x + dx, candidate.y + dy],
        [candidate.x + dx - perpendicular[0], candidate.y + dy - perpendicular[1]]
      ];
      if (!bar.every(([x, y]) => isOpen(x, y))) continue;
      const trapSeen = bar.some(([x, y]) => attachedTrap(cellAt(x, y)));
      for (const endpoint of [bar[0], bar[2]]) {
        const boss = bossAt(endpoint[0], endpoint[1]);
        addMatch(boss, trapSeen ? 56 : 49, trapSeen ? 25 : 20,
          trapSeen ? "Т-схема: финал и ловушка у зажатого стенами клада" :
            "Т-схема: финал у зажатого стенами клада",
          "возможная Т-схема; абилки босса не видны");
      }
    }

    // Пользовательский наблюдаемый вариант: босс и ловушка находятся по разные
    // стороны от клетки, которая зажата стенами поперёк прохода.
    for (const [dx, dy] of CARDINAL_DIRECTIONS) {
      const perpendicular = [-dy, dx];
      const boss = bossAt(candidate.x + dx, candidate.y + dy);
      const trap = cellAt(candidate.x - dx, candidate.y - dy);
      if (!attachedTrap(trap) ||
          !isWall(candidate.x + perpendicular[0], candidate.y + perpendicular[1]) ||
          !isWall(candidate.x - perpendicular[0], candidate.y - perpendicular[1])) continue;
      addMatch(boss, 42, 18,
        "финал ↔ клад ↔ ловушка в узком проходе",
        "босс ↔ клад ↔ ловушка; абилки босса не видны");
    }

    return matches.sort((a, b) => b.delta - a.delta)[0] || null;
  }

  function partialTrapPattern(model, candidate) {
    const flags = model.flags || {};
    // На втором этаже ловушки и тайники не определяют положение клада.
    if (flags.cellar || flags.migration || flags.unusualLayout || flags.authored) return null;

    const byPosition = model._byPosition || new Map(model.cells.map((cell) => [cellKey(cell.x, cell.y), cell]));
    const targetAbilities = flags.cellar ? 4 : 3;
    const exactFinalNearby = (model.bosses || []).some((boss) =>
      boss.abilityCount === targetAbilities &&
      Math.abs(boss.x - candidate.x) + Math.abs(boss.y - candidate.y) === 1);
    if (exactFinalNearby) return null;

    const cellAt = (x, y) => byPosition.get(cellKey(x, y));
    const isWall = (x, y) => Boolean(cellAt(x, y) && cellAt(x, y).wall);
    const isOpen = (x, y) => Boolean(cellAt(x, y) && !cellAt(x, y).wall);
    let best = null;

    // Ранняя половина пользовательской схемы:
    //    # будущий финал #
    //    #      клад     #
    //    #    ловушка    #
    // Ловушка и боковые стены уже позволяют подсветить клетку до встречи с финалом.
    for (const [dx, dy] of CARDINAL_DIRECTIONS) {
      const trap = cellAt(candidate.x - dx, candidate.y - dy);
      if (!attachedTrap(trap)) continue;
      const perpendicular = [-dy, dx];
      const sideWalls = isWall(candidate.x + perpendicular[0], candidate.y + perpendicular[1]) &&
        isWall(candidate.x - perpendicular[0], candidate.y - perpendicular[1]);
      const possibleFinal = isOpen(candidate.x + dx, candidate.y + dy);
      if (sideWalls && possibleFinal) {
        best = { delta: 8, text: "ранняя схема: ловушка и стены у возможного приклада" };
        break;
      }
      if (orthogonalWallContacts(model, candidate) >= 2 && (!best || best.delta < 3)) {
        best = { delta: 3, text: "ловушка и две стены рядом с возможным прикладом" };
      }
    }
    return best;
  }

  function routeBossReasons(model, candidate) {
    const flags = model.flags || {};
    if (!model.entry || flags.migration || flags.unusualLayout || flags.authored) return [];
    const totalDistance = shortestPath(model, model.entry, candidate);
    if (!Number.isFinite(totalDistance)) return [];
    let firstRouteBoss = false;
    let semifinalRouteBoss = false;
    let semifinalInTreasureWindow = false;
    let orderedBossChain = false;
    let tooCloseToSemifinal = false;
    let wallShiftedRouteBoss = false;
    let entryAxisRouteBoss = false;
    const routeEntryDistances = [];
    const semifinalEntryDistances = [];

    const bossClasses = model._bossClasses || classifyBosses(model);
    for (const boss of bossClasses) {
      const wallRoute = wallShiftedRouteEvidence(model, boss, candidate);
      const axisRoute = !wallRoute && boss.role !== "route" ?
        entryAxisRouteEvidence(model, boss) : null;
      const role = wallRoute || axisRoute ? "route" : boss.role;
      const distanceToBoss = shortestPath(model, model.entry, boss);
      const distanceFromBoss = shortestPath(model, boss, candidate);
      const liesOnShortestPath = Number.isFinite(distanceToBoss) && Number.isFinite(distanceFromBoss) &&
        distanceToBoss + distanceFromBoss === totalDistance;
      if (role === "route" && liesOnShortestPath) {
        firstRouteBoss = true;
        if (wallRoute) wallShiftedRouteBoss = true;
        if (axisRoute) entryAxisRouteBoss = true;
        routeEntryDistances.push(distanceToBoss);
      }
      if (role === "semifinal") {
        if (liesOnShortestPath) {
          semifinalRouteBoss = true;
          semifinalEntryDistances.push(distanceToBoss);
          // Полуфинал обычно встречается незадолго до приклада. Этот диапазон
          // полезен раньше финального босса, но сам по себе не считается доказательством.
          if (distanceFromBoss >= 4 && distanceFromBoss <= 8) semifinalInTreasureWindow = true;
        }
        if (distanceFromBoss < 3) tooCloseToSemifinal = true;
      }
    }

    if (routeEntryDistances.length && semifinalEntryDistances.length) {
      orderedBossChain = routeEntryDistances.some((routeDistance) =>
        semifinalEntryDistances.some((semifinalDistance) => routeDistance < semifinalDistance));
    }

    const result = [];
    if (firstRouteBoss) result.push({ delta: 9, text: "путевой младший босс лежит на кратчайшем пути" });
    if (wallShiftedRouteBoss) {
      result.push({
        delta: 4,
        text: "однушка на линии −1/−2 без опоры на капитальную стену — путевая"
      });
    }
    if (entryAxisRouteBoss) {
      result.push({
        delta: 4,
        text: "однушка на нулевой линии через вход — путевая"
      });
    }
    // Спорный младший босс возле капитальной стены больше не даёт бонуса:
    // архивная проверка показала, что это слишком часто обычный пристен.
    if (semifinalRouteBoss) result.push({ delta: 15, text: "полуфинал лежит на кратчайшем пути" });
    if (semifinalInTreasureWindow) {
      result.push({ delta: 3, text: "до полуфинала типичные 4–8 шагов" });
    }
    if (orderedBossChain) {
      result.push({ delta: 12, text: "путевой босс и полуфинал образуют маршрут к клетке" });
    }
    if (tooCloseToSemifinal) result.push({ delta: -12, text: "до полуфинала меньше трёх шагов" });
    return result;
  }

  function hiddenSemifinalReasons(model, candidate) {
    if (!regularFirstFloorBossRules(model) || !model.entry || !model.current) return [];
    const inference = model._hiddenBossInference || inferHiddenBosses(model, []);
    if (!inference || inference.mode !== "active") return [];

    const totalFromCurrent = shortestPath(model, model.current, candidate);
    const totalFromEntry = shortestPath(model, model.entry, candidate);
    if (!Number.isFinite(totalFromCurrent) || !Number.isFinite(totalFromEntry)) return [];

    const routeBosses = (model._bossClasses || classifyBosses(model)).filter((boss) => {
      if (boss.abilityCount !== 1) return false;
      const role = wallShiftedRouteEvidence(model, boss, candidate) ||
        entryAxisRouteEvidence(model, boss) ? "route" : boss.role;
      if (role !== "route") return false;
      const before = shortestPath(model, model.entry, boss);
      const after = shortestPath(model, boss, candidate);
      return Number.isFinite(before) && Number.isFinite(after) &&
        before + after === totalFromEntry;
    });
    if (!routeBosses.length) return [];

    for (const hidden of inference.candidates || []) {
      // Один видимый ⚠ возле @ остаётся достаточным свидетельством. Кроме
      // него допускаем локализованный активный кластер: минимум два связанных
      // предупреждения должны вынужденно указывать на одну область. Обычные
      // старые треугольники без связи с текущей группой сюда не попадают.
      const direct = hidden.direct || visibleHiddenBoss(hidden);
      const clustered = inference.activeWarningCount >= 2 &&
        (hidden.minimumForced || hidden.coverage >= 2) && hidden.bossRiskScore >= 78;
      if (!direct && !clustered) continue;
      const toHidden = shortestPath(model, model.current, hidden);
      const hiddenToTreasure = shortestPath(model, hidden, candidate);
      const onRemainingRoute = Number.isFinite(toHidden) && Number.isFinite(hiddenToTreasure) &&
        toHidden + hiddenToTreasure === totalFromCurrent;
      if (!onRemainingRoute || hiddenToTreasure < 4 || hiddenToTreasure > 10) continue;

      const hiddenFromEntry = shortestPath(model, model.entry, hidden);
      const ordered = routeBosses.some((boss) => {
        const bossFromEntry = shortestPath(model, model.entry, boss);
        return Number.isFinite(hiddenFromEntry) && Number.isFinite(bossFromEntry) &&
          bossFromEntry < hiddenFromEntry;
      });
      if (!ordered) continue;

      const coreWindow = hiddenToTreasure <= 8;
      return [{
        delta: coreWindow ? (direct ? 14 : 12) : (direct ? 8 : 7),
        text: direct ?
          (coreWindow ?
            "путевая однушка → ⚠ за 4–8 шагов до клетки: вероятный полуфинал на 2 абилки" :
            "путевая однушка → ⚠ за 9–10 шагов до области клада: вероятный полуфинал") :
          (coreWindow ?
            "путевая однушка → кластер предупреждений за 4–8 шагов: вероятный полуфинал" :
            "путевая однушка → кластер предупреждений за 9–10 шагов до области клада")
      }];
    }
    return [];
  }

  function pristenReasons(model, candidate) {
    const flags = model.flags || {};
    if (flags.migration || flags.unusualLayout || flags.authored) return [];
    const bossClasses = model._bossClasses || classifyBosses(model);
    let agrees = 0;
    let disagrees = 0;

    for (const boss of bossClasses) {
      if (boss.role !== "pristen" || !boss.awayFromWall) continue;
      if (wallShiftedRouteEvidence(model, boss, candidate)) continue;
      const dx = candidate.x - boss.x;
      const dy = candidate.y - boss.y;
      const direction = dx * boss.awayFromWall.x + dy * boss.awayFromWall.y;
      if (direction > 0) agrees += 1;
      else if (direction < 0) disagrees += 1;
    }

    if (!agrees && !disagrees) return [];
    const delta = Math.max(-8, Math.min(10, agrees * 4 - disagrees * 3));
    if (!delta) return [];
    if (delta > 0) {
      return [{
        delta,
        text: agrees === 1 ? "пристен указывает от капитальной стены" :
          "пристены указывают от капитальных стен (" + agrees + ")"
      }];
    }
    return [{ delta, text: "клетка лежит со стороны капитальной стены от пристена" }];
  }

  function addReason(reasons, delta, text) {
    reasons.push({ delta, text });
    return delta;
  }

  function scoreCandidate(model, candidate, source) {
    const flags = model.flags || {};
    const reasons = [];
    const stats = markerStats(model, candidate);
    let score = 0;

    if (flags.halfTruth) {
      score += addReason(reasons, 55 + stats.ratio * 35,
        stats.satisfied + " из " + stats.total + " указателей согласны");
    } else if (candidate.candidateKind === "exact") {
      score += addReason(reasons, 100, "проходит все указатели Erinome");
    } else if (candidate.candidateKind === "thermo") {
      // Условные клетки не равны между собой: чем больше термоподсказок
      // требуют скрытого обхода и чем длиннее этот обход, тем слабее вариант.
      // Штраф остаётся мягким — в kha7rpq73 настоящий клад был оранжевым.
      const conditionalCount = stats.conditional || 1;
      const extraDetour = Math.max(0, (stats.detour || conditionalCount) - conditionalCount);
      const thermoPenalty = Math.min(8, extraDetour * 1.5 +
        Math.max(0, conditionalCount - 1) * 1.5);
      const thermoScore = stats.conditional ?
        Math.round((98 - thermoPenalty) * 10) / 10 : 96;
      const thermoText = stats.conditional ?
        "термопуть условный: скрытые стены должны добавить " + stats.detour +
          " шаг" + (stats.detour === 1 ? "" : stats.detour >= 2 && stats.detour <= 4 ? "а" : "ов") :
        "проходит стрелки; термоуказатель допускает скрытую стену";
      score += addReason(reasons, thermoScore, thermoText);
    } else if (stats.total && stats.satisfied === stats.total) {
      score += addReason(reasons, 92, "проходит все найденные указатели");
    } else if (stats.total) {
      score += addReason(reasons, 30 + stats.ratio * 45,
        stats.satisfied + " из " + stats.total + " указателей согласны");
    } else {
      score += addReason(reasons, 20, "указателей пока нет");
    }

    if (candidate.virtual) {
      score += addReason(reasons, 0,
        stats.total >= 2 ?
          "пересечение указателей за текущим краем карты" :
          "за текущим краем карты; сетка может расшириться");
    }

    if (flags.aquarium) {
      return { ...candidate, score, markerStats: stats, reasons, source };
    }

    if (/!/u.test(String(candidate.text || ""))) {
      score += addReason(reasons, 2, "неразведанная особая клетка");
    }

    const nearbyBosses = (model._bossClasses || classifyBosses(model))
      .map((boss) => ({
        boss,
        dx: Math.abs(candidate.x - boss.x),
        dy: Math.abs(candidate.y - boss.y)
      }))
      .filter((item) => Math.max(item.dx, item.dy) === 1);
    if (nearbyBosses.length && !flags.migration && !flags.authored) {
      const exactFinal = nearbyBosses.find((item) => item.boss.role === "final");
      const unknown = nearbyBosses.find((item) => item.boss.abilityCount == null);
      const pathBoss = nearbyBosses.find((item) =>
        item.boss.role !== "pristen" && item.boss.role !== "ambiguous");
      if (exactFinal && flags.cellar) {
        score += addReason(reasons, 26,
          "геометрически соседняя со сфином на 4 способности клетка");
      } else if (exactFinal) {
        score += addReason(reasons, exactFinal.dx + exactFinal.dy === 1 ? 27 : 20,
          "рядом с финалом на 3 способности");
      } else if (unknown) {
        const orthogonal = unknown.dx + unknown.dy === 1;
        score += addReason(reasons, flags.cellar ? 9 : (orthogonal ? 14 : 9),
          flags.cellar ? "геометрически рядом с возможным сфином" :
            "рядом с возможным финальным боссом");
      } else if (pathBoss) {
        score += addReason(reasons, 3, "рядом с путевым боссом");
      }
    }

    const pattern = architecturePattern(model, candidate);
    if (pattern) {
      score += addReason(reasons, pattern.delta, pattern.text);
    }

    const hiddenFinal = hiddenFinalPattern(model, candidate);
    if (hiddenFinal) {
      score += addReason(reasons, hiddenFinal.delta, hiddenFinal.text);
    }

    const earlyTrap = hiddenFinal ? null : partialTrapPattern(model, candidate);
    if (earlyTrap) {
      score += addReason(reasons, earlyTrap.delta, earlyTrap.text);
    }

    for (const routeReason of routeBossReasons(model, candidate)) {
      score += addReason(reasons, routeReason.delta, routeReason.text);
    }

    for (const hiddenSemifinal of hiddenSemifinalReasons(model, candidate)) {
      score += addReason(reasons, hiddenSemifinal.delta, hiddenSemifinal.text);
    }

    for (const pristenReason of pristenReasons(model, candidate)) {
      score += addReason(reasons, pristenReason.delta, pristenReason.text);
    }

    if (!flags.special && model.entry) {
      const dx = Math.abs(candidate.x - model.entry.x);
      const dy = Math.abs(candidate.y - model.entry.y);
      if (flags.cellar) {
        const nearStairs = Math.max(dx, dy) <= 1;
        if (nearStairs) score += addReason(reasons, -25, "слишком близко к лестнице");
        // width/height описывают видимую область, которая растёт при разведке.
        // По её краю нельзя заключать, что рядом капитальная стена.
      } else {
        const walkDistance = shortestPath(model, model.entry, candidate);
        const walkScore = pathLengthScore(walkDistance);
        if (walkScore != null) {
          if (walkScore === 5) {
            score += addReason(reasons, walkScore,
              "обычная длина пути от входа: 11–29 шагов");
          } else if (walkScore > 0) {
            score += addReason(reasons, walkScore,
              "длина пути близка к обычной");
          } else {
            score += addReason(reasons, walkScore,
              "необычная длина пути от входа");
          }
        }
        // Типовая зона 3–11 — статистическая подсказка, а не жёсткая
        // граница генератора. Раньше соседние клетки на 11-й и 12-й
        // координатах различались сразу на 20 баллов. Из-за этого в логе
        // rph1qnj8a настоящий клад [-12;-4] проигрывал ложному [-11;-4].
        // Теперь за каждый шаг за пределы диапазона снимается по 5 баллов.
        const outsideZone = Math.max(0, 3 - dx, dx - 11) +
          Math.max(0, 3 - dy, dy - 11);
        const zoneScore = Math.max(-8, 12 - outsideZone * 5);
        if (outsideZone === 0) {
          score += addReason(reasons, zoneScore,
            "в обычной зоне 3–11 от входа по обеим осям");
        } else if (zoneScore > 0) {
          score += addReason(reasons, zoneScore,
            "рядом с обычной зоной клада");
        } else {
          score += addReason(reasons, zoneScore,
            "далеко за пределами обычной зоны от входа");
        }
        if (dx >= 5 && dx <= 8 && dy >= 5 && dy <= 8) {
          score += addReason(reasons, 3, "в частом диапазоне 5–8 по диагонали");
        }
        const closeness = Math.max(0, 3 - 0.5 * (Math.abs(dx - 6) + Math.abs(dy - 6)));
        if (closeness >= 1) {
          score += addReason(reasons, closeness, "близко к типовой диагонали [6;6]");
        }
        const contacts = orthogonalWallContacts(model, candidate);
        if (contacts === 2) score += addReason(reasons, 10, "касается двух стен");
        else if (contacts === 3) score += addReason(reasons, 7, "касается трёх стен");
        else if (contacts === 1) score += addReason(reasons, 3, "касается стены");
        // Неразведанные соседи не доказывают отсутствие стен.
      }
    }

    return {
      ...candidate,
      score: Math.round(score * 10) / 10,
      markerStats: stats,
      reasons: reasons.sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta)),
      source
    };
  }

  function confidenceFor(ranked, source, flags) {
    if (!ranked.length) return "нет";
    if (source === "structure" || (flags && flags.aquarium)) return "низкая";
    const gap = ranked.length > 1 ? ranked[0].score - ranked[1].score : 99;
    const pointerSource = source === "erinome" || source === "erinome-frontier" || source === "frontier";
    let level = ranked.length === 1 && source !== "consensus" ? 2 :
      gap >= 13 && pointerSource ? 2 : gap >= 5 ? 1 : 0;
    // Условие про ещё неизвестную стену нельзя выдавать за высокую
    // уверенность, даже если такая клетка пока осталась одна.
    if (ranked.some((candidate) => candidate.candidateKind === "thermo")) {
      level = Math.min(level, 1);
    }
    if (ranked[0].virtual) level = Math.min(level, 1);
    if (flags && (flags.halfTruth || flags.special) && level > 0) level -= 1;
    return ["низкая", "средняя", "высокая"][level];
  }

  function isHiddenBossCandidate(cell) {
    return Boolean(cell) && !cell.wall && !cell.marker && !cell.trap &&
      !cell.knownBoss && !cell.current && (cell.unexplored || cell.visibleBossCandidate);
  }

  function cardinalNeighbours(model, point) {
    const byPosition = model._byPosition || new Map(model.cells.map((cell) => [cellKey(cell.x, cell.y), cell]));
    return CARDINAL_DIRECTIONS
      .map(([dx, dy]) => byPosition.get(cellKey(point.x + dx, point.y + dy)))
      .filter(Boolean);
  }

  function surroundingNeighbours(model, point) {
    const byPosition = model._byPosition || new Map(model.cells.map((cell) => [cellKey(cell.x, cell.y), cell]));
    return EIGHT_DIRECTIONS
      .map(([dx, dy]) => byPosition.get(cellKey(point.x + dx, point.y + dy)))
      .filter(Boolean);
  }

  // Возвращает минимальные наборы клеток, которыми можно объяснить все
  // предупреждения. Это не вероятностная модель: частота нужна только для
  // упорядочивания неоднозначных вариантов в интерфейсе.
  function minimumBossCovers(constraints, limit) {
    let bestSize = Infinity;
    let visited = 0;
    let truncated = false;
    const solutions = [];
    const seen = new Set();
    const maximum = limit || 2000;

    function walk(selected) {
      visited += 1;
      if (visited > 30000 || solutions.length >= maximum) {
        truncated = true;
        return;
      }
      if (selected.size > bestSize) return;

      const uncovered = constraints
        .filter((constraint) => !constraint.keys.some((key) => selected.has(key)))
        .sort((a, b) => a.keys.length - b.keys.length)[0];
      if (!uncovered) {
        const keys = Array.from(selected).sort();
        const signature = keys.join("|");
        if (keys.length < bestSize) {
          bestSize = keys.length;
          solutions.length = 0;
          seen.clear();
        }
        if (keys.length === bestSize && !seen.has(signature)) {
          seen.add(signature);
          solutions.push(keys);
        }
        return;
      }
      if (selected.size >= bestSize) return;

      for (const key of uncovered.keys) {
        selected.add(key);
        walk(selected);
        selected.delete(key);
        if (truncated && solutions.length >= maximum) return;
      }
    }

    walk(new Set());
    return {
      solutions,
      minimum: Number.isFinite(bestSize) ? bestSize : 0,
      truncated
    };
  }

  function bossPathPrior(model, candidate, treasureCandidates) {
    const flags = model.flags || {};
    if (!model.entry || flags.authored || flags.unusualLayout || flags.migration) return 0;
    let score = 0;
    const entryDistance = shortestPath(model, model.entry, candidate);
    if (entryDistance === 3 || entryDistance === 4) score += 3;

    const treasure = treasureCandidates && treasureCandidates[0];
    if (!treasure) return score;
    const total = shortestPath(model, model.entry, treasure);
    const afterBoss = shortestPath(model, candidate, treasure);
    if (Number.isFinite(total) && entryDistance + afterBoss === total) score += 5;
    if (Math.max(Math.abs(candidate.x - treasure.x), Math.abs(candidate.y - treasure.y)) === 1) score += 7;
    return score;
  }

  function inferHiddenBosses(model, treasureCandidates) {
    model._byPosition = model._byPosition || new Map(model.cells.map((cell) => [cellKey(cell.x, cell.y), cell]));
    const flags = model.flags || {};
    const warnings = model.bossWarnings || model.cells.filter((cell) => cell.bossWarning);
    const current = model.current || model.cells.find((cell) => cell.current) || null;
    const visible = (model.visibleBossCandidates || model.cells.filter((cell) => cell.visibleBossCandidate))
      .filter(isHiddenBossCandidate);

    const base = {
      mode: "waiting",
      candidates: [],
      warningCount: warnings.length,
      visibleCount: visible.length,
      activeWarningCount: 0,
      ignoredWarningCount: 0,
      ignoredVisibleCount: 0,
      explainedWarnings: 0,
      constraintCount: 0,
      solutionCount: 0,
      minimumBosses: 0,
      truncated: false,
      authored: Boolean(flags.authored)
    };
    if (flags.abandoned) return { ...base, mode: "abandoned" };
    if (flags.silent && !warnings.length && !visible.length) return { ...base, mode: "silent" };

    const warningConstraints = [];
    let explainedWarnings = 0;
    for (const warning of warnings) {
      // Предупреждение о близости допускает босса и по диагонали. Это важно
      // для карт, где Erinome одновременно рисует E/S/SW или целое кольцо ⚠.
      const neighbours = surroundingNeighbours(model, warning);
      if (neighbours.some((cell) => cell.knownBoss)) {
        explainedWarnings += 1;
        continue;
      }
      const keys = neighbours.filter(isHiddenBossCandidate).map((cell) => cellKey(cell.x, cell.y));
      if (keys.length) warningConstraints.push({
        kind: "warning",
        origin: warning,
        keys: Array.from(new Set(keys))
      });
    }

    // Erinome хранит bossHint от всех пройденных боссов. Для решения «куда не
    // ходить сейчас» берём только компонент предупреждений, связанный с @.
    // Старый босс снова станет активным, когда герои вернутся к нему.
    const activeVisible = current ? visible.filter((cell) =>
      Math.max(Math.abs(cell.x - current.x), Math.abs(cell.y - current.y)) === 1) : visible;
    const constraints = [];
    const activeKeys = new Set();
    const addConstraint = (constraint) => {
      if (constraints.includes(constraint)) return false;
      constraints.push(constraint);
      for (const key of constraint.keys) activeKeys.add(key);
      return true;
    };

    const currentWarning = current && warningConstraints.find((constraint) =>
      constraint.origin.x === current.x && constraint.origin.y === current.y);
    if (currentWarning) addConstraint(currentWarning);

    // Базовая карта может показать ⚠ раньше, чем Erinome сохранит bossHint.
    // Важны только треугольники в одном шаге от текущего положения.
    if (activeVisible.length) {
      constraints.push({
        kind: "triangle",
        origin: current,
        keys: Array.from(new Set(activeVisible.map((cell) => cellKey(cell.x, cell.y))))
      });
      for (const cell of activeVisible) activeKeys.add(cellKey(cell.x, cell.y));
    }

    if (!current) {
      for (const constraint of warningConstraints) addConstraint(constraint);
    } else if (constraints.length) {
      // Подтягиваем прежние предупреждения только если они имеют общий вариант
      // с активным кластером. Так два взгляда на одного босса дают пересечение,
      // а давно оставшийся позади босс не попадает в красный список.
      let changed = true;
      while (changed) {
        changed = false;
        for (const constraint of warningConstraints) {
          if (constraints.includes(constraint) || !constraint.keys.some((key) => activeKeys.has(key))) continue;
          if (addConstraint(constraint)) changed = true;
        }
      }
    }

    const activeWarningCount = constraints.filter((constraint) => constraint.kind === "warning").length;
    const ignoredWarningCount = Math.max(0, warningConstraints.length - activeWarningCount);
    const ignoredVisibleCount = Math.max(0, visible.length - activeVisible.length);

    const uniqueConstraints = [];
    const constraintSignatures = new Set();
    for (const constraint of constraints) {
      const signature = constraint.keys.slice().sort().join("|");
      if (!signature || constraintSignatures.has(signature)) continue;
      constraintSignatures.add(signature);
      uniqueConstraints.push(constraint);
    }
    if (!uniqueConstraints.length) {
      const currentExplained = Boolean(current && current.bossWarning &&
        surroundingNeighbours(model, current).some((cell) => cell.knownBoss));
      return {
        ...base,
        explainedWarnings,
        activeWarningCount,
        ignoredWarningCount,
        ignoredVisibleCount,
        mode: currentExplained || (!current && explainedWarnings) ?
          "explained" : (current ? "clear" : base.mode)
      };
    }

    const byKey = model._byPosition;
    const cover = minimumBossCovers(uniqueConstraints, 2000);
    if (!cover.solutions.length) {
      return {
        ...base,
        mode: "inconsistent",
        explainedWarnings,
        activeWarningCount,
        ignoredWarningCount,
        ignoredVisibleCount,
        constraintCount: uniqueConstraints.length,
        truncated: cover.truncated
      };
    }

    const universe = Array.from(new Set(uniqueConstraints.flatMap((constraint) => constraint.keys)));
    const counts = new Map(universe.map((key) => [key, 0]));
    for (const solution of cover.solutions) {
      for (const key of solution) counts.set(key, (counts.get(key) || 0) + 1);
    }

    const candidates = universe.map((key) => {
      const cell = byKey.get(key);
      const frequency = (counts.get(key) || 0) / cover.solutions.length;
      const coverage = uniqueConstraints.filter((constraint) => constraint.keys.includes(key)).length;
      const onlyChoice = uniqueConstraints.some((constraint) => constraint.keys.length === 1 && constraint.keys[0] === key);
      const minimumForced = frequency === 1;
      const direct = Boolean(cell && cell.visibleBossCandidate);
      let score = frequency * 80 + coverage * 5 + (direct ? 5 : 0) +
        bossPathPrior(model, cell, treasureCandidates);
      if (minimumForced) score = Math.max(score, 96);
      if (onlyChoice) score = 100;
      score = Math.min(100, Math.round(score));

      let level = "possible";
      if (onlyChoice && !flags.authored) level = "certain";
      else if (minimumForced || score >= 78) level = "very-high";
      else if (score >= 52 || direct) level = "high";

      const reasons = [];
      if (onlyChoice) reasons.push("единственная клетка у предупреждения");
      else if (minimumForced && uniqueConstraints.length > 1) reasons.push("объясняет все предупреждения одним боссом");
      else if (coverage > 1) reasons.push("пересечение " + coverage + " предупреждений");
      else if (direct) reasons.push("видимая метка ⚠");
      else reasons.push("соседняя с предупреждением клетка");
      if (flags.authored) reasons.push("возможна авторская пугалка");

      return {
        ...cell,
        bossRiskScore: score,
        frequency,
        coverage,
        onlyChoice,
        minimumForced,
        direct,
        level,
        reasons
      };
    }).sort((a, b) => b.bossRiskScore - a.bossRiskScore || b.coverage - a.coverage || a.y - b.y || a.x - b.x);

    return {
      ...base,
      mode: "active",
      candidates,
      explainedWarnings,
      activeWarningCount,
      ignoredWarningCount,
      ignoredVisibleCount,
      constraintCount: uniqueConstraints.length,
      solutionCount: cover.solutions.length,
      minimumBosses: cover.minimum,
      truncated: cover.truncated
    };
  }

  function nearbyAdvice(model, ranked) {
    if (!model.current || model.treasure || (model.flags && model.flags.jumping)) return null;
    const current = model.current;
    const neighbours = cardinalNeighbours(model, current).filter(cell =>
      !cell.wall && !cell.absoluteUnknown && !cell.knownBoss &&
      !(model.bosses || []).some(b => b.x === cell.x && b.y === cell.y));
    const options = neighbours.map(cell => {
      const candidate = ranked.find(c => c.x === cell.x && c.y === cell.y);
      const reveals = surroundingNeighbours(model, cell).filter(c => c.absoluteUnknown).length;
      const unexplored = Boolean(cell.unexplored || candidate);
      const nearTrap = cardinalNeighbours(model, cell).some(c => c.trap);
      // Scores choose a local inspection, not a treasure probability or an optimal global route.
      const utility = (candidate ? 6 : 0) + (unexplored ? 2 : 0) + reveals +
        (candidate && nearTrap ? 2 : 0) - (cell.trap ? 8 : 0);
      return { cell, candidate, reveals, nearTrap, utility };
    }).filter(o => !o.cell.trap && (o.candidate || o.cell.unexplored) && o.utility > 0)
      .sort((a,b) => b.utility - a.utility || a.cell.y - b.cell.y || a.cell.x - b.cell.x);
    if (!options.length) return null;
    const best = options[0];
    const dx = best.cell.x - current.x, dy = best.cell.y - current.y;
    return { ...best, direction: dx > 0 ? "→ восток" : dx < 0 ? "← запад" : dy > 0 ? "↓ юг" : "↑ север",
      tied: options.length > 1 && options[1].utility === best.utility };
  }

  function rankCandidates(model) {
    if (model.treasure) {
      return { ranked: [], top: [], sectors: [], total: 0,
        source: "completed", confidence: "нет" };
    }
    model._byPosition = new Map(model.cells.map((cell) => [cellKey(cell.x, cell.y), cell]));
    model._capitalWallKeys = capitalWallKeys(model);
    model._bossClasses = classifyBosses(model);
    model._hiddenBossInference = inferHiddenBosses(model, []);
    const bossPositions = new Set((model.bosses || []).map((boss) => cellKey(boss.x, boss.y)));
    const plausible = model.cells.filter((cell) => {
      if (!cell.plausible || cell.wall || cell.marker || cell.trap ||
          bossPositions.has(cellKey(cell.x, cell.y))) return false;
      // На втором этаже в квадрате-1 (восемь клеток непосредственно вокруг
      // лестницы) клада не бывает. Квадрат-2 остаётся допустимым, но его
      // прикладовые схемы отключаются в architecturePattern().
      if (model.flags && model.flags.cellar && model.entry &&
          Math.max(Math.abs(cell.x - model.entry.x), Math.abs(cell.y - model.entry.y)) <= 1) {
        return false;
      }
      return true;
    });
    const erinome = plausible.filter((cell) => cell.candidateKind === "exact" || cell.candidateKind === "thermo");
    const frontier = frontierCandidates(model);
    const blindFrontier = blindCellarFrontierCandidates(model);
    let pool = erinome;
    let source = "erinome";

    if ((model.flags && model.flags.halfTruth) || !pool.length) {
      const withStats = plausible.map((cell) => ({ cell, stats: markerStats(model, cell) }));
      if (model.flags && model.flags.halfTruth) {
        const best = withStats.reduce((max, item) => Math.max(max, item.stats.satisfied), 0);
        pool = withStats.filter((item) => item.stats.satisfied >= Math.max(0, best - 1)).map((item) => item.cell);
        source = "consensus";
      } else if (model.markers.length) {
        const exact = withStats.filter((item) => item.stats.satisfied === item.stats.total)
          .map((item) => ({
            ...item.cell,
            candidateKind: item.stats.conditional ? "thermo" : "exact"
          }));
        if (exact.length) {
          pool = exact;
          source = "own";
        } else {
          const best = withStats.reduce((max, item) => Math.max(max, item.stats.satisfied), 0);
          pool = withStats.filter((item) => item.stats.satisfied === best).map((item) => item.cell);
          source = "consensus";
        }
      } else {
        // Не ждём первого указателя: пока он не появился, строим осторожный
        // ранний рейтинг по маршруту, боссам, стенам и обычной зоне клада.
        pool = plausible;
        source = "structure";
      }
    }

    if (frontier.length) {
      if (source === "consensus" || source === "structure") {
        // Полное пересечение за видимым краем сильнее частичного согласия
        // внутри прямоугольника карты.
        pool = frontier;
        source = "frontier";
      } else {
        const unique = new Map(pool.concat(frontier)
          .map((candidate) => [cellKey(candidate.x, candidate.y), candidate]));
        pool = Array.from(unique.values());
        source = source === "erinome" ? "erinome-frontier" : "frontier";
      }
    }

    const ranked = pool
      .map((candidate) => scoreCandidate(model, candidate, source))
      .sort((a, b) => b.score - a.score || a.y - b.y || a.x - b.x);
    const sectors = blindFrontier
      .map((candidate) => ({
        ...candidate,
        score: candidate.blindFrontierStrength,
        reasons: [{
          delta: candidate.blindFrontierStrength,
          text: "неразведанный " + candidate.blindFrontierSector +
            " сектор второго этажа без указателей"
        }],
        source: "blind-frontier"
      }))
      .sort((a, b) => b.score - a.score || a.y - b.y || a.x - b.x)
      .slice(0, 3);

    return {
      ranked,
      top: model.flags && model.flags.aquarium ? [] : ranked.slice(0, 3),
      advice: nearbyAdvice(model, ranked),
      sectors,
      total: ranked.length,
      source,
      confidence: confidenceFor(ranked, source, model.flags || {})
    };
  }

  return {
    ARROWS,
    THERMOS,
    THERMO_RANGES,
    extractSymbols,
    extractAuthoredBossName,
    checkArrow,
    bossAnnotationKey,
    hasCellarLabel,
    shortestPath,
    pathLengthScore,
    markerEvidence,
    markerAllows,
    markerStats,
    buildFrontierCells,
    frontierCandidates,
    classifyBosses,
    architecturePattern,
    inferHiddenBosses,
    scoreCandidate,
    confidenceFor,
    nearbyAdvice,
    rankCandidates
  };
});

(function (root, factory) {
  "use strict";
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  root.GodvilleDungeonBridge = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  const VERSION = 1;
  const STORAGE_PREFIX = "eguip-dungeon-bridge:v1:";
  const MAX_AGE = 5 * 365 * 24 * 60 * 60 * 1000;

  function validAbilityCount(value) {
    const count = Number(value);
    return Number.isInteger(count) && count >= 1 && count <= 4 ? count : null;
  }

  function storageKey(logId, floor) {
    const floorNumber = Number(floor);
    if (!logId || (floorNumber !== 1 && floorNumber !== 2)) return "";
    return STORAGE_PREFIX + "log:" + logId + "|floor:" + floorNumber;
  }

  function emptyRecord() {
    return { version: VERSION, bosses: {} };
  }

  function read(storage, key, now) {
    if (!storage || !key) return emptyRecord();
    try {
      const record = JSON.parse(storage.getItem(key) || "null");
      if (!record || record.version !== VERSION || !record.bosses || typeof record.bosses !== "object") {
        return emptyRecord();
      }
      const currentTime = now == null ? Date.now() : now;
      if (record.updatedAt && currentTime - record.updatedAt > MAX_AGE) {
        storage.removeItem(key);
        return emptyRecord();
      }
      return record;
    } catch (_error) {
      return emptyRecord();
    }
  }

  function write(storage, key, record, now) {
    if (!storage || !key) return false;
    record.version = VERSION;
    record.updatedAt = now == null ? Date.now() : now;
    record.bosses = record.bosses && typeof record.bosses === "object" ? record.bosses : {};
    try {
      storage.setItem(key, JSON.stringify(record));
      return true;
    } catch (_error) {
      return false;
    }
  }

  function effective(data, dom) {
    data = data && typeof data === "object" ? data : {};
    dom = dom && typeof dom === "object" ? dom : {};
    const domCount = validAbilityCount(dom.abilities);
    const manualAbilityCount = validAbilityCount(data.manualAbilities) ||
      (dom.source === "manual" ? domCount : null);
    const bridgeAbilityCount = validAbilityCount(data.observedAbilities) ||
      (dom.source !== "manual" ? domCount : null);
    return {
      abilityCount: manualAbilityCount || bridgeAbilityCount,
      manualAbilityCount,
      bridgeAbilityCount,
      source: manualAbilityCount ? "manual" : bridgeAbilityCount ? (data.observedSource || dom.source || "erinome-live") : "",
      step: manualAbilityCount ? (data.manualStep || null) : (data.observedStep || dom.step || null)
    };
  }

  function updateManual(record, key, abilityCount, now) {
    record = record && typeof record === "object" ? record : emptyRecord();
    record.bosses = record.bosses && typeof record.bosses === "object" ? record.bosses : {};
    const data = record.bosses[key] && typeof record.bosses[key] === "object" ?
      { ...record.bosses[key] } : {};
    const valid = validAbilityCount(abilityCount);
    if (valid) {
      data.manualAbilities = valid;
      data.manualAt = now == null ? Date.now() : now;
    } else {
      delete data.manualAbilities;
      delete data.manualAt;
      delete data.manualStep;
    }
    if (validAbilityCount(data.manualAbilities) || validAbilityCount(data.observedAbilities)) {
      record.bosses[key] = data;
    } else {
      delete record.bosses[key];
    }
    return record;
  }

  return {
    VERSION,
    STORAGE_PREFIX,
    MAX_AGE,
    validAbilityCount,
    storageKey,
    emptyRecord,
    read,
    write,
    effective,
    updateManual
  };
});

(function (root, factory) {
  "use strict";
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  root.GodvilleMapRecorder = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  const SCHEMA = 1;
  const EXPORT_HEADER = "GODVILLE_DUNGEON_ARCHIVE_V1";
  const COMPACT_SCHEMA = 2;
  const COMPACT_EXPORT_HEADER = "GODVILLE_DUNGEON_REPORT_V2";
  const CELL_FLAG_CLASSES = {
    dmh: "hidden-cell",
    bossHint: "boss-hint",
    demolishedWall: "demolished-wall",
    demolishedWallNotExplored: "demolished",
    absolutelyUnknown: "absolute-unknown",
    notAWall: "not-wall",
    seenExcl: "seen-warning",
    restoredExcl: "restored-warning",
    disabledPointer: "pointer-disabled",
    pointerMarker: "pointer-marker",
    lesserBossForge: "forge-lesser-boss",
    masterBossForge: "forge-master-boss",
    treasureChest: "treasure",
    treasureChestForge: "treasure-forge",
    pointerMatched: "pointer-exact",
    pointerMatchedThermo: "pointer-thermo",
    trapUnknown: "trap-unknown",
    trapTrophy: "trap-trophy",
    trapGold: "trap-gold",
    trapLowDamage: "trap-low-damage",
    trapModerateDamage: "trap-moderate-damage",
    trapMoveLoss: "trap-move-loss",
    trapForge: "trap-forge"
  };

  function integer(value) {
    const number = Number(value);
    return Number.isInteger(number) ? number : null;
  }

  function selectedTraceStep(title) {
    const match = String(title || "").match(/#(\d+)\b/);
    const step = match ? integer(match[1]) : null;
    return step != null && step > 0 ? step : null;
  }

  function samePoint(left, right) {
    return Boolean(left && right && left.x === right.x && left.y === right.y);
  }

  function relativeCoordinates(point, entry) {
    if (!point) return null;
    if (!entry) return { x: point.x, y: point.y, relative: false };
    return { x: point.x - entry.x, y: entry.y - point.y, relative: true };
  }

  function coordinateKey(point, entry) {
    const coords = relativeCoordinates(point, entry);
    if (!coords) return "";
    return (coords.relative ? "r:" : "a:") + coords.x + ":" + coords.y;
  }

  function hasClass(cell, className) {
    return Boolean(cell && cell.element && cell.element.classList &&
      cell.element.classList.contains(className));
  }

  function cleanText(value) {
    return String(value || "").trim().replace(/\s+/g, " ").slice(0, 96);
  }

  function isTreasureCell(cell) {
    const text = cleanText(cell && cell.text);
    return hasClass(cell, "treasureChest") || hasClass(cell, "treasureChestForge") || /[💰💎]/u.test(text);
  }

  function cellFlags(cell) {
    return Object.entries(CELL_FLAG_CLASSES)
      .filter(([className]) => hasClass(cell, className))
      .map(([, flag]) => flag);
  }

  function bossAbilityAt(model, cell) {
    const dataset = cell && cell.element && cell.element.dataset || {};
    const observed = integer(dataset.eguipBossAbilities || dataset.gvtrAbilities);
    if (observed != null && observed >= 1 && observed <= 4) return observed;
    const boss = (model.bosses || []).find((item) => item.x === cell.x && item.y === cell.y);
    const count = boss && integer(boss.abilityCount);
    return count != null && count >= 1 && count <= 4 ? count : null;
  }

  function cellState(model, cell) {
    const text = cleanText(cell.text);
    const treasure = isTreasureCell(cell);
    const isEntry = samePoint(cell, model.entry);
    let state;
    if (treasure) state = "$";
    else if (isEntry) state = model.flags && model.flags.cellar ? "S" : "V";
    else if (cell.wall) state = "#";
    else if (cell.knownBoss) state = "B";
    else if (cell.trap) state = "T";
    else if (cell.marker) state = "P";
    else if (/[!⚠]/u.test(text) || hasClass(cell, "seenExcl") || hasClass(cell, "restoredExcl")) state = "!";
    else if (cell.current) state = "@";
    else if (cell.unexplored || text.includes("?")) state = "?";
    else if (!text) state = ".";
    else state = "O";

    const result = {
      k: coordinateKey(cell, model.entry),
      s: state
    };
    if (state === "!") {
      if (/⚠/u.test(text)) result.h = "boss";
      else if (/!/u.test(text) || hasClass(cell, "seenExcl") || hasClass(cell, "restoredExcl")) {
        result.h = "special";
      }
    }
    if (cell.symbols && cell.symbols.length) result.p = Array.from(new Set(cell.symbols)).join("");
    if (cell.candidateKind === "exact") result.c = "exact";
    else if (cell.candidateKind === "thermo") result.c = "thermo";
    const abilities = bossAbilityAt(model, cell);
    if (abilities != null) result.a = abilities;
    const flags = cellFlags(cell);
    if (flags.length) result.f = flags;
    if (state === "O" || (state === "P" && !result.p)) result.x = text;
    return result;
  }

  function boundsFor(model) {
    const points = (model.cells || []).map((cell) => relativeCoordinates(cell, model.entry)).filter(Boolean);
    if (!points.length) return null;
    return {
      minX: Math.min(...points.map((point) => point.x)),
      maxX: Math.max(...points.map((point) => point.x)),
      minY: Math.min(...points.map((point) => point.y)),
      maxY: Math.max(...points.map((point) => point.y))
    };
  }

  function compactFlags(flags) {
    return Object.keys(flags || {}).filter((key) => flags[key]).sort();
  }

  function createSnapshot({ model, result, step, stepKnown = true, capturedAt = Date.now() }) {
    const cells = (model.cells || []).map((cell) => cellState(model, cell))
      .filter((cell) => cell.k)
      .sort((left, right) => left.k.localeCompare(right.k));
    const treasureCell = cells.find((cell) => cell.s === "$" && cell.k);
    const top = ((result && result.top) || []).map((candidate) => ({
      k: coordinateKey(candidate, model.entry),
      score: Number(candidate.score) || 0,
      kind: candidate.candidateKind || "",
      reasons: (candidate.reasons || []).map((reason) => String(reason.text || "")).filter(Boolean)
    }));
    return {
      schema: SCHEMA,
      step: stepKnown && integer(step) > 0 ? integer(step) : null,
      stepKnown: Boolean(stepKnown && integer(step) > 0),
      capturedAt,
      bounds: boundsFor(model),
      position: coordinateKey(model.current, model.entry) || null,
      treasure: treasureCell ? treasureCell.k : null,
      cells,
      top,
      confidence: result ? result.confidence : "",
      source: result ? result.source : "",
      candidates: result ? Number(result.total) || 0 : 0,
      dungeonFlags: compactFlags(model.flags)
    };
  }

  function cellMap(cells) {
    return new Map((cells || []).map((cell) => [cell.k, cell]));
  }

  function diffCells(before, after) {
    const previous = cellMap(before);
    const current = cellMap(after);
    const set = [];
    const remove = [];
    for (const [key, cell] of current) {
      if (!previous.has(key) || JSON.stringify(previous.get(key)) !== JSON.stringify(cell)) set.push(cell);
    }
    for (const key of previous.keys()) {
      if (!current.has(key)) remove.push(key);
    }
    set.sort((left, right) => left.k.localeCompare(right.k));
    remove.sort();
    return { set, remove };
  }

  function snapshotFingerprint(snapshot) {
    if (!snapshot) return "";
    const { capturedAt: _capturedAt, ...stable } = snapshot;
    return JSON.stringify(stable);
  }

  function frameOrder(left, right) {
    const leftKnown = left.snapshot && left.snapshot.stepKnown;
    const rightKnown = right.snapshot && right.snapshot.stepKnown;
    if (leftKnown && rightKnown && left.snapshot.step !== right.snapshot.step) {
      return left.snapshot.step - right.snapshot.step;
    }
    if (leftKnown !== rightKnown) return leftKnown ? -1 : 1;
    return (left.capturedAt || left.snapshot.capturedAt || 0) -
      (right.capturedAt || right.snapshot.capturedAt || 0);
  }

  function framePayload(snapshot) {
    return {
      step: snapshot.stepKnown ? snapshot.step : null,
      capturedAt: snapshot.capturedAt,
      bounds: snapshot.bounds,
      position: snapshot.position,
      treasure: snapshot.treasure,
      top: snapshot.top,
      confidence: snapshot.confidence,
      source: snapshot.source,
      candidates: snapshot.candidates,
      dungeonFlags: snapshot.dungeonFlags
    };
  }

  function buildExport(run, rawFrames) {
    const frames = orderedFrames(rawFrames);
    if (!frames.length) return null;

    const first = frames[0].snapshot;
    const initial = { ...framePayload(first), cells: first.cells };
    const changes = [];
    let previous = first;
    for (let index = 1; index < frames.length; index += 1) {
      const snapshot = frames[index].snapshot;
      const delta = diffCells(previous.cells, snapshot.cells);
      changes.push({ ...framePayload(snapshot), set: delta.set, remove: delta.remove });
      previous = snapshot;
    }

    const treasureFrame = [...frames].reverse().find((frame) => frame.snapshot.treasure);
    const treasure = treasureFrame ? treasureFrame.snapshot.treasure : null;
    const matchingFrames = treasure ? frames.filter((frame) =>
      (frame.snapshot.top || []).some((candidate) => candidate.k === treasure)) : [];
    const topOneFrames = treasure ? frames.filter((frame) =>
      frame.snapshot.top && frame.snapshot.top[0] && frame.snapshot.top[0].k === treasure) : [];
    const stepOf = (frame) => frame && frame.snapshot.stepKnown ? frame.snapshot.step : null;

    return {
      format: "godville-dungeon-archive",
      schema: SCHEMA,
      run: {
        logId: run.logId,
        floor: run.floor,
        title: run.title || "",
        mode: run.mode || "",
        origin: run.origin || "",
        createdAt: run.createdAt,
        updatedAt: run.updatedAt
      },
      summary: {
        frames: frames.length,
        firstStep: stepOf(frames[0]),
        lastStep: stepOf(frames[frames.length - 1]),
        treasure,
        foundAtStep: stepOf(treasureFrame),
        firstTop3: stepOf(matchingFrames[0]),
        firstTop1: stepOf(topOneFrames[0])
      },
      initial,
      changes
    };
  }

  function exportText(run, frames) {
    const report = buildExport(run, frames);
    return report ? EXPORT_HEADER + "\n" + JSON.stringify(report) : "";
  }

  function shortCoordinateKey(key) {
    const match = String(key || "").match(/^([ra]):(-?\d+):(-?\d+)$/);
    if (!match) return String(key || "");
    return (match[1] === "a" ? "a" : "") + match[2] + "," + match[3];
  }

  function trimTuple(values) {
    while (values.length) {
      const value = values[values.length - 1];
      if (value == null || value === "" || (Array.isArray(value) && !value.length)) values.pop();
      else break;
    }
    return values;
  }

  function dictionaryId(dictionary, index, value) {
    const text = String(value || "");
    if (!text) return null;
    if (!index.has(text)) {
      index.set(text, dictionary.length);
      dictionary.push(text);
    }
    return index.get(text);
  }

  function compactKind(kind) {
    if (kind === "exact") return "e";
    if (kind === "thermo") return "t";
    return null;
  }

  function compactConfidence(confidence) {
    if (confidence === "низкая") return "l";
    if (confidence === "средняя") return "m";
    if (confidence === "высокая") return "h";
    return confidence || null;
  }

  function compactBounds(bounds) {
    return bounds ? [bounds.minX, bounds.maxX, bounds.minY, bounds.maxY] : null;
  }

  function compactHint(cell) {
    if (cell.h === "boss") return "b";
    if (cell.h === "special") return "s";
    const flags = cell.f || [];
    if (cell.s === "!" && flags.includes("boss-hint")) return "b";
    if (cell.s === "!" && (flags.includes("seen-warning") || flags.includes("restored-warning"))) {
      return "s";
    }
    return null;
  }

  function compactCell(cell, dictionaries) {
    const flags = (cell.f || []).map((flag) =>
      dictionaryId(dictionaries.flags, dictionaries.flagIndex, flag));
    return trimTuple([
      shortCoordinateKey(cell.k),
      cell.s,
      compactHint(cell),
      cell.p || null,
      compactKind(cell.c),
      cell.a != null ? cell.a : null,
      flags,
      cell.x || null
    ]);
  }

  function compactTop(top, dictionaries) {
    return (top || []).map((candidate) => trimTuple([
      shortCoordinateKey(candidate.k),
      Math.round((Number(candidate.score) || 0) * 10) / 10,
      compactKind(candidate.kind),
      (candidate.reasons || []).map((reason) =>
        dictionaryId(dictionaries.reasons, dictionaries.reasonIndex, reason))
    ]));
  }

  function compactMeta(snapshot, dictionaries) {
    const flags = (snapshot.dungeonFlags || []).map((flag) =>
      dictionaryId(dictionaries.flags, dictionaries.flagIndex, flag));
    return trimTuple([
      compactConfidence(snapshot.confidence),
      dictionaryId(dictionaries.sources, dictionaries.sourceIndex, snapshot.source),
      Number(snapshot.candidates) || 0,
      flags
    ]);
  }

  function compactStep(target, snapshot, unknownOrder) {
    if (snapshot.stepKnown) target.s = snapshot.step;
    else target.u = unknownOrder;
  }

  function jsonEqual(left, right) {
    return JSON.stringify(left) === JSON.stringify(right);
  }

  function orderedFrames(rawFrames) {
    const valid = (rawFrames || []).filter((frame) => frame && frame.snapshot &&
      frame.snapshot.schema === SCHEMA && (!frame.snapshot.stepKnown || frame.snapshot.step > 0));
    const known = valid.filter((frame) => frame.snapshot.stepKnown);
    // Unknown-order snapshots remain in storage; never append a replay reset to a known timeline.
    return (known.length ? known : valid).slice().sort(frameOrder);
  }

  function compactSummary(frames) {
    const treasureFrame = [...frames].reverse().find((frame) => frame.snapshot.treasure);
    const treasure = treasureFrame ? treasureFrame.snapshot.treasure : null;
    const matchingFrames = treasure ? frames.filter((frame) =>
      (frame.snapshot.top || []).some((candidate) => candidate.k === treasure)) : [];
    const topOneFrames = treasure ? frames.filter((frame) =>
      frame.snapshot.top && frame.snapshot.top[0] && frame.snapshot.top[0].k === treasure) : [];
    const stepOf = (frame) => frame && frame.snapshot.stepKnown ? frame.snapshot.step : null;
    return {
      frames: frames.length,
      steps: [stepOf(frames[0]), stepOf(frames[frames.length - 1])],
      treasure: treasure ? shortCoordinateKey(treasure) : null,
      found: stepOf(treasureFrame),
      firstTop3: stepOf(matchingFrames[0]),
      firstTop1: stepOf(topOneFrames[0])
    };
  }

  function buildCompactExport(run, rawFrames) {
    const frames = orderedFrames(rawFrames);
    if (!frames.length) return null;

    const dictionaries = {
      reasons: [],
      reasonIndex: new Map(),
      flags: [],
      flagIndex: new Map(),
      sources: [],
      sourceIndex: new Map()
    };
    const first = frames[0].snapshot;
    const initial = {
      p: shortCoordinateKey(first.position),
      b: compactBounds(first.bounds),
      c: (first.cells || []).map((cell) => compactCell(cell, dictionaries)),
      t: compactTop(first.top, dictionaries),
      m: compactMeta(first, dictionaries)
    };
    compactStep(initial, first, 0);
    if (first.treasure) initial.x = shortCoordinateKey(first.treasure);

    const events = [];
    let previous = first;
    let previousTop = initial.t;
    let previousMeta = initial.m;
    for (let index = 1; index < frames.length; index += 1) {
      const snapshot = frames[index].snapshot;
      const event = {};
      compactStep(event, snapshot, index);

      if (snapshot.position !== previous.position) event.p = shortCoordinateKey(snapshot.position);
      const bounds = compactBounds(snapshot.bounds);
      if (!jsonEqual(bounds, compactBounds(previous.bounds))) event.b = bounds;

      const delta = diffCells(previous.cells, snapshot.cells);
      if (delta.set.length) event.c = delta.set.map((cell) => compactCell(cell, dictionaries));
      if (delta.remove.length) event.d = delta.remove.map(shortCoordinateKey);

      const top = compactTop(snapshot.top, dictionaries);
      if (!jsonEqual(top, previousTop)) event.t = top;
      previousTop = top;

      const meta = compactMeta(snapshot, dictionaries);
      if (!jsonEqual(meta, previousMeta)) event.m = meta;
      previousMeta = meta;

      if (snapshot.treasure !== previous.treasure) {
        event.x = snapshot.treasure ? shortCoordinateKey(snapshot.treasure) : null;
      }
      events.push(event);
      previous = snapshot;
    }

    return {
      format: "godville-dungeon-report",
      schema: COMPACT_SCHEMA,
      run: {
        id: run.logId,
        floor: run.floor,
        title: run.title || "",
        mode: run.mode || ""
      },
      summary: { ...compactSummary(frames), omittedUnknownFrames: (rawFrames || []).filter(f => f && f.snapshot && !f.snapshot.stepKnown).length - frames.filter(f => !f.snapshot.stepKnown).length },
      legend: {
        cell: ["coord", "state", "hint", "pointers", "candidate", "abilities", "flagIds", "text"],
        state: "V=entry,S=stairs,#=wall,@=party,?=unknown,.=open,!=warning,B=boss,T=trap,P=pointer,$=treasure,O=other",
        hint: "b=possible boss,s=special cell",
        candidate: "e=exact,t=conditional thermo",
        confidence: "l=low,m=medium,h=high",
        event: "s=step,u=unknown-order,p=position,b=bounds,c=set,d=remove,t=top,m=meta,x=treasure",
        meta: ["confidence", "sourceId", "candidateCount", "dungeonFlagIds"],
        top: ["coord", "score", "candidate", "reasonIds"],
        inherit: "missing event fields inherit the previous frame; every event is one saved frame"
      },
      dict: {
        reasons: dictionaries.reasons,
        flags: dictionaries.flags,
        sources: dictionaries.sources
      },
      initial,
      events
    };
  }

  function exportCompactText(run, frames) {
    const report = buildCompactExport(run, frames);
    return report ? COMPACT_EXPORT_HEADER + "\n" + JSON.stringify(report) : "";
  }

  return {
    SCHEMA,
    EXPORT_HEADER,
    COMPACT_SCHEMA,
    COMPACT_EXPORT_HEADER,
    selectedTraceStep,
    coordinateKey,
    isTreasureCell,
    createSnapshot,
    diffCells,
    snapshotFingerprint,
    buildExport,
    exportText,
    buildCompactExport,
    exportCompactText
  };
});

(function (root) {
  "use strict";
  const Recorder = root.GodvilleMapRecorder;
const DB_NAME = "godville-treasure-map-recorder";
const DB_VERSION = 1;
const RUNS_STORE = "runs";
const FRAMES_STORE = "frames";
const MAX_RUNS = 100;
let databasePromise = null;
let writeQueue = Promise.resolve();

function requestResult(request) {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error("IndexedDB request failed"));
  });
}

function transactionDone(transaction) {
  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onabort = () => reject(transaction.error || new Error("IndexedDB transaction aborted"));
    transaction.onerror = () => reject(transaction.error || new Error("IndexedDB transaction failed"));
  });
}

function openDatabase() {
  if (databasePromise) return databasePromise;
  databasePromise = new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const database = request.result;
      if (!database.objectStoreNames.contains(RUNS_STORE)) {
        const runs = database.createObjectStore(RUNS_STORE, { keyPath: "id" });
        runs.createIndex("updatedAt", "updatedAt", { unique: false });
      }
      if (!database.objectStoreNames.contains(FRAMES_STORE)) {
        const frames = database.createObjectStore(FRAMES_STORE, { keyPath: "id" });
        frames.createIndex("runId", "runId", { unique: false });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => {
      databasePromise = null;
      reject(request.error || new Error("Cannot open recorder database"));
    };
  });
  return databasePromise;
}

async function getRun(runId) {
  const database = await openDatabase();
  const transaction = database.transaction(RUNS_STORE, "readonly");
  return requestResult(transaction.objectStore(RUNS_STORE).get(runId));
}

async function getFrame(frameId) {
  const database = await openDatabase();
  const transaction = database.transaction(FRAMES_STORE, "readonly");
  return requestResult(transaction.objectStore(FRAMES_STORE).get(frameId));
}

async function getFrames(runId) {
  const database = await openDatabase();
  const transaction = database.transaction(FRAMES_STORE, "readonly");
  const index = transaction.objectStore(FRAMES_STORE).index("runId");
  return requestResult(index.getAll(IDBKeyRange.only(runId)));
}

async function deleteFrame(frameId) {
  const database = await openDatabase();
  const transaction = database.transaction(FRAMES_STORE, "readwrite");
  transaction.objectStore(FRAMES_STORE).delete(frameId);
  await transactionDone(transaction);
}

async function purgeLegacyZeroFrame(run) {
  if (!run) return run;
  const zeroId = run.id + "|s:000000";
  const zeroFrame = await getFrame(zeroId);
  if (!zeroFrame) return run;
  await deleteFrame(zeroId);
  const frames = await getFrames(run.id);
  const knownSteps = frames
    .map((frame) => frame.snapshot && frame.snapshot.stepKnown ? frame.snapshot.step : null)
    .filter((step) => Number.isInteger(step) && step > 0);
  run.framesCount = frames.length;
  if (knownSteps.length) {
    run.firstStep = Math.min(...knownSteps);
    run.lastStep = Math.max(...knownSteps);
  } else {
    delete run.firstStep;
    delete run.lastStep;
  }
  const treasureFrame = [...frames].reverse().find((frame) => frame.snapshot && frame.snapshot.treasure);
  if (treasureFrame) {
    run.treasure = treasureFrame.snapshot.treasure;
    if (treasureFrame.snapshot.stepKnown) run.treasureStep = treasureFrame.snapshot.step;
  } else {
    delete run.treasure;
    delete run.treasureStep;
  }
  return run;
}

async function putRunAndFrame(run, frame) {
  const database = await openDatabase();
  const transaction = database.transaction([RUNS_STORE, FRAMES_STORE], "readwrite");
  transaction.objectStore(RUNS_STORE).put(run);
  transaction.objectStore(FRAMES_STORE).put(frame);
  await transactionDone(transaction);
}

async function removeRun(runId) {
  const database = await openDatabase();
  const transaction = database.transaction([RUNS_STORE, FRAMES_STORE], "readwrite");
  transaction.objectStore(RUNS_STORE).delete(runId);
  const index = transaction.objectStore(FRAMES_STORE).index("runId");
  const cursorRequest = index.openCursor(IDBKeyRange.only(runId));
  cursorRequest.onsuccess = () => {
    const cursor = cursorRequest.result;
    if (!cursor) return;
    cursor.delete();
    cursor.continue();
  };
  await transactionDone(transaction);
}

function statusFromRun(run) {
  if (!run) return { ok: true, exists: false, frames: 0 };
  return {
    ok: true,
    exists: true,
    runId: run.id,
    frames: run.framesCount || 0,
    firstStep: Number.isInteger(run.firstStep) ? run.firstStep : null,
    lastStep: Number.isInteger(run.lastStep) ? run.lastStep : null,
    treasure: run.treasure || null,
    treasureStep: Number.isInteger(run.treasureStep) ? run.treasureStep : null,
    updatedAt: run.updatedAt
  };
}

function validRunInput(input) {
  if (!input || typeof input !== "object" || !input.id || !input.logId) return null;
  const floor = Number(input.floor);
  if (floor !== 1 && floor !== 2) return null;
  return {
    id: String(input.id),
    logId: String(input.logId),
    floor,
    title: String(input.title || "").slice(0, 180),
    mode: input.mode === "archive" ? "archive" : "live",
    origin: String(input.origin || "").slice(0, 180)
  };
}

async function captureNow(message) {
  const input = validRunInput(message.run);
  const snapshot = message.snapshot;
  if (!input || !snapshot || snapshot.schema !== Recorder.SCHEMA || !Array.isArray(snapshot.cells)) {
    return { ok: false, error: "invalid-capture" };
  }

  const now = Number(snapshot.capturedAt) || Date.now();
  const fingerprint = Recorder.snapshotFingerprint(snapshot);
  let run = await getRun(input.id);
  const isNewRun = !run;
  if (run && snapshot.stepKnown && snapshot.step > 0) run = await purgeLegacyZeroFrame(run);
  let sequence = run && Number.isInteger(run.nextSequence) ? run.nextSequence : 0;
  const knownStep = snapshot.stepKnown && Number.isInteger(snapshot.step);
  if (!knownStep && run && run.lastFingerprint === fingerprint) return statusFromRun(run);

  let frameId;
  if (knownStep) {
    frameId = input.id + "|s:" + String(snapshot.step).padStart(6, "0");
  } else {
    sequence += 1;
    frameId = input.id + "|u:" + String(sequence).padStart(6, "0");
  }
  const existingFrame = await getFrame(frameId);
  if (existingFrame && existingFrame.fingerprint === fingerprint) return statusFromRun(run);

  run = {
    ...(run || {}),
    ...input,
    schema: Recorder.SCHEMA,
    createdAt: run && run.createdAt ? run.createdAt : now,
    updatedAt: now,
    nextSequence: sequence,
    lastFingerprint: fingerprint,
    framesCount: (run && run.framesCount || 0) + (existingFrame ? 0 : 1)
  };
  if (knownStep) {
    run.firstStep = Number.isInteger(run.firstStep) ? Math.min(run.firstStep, snapshot.step) : snapshot.step;
    run.lastStep = Number.isInteger(run.lastStep) ? Math.max(run.lastStep, snapshot.step) : snapshot.step;
  }
  if (snapshot.treasure) {
    run.treasure = snapshot.treasure;
    if (knownStep) run.treasureStep = snapshot.step;
  }

  const frame = {
    id: frameId,
    runId: input.id,
    capturedAt: now,
    fingerprint,
    snapshot
  };
  await putRunAndFrame(run, frame);
  if (isNewRun) await cleanupOldRuns();
  return statusFromRun(run);
}

async function cleanupOldRuns() {
  const database = await openDatabase();
  const transaction = database.transaction(RUNS_STORE, "readonly");
  const runs = await requestResult(transaction.objectStore(RUNS_STORE).getAll());
  if (runs.length <= MAX_RUNS) return;
  runs.sort((left, right) => (right.updatedAt || 0) - (left.updatedAt || 0));
  for (const run of runs.slice(MAX_RUNS)) await removeRun(run.id);
}

function enqueueCapture(message) {
  const task = writeQueue.then(() => captureNow(message));
  writeQueue = task.catch(() => undefined);
  return task;
}

async function handleMessage(message) {
  switch (message && message.type) {
    case "gvtr-recorder:capture":
      return enqueueCapture(message);
    case "gvtr-recorder:status":
      return statusFromRun(await getRun(String(message.runId || "")));
    case "gvtr-recorder:export": {
      const run = await getRun(String(message.runId || ""));
      if (!run) return { ok: false, error: "not-found" };
      const frames = await getFrames(run.id);
      const report = Recorder.buildExport(run, frames);
      const text = report ? Recorder.EXPORT_HEADER + "\n" + JSON.stringify(report) : "";
      return report ? { ok: true, text, summary: report.summary, format: "V1", chars: text.length } :
        { ok: false, error: "empty" };
    }
    case "gvtr-recorder:export-compact": {
      const run = await getRun(String(message.runId || ""));
      if (!run) return { ok: false, error: "not-found" };
      const frames = await getFrames(run.id);
      const report = Recorder.buildCompactExport(run, frames);
      const text = report ? Recorder.COMPACT_EXPORT_HEADER + "\n" + JSON.stringify(report) : "";
      return report ? { ok: true, text, summary: report.summary, format: "V2", chars: text.length } :
        { ok: false, error: "empty" };
    }
    case "gvtr-recorder:delete":
      await removeRun(String(message.runId || ""));
      return { ok: true, exists: false, frames: 0 };
    default:
      return null;
  }
}

  root.GodvilleTreasureUserscriptRuntime = Object.freeze({ send: handleMessage });
})(typeof globalThis !== "undefined" ? globalThis : this);

(function () {
  "use strict";

  const Ranker = globalThis.GodvilleTreasureRanker;
  const Bridge = globalThis.GodvilleDungeonBridge;
  const Recorder = globalThis.GodvilleMapRecorder;
  const Voice = null;
  if (!Ranker || !Bridge || !Recorder) return;

  const PANEL_ID = "gvtr-panel";
  const COLLAPSED_STORAGE_KEY = "gvtr-panel-collapsed";
  const BOSS_STORAGE_PREFIX = "gvtr-boss-abilities:";
  const BOSS_STORAGE_MAX_AGE = 30 * 24 * 60 * 60 * 1000;
  const ERINOME_BRIDGE_EVENT = "eguip-dungeon-bridge";
  const RANK_CLASSES = ["gvtr-rank-1", "gvtr-rank-2", "gvtr-rank-3", "gvtr-selected"];
  // Нужны только для очистки следов предыдущей версии после обновления страницы.
  const LEGACY_BOSS_RISK_CLASSES = [
    "gvtr-boss-certain", "gvtr-boss-very-high", "gvtr-boss-high", "gvtr-boss-possible"
  ];
  const BOSS_ABILITY_STEMS = [
    "золотоносн", "глушащ", "лучезарн", "взрывн", "неверующ",
    "мощн", "паразитирующ", "бойк", "ушаст", "тащащ",
    "спешащ", "творящ", "драпающ", "транжирящ", "зовущ",
    "пробивающ", "мутирующ", "ломающ", "мним", "крепчающ",
    "auriferous", "deafening", "enlightened", "explosive", "faithless",
    "hulking", "leeching", "nimble", "overhearing", "pickpocketing",
    "scurrying", "skilled", "sneaky", "squandering", "summoning",
    "sweeping", "mutating", "chipping", "illusive", "escalating"
  ];
  const TRAP_CLASSES = [
    "trapUnknown", "trapTrophy", "trapGold", "trapLowDamage",
    "trapModerateDamage", "trapMoveLoss", "trapForge"
  ];

  let timer = null;
  let lastSignature = "";
  let bossJournalOpen = false;
  let recorderOpen = false;
  const memoryBossAbilities = new Map();
  let voiceDetailsOpen = false;
  let refreshVoiceUI = () => {};
  let voiceFrame = null;
  // Версия Тамъяна без голоса: подсистема остаётся совместимой с прежними
  // данными, но не создаётся, не показывает элементы управления и не играет звук.
  const voice = null;

  function safeStorage(name) {
    try { return globalThis[name]; } catch (_) { return null; }
  }

  function createVoiceRuntime() {
    if (!Voice) return null;
    try {
      const tracker = Voice.createTracker(safeStorage("sessionStorage"));
      return {
        options: Voice.readSettings(safeStorage("localStorage")),
        tracker,
        speaker: Voice.createSpeaker({
          Audio: globalThis.Audio,
          assetURL: extensionAssetUrl,
          setTimeout, clearTimeout, onFailure: cue => tracker.release(cue)
        }, () => refreshVoiceUI())
      };
    } catch (_) { return null; }
  }

  function speakFrame() {
    if (!voice || !voiceFrame) return null;
    try {
      return voice.tracker.update(voiceFrame, voice.options,
        voice.options.enabled && voice.speaker.state().armed && !document.hidden && voice.options.volume > 0,
        Date.now(), cue => voice.speaker.say(cue, voice.options));
    } catch (_) { return null; }
  }

  function processVoice(model, result) {
    if (!voice) return;
    // Speech errors must never remove the ranking panel or break recording.
    try {
      const run = recorderRunInfo(model);
      const step = detectCurrentStep(model.root);
      const runId = run ? run.id : location.pathname + "|floor:" + (model.flags.cellar ? 2 : 1);
      if (voiceFrame && voiceFrame.runId !== runId) voice.speaker.stop();
      voiceFrame = {
        runId, step: step.known ? step.value : null,
        mode: run ? run.mode : /\/duels\/log\//i.test(location.pathname) ? "archive" : "live",
        signal: Voice.signals(model, result, Ranker)
      };
      speakFrame();
      refreshVoiceUI();
    } catch (_) { /* ranking remains available without voice */ }
  }

  function saveVoiceOptions() {
    Voice.saveSettings(safeStorage("localStorage"), voice.options);
    refreshVoiceUI();
  }

  function startVoice(test) {
    if (!voice || !voice.speaker.supported) return;
    voice.options.enabled = true;
    voice.speaker.arm();
    saveVoiceOptions();
    if (test) voice.speaker.say(Voice.CUES.test, voice.options, true);
    else if (!speakFrame()) voice.speaker.say(Voice.CUES.hello, voice.options, true);
  }

  function findMapRoot() {
    const roots = Array.from(document.querySelectorAll("#dmap, #map, .e_m_dmap"));
    return roots.find((root) => root.querySelector(".dml .dmc")) || null;
  }

  function positionedCells(row) {
    return Array.from(row.children)
      .map((element, x) => ({ element, x }))
      .filter((item) => item.element.classList && item.element.classList.contains("dmc"));
  }

  function mapSignature(root) {
    const rows = Array.from(root.querySelectorAll(".dml"));
    const data = rows.map((row) => positionedCells(row).map(({ element: cell, x }) => {
      const classes = Array.from(cell.classList).filter((name) => !name.startsWith("gvtr-")).sort().join(".");
      return [
        x,
        cell.textContent.trim(),
        classes,
        cell.dataset.pointers || "",
        cell.dataset.eguipBossAbilities || "",
        cell.dataset.eguipBossSource || "",
        cell.dataset.eguipBossKey || "",
        cell.title || ""
      ].join("|");
    }).join("~")).join("\n");
    const header = document.querySelector("#ar_name, #map .block_title, .e_mt_dmap");
    const step = detectCurrentStep(root);
    return data + "\n" + (header ? header.textContent.trim() : "") +
      "\nfloor:" + mapFloorIdentity(root, header ? header.textContent : "") +
      "\nstep:" + (step.known ? step.value : "unknown") +
      "\nlog:" + (root.dataset.eguipDungeonLogId || dungeonLogId() || "");
  }

  function surfaceEntrance(cells) {
    return cells.find((cell) => /^(?:В|E|🚪)$/.test(cell.text.trim()) ||
      cell.element.classList.contains("map_exit_pos_ru") ||
      cell.element.classList.contains("map_exit_pos_en"));
  }

  function staircase(cells) {
    return cells.find((cell) => cell.text.includes("◿"));
  }

  function countBossAbilities(title) {
    const lower = String(title || "").toLowerCase();
    const count = BOSS_ABILITY_STEMS.reduce((sum, stem) => sum + (lower.includes(stem) ? 1 : 0), 0);
    return count >= 1 && count <= 4 ? count : null;
  }

  function relevantText(root) {
    const header = document.querySelector("#ar_name, #map .block_title, .e_mt_dmap");
    const nearby = root.closest(".block, .box, #hero2, #map_wrap");
    // Текст всей страницы в архиве содержит полную хронику: случайная фраза из
    // старого хода могла ошибочно превратить обычный данж в «Аквариум» или
    // божественный. Берём только заголовок и ближайший блок карты.
    return [
      header && header.textContent,
      nearby && nearby.textContent
    ].filter(Boolean).join("\n");
  }

  function dungeonLogId() {
    const pathMatch = location.pathname.match(/\/duels\/log\/([a-z0-9]+)/i);
    if (pathMatch) return pathMatch[1];
    const link = document.querySelector(
      '#e_broadcast[href*="/duels/log/"], div.fightblink a[href*="/duels/log/"]'
    );
    if (!link) return null;
    const linkMatch = String(link.getAttribute("href") || "").match(/\/duels\/log\/([a-z0-9]+)/i);
    return linkMatch ? linkMatch[1] : null;
  }

  function detectCurrentStep(root) {
    const progress = document.getElementById("trace_progress");
    const progressValue = Recorder.selectedTraceStep(progress && progress.title);
    if (progressValue != null) {
      return { known: true, value: progressValue, source: "archive-slider" };
    }

    const isArchive = /\/duels\/log\//i.test(location.pathname);
    if (!isArchive && root && root.dataset.eguipDungeonStep) {
      const bridgeStep = Number(root.dataset.eguipDungeonStep);
      if (Number.isInteger(bridgeStep) && bridgeStep > 0) {
        return { known: true, value: bridgeStep, source: "erinome" };
      }
    }

    const selectors = [
      "#m_fight_log .l_header", ".e_m_fight_log .l_header", "#fight_log_capt",
      ".fight_log_capt", "#last_items_arena .block_title", ".fight_log .block_title"
    ];
    for (const selector of selectors) {
      const node = document.querySelector(selector);
      const match = node && node.textContent.match(/(?:шаг|step)\s*(?:\w+\s*\/\s*)?(\d+)/i);
      if (match && Number(match[1]) > 0) {
        return { known: true, value: Number(match[1]), source: "chronicle" };
      }
    }

    if (root && root.dataset.eguipDungeonStep) {
      const fallbackStep = Number(root.dataset.eguipDungeonStep);
      if (Number.isInteger(fallbackStep) && fallbackStep > 0) {
        return { known: true, value: fallbackStep, source: "erinome-fallback" };
      }
    }
    return { known: false, value: null, source: "unknown" };
  }

  function recorderRunInfo(model) {
    const logId = model.root.dataset.eguipDungeonLogId || dungeonLogId();
    if (!logId) return null;
    const header = document.querySelector("#ar_name, #map .block_title, .e_mt_dmap");
    const declaredFloor = Number(model.root.dataset.eguipDungeonFloor);
    const floor = declaredFloor === 1 || declaredFloor === 2 ? declaredFloor : model.flags.cellar ? 2 : 1;
    return {
      id: "log:" + logId + "|floor:" + floor,
      logId,
      floor,
      title: header ? header.textContent.trim().replace(/\s+/g, " ") : "",
      mode: /\/duels\/log\//i.test(location.pathname) ? "archive" : "live",
      origin: location.origin
    };
  }

  function recorderRequest(message) {
    return new Promise((resolve) => {
      const userscriptRuntime = globalThis.GodvilleTreasureUserscriptRuntime;
      if (userscriptRuntime && typeof userscriptRuntime.send === "function") {
        Promise.resolve().then(() => userscriptRuntime.send(message)).then(
          response => resolve(response || { ok: false, error: "empty-response" }),
          error => resolve({ ok: false, error: error && error.message ? error.message : "runtime-error" })
        );
        return;
      }
      if (!globalThis.chrome || !chrome.runtime || typeof chrome.runtime.sendMessage !== "function") {
        resolve({ ok: false, error: "runtime-unavailable" });
        return;
      }
      try {
        chrome.runtime.sendMessage(message, (response) => {
          if (chrome.runtime.lastError) {
            resolve({ ok: false, error: chrome.runtime.lastError.message || "runtime-error" });
          } else {
            resolve(response || { ok: false, error: "empty-response" });
          }
        });
      } catch (error) {
        resolve({ ok: false, error: error && error.message ? error.message : "runtime-error" });
      }
    });
  }

  async function copyText(text) {
    if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch (_error) {
        // Резервный способ ниже работает в старых мобильных Chromium.
      }
    }
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.readOnly = true;
    textarea.style.position = "fixed";
    textarea.style.left = "-10000px";
    textarea.style.top = "0";
    document.body.append(textarea);
    textarea.select();
    let copied = false;
    try {
      copied = document.execCommand("copy");
    } catch (_error) {
      copied = false;
    }
    textarea.remove();
    return copied;
  }

  function mapFloorIdentity(root, title) {
    const declared = Number(root.dataset.eguipDungeonFloor);
    if (declared === 1 || declared === 2) return String(declared);
    const titleSaysCellar = Ranker.hasCellarLabel(title);
    const cells = Array.from(root.querySelectorAll(".dmc"));
    const hasEntrance = cells.some((cell) => /^(?:В|E|🚪)$/.test(cell.textContent.trim()) ||
      cell.classList.contains("map_exit_pos_ru") || cell.classList.contains("map_exit_pos_en"));
    const hasStairs = cells.some((cell) => cell.textContent.includes("◿"));
    return !hasEntrance && (titleSaysCellar || hasStairs) ? "2" : "1";
  }

  function legacyBossStorageKey(root) {
    const header = document.querySelector("#ar_name, #map .block_title, .e_mt_dmap");
    const title = header ? header.textContent.trim().replace(/\s+/g, " ") : "карта";
    const logPath = location.pathname.match(/\/duels\/log\/[a-z0-9]+/i);
    const page = logPath ? logPath[0] : location.host + location.pathname;
    return BOSS_STORAGE_PREFIX + page + "|" + title;
  }

  function fallbackBossStorageKey(root) {
    const header = document.querySelector("#ar_name, #map .block_title, .e_mt_dmap");
    const title = header ? header.textContent.trim().replace(/\s+/g, " ") : "карта";
    return BOSS_STORAGE_PREFIX + location.host + location.pathname + "|" + title +
      "|floor:" + mapFloorIdentity(root, title);
  }

  function bossStorageKey(root) {
    const header = document.querySelector("#ar_name, #map .block_title, .e_mt_dmap");
    const title = header ? header.textContent.trim().replace(/\s+/g, " ") : "карта";
    const logId = dungeonLogId();
    if (!logId) return fallbackBossStorageKey(root);
    return BOSS_STORAGE_PREFIX + "log:" + logId + "|floor:" + mapFloorIdentity(root, title);
  }

  const DUNGEON_KIND_STORAGE_PREFIX = "gvtr-dungeon-kind:";
  const memoryDungeonKinds = new Map();
  function normalizeDungeonKind(value) {
    return ["authored", "random", "aquarium"].includes(value) ? value : "auto";
  }

  function dungeonKindStorageKey(root) {
    const header = document.querySelector("#ar_name, #map .block_title, .e_mt_dmap");
    const title = header ? header.textContent.trim().replace(/\s+/g, " ") : "карта";
    const logId = root.dataset.eguipDungeonLogId || dungeonLogId();
    if (logId) return DUNGEON_KIND_STORAGE_PREFIX + "log:" + logId + "|floor:" + mapFloorIdentity(root, title);
    return DUNGEON_KIND_STORAGE_PREFIX + location.host + location.pathname + "|" + title +
      "|floor:" + mapFloorIdentity(root, title);
  }

  function storedDungeonKind(storageKey) {
    if (memoryDungeonKinds.has(storageKey)) return memoryDungeonKinds.get(storageKey);
    let kind = "auto";
    try { kind = normalizeDungeonKind(localStorage.getItem(storageKey)); }
    catch (_error) { /* use the in-memory fallback */ }
    memoryDungeonKinds.set(storageKey, kind);
    return kind;
  }

  function storeDungeonKind(storageKey, value) {
    const kind = normalizeDungeonKind(value);
    memoryDungeonKinds.set(storageKey, kind);
    try {
      if (kind === "auto") localStorage.removeItem(storageKey);
      else localStorage.setItem(storageKey, kind);
    } catch (_error) {
      // В закрытой хронике выбор сохранится хотя бы до перезагрузки страницы.
    }
    return kind;
  }

  function effectiveAuthoredKind(detectedAuthored, manualKind) {
    const kind = normalizeDungeonKind(manualKind);
    if (kind === "authored") return true;
    if (kind === "random" || kind === "aquarium") return false;
    return Boolean(detectedAuthored);
  }

  function dungeonKindLabel(kind) {
    return kind === "authored" ? "божественное" : "случайное";
  }

  function createDungeonKindControl(model) {
    const row = createElement("label", "gvtr-dungeon-kind");
    const label = createElement("span", "gvtr-dungeon-kind-label", "Тип этого этажа");
    const select = createElement("select", "gvtr-dungeon-kind-select");
    select.setAttribute("aria-label", "Выбрать тип этого этажа");
    const choices = [
      ["auto", "Авто (сейчас: " + dungeonKindLabel(model.detectedDungeonKind) + ")"],
      ["authored", "Божественное"],
      ["random", "Случайное"],
      ["aquarium", "Аквариум"]
    ];
    choices.forEach(([value, text]) => {
      const option = createElement("option", "", text);
      option.value = value;
      option.selected = model.dungeonKind === value;
      select.append(option);
    });
    select.addEventListener("change", () => {
      storeDungeonKind(model.dungeonKindStorageKey, select.value);
      lastSignature = "";
      analyse(true);
    });
    const status = createElement("small", "gvtr-dungeon-kind-status",
      model.dungeonKind === "auto" ? "определено автоматически" :
        "выбрано вручную для этого этажа");
    row.append(label, select, status);
    return row;
  }

  function storedBossAbilities(storageKey) {
    if (memoryBossAbilities.has(storageKey)) {
      return { ...memoryBossAbilities.get(storageKey) };
    }
    try {
      const record = JSON.parse(localStorage.getItem(storageKey) || "null");
      if (!record || typeof record !== "object") return {};
      if (record.updatedAt && Date.now() - record.updatedAt > BOSS_STORAGE_MAX_AGE) {
        localStorage.removeItem(storageKey);
        return {};
      }
      const abilities = record.abilities && typeof record.abilities === "object" ? record.abilities : {};
      memoryBossAbilities.set(storageKey, { ...abilities });
      return { ...abilities };
    } catch (_error) {
      return {};
    }
  }

  function validAbilityCount(value) {
    return Bridge.validAbilityCount(value);
  }

  function erinomeBridgeStorageKey(root) {
    const header = document.querySelector("#ar_name, #map .block_title, .e_mt_dmap");
    const title = header ? header.textContent.trim().replace(/\s+/g, " ") : "карта";
    const logId = root.dataset.eguipDungeonLogId || dungeonLogId();
    if (!logId) return "";
    const declaredFloor = Number(root.dataset.eguipDungeonFloor);
    const floor = declaredFloor === 1 || declaredFloor === 2 ?
      declaredFloor : Number(mapFloorIdentity(root, title));
    return Bridge.storageKey(logId, floor);
  }

  function readErinomeBridge(storageKey) {
    return Bridge.read(localStorage, storageKey);
  }

  function writeErinomeBridge(storageKey, record) {
    return Bridge.write(localStorage, storageKey, record);
  }

  function applyBridgeCellMetadata(cell, key, data) {
    const fact = Bridge.effective(data);
    if (!fact.abilityCount) {
      delete cell.dataset.eguipBossKey;
      delete cell.dataset.eguipBossAbilities;
      delete cell.dataset.eguipBossSource;
      delete cell.dataset.eguipBossStep;
      return;
    }
    cell.dataset.eguipBossKey = key;
    cell.dataset.eguipBossAbilities = String(fact.abilityCount);
    cell.dataset.eguipBossSource = fact.source;
    if (fact.step) cell.dataset.eguipBossStep = String(fact.step);
    else delete cell.dataset.eguipBossStep;
  }

  function storeBridgeManual(model, boss, abilityCount) {
    if (!model.bridgeStorageKey) return;
    let record = readErinomeBridge(model.bridgeStorageKey);
    const key = Ranker.bossAnnotationKey(boss, model.entry);
    record = Bridge.updateManual(record, key, abilityCount);
    writeErinomeBridge(model.bridgeStorageKey, record);
    if (boss.element) applyBridgeCellMetadata(boss.element, key, record.bosses[key] || {});
    document.dispatchEvent(new Event(ERINOME_BRIDGE_EVENT));
  }

  function storeBossAbility(model, boss, abilityCount) {
    const abilities = { ...(model.manualBossAbilities || storedBossAbilities(model.bossStorageKey)) };
    const key = Ranker.bossAnnotationKey(boss, model.entry);
    // Версия 1.9.0 сохраняла абсолютные координаты без префикса. Удаляем
    // старый дубль при первом же изменении, сохраняя остальные старые отметки.
    delete abilities[boss.x + ":" + boss.y];
    if (Number.isInteger(abilityCount) && abilityCount >= 1 && abilityCount <= 4) {
      abilities[key] = abilityCount;
    } else {
      delete abilities[key];
    }
    memoryBossAbilities.set(model.bossStorageKey, { ...abilities });
    try {
      if (Object.keys(abilities).length) {
        localStorage.setItem(model.bossStorageKey, JSON.stringify({
          updatedAt: Date.now(),
          abilities
        }));
      } else {
        localStorage.removeItem(model.bossStorageKey);
      }
    } catch (_error) {
      // В закрытой хронике отметка всё равно живёт до перезагрузки страницы.
    }
    storeBridgeManual(model, boss, abilityCount);
  }

  function buildModel(root) {
    const rowElements = Array.from(root.querySelectorAll(".dml"));
    const rows = rowElements.map(positionedCells);
    const height = rows.length;
    const width = rows.reduce((max, row) =>
      Math.max(max, ...row.map((item) => item.x + 1), 0), 0);
    const cells = [];

    rows.forEach((row, y) => {
      row.forEach(({ element, x }) => {
        const text = element.textContent.trim();
        const symbols = Ranker.extractSymbols(text, element.dataset.pointers || "");
        const marker = symbols.length > 0 && !element.classList.contains("disabledPointer");
        const wall = element.classList.contains("dmw") || text.includes("#");
        const trap = TRAP_CLASSES.some((className) => element.classList.contains(className));
        const knownBoss = element.classList.contains("boss") || /[💀☠]/u.test(text);
        const current = element.classList.contains("map_pos") || text.includes("@");
        const bossWarning = element.classList.contains("bossHint");
        const visibleBossCandidate = text.includes("⚠");
        const unexplored = /[?!⚠]/u.test(text) ||
          element.classList.contains("demolishedWallNotExplored") ||
          element.classList.contains("absolutelyUnknown") ||
          element.classList.contains("notAWall") ||
          element.classList.contains("seenExcl") ||
          element.classList.contains("restoredExcl");
        const absoluteUnknown = element.classList.contains("absolutelyUnknown") ||
          (text.includes("?") && !element.classList.contains("notAWall") &&
            !element.classList.contains("seenExcl") && !element.classList.contains("restoredExcl"));
        let candidateKind = null;
        if (element.classList.contains("pointerMatched")) candidateKind = "exact";
        else if (element.classList.contains("pointerMatchedThermo")) candidateKind = "thermo";
        const plausible = !wall && !marker && !element.classList.contains("seenExcl") &&
          !element.classList.contains("map_pos") &&
          (candidateKind !== null || /[?!⚠]/.test(text));
        cells.push({
          x, y, text, wall, trap, marker, symbols, plausible, candidateKind,
          knownBoss, current, bossWarning, visibleBossCandidate,
          unexplored, absoluteUnknown,
          title: element.title || "",
          element
        });
      });
    });

    const storageKey = bossStorageKey(root);
    const oldStorageKey = legacyBossStorageKey(root);
    const fallbackStorageKey = fallbackBossStorageKey(root);
    const manualAbilities = {
      ...storedBossAbilities(oldStorageKey),
      ...storedBossAbilities(fallbackStorageKey),
      ...storedBossAbilities(storageKey)
    };
    const context = relevantText(root);
    const lowerContext = context.toLowerCase();
    const entrance = surfaceEntrance(cells);
    const stairs = staircase(cells);
    const declaredFloor = Number(root.dataset.eguipDungeonFloor);
    const cellar = declaredFloor === 2 || (declaredFloor !== 1 && !entrance && (Ranker.hasCellarLabel(context) || Boolean(stairs)));
    const entry = cellar ? stairs : entrance;
    const bridgeStorageKey = erinomeBridgeStorageKey(root);
    const bridgeRecord = readErinomeBridge(bridgeStorageKey);
    const halfTruth = /половина указателей[^.\n]{0,50}вр[её]т|полуправд|half[^.\n]{0,30}(?:clue|pointer)/i.test(context);
    const migration = /сила боссов[^.\n]{0,80}не связана|миграци|stronger bosses[^.\n]{0,50}not always/i.test(context);
    let unusualLayout = /аквариум|зверинец|реш[её]тчат|лабиринт божественного|aquarium|menagerie|divine maze/i.test(lowerContext);
    const authoredByText = /авторск(?:ое|ом|ого) подземель|именно[её] подземель|божественн(?:ого|ое) происхожд|custom dungeon|dungeon creator/i.test(lowerContext);
    const silent = /бесшумн|безмолвн|silent dungeon|dungeon[^.\n]{0,30}silent/i.test(lowerContext);
    const abandoned = /заброшенн|ни единого живого босса|all bosses[^.\n]{0,40}(?:perished|gone)|abandoned dungeon/i.test(lowerContext);
    const mystery = /подземель[^.\n]{0,30}загадк|загадочн|mysterious dungeon/i.test(lowerContext);
    const visibility = /заметн|подземель[^.\n]{0,30}видимост|visibility dungeon/i.test(lowerContext);
    const jumping = /прыгуч|скачущ|jumping dungeon/i.test(lowerContext);
    const markers = cells
      .filter((cell) => cell.marker)
      .map((cell) => ({ x: cell.x, y: cell.y, symbols: cell.symbols }));
    const bosses = cells
      .filter((cell) => cell.element.classList.contains("boss") || /[💀☠]/u.test(cell.text))
      .map((cell) => {
        const authorName = Ranker.extractAuthoredBossName(cell.text + " " + cell.title);
        const detectedAbilityCount = countBossAbilities(cell.title);
        const relativeKey = Ranker.bossAnnotationKey(cell, entry);
        const bridgeData = bridgeRecord.bosses[relativeKey] || {};
        const bridgeFact = Bridge.effective(bridgeData, {
          abilities: cell.element.dataset.eguipBossAbilities,
          source: cell.element.dataset.eguipBossSource,
          step: cell.element.dataset.eguipBossStep
        });
        const bridgeManualCount = bridgeFact.manualAbilityCount;
        const bridgeAbilityCount = bridgeFact.bridgeAbilityCount;
        const saved = manualAbilities[relativeKey] != null ? manualAbilities[relativeKey] :
          manualAbilities[cell.x + ":" + cell.y] != null ? manualAbilities[cell.x + ":" + cell.y] :
            bridgeManualCount;
        const savedAbilityCount = Number(saved);
        const manualAbilityCount = Number.isInteger(savedAbilityCount) &&
          savedAbilityCount >= 1 && savedAbilityCount <= 4 ? savedAbilityCount : null;
        return {
          x: cell.x,
          y: cell.y,
          abilityCount: manualAbilityCount || bridgeAbilityCount || detectedAbilityCount,
          manualAbilityCount,
          bridgeAbilityCount,
          detectedAbilityCount,
          title: cell.title,
          text: cell.text,
          element: cell.element,
          authoredFinal: Boolean(authorName),
          authorName
        };
      });
    const detectedAuthored = authoredByText || bosses.some((boss) => boss.authoredFinal);
    const kindStorageKey = dungeonKindStorageKey(root);
    const dungeonKind = storedDungeonKind(kindStorageKey);
    const authored = effectiveAuthoredKind(detectedAuthored, dungeonKind);
    const aquarium = dungeonKind === "aquarium" || (dungeonKind === "auto" && /аквариум|aquarium/i.test(lowerContext));
    unusualLayout = unusualLayout || aquarium;
    const special = halfTruth || unusualLayout || authored;
    const traps = cells
      .filter((cell) => cell.trap)
      .map((cell) => ({ x: cell.x, y: cell.y }));
    const treasure = cells.find((cell) => Recorder.isTreasureCell(cell)) || null;

    return {
      root,
      width,
      height,
      cells,
      markers,
      bosses,
      bossStorageKey: storageKey,
      dungeonKindStorageKey: kindStorageKey,
      dungeonKind,
      detectedDungeonKind: detectedAuthored ? "authored" : "random",
      bridgeStorageKey,
      bridgeRecord,
      manualBossAbilities: manualAbilities,
      current: cells.find((cell) => cell.current) || null,
      bossWarnings: cells.filter((cell) => cell.bossWarning),
      visibleBossCandidates: cells.filter((cell) => cell.visibleBossCandidate),
      treasure,
      traps,
      entry: entry ? { x: entry.x, y: entry.y } : null,
      flags: {
        cellar, halfTruth, migration, unusualLayout, authored, special, aquarium,
        silent, abandoned, mystery, visibility, jumping
      }
    };
  }

  function clearRanks() {
    document.querySelectorAll(".dmc.gvtr-rank-1, .dmc.gvtr-rank-2, .dmc.gvtr-rank-3, .dmc.gvtr-selected, " +
      ".dmc.gvtr-frontier-anchor, " +
      ".dmc.gvtr-boss-noted, .dmc.gvtr-boss-certain, .dmc.gvtr-boss-very-high, " +
      ".dmc.gvtr-boss-high, .dmc.gvtr-boss-possible")
      .forEach((cell) => {
        cell.classList.remove(...RANK_CLASSES, ...LEGACY_BOSS_RISK_CLASSES,
          "gvtr-boss-noted", "gvtr-frontier-anchor");
        delete cell.dataset.gvtrRank;
        delete cell.dataset.gvtrFrontierRank;
        delete cell.dataset.gvtrSector;
        delete cell.dataset.gvtrBossRisk;
        delete cell.dataset.gvtrAbilities;
      });
  }

  function coordinateLabel(candidate, model) {
    if (!model.entry) return "строка " + (candidate.y + 1) + ", клетка " + (candidate.x + 1);
    const dx = candidate.x - model.entry.x;
    const dy = model.entry.y - candidate.y;
    const signed = (value) => value > 0 ? "+" + value : String(value);
    return "[" + signed(dx) + "; " + signed(dy) + "]";
  }

  function frontierAnchor(candidate, model) {
    const best = (model.cells || []).filter((cell) => cell.element)
      .reduce((best, cell) => {
        const distance = Math.abs(cell.x - candidate.x) + Math.abs(cell.y - candidate.y);
        return !best || distance < best.distance ? { cell, distance } : best;
      }, null);
    return best ? best.cell : null;
  }

  function sourceLabel(source) {
    if (source === "erinome") return "указатели Erinome + рейтинг";
    if (source === "erinome-frontier") return "Erinome + поиск за краем карты";
    if (source === "frontier") return "термоуказатели + край карты";
    if (source === "own") return "расчёт по указателям";
    if (source === "consensus") return "большинство указателей";
    if (source === "structure") return "ранний прогноз по карте";
    return "ожидание указателей";
  }

  function pointerCandidateText(result) {
    if (!["erinome", "erinome-frontier", "frontier"].includes(result.source)) return "";
    const exact = result.ranked.filter((candidate) => candidate.candidateKind === "exact").length;
    const conditional = result.ranked.filter((candidate) => candidate.candidateKind === "thermo").length;
    const frontier = result.ranked.filter((candidate) => candidate.virtual).length;
    if (!conditional && !frontier) return "";
    const parts = [];
    if (exact) parts.push("совместимых без дополнительного обхода: " + exact);
    if (conditional) parts.push("условных через возможную скрытую стену: " + conditional);
    if (frontier) parts.push("за текущим краем: " + frontier);
    return "Подходят по указателям — " + parts.join(" · ") +
      (conditional ? ". Оранжевые клетки не исключены." : ".");
  }

  function createBlindSectorHint(model, result) {
    const sectors = Array.isArray(result.sectors) ? result.sectors : [];
    if (!sectors.length) return null;

    const section = createElement("section", "gvtr-sector-box");
    const header = createElement("div", "gvtr-sector-header");
    header.append(
      createElement("strong", "gvtr-sector-title", "За краем карты"),
      createElement("span", "gvtr-sector-badge", "область, не клетка")
    );
    section.append(
      header,
      createElement("div", "gvtr-sector-text",
        "Указателей ещё нет. Возможные неразведанные направления второго этажа показаны отдельно и не меняют основной топ‑3.")
    );

    const visible = (model.cells || []).reduce((bounds, cell) => ({
      minX: Math.min(bounds.minX, cell.x),
      maxX: Math.max(bounds.maxX, cell.x),
      minY: Math.min(bounds.minY, cell.y),
      maxY: Math.max(bounds.maxY, cell.y)
    }), { minX: Infinity, maxX: -Infinity, minY: Infinity, maxY: -Infinity });
    const sectorLabel = (candidate) => {
      const horizontal = candidate.x < visible.minX ? "слева" :
        candidate.x > visible.maxX ? "справа" : "";
      const vertical = candidate.y < visible.minY ? "сверху" :
        candidate.y > visible.maxY ? "снизу" : "";
      if (horizontal && vertical) return horizontal + "-" + vertical + " за картой";
      if (horizontal) return horizontal + " от карты";
      if (vertical) return vertical + " от карты";
      return candidate.blindFrontierSector || "неразведанный сектор";
    };
    const list = createElement("div", "gvtr-sector-list");
    sectors.forEach((candidate) => {
      const anchor = frontierAnchor(candidate, model);
      const targetElement = anchor && anchor.element ? anchor.element : null;
      if (targetElement) {
        targetElement.classList.add("gvtr-frontier-anchor");
        targetElement.dataset.gvtrSector = [
          targetElement.dataset.gvtrSector,
          candidate.blindFrontierSector
        ].filter(Boolean).join(",");
      }

      const button = createElement("button", "gvtr-sector-choice");
      button.type = "button";
      button.title = "Ориентир неразведанной области за текущей рамкой карты; это не прогноз точной клетки клада.";
      button.append(
        createElement("span", "gvtr-sector-name", sectorLabel(candidate)),
        createElement("strong", "gvtr-sector-coords", "центр " + coordinateLabel(candidate, model)),
        createElement("small", "gvtr-sector-reason", "широкая область за рамкой")
      );
      button.addEventListener("click", () => {
        document.querySelectorAll(".dmc.gvtr-selected")
          .forEach((cell) => cell.classList.remove("gvtr-selected"));
        if (targetElement) {
          targetElement.classList.add("gvtr-selected");
          targetElement.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
        }
      });
      list.append(button);
    });
    section.append(list);
    return section;
  }

  function warningText(model, result) {
    if (model.flags.halfTruth) return "Полуправда: один или несколько указателей могут лгать.";
    if (model.flags.authored) return "Авторское подземелье: финал может иметь одну абилку и стоять где угодно. Обычные боссовые схемы отключены, указатели продолжают работать.";
    if (model.flags.unusualLayout) return "Особая архитектура: обычные схемы клада отключены.";
    if (model.flags.cellar) return "Второй этаж: квадрат-1 исключён; в квадрате-2 обычные схемы отключены; дальше считаю Т/J/Г/О и сфина на 4 абилки.";
    if (result.source === "consensus") return "Точного пересечения нет — показаны клетки с лучшим согласием подсказок.";
    if (result.source === "frontier") return "Пересечение находится за видимым краем: карта ещё может расшириться в эту сторону.";
    if (result.source === "structure") return "Указателей ещё нет: это ранний рейтинг по маршруту, боссам и архитектуре карты.";
    return "";
  }

  function createElement(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text != null) element.textContent = text;
    return element;
  }

  function extensionAssetUrl(path) {
    const embedded = globalThis.GodvilleTreasureUserscriptAssets;
    if (embedded && typeof embedded[path] === "string") return embedded[path];
    const api = globalThis.browser || globalThis.chrome;
    const runtime = api && api.runtime;
    return runtime && typeof runtime.getURL === "function" ? runtime.getURL(path) : path;
  }

  function storedCollapsedState() {
    try {
      return localStorage.getItem(COLLAPSED_STORAGE_KEY) === "1";
    } catch (_error) {
      return false;
    }
  }

  function storeCollapsedState(collapsed) {
    try {
      localStorage.setItem(COLLAPSED_STORAGE_KEY, collapsed ? "1" : "0");
    } catch (_error) {
      // В хрониках с ограниченным хранилищем состояние просто не запоминается.
    }
  }

  function createMobileDetails(model, result, warning) {
    const details = createElement("details", "gvtr-mobile-more");
    const summary = createElement("summary", "gvtr-mobile-summary");
    summary.append(
      createElement("span", "gvtr-mobile-summary-title", "Как рассчитано"),
      createElement("span", "gvtr-mobile-summary-count", result.total + " кандидатов")
    );
    details.append(summary);

    const body = createElement("div", "gvtr-mobile-details-body");
    if (result.top.length) {
      const explanations = createElement("ol", "gvtr-explanations");
      result.top.forEach((candidate, index) => {
        const item = createElement("li", "gvtr-explanation");
        item.append(
          createElement("strong", "gvtr-explanation-title",
            "№" + (index + 1) + " " + coordinateLabel(candidate, model)),
          document.createTextNode(" — " + candidate.reasons.map((reason) => reason.text).join(" · "))
        );
        explanations.append(item);
      });
      body.append(explanations);
    }

    body.append(createElement("div", "gvtr-count",
      "Рассмотрено кандидатов: " + result.total + ". Рейтинг не является гарантией."));
    if (result.sectors && result.sectors.length) {
      body.append(createElement("div", "gvtr-sector-mobile-note",
        "Области за рамкой рассчитаны отдельно: они показывают направление разведки, а не точную клетку клада."));
    }
    if (warning) body.append(createElement("div", "gvtr-warning", warning));
    details.append(body);
    return details;
  }

  function createBossJournal(model) {
    if (!model.bosses.length) return null;
    const details = createElement("details", "gvtr-boss-journal");
    details.open = bossJournalOpen;
    details.addEventListener("toggle", () => {
      bossJournalOpen = details.open;
    });
    const summary = createElement("summary", "gvtr-boss-summary");
    const known = model.bosses.filter((boss) => boss.abilityCount != null).length;
    summary.append(
      createElement("span", "gvtr-boss-summary-title", "Побеждённые боссы"),
      createElement("span", "gvtr-boss-summary-count", known + " из " + model.bosses.length + " с абилками")
    );
    details.append(summary);

    const list = createElement("div", "gvtr-boss-list");
    model.bosses.forEach((boss) => {
      if (boss.abilityCount != null && boss.element) {
        boss.element.classList.add("gvtr-boss-noted");
        boss.element.dataset.gvtrAbilities = String(boss.abilityCount);
      }
      const row = createElement("div", "gvtr-boss-row");
      const info = createElement("div", "gvtr-boss-info");
      info.append(
        createElement("strong", "gvtr-boss-coords", "💀 " + coordinateLabel(boss, model)),
        createElement("small", "gvtr-boss-source",
          boss.manualAbilityCount != null ? "указано вручную" :
            boss.bridgeAbilityCount != null ? "получено из Erinome" :
              boss.detectedAbilityCount != null ? "распознано по хронике" : "выбери число абилок")
      );
      const controls = createElement("div", "gvtr-boss-controls");
      for (let ability = 1; ability <= 4; ability += 1) {
        const button = createElement("button", "gvtr-boss-ability", String(ability));
        button.type = "button";
        button.dataset.ability = String(ability);
        button.title = ability + " абилк" + (ability === 1 ? "а" : ability < 5 ? "и" : "");
        button.setAttribute("aria-label", "Указать боссу " + ability + " способности");
        if (boss.abilityCount === ability) button.classList.add("gvtr-active");
        if (boss.manualAbilityCount === ability) button.classList.add("gvtr-manual");
        button.addEventListener("click", () => {
          bossJournalOpen = true;
          storeBossAbility(model, boss, ability);
          lastSignature = "";
          analyse(true);
        });
        controls.append(button);
      }
      const clear = createElement("button", "gvtr-boss-clear", "×");
      clear.type = "button";
      clear.title = "Удалить ручную отметку";
      clear.setAttribute("aria-label", "Удалить ручную отметку босса");
      clear.disabled = boss.manualAbilityCount == null;
      clear.addEventListener("click", () => {
        bossJournalOpen = true;
        storeBossAbility(model, boss, null);
        lastSignature = "";
        analyse(true);
      });
      controls.append(clear);
      row.append(info, controls);
      list.append(row);
    });
    details.append(list);
    return details;
  }

  function updateRecorderUI(runId, status, notice) {
    const details = document.querySelector("#" + PANEL_ID + " .gvtr-recorder");
    if (!details || details.dataset.runId !== runId) return;
    const count = details.querySelector(".gvtr-recorder-summary-count");
    const message = details.querySelector(".gvtr-recorder-message");
    const copies = details.querySelectorAll(".gvtr-recorder-copy");
    const remove = details.querySelector(".gvtr-recorder-delete");
    const frames = status && Number(status.frames) || 0;
    if (status && status.ok) {
      count.textContent = frames + " карт" + (status.treasure ? " · клад ✓" : "");
      copies.forEach((button) => { button.disabled = frames === 0; });
      remove.disabled = frames === 0;
      if (notice) message.textContent = notice;
      else if (status.treasure) {
        message.textContent = "Клад записан" +
          (Number.isInteger(status.treasureStep) ? " на шаге " + status.treasureStep : "") + ". Отчёт готов.";
      } else {
        message.textContent = "Карта и прогноз сохраняются автоматически при каждом новом шаге.";
      }
    } else {
      count.textContent = "запись недоступна";
      copies.forEach((button) => { button.disabled = true; });
      remove.disabled = true;
      message.textContent = "Локальная база не ответила. Обнови страницу после установки расширения.";
    }
  }

  function reportLengthLabel(value) {
    const chars = Math.max(0, Number(value) || 0);
    if (chars < 1000) return chars + " знаков";
    const thousands = chars < 10000 ? Math.round(chars / 100) / 10 : Math.round(chars / 1000);
    return String(thousands).replace(".", ",") + " тыс. знаков";
  }

  function showManualCopy(details, text) {
    let output = details.querySelector(".gvtr-recorder-output");
    if (!output) {
      output = createElement("textarea", "gvtr-recorder-output");
      output.readOnly = true;
      output.setAttribute("aria-label", "Отчёт подземелья для копирования");
      details.querySelector(".gvtr-recorder-body").append(output);
    }
    output.value = text;
    output.hidden = false;
    output.focus();
    output.select();
  }

  function createRecorderJournal(model) {
    const run = recorderRunInfo(model);
    if (!run) return null;
    const details = createElement("details", "gvtr-recorder");
    details.dataset.runId = run.id;
    details.open = recorderOpen;
    details.addEventListener("toggle", () => {
      recorderOpen = details.open;
    });

    const summary = createElement("summary", "gvtr-recorder-summary");
    summary.append(
      createElement("span", "gvtr-recorder-summary-title", "Архив карт"),
      createElement("span", "gvtr-recorder-summary-count", "запись…")
    );
    details.append(summary);

    const body = createElement("div", "gvtr-recorder-body");
    const message = createElement("div", "gvtr-recorder-message",
      "Краткий V2 — для чата; полный V1 — для подробной отладки.");
    message.setAttribute("aria-live", "polite");
    const actions = createElement("div", "gvtr-recorder-actions");
    const makeCopyButton = (label, extraClass, requestType, formatLabel, title) => {
      const button = createElement("button", "gvtr-recorder-copy " + extraClass, label);
      button.type = "button";
      button.title = title;
      button.disabled = true;
      button.addEventListener("click", async () => {
        recorderOpen = true;
        const copyButtons = details.querySelectorAll(".gvtr-recorder-copy");
        copyButtons.forEach((item) => { item.disabled = true; });
        message.textContent = "Собираю " + formatLabel + "…";
        const response = await recorderRequest({ type: requestType, runId: run.id });
        if (!response || !response.ok || !response.text) {
          message.textContent = "Не удалось собрать отчёт. Попробуй обновить страницу.";
          copyButtons.forEach((item) => { item.disabled = false; });
          return;
        }
        const copied = await copyText(response.text);
        const frames = response.summary && response.summary.frames || 0;
        if (copied) {
          const oldOutput = details.querySelector(".gvtr-recorder-output");
          if (oldOutput) oldOutput.hidden = true;
          message.textContent = "Скопирован " + formatLabel + ": " + frames + " карт · " +
            reportLengthLabel(response.chars || response.text.length) + ". Можно вставлять в чат.";
        } else {
          showManualCopy(details, response.text);
          message.textContent = "Автокопирование запрещено браузером — " + formatLabel + " выделен ниже.";
        }
        copyButtons.forEach((item) => { item.disabled = false; });
      });
      return button;
    };
    const compactCopy = makeCopyButton(
      "Краткий V2",
      "gvtr-recorder-copy-compact",
      "gvtr-recorder:export-compact",
      "короткий V2",
      "Компактный восстанавливаемый отчёт для отправки в чат"
    );
    const fullCopy = makeCopyButton(
      "Полный V1",
      "gvtr-recorder-copy-full",
      "gvtr-recorder:export",
      "полный V1",
      "Полный архив для подробной отладки"
    );

    const remove = createElement("button", "gvtr-recorder-delete", "Удалить лог");
    remove.type = "button";
    remove.disabled = true;
    remove.addEventListener("click", async () => {
      recorderOpen = true;
      if (!globalThis.confirm("Удалить сохранённые карты этого подземелья?") ) return;
      remove.disabled = true;
      const response = await recorderRequest({ type: "gvtr-recorder:delete", runId: run.id });
      updateRecorderUI(run.id, response, response && response.ok ?
        "Лог удалён. Запись возобновится при следующем изменении карты." :
        "Не удалось удалить лог.");
    });
    actions.append(compactCopy, fullCopy, remove);
    body.append(message, actions);
    details.append(body);
    return details;
  }

  function captureRecorder(model, result) {
    const run = recorderRunInfo(model);
    if (!run) return;
    const step = detectCurrentStep(model.root);
    const snapshot = Recorder.createSnapshot({
      model,
      result,
      step: step.value,
      stepKnown: step.known,
      capturedAt: Date.now()
    });
    recorderRequest({ type: "gvtr-recorder:capture", run, snapshot })
      .then((status) => updateRecorderUI(run.id, status));
  }

  function renderPanel(model, result) {
    clearRanks();
    const oldPanel = document.getElementById(PANEL_ID);
    if (oldPanel) oldPanel.remove();

    const panel = createElement("section", "gvtr-panel");
    panel.id = PANEL_ID;
    const completed = Boolean(model.treasure);
    if (completed) panel.classList.add("gvtr-completed");
    const header = createElement("div", "gvtr-header");
    const heading = createElement("strong", "gvtr-title", completed ? "Клад найден! 🎉" : model.flags.aquarium ? "Клад · аквариум" : "Клад · топ‑3");
    const collapsedBest = createElement("span", "gvtr-collapsed-best",
      completed ? "сокровищница открыта" : model.flags.aquarium ? result.total + " кандидатов" : result.top.length ?
        "№1 " + coordinateLabel(result.top[0], model) + " · " + result.top[0].score + " б." :
        "кандидатов пока нет");
    const headerActions = createElement("div", "gvtr-header-actions");
    const collapse = createElement("button", "gvtr-collapse", "⌃");
    collapse.type = "button";
    const refresh = createElement("button", "gvtr-refresh", "↻");
    refresh.type = "button";
    refresh.title = "Пересчитать";
    refresh.setAttribute("aria-label", "Пересчитать кандидатов клада");
    refresh.addEventListener("click", () => {
      lastSignature = "";
      analyse(true);
    });

    const setCollapsed = (collapsed) => {
      panel.classList.toggle("gvtr-collapsed", collapsed);
      collapse.textContent = collapsed ? "⌄" : "⌃";
      collapse.title = collapsed ? "Развернуть" : "Свернуть";
      collapse.setAttribute("aria-label", collapsed ? "Развернуть помощник" : "Свернуть помощник");
      collapse.setAttribute("aria-expanded", String(!collapsed));
    };
    collapse.addEventListener("click", () => {
      const collapsed = !panel.classList.contains("gvtr-collapsed");
      setCollapsed(collapsed);
      storeCollapsedState(collapsed);
    });
    headerActions.append(collapse);
    if (!completed) headerActions.append(refresh);
    header.append(heading, collapsedBest, headerActions);
    panel.append(header);
    panel.append(createDungeonKindControl(model));

    if (completed) {
      const success = createElement("div", "gvtr-success-card");
      success.classList.add("gvtr-success-no-guide");
      success.setAttribute("aria-live", "polite");
      const fallbackIcon = createElement("div", "gvtr-success-icon", "🏆");
      success.append(
        fallbackIcon,
        createElement("strong", "gvtr-success-title",
          "Сокровищница открыта в " + coordinateLabel(model.treasure, model)),
        createElement("div", "gvtr-success-text",
          "Клад найден. Историю похода можно скопировать ниже.")
      );
      panel.append(success);
      const recorderJournal = createRecorderJournal(model);
      if (recorderJournal) panel.append(recorderJournal);
      setCollapsed(storedCollapsedState());
      model.root.insertAdjacentElement("afterend", panel);
      return;
    }

    const meta = createElement("div", "gvtr-meta");
    meta.append(
      createElement("span", "gvtr-confidence gvtr-confidence-" + result.confidence, "уверенность: " + result.confidence),
      createElement("span", "gvtr-source", sourceLabel(result.source))
    );
    panel.append(meta);

    if (result.advice) {
      const a = result.advice;
      const note = "Проверить рядом: " + a.direction + " · " + coordinateLabel(a.cell, model) +
        (a.candidate ? (a.candidate.candidateKind === "thermo" ? ". Условный термокандидат" : ". Кандидат клада") : ". Разведка клетки") +
        (a.nearTrap && a.candidate ? "; рядом ловушка" : "") +
        (a.cell.visibleBossCandidate || a.cell.bossWarning ? "; возможен босс" : "") +
        (a.tied ? ". Есть равноценные варианты." : ".") +
        " Совет на один ход, не гарантия безопасного прохода. После хода — пересчёт.";
      panel.append(createElement("div", "gvtr-pointer-note", note));
    }
    if (model.flags.aquarium) {
      panel.append(createElement("div", "gvtr-pointer-note", "Аквариум: геометрический рейтинг отключён. Клетки ниже перечислены без приоритета; указатели продолжают ограничивать поиск."));
      const choices = createElement("details", "gvtr-boss-journal");
      choices.append(createElement("summary", "gvtr-boss-summary", "Кандидаты: " + result.total));
      const body = createElement("div", "gvtr-count");
      body.textContent = result.ranked.slice().sort((a,b) => a.y-b.y || a.x-b.x).map(c =>
        coordinateLabel(c, model) + (c.candidateKind === "thermo" ? " (условно)" : "")).join(" · ");
      choices.append(body); panel.append(choices);
    }
    const pointerNote = pointerCandidateText(result);
    if (pointerNote) panel.append(createElement("div", "gvtr-pointer-note", pointerNote));
    const sectorHint = createBlindSectorHint(model, result);
    if (sectorHint) panel.append(sectorHint);
    const warning = warningText(model, result);

    if (!result.top.length && !model.flags.aquarium) {
      panel.append(createElement("div", "gvtr-empty",
        model.markers.length ? "Подходящих клеток пока не найдено." : "Жду первый указатель на карте."));
    } else if (!model.flags.aquarium) {
      const list = createElement("ol", "gvtr-list");
      result.top.forEach((candidate, index) => {
        const rank = index + 1;
        const anchor = frontierAnchor(candidate, model);
        const targetElement = candidate.element || (anchor && anchor.element) || null;
        if (candidate.element) {
          candidate.element.classList.add("gvtr-rank-" + rank);
          candidate.element.dataset.gvtrRank = String(rank);
        } else if (targetElement) {
          targetElement.classList.add("gvtr-frontier-anchor");
          targetElement.dataset.gvtrFrontierRank = [
            targetElement.dataset.gvtrFrontierRank,
            rank
          ].filter(Boolean).join(",");
        }

        const item = createElement("li", "gvtr-item");
        const button = createElement("button", "gvtr-choice");
        if (candidate.virtual) button.classList.add("gvtr-choice-frontier");
        button.type = "button";
        button.title = candidate.reasons.map((reason) => reason.text).join("; ");
        button.append(
          createElement("span", "gvtr-number", String(rank)),
          createElement("span", "gvtr-coords", coordinateLabel(candidate, model)),
          createElement("span", "gvtr-score", candidate.score + " б."),
          createElement("small", "gvtr-reason", (candidate.candidateKind === "thermo" ? "Условно · " : candidate.candidateKind === "exact" ? "По указателям · " : "") + candidate.reasons.slice(0, 3).map((reason) => reason.text).join(" · "))
        );
        button.addEventListener("click", () => {
          document.querySelectorAll(".dmc.gvtr-selected").forEach((cell) => cell.classList.remove("gvtr-selected"));
          if (targetElement) {
            targetElement.classList.add("gvtr-selected");
            targetElement.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
          }
        });
        item.append(button);
        list.append(item);
      });
      panel.append(list);
      panel.append(createElement("div", "gvtr-count gvtr-desktop-only",
        "Рассмотрено кандидатов: " + result.total + ". Это рейтинг, а не гарантия."));
    }

    if (warning) panel.append(createElement("div", "gvtr-warning gvtr-desktop-only", warning));
    const bossJournal = createBossJournal(model);
    if (bossJournal) panel.append(bossJournal);
    const recorderJournal = createRecorderJournal(model);
    if (recorderJournal) panel.append(recorderJournal);
    panel.append(createMobileDetails(model, result, warning));
    setCollapsed(storedCollapsedState());
    model.root.insertAdjacentElement("afterend", panel);
  }

  function analyse(force) {
    const root = findMapRoot();
    if (!root) {
      if (voice) voice.speaker.stop();
      voiceFrame = null;
      clearRanks();
      const panel = document.getElementById(PANEL_ID);
      if (panel) panel.remove();
      lastSignature = "";
      return;
    }
    const signature = mapSignature(root);
    if (!force && signature === lastSignature && document.getElementById(PANEL_ID)) return;
    // Не даём собственным предупреждениям предыдущего расчёта попасть в
    // relevantText() и ошибочно включить Полуправду/Авторскую карту повторно.
    const stalePanel = document.getElementById(PANEL_ID);
    if (stalePanel) stalePanel.remove();
    try {
      const model = buildModel(root);
      const result = Ranker.rankCandidates(model);
      if (model.treasure) result.top = [];
      renderPanel(model, result);
      lastSignature = signature;
      captureRecorder(model, result);
      processVoice(model, result);
    } catch (error) {
      lastSignature = "";
      clearRanks();
      const partialPanel = document.getElementById(PANEL_ID);
      if (partialPanel) partialPanel.remove();
      const panel = createElement("section", "gvtr-panel");
      panel.id = PANEL_ID;
      panel.append(createElement("strong", "gvtr-title", "Кладоискатель 1.25.1"));
      panel.append(createElement("div", "gvtr-empty",
        "Не удалось рассчитать карту. Нажми «Повторить»; если ошибка останется, пришли её текст."));
      panel.append(createElement("div", "gvtr-empty", String(error && error.message || error).slice(0, 240)));
      const retry = createElement("button", "gvtr-choice", "Повторить");
      retry.type = "button";
      retry.addEventListener("click", () => analyse(true));
      panel.append(retry);
      root.insertAdjacentElement("afterend", panel);
    }
  }

  function schedule() {
    // Поток мутаций (анимация/проигрывание хроники) не должен отодвигать
    // первый расчёт бесконечно. Объединяем события до ближайшего запуска.
    if (timer !== null) return;
    timer = setTimeout(() => {
      timer = null;
      analyse(false);
    }, 220);
  }

  const observer = new MutationObserver((mutations) => {
    const onlyOwnPanel = mutations.every((mutation) => {
      const target = mutation.target.nodeType === Node.ELEMENT_NODE ? mutation.target : mutation.target.parentElement;
      if (target && target.closest && target.closest("#" + PANEL_ID)) return true;
      // Добавление/удаление панели видит её родитель, а не сама панель.
      // Не запускаем повторный расчёт вслед за собственным сообщением об ошибке.
      const changed = [...mutation.addedNodes, ...mutation.removedNodes];
      return mutation.type === "childList" && changed.length > 0 &&
        changed.every((node) => node.nodeType === Node.ELEMENT_NODE && node.id === PANEL_ID);
    });
    if (!onlyOwnPanel) schedule();
  });

  observer.observe(document.documentElement, {
    subtree: true,
    childList: true,
    characterData: true,
    attributes: true,
    attributeFilter: [
      "class", "data-pointers", "title",
      "data-eguip-boss-abilities", "data-eguip-boss-source", "data-eguip-boss-key",
      "data-eguip-dungeon-bridge-version", "data-eguip-dungeon-log-id", "data-eguip-dungeon-floor",
      "data-eguip-dungeon-step"
    ]
  });
  document.addEventListener(ERINOME_BRIDGE_EVENT, schedule);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) { if (voice) voice.speaker.stop(); }
    else analyse(true);
  });
  window.addEventListener("pagehide", () => { if (voice) voice.speaker.stop(); });
  window.addEventListener("pageshow", schedule);
  schedule();
})();

})();
