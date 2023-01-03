# Castle Story Custom Launcher

<p align="center">
  <img src="docs/modding_community.png?raw=true" />
</p>

## Quickstart guide

Using [Releases](https://github.com/Danielduel/castle-story-custom-launcher/releases) tab
pick correct version:
* Windows `.exe` 
* Linux `.AppImage`

Launcher will work only if it is in game's folder.
* Open Steam
* Right click Castle Story in Library
* Pick "Local Files" from left tab
* Click "Browse"
This folder is Castle Story directory, move the launcher here.

![Screenshot of 0.0.3](docs/ss/0.0.3.png?raw=true "Screenshot")

## Summary

It is community-made Castle Story launcher with added features.

Current build targets

* Windows as portable version
* Linux as AppImage

Windows build will warn you about unknown developer, ignore that please -
I don't have Microsoft key for signing up applications.
It shouldn't ask for administrator permissions - report a bug if it will happen and don't run the application.

*If you need build for Mac or any other format for Linux - please message me in GH issues or via Discord*

### Features

#### Autostart (skipping launcher)

Autostart allows you to skip the launcher without fully removing it.

It works in 3 modes:
* Never - disables this feature
* Always - launcher will be skipped if game wasn't started in last 5 minutes
* Always (force) - launcher will be skipped

You can override autostart using config, the field is called `DISABLE_AUTOSTART`.

### Config file

Config file is treated as the override and has higer priority than what you've set in the launcher.

It is not created automatically.

It is expected to be in your Castle Story directory and be named `launcher.properties` - a simple text file named `launcher` with `properties` extension.
It is parsed using [dotenv library](https://github.com/motdotla/dotenv).

Schema
Field name              | Description                 | Expected values | Default value
---                     | ---                         | ---             | ---
DISABLE_AUTOSTART       | Overrides Autostart feature | `true` `false`  | `false`

Note that `Default value` is a value that is assumed either if config doesn't exist or value entry doesn't exist.

### Community links

* [Official Castle Story Discord](https://discord.gg/castlestory)

### Scope

go to [Scope](docs/SCOPE.md)

### Notes

`libxcrypt-compat` is needed on arch to build

### Authors

* [Daniel Mizerski](https://github.com/Danielduel) - Owner

### Testers

Big thanks to people who report back feedback!

* Monotony

### Credits to 3rd party sources

* <a href="https://www.flaticon.com/free-icons/external-link" title="external link icons">External link icons created by Bharat Icons - Flaticon</a>
