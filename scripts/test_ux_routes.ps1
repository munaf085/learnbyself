$urls = @(
    "http://localhost:3000/",
    "http://localhost:3000/java",
    "http://localhost:3000/java/fundamentals/hello-world",
    "http://localhost:3000/practice",
    "http://localhost:3000/profile",
    "http://127.0.0.1:8000/api/v1/health"
)

foreach ($u in $urls) {
    try {
        $res = Invoke-WebRequest -Uri $u -UseBasicParsing -TimeoutSec 15
        Write-Host "SUCCESS ($($res.StatusCode)): $u"
    } catch {
        Write-Host "FAILED: $u -> $($_.Exception.Message)"
    }
}
