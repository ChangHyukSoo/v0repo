# 여백 블로그

## GitHub Pages 배포

`deploy` 브랜치에 푸시하면 `.github/workflows/deploy-pages.yml`이 타입 검사, 정적 빌드, GitHub Pages 배포를 수행합니다. 워크플로는 Git 저장소 루트에 있으므로 Actions에서 별도의 `v0repo/` 작업 경로를 지정하지 않습니다.

1. GitHub 저장소의 **Settings → Pages → Build and deployment → Source**를 **GitHub Actions**로 설정합니다.
2. `github-pages` 환경에 배포 브랜치 제한이 있다면 `deploy` 브랜치를 허용합니다.
3. 이 변경 사항을 `deploy` 브랜치에 포함하여 푸시합니다. 이미 브랜치가 있다면 해당 브랜치에 변경 사항을 병합합니다.
4. Actions의 **Deploy to GitHub Pages** 실행 결과에서 배포 주소를 확인합니다. 현재 저장소의 기본 주소는 `https://changhyuksoo.github.io/v0repo/`입니다.

별도 배포 토큰은 필요하지 않습니다. 기본 `GITHUB_TOKEN`과 Pages OIDC 권한을 사용합니다. 수동 실행도 지원하며 `deploy` 브랜치를 선택해야 합니다. 수동 실행 메뉴는 워크플로 파일이 기본 브랜치에도 있어야 표시됩니다.

Node.js 24와 `package.json`에 지정된 pnpm 버전을 사용합니다. Pages 메타데이터의 `base_path`, `base_url`을 빌드 환경 변수로 전달하여 하위 경로, 아이콘, Markdown의 루트 상대 이미지·링크, 사이트맵 주소를 설정합니다. 커스텀 도메인을 사용하려면 먼저 Pages 설정에서 도메인을 구성합니다.

로컬에서 같은 정적 빌드를 확인하려면 앱 루트에서 다음을 실행합니다.

```powershell
$env:GITHUB_PAGES = 'true'
$env:NEXT_PUBLIC_BASE_PATH = '/v0repo'
$env:NEXT_PUBLIC_SITE_URL = 'https://changhyuksoo.github.io/v0repo'
corepack pnpm exec tsc --noEmit
corepack pnpm build
```

결과는 `out/`에 생성됩니다. 정적 서버에서 `/v0repo/` 경로에 연결해 확인하며, `next start`는 정적 결과를 제공하지 않습니다. 일반 개발 서버로 돌아가려면 위 세 환경 변수를 제거합니다. `GITHUB_PAGES`가 없으면 기존 Next.js 서버 빌드를 사용합니다. 프로덕션의 미리보기 페이지는 404이고 초안은 정적 결과에 포함하지 않습니다. 개발 환경의 미리보기는 계속 사용할 수 있습니다.

`/content/posts` 폴더의 Markdown 파일을 읽어 구성하는 Next.js 개인 블로그입니다. 데이터베이스나 CMS 없이 파일 기반으로 동작합니다.

## 실행

```bash
pnpm install
pnpm dev
```

브라우저에서 `http://localhost:3000`을 엽니다.

## 포스팅 추가

`content/posts/my-post.md` 파일을 만들고 아래 frontmatter를 작성합니다.

```md
---
title: "포스팅 제목"
description: "목록과 SEO에 표시할 요약"
date: "2026-10-21"
slug: "my-post"
tags:
  - 기록
draft: false
relatedPosts:
  - first-post
---

# 본문
```

`draft: true`인 포스팅은 공개 페이지와 사이트맵에서 제외됩니다. `relatedPosts`에는 다른 포스팅의 slug를 지정할 수 있으며, 부족한 연관 글은 공통 태그를 기준으로 자동 보완됩니다.

## 이미지 삽입

이미지를 `public/images`에 넣고 Markdown에서 절대 경로로 참조합니다.

```md
![이미지 설명](/images/example.jpg)
```

## 초안 미리보기

개발 서버에서 `/preview`를 열면 초안을 포함한 모든 글을 볼 수 있습니다. `/preview/slug`에서 공개 상세 페이지와 같은 레이아웃으로 확인할 수 있습니다. 프로덕션 환경에서는 `/preview`가 404를 반환합니다.
