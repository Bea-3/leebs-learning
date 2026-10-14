---
name: offline-first
description: Build and test Leebs features for unreliable connectivity.
---

# Offline-First Skill

When implementing offline behavior:

1. Read docs/ARCHITECTURE.md.
2. Assume connectivity may disappear mid-session.
3. Preserve learner work locally.
4. Cache core learning content where appropriate.
5. Keep AI explicitly online-only.
6. Provide graceful offline UI states.
7. Test behavior with network access disabled.
8. Avoid unnecessary network requests.