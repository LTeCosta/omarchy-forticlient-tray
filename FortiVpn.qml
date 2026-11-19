import QtQuick
import Quickshell
import Quickshell.Io
import "Model.js" as Model

QtObject {
  id: root

  property string status: "unknown"
  readonly property bool busy: statusProcess.running || disconnectProcess.running
  readonly property bool canConnect: !busy && status !== "connected"
  readonly property bool canDisconnect: !busy && status === "connected"
  signal disconnectFailed()

  function refresh() {
    if (busy) return
    status = "unknown"
    statusProcess.running = true
  }

  function openLogin() {
    if (canConnect) Quickshell.execDetached(["/opt/forticlient/gui/FortiClient"])
  }

  function disconnectVpn() {
    if (!canDisconnect) return
    status = "unknown"
    disconnectProcess.running = true
  }

  property Process statusProcess: Process {
    command: ["/usr/bin/timeout", "4s", "/opt/forticlient/forticlient-cli", "vpn", "status"]
    stdout: StdioCollector { id: statusOutput; waitForEnd: true }
    onExited: function(exitCode) {
      root.status = exitCode === 0 ? Model.vpnStatus(statusOutput.text) : "unknown"
    }
  }

  property Process disconnectProcess: Process {
    command: ["/usr/bin/timeout", "10s", "/opt/forticlient/forticlient-cli", "vpn", "disconnect"]
    onExited: function(exitCode) {
      if (exitCode !== 0) root.disconnectFailed()
      Qt.callLater(root.refresh)
    }
  }
}
