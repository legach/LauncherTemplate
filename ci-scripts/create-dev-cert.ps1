$cert = New-SelfSignedCertificate -DnsName <SiteDomain> -Type CodeSigning -CertStoreLocation Cert:\CurrentUser\My
$CertPassword = ConvertTo-SecureString -String "TESTkey" -Force -AsPlainText
Export-PfxCertificate -Cert "cert:\CurrentUser\My\$($cert.Thumbprint)" -FilePath "d:\selfsigncert.pfx" -Password $CertPassword