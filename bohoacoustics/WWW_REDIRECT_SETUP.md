# 301 Domain Redirect Setup - Non-www to www

## Overview

This document provides step-by-step instructions to configure a **permanent 301 redirect** from `https://bohoacoustic.com/*` to `https://www.bohoacoustic.com/*` in Firebase Hosting.

This is critical for SEO because:
- Prevents duplicate content issues (Google sees both domains as separate sites)
- Consolidates crawl budget and link equity to the canonical www domain
- Ensures proper ranking signal to one domain

---

## Prerequisites

- ✅ **Site already using www domain**: All canonical tags, sitemap, and metadata use https://www.bohoacoustic.com/
- ✅ **Both domains configured in DNS**: Both bohoacoustic.com and www.bohoacoustic.com resolve to Firebase Hosting
- ✅ **Firebase CLI installed** (for verification step)

---

## Setup Method 1: Firebase Hosting Console (Recommended)

### Step 1: Log into Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **Boho Acoustics** (or your Firebase project)
3. Click **Hosting** in the left sidebar

### Step 2: Add Custom Domains

1. Click **Add custom domain**
2. Enter: `bohoacoustic.com` (non-www)
3. Verify the domain ownership (prompt will appear)
4. Wait for verification to complete (~5-10 minutes)
5. Repeat for `www.bohoacoustic.com` if not already added

### Step 3: Configure Primary Domain

1. After both domains are verified, you'll see them in the Hosting domains list
2. The domain listed as **Primary** will be the main site
3. Set **www.bohoacoustic.com** as the Primary domain:
   - Click the three-dot menu (⋯) next to bohoacoustic.com
   - Select "Remove this domain"
   - Or, Firebase will automatically configure the redirect

**Note:** Firebase Hosting will automatically handle the 301 redirect from the non-primary domain to the primary domain once both are configured.

### Step 4: Verify Redirect (Wait 5 minutes for propagation)

```bash
# Test non-www to www redirect
curl -i https://bohoacoustic.com/

# Expected response:
# HTTP/1.1 301 Moved Permanently
# Location: https://www.bohoacoustic.com/
```

---

## Setup Method 2: Firebase CLI (Advanced)

If you prefer command-line configuration, use the Firebase CLI:

### Step 1: Ensure Default Site Configuration

In `firebase.json`, the site is already configured correctly for www:

```json
{
  "hosting": {
    "public": "dist",
    ...
  }
}
```

### Step 2: Deploy to Firebase Hosting

```bash
cd bohoacoustics
firebase deploy --only hosting
```

### Step 3: Configure Domain Redirects in CLI

```bash
# List current custom domains
firebase hosting:domain:list

# To add a new custom domain:
firebase hosting:domain:create bohoacoustic.com

# After adding, the CLI will prompt you to:
# 1. Verify DNS records
# 2. Confirm the redirect configuration
```

### Step 4: Verify Deployment

```bash
# Check hosting status
firebase hosting:channel:list
```

---

## Verification & Testing

### Using curl (command line):

```powershell
# Test non-www domain redirect
curl -i -L https://bohoacoustic.com

# Test www domain (should load normally)
curl -i https://www.bohoacoustic.com

# Test with paths
curl -i -L https://bohoacoustic.com/services
curl -i -L https://bohoacoustic.com/blog?sort=date
```

### Expected Results:

**Non-www domain:**
```
HTTP/2 301
Location: https://www.bohoacoustic.com
```
↓ (redirect)
```
HTTP/2 200
(Normal site loads)
```

**www domain:**
```
HTTP/2 200
(Loads directly without redirect)
```

### Using Browser:

1. Visit: `https://bohoacoustic.com`
   - Should see the address bar update to `https://www.bohoacoustic.com`
   - Page loads normally
   - No redirect chain or loop

2. Visit: `https://www.bohoacoustic.com`
   - Should load normally
   - Address bar unchanged

3. Test with paths:
   - `https://bohoacoustic.com/services` → redirects to `https://www.bohoacoustic.com/services`
   - `https://bohoacoustic.com/blog?post=id` → redirects to `https://www.bohoacoustic.com/blog?post=id`

---

## Firebase Hosting Architecture

Firebase Hosting handles the 301 redirect at the CDN/edge level before requesting your origin, so:

- ✅ **No server processing needed** - Redirect happens at Firebase edge
- ✅ **Zero latency impact** - Uses CDN cache
- ✅ **HTTPS preserved** - Both domains use HTTPS
- ✅ **SEO compliant** - Uses proper 301 status code
- ✅ **No redirect loops** - Firebase prevents circular redirects
- ✅ **Path & Query preserved** - Full URLs maintained through redirect

---

## SEO Impact

Once the 301 redirect is active:

### Immediate (Hours):
- Google crawlers will follow the 301 to www domain
- Canonical consistency enforced across all traffic
- No duplicate content penalties

### Medium-term (Days to Weeks):
- Google Search Console shows single domain consolidation
- Crawl budget consolidates to www domain
- Ranking signals transfer to www domain

### Long-term (Weeks to Months):
- One canonical domain in search results
- Improved ranking stability
- Clear single source of truth for content

---

## Troubleshooting

### Issue: Redirect not working after 10 minutes

**Solution:**
1. Check DNS records propagated:
   ```powershell
   nslookup bohoacoustic.com
   nslookup www.bohoacoustic.com
   ```
   Both should resolve to Firebase Hosting IP addresses

2. Verify both domains in Firebase Hosting console
3. Ensure no conflicting redirects in `firebase.json`
4. Clear browser cache: `Ctrl+Shift+Delete` (Windows)

### Issue: Getting 404 or different site for non-www domain

**Possible causes:**
- DNS not pointing to Firebase Hosting
- Domain not verified in Firebase console
- Wrong Firebase project selected

**Solution:**
1. Re-add the domain in Firebase Hosting console
2. Complete domain verification (TXT/CNAME record)
3. Wait 5-10 minutes for propagation

### Issue: Redirect creates loop

**Should not happen with Firebase**, but if it does:
1. Check for conflicting rewrites in `firebase.json` (none present currently)
2. Verify primary domain is set to www in Firebase console
3. Contact Firebase Support

---

## Current Configuration Status

✅ **firebase.json**: Already optimized for www domain
✅ **Canonical tags**: All reference www domain (https://www.bohoacoustic.com)
✅ **Sitemap**: All 107 URLs point to www domain
✅ **robots.txt**: Sitemap references www domain
✅ **OG/Schema**: All metadata uses www domain

**Pending:**
- [ ] Configure custom domains in Firebase Hosting console
- [ ] Verify 301 redirect is working
- [ ] Submit non-www domain to Google Search Console as discontinued
- [ ] Monitor Search Console for domain consolidation

---

## Support & Documentation

- [Firebase Hosting Documentation](https://firebase.google.com/docs/hosting)
- [Firebase Custom Domains](https://firebase.google.com/docs/hosting/custom-domain)
- [HTTP Status Code 301](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/301)
- [Google Search Console Domain Consolidation](https://support.google.com/webmasters/answer/139066)

---

## Next Steps After Redirect is Active

1. **Google Search Console:**
   - Add the non-www domain as a property
   - Use "Change of Address" tool to consolidate to www
   - Or simply monitor the www property for domain consolidation

2. **Monitor Indexing:**
   - Search: `site:bohoacoustic.com` in Google (should show www results)
   - Check GSC index coverage for both domains

3. **Update External Links (Optional):**
   - Audit backlinks pointing to non-www domain
   - Request updates to point to www domain

---

**Last Updated:** April 4, 2026
**Status:** Ready for implementation
