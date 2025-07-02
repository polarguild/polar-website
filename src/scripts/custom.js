@keyframes flicker {
  0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% { opacity: 1; }
  20%, 22%, 24%, 55% { opacity: 0; }
}

/* general */

html, body {
  overflow-x: hidden;
}

body {
  margin: 0;
  color: var(--black);
  background-color: var(--black);
}

.banner-image {
  padding-top: 40px;
  width: 90%;
  max-height: auto !important;
  /* max-width: 90vh !important; */
  max-width: 500px !important;
  padding-right: 10px;
}

.p-long {
  text-align: left;
  padding-left: 20px;
  padding-right: 20px;
}

.section-heading {
  font-weight: bold !important;
}

.yt-icon:hover {
  animation: flicker 0.8s linear infinite !important;
  filter: var(--red-glow) !important;
}

/* backgrounds */

.navigation-bar,
.hero-section {
  background: transparent !important;
}

#core::before,
.top-section::before,
.footer::before {
  content: '';
  position: absolute;
  inset: 0;
  background: url('/assets/backgrounds/bg-gray-frosty-sm.avif');
  background-size: cover !important;
  background-position: top center !important;
  background-repeat: no-repeat;
  background-attachment: fixed;
  opacity: 0.5;
  z-index: -1;
}

#core,
.top-section,
.footer {
  position: relative;
  z-index: 0;
}

.core-item {
  display: flex;
  margin-bottom: 20px;
  gap: 10px;
  height: auto;
  align-items: center;
}

.core-text {
  text-align: left;
  padding-right: 35px;
  font-size: 18px;
}

.core-item img {
  width: 40px !important;
  height: 40px !important;
}

#core .core-list {
  color: var(--white);
  padding-bottom: 40px;
  display: flex;
  justify-content: center;
  padding-left: 20px;
}

#core .core-items {
  text-align: left;
  display: inline-block;
  font-size: 18px;
}

#intro,
#victories {
  position: relative;
  z-index: 0;
}

#intro::before,
#victories::before {
  content: '';
  position: absolute;
  inset: 0;
  background: url('/assets/backgrounds/bg-fantasy-ice.avif') no-repeat center top;
  background-size: cover;
  background-attachment: fixed;
  /* opacity: 0.6; */
  z-index: -1;
  /* filter: brightness(0.3); */
}

.white-box {
  background-color: rgba(0, 0, 0, 0.6);
  margin-left: auto;
  margin-right: auto;
}

#victories .white-box {
  padding-top: 45px;
  padding-bottom: 55px;
  max-width: 600px;
}

#victories .white-box:first-child {
  margin-bottom: 30px;
}

.white-box a {
  text-decoration: none;
  color: var(--white);
  font-weight: normal;
}

#intro {
  padding-left: 30px;
  padding-right: 30px;
}

#intro .white-box {
  padding: 30px 35px 30px 35px;
}

.victory-box {
  padding-left: 40px;
  padding-right: 40px;
}

.victories-item {
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  text-align: left;
  padding-bottom: 4px;
}

.victories-item > :first-child {
  text-align: right !important;
}

.competition {
  min-width: auto !important;
  max-width: 50px !important;
}

.competition-wide {
  min-width: 80px !important;
  max-width: 80px !important;
}

.place {
  min-width: 100px !important;
  max-width: 100px !important;
}

.place-narrow {
  min-width: 50px !important;
  max-width: 50px !important;
}

.victory-box {
  font-size: 18px !important;
  text-align: center;
}

.victory-box a,
.core-text a,
.victory-box a img,
.core-text a img {
  background-color: transparent;
}

.victory-box a img {
  padding-bottom: 2px;
  height: 22px;
}

.core-text a img {
  padding-bottom: 2px;
  height: 22px !important;
  width: 22px !important;
}

#victories h2,
#victories .section-subheading,
/* #victories h3, */
#victories .paragraph {
  color: var(--white) !important;
}

#victories h3 {
  color: var(--red) !important;
  padding-bottom: 15px;
  font-size: 25px;
}

#victories .section-subheading,
#intro .p-long {
  word-wrap: break-word;
  white-space: normal;
}

.aoc-topic {
  padding-top: 6px;
  padding-bottom: 6px;
  display: inline-block;
}

.section-subheading {
  padding-left: 20px;
  padding-right: 20px;
}

#victories h3 {
  font-weight: bold;
}

#victories h4 {
  padding-top: 15px;
  font-size: 120%;
  padding-bottom: 5px;
}

.half-br {
  display: block;
  content: '';
  margin-bottom: 0.75em;
}

.quarter-br {
  display: block;
  content: '';
  margin-bottom: .3em;
}

/* image & video */

.aoc-logo {
  max-width: 300px;
  margin-bottom: 30px;
}

.game-logo {
  max-width: 150px;
  margin-top: 12px;
}

.video {
  position: relative;
  padding-top: 56.25%; /* 16:9 aspect ratio */
  height: 0;
  overflow: hidden;
  /* opacity: 0.9; */
  border-radius: 10px !important;
}

.youtube-video {
  padding: 0 3px 0 3px;
}

.video iframe,
.video object,
.video embed {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 10px;
}

/* cursors */

body {
  cursor: default;
}

a,
button,
.dropdown-toggle,
.nav-button,
.nav-link,
.navigation-link,
.navigation {
  cursor: pointer !important;
  font-weight: bold;
}

/* nav */

.navigation-bar,
.navigation-menu,
.nav-link,
.brand-link,
.navigation-bar .brand-text {
  background-color: transparent;
  text-align: right;
}

.navigation-menu {
  padding-bottom: 30px !important;
  padding-right: 30px;
}

.nav-logo {
  height: 26px;
}

.nav-link {
  padding-top: 16px;
}

.nav-link.word:hover {
  filter: var(--blue-glow);
  animation: flicker 0.8s linear infinite;
}

.brand-link.nav-brand {
  padding-left: 25px;
  padding-top: 18px;
}

.icons {
  padding-left: 10px;
}

.nav-link.icon {
  padding-left: 10px;
  padding-right: 0;
}

.nav-link .social-icon,
.footer-link .social-icon {
  border-radius: 50%;
  background-color: transparent;
}

.nav-link .social-icon:hover,
.footer-link .social-icon:hover {
  filter: var(--red-glow);
  animation: flicker 0.8s linear infinite;
}

.nav-link .social-icon {
  border: 1.5px solid white;
  height: 30px !important;
  width: 30px !important;
  padding: 4px;
}

.nav-link .social-icon.twitch {
  padding: 6px;
}

.footer-link .social-icon {
  height: 40px !important;
  width: 40px !important;
  border: 2px solid white;
  padding: 5px;
}

.navigation-menu {
  display: flex;
  align-items: center;
}

/* headings */

#intro h2 {
  font-weight: bold;
}

.hero-subheading {
  font-weight: bold;
  line-height: 1.5;
  margin-bottom: 60px;
}

/* hero */

.hero-section {
  padding-bottom: 10px !important;
}

/* intro */

#intro {
  padding-top: 30px !important;
  padding-bottom: 30px !important;
}

#intro .next-chapter,
.hero-subheading div {
  margin-top: 30px !important;
}

#intro .section-heading,
#intro .next-chapter {
  color: var(--white) !important;
  opacity: 0.8;
}

#intro .section-subheading,
#intro h3,
#intro p {
  color: var(--light-gray) !important;
}

.section-subheading {
  font-size: 18px !important;
}

#intro .p-long {
  margin-top: 30px;
  font-size: 20px;
}

.typewriter::after {
  content: '|';
  animation: blink-cursor 1s step-end infinite;
}

@keyframes blink-cursor {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

/* core */

#core {
  padding-top: 50px !important;
  padding-bottom: 50px !important;
}

#core {
  background-color: var(--black);
}

#core .section-heading {
  padding-top: 30px;
}

#core .section-title-group {
  margin-bottom: 45px;
}

#core .section-subheading {
  color: var(--light-gray) !important;
}

#core h2 {
  color: var(--red);
}

/* victories */

#victories {
  padding-top: 60px;
}

.victory-box {
  display: flex;
  justify-content: stretch;
  gap: 1;
  width: 100% !important;
}

.aoc-realm {
  min-width: 220px !important;
}

.victory-box div {
  flex: 1;
  min-width: 175px;
}

/* discord and twitch links */

.nav-menu .navigation-link[href*="twitch"] {
  display: inline-block;
}

.hollow-button {
  display: none;
}

.hollow-button:hover {
  filter: var(--blue-glow);
  animation: flicker 0.8s linear infinite;
}

/* footer */

.footer-text {
  font-size: 18px !important;
}

.footer-link .social-icon {
  display: none;
}

.c {
  color: var(--red);
}

/* responsive */

@media (max-width: 941px) {
  .nav-logo.text {
    display: none;
  }

  #intro,
  #core {
    padding-top: 20px;
    padding-bottom: 20px;
  }

  .video {
    border-radius: 0 !important;
  }

  .youtube-video {
    padding: 3px 0 3px 0!important;
    background: url('/assets/backgrounds/bg-stripes.avif') center/cover no-repeat;
  }

  .aoc-logo {
    max-width: 200px;
  }

  .nav-link.icon {
    margin: 0;
  }

  .navigation-bar {
    padding-right: 25px;
  }

  .victories-item > :first-child {
    text-align: right;
  }

  .victories-item {
    display: block;
    text-align: left;
    padding: 5px;
  }

  #victories h4 {
    font-size: 120%;
    padding-bottom: 5px;
  }

  .victory-box {
    padding-left: 40px;
    padding-right: 40px;
  }

  .core-items {
    padding-left: 5px;
  }

  .core-item img {
    width: 40px !important;
    height: 40px !important;
    padding-right: 5px;
  }

  .core-text {
    padding-right: 20px;
  }

  .hero-subheading {
    font-size: 150%;
  }

  .hero-subheading span,
  #core .section-subheading span {
    display: inline-block;
  }

  /* .hide-mobile {
    display: none !important;
  } */

  .section-title-group {
    margin-bottom: 35px;
  }

  .hero-subheading span:first-child {
    margin-bottom: 20px;
  }

  #victories .paragraph.p-long.white-box {
    max-width: 100%;
    padding-bottom: 20px;
    padding-left: 20px;
    padding-right: 20px;
  }

  #intro {
    padding: 0 !important;
  }

  /* .video {
    opacity: 1;
  } */

  iframe {
    border-radius: 0 !important;
  }

  #intro::before {
    background: var(--black) !important;
    background-image: none !important;
  }
}

@media (min-width: 800px) and (max-width: 939px) {
  .victories-item {
    display: flex;
  }

  .victory-box {
    padding-left: 10px !important;
  }
}

@media (max-width: 800px) {
  .icons {
    display: none;
  }

  .footer-text {
    line-height: 1;
    margin: 0;
  }

  .footer-link .social-icon {
    margin-left: 5px;
    margin-right: 5px;
    margin-top: 15px;
    display: inline-block;
  }

  .c {
    color: var(--white);
  }

  .nav-menu .navigation-link[href*="twitch"] {
    display: none;
  }

  .nav-logo {
    visibility: hidden;
  }

  .nav-link.word {
    padding-right: 23px;
  }

  .nav-link.word:hover {
    filter: none;
    animation: none;
  }

  .nav-menu,
  .nav-link {
    background-color: transparent;
    color: var(--white);
    background-color: rgba(0, 0, 0, 0.5) !important;
    font-weight: bold;
  }

  .hollow-button {
    display: inline-block;
    width: 245px;
    margin-bottom: 20px !important;
  }

  #victories .white-box {
    max-width: 80vw;
    padding-top: 50px !important;
  }

  .-nav-link-open {
    padding-bottom: 15px;
    margin-bottom: auto;
  }

  .victories-item {
    text-align: center;
  }

  #victories .white-box h3 {
    max-width: 100% !important;
    white-space: normal;
    text-align: center;
    margin: 0 auto;
    font-size: 25px;
    padding-bottom: 5px;
  }

  .competition,
  .competition-wide,
  .place,
  .place-narrow {
    display: inline;
  }

  #intro {
    padding: 0 !important;
    margin: 0 !important;
  }

  #intro,
  #victories {
    width: auto;
    min-width: 0;
    max-width: none;
    white-space: nowrap;
  }

  #victories p.paragraph {
    font-size: 100% !important;
  }

  .victory-box {
    flex-wrap: wrap;
  }

  .place-narrow {
    min-width: 100px !important;
    max-width: 100px !important;
  }

  .hero-subheading {
    margin-left: 30px;
    margin-right: 30px;
  }

  .p-long {
    margin-left: 0;
    margin-right: 0;
  }

  .heading.next-chapter span:first-child::after,
  .hero-subheading span:first-child::after {
    content: "";
    display: block;
  }

  #victories .white-box {
    max-width: 400px;
  }
}

@media (max-width: 500px) {
  .navigation-menu {
    padding-bottom: 80px !important;
  }

  .hero-section {
    min-height: 93vh;
  }

  .banner-image {
    width: 90%;
  }

  #intro {
    padding: 0 !important;
  }

  #intro::before,
  #victories::before,
  #core::before,
  .top-section::before,
  .footer::before {
    background-attachment: scroll !important;
    background-position: center top;
  }

  #intro .section-title-group {
    margin-top: 0;
    margin-bottom: 30px;
  }

  #intro .section-heading,
  #core .section-heading {
    font-size: 150% !important;
  }

  #core .section-subheading {
    margin-left: 15px;
    margin-right: 15px;
  }

  .hero-subheading {
    margin-bottom: 0 !important;
  }

  #core .section-heading {
    padding-top: 15px !important;
  }

  #core .section-heading,
  #victories .section-heading {
    font-size: 175% !important;
  }

  .hero-subheading span {
    display: inline-block;
  }

  .hero-subheading span:first-child {
    margin-bottom: 20px;
  }

  .p-long {
    margin-left: 0;
    margin-right: 0;
  }

  #core .p-long {
    text-align: left;
  }

  #intro .white-box {
    margin-bottom: 15px;
  }
}

@media (max-width: 259px) {
  .aoc-logo,
  .game-logo {
    max-width: 150px !important;
  }

  .brand-text {
    display: none;
  }

  .navigation-bar {
    padding-bottom: 10px;
  }

  #victories .paragraph {
    font-size: 90%;
  }
}

#victories .white-box h4 {
  font-weight: 100 !important;
}

.nav-link.word {
  padding-bottom: 15px !important;
}
