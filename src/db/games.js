const games = [
  {
    id: 0,
    title: "Elden Ring",
    price: 64800,
    rating: 4.8,
    genre: "Action RPG",
    platform: "PC / PS / Xbox",
    img: process.env.PUBLIC_URL + "/img/game1.jpg",
    desc: "오픈월드 액션 RPG. 탐험과 보스전이 핵심."
  },
  {
    id: 1,
    title: "Hades",
    price: 27500,
    rating: 4.7,
    genre: "Rogue-like",
    platform: "PC / Switch / PS / Xbox",
    img: process.env.PUBLIC_URL + "/img/game2.jpg",
    desc: "빠른 템포 전투 + 반복 플레이 로그라이크."
  },
  {
    id: 2,
    title: "Stardew Valley",
    price: 16500,
    rating: 4.6,
    genre: "Simulation",
    platform: "PC / Mobile / Console",
    img: process.env.PUBLIC_URL + "/img/game3.jpg",
    desc: "농장/마을 생활 힐링 시뮬레이션."
  },
  {
    id: 3,
    title: "Red Dead Redemption 2",
    price: 59000,
    rating: 4.9,
    genre: "Open World",
    platform: "PC / PS / Xbox",
    img: process.env.PUBLIC_URL + "/img/game13.jpg",
    desc: "서부 시대 오픈월드 액션 어드벤처."
  },
  {
    id: 4,
    title: "Cyberpunk 2077",
    price: 59800,
    rating: 4.3,
    genre: "Action RPG",
    platform: "PC / PS / Xbox",
    img: process.env.PUBLIC_URL + "/img/game14.jpg",
    desc: "미래 도시 나이트시티에서 펼쳐지는 오픈월드 RPG."
  },
  {
    id: 5,
    title: "Resident Evil 4 Remake",
    price: 64800,
    rating: 4.7,
    genre: "Survival Horror",
    platform: "PC / PS / Xbox",
    img: process.env.PUBLIC_URL + "/img/game15.jpg",
    desc: "생존 공포 명작을 현대적으로 리메이크."
  },
  {
  id: 6,
  title: "The Witcher 3: Wild Hunt",
  price: 39800,
  rating: 4.9,
  genre: "Action RPG",
  platform: "PC / PS / Xbox / Switch",
  img: process.env.PUBLIC_URL + "/img/game16.jpg",
  desc: "괴물 사냥꾼 게롤트의 이야기를 다룬 오픈월드 RPG 명작."
},
{
  id: 7,
  title: "God of War",
  price: 49800,
  rating: 4.8,
  genre: "Action Adventure",
  platform: "PC / PS",
  img: process.env.PUBLIC_URL + "/img/game17.jpg",
  desc: "북유럽 신화를 배경으로 한 강렬한 액션 어드벤처."
},
{
  id: 8,
  title: "Hollow Knight",
  price: 16500,
  rating: 4.7,
  genre: "Metroidvania",
  platform: "PC / Switch / PS / Xbox",
  img: process.env.PUBLIC_URL + "/img/game18.jpg",
  desc: "어둡고 아름다운 세계를 탐험하는 메트로이드바니아 액션 게임."
}
];

export default games;