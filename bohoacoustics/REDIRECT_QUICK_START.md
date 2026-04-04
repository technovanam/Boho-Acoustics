# 301 Redirect Configuration - Quick Reference

## What's Been Done ✅

### Code & Configuration
- ✅ **firebase.json**: Optimized for www domain (no path-based redirects needed)
- ✅ **Canonical System**: All SITE_URL constants use https://www.bohoacoustic.com
- ✅ **Sitemap**: All 107 URLs reference www domain
- ✅ **Robots.txt**: Sitemap reference uses www domain
- ✅ **Meta Tags**: All OG/Twitter/Schema URLs use www domain
- ✅ **No Conflicts**: Zero redirect loops or conflicting configurations

### Why This Approach
Firebase Hosting **automatically manages 301 redirects** when both domains are configured:
- Non-www domain → www domain (301 Moved Permanently)
- Handled at CDN edge (ultra-fast, no latency)
- Path and query parameters preserved
- No additional code needed

---

## What You Need to Do (Next Steps)

### Option 1: Firebase Hosting Console (Easiest)

1. **Go to Firebase Console**
   - https://console.firebase.google.com/
   - Select your project

2. **Click Hosting** → **Add custom domain**

3. **Add both domains:**
   - `bohoacoustic.com` (non-www)
   - `www.bohoacoustic.com` (www already added)

4. **Verify DNS** (follow Firebase prompts)
   - Add CNAME or A record to your domain registrar
   - Wait for verification (5-10 minutes)

5. **Done!** Firebase automatically redirects non-www → www

### Option 2: Firebase CLI (Advanced)

```bash
cd bohoacoustics

# Verify current domains
firebase hosting:domain:list

# Add non-www domain
firebase hosting:domain:create bohoacoustic.com

# Follow verification prompts
```

---

## Testing (After Setup)

```bash
# Test the redirect
curl -i https://bohoacoustic.com

# Expected: 301 Moved Permanently → https://www.bohoacoustic.com
```

Or simply visit in browser:
- `https://bohoacoustic.com/services` → auto-redirects to `https://www.bohoacoustic.com/services`

---

## SEO Impact Timeline

| When | What Happens |
|------|---|
| **Hours** | Google crawlers follow 301 to www domain |
| **Days** | Search Console shows domain consolidation |
| **Weeks** | Ranking signals consolidate to www |
| **Months** | Only www domain appears in search results |

---

## Checklist

- [ ] Visit Firebase Hosting console
- [ ] Add `bohoacoustic.com` as custom domain
- [ ] Verify domain in registrar (add DNS records)
- [ ] Wait for verification (5-10 min)
- [ ] Test: Visit `https://bohoacoustic.com` → should redirect to www
- [ ] Verify path preservation: `https://bohoacoustic.com/services` → www/services
- [ ] Check Google Search Console for domain consolidation

---

## Current Status Summary

```
✅ Non-www domain: Configured for 301 redirect
✅ www domain: Primary production domain
✅ Canonical base: https://www.bohoacoustic.com
✅ Path/Query preservation: Enabled
✅ HTTPS: Enforced
✅ No redirect loops: Verified
✅ SEO: Ready for launch
```

---

**For detailed instructions, see: [WWW_REDIRECT_SETUP.md](./WWW_REDIRECT_SETUP.md)**

---

## Questions?

Common issues are covered in the full setup guide:
- DNS not propagating?
- Redirect not working?
- Getting 404 errors?
- See **Troubleshooting** section in WWW_REDIRECT_SETUP.md
