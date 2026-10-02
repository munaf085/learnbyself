$urls = @(
    "http://localhost:3000/",
    "http://localhost:3000/java",
    "http://localhost:3000/java/basics",
    "http://localhost:3000/java/oop",
    "http://localhost:3000/java/basics/getting-started",
    "http://localhost:3000/java/basics/getting-started/what-is-java",
    "http://localhost:3000/java/basics/getting-started/hello-world",
    "http://localhost:3000/java/oop/classes-and-objects/what-is-an-object",
    "http://localhost:3000/practice",
    "http://localhost:3000/profile"
)

$allPassed = $true
foreach ($u in $urls) {
    try {
        $res = Invoke-WebRequest -Uri $u -UseBasicParsing -TimeoutSec 15
        if ($res.StatusCode -eq 200) {
            Write-Host "PASS (200): $u"
        } else {
            Write-Host "FAIL ($($res.StatusCode)): $u"
            $allPassed = $false
        }
    } catch {
        Write-Host "FAIL: $u -> $($_.Exception.Message)"
        $allPassed = $false
    }
}

if ($allPassed) {
    Write-Host "`nALL 4-LEVEL HIERARCHY ROUTES VERIFIED: 100% PASS"
} else {
    Write-Host "`nSOME ROUTES FAILED"
}
