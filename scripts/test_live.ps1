$urls = @(
    "http://127.0.0.1:8000/api/v1/health",
    "http://127.0.0.1:8000/api/v1/curriculum/languages",
    "http://localhost:3000/",
    "http://localhost:3000/java",
    "http://localhost:3000/java/fundamentals/hello-world"
)

foreach ($u in $urls) {
    try {
        $res = Invoke-WebRequest -Uri $u -UseBasicParsing -TimeoutSec 10
        Write-Host "SUCCESS ($($res.StatusCode)): $u"
    } catch {
        Write-Host "FAILED: $u -> $($_.Exception.Message)"
    }
}
