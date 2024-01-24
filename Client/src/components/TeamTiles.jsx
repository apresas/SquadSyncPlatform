import { useState, useMemo } from "react";
import "./teamTiles.css";
import Teams from "../data/teams.json";
import standings from "../data/standing.json";
import TitleBar from "./TitleBar"
import { FiChevronsDown } from "react-icons/fi";
import { GrStar } from "react-icons/gr";
import { useTable, useSortBy } from "react-table";
import { Link, useParams } from "react-router-dom";
import rosterData from "../data/rosterData.json";

function TeamTiles({ setCurrentTeam, setRosterTeam }) {
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const data = useMemo(() => standings, []);
  const winPerAccessor = (row) => {
    return Number(row.wins / row.gamesPlayed).toFixed(2);
  };

  const { id } = useParams();

  // const positionAccessor = (row) => {
  //   return Number(row.position);
  // };

  const columns = useMemo(
    () => [
      {
        Header: "",
        accessor: "teamName",
        Cell: (tableProps) => (
          <div className="standing_teamName">
            <img className="standing_logo" src={tableProps.row.original.logo} />
            {tableProps.row.original.teamName}
          </div>
        ),
      },
      {
        Header: "GP",
        accessor: "gamesPlayed",
      },
      {
        Header: "W",
        accessor: "wins",
      },
      {
        Header: "L",
        accessor: "losses",
      },
      {
        Header: "T",
        accessor: "tie",
      },
      {
        Header: "OTL",
        accessor: "otLoses",
      },
      {
        Header: "P",
        accessor: "points",
      },
      {
        Header: "W%",
        accessor: winPerAccessor,
      },
      {
        Header: "GF",
        accessor: "goalsFor",
      },
      {
        Header: "GA",
        accessor: "goalsAgainst",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  const openStandings = (id) => {
    if (id === 0) {
      setOpen(!open);
      // console.log("red");
    } else if (id === 1) {
      setOpen1(!open1);
      // console.log("white");
    } else if (id === 2) {
      setOpen2(!open2);
      // console.log("blue");
    }
  };

  const handleTeamClick = (team) => {
    // console.log("clicked", team.schoolName);
    setCurrentTeam(team);
    addRoster(team);
  };

  const addRoster = (team) => {
    rosterData
    .filter((roster) => roster.teamID === team.id)
    .map((roster) => (setRosterTeam(roster)));
  }

  return (
    <div className="teamTiles_container">
      <TitleBar title="Capital Hockey Conference" subtitle="Central Ohio Varsity Hockey"/>
      {/* <div className="teams_title_container">
        <h1 className="teams_tiles_title">CAPITAL HOCKEY CONFERENCE</h1>
        <h3 className="teams_tiles_sub">
          Central Ohio Varsity High School Hockey
        </h3>
      </div> */}
      <section className="divisions">
        <h2 className="divisions_title">Red Division</h2>
        <div className="star">
          <GrStar style={{ fontSize: "2rem" }} />
        </div>
        <div className="team_tiles red">
          {Teams.map((team) => {
            return team;
          })
            .filter((team) => team.division === "Red")
            .map((team) => {
              const link = "/team/" + team.id;
              return (
                <Link
                  to={link}
                  style={{ color: "inherit", textDecoration: "inherit" }}
                >
                  <div
                    key={team.id}
                    className="tiles"
                    onClick={() => handleTeamClick(team)}
                  >
                    <img className="team_image" src={team.logo} alt="logo" />
                    <h3 className="school_name_title">{team.schoolName}</h3>
                    <strong className="team_name_title">{team.teamName}</strong>
                    <small className="city_title">{team.city}</small>
                  </div>
                </Link>
              );
            })}
        </div>
        <div
          href=""
          className="division_button"
          onClick={() => {
            const id = 0;
            openStandings(id);
          }}
        >
          <FiChevronsDown style={{ fontSize: "1.5rem" }} />
        </div>
        <div>
          {" "}
          {open ? (
            <div className="standings">
              <h3 className="standing_title">Standings</h3>
              <table className="standings_table blue" {...getTableProps()}>
                <thead>
                  {headerGroups.map((headerGroup) => (
                    <tr
                      key={headerGroup.id}
                      {...headerGroup.getHeaderGroupProps()}
                    >
                      {headerGroup.headers.map((column) => (
                        <th key={headerGroup.id} {...column.getHeaderProps()}>
                          {column.render("Header")}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {rows
                    .filter((row) => row.original.divison === "Red")
                    .sort((a, b) =>
                      parseInt(a.original.points) > parseInt(b.original.points)
                        ? -1
                        : 1
                    )
                    .map((row) => {
                      prepareRow(row);
                      return (
                        <tr key={row.id} {...row.getRowProps()}>
                          {row.cells.map((cell) => {
                            return (
                              <td key={cell.id} {...cell.getCellProps()}>
                                {cell.render("Cell")}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          ) : null}
        </div>
      </section>
      <section className="divisions">
        <h2 className="divisions_title">White Division</h2>
        <div className="star">
          <GrStar style={{ fontSize: "2rem" }} />
        </div>
        <div className="team_tiles white">
          {Teams.map((team) => {
            return team;
          })
            .filter((team) => team.division === "White")
            .map((team) => {
              const link = "/team/" + team.id;
              return (
                <Link
                  to={link}
                  style={{ color: "inherit", textDecoration: "inherit" }}
                >
                  <div
                    key={team.id}
                    className="tiles"
                    onClick={() => handleTeamClick(team)}
                  >
                    <img className="team_image" src={team.logo} alt="logo" />
                    <h3 className="school_name_title">{team.schoolName}</h3>
                    <strong className="team_name_title">{team.teamName}</strong>
                    <small className="city_title">{team.city}</small>
                  </div>
                </Link>
              );
            })}
        </div>
        <div
          href=""
          className="division_button"
          onClick={() => {
            const id = 1;
            openStandings(id);
          }}
        >
          <FiChevronsDown style={{ fontSize: "1.5rem" }} />
        </div>
        <div>
          {" "}
          {open1 ? (
            <div className="standings">
              <h3 className="standing_title">Standings</h3>
              <table className="standings_table blue" {...getTableProps()}>
                <thead>
                  {headerGroups.map((headerGroup) => (
                    <tr
                      key={headerGroup.id}
                      {...headerGroup.getHeaderGroupProps()}
                    >
                      {headerGroup.headers.map((column) => (
                        <th key={headerGroup.id} {...column.getHeaderProps()}>
                          {column.render("Header")}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {rows
                    .filter((row) => row.original.divison === "White")
                    .sort((a, b) =>
                      parseInt(a.original.points) > parseInt(b.original.points)
                        ? -1
                        : 1
                    )
                    .map((row, i) => {
                      // setPosition(i)
                      // console.log(row)
                      prepareRow(row, i);
                      return (
                        <tr key={row.id} {...row.getRowProps()}>
                          {row.cells.map((cell) => {
                            return (
                              <td key={cell.id} {...cell.getCellProps()}>
                                {cell.render("Cell")}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          ) : null}
        </div>{" "}
      </section>
      <section className="divisions">
        <h2 className="divisions_title">Blue Division</h2>
        <div className="star">
          <GrStar style={{ fontSize: "2rem" }} />
        </div>
        <div className="team_tiles blue">
          {Teams.map((team) => {
            return team;
          })
            .filter((team) => team.division === "Blue")
            .map((team) => {
              const link = "/team/" + team.id;
              return (
                <Link
                  to={link}
                  style={{ color: "inherit", textDecoration: "inherit" }}
                >
                  <div
                    key={team.id}
                    className="tiles"
                    onClick={() => handleTeamClick(team)}
                  >
                    <img className="team_image" src={team.logo} alt="logo" />
                    <h3 className="school_name_title">{team.schoolName}</h3>
                    <strong className="team_name_title">{team.teamName}</strong>
                    <small className="city_title">{team.city}</small>
                  </div>
                </Link>
              );
            })}
        </div>
        <div
          href=""
          className="division_button"
          onClick={() => {
            const id = 2;
            openStandings(id);
          }}
        >
          <FiChevronsDown style={{ fontSize: "1.5rem" }} />
        </div>
        <div>
          {" "}
          {open2 ? (
            <div className="standings">
              <h3 className="standing_title">Standings</h3>
              <table className="standings_table blue" {...getTableProps()}>
                <thead>
                  {headerGroups.map((headerGroup) => (
                    <tr
                      key={headerGroup.id}
                      {...headerGroup.getHeaderGroupProps()}
                    >
                      {headerGroup.headers.map((column) => (
                        <th key={headerGroup.id} {...column.getHeaderProps()}>
                          {column.render("Header")}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {rows
                    .filter((row) => row.original.divison === "Blue")
                    .sort((a, b) =>
                      parseInt(a.original.points) > parseInt(b.original.points)
                        ? -1
                        : 1
                    )
                    .map((row, i) => {
                      // setPosition(i)
                      // console.log(row)
                      prepareRow(row, i);
                      return (
                        <tr key={row.id} {...row.getRowProps()}>
                          {row.cells.map((cell) => {
                            return (
                              <td key={cell.id} {...cell.getCellProps()}>
                                {cell.render("Cell")}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          ) : null}
        </div>{" "}
      </section>
    </div>
  );
}

export default TeamTiles;
