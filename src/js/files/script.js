// Подключение функционала "Чертогов Фрилансера"
import { isMobile } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";

function lazyVideo() {
   if (document.querySelector("[data-lazy-video]")) {
      let lazyVideos = document.querySelectorAll("[data-lazy-video]");
      lazyVideos.forEach(lazyVideo => {
         let button = lazyVideo.querySelector("button");
         button.addEventListener("click", (e) => {
            let lazyContainer = e.target.closest("[data-lazy-video]");
            let video = lazyContainer.querySelector("video");
            let preview = lazyContainer.querySelector("[data-video-preview]");
            preview.setAttribute("hidden", true);
            video.removeAttribute("hidden");
            video.play();
         });
      });
   }
}

document.addEventListener("DOMContentLoaded", () => {
   lazyVideo();
})