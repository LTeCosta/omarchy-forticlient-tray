.pragma library

function isFortiTray(item) {
  return !!item && item.id === "example-simple-client" && item.title === "fortitray"
}

function vpnStatus(output) {
  if (typeof output !== "string") return "unknown"
  var line = output.slice(0, 128).split("\n", 1)[0].trim()
  if (line === "Status: Connected") return "connected"
  if (line === "Status: Disconnected" || line === "Status: Not connected") return "disconnected"
  return "unknown"
}
