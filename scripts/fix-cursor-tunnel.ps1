# Fix Cursor Ports panel: missing code-tunnel.exe (ENOENT)
#
# Cursor looks for:  C:\Program Files\cursor\bin\code-tunnel.exe
# Actual binary at:  C:\Program Files\cursor\resources\app\bin\code-tunnel.exe
#
# Run ONCE as Administrator:
#   npm run fix:cursor-tunnel

$ErrorActionPreference = "Stop"

$cursorRoot = "C:\Program Files\cursor"
$sourceDir = Join-Path $cursorRoot "resources\app\bin"
$targetDir = Join-Path $cursorRoot "bin"
$sourceTunnel = Join-Path $sourceDir "code-tunnel.exe"
$sourceCursorTunnel = Join-Path $sourceDir "cursor-tunnel.exe"
$targetTunnel = Join-Path $targetDir "code-tunnel.exe"

function Test-IsAdmin {
  $id = [Security.Principal.WindowsIdentity]::GetCurrent()
  $principal = New-Object Security.Principal.WindowsPrincipal($id)
  return $principal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
}

if (-not (Test-Path $cursorRoot)) {
  Write-Error "Cursor not found at $cursorRoot. Update the path in this script if installed elsewhere."
}

if (-not (Test-IsAdmin)) {
  Write-Host "Requesting Administrator privileges..."
  $script = $MyInvocation.MyCommand.Path
  Start-Process -FilePath "powershell.exe" -Verb RunAs -ArgumentList @(
    "-NoProfile",
    "-ExecutionPolicy", "Bypass",
    "-File", "`"$script`""
  ) | Out-Null
  exit 0
}

if (-not (Test-Path $sourceTunnel) -and -not (Test-Path $sourceCursorTunnel)) {
  Write-Error "Neither code-tunnel.exe nor cursor-tunnel.exe found under $sourceDir"
}

New-Item -ItemType Directory -Force -Path $targetDir | Out-Null

if (Test-Path $sourceTunnel) {
  Copy-Item -Force $sourceTunnel $targetTunnel
} else {
  Copy-Item -Force $sourceCursorTunnel $targetTunnel
}

if (Test-Path $sourceCursorTunnel) {
  Copy-Item -Force $sourceCursorTunnel (Join-Path $targetDir "cursor-tunnel.exe")
}

Write-Host ""
Write-Host "OK - Cursor tunnel binary is ready:"
Write-Host "  $targetTunnel"
Get-Item $targetTunnel | Format-List FullName, Length, LastWriteTime
Write-Host "Retry Ports -> Forward a Port -> 3001"
Write-Host "Tip: after closing the port, kill code-tunnel.exe in Task Manager if it stays running."
Write-Host ""
pause
