# The game window's state and a few window actions through user32 (Electron has no Browser.setWindowBounds over CDP).
# powershell -File win.ps1 <state|minimize|restore|maximize|front|narrow1>
param([string]$Action)
Add-Type @"
using System; using System.Runtime.InteropServices;
public static class W {
  [DllImport("user32.dll")] public static extern bool IsIconic(IntPtr h);
  [DllImport("user32.dll")] public static extern bool IsZoomed(IntPtr h);
  [DllImport("user32.dll")] public static extern bool ShowWindow(IntPtr h, int c);
  [DllImport("user32.dll")] public static extern bool SetForegroundWindow(IntPtr h);
  [DllImport("user32.dll")] public static extern IntPtr GetForegroundWindow();
  [DllImport("user32.dll")] public static extern bool GetWindowRect(IntPtr h, out RECT r);
  [DllImport("user32.dll")] public static extern bool MoveWindow(IntPtr h, int x, int y, int w, int hh, bool repaint);
  public struct RECT { public int L, T, R, B; }
}
"@
$main = Get-CimInstance Win32_Process -Filter "Name='electron.exe'" | Where-Object { $_.CommandLine -notmatch '--type=' } | Select-Object -First 1
$h = (Get-Process -Id $main.ProcessId).MainWindowHandle
$r = New-Object W+RECT; [void][W]::GetWindowRect($h, [ref]$r)
switch ($Action) {
  'minimize' { [void][W]::ShowWindow($h, 6) }
  'restore'  { [void][W]::ShowWindow($h, 9) }
  'maximize' { [void][W]::ShowWindow($h, 3) }
  'front'    { [void][W]::ShowWindow($h, 3); [void][W]::SetForegroundWindow($h) }
  'close'    { [void](Get-Process -Id $main.ProcessId).CloseMainWindow() }
  'narrow1'  { [void][W]::MoveWindow($h, $r.L, $r.T, $r.R - $r.L - 1, $r.B - $r.T, $true) }
}
Start-Sleep -Milliseconds 300
[void][W]::GetWindowRect($h, [ref]$r)
"handle=$h iconic=$([W]::IsIconic($h)) zoomed=$([W]::IsZoomed($h)) foreground=$([W]::GetForegroundWindow() -eq $h) rect=$($r.L),$($r.T),$($r.R),$($r.B)"
