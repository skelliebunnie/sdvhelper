# STARDEW VALLEY HELPER
This is for all the players who can't (or don't want to) use mods but want an easy way to see helpful info like what fish are available in Spring on a rainy day at any given time/location, or what cooked dishes the ingredients they have on hand can make.

This is not meant as a replacement for the wiki(s), or as a source of all knowledge on Stardew Valley. The intention is to help visualize info like:
- what fish are available where
- what cooked goods can be made from which ingredients
- the smallest list of gifts you need for that one Qi quest

## Including Elements from Mods
I will be including data from various mods, starting with the big ones like Expanded, Eastscarp, and Ridgeside (probably in that order). There will be a way to disable data from mods, though, for those who just want info from the Vanilla game.

## Version 1
We're focusing on *fish* - my personal nemesis (nemeses?) - for this version! I'm always planning a fishing day and then getting my times mixed up and missing my window to catch a particular fish I needed. Or I'm getting my weather mixed up (looking at you, Pufferjelly from the Stardew Valley Expanded mod). But no longer!

# Technical Details
**Client:**
- React
- Axios

**Server/Backend:**
- Express + Node.js
- MongoDB

The project is not (as of 2026.10.25) hosted anywhere, and does not use authorization to hide or limit anything like create/edit/delete functionality. Once I have a couple more "layers" done I'll add auth checks and host this somewhere, but for now I'm focusing on just building things out.