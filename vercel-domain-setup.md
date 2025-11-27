# Vercel Domain Configuration

## Project Details
- **Project ID:** MC8NfYL59TjgaETxPFz7NVOE
- **Domain:** pet-airlines.com
- **Nameservers:** Already set to Vercel (ns1.vercel-dns.com, ns2.vercel-dns.com)

## Steps to Configure Domain in Vercel Dashboard

1. Go to **vercel.com/dashboard**
2. Select **pet-airlines** project
3. Go to **Settings** → **Domains**
4. Click **Add Domain**
5. Add both:
   - `pet-airlines.com`
   - `www.pet-airlines.com`

## Expected Results
- ✅ Automatic SSL certificates
- ✅ Global CDN
- ✅ Automatic redirects (www → apex or vice versa)
- ✅ DNS managed by Vercel

## Post-Setup Verification
- Check `https://pet-airlines.com` loads
- Check `https://www.pet-airlines.com` redirects properly
- Verify SSL certificate is valid
- Test global performance

## Deployment URL (temporary)
- Current: `pet-airlines.vercel.app`
- Will redirect to: `pet-airlines.com` after domain setup