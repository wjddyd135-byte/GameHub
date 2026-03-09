🎮 readme.md (GameHub)
프로젝트 설명
이 프로젝트는 사용자가 다양한 게임 정보를 확인하고 취향에 맞는 게임을 탐색할 수 있도록 제작한 게임 추천 웹 애플리케이션입니다.
사용자는 게임 목록을 확인하고 검색 기능을 통해 원하는 게임을 찾을 수 있으며, 추천 게임을 확인하고 게임 상세 정보를 조회할 수 있습니다.
또한 관심 있는 게임을 찜목록에 저장할 수 있도록 localStorage 기반 기능을 구현하였습니다.
React Bootstrap을 활용하여 직관적이고 깔끔한 UI를 구성하였으며, 컴포넌트 기반 구조로 개발하여 유지보수 및 확장이 용이하도록 설계하였습니다.

📋 주요 기능
게임 검색: 사용자가 게임 이름을 검색하여 원하는 게임을 빠르게 찾을 수 있습니다.
추천 게임: 트렌딩 게임 및 추천 게임 목록을 확인할 수 있습니다.
게임 정보 조회: 게임의 상세 정보와 평점 등을 확인할 수 있습니다.
찜목록 기능: 관심 있는 게임을 localStorage에 저장하여 관리할 수 있습니다.
후기 게시판: 사용자가 게임에 대한 의견이나 후기를 작성할 수 있습니다.
React Bootstrap 사용: 반응형 및 직관적인 UI를 구현했습니다.
컴포넌트 기반 구조: 유지보수 및 확장성을 고려하여 컴포넌트 단위로 설계했습니다.
🛠️ 기술 스택
React.js: 사용자 인터페이스 구축
React Router: 페이지 라우팅 구현
React Bootstrap: UI 스타일링
JavaScript: 기능 구현
CSS: 커스텀 스타일링
GitHub Pages: 웹사이트 배포
🚀 설치 및 실행 방법
프로젝트를 실행하려면 다음 단계를 따라주세요.

1. 프로젝트 클론
git clone https://github.com/wjddyd135-byte/GameHub.git
2. 프로젝트 폴더 이동
cd GameHub
3. 필요한 패키지 설치
npm install
4. 앱 실행
npm start
실행 후 localhost:3000에서 애플리케이션을 확인할 수 있습니다.

🌐 배포 방법
본 프로젝트는 GitHub Pages를 이용하여 배포되었습니다.

gh-pages 패키지를 설치합니다.
<!-- -->
npm install gh-pages --save-dev
package.json 파일에 homepage 경로를 추가합니다.
<!-- -->
"homepage": "https://wjddyd135-byte.github.io/GameHub"
scripts에 배포 명령어를 추가합니다.
<!-- -->
"predeploy": "npm run build",
"deploy": "gh-pages -d build"
아래 명령어를 실행하여 프로젝트를 배포합니다.
<!-- -->
npm run deploy
🌍 배포 사이트
https://wjddyd135-byte.github.io/GameHub/
📂 프로젝트 구조
GameHub/
├── public/               # 공용 정적 파일
├── src/                  # 소스 코드
│   ├── components/       # 재사용 가능한 컴포넌트
│   │   ├── GameCard.js
│   │   ├── GameDetail.js
│   │   ├── HeroSlider.js
│   │   ├── TrendingCard.js
│   │   ├── Wishlist.js
│   │   ├── Board.js
│   │   └── Footer.js
│   ├── db/               # 게임 데이터
│   │   ├── games.js
│   │   └── trending.js
│   ├── App.js            # 최상위 컴포넌트
│   ├── index.js          # 앱 진입 파일
│   └── App.css           # 스타일 파일
├── package.json          # 프로젝트 메타 정보 및 의존성
└── README.md
🤝 기여 방법
프로젝트 개선을 위한 아이디어나 기능 제안은 언제든지 환영합니다.

프로젝트를 포크(Fork)합니다.
새로운 브랜치를 생성합니다. (git checkout -b feature/your-feature)
기능을 추가하거나 버그를 수정한 후 커밋합니다.
Pull Request를 생성하여 변경 사항을 제안합니다.
📜 라이선스
이 프로젝트는 MIT 라이선스를 기반으로 배포됩니다.

MIT 라이선스
Copyright (c) 2026 GameHub

본 소프트웨어는 자유롭게 사용, 수정, 배포할 수 있습니다.
다만 소프트웨어의 복사본 또는 주요 부분을 사용할 때는
저작권 고지와 라이선스를 포함해야 합니다.

본 소프트웨어는 어떠한 보증도 없이 제공됩니다.
✉️ 연락처
GitHub: https://github.com/wjddyd135-byte