# Samples every Electron process of the game every ~2 s: working set, private bytes, CPU seconds, GPU dedicated memory
# (Windows "GPU Process Memory" counter), and the GPU engine utilisation per process. One CSV line per process per sample.
# Usage: powershell -File procSampler.ps1 <out.csv>
param([string]$Out)
"t_ms,pid,kind,svc,ws_mb,private_mb,cpu_s,gpu_dedicated_mb,gpu_3d_pct" | Out-File -Encoding utf8 $Out

while ($true) {
  $procs = Get-CimInstance Win32_Process -Filter "Name='electron.exe'"
  $mem = @{}; $util = @{}
  try {
    $c = Get-Counter '\GPU Process Memory(*)\Dedicated Usage','\GPU Engine(*engtype_3D)\Utilization Percentage' -ErrorAction Stop
    foreach ($s in $c.CounterSamples) {
      if ($s.InstanceName -match 'pid_(\d+)_') {
        $p = [int]$matches[1]
        if ($s.Path -match 'dedicated usage') { $mem[$p] = ($mem[$p] + $s.CookedValue) }
        else { $util[$p] = ($util[$p] + $s.CookedValue) }
      }
    }
  } catch {}
  $t = [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds()
  $lines = foreach ($e in $procs) {
    $gp = Get-Process -Id $e.ProcessId -ErrorAction SilentlyContinue
    if (-not $gp) { continue }
    $kind = if ($e.CommandLine -match '--type=(\S+)') { $matches[1] } else { 'main' }
    $svc = if ($e.CommandLine -match '--utility-sub-type=(\S+)') { $matches[1] } else { '' }
    $g = if ($mem.ContainsKey([int]$e.ProcessId)) { [math]::Round($mem[[int]$e.ProcessId]/1MB,1) } else { 0 }
    $u = if ($util.ContainsKey([int]$e.ProcessId)) { [math]::Round($util[[int]$e.ProcessId],2) } else { 0 }
    "$t,$($e.ProcessId),$kind,$svc,$([math]::Round($gp.WorkingSet64/1MB,1)),$([math]::Round($gp.PrivateMemorySize64/1MB,1)),$([math]::Round($gp.TotalProcessorTime.TotalSeconds,2)),$g,$u"
  }
  $lines | Out-File -Append -Encoding utf8 $Out
  Start-Sleep -Milliseconds 1000
}
