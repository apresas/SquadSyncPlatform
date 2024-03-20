import { useEffect, useState } from "react";
import "./awards.css";
import AwardItem from "./AwardItem";
import TitleBar from "../TitleBar";
import HonorableMention from "./HonorableMention";
import AllDivisionItem from "./AllDivisionItem";
import playerAwards from "../../data/playerAwards.json";
import axios from "axios";

function Awards({ getDates }) {
  const [firstTeam, setFirstTeam] = useState([]);
  const [secondTeam, setSecondTeam] = useState([]);
  const [allDivision, setAllDivision] = useState({
    red: [],
    white: [],
    blue: [],
  });
  const [honorableMention, setHonorableMention] = useState([]);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    getDates(new Date());
    getFirstTeam();
    getSecondTeam();
    getDivisionTeam();
    getHonorableTeam()
  }, []);

  const getFirstTeam = async () => {
    let endpoints = [
      "http://localhost:9200/player/751282",
      "http://localhost:9200/player/717367",
      "http://localhost:9200/player/226072",
      "http://localhost:9200/player/264822",
      "http://localhost:9200/player/699812",
      "http://localhost:9200/player/852283",
    ];

    let playerList = [];
    await Promise.all(endpoints.map((endPoint) => axios.get(endPoint)))
      .then(
        axios.spread(
          (
            { data: player1 },
            { data: player2 },
            { data: player3 },
            { data: player4 },
            { data: player5 },
            { data: player6 }
          ) => {
            playerList.push(
              player1,
              player2,
              player3,
              player4,
              player5,
              player6
            );
          }
        )
      )
      .then(() => {
        setFirstTeam(playerList);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getSecondTeam = async () => {
    let endpoints = [
      "http://localhost:9200/player/560876",
      "http://localhost:9200/player/657099",
      "http://localhost:9200/player/242500",
      "http://localhost:9200/player/324817",
      "http://localhost:9200/player/119028",
      "http://localhost:9200/player/734234",
    ];

    let playerList = [];
    await Promise.all(endpoints.map((endPoint) => axios.get(endPoint)))
      .then(
        axios.spread(
          (
            { data: player1 },
            { data: player2 },
            { data: player3 },
            { data: player4 },
            { data: player5 },
            { data: player6 }
          ) => {
            playerList.push(
              player1,
              player2,
              player3,
              player4,
              player5,
              player6
            );
          }
        )
      )
      .then(() => {
        setSecondTeam(playerList);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getDivisionTeam = async () => {
    let endpoints = [
      "http://localhost:9200/player/560876",
      "http://localhost:9200/player/717367",
      "http://localhost:9200/player/226072",
      "http://localhost:9200/player/119028",
      "http://localhost:9200/player/264822",
      "http://localhost:9200/player/852283",

      "http://localhost:9200/player/751282",
      "http://localhost:9200/player/657099",
      "http://localhost:9200/player/242500",
      "http://localhost:9200/player/324817",
      "http://localhost:9200/player/699812",
      "http://localhost:9200/player/734234",
      "http://localhost:9200/player/278082",

      "http://localhost:9200/player/429057",
      "http://localhost:9200/player/982659",
      "http://localhost:9200/player/616726",
      "http://localhost:9200/player/707762",
      "http://localhost:9200/player/688432",
      "http://localhost:9200/player/116639",
      "http://localhost:9200/player/180015",
    ];

    let red = [];
    let white = [];
    let blue = [];
    await Promise.all(endpoints.map((endPoint) => axios.get(endPoint)))
      .then(
        axios.spread(
          (
            { data: player1 },
            { data: player2 },
            { data: player3 },
            { data: player4 },
            { data: player5 },
            { data: player6 },
            { data: player7 },
            { data: player8 },
            { data: player9 },
            { data: player10 },
            { data: player11 },
            { data: player12 },
            { data: player13 },
            { data: player14 },
            { data: player15 },
            { data: player16 },
            { data: player17 },
            { data: player18 },
            { data: player19 },
            { data: player20 }
          ) => {
            red.push(player1, player2, player3, player4, player5, player6);
            white.push(
              player7,
              player8,
              player9,
              player10,
              player11,
              player12,
              player13
            );
            blue.push(
              player14,
              player15,
              player16,
              player17,
              player18,
              player19,
              player20
            );
          }
        )
      )
      .then(() => {
        setAllDivision({
          red: red,
          white: white,
          blue: blue,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getHonorableTeam = async () => {
    let endpoints = [
      "http://localhost:9200/player/616726",
      "http://localhost:9200/player/180015",

      "http://localhost:9200/player/429057",
      "http://localhost:9200/player/688432",
      "http://localhost:9200/player/707762",

      "http://localhost:9200/player/278082",
      "http://localhost:9200/player/928514",

      "http://localhost:9200/player/713550",

      "http://localhost:9200/player/116639",

      "http://localhost:9200/player/581218",

      "http://localhost:9200/player/293457",
      "http://localhost:9200/player/516056",

      "http://localhost:9200/player/540870",
      "http://localhost:9200/player/768481",

      "http://localhost:9200/player/689640",
      "http://localhost:9200/player/763569",

      "http://localhost:9200/player/770999",

      "http://localhost:9200/player/926018",
      "http://localhost:9200/player/679728",

      "http://localhost:9200/player/761778",

      "http://localhost:9200/player/500487",

      "http://localhost:9200/player/616726",

      "http://localhost:9200/player/255951",

      "http://localhost:9200/player/277200",
      "http://localhost:9200/player/213402",
      "http://localhost:9200/player/991060",
    ];

    let list = [];
    await Promise.all(endpoints.map((endPoint) => axios.get(endPoint)))
      .then(
        axios.spread(
          (
            { data: player1 },
            { data: player2 },
            { data: player3 },
            { data: player4 },
            { data: player5 },
            { data: player6 },
            { data: player7 },
            { data: player8 },
            { data: player9 },
            { data: player10 },
            { data: player11 },
            { data: player12 },
            { data: player13 },
            { data: player14 },
            { data: player15 },
            { data: player16 },
            { data: player17 },
            { data: player18 },
            { data: player19 },
            { data: player20 },
            { data: player21 },
            { data: player22 },
            { data: player23 },
            { data: player24 },
            { data: player25 },
          ) => {
            list.push(player1, player2, player3, player4, player5, player6, player7, player8, player9, player10, player11, player12, player13, player14, player15, player16, player17, player18, player19, player20, player21, player22, player23, player24, player25);
          }
        )
      )
      .then(() => {
        setHonorableMention(list);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  // const getTeams = async() => {
  //   await axios
  //   .get("http://localhost:9200/team")
  //   .then((res) => {
  //     setTeams(res.data)
  //   }).catch((err) => console.log(err))
  // }

  // const getAwardPlayer = async() => {
  //   let first = []
  //   let second = []
  //   let division = []
  //   let honor = []
  //   await axios
  //   .get("http://localhost:9200/player")
  //   .then((res) => {
  //     console.log(res.data)
  //     {res.data.filter((player) => player.playerID === )}
  //   }).catch((err) => console.log(err))
  // }
  return (
    <div className="awards_container">
      <div className="awards_content_container">
        <TitleBar title="All League Awards" subtitle="2023-2024" />
        <div className="all_league_section">
          <div className="section_container">
            <h2 className="section_title" id="title">
              First Team
            </h2>
            <h3 className="section_sub_title">All CHC</h3>
            <div className="first_team_container">
              {firstTeam.map((data, i) => (
                <AwardItem key={i} player={data} />
              ))}
            </div>
          </div>
          <div className="section_container">
            <h2 className="section_title" id="title">
              Second Team
            </h2>
            <h3 className="section_sub_title">All CHC</h3>
            <div className="second_team_container">
              {secondTeam.map((data, i) => (
                <AwardItem key={i} player={data} />
              ))}
            </div>
          </div>
        </div>
        <div className="section_container" id="all_league_section">
          <h2 className="section_title">All Division Team</h2>
          <div className="all_league_container">
            <div className="all_division_container">
              <div
                className="all_division_header"
                style={{ backgroundColor: "#ff2400", color: "white" }}
              >
                <h2>1st Team</h2>
                <h3>All-Red Division</h3>
              </div>
              <div className="all_division_body">
                {allDivision.red.map((data, i) => (
                  <AllDivisionItem key={i} player={data} />
                ))}
              </div>
            </div>
            <div className="all_division_container">
              <div
                className="all_division_header"
                style={{ backgroundColor: "transparent" }}
              >
                <h2>1st Team</h2>
                <h3>All-White Division</h3>
              </div>
              <div className="all_division_body">
                {allDivision.white.map((data, i) => (
                  <AllDivisionItem key={i} player={data} />
                ))}
              </div>
            </div>
            <div className="all_division_container">
              <div
                className="all_division_header"
                style={{ backgroundColor: "#0047ab", color: "white" }}
              >
                <h2>1st Team</h2>
                <h3>All-Blue Division</h3>
              </div>
              <div className="all_division_body">
                {allDivision.blue.map((data, i) => (
                  <AllDivisionItem key={i} player={data} />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="section_container" id="honorable_section">
          <h2 className="section_title">Honorable Mentions</h2>
          {/* <h3>All CHC</h3> */}
          {/* <div className="honorable_mention_container"> */}
          <HonorableMention data={honorableMention}/>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}

export default Awards;
