#!/usr/bin/env bash
set -euo pipefail

OWNER="siddharthajith2009"
REPO="instacloneforpersonal"
REMOTE="https://github.com/${OWNER}/${REPO}.git"

echo "→ Checking GitHub account…"
ACTIVE="$(gh api user --jq .login)"
if [[ "$ACTIVE" != "$OWNER" ]]; then
  echo "You are logged in as '$ACTIVE', not '$OWNER'."
  echo "Run: gh auth login"
  exit 1
fi

if ! gh repo view "${OWNER}/${REPO}" &>/dev/null; then
  echo "→ Creating ${OWNER}/${REPO}…"
  gh repo create "$REPO" --public --description "Glimpse — photo and video sharing app"
fi

if git remote get-url origin &>/dev/null; then
  git remote set-url origin "$REMOTE"
else
  git remote add origin "$REMOTE"
fi

echo "→ Enabling GitHub Pages (Actions)…"
gh api "repos/${OWNER}/${REPO}/pages" -X POST \
  -f build_type=workflow \
  -f source[branch]=main \
  -f source[path]=/ 2>/dev/null || true

echo "→ Pushing to main…"
git push -u origin main

echo ""
echo "Done. Site will be live at:"
echo "  https://${OWNER}.github.io/${REPO}/"
echo ""
echo "Track the deploy:"
echo "  gh run list --repo ${OWNER}/${REPO} --workflow deploy.yml"
