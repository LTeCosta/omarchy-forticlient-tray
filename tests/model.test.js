const assert = require("node:assert/strict")
const fs = require("node:fs")
const path = require("node:path")
const test = require("node:test")
const vm = require("node:vm")

const model = vm.createContext({})
const source = fs.readFileSync(path.join(__dirname, "../Model.js"), "utf8")
vm.runInContext(source.replace(/^\.pragma library\s*/, ""), model)

test("match the FortiTray title as well as its generic notifier ID", () => {
  assert.equal(model.isFortiTray({ id: "example-simple-client", title: "fortitray" }), true)
  assert.equal(model.isFortiTray({ id: "example-simple-client", title: "Other app" }), false)
  assert.equal(model.isFortiTray({ id: "other-app", title: "fortitray" }), false)
  assert.equal(model.isFortiTray({ id: "example-simple-client", title: "<b>fortitray</b>" }), false)
  assert.equal(model.isFortiTray(null), false)
})

test("read only the VPN status line and ignore private fields", () => {
  assert.equal(model.vpnStatus("Status: Connected\n  Username: user@example.invalid"), "connected")
  assert.equal(model.vpnStatus("Status: Disconnected\r\n"), "disconnected")
  assert.equal(model.vpnStatus("Status: Not connected"), "disconnected")
  assert.equal(model.vpnStatus("Status: Connecting"), "unknown")
  assert.equal(model.vpnStatus("Status: <img src='x'>\nStatus: Connected"), "unknown")
  assert.equal(model.vpnStatus("Status: Connected unexpectedly"), "unknown")
  assert.equal(model.vpnStatus(null), "unknown")
})
