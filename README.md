# FortiClient tray actions

The Omarchy system tray opens the FortiClient VPN menu on right-click. The
menu includes **Connect VPN…**, which opens the FortiClient login window for
SAML, and **Disconnect VPN**, which calls the FortiClient CLI for the current
user. The menu checks VPN status when it opens. Disconnect is available
when the CLI reports a connected tunnel. The tray keeps the application's
own menu entries.

The actions recognize the Linux FortiTray item by its ID
(`example-simple-client`) and title (`fortitray`). The FortiClient VPN package
provides `/opt/forticlient/gui/FortiClient` and
`/opt/forticlient/forticlient-cli`. The plugin polls status only when the
menu opens or a disconnect finishes and discards profile data from the CLI.

## Install

From the Omarchy Plugins checkout:

```sh
scripts/install forticlient-tray
```

Once `omarchy plugin list` shows the clone, enable it and restart the shell.

```sh
omarchy plugin enable io.github.ltecosta.forticlient-tray
omarchy restart shell
```

The plugin clones `omarchy.tray` and takes its place in the bar layout.
Right-click the FortiClient icon to see the VPN actions.

## Source

`Tray.qml` and `TrayModel.js` come from Omarchy 4.5.0, under
`shell/plugins/bar/widgets/`. The tray menu calls `FortiVpn.qml` and uses
the notifier identity and status parsing in `Model.js`. Compare the tray
files with the installed Omarchy version when updating the clone.

## License

MIT. The tray is based on Omarchy's system tray, © David Heinemeier Hansson.
