import {Container,Nav,Navbar,Button,Row,Col,Card,Badge} from "react-bootstrap";
import "./App.css";
import gamesData from "./db/games";
import trendingData from "./db/trending";
import { useEffect, useMemo, useState, useCallback } from "react";
import {Routes,Route,Link,NavLink,useNavigate,Outlet,useLocation} from "react-router-dom";

import GameCard from "./components/GameCard";
import TrendingCard from "./components/TrendingCard";
import GameDetail from "./components/GameDetail";
import Wishlist from "./components/Wishlist";
import CommonTitle from "./components/CommonTitle";
import Footer from "./components/Footer";
import Board from "./components/Board";
import HeroSlider from "./components/HeroSlider";
import FilterMenu from "./components/FilterMenu";
import PlatformModal from "./components/PlatformModal";
import ScrollTop from "./components/ScrollTop";

import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  const [games, setGames] = useState(gamesData);
  const [trending, setTrending] = useState(trendingData.slice(0, 3));
  const [loadCount, setLoadCount] = useState(1);
  const [keyword, setKeyword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out",
      once: false,
      mirror: true,
      offset: 80,
    });
  }, []);

  useEffect(() => {
    AOS.refreshHard();
  }, [games, trending, keyword]);

  useEffect(() => {
    const stateKeyword = location.state?.keyword;
    if (stateKeyword) {
      setKeyword(stateKeyword);
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [location.state, location.pathname, navigate]);

  const sortByTitle = useCallback(() => {
    setGames((prev) => [...prev].sort((a, b) => a.title.localeCompare(b.title)));
  }, []);

  const sortByPriceLowToHigh = useCallback(() => {
    setGames((prev) => [...prev].sort((a, b) => a.price - b.price));
  }, []);

  const sortByPriceHighToLow = useCallback(() => {
    setGames((prev) => [...prev].sort((a, b) => b.price - a.price));
  }, []);

  const sortByRatingHighToLow = useCallback(() => {
    setGames((prev) =>
      [...prev].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
    );
  }, []);

  const loadMoreTrending = useCallback(() => {
    if (loadCount === 1) {
      setTrending(trendingData.slice(0, 6));
      setLoadCount(2);
      return;
    }
    if (loadCount === 2) {
      setTrending(trendingData.slice(0, 9));
      setLoadCount(3);
      return;
    }
    alert("더 이상 추천 게임이 없습니다.");
  }, [loadCount]);

  const filteredGames = useMemo(() => {
    const k = keyword.trim().toLowerCase();
    if (!k) return games;
    return games.filter((g) => g.title.toLowerCase().includes(k));
  }, [games, keyword]);

  return (
    <div className="App">
      <Navbar bg="dark" data-bs-theme="dark" className="gh-nav" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/" className="gh-brand">
            <span className="gh-logo-badge">🎮</span>
            <span className="gh-brand-text">GameHub</span>
            <span className="gh-brand-sub">discover your next game</span>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="gh-nav" />
          <Navbar.Collapse id="gh-nav">
            <Nav className="me-auto gh-nav-links">
              <NavLink className="gh-link" to="/">
                홈
              </NavLink>
              <NavLink className="gh-link" to="/wishlist">
                찜목록
              </NavLink>
              <NavLink className="gh-link" to="/about">
                추천
              </NavLink>
              <NavLink className="gh-link" to="/board">
                후기게시판
              </NavLink>
            </Nav>

            <div className="d-flex gap-2 gh-nav-actions">
              <FilterMenu />
              <PlatformModal />
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route
          path="/"
          element={
            <div>
              <HeroSlider />

              <CommonTitle
                title={"추천 게임 BEST"}
                subTitle={"장르/평점 기반으로 다음 게임을 골라보세요"}
              />

              <div className="container gh-section">
                <div className="gh-controls" data-aos="fade-up">
                  <div className="gh-controls-left">
                    <div className="gh-controls-label">🔎 게임 검색</div>
                    <div className="gh-input-wrap">
                      <input
                        className="gh-input"
                        placeholder="게임명을 입력하세요 (예: Elden Ring)"
                        onChange={(e) => setKeyword(e.target.value)}
                        value={keyword}
                      />
                      {keyword?.trim() && (
                        <button
                          className="gh-clear"
                          onClick={() => setKeyword("")}
                          type="button"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                    <div className="gh-hint">
                      결과 <b>{filteredGames.length}</b>개
                    </div>
                  </div>

                  <div className="gh-controls-right">
                    <div className="gh-controls-label">⚙️ 정렬</div>
                    <select
                      className="gh-select"
                      onChange={(e) => {
                        if (e.target.value === "rating") sortByRatingHighToLow();
                        if (e.target.value === "low") sortByPriceLowToHigh();
                        if (e.target.value === "high") sortByPriceHighToLow();
                        if (e.target.value === "title") sortByTitle();
                      }}
                      defaultValue=""
                    >
                      <option value="" disabled>
                        정렬 선택
                      </option>
                      <option value="rating">평점 높은 순</option>
                      <option value="low">낮은 가격순</option>
                      <option value="high">높은 가격순</option>
                      <option value="title">이름순</option>
                    </select>

                    <div className="gh-sort-chips">
                      <button
                        className="gh-chip"
                        onClick={sortByRatingHighToLow}
                        type="button"
                      >
                        ⭐ 평점
                      </button>
                      <button
                        className="gh-chip"
                        onClick={sortByPriceLowToHigh}
                        type="button"
                      >
                        ⬇️ 가격
                      </button>
                      <button className="gh-chip" onClick={sortByTitle} type="button">
                        🔤 이름
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="container gh-grid-space">
                <div className="row">
                  {filteredGames.map((game, idx) => (
                    <GameCard game={game} key={game.id} idx={idx} />
                  ))}
                </div>
              </div>

              <div className="container gh-section gh-section-bottom gh-trending">
                <CommonTitle
                  title={"🔥 트렌딩 TOP"}
                  subTitle={"지금 사람들이 많이 찾는 게임"}
                />

                <div className="gh-grid-space">
                  <div className="row">
                    {trending.map((item) => (
                      <TrendingCard item={item} key={item.id} />
                    ))}
                  </div>
                </div>

                <div className="gh-center">
                  <Button
                    className="gh-more-btn"
                    variant="outline-success"
                    onClick={loadMoreTrending}
                  >
                    + 3개 더 보기
                  </Button>
                </div>
              </div>

              <Footer />
              <ScrollTop />
            </div>
          }
        />

        <Route path="/detail/:gameId" element={<GameDetail games={games} />} />
        <Route path="/wishlist" element={<Wishlist />} />

        <Route path="/about" element={<About games={games} />}>
          <Route path="member" element={<Member />} />
          <Route path="location" element={<Location />} />
        </Route>

        <Route path="/board" element={<Board />} />
        <Route path="*" element={<div style={{ padding: 24 }}>페이지가 없습니다.</div>} />
      </Routes>
    </div>
  );
}

function About({ games }) {
  const navigate = useNavigate();

  const styles = useMemo(
    () => [
      {
        icon: "⚔️",
        title: "전투 중심",
        desc: "손맛 있는 전투와 성장, 보스전을 즐기는 타입",
        tags: ["Action", "RPG", "Boss"],
        picks: [
          {
            name: "Elden Ring",
            hint: "난이도·탐험·보스전",
            img: process.env.PUBLIC_URL + "/img/game1.jpg",
          },
          {
            name: "Hades",
            hint: "빠른 전투·반복 플레이",
            img: process.env.PUBLIC_URL + "/img/game2.jpg",
          },
        ],
      },
      {
        icon: "🌿",
        title: "힐링 & 몰입",
        desc: "분위기와 탐험, 꾸준한 성장에 몰입하는 타입",
        tags: ["Relax", "Story", "Explore"],
        picks: [
          {
            name: "Stardew Valley",
            hint: "농장·마을 생활",
            img: process.env.PUBLIC_URL + "/img/game3.jpg",
          },
          {
            name: "Hollow Knight",
            hint: "분위기·탐험",
            img: process.env.PUBLIC_URL + "/img/game18.jpg",
          },
        ],
      },
      {
        icon: "🧠",
        title: "전략 & 빌드",
        desc: "계획을 세우고 최적의 선택으로 빌드업하는 타입",
        tags: ["Strategy", "Build", "Plan"],
        picks: [
          {
            name: "Civilization VI",
            hint: "문명·확장·외교",
            img: process.env.PUBLIC_URL + "/img/game20.jpg",
          },
          {
            name: "Slay the Spire",
            hint: "덱빌딩·전략",
            img: process.env.PUBLIC_URL + "/img/game21.jpg",
          },
        ],
      },
      {
        icon: "👥",
        title: "멀티 & 경쟁",
        desc: "친구와 협동하거나 경쟁에서 성취감을 얻는 타입",
        tags: ["Multi", "Co-op", "Ranked"],
        picks: [
          {
            name: "VALORANT",
            hint: "팀 기반 FPS",
            img: process.env.PUBLIC_URL + "/img/game5.jpg",
          },
          {
            name: "Overwatch 2",
            hint: "빠른 템포·팀플",
            img: process.env.PUBLIC_URL + "/img/game19.jpg",
          },
        ],
      },
      {
        icon: "🧩",
        title: "퍼즐 & 두뇌",
        desc: "생각하며 문제를 풀고 성취감을 느끼는 타입",
        tags: ["Puzzle", "Logic", "Brain"],
        picks: [
          {
            name: "Portal 2",
            hint: "물리 퍼즐·창의적 해결",
            img: process.env.PUBLIC_URL + "/img/game22.jpg",
          },
          {
            name: "The Witness",
            hint: "탐험형 퍼즐",
            img: process.env.PUBLIC_URL + "/img/game23.jpg",
          },
        ],
      },
      {
        icon: "📖",
        title: "스토리 중심",
        desc: "몰입감 있는 이야기와 캐릭터를 즐기는 타입",
        tags: ["Story", "Narrative", "Adventure"],
        picks: [
          {
            name: "The Witcher 3",
            hint: "스토리·오픈월드 RPG",
            img: process.env.PUBLIC_URL + "/img/game24.jpg",
          },
          {
            name: "Life is Strange",
            hint: "선택 기반 스토리",
            img: process.env.PUBLIC_URL + "/img/game25.jpg",
          },
        ],
      },
      {
        icon: "🏎️",
        title: "스피드 & 레이싱",
        desc: "빠른 속도감과 경쟁을 즐기는 타입",
        tags: ["Racing", "Speed", "Competition"],
        picks: [
          {
            name: "Forza Horizon 6",
            hint: "오픈월드 레이싱",
            img: process.env.PUBLIC_URL + "/img/game26.jpg",
          },
          {
            name: "Need for Speed Unbound",
            hint: "스트리트 레이싱",
            img: process.env.PUBLIC_URL + "/img/game27.jpg",
          },
        ],
      },
      {
        icon: "🏗️",
        title: "건설 & 시뮬레이션",
        desc: "도시를 만들고 시스템을 운영하는 타입",
        tags: ["Simulation", "Builder", "Management"],
        picks: [
          {
            name: "Cities Skylines",
            hint: "도시 건설 시뮬레이션",
            img: process.env.PUBLIC_URL + "/img/game28.jpg",
          },
          {
            name: "Factorio",
            hint: "자동화·공장 관리",
            img: process.env.PUBLIC_URL + "/img/game29.jpg",
          },
        ],
      },
      {
        icon: "🧟",
        title: "서바이벌 & 공포",
        desc: "긴장감 있는 생존과 공포 분위기를 즐기는 타입",
        tags: ["Survival", "Horror", "Tension"],
        picks: [
          {
            name: "Resident Evil 4",
            hint: "서바이벌 호러",
            img: process.env.PUBLIC_URL + "/img/game30.jpg",
          },
          {
            name: "The Forest",
            hint: "생존·협동",
            img: process.env.PUBLIC_URL + "/img/game31.jpg",
          },
        ],
      },
      {
        icon: "🗺️",
        title: "오픈월드 탐험",
        desc: "넓은 세계를 자유롭게 탐험하며 자유도를 즐기는 타입",
        tags: ["OpenWorld", "Explore", "Adventure"],
        picks: [
          {
            name: "Red Dead Redemption 2",
            hint: "서부 오픈월드",
            img: process.env.PUBLIC_URL + "/img/game32.jpg",
          },
          {
            name: "The Legend of Zelda BOTW",
            hint: "자유 탐험",
            img: process.env.PUBLIC_URL + "/img/game33.jpg",
          },
        ],
      },
    ],
    []
  );

  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("ALL");

  const allTags = useMemo(() => {
    const set = new Set();
    styles.forEach((s) => s.tags.forEach((t) => set.add(t)));
    return ["ALL", ...Array.from(set)];
  }, [styles]);

  const filteredStyles = useMemo(() => {
    const q = query.trim().toLowerCase();
    return styles.filter((s) => {
      const matchTag = tag === "ALL" ? true : s.tags.includes(tag);
      const matchQuery =
        !q ||
        s.title.toLowerCase().includes(q) ||
        s.desc.toLowerCase().includes(q) ||
        s.picks.some((p) => p.name.toLowerCase().includes(q));
      return matchTag && matchQuery;
    });
  }, [styles, query, tag]);

  const goToSearch = (keyword) => navigate("/", { state: { keyword } });

  const addToWishlist = (title) => {
    const saved = JSON.parse(localStorage.getItem("wishlist") || "[]");
    const found = games.find((g) => g.title.toLowerCase() === title.toLowerCase());
    const payload = found
      ? found
      : { id: `custom-${title}`, title, img: "", price: 0, rating: 0 };

    const exists = saved.some((x) => (x.id ?? x.title) === (payload.id ?? payload.title));
    if (exists) return alert("이미 찜목록에 있어요!");

    localStorage.setItem("wishlist", JSON.stringify([...saved, payload]));
    alert("찜목록에 추가됐어요!");
  };

  const goToDetail = (title) => {
    const found = games.find((g) => g.title.toLowerCase() === title.toLowerCase());
    if (!found) return alert("상세 데이터가 DB에 없어요. (games.js 확인)");
    navigate(`/detail/${found.id}`);
  };

  return (
    <Container className="about-wrap">
      <div className="about-hero">
        <div>
          <h2 className="about-title">추천 플레이 스타일</h2>
          <p className="about-sub">
            내 취향에 맞는 스타일을 골라서 게임을 더 빠르게 찾아보세요.
            <br />
            아래 추천은 GameHub에서 자주 찾는 방향으로 구성했어요.
          </p>
        </div>

        <div className="about-actions">
          <Button variant="primary" onClick={() => navigate("/")}>
            홈에서 게임 찾기
          </Button>
          <Button variant="outline-light" onClick={() => navigate("/wishlist")}>
            내 찜목록
          </Button>
        </div>
      </div>

      <div
        style={{
          margin: "14px 0 18px",
          padding: "14px",
          borderRadius: 14,
          border: "1px solid rgba(255,255,255,.10)",
          background: "rgba(255,255,255,.03)",
        }}
      >
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="스타일/게임명 검색 (예: 덱빌딩, Hades)"
          style={{
            width: "100%",
            padding: "10px 12px",
            borderRadius: 12,
            border: "1px solid rgba(255,255,255,.12)",
            background: "rgba(0,0,0,.22)",
            color: "#fff",
            outline: "none",
            marginBottom: 10,
          }}
        />

        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {allTags.map((t) => (
            <Button
              key={t}
              size="sm"
              className={`tag-pill ${tag === t ? "is-active" : ""}`}
              onClick={() => setTag(t)}
            >
              {t}
            </Button>
          ))}
        </div>
      </div>

      <Row className="g-3">
        {filteredStyles.map((s, idx) => (
          <Col md={6} key={idx}>
            <Card className="style-card h-100">
              <Card.Body>
                <div className="style-top">
                  <div className="style-icon">{s.icon}</div>

                  <div style={{ flex: 1 }}>
                    <div className="style-head">
                      <h5 className="m-0" style={{ fontWeight: 900 }}>
                        {s.title}
                      </h5>

                      <div className="style-badges">
                        {s.tags.map((t) => (
                          <Badge bg="secondary" key={t} className="me-1">
                            {t}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <p className="style-desc">{s.desc}</p>
                  </div>
                </div>

                <div className="pick-grid">
                  {s.picks.map((p) => (
                    <div className="pick-card" key={p.name}>
                      <div className="pick-thumb">
                        <img src={p.img} alt={p.name} />
                      </div>

                      <div className="pick-info">
                        <div className="pick-name">{p.name}</div>
                        <div className="pick-hint">{p.hint}</div>

                        <div
                          className="pick-actions"
                          style={{ display: "flex", gap: 8, flexWrap: "wrap" }}
                        >
                          <Button
                            size="sm"
                            variant="outline-info"
                            onClick={() => goToSearch(p.name)}
                            className="action-btn search"
                          >
                            검색
                          </Button>

                          <Button
                            size="sm"
                            variant="outline-success"
                            onClick={() => goToDetail(p.name)}
                            className="action-btn detail"
                          >
                            상세
                          </Button>

                          <Button
                            size="sm"
                            variant="outline-warning"
                            onClick={() => addToWishlist(p.name)}
                            className="action-btn wish"
                          >
                            찜
                          </Button>

                          <Button
                            size="sm"
                            variant="outline-light"
                            onClick={() => navigate("/")}
                            className="action-btn all"
                          >
                            전체보기
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="about-mini">
                  <span>💡</span>
                  <span>
                    홈에서 <b>검색</b> + <b>정렬</b>을 같이 쓰면 더 빨라요.
                  </span>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Outlet />
    </Container>
  );
}

function Member() {
  return (
    <>
      <h4>Team</h4>
      <p>게임을 좋아하는 사람들이 만든 추천 플랫폼입니다.</p>
    </>
  );
}

function Location() {
  return (
    <>
      <h4>Contact</h4>
      <p>문의: gamehub@example.com</p>
    </>
  );
}

export default App;