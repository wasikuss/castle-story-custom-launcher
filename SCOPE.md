## Notes

### Assets that original launcher uses

#### Fonts

* Proxima Nova (light, regular, semibold, bold, extrabold) - free font from adobe fonts
  https://fonts.adobe.com/fonts/proxima-nova#licensing-section
* Canaro (light, book, medium, bold, black) - premium font
* Logo is Grobold font, but it is not used as text - free for personal use
  https://www.fontshungry.com/grobold-font/

#### Iconfonts

* Icomoon - not sure about rights
  https://icomoon.io/

### Functionality of the original launcher

#### Window

* close
* minimize

#### Main

* en/fr language switch
* launching the game
  * executes main game executable with width, height, fullscreen, monitor number
  * after launch it waits 1s and quits the launcher
* lists resolutions to pick from
  * resolution that display reports back
  * list of predefined resolutions
  * marks monitor resolution as default/selected
* stores in "localStorage"
  * selected resolution
  * selected monitor (despite it is removed)
  * if fullscreen was selected or not

#### News panel

* Data endpoint https://www.castlestory.net/api/web/launcher/get_infos?lang={language}
  * language looks like differs between en and fr only
  * ... render news panel

#### Credits modal

* Data endpoint https://www.castlestory.net/api/web/launcher/get_credits?lang={language}
  * language looks like differs between en and fr only
  * ... render credits modal with close button

#### Functionality that looks like it was disabled/removed/scraped

* online player profiles
* sign-in/sign-out buttons
* lists displays to pick from
* forum badge popup - I think it is just old
* Dx9/Dx11 switch
* En/Fr switch
